import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { exchangeAuthorizationCode } from '../../utils/spotifyApi';

const Callback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');

    if (code) {
      exchangeAuthorizationCode(code, 'http://localhost:3000/callback')
        .then(() => {
          localStorage.setItem('harmonystream_auth', 'true');
          navigate('/home-dashboard', { replace: true });
        })
        .catch((error) => {
          console.error('Error exchanging code for token:', error);
          navigate('/login', { replace: true });
        });
    } else {
      // If no code found, redirect to login
      navigate('/login', { replace: true });
    }
  }, [navigate, location]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Loading...</p>
    </div>
  );
};

export default Callback;
