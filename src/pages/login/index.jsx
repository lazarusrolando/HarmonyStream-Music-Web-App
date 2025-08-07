import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import LoginBackground from './components/LoginBackground';
import { getSpotifyAuthUrl } from '../../utils/spotifyApi';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is already authenticated (mock check)
    const isAuthenticated = localStorage.getItem('harmonystream_auth');
    if (isAuthenticated) {
      // Redirect to intended destination or dashboard
      const from = location.state?.from?.pathname || '/home-dashboard';
      navigate(from, { replace: true });
    }
  }, [navigate, location]);

  const handleSpotifyLogin = () => {
    window.location.href = getSpotifyAuthUrl();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Background Elements */}
      <LoginBackground />
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Glassmorphism Container */}
          <div className="glassmorphism p-8 rounded-2xl shadow-2xl backdrop-blur-xl border border-white/10">
            {/* Header Section */}
            <LoginHeader />
            
            {/* Form Section */}
            <LoginForm />

            {/* Spotify Login Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleSpotifyLogin}
                className="py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                style={{ width: 'auto', textAlign: 'center', paddingLeft: '1rem', paddingRight: '1rem', borderRadius: '2rem' }}
              >
                Log in with Spotify
              </button>
            </div>
          </div>
          
          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <button 
                className="text-primary hover:text-primary/80 font-medium transition-colors"
                onClick={() => {
                  // Navigate to signup page
                  navigate('/signup');
                }}
              >
                Sign up for free
              </button>
            </p>
            
            <div className="mt-4 flex items-center justify-center space-x-6 text-xs text-muted-foreground">
              <button className="hover:text-foreground transition-colors">
                Privacy Policy
              </button>
              <span>•</span>
              <button className="hover:text-foreground transition-colors">
                Terms of Service
              </button>
              <span>•</span>
              <button className="hover:text-foreground transition-colors">
                Support
              </button>
            </div>
            
            <div className="mt-4 text-xs text-muted-foreground">
              © {new Date().getFullYear()} HarmonyStream. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
