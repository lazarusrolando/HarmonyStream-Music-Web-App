import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAccessToken } from '../../utils/spotifyApi';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Parse the access token and expiration time from URL hash
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    const expiresIn = params.get('expires_in');

    if (accessToken && expiresIn) {
      // Store the access token using spotifyApi utility
      setAccessToken(accessToken, parseInt(expiresIn, 10));
      // Optionally, set a flag for authenticated user
      localStorage.setItem('harmonystream_auth', 'true');
      // Redirect to home dashboard
      navigate('/home-dashboard', { replace: true });
    } else {
      // If no token found, redirect to login
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Loading...</p>
    </div>
  );
};

export default Callback;
