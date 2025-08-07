const express = require('express');
const axios = require('axios');
const cors = require('cors');
const qs = require('qs');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

// Configure CORS properly for frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173', 'http://localhost:4000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Spotify OAuth configuration from environment variables
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || process.env.CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || process.env.CLIENT_SECRET;
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI || 'http://localhost:4000/api/auth/callback';

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    spotify_configured: !!(SPOTIFY_CLIENT_ID && SPOTIFY_CLIENT_SECRET),
    redirect_uri: SPOTIFY_REDIRECT_URI 
  });
});

// Generate Spotify authorization URL
app.get('/api/spotify/login', (req, res) => {
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
    return res.status(500).json({ 
      error: 'Spotify credentials not configured',
      message: 'Please set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in your .env file'
    });
  }

  const scopes = [
    'user-read-private',
    'user-read-email',
    'user-library-read',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-read-recently-played',
    'user-top-read',
    'streaming'
  ].join(' ');

  const authUrl = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}&scope=${encodeURIComponent(scopes)}&state=${Date.now()}`;
  
  res.json({ authUrl });
});

// Handle Spotify callback - this is the key endpoint
app.get('/api/auth/callback', async (req, res) => {
  const { code, error, state } = req.query;

  if (error) {
    console.error('Spotify authorization error:', error);
    return res.redirect(`http://localhost:5173/callback?error=${encodeURIComponent(error)}`);
  }

  if (!code) {
    console.error('No authorization code provided');
    return res.redirect('http://localhost:5173/callback?error=no_code');
  }

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
    console.error('Spotify credentials not configured');
    return res.redirect('http://localhost:5173/callback?error=spotify_not_configured');
  }

  const authHeader = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token',
      qs.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: SPOTIFY_REDIRECT_URI,
      }),
      {
        headers: {
          'Authorization': `Basic ${authHeader}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        timeout: 10000
      });

    const { access_token, refresh_token, expires_in } = response.data;

    // Redirect to frontend with tokens in URL hash
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/callback#access_token=${access_token}&refresh_token=${refresh_token}&expires_in=${expires_in}`);
    
  } catch (error) {
    console.error('Error exchanging code for token:', error.response?.data || error.message);
    res.redirect(`http://localhost:5173/callback?error=${encodeURIComponent(error.message || 'token_exchange_failed')}`);
  }
});

// Exchange authorization code for access token (POST endpoint)
app.post('/api/token', async (req, res) => {
  const { code, redirect_uri } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Missing authorization code' });
  }

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
    return res.status(500).json({ error: 'Spotify credentials not configured' });
  }

  const authHeader = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token',
      qs.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri || SPOTIFY_REDIRECT_URI,
      }),
      {
        headers: {
          'Authorization': `Basic ${authHeader}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        timeout: 10000
      });

    res.json(response.data);
  } catch (error) {
    console.error('Error exchanging code for token:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to exchange code for token',
      details: error.response?.data || error.message
    });
  }
});

// Refresh token endpoint
app.post('/api/refresh', async (req, res) => {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(400).json({ error: 'Refresh token not provided' });
  }

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
    return res.status(500).json({ error: 'Spotify credentials not configured' });
  }

  const authHeader = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token',
      qs.stringify({
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
      }),
      {
        headers: {
          'Authorization': `Basic ${authHeader}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        timeout: 10000
      });

    const { access_token, expires_in } = response.data;
    res.json({ access_token, expires_in });
    
  } catch (error) {
    console.error('Error refreshing token:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to refresh token',
      details: error.response?.data || error.message
    });
  }
});

// Client credentials token (for app-level access)
app.post('/api/client-token', async (req, res) => {
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
    return res.status(500).json({ error: 'Spotify credentials not configured' });
  }

  const authHeader = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token',
      qs.stringify({ grant_type: 'client_credentials' }),
      {
        headers: {
          'Authorization': `Basic ${authHeader}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout: 10000
      });

    res.json({ access_token: response.data.access_token });
  } catch (error) {
    console.error('Error getting client credentials token:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to get client credentials token',
      details: error.response?.data || error.message
    });
  }
});

// User registration and login routes
app.post('/api/signup', (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const usersFilePath = path.join(__dirname, 'users.json');

  // Read existing users
  let users = [];
  if (fs.existsSync(usersFilePath)) {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    try {
      users = JSON.parse(data);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to parse users data' });
    }
  }

  // Check if email or username already exists
  if (users.some(user => user.email === email || user.username === username)) {
    return res.status(409).json({ error: 'Email or username already exists' });
  }

  // Add new user
  users.push({ email, username, password });

  // Save users back to file
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  } catch (err) {
    return res.status(500).json({ error: 'Failed to save user data' });
  }

  res.status(201).json({ message: 'User registered successfully' });
});

// Favicon endpoint - prevents 404
app.get('/favicon.ico', (req, res) => {
  res.status(204).send();
});

// Catch-all for 404s
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
  console.log(`Spotify redirect URI: ${SPOTIFY_REDIRECT_URI}`);
  console.log(`Spotify OAuth configured: ${!!(SPOTIFY_CLIENT_ID && SPOTIFY_CLIENT_SECRET)}`);
})
