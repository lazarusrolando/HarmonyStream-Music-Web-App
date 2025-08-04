import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Navigation from '../../components/ui/Navigation';
import PlayerBar from '../../components/ui/PlayerBar';
import ProfileSection from './components/ProfileSection';
import WelcomeHeader from './components/WelcomeHeader';
import QuickAccessSection from './components/QuickAccessSection';
import RecentlyPlayedSection from './components/RecentlyPlayedSection';
import RecommendedSection from './components/RecommendedSection';
import PopularPlaylistsSection from './components/PopularPlaylistsSection';
import AnimatedSection from '../../components/AnimatedSection';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { getSpotifyAuthUrl, setAccessToken, spotifyApiRequest, clearAccessToken, getAccessToken } from '../../utils/spotifyApi';
import { useNavigate } from 'react-router-dom';

const HomeDashboard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    window.location.href = getSpotifyAuthUrl();
  };

  const handleLogout = () => {
    clearAccessToken();
    localStorage.removeItem('harmonystream_auth');
    setSpotifyUser(null);
    setPlaylists([]);
    navigate('/login', { replace: true });
  };
  const [scrollY, setScrollY] = useState(0);
  const [spotifyUser, setSpotifyUser] = useState(null);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check if user is authenticated either with Spotify or with email/password
    const isSpotifyAuthenticated = getAccessToken();
    const isEmailAuthenticated = localStorage.getItem('harmonystream_auth');
    
    // Redirect to login if neither authentication method is valid
    if (!isSpotifyAuthenticated && !isEmailAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }

    // Check for access token in URL hash (implicit grant flow)
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.replace('#', '?'));
      const token = params.get('access_token');
      const expiresIn = params.get('expires_in');
      if (token && expiresIn) {
        setAccessToken(token, parseInt(expiresIn, 10));
        window.history.replaceState(null, null, ' '); // Remove token from URL
      }
    }

    // Only fetch Spotify data if user is authenticated with Spotify
    if (isSpotifyAuthenticated && !spotifyUser) {
      const fetchSpotifyData = async () => {
        try {
          const user = await spotifyApiRequest('/me');
          setSpotifyUser(user);

          const userPlaylists = await spotifyApiRequest('/me/playlists');
          setPlaylists(userPlaylists.items);
        } catch (error) {
          console.error('Spotify API error:', error);
          if (error.message.includes('missing or expired')) {
            navigate('/login', { replace: true });
          }
        }
      };

      fetchSpotifyData();
    }
  }, [spotifyUser, navigate]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call or refresh Spotify data
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  const handlePullToRefresh = (e) => {
    const touchStartY = e.touches[0].clientY;
    const threshold = 100;
    
    const handleTouchMove = (moveEvent) => {
      const touchCurrentY = moveEvent.touches[0].clientY;
      const pullDistance = touchCurrentY - touchStartY;
      
      if (pullDistance > threshold && window.scrollY === 0) {
        handleRefresh();
        document.removeEventListener('touchmove', handleTouchMove);
      }
    };
    
    document.addEventListener('touchmove', handleTouchMove);
    
    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <>
      <Helmet>
        <title>Home Dashboard - HarmonyStream</title>
        <meta name="description" content="Discover personalized music recommendations, recently played tracks, and trending playlists on HarmonyStream." />
        <meta name="keywords" content="music streaming, dashboard, recommendations, playlists, new releases" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        <Header />
        
        {/* Main Content */}
        <main 
          className="pt-[120px] md:pt-[140px] pb-[160px] md:pb-[120px] px-4 lg:px-6"
          onTouchStart={handlePullToRefresh}
        >
          {/* Pull to Refresh Indicator */}
          {isRefreshing && (
            <div className="fixed top-[120px] md:top-[140px] left-1/2 transform -translate-x-1/2 z-50 bg-primary text-white px-4 py-2 rounded-full shadow-lg">
              <div className="flex items-center space-x-2">
                <Icon name="RefreshCw" size={16} className="rotate-loading" />
                <span className="text-sm font-medium">Refreshing...</span>
              </div>
            </div>
          )}

          {/* Parallax Background Effect */}
          <div 
            className="fixed inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, var(--color-primary) 0%, transparent 50%), radial-gradient(circle at 80% 20%, var(--color-accent) 0%, transparent 50%)',
              transform: `translateY(${scrollY * 0.5}px)`
            }}
          />

          <div className="max-w-7xl mx-auto space-y-6">
          {/* Prominent Profile Section - Now at the top */}
          <AnimatedSection animationType="fade-up" delay={0.1} repeatOnScroll={true}>
            <ProfileSection />
          </AnimatedSection>

          {/* Login Button */}
          <AnimatedSection animationType="fade-up" delay={0.2} repeatOnScroll={true}>
            <div className="mb-4 flex justify-end space-x-2">
              <Button
                variant="default"
                onClick={handleLogin}
              >
                Login
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </AnimatedSection>
 
          {/* Welcome Header - Now secondary */}
          <AnimatedSection animationType="fade-up" delay={0.3} repeatOnScroll={true}>
            <WelcomeHeader />
          </AnimatedSection>

            {/* Quick Access Grid */}
            <AnimatedSection animationType="fade-up" delay={0.4} repeatOnScroll={true}>
              <QuickAccessSection />
            </AnimatedSection>

            {/* Recently Played */}
            <RecentlyPlayedSection />

            {/* Recommended for You */}
            <RecommendedSection />

            {/* Popular Playlists Section */}
            <PopularPlaylistsSection />

            {/* Spotify Playlists */}
            {spotifyUser && (
              <AnimatedSection animationType="fade-up" delay={0.5} repeatOnScroll={true}>
                <section className="mb-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Your Spotify Playlists</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {playlists.map((playlist, index) => (
                      <AnimatedSection 
                        key={playlist.id} 
                        animationType="scale-up" 
                        delay={0.1 * index}
                        repeatOnScroll={true}
                        className="bg-card rounded-lg p-4 text-center hover:shadow-lg cursor-pointer"
                      >
                        <img src={playlist.images[0]?.url} alt={playlist.name} className="w-full h-32 object-cover rounded-md mb-2" />
                        <h3 className="text-sm font-medium text-foreground truncate">{playlist.name}</h3>
                        <p className="text-xs text-muted-foreground">{playlist.tracks.total} tracks</p>
                      </AnimatedSection>
                    ))}
                  </div>
                </section>
              </AnimatedSection>
            )}

            {/* Load More Button */}
            <AnimatedSection animationType="fade-up" delay={0.6} repeatOnScroll={true}>
              <div className="flex justify-center pt-6">
                <Button
                  variant="outline"
                  className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                >
                  {isRefreshing ? (
                    <>
                      <Icon name="RefreshCw" size={16} className="mr-2 rotate-loading" />
                      Loading more...
                    </>
                  ) : (
                    <>
                      <Icon name="RefreshCw" size={16} className="mr-2" />
                      Load more recommendations
                    </>
                  )}
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </main>

        <PlayerBar />

        {/* Floating Action Button - Mobile */}
        <div className="md:hidden fixed bottom-[160px] right-4 z-50">
          <Button
            variant="default"
            size="icon"
            className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
            onClick={handleRefresh}
          >
            <Icon name="Shuffle" size={24} color="white" />
          </Button>
        </div>

        {/* Scroll to Top Button */}
        {scrollY > 500 && (
          <div className="fixed bottom-[160px] md:bottom-[120px] left-4 z-50">
            <Button
              variant="secondary"
              size="icon"
              className="w-12 h-12 rounded-full bg-card/90 backdrop-blur-sm shadow-lg"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Icon name="ArrowUp" size={20} />
            </Button>
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .slider {
          background: linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) var(--value, 0%), var(--color-muted) var(--value, 0%), var(--color-muted) 100%);
        }
        
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: 2px solid var(--color-background);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: 2px solid var(--color-background);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </>
  );
};

export default HomeDashboard;
