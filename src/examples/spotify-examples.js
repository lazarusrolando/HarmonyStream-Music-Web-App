// Example usage of the new Spotify integration
// This demonstrates how to use both the new service and the provided implementation

import spotifyService from '../services/spotifyService.js';
import spotifyApiWrapper from '../utils/spotifyApiWrapper.js';

// Example 1: Using the new SpotifyService with the provided token
async function example1_NewService() {
  console.log('=== Example 1: Using new SpotifyService ===');
  
  try {
    // Set the provided token
    const providedToken = 'BQDqqACnOSvMKnCDcQala157rR23XtfH_tr1MLjVrn_8yG-Ljf7okKOe1akiaK9qPlbmw5XGDOMVAZG4DoTn5piBaqUcSi8rhZQAihSQKo_dYQXr_jXHGTvlzi0TL7zt0E3I5nK3Yznhrjp-uENN433DkKKYXu65ZrNfy_jTkZLXV9SpTTmF_rIuk-7NRgOVxFeWhTMlmbSn1S5DOGDVziYUB7kyv-CNOP_PmkNOludgzVgQYTxFVntUpOAqjSowCk-Oexz_sx632EWw4f81E88VyYvdF9NcHSjqc045qFREJotgOwjhv7qIrQlJ';
    spotifyService.setToken(providedToken);
    
    // Get user profile
    const profile = await spotifyService.getUserProfile();
    console.log('User Profile:', profile);
    
    // Get top tracks
    const topTracks = await spotifyService.getUserTopTracks('medium_term', 5);
    console.log('Top 5 Tracks:', topTracks);
    
  } catch (error) {
    console.error('Error in Example 1:', error);
  }
}

// Example 2: Using the provided fetchWebApi implementation directly
async function example2_ProvidedImplementation() {
  console.log('=== Example 2: Using provided fetchWebApi ===');
  
  try {
    // Get top tracks using the provided implementation
    const topTracks = await spotifyApiWrapper.getTopTracks(5);
    console.log('Top 5 Tracks (provided):', topTracks);
    
  } catch (error) {
    console.error('Error in Example 2:', error);
  }
}

// Example 3: Using the exact provided fetchWebApi function
async function example3_DirectUsage() {
  console.log('=== Example 3: Direct usage of provided fetchWebApi ===');
  
  const token = 'BQDqqACnOSvMKnCDcQala157rR23XtfH_tr1MLjVrn_8yG-Ljf7okKOe1akiaK9qPlbmw5XGDOMVAZG4DoTn5piBaqUcSi8rhZQAihSQKo_dYQXr_jXHGTvlzi0TL7zt0E3I5nK3Yznhrjp-uENN433DkKKYXu65ZrNfy_jTkZLXV9SpTTmF_rIuk-7NRgOVxFeWhTMlmbSn1S5DOGDVziYUB7kyv-CNOP_PmkNOludgzVgQYTxFVntUpOAqjSowCk-Oexz_sx632EWw4f81E88VyYvdF9NcHSjqc045qFREJotgOwjhv7qIrQlJ';
  
  async function fetchWebApi(endpoint, method = 'GET', body = null) {
    const headers = {
      Authorization: `Bearer ${token}`,
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
  
  try {
    // Get top tracks using the exact provided function
    const topTracks = await fetchWebApi('v1/me/top/tracks?time_range=long_term&limit=5', 'GET');
    console.log('Top 5 Tracks (direct):', topTracks);
    
  } catch (error) {
    console.error('Error in Example 3:', error);
  }
}

// Run all examples
async function runAllExamples() {
  console.log('Starting Spotify Integration Examples...\n');
  
  await example1_NewService();
  console.log('\n');
  
  await example2_ProvidedImplementation();
  console.log('\n');
  
  await example3_DirectUsage();
  console.log('\nAll examples completed!');
}

// Export for use in other files
export {
  example1_NewService,
  example2_ProvidedImplementation,
  example3_DirectUsage,
  runAllExamples
};

// Run examples if this file is executed directly
if (typeof window !== 'undefined') {
  window.runSpotifyExamples = runAllExamples;
}
