import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Input from './Input';
import Button from './Button';
import { clearAccessToken } from '../../utils/spotifyApi';
import { Radius } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const isLoginPage = location.pathname === '/login';

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search with query
      console.log('Search for:', searchQuery);
    }
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleLogout = () => {
    setShowProfileDropdown(false);
    clearAccessToken();
    localStorage.removeItem('harmonystream_language'); // Clear other user data if needed
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowProfileDropdown(false);
      }
    };

    if (showProfileDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown]);

  if (isLoginPage) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-navigation glassmorphism-header border-b border-border/30">
      <div className="flex items-center justify-between h-header px-4 lg:px-6">
        {/* Logo */}
        <Link to="/home-dashboard" className="flex items-center space-x-2 hover:opacity-80 transition-smooth">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Music" size={20} color="white" />
          </div>
          <span className="text-xl font-semibold text-foreground hidden sm:block">
            HarmonyStream
          </span>
        </Link>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <form onSubmit={handleSearchSubmit} className="w-full relative">
            <div className="relative">
              <Icon
                name="Search"
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              />
              <Input
                type="search"
                placeholder="Search for songs, artists, albums..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-2 w-full bg-card border-border rounded-full focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
              />
            </div>
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search Button - Mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
          >
            <Icon name="Search" size={20} />
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Icon name="Bell" size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"></span>
          </Button>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <Button
              size="icon"
              onClick={toggleProfileDropdown}
              className="rounded-full"
              ref={buttonRef}
            >
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <Icon name="User" size={18} />
              </div>
            </Button>

              {showProfileDropdown && (
                <div className="absolute right-0 top-full mt-2 w-48 glassmorphism rounded-xl z-[9999] transform translate-x-1">
                  <div className="py-2">
                    <div className="px-4 py-3 border-b border-border/20">
                      <p className="text-sm font-medium text-foreground">John Doe</p>
                      <p className="text-xs text-muted-foreground">john@example.com</p>
                    </div>

                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-3 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-smooth group"
                      onClick={() => setShowProfileDropdown(false)}
                    >
                      <Icon name="Settings" size={16} className="mr-3 group-hover:text-primary transition-smooth" />
                      Settings
                    </Link>

                    <button
                      className="flex items-center w-full px-4 py-3 text-sm text-foreground hover:bg-destructive/10 hover:text-destructive transition-smooth group"
                      onClick={handleLogout}
                    >
                      <Icon name="LogOut" size={16} className="mr-3 group-hover:text-destructive transition-smooth" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {isSearchExpanded && (
        <div className="md:hidden absolute top-full left-0 right-0 glassmorphism border-b border-border/30 p-4 z-dropdown">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Icon
              name="Search"
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="search"
              placeholder="Search for songs, artists, albums..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 pr-12 py-3 w-full bg-card/30 border-border rounded-full"
              autoFocus
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={() => setIsSearchExpanded(false)}
            >
              <Icon name="X" size={18} />
            </Button>
          </form>
        </div>
      )}
    </header>
  );
};

export default Header