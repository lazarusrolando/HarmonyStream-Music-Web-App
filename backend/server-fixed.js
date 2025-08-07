// Updated Spotify API integration with proper backend endpoints
const API_BASE_URL = 'http://localhost:4000';

// Internal state
let accessToken = null;
let refreshToken = null;
let tokenExpiresAt = null;

export const clearAccessToken = () => {
  localStorage.removeItem('spotify_access_token');
  localStorage.removeItem('spotify_refresh_token');
}
