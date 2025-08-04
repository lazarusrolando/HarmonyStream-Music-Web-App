import axios from 'axios';

// Spotify App Credentials
const CLIENT_ID = '2d8af60e31234b9baa2102eb79ef4664';
const CLIENT_SECRET = '13fb9c5534f44ccf9fdc22325cb1575f';
const REDIRECT_URI = 'https://1f1cfcf7-5f2e-4bcf-8164-fe09065c8533-00-3lxfq2m4klmm8.spock.replit.dev/api/auth/callback';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const API_BASE_URL = 'https://api.spotify.com/v1';

// Internal state
let accessToken = null;
let tokenExpiresAt = null;

export const clearAccessToken = () => {
  localStorage.removeItem('spotify_access_token');
  localStorage.removeItem('spotify_token_expires_at');
};

const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

// Load access token from localStorage (if still valid)
const loadTokenFromStorage = () => {
  if (!isBrowser) return;

  const token = localStorage.getItem('spotify_access_token');
  const expiresAtRaw = localStorage.getItem('spotify_token_expires_at');
  const expiresAt = Number(expiresAtRaw);

  if (
    typeof token === 'string' &&
    expiresAtRaw !== null &&
    !Number.isNaN(expiresAt) &&
    Date.now() < expiresAt
  ) {
    accessToken = token;
    tokenExpiresAt = expiresAt;
  } else {
    clearAccessToken();
  }
};

loadTokenFromStorage();

// Generates the Spotify login URL for redirect
export const getSpotifyAuthUrl = () => {
  const scopes = [
    'user-read-private',
    'user-read-email',
    'user-library-read',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-read-recently-played',
    'user-top-read',
  ].join(' ');

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'token',
    redirect_uri: REDIRECT_URI,
    scope: scopes,
  });

  return `${AUTH_ENDPOINT}?${params.toString()}`;
};

// Store new token after login
export const setAccessToken = (token, expiresInSeconds) => {
  accessToken = token;
  tokenExpiresAt = Date.now() + expiresInSeconds * 1000;
  window.localStorage.setItem('spotify_access_token', accessToken);
  window.localStorage.setItem('spotify_token_expires_at', tokenExpiresAt.toString());
};

// Exchange authorization code for access token (Authorization Code Flow)
export const exchangeAuthorizationCode = async (code, redirectUri) => {
  try {
    const response = await fetch('http://localhost:4000/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, redirect_uri: redirectUri }),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange authorization code');
    }

    const data = await response.json();
    setAccessToken(data.access_token, data.expires_in);
    return data;
  } catch (error) {
    console.error('Error exchanging authorization code:', error);
    throw error;
  }
};

// Expose current access token
export const getAccessToken = () => {
  if (!accessToken || !tokenExpiresAt || Date.now() >= tokenExpiresAt) {
    clearAccessToken();
    return null;
  }
  return accessToken;
};

// Check if token is invalid or expired
const isTokenExpired = () => {
  return !accessToken || !tokenExpiresAt || Date.now() >= tokenExpiresAt;
};

// Generic API request to Spotify
export const spotifyApiRequest = async (endpoint, method = 'GET', data = null) => {
  if (isTokenExpired()) {
    throw new Error('Spotify access token is missing or expired.');
  }

  const config = {
    method,
    url: `${API_BASE_URL}${endpoint}`,
    headers: {
      'Authorization': `Bearer BQDIHDVubQp7hOTX-px5Ii2nvkOezOi9CFDd-nbjhHcupesQ4C7WIZmpLcQuM79SCikvq_l8G280eiY4KL2kxEvd89mp1iscJFCPGqMnF7Ee8cTFiznvuvN9ISlMOMrVbQdD-zSMssmfHb9Tet7nUkex38Rde0jfu_VHq1cn4hcRNGqW4n-vapKGe5lXJcN-NVSdIed3etRihv1SULpDovhQyf0obc6LWjwXnB7fffu3RkzcEymMIEe52barhkCvXdZD9Y5QUnu4-YuQ3SmvAZyEZj3IRtAW3fzTX0E9056REVvCawZcGEBo_P7T`,
    },
  };

  if (data && method.toUpperCase() !== 'GET') {
    config.data = data;
  }

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    // Always log error, show Spotify error if present
    if (error.response && error.response.data) {
      console.error('Spotify API request error:', error.response.data);
      // If unauthorized, clear token immediately
      if (error.response.status === 401) clearAccessToken();
    } else {
      console.error('Spotify API request error:', error.message);
    }
    throw error;
  }
};
