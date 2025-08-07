// Unified Spotify API Service
// Uses environment variables for secure token management

class SpotifyService {
  constructor() {
    this.baseURL = 'https://api.spotify.com/v1';
    this.token = process.env.REACT_APP_SPOTIFY_TOKEN || null;
  }

  // Set token dynamically
  setToken(token) {
    this.token = token;
    // Store in sessionStorage for persistence during session
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('spotify_token', token);
    }
  }

  // Get token from storage
  getToken() {
    if (!this.token && typeof window !== 'undefined') {
      this.token = sessionStorage.getItem('spotify_token');
    }
    return this.token;
  }

  // Generic API request method
  async request(endpoint, method = 'GET', body = null) {
    const token = this.getToken();
    
    if (!token) {
      throw new Error('Spotify access token is required');
    }

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const config = {
      method,
      headers,
    };

    if (body && method !== 'GET') {
      config.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(`${this.baseURL}/${endpoint}`, config);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Spotify API error: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Spotify API request failed:', error);
      throw error;
    }
  }

  // User profile methods
  async getUserProfile() {
    return this.request('me');
  }

  async getUserTopTracks(timeRange = 'medium_term', limit = 20) {
    return this.request(`me/top/tracks?time_range=${timeRange}&limit=${limit}`);
  }

  async getUserTopArtists(timeRange = 'medium_term', limit = 20) {
    return this.request(`me/top/artists?time_range=${timeRange}&limit=${limit}`);
  }

  // Library methods
  async getUserSavedTracks(limit = 20, offset = 0) {
    return this.request(`me/tracks?limit=${limit}&offset=${offset}`);
  }

  async getUserPlaylists(limit = 20, offset = 0) {
    return this.request(`me/playlists?limit=${limit}&offset=${offset}`);
  }

  // Search methods
  async search(query, type = 'track', limit = 20) {
    const encodedQuery = encodeURIComponent(query);
    return this.request(`search?q=${encodedQuery}&type=${type}&limit=${limit}`);
  }

  // Track methods
  async getTrack(id) {
    return this.request(`tracks/${id}`);
  }

  async getAudioFeatures(id) {
    return this.request(`audio-features/${id}`);
  }

  // Playlist methods
  async getPlaylist(id) {
    return this.request(`playlists/${id}`);
  }

  async getPlaylistTracks(id, limit = 100, offset = 0) {
    return this.request(`playlists/${id}/tracks?limit=${limit}&offset=${offset}`);
  }

  // Album methods
  async getAlbum(id) {
    return this.request(`albums/${id}`);
  }

  async getAlbumTracks(id, limit = 50, offset = 0) {
    return this.request(`albums/${id}/tracks?limit=${limit}&offset=${offset}`);
  }

  // Artist methods
  async getArtist(id) {
    return this.request(`artists/${id}`);
  }

  async getArtistTopTracks(id, market = 'US') {
    return this.request(`artists/${id}/top-tracks?market=${market}`);
  }

  async getArtistAlbums(id, limit = 20, offset = 0) {
    return this.request(`artists/${id}/albums?limit=${limit}&offset=${offset}`);
  }

  // Browse methods
  async getNewReleases(limit = 20, offset = 0) {
    return this.request(`browse/new-releases?limit=${limit}&offset=${offset}`);
  }

  async getFeaturedPlaylists(limit = 20, offset = 0) {
    return this.request(`browse/featured-playlists?limit=${limit}&offset=${offset}`);
  }

  async getCategories(limit = 20, offset = 0) {
    return this.request(`browse/categories?limit=${limit}&offset=${offset}`);
  }
}

// Create singleton instance
const spotifyService = new SpotifyService();

// Export both the class and instance
export { SpotifyService };
export default spotifyService;
