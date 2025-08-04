import React, { useEffect, useState } from 'react';
import { spotifyApiRequest } from '../../../utils/spotifyApi';

const TopTracksEmbed = () => {
  const [topTracks, setTopTracks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const data = await spotifyApiRequest('/me/top/tracks?time_range=long_term&limit=5');
        setTopTracks(data.items || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch top tracks');
      }
    };

    fetchTopTracks();
  }, []);

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (topTracks.length === 0) {
    return <div>No top tracks found.</div>;
  }

  return (
    <div className="top-tracks-embed">
      <h2>Your Top Tracks</h2>
      <ul>
        {topTracks.map(track => (
          <li key={track.id}>
            <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
              {track.name} by {track.artists.map(artist => artist.name).join(', ')}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopTracksEmbed;
