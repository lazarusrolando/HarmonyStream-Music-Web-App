// Centralized Spotify configuration
const getSpotifyConfig = () => {
  const isDevelopment = window.location.hostname === 'localhost' || 
                       window.location.hostname.includes('replit') ||
                       window.location.hostname.includes('127.0.0.1');
  
  return {
    clientId: '2d8af60e31234b9baa2102eb79ef4664',
    redirectUri: isDevelopment 
      ? `${window.location.origin}/callback`
      : 'YOUR_PRODUCTION_CALLBACK_URL',
    backendUrl: isDevelopment 
      ? 'http://localhost:4000'
      : 'YOUR_PRODUCTION_BACKEND_URL',
    scopes: [
      'user-read-private',
      'user-read-email',
      'user-library-read',
      'playlist-read-private',
      'playlist-read-collaborative',
      'user-read-recently-played',
      'user-top-read'
    ]
  };
};

export default getSpotifyConfig;
