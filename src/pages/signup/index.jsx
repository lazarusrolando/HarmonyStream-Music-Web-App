import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginBackground from '../login/components/LoginBackground';
import LoginHeader from '../login/components/LoginHeader';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Signup failed');
      }

      alert('Signup successful! Please login.');
      localStorage.setItem('harmonystream_auth', 'true');
      
      // Create and download profile JSON file
      const profileData = {
        email: formData.email,
        username: formData.username,
        memberSince: new Date().getFullYear().toString(),
        premium: false, // Default to false for new users
        stats: {
          totalPlays: 0,
          hoursListened: 0,
          songsLiked: 0,
          playlistsCreated: 0,
          followingArtists: 0,
          followers: 0
        }
      };
      const jsonString = JSON.stringify(profileData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const fileName = `${formData.username.replace(/\s+/g, '_')}_profile.json`;

      // Trigger download
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      
      navigate('/home-dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <LoginBackground />
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md glassmorphism p-8 rounded-2xl shadow-2xl border border-white/10">
          <LoginHeader title="Sign Up" />
          {error && (
            <div className="mb-4 text-red-600 font-medium text-center">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4 login-form">
            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="transition-all duration-200 rounded-full glassmorphism"
            />
            <Input
              type="text"
              name="username"
              label="Username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
              className="transition-all duration-200 rounded-full glassmorphism"
            />
            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="transition-all duration-200 rounded-full glassmorphism"
            />
            <Input
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="transition-all duration-200 rounded-full glassmorphism"
            />
            <Button
              type="submit"
              variant="default"
              fullWidth
              className="h-12 rounded-full text-base font-medium transition-all duration-200 hover:scale-[1.02] glassmorphism"
            >
              Sign Up
            </Button>
          </form>
        </div>
        <br />
        {/* Footer Links */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-primary hover:text-primary/80 font-medium transition-colors glassmorphism px-3 py-2 rounded-lg"
          >
            Log in
          </button>
        </p>
        <div className="mt-6 text-center text-xs text-muted-foreground">
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
  );
};

export default Signup;
