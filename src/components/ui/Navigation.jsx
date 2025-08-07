import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Navigation = () => {
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Home',
      path: '/home-dashboard',
      icon: 'Home',
      tooltip: 'Discover new music and see your recommendations'
    },
    {
      label: 'Search',
      path: '/search',
      icon: 'Search',
      tooltip: 'Search for songs, artists, and albums'
    },
    {
      label: 'Browse',
      path: '/browse',
      icon: 'Grid3X3',
      tooltip: 'Browse genres, playlists, and curated content'
    },
    {
      label: 'Library',
      path: '/library',
      icon: 'Library',
      tooltip: 'Your saved music, playlists, and downloads'
    }
  ];

  const isLoginPage = location.pathname === '/login';

  if (isLoginPage) {
    return null;
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-header left-0 right-0 z-navigation glassmorphism" style={{borderRadius: '0px 0px'}}>
        <div className="flex items-center justify-center">
          <div className="flex space-x-8 px-6">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-none transition-smooth hover-scale group relative ${
                    isActive
                      ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                  title={item.tooltip}
                >
                  <Icon 
                    name={item.icon} 
                    size={20} 
                    className={isActive ? 'text-primary' : 'group-hover:text-foreground'} 
                  />
                  <span className="font-medium text-sm">{item.label}</span>
                  
                  {isActive && (
                    <>
                      <div
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-primary rounded-full origin-center"
                        style={{
                          width: '24px',
                          height: '3px',
                          transition: 'transform 0.3s ease',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.animation = 'bounceSpread 0.6s forwards';
                        }}
                        onAnimationEnd={e => {
                          e.currentTarget.style.animation = '';
                        }}
                      ></div>
                      <style>
                        {`
                          @keyframes bounceSpread {
                            0% {
                              transform: scaleX(0) translateX(-50%);
                            }
                            50% {
                              transform: scaleX(1.2) translateX(-50%);
                            }
                            100% {
                              transform: scaleX(1) translateX(-50%);
                            }
                          }
                        `}
                      </style>
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-player left-0 right-0 z-navigation glassmorphism border-t border-border/30">
        <div className="flex items-center justify-around px-2 py-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center min-touch px-2 py-1 rounded-none transition-smooth ${
                  isActive
                    ? 'text-primary' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon 
                  name={item.icon} 
                  size={22} 
                  className={`mb-1 ${isActive ? 'text-primary' : ''}`} 
                />
                <span className={`text-xs font-medium ${isActive ? 'text-primary' : ''}`}>
                  {item.label}
                </span>
                
                  {isActive && (
                    <>
                      <div
                        className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-primary rounded-full origin-center"
                        style={{
                          width: '24px',
                          height: '3px',
                          transition: 'transform 0.3s ease',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.animation = 'bounceSpread 0.6s forwards';
                        }}
                        onAnimationEnd={e => {
                          e.currentTarget.style.animation = '';
                        }}
                      ></div>
                      <style>
                        {`
                          @keyframes bounceSpread {
                            0% {
                              transform: scaleX(0) translateX(-50%);
                            }
                            50% {
                              transform: scaleX(1.2) translateX(-50%);
                            }
                            100% {
                              transform: scaleX(1) translateX(-50%);
                            }
                          }
                        `}
                      </style>
                    </>
                  )}
              </Link>
            );
          })}
          
          {/* Settings Tab for Mobile */}
          <Link
            to="/settings"
            className={`flex flex-col items-center justify-center min-touch px-2 py-1 rounded-lg transition-smooth ${
              location.pathname === '/settings' ?'text-primary' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon 
              name="Settings" 
              size={22} 
              className={`mb-1 ${location.pathname === '/settings' ? 'text-primary' : ''}`} 
            />
            <span className={`text-xs font-medium ${location.pathname === '/settings' ? 'text-primary' : ''}`}>
              Settings
            </span>
            
            {location.pathname === '/settings' && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
            )}
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navigation;