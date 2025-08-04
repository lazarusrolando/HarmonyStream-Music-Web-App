import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Mock credentials for authentication
  const mockCredentials = {
    email: 'user@harmonystream.com',
    password: 'harmony123'
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    setAuthError('');
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setAuthError('');
    
    // Simulate API call
    setTimeout(() => {
      if (formData.email === mockCredentials.email && formData.password === mockCredentials.password) {
        // Success - set authentication flag and redirect to dashboard
        localStorage.setItem('harmonystream_auth', 'true');
        navigate('/home-dashboard');
      } else {
        setAuthError('Invalid email or password. Please try again.');
        // Add shake animation class
        const formElement = document.querySelector('.login-form');
        formElement?.classList.add('animate-shake');
        setTimeout(() => {
          formElement?.classList.remove('animate-shake');
        }, 500);
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleSpotifyLogin = () => {
    setIsLoading(true);
    
    // Simulate Spotify OAuth flow
    setTimeout(() => {
      localStorage.setItem('harmonystream_auth', 'true');
      navigate('/home-dashboard');
    }, 2000);
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic
    console.log('Forgot password clicked');
  };

  return (
    <div className="w-full max-w-sm mx-auto glassmorphism p-6 rounded-2xl">
      {/* Spotify Login Button */}
      <Button
        variant="default"
        fullWidth
        onClick={handleSpotifyLogin}
        disabled={isLoading}
        loading={isLoading}
        iconName="Music"
        iconPosition="left"
        className="mb-6 bg-[#1DB954] hover:bg-[#1ed760] text-white border-0 h-12 text-base font-medium transition-all duration-200 hover:scale-[1.02] rounded-full shadow-lg glassmorphism"
      >
        Connect with Spotify
      </Button>

      {/* Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/30"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="glassmorphism px-4 text-muted-foreground font-medium rounded-full" style={{ padding: '1rem' }}>
            Or continue with email
          </span>
        </div>
      </div>

      {/* Email/Password Form */}
      <form onSubmit={handleEmailLogin} className="login-form space-y-4">
        {/* Auth Error Message */}
        {authError && (
          <div className="p-3 rounded-lg glassmorphism border border-destructive/30 text-destructive text-sm flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} />
            <span>{authError}</span>
          </div>
        )}

        {/* Email Input */}
        <Input
          type="email"
          name="email"
          label="Email Address"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          required
          disabled={isLoading}
          className="transition-all duration-200 rounded-full glassmorphism"
        />

        {/* Password Input */}
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            required
            disabled={isLoading}
            className="transition-all duration-200 pr-12 rounded-full glassmorphism"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-11 text-muted-foreground hover:text-foreground transition-colors"
            disabled={isLoading}
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
          </button>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="glassmorphism p-3 rounded-lg">
            <Checkbox
              label="Remember me"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              name="rememberMe"
              disabled={isLoading}
              size="sm"
            />
          </div>
          
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-primary hover:text-primary/80 transition-colors font-medium glassmorphism px-3 py-2 rounded-lg"
            disabled={isLoading}
          >
            Forgot password?
          </button>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          variant="outline"
          fullWidth
          disabled={isLoading}
          loading={isLoading}
          className="h-12 text-base font-medium transition-all duration-200 rounded-full hover:scale-[1.02] glassmorphism"
        >
          Sign In
        </Button>
      </form>

      {/* Mock Credentials Info */}
      <div className="mt-6 p-3 rounded-lg glassmorphism">
        <p className="text-xs text-muted-foreground text-center mb-2 font-medium">
          Demo Credentials:
        </p>
        <div className="text-xs text-muted-foreground space-y-1 text-center rounded-full">
          <div className="flex justify-between">
            <span>Email:</span>
            <span className="font-mono">{mockCredentials.email}</span>
          </div>
          <div className="flex justify-between">
            <span>Password:</span>
            <span className="font-mono">{mockCredentials.password}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;