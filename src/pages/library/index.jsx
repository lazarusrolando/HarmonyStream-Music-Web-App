import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Navigation from '../../components/ui/Navigation';
import PlayerBar from '../../components/ui/PlayerBar';
import AnimatedSection from '../../components/AnimatedSection';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import LibraryTabs from './components/LibraryTabs';
import PlaylistItem from './components/PlaylistItem';
import ArtistItem from './components/ArtistItem';
import AlbumGrid from './components/AlbumGrid';
import DownloadedContent from './components/DownloadedContent';
import RecentlyPlayed from './components/RecentlyPlayed';
import CreatePlaylistModal from './components/CreatePlaylistModal';

const Library = () => {
  const [activeTab, setActiveTab] = useState('playlists');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  // Mock data
  const playlists = [
    {
      id: 1,
      name: "My Favorites",
      creator: "You",
      trackCount: 47,
      artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      isOwned: true,
      isDownloaded: true,
      createdAt: new Date('2025-01-15')
    },
    {
      id: 2,
      name: "Workout Hits",
      creator: "You",
      trackCount: 32,
      artwork: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
      isOwned: true,
      isDownloaded: false,
      createdAt: new Date('2025-01-20')
    },
    {
      id: 3,
      name: "Chill Vibes",
      creator: "Spotify",
      trackCount: 68,
      artwork: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
      isOwned: false,
      isDownloaded: true,
      createdAt: new Date('2025-01-10')
    },
    {
      id: 4,
      name: "Road Trip Mix",
      creator: "You",
      trackCount: 25,
      artwork: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
      isOwned: true,
      isDownloaded: false,
      createdAt: new Date('2025-01-25')
    }
  ];

  const artists = [
    {
      id: 1,
      name: "The Weeknd",
      followers: 87500000,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      hasNewRelease: true
    },
    {
      id: 2,
      name: "Billie Eilish",
      followers: 65200000,
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop",
      hasNewRelease: false
    },
    {
      id: 3,
      name: "Drake",
      followers: 92100000,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
      hasNewRelease: true
    }
  ];

  const albums = [
    {
      id: 1,
      title: "After Hours",
      artist: "The Weeknd",
      year: 2020,
      trackCount: 14,
      artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Happier Than Ever",
      artist: "Billie Eilish",
      year: 2021,
      trackCount: 16,
      artwork: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Certified Lover Boy",
      artist: "Drake",
      year: 2021,
      trackCount: 21,
      artwork: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Sour",
      artist: "Olivia Rodrigo",
      year: 2021,
      trackCount: 11,
      artwork: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop"
    }
  ];

  const downloads = [
    {
      id: 1,
      title: "My Favorites",
      type: "playlist",
      trackCount: 47,
      artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      size: 235 * 1024 * 1024 // 235 MB
    },
    {
      id: 2,
      title: "After Hours",
      type: "album",
      artist: "The Weeknd",
      artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      size: 89 * 1024 * 1024 // 89 MB
    }
  ];

  const recentTracks = [
    {
      id: 1,
      title: "Blinding Lights",
      artist: "The Weeknd",
      artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      playedAt: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
    },
    {
      id: 2,
      title: "Bad Guy",
      artist: "Billie Eilish",
      artwork: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop",
      playedAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
    },
    {
      id: 3,
      title: "God's Plan",
      artist: "Drake",
      artwork: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
      playedAt: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5 hours ago
    }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Recently Added' },
    { value: 'name', label: 'Alphabetical' },
    { value: 'played', label: 'Recently Played' }
  ];

  const filterPlaylists = (playlists, searchTerm) => {
    return playlists.filter(item => 
      item.name.toLowerCase().includes(searchTerm) || 
      item.creator.toLowerCase().includes(searchTerm)
    );
  };

  const filterArtists = (artists, searchTerm) => {
    return artists.filter(item => 
      item.name.toLowerCase().includes(searchTerm)
    );
  };

  const filterAlbums = (albums, searchTerm) => {
    return albums.filter(item => 
      item.title.toLowerCase().includes(searchTerm) || 
      item.artist.toLowerCase().includes(searchTerm)
    );
  };

  const filterDownloaded = (downloads, searchTerm) => {
    return downloads.filter(item => 
      item.title.toLowerCase().includes(searchTerm)
    );
  };

  const sortData = (data) => {
    if (sortBy === 'name') {
      return data.sort((a, b) => {
        const nameA = a.name || a.title || '';
        const nameB = b.name || b.title || '';
        return nameA.localeCompare(nameB);
      });
    } else if (sortBy === 'recent' && activeTab === 'playlists') {
      return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return data;
  };

  const getFilteredData = () => {
    let data = [];

    switch (activeTab) {
      case 'playlists':
        data = playlists;
        break;
      case 'artists':
        data = artists;
        break;
      case 'albums':
        data = albums;
        break;
      case 'downloaded':
        data = downloads;
        break;
      default:
        data = [];
    }

    if (searchQuery) {
      const searchTerm = searchQuery.toLowerCase();
      switch (activeTab) {
        case 'playlists':
          data = filterPlaylists(data, searchTerm);
          break;
        case 'artists':
          data = filterArtists(data, searchTerm);
          break;
        case 'albums':
          data = filterAlbums(data, searchTerm);
          break;
        case 'downloaded':
          data = filterDownloaded(data, searchTerm);
          break;
        default:
          break;
      }
    }

    data = sortData(data);

    return data;
  };

  const handlePlay = (id) => {
    console.log(`Playing ${activeTab} with id:`, id);
  };

  const handleEdit = (id) => {
    console.log('Editing playlist:', id);
  };

  const handleShare = (id) => {
    console.log('Sharing:', id);
  };

  const handleDelete = (id) => {
    console.log('Deleting:', id);
  };

  const handleUnfollow = (id) => {
    console.log('Unfollowing artist:', id);
  };

  const handleRemove = (id) => {
    console.log('Removing:', id);
  };

  const handleRemoveDownload = (id) => {
    console.log('Removing download:', id);
  };

  const handleCreatePlaylist = (playlistData) => {
    console.log('Creating playlist:', playlistData);
  };

  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    setSelectedItems([]);
  };

  const renderContent = () => {
    const filteredData = getFilteredData();

    switch (activeTab) {
      case 'playlists':
        return (
          <div className="space-y-2">
            {filteredData.map((playlist, index) => (
              <AnimatedSection 
                key={playlist.id} 
                animationType="fade-up" 
                delay={0.1 * (index % 5)}
                repeatOnScroll={true}
              >
                <PlaylistItem
                  playlist={playlist}
                  onPlay={handlePlay}
                  onEdit={handleEdit}
                  onShare={handleShare}
                  onDelete={handleDelete}
                />
              </AnimatedSection>
            ))}
          </div>
        );

      case 'artists':
        return (
          <div className="space-y-2">
            {filteredData.map((artist, index) => (
              <AnimatedSection 
                key={artist.id} 
                animationType="fade-up" 
                delay={0.1 * (index % 5)}
                repeatOnScroll={true}
              >
                <ArtistItem
                  artist={artist}
                  onPlay={handlePlay}
                  onUnfollow={handleUnfollow}
                />
              </AnimatedSection>
            ))}
          </div>
        );

      case 'albums':
        return (
          <AnimatedSection animationType="fade-up" delay={0.5} repeatOnScroll={true}>
            <AlbumGrid
              albums={filteredData}
              onPlay={handlePlay}
              onRemove={handleRemove}
            />
          </AnimatedSection>
        );

      case 'downloaded':
        return (
          <AnimatedSection animationType="fade-up" delay={0.5} repeatOnScroll={true}>
            <DownloadedContent
              downloads={filteredData}
              onPlay={handlePlay}
              onRemoveDownload={handleRemoveDownload}
            />
          </AnimatedSection>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Your Library - HarmonyStream</title>
        <meta name="description" content="Manage your personal music collection, playlists, and downloads" />
      </Helmet>

      <Navigation />
      <Header />
      
      <div className="min-h-screen bg-background text-foreground pt-[120px] md:pt-[140px] pb-[160px] md:pb-[120px]">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Header */}
          <AnimatedSection animationType="fade-up" delay={0.1} repeatOnScroll={true}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  Your Library
                </h1>
                <p className="text-muted-foreground">
                  Manage your music collection and playlists
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSelectionMode}
                  className={isSelectionMode ? 'text-primary' : ''}
                >
                  <Icon name="CheckSquare" size={20} />
                </Button>
                
                <Button
                  variant="default"
                  onClick={() => setShowCreateModal(true)}
                  iconName="Plus"
                  iconPosition="left"
                >
                  <span className="hidden sm:inline">Create Playlist</span>
                  <span className="sm:hidden">Create</span>
                </Button>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Tabs */}
              <AnimatedSection animationType="fade-up" delay={0.2} repeatOnScroll={true}>
                <LibraryTabs activeTab={activeTab} onTabChange={setActiveTab} />
              </AnimatedSection>

              {/* Search and Sort */}
              <AnimatedSection animationType="fade-up" delay={0.3} repeatOnScroll={true}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Icon 
                        name="Search" 
                        size={18} 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                      />
                      <Input
                        type="search"
                        placeholder={`Search your ${activeTab}...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 bg-input border border-border rounded-lg text-foreground text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>

                    <Button variant="ghost" size="icon">
                      <Icon name="SlidersHorizontal" size={18} />
                    </Button>
                  </div>
                </div>
              </AnimatedSection>

              {/* Selection Actions */}
              {isSelectionMode && selectedItems.length > 0 && (
                <AnimatedSection animationType="fade-up" delay={0.4} repeatOnScroll={true}>
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">
                        {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
                      </span>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedItems([])}>
                          <Icon name="X" size={16} className="mr-1" />
                          Deselect All
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Icon name="Copy" size={16} className="mr-1" />
                          Copy
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Icon name="Download" size={16} className="mr-1" />
                          Download
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Icon name="Share" size={16} className="mr-1" />
                          Share
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          <Icon name="Trash2" size={16} className="mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Content */}
              <div className="min-h-[400px]">
                {getFilteredData().length === 0 ? (
                  <AnimatedSection animationType="fade-up" delay={0.5} repeatOnScroll={true}>
                    <div className="glassmorphism p-6 rounded-xl text-center py-12">
                      <Icon 
                        name={activeTab === 'playlists' ? 'ListMusic' : activeTab === 'artists' ? 'User' : activeTab === 'albums' ? 'Disc' : 'Download'} 
                        size={48} 
                        className="mx-auto text-muted-foreground mb-4" 
                      />
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        {searchQuery ? 'No results found' : `No ${activeTab} yet`}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {searchQuery 
                          ? `Try searching for something else`
                          : `Start building your ${activeTab} collection`
                        }
                      </p>
                      {!searchQuery && activeTab === 'playlists' && (
                        <Button 
                          variant="outline"
                          onClick={() => setShowCreateModal(true)}
                        >
                          Create Your First Playlist
                        </Button>
                      )}
                    </div>
                  </AnimatedSection>
                ) : (
                  <AnimatedSection animationType="fade-up" delay={0.6} repeatOnScroll={true}>
                    <div className="glassmorphism p-6 rounded-xl">
                      {renderContent()}
                    </div>
                  </AnimatedSection>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AnimatedSection animationType="fade-up" delay={0.7} repeatOnScroll={true}>
                <RecentlyPlayed
                  recentTracks={recentTracks}
                  onPlay={handlePlay}
                  onRemove={handleRemove}
                />
              </AnimatedSection>
            </div>
          </div>
        </div>

        {/* Create Playlist Modal */}
        <CreatePlaylistModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreatePlaylist}
        />
      </div>
      
      <PlayerBar />
    </>
  );
};

export default Library;
