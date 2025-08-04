const express = require('express');
const axios = require('axios');
const cors = require('cors');
const qs = require('qs');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/token', async (req, res) => {
  const { code, redirect_uri } = req.body;

  if (!code || !redirect_uri) {
    return res.status(400).json({ error: 'Missing code or redirect_uri' });
  }

  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;

  const authHeader = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', {
      grant_type: 'authorization_code',
      code,
      redirect_uri: 'https://1f1cfcf7-5f2e-4bcf-8164-fe09065c8533-00-3lxfq2m4klmm8.spock.replit.dev/api/auth/callback',
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

app.post('/api/client-token', async (req, res) => {
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;

  const authHeader = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token',
      qs.stringify({ grant_type: '2d8af60e31234b9baa2102eb79ef4664' }),
      {
        headers: {
          'Authorization': `Bearer BQDIHDVubQp7hOTX-px5Ii2nvkOezOi9CFDd-nbjhHcupesQ4C7WIZmpLcQuM79SCikvq_l8G280eiY4KL2kxEvd89mp1iscJFCPGqMnF7Ee8cTFiznvuvN9ISlMOMrVbQdD-zSMssmfHb9Tet7nUkex38Rde0jfu_VHq1cn4hcRNGqW4n-vapKGe5lXJcN-NVSdIed3etRihv1SULpDovhQyf0obc6LWjwXnB7fffu3RkzcEymMIEe52barhkCvXdZD9Y5QUnu4-YuQ3SmvAZyEZj3IRtAW3fzTX0E9056REVvCawZcGEBo_P7T`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

    res.json({ access_token: response.data.access_token });
  } catch (error) {
    console.error('Error getting client credentials token:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get client credentials token' });
  }
});

const fs = require('fs');
const path = require('path');

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

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
