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
    
    // Search for tracks
    const searchResults = await spotifyService.search('Imagine Dragons', 'track', 5);
    console.log('Search Results:', searchResults);
    
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
    
    // Get user profile
    const profile = await spotifyApiWrapper.getUserProfile();
    console.log('User Profile (provided):', profile);
    
  } catch (error) {
    console.error('Error in Example 2:', error);
  }
}

// Example 3: Using the exact provided fetchWebApi function
async function example3_DirectUsage() {
  console.log('=== Example 3: Direct usage of provided fetchWebApi ===');
  
  // The exact provided fetchWebApi function
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

// Example 4: Environment variable approach (recommended for production)
async function example4_EnvironmentVariables() {
  console.log('=== Example 4: Environment variable approach ===');
  
  // In production, you would set the token via environment variables
  // Create a .env file with: REACT_APP_SPOTIFY_TOKEN=your_token_here
  
  // This would be handled automatically by the service
  try {
    // The service would automatically use the environment variable
    const profile = await spotifyService.getUserProfile();
    console.log('User Profile (env):', profile);
    
  } catch (error) {
    console.error('Error in Example 4:', error);
  }
}

// Example 5: Error handling and retry logic
async function example5_ErrorHandling() {
  console.log('=== Example 5: Error handling and retry ===');
  
  async function safeApiCall(apiFunction, retries = 3) {
    for (let i = 0; i < retries; i++) {
      try {
        return await apiFunction();
      } catch (error) {
        console.warn(`Attempt ${i + 1} failed:`, error.message);
        if (i === retries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
      }
    }
  }
  
  try {
    const profile = await safeApiCall(() => spotifyService.getUserProfile());
    console.log('User Profile (with retry):', profile);
    
  } catch (error) {
    console.error('All retry attempts failed:', error);
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
  console.log('\n');
  
  await example4_EnvironmentVariables();
  console.log('\n');
  
  await example5_ErrorHandling();
  console.log('\nAll examples completed!');
}

// Export for use in other files
export {
  example1_NewService,
  example2I have created a unified Spotify API service in src/services/spotifyService.js that uses environment variables for token management and provides a comprehensive set of Spotify API methods.

Additionally, I created a wrapper in src/utils/spotifyApiWrapper.js that uses the provided token and fetchWebApi function from the task, exposing convenient methods for common Spotify API calls.

Next steps:
- Replace existing Spotify API usage in the codebase with the new unified service or wrapper as appropriate.
- Remove hardcoded tokens from other files like spotify.js and src/utils/spotifyApi.js.
- Test the integration to ensure the token is used correctly and API calls succeed.

Please confirm if you want me to proceed with refactoring the existing code to use the new service and wrapper, or if you have any other specific requests.
