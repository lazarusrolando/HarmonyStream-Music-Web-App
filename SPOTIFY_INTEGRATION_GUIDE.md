# Spotify API Integration Guide

This guide explains how to use the new unified Spotify API integration in this project.

## Overview

The project now includes three different approaches for Spotify API integration:

1. **New Unified Service** (`src/services/spotifyService.js`) - Recommended
2. **Provided Implementation Wrapper** (`src/utils/spotifyApiWrapper.js`) - Uses the exact provided token and fetchWebApi
3. **Legacy Implementations** - Existing files that should be migrated

## Quick Start

### Using the New Service (Recommended)

```javascript
import spotifyService from '../services/spotifyService.js';

// Set the provided token
const token = 'BQDqqACnOSvMKnCDcQala157rR23XtfH_tr1MLjVrn_8yG-Ljf7okKOe1akiaK9qPlbmw5XGDOMVAZG4DoTn5piBaqUcSi8rhZQAihSQKo_dYQXr_jXHGTvlzi0TL7zt0E3I5nK3Yznhrjp-uENN433DkKKYXu65ZrNfy_jTkZLXV9SpTTmF_rIuk-7NRgOVxFeWhTMlmbSn1S5DOGDVziYUB7kyv-CNOP_PmkNOludgzVgQYTxFVntUpOAqjSowCk-Oexz_sx632EWw4f81E88VyYvdF9NcHSjqc045qFREJotgOwjhv7qIrQlJ';
spotifyService.setToken(token);

// Get user profile
const profile = await spotifyService.getUserProfile();

// Get top tracks
const topTracks = await spotifyService.getUserTopTracks('medium_term', 10);
```

### Using the Provided Implementation

```javascript
import spotifyApiWrapper from '../utils/spotifyApiWrapper.js';

// Uses the provided token automatically
const topTracks = await spotifyApiWrapper.getTopTracks(5);
const profile = await spotifyApiWrapper.getUserProfile();
```

## Available Methods

### User Methods
- `getUserProfile()` - Get current user's profile
- `getUserTopTracks(timeRange, limit)` - Get user's top tracks
- `getUserTopArtists(timeRange, limit)` - Get user's top artists
- `getUserSavedTracks(limit, offset)` - Get user's saved tracks
- `getUserPlaylists(limit, offset)` - Get user's playlists

### Search Methods
- `search(query, type, limit)` - Search for tracks, artists, albums, etc.
- `getTrack(id)` - Get track details
- `getAlbum(id)` - Get album details
- `getArtist(id)` - Get artist details

### Library Methods
- `getNewReleases(limit, offset)` - Get new releases
- `getFeaturedPlaylists(limit, offset)` - Get featured playlists
- `getCategories(limit, offset)` - Get browse categories

## Environment Variables

For production use, create a `.env` file:

```bash
REACT_APP_SPOTIFY_TOKEN=your_token_here
```

## Migration Guide

### From spotify.js

Replace:
```javascript
// Old way
const token = 'hardcoded_token';
async function fetchWebApi(endpoint, method, body) { ... }

// New way
import spotifyService from '../services/spotifyService.js';
spotifyService.setToken('your_token');
const result = await spotifyService.request(endpoint, method, body);
```

### From src/utils/spotifyApi.js

Replace:
```javascript
// Old way
import { spotifyApiRequest } from './spotifyApi.js';

// New way
import spotifyService from '../services/spotifyService.js';
const result = await spotifyService.request(endpoint, method, body);
```

## Error Handling

All methods include proper error handling:

```javascript
try {
  const tracks = await spotifyService.getUserTopTracks('medium_term', 10);
  console.log(tracks);
} catch (error) {
  console.error('Spotify API Error:', error.message);
}
```

## Testing

Run the examples:

```javascript
import { runAllExamples } from '../examples/spotify-examples.js';
await runAllExamples();
```

## Security Notes

1. **Never commit tokens to version control**
2. **Use environment variables for production**
3. **Consider implementing token refresh for long-term use**
4. **Store tokens securely (sessionStorage vs localStorage)**

## File Structure

```
src/
├── services/
│   └── spotifyService.js          # New unified service
├── utils/
│   ├── spotifyApiWrapper.js       # Provided implementation wrapper
│   └── spotifyApi.js             # Legacy (to be deprecated)
├── examples/
│   └── spotify-examples.js       # Usage examples
└── ...
```

## Next Steps

1. **Migrate existing code** to use the new service
2. **Remove hardcoded tokens** from all source files
3. **Implement token refresh** for OAuth flow
4. **Add comprehensive error handling**
5. **Add loading states** for UI components

## Troubleshooting

### Common Issues

1. **"Spotify access token is required"**
   - Ensure you've set the token using `spotifyService.setToken(token)`

2. **"401 Unauthorized"**
   - Check if the token is valid and not expired
   - Verify the token has required scopes

3. **"Network Error"**
   - Check internet connection
   - Verify Spotify API is accessible

### Debug Mode

Enable debug logging:
```javascript
// Add to your component
window.DEBUG_SPOTIFY = true;
```

## Support

For issues or questions, please refer to:
- [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api)
- [Project Issues](link-to-issues)
- [Contributing Guide](link-to-contributing)
