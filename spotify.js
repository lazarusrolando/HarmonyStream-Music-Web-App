// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQDIHDVubQp7hOTX-px5Ii2nvkOezOi9CFDd-nbjhHcupesQ4C7WIZmpLcQuM79SCikvq_l8G280eiY4KL2kxEvd89mp1iscJFCPGqMnF7Ee8cTFiznvuvN9ISlMOMrVbQdD-zSMssmfHb9Tet7nUkex38Rde0jfu_VHq1cn4hcRNGqW4n-vapKGe5lXJcN-NVSdIed3etRihv1SULpDovhQyf0obc6LWjwXnB7fffu3RkzcEymMIEe52barhkCvXdZD9Y5QUnu4-YuQ3SmvAZyEZj3IRtAW3fzTX0E9056REVvCawZcGEBo_P7T';

async function fetchWebApi(endpoint, method = 'GET', body = null) {
  const headers = {
    Authorization: `Bearer BQDIHDVubQp7hOTX-px5Ii2nvkOezOi9CFDd-nbjhHcupesQ4C7WIZmpLcQuM79SCikvq_l8G280eiY4KL2kxEvd89mp1iscJFCPGqMnF7Ee8cTFiznvuvN9ISlMOMrVbQdD-zSMssmfHb9Tet7nUkex38Rde0jfu_VHq1cn4hcRNGqW4n-vapKGe5lXJcN-NVSdIed3etRihv1SULpDovhQyf0obc6LWjwXnB7fffu3RkzcEymMIEe52barhkCvXdZD9Y5QUnu4-YuQ3SmvAZyEZj3IRtAW3fzTX0E9056REVvCawZcGEBo_P7T`,
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

async function getTopTracks() {
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return await fetchWebApi('v1/me/top/tracks?time_range=long_term&limit=5', 'GET');
}

function displayTopTracks(tracks) {
  const container = document.getElementById('top-tracks');
  if (!container) return;
  container.innerHTML = '';
  tracks.forEach(({ name, artists }) => {
    const trackElem = document.createElement('p');
    trackElem.textContent = `${name} by ${artists.map(artist => artist.name).join(', ')}`;
    container.appendChild(trackElem);
  });
}

async function refreshTopTracks() {
  try {
    const topTracks = await getTopTracks();
    displayTopTracks(topTracks);
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    const container = document.getElementById('top-tracks');
    if (container) {
      container.textContent = 'Failed to load top tracks. Please check console for details.';
    }
  }
}

document.getElementById('refresh-button').addEventListener('click', refreshTopTracks);

// Initial load
refreshTopTracks();
