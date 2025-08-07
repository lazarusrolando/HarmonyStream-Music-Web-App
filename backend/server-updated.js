const express = require('express');
const axios = require('axios');
const cors = require('cors');
const qs = require('qs');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Spotify OAuth configuration from environment variables
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || process.env.CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || process.env.CLIENT_SECRET;
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI || 'http://localhost:4000/api/auth/callback';

// Generate Spotify authorization URL
app.get('/api/spotify/login', (req, res) => {
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

  const authUrl = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}&scope=${encodeURIComponent(scopes)}`;
  //https://accounts.spotify.com/authorize?client_id=2d8af60e31234b9baa2102eb79ef4664&response_type=code&redirect_uri=http://localhost:4000/api/auth/callback&scope=scopes
  res.json({ authUrl });
});

// Handle Spotify callback
app.get('/api/auth/callback', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Authorization code not provided' });
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
        }
      });

    const { access_token, refresh_token, expires_in } = response.data;

    // Redirect to frontend with tokens
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/callback#access_token=${access_token}&refresh_token=${refresh_token}&expires_in=${expires_in}`);
    
  } catch (error) {
    console.error('Error exchanging code for token:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to authenticate with Spotify' });
  }
});

// Exchange authorization code for access token (for manual token exchange)
app.post('/api/token', async (req, res) => {
  const { code, redirect_uri } = req.body;

  if (!code || !redirect_uri) {
    return res.status(400).json({ error: 'Missing code or redirect_uri' });
  }

  const authHeader = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', {
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirect_uri || SPOTIFY_REDIRECT_URI,
    }, {
      headers: {
        Authorization: `Basic ${authHeader}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error exchanging code for token:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to exchange code for token' });
  }
});

// Refresh token endpoint
app.post('/api/refresh', async (req, res) => {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(400).json({ error: 'Refresh token not provided' });
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
        }
      });

    const { access_token, expires_in } = response.data;
    res.json({ access_token, expires_in });
    
  } catch (error) {
    console.error('Error refreshing token:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to refresh token' });
  }
});

// Client credentials token (for app-level access)
app.post('/api/client-token', async (req, res) => {
  const authHeader = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token',
      qs.stringify({ grant_type: 'client_credentials' }),
      {
        headers: {
          'Authorization': `Basic ${authHeader}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

    res.json({ access_token: response.data.access_token });
  } catch (error) {
    console.error('Error getting client credentials token:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get client credentials token' });
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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    spotify_configured: !!(SPOTIFY_CLIENT_ID && SPOTIFY_CLIENT_SECRET),
    redirect_uri: SPOTIFY_REDIRECT_URI 
  });
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
  console.log(`Spotify redirect URI: ${SPOTIFY_REDIRECT_URI}`);
  console.log(`Spotify OAuth configured: ${!!(SPOTIFY_CLIENT_ID && SPOTIFY_CLIENT_SECRET)}`);
});
