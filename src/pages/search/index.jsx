import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Navigation from '../../components/ui/Navigation';
import PlayerBar from '../../components/ui/PlayerBar';
import AnimatedSection from '../../components/AnimatedSection';
import SearchFilters from './components/SearchFilters';
import SearchSuggestions from './components/SearchSuggestions';
import RecentSearches from './components/RecentSearches';
import SearchTabs from './components/SearchTabs';
import ArtistCard from './components/ArtistCard';
import AlbumCard from './components/AlbumCard';
import TrackCard from './components/TrackCard';
import PlaylistCard from './components/PlaylistCard';
import TrendingSection from './components/TrendingSection';

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Results state
  const [searchResults, setSearchResults] = useState({
    artists: [],
    albums: [],
    tracks: [],
    playlists: []
  });
  
  const [resultCounts, setResultCounts] = useState({
    all: 0,
    artists: 0,
    albums: 0,
    tracks: 0,
    playlists: 0
  });

  // Recent searches state
  const [recentSearches, setRecentSearches] = useState([
    "Taylor Swift",
    "Bad Bunny",
    "The Weeknd",
    "Billie Eilish"
  ]);

  // Filters state
  const [filters, setFilters] = useState({
    genre: 'all',
    year: 'all',
    duration: 'all',
    explicit: false,
    hasLyrics: false,
    popularity: 50
  });

  // Mock data
  const mockSuggestions = [
    {
      id: 1,
      type: 'artist',
      title: 'Taylor Swift',
      subtitle: '90.2M monthly listeners',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 2,
      type: 'track',
      title: 'Anti-Hero',
      subtitle: 'Taylor Swift • Midnights',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop'
    },
    {
      id: 3,
      type: 'album',
      title: 'Midnights',
      subtitle: 'Taylor Swift • 2022',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop'
    },
    {
      id: 4,
      type: 'playlist',
      title: 'Taylor Swift Essentials',
      subtitle: 'Spotify • 2.1M likes',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop'
    }
  ];

  const mockArtists = [
    {
      id: 1,
      name: 'Taylor Swift',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face',
      followers: 90200000,
      isFollowing: true
    },
    {
      id: 2,
      name: 'The Weeknd',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face',
      followers: 85600000,
      isFollowing: false
    },
    {
      id: 3,
      name: 'Bad Bunny',
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=200&h=200&fit=crop&crop=face',
      followers: 78900000,
      isFollowing: false
    }
  ];

  const mockAlbums = [
    {
      id: 1,
      title: 'Midnights',
      artist: 'Taylor Swift',
      artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
      releaseDate: '2022-10-21',
      trackCount: 13,
      isSaved: true
    },
    {
      id: 2,
      title: 'After Hours',
      artist: 'The Weeknd',
      artwork: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop',
      releaseDate: '2020-03-20',
      trackCount: 14,
      isSaved: false
    }
  ];

  const mockTracks = [
    {
      id: 1,
      title: 'Anti-Hero',
      artist: 'Taylor Swift',
      album: 'Midnights',
      artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop',
      duration: 200,
      isLiked: true
    },
    {
      id: 2,
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      album: 'After Hours',
      artwork: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop',
      duration: 200,
      isLiked: false
    }
  ];

  const mockPlaylists = [
    {
      id: 1,
      title: 'Today\'s Top Hits',
      creator: 'Spotify',
      artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
      trackCount: 50,
      followers: '28M',
      isFollowing: true
    },
    {
      id: 2,
      title: 'RapCaviar',
      creator: 'Spotify',
      artwork: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop',
      trackCount: 65,
      followers: '15M',
      isFollowing: false
    }
  ];

  // Debounced search function
  const debounceSearch = useCallback((query) => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        performSearch(query);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Perform search
  const performSearch = (query) => {
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const results = {
        artists: mockArtists.filter(artist => 
          artist.name.toLowerCase().includes(query.toLowerCase())
        ),
        albums: mockAlbums.filter(album => 
          album.title.toLowerCase().includes(query.toLowerCase()) ||
          album.artist.toLowerCase().includes(query.toLowerCase())
        ),
        tracks: mockTracks.filter(track => 
          track.title.toLowerCase().includes(query.toLowerCase()) ||
          track.artist.toLowerCase().includes(query.toLowerCase())
        ),
        playlists: mockPlaylists.filter(playlist => 
          playlist.title.toLowerCase().includes(query.toLowerCase())
        )
      };

      setSearchResults(results);
      setResultCounts({
        all: results.artists.length + results.albums.length + results.tracks.length + results.playlists.length,
        artists: results.artists.length,
        albums: results.albums.length,
        tracks: results.tracks.length,
        playlists: results.playlists.length
      });
      setIsSearching(false);
    }, 500);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowSuggestions(query.length > 0);
    
    if (query.trim()) {
      debounceSearch(query);
    } else {
      setSearchResults({ artists: [], albums: [], tracks: [], playlists: [] });
      setResultCounts({ all: 0, artists: 0, albums: 0, tracks: 0, playlists: 0 });
    }
  };

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      addToRecentSearches(searchQuery);
      performSearch(searchQuery);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.title);
    setShowSuggestions(false);
    addToRecentSearches(suggestion.title);
    performSearch(suggestion.title);
  };

  // Handle trending click
  const handleTrendingClick = (query) => {
    setSearchQuery(query);
    addToRecentSearches(query);
    performSearch(query);
  };

  // Add to recent searches
  const addToRecentSearches = (query) => {
    setRecentSearches(prev => {
      const filtered = prev.filter(search => search !== query);
      return [query, ...filtered].slice(0, 8);
    });
  };

  // Remove from recent searches
  const handleRemoveRecentSearch = (index) => {
    setRecentSearches(prev => prev.filter((_, i) => i !== index));
  };

  // Clear all recent searches
  const handleClearRecentSearches = () => {
    setRecentSearches([]);
  };

  // Handle play actions
  const handlePlayArtist = (artist) => {
    console.log('Playing artist:', artist.name);
  };

  const handlePlayAlbum = (album) => {
    console.log('Playing album:', album.title);
  };

  const handlePlayTrack = (track) => {
    console.log('Playing track:', track.title);
  };

  const handlePlayPlaylist = (playlist) => {
    console.log('Playing playlist:', playlist.title);
  };

  // Handle follow/save actions
  const handleFollowArtist = (artist) => {
    console.log('Following artist:', artist.name);
  };

  const handleSaveAlbum = (album) => {
    console.log('Saving album:', album.title);
  };

  const handleLikeTrack = (track) => {
    console.log('Liking track:', track.title);
  };

  const handleFollowPlaylist = (playlist) => {
    console.log('Following playlist:', playlist.title);
  };

  const handleAddToPlaylist = (track) => {
    console.log('Adding to playlist:', track.title);
  };

  // Render results based on active tab
  const renderResults = () => {
    if (isSearching) {
      return (
        <AnimatedSection animationType="fade-up" delay={0.3} repeatOnScroll={true}>
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-muted-foreground">Searching...</span>
            </div>
          </div>
        </AnimatedSection>
      );
    }

    if (!searchQuery.trim()) {
      return (
        <AnimatedSection animationType="fade-up" delay={0.3} repeatOnScroll={true}>
          <TrendingSection onTrendingClick={handleTrendingClick} />
        </AnimatedSection>
      );
    }

    if (resultCounts.all === 0) {
      return (
        <AnimatedSection animationType="fade-up" delay={0.3} repeatOnScroll={true}>
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No results found</h3>
            <p className="text-muted-foreground mb-4">
              Try searching for something else or check your spelling
            </p>
            <Button variant="outline" onClick={() => setSearchQuery('')}>
              Clear Search
            </Button>
          </div>
        </AnimatedSection>
      );
    }

    const renderTabContent = () => {
      switch (activeTab) {
        case 'artists':
          return (
            <AnimatedSection animationType="fade-up" delay={0.4} repeatOnScroll={true}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {searchResults.artists.map(artist => (
                  <AnimatedSection 
                    key={artist.id} 
                    animationType="scale-up" 
                    delay={0.1 * (artist.id % 5)}
                    repeatOnScroll={true}
                    className="flex-shrink-0"
                  >
                    <ArtistCard
                      artist={artist}
                      onPlay={handlePlayArtist}
                      onFollow={handleFollowArtist}
                    />
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>
          );

        case 'albums':
          return (
            <AnimatedSection animationType="fade-up" delay={0.4} repeatOnScroll={true}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {searchResults.albums.map(album => (
                  <AnimatedSection 
                    key={album.id} 
                    animationType="scale-up" 
                    delay={0.1 * (album.id % 5)}
                    repeatOnScroll={true}
                    className="flex-shrink-0"
                  >
                    <AlbumCard
                      album={album}
                      onPlay={handlePlayAlbum}
                      onSave={handleSaveAlbum}
                    />
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>
          );

        case 'tracks':
          return (
            <AnimatedSection animationType="fade-up" delay={0.4} repeatOnScroll={true}>
              <div className="space-y-2">
                {searchResults.tracks.map(track => (
                  <AnimatedSection 
                    key={track.id} 
                    animationType="fade-up" 
                    delay={0.1 * (track.id % 5)}
                    repeatOnScroll={true}
                  >
                    <TrackCard
                      track={track}
                      onPlay={handlePlayTrack}
                      onLike={handleLikeTrack}
                      onAddToPlaylist={handleAddToPlaylist}
                      isPlaying={false}
                    />
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>
          );

        case 'playlists':
          return (
            <AnimatedSection animationType="fade-up" delay={0.4} repeatOnScroll={true}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {searchResults.playlists.map(playlist => (
                  <AnimatedSection 
                    key={playlist.id} 
                    animationType="scale-up" 
                    delay={0.1 * (playlist.id % 5)}
                    repeatOnScroll={true}
                    className="flex-shrink-0"
                  >
                    <PlaylistCard
                      playlist={playlist}
                      onPlay={handlePlayPlaylist}
                      onFollow={handleFollowPlaylist}
                    />
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>
          );

        default: // 'all'
          return (
            <div className="space-y-8">
              {searchResults.artists.length > 0 && (
                <AnimatedSection animationType="fade-up" delay={0.4} repeatOnScroll={true}>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Artists</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {searchResults.artists.slice(0, 5).map(artist => (
                        <AnimatedSection 
                          key={artist.id} 
                          animationType="scale-up" 
                          delay={0.1 * (artist.id % 5)}
                          repeatOnScroll={true}
                          className="flex-shrink-0"
                        >
                          <ArtistCard
                            artist={artist}
                            onPlay={handlePlayArtist}
                            onFollow={handleFollowArtist}
                          />
                        </AnimatedSection>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {searchResults.tracks.length > 0 && (
                <AnimatedSection animationType="fade-up" delay={0.5} repeatOnScroll={true}>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Songs</h3>
                    <div className="space-y-2">
                      {searchResults.tracks.slice(0, 5).map(track => (
                        <AnimatedSection 
                          key={track.id} 
                          animationType="fade-up" 
                          delay={0.1 * (track.id % 5)}
                          repeatOnScroll={true}
                        >
                          <TrackCard
                            track={track}
                            onPlay={handlePlayTrack}
                            onLike={handleLikeTrack}
                            onAddToPlaylist={handleAddToPlaylist}
                            isPlaying={false}
                          />
                        </AnimatedSection>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {searchResults.albums.length > 0 && (
                <AnimatedSection animationType="fade-up" delay={0.6} repeatOnScroll={true}>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Albums</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {searchResults.albums.slice(0, 5).map(album => (
                        <AnimatedSection 
                          key={album.id} 
                          animationType="scale-up" 
                          delay={0.1 * (album.id % 5)}
                          repeatOnScroll={true}
                          className="flex-shrink-0"
                        >
                          <AlbumCard
                            album={album}
                            onPlay={handlePlayAlbum}
                            onSave={handleSaveAlbum}
                          />
                        </AnimatedSection>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {searchResults.playlists.length > 0 && (
                <AnimatedSection animationType="fade-up" delay={0.7} repeatOnScroll={true}>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Playlists</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {searchResults.playlists.slice(0, 5).map(playlist => (
                        <AnimatedSection 
                          key={playlist.id} 
                          animationType="scale-up" 
                          delay={0.1 * (playlist.id % 5)}
                          repeatOnScroll={true}
                          className="flex-shrink-0"
                        >
                          <PlaylistCard
                            playlist={playlist}
                            onPlay={handlePlayPlaylist}
                            onFollow={handleFollowPlaylist}
                          />
                        </AnimatedSection>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              )}
            </div>
          );
      }
    };

    return renderTabContent();
  };

  return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <Header />
        
        <main className="pt-[120px] md:pt-[140px] pb-[160px] md:pb-[120px] px-4 lg:px-6">
          <div className="max-w-7xl mx-auto">
          {/* Search Header */}
          <AnimatedSection animationType="fade-up" delay={0.1} repeatOnScroll={true}>
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-1 relative">
                  <form onSubmit={handleSearchSubmit}>
                    <div className="relative">
                      <Icon 
                        name="Search" 
                        size={20} 
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                      />
                      <Input
                        type="search"
                        placeholder="What do you want to listen to?"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="pl-12 pr-12 py-3 text-lg bg-card border-border rounded-full focus:ring-2 focus:ring-primary focus:border-transparent"
                        onFocus={() => setShowSuggestions(searchQuery.length > 0)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      />
                      {searchQuery && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                          onClick={() => {
                            setSearchQuery('');
                            setShowSuggestions(false);
                            setSearchResults({ artists: [], albums: [], tracks: [], playlists: [] });
                            setResultCounts({ all: 0, artists: 0, albums: 0, tracks: 0, playlists: 0 });
                          }}
                        >
                          <Icon name="X" size={18} />
                        </Button>
                      )}
                    </div>
                  </form>

                  {/* Search Suggestions */}
                  <SearchSuggestions
                    suggestions={mockSuggestions}
                    onSuggestionClick={handleSuggestionClick}
                    isVisible={showSuggestions}
                  />
                </div>

                {/* Filter Button */}
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(true)}
                  className="flex items-center space-x-2"
                >
                  <Icon name="SlidersHorizontal" size={18} />
                  <span className="hidden sm:inline">Filters</span>
                </Button>
              </div>

              {/* Recent Searches */}
              {!searchQuery && recentSearches.length > 0 && (
                <RecentSearches
                  searches={recentSearches}
                  onSearchClick={handleTrendingClick}
                  onRemoveSearch={handleRemoveRecentSearch}
                  onClearAll={handleClearRecentSearches}
                />
              )}
            </div>
          </AnimatedSection>

          {/* Search Tabs */}
          {searchQuery && resultCounts.all > 0 && (
            <AnimatedSection animationType="fade-up" delay={0.2} repeatOnScroll={true}>
              <SearchTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                resultCounts={resultCounts}
              />
            </AnimatedSection>
          )}

          {/* Search Results */}
          <div className="relative">
            <AnimatedSection animationType="fade-up" delay={0.3} repeatOnScroll={true}>
              <div>
                {renderResults()}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </main>

      {/* Search Filters */}
      <SearchFilters
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />

      <PlayerBar />
    </div>
  );
};

export default Search;