// Wrapper for the provided fetchWebApi function
// This bridges the gap between the provided implementation and the new service

import spotifyService from '../services/spotifyService.js';

// The provided token from the task
const PROVIDED_TOKEN = '';

// The provided fetchWebApi function from the task
async function fetchWebApi(endpoint, method = 'GET', body = null) {
  const headers = {
    Authorization: `Bearer ${PROVIDED_TOKEN}`,
  };
  
  if (body) {
    headers['Content-Type'] = 'application/json';
  }
  
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers,
    method,
    body: body ? JSON.stringify(body) : null,
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Spotify API error: ${res.status} ${res.statusText} - ${JSON.stringify(errorData)}`);
  }
  
  return await res.json();
}

// Wrapper class that uses the provided implementation
class SpotifyApiWrapper {
  constructor() {
    this.token = PROVIDED_TOKEN;
  }

  // Use the provided fetchWebApi function
  async request(endpoint, method = 'GET', body = null) {
    return fetchWebApi(endpoint, method, body);
  }

  // Convenience methods using the provided implementation
  async getTopTracks(limit = 5) {
    return this.request(`v1/me/top/tracks?time_range=long_term&limit=${limit}`, 'GET');
  }

  async getUserProfile() {
    return this.request('v1/me', 'GET');
  }

  async getUserPlaylists(limit = 20) {
    return this.request(`v1/me/playlists?limit=${limit}`, 'GET');
  }

  async searchTracks(query, limit = 10) {
    const encodedQuery = encodeURIComponent(query);
    return this.request(`v1/search?q=${encodedQuery}&type=track&limit=${limit}`, 'GET');
  }

  async getTrack(id) {
    return this.request(`v1/tracks/${id}`, 'GET');
  }

  async getAlbum(id) {
    return this.request(`v1/albums/${id}`, 'GET');
  }

  async getArtist(id) {
    return this.request(`v1/artists/${id}`, 'GET');
  }

  async getArtistTopTracks(artistId, market = 'US') {
    return this.request(`v1/artists/${artistId}/top-tracks?market=${market}`, 'GET');
  }

  async getAudioFeatures(trackId) {
    return this.request(`v1/audio-features/${trackId}`, 'GET');
  }

  async createPlaylist(userId, name, description = '', isPublic = false) {
    return this.request(`v1/users/${userId}/playlists`, 'POST', {
      name,
      description,
      public: isPublic,
    });
  }

  async addTracksToPlaylist(playlistId, trackUris) {
    return this.request(`v1/playlists/${playlistId}/tracks`, 'POST', {
      uris: trackUris,
    });
  }
}

// Create singleton instance
const spotifyApiWrapper = new SpotifyApiWrapper();

// Export both the class and instance
export { SpotifyApiWrapper };
export default spotifyApiWrapper;

