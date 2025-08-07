// Spotify Authentication Handler with CSP compliance
class SpotifyAuth {
  constructor() {
    this.config = this.getConfig();
    this.authWindow = null;
  }

  getConfig() {
    const isDevelopment = window.location.hostname === 'localhost' || 
                         window.location.hostname.includes('replit') ||
                         window.location.hostname.includes('127.0.0.1');
    
    return {
      clientId: '2d8af60e31234b9baa2102eb79ef4664',
      redirectUri: `${window.location.origin}/callback`,
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
  }

  authenticate() {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams({
        client_id: this.config.clientId,
        response_type: 'code',
        redirect_uri: this.config.redirectUri,
        scope: this.config.scopes.join(' '),
        show_dialog: false
      });

      const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;
      
      // Use popup window instead of blob URL to avoid CSP issues
      const width = 450;
      const height = 730;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
      
      this.authWindow = window.open(
        authUrl,
        'SpotifyAuth',
        `width=${width},height=${height},left=${left},top=${top}`
      );

      // Listen for the auth response
      const handleMessage = (event) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'SPOTIFY_AUTH_SUCCESS') {
          window.removeEventListener('message', handleMessage);
          if (this.authWindow && !this.authWindow.closed) {
            this.authWindow.close();
          }
          resolve(event.data.code);
        }
      };

      window.addEventListener('message', handleMessage);

      // Cleanup if window is closed
      const checkClosed = setInterval(() => {
        if (this.authWindow && this.authWindow.closed) {
          clearInterval(checkClosed);
          window.removeEventListener('message', handleMessage);
          reject(new Error('Authentication cancelled'));
        }
      }, 1000);

      // Timeout after 10 minutes
      setTimeout(() => {
        clearInterval(checkClosed);
        window.removeEventListener('message', handleMessage);
        if (this.authWindow && !this.authWindow.closed) {
          this.authWindow.close();
        }
        reject(new Error('Authentication timeout'));
      }, 600000);
    });
  }

  logout() {
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_token_expires_at');
    localStorage.removeItem('spotify_refresh_token');
  }

  isAuthenticated() {
    const token = localStorage.getItem('spotify_access_token');
    const expiresAt = localStorage.getItem('spotify_token_expires_at');
    
    if (!token || !expiresAt) return false;
    
    return Date.now() < parseInt(expiresAt);
  }
}

// Create singleton instance
const spotifyAuth = new SpotifyAuth();
export default spotifyAuth;
