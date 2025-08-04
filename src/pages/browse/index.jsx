import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Navigation from '../../components/ui/Navigation';
import PlayerBar from '../../components/ui/PlayerBar';
import AnimatedSection from '../../components/AnimatedSection';
import CategoryChips from './components/CategoryChips';
import FeaturedSection from './components/FeaturedSection';
import ChartsSection from './components/ChartsSection';
import MadeForYouSection from './components/MadeForYouSection';
import PodcastsSection from './components/PodcastsSection';
import SeasonalSection from './components/SeasonalSection';
import LoadingSkeleton from './components/LoadingSkeleton';
import Icon from '../../components/AppIcon';
import Input from '../../components/ui/Input';

const Browse = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Mock data
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'pop', name: 'Pop' },
    { id: 'rock', name: 'Rock' },
    { id: 'hip-hop', name: 'Hip-Hop' },
    { id: 'electronic', name: 'Electronic' },
    { id: 'jazz', name: 'Jazz' },
    { id: 'classical', name: 'Classical' },
    { id: 'country', name: 'Country' },
    { id: 'r&b', name: 'R&B' },
    { id: 'indie', name: 'Indie' },
    { id: 'latin', name: 'Latin' },
    { id: 'reggae', name: 'Reggae' }
  ];

  const featuredPlaylists = [
    {
      id: 1,
      title: "Today\'s Top Hits",
      description: "The most played songs right now",
      artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      creator: "HarmonyStream",
      followers: 28500000
    },
    {
      id: 2,
      title: "RapCaviar",
      description: "New music and big tracks",
      artwork: "https://images.unsplash.com/photo-1571974599782-87624638275c?w=300&h=300&fit=crop",
      creator: "HarmonyStream",
      followers: 15200000
    },
    {
      id: 3,
      title: "Rock Classics",
      description: "Rock legends & epic songs",
      artwork: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop",
      creator: "HarmonyStream",
      followers: 8900000
    },
    {
      id: 4,
      title: "Chill Hits",
      description: "Kick back to the best new and recent chill hits",
      artwork: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
      creator: "HarmonyStream",
      followers: 12300000
    },
    {
      id: 5,
      title: "Indie Mix",
      description: "The best indie tracks",
      artwork: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
      creator: "HarmonyStream",
      followers: 5600000
    },
    {
      id: 6,
      title: "Electronic Hits",
      description: "The biggest electronic tracks",
      artwork: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop",
      creator: "HarmonyStream",
      followers: 7800000
    }
  ];

  const newReleases = [
    {
      id: 1,
      title: "Midnights",
      description: "Taylor Swift",
      artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      creator: "Taylor Swift",
      followers: null
    },
    {
      id: 2,
      title: "Harry\'s House",
      description: "Harry Styles",
      artwork: "https://images.unsplash.com/photo-1571974599782-87624638275c?w=300&h=300&fit=crop",
      creator: "Harry Styles",
      followers: null
    },
    {
      id: 3,
      title: "Renaissance",
      description: "Beyoncé",
      artwork: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop",
      creator: "Beyoncé",
      followers: null
    },
    {
      id: 4,
      title: "Un Verano Sin Ti",
      description: "Bad Bunny",
      artwork: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
      creator: "Bad Bunny",
      followers: null
    },
    {
      id: 5,
      title: "Dawn FM",
      description: "The Weeknd",
      artwork: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
      creator: "The Weeknd",
      followers: null
    },
    {
      id: 6,
      title: "Honestly, Nevermind",
      description: "Drake",
      artwork: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop",
      creator: "Drake",
      followers: null
    }
  ];

  const madeForYouPlaylists = [
    {
      id: 1,
      title: "Discover Weekly",
      subtitle: "Your weekly mixtape of fresh music",
      description: "Discover new music tailored to your taste",
      gradient: "from-purple-600 to-blue-600",
      icon: "Compass",
      trackCount: 30,
      lastUpdated: "Monday",
      isNew: true
    },
    {
      id: 2,
      title: "Daily Mix 1",
      subtitle: "Pop & Electronic",
      description: "Made for you • Updated daily",
      gradient: "from-green-600 to-teal-600",
      icon: "Shuffle",
      trackCount: 50,
      lastUpdated: "Today",
      isNew: false
    },
    {
      id: 3,
      title: "Daily Mix 2",
      subtitle: "Rock & Alternative",
      description: "Made for you • Updated daily",
      gradient: "from-red-600 to-orange-600",
      icon: "Music",
      trackCount: 50,
      lastUpdated: "Today",
      isNew: false
    },
    {
      id: 4,
      title: "Release Radar",
      subtitle: "New releases for you",
      description: "Catch all the latest music from artists you follow",
      gradient: "from-indigo-600 to-purple-600",
      icon: "Radar",
      trackCount: 25,
      lastUpdated: "Friday",
      isNew: true
    }
  ];

  const charts = [
    {
      id: 'global',
      name: 'Global Top 50',
      description: 'The most played songs globally',
      artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      lastUpdated: 'Daily',
      tracks: [
        {
          id: 1,
          title: 'As It Was',
          artist: 'Harry Styles',
          artwork: 'https://images.unsplash.com/photo-1571974599782-87624638275c?w=300&h=300&fit=crop',
          playCount: 1200000000
        },
        {
          id: 2,
          title: 'Heat Waves',
          artist: 'Glass Animals',
          artwork: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop',
          playCount: 980000000
        },
        {
          id: 3,
          title: 'Stay',
          artist: 'The Kid LAROI, Justin Bieber',
          artwork: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop',
          playCount: 850000000
        },
        {
          id: 4,
          title: 'Bad Habit',
          artist: 'Steve Lacy',
          artwork: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
          playCount: 720000000
        },
        {
          id: 5,
          title: 'Anti-Hero',
          artist: 'Taylor Swift',
          artwork: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop',
          playCount: 680000000
        }
      ]
    },
    {
      id: 'viral',
      name: 'Viral 50',
      description: 'The most viral tracks right now',
      artwork: 'https://images.unsplash.com/photo-1571974599782-87624638275c?w=300&h=300&fit=crop',
      lastUpdated: 'Daily',
      tracks: [
        {
          id: 1,
          title: 'Flowers',
          artist: 'Miley Cyrus',
          artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
          playCount: 45000000
        },
        {
          id: 2,
          title: 'Unholy',
          artist: 'Sam Smith ft. Kim Petras',
          artwork: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop',
          playCount: 38000000
        },
        {
          id: 3,
          title: 'Creepin',
          artist: 'Metro Boomin, The Weeknd, 21 Savage',
          artwork: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop',
          playCount: 32000000
        },
        {
          id: 4,
          title: 'Lavender Haze',
          artist: 'Taylor Swift',
          artwork: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
          playCount: 28000000
        },
        {
          id: 5,
          title: 'Kill Bill',
          artist: 'SZA',
          artwork: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop',
          playCount: 25000000
        }
      ]
    },
    {
      id: 'new',
      name: 'New Music Friday',
      description: 'The best new music, updated every Friday',
      artwork: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop',
      lastUpdated: 'Friday',
      tracks: [
        {
          id: 1,
          title: 'Vampire',
          artist: 'Olivia Rodrigo',
          artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
          playCount: 15000000
        },
        {
          id: 2,
          title: 'Paint The Town Red',
          artist: 'Doja Cat',
          artwork: 'https://images.unsplash.com/photo-1571974599782-87624638275c?w=300&h=300&fit=crop',
          playCount: 12000000
        },
        {
          id: 3,
          title: 'Greedy',
          artist: 'Tate McRae',
          artwork: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop',
          playCount: 8000000
        },
        {
          id: 4,
          title: 'Water',
          artist: 'Tyla',
          artwork: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
          playCount: 6000000
        },
        {
          id: 5,
          title: 'Cruel Summer',
          artist: 'Taylor Swift',
          artwork: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop',
          playCount: 5000000
        }
      ]
    }
  ];

  const podcasts = [
    {
      id: 1,
      title: "The Joe Rogan Experience",
      description: "The Joe Rogan Experience podcast",
      artwork: "https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg?w=300&h=300&fit=crop",
      creator: "Joe Rogan",
      followers: 11000000
    },
    {
      id: 2,
      title: "Crime Junkie",
      description: "True crime podcast",
      artwork: "https://images.pexels.com/photos/6963098/pexels-photo-6963098.jpeg?w=300&h=300&fit=crop",
      creator: "audiochuck",
      followers: 8500000
    },
    {
      id: 3,
      title: "The Daily",
      description: "This is what the news should sound like",
      artwork: "https://images.pexels.com/photos/7130468/pexels-photo-7130468.jpeg?w=300&h=300&fit=crop",
      creator: "The New York Times",
      followers: 6200000
    },
    {
      id: 4,
      title: "Call Her Daddy",
      description: "A sex, relationships, and lifestyle podcast",
      artwork: "https://images.pexels.com/photos/7130721/pexels-photo-7130721.jpeg?w=300&h=300&fit=crop",
      creator: "Alex Cooper",
      followers: 4800000
    },
    {
      id: 5,
      title: "Conan O\'Brien Needs a Friend",
      description: "Comedy podcast with Conan O\'Brien",
      artwork: "https://images.pexels.com/photos/7130475/pexels-photo-7130475.jpeg?w=300&h=300&fit=crop",
      creator: "Team Coco",
      followers: 3900000
    },
    {
      id: 6,
      title: "Serial",
      description: "Investigative journalism podcast",
      artwork: "https://images.pexels.com/photos/7130557/pexels-photo-7130557.jpeg?w=300&h=300&fit=crop",
      creator: "Serial Productions",
      followers: 5600000
    }
  ];

  const episodes = [
    {
      id: 1,
      title: "#2054 - Elon Musk",
      showName: "The Joe Rogan Experience",
      description: "Elon Musk is a business magnate, industrial designer, and engineer. He is the founder, CEO, CTO, and chief designer of SpaceX.",
      artwork: "https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg?w=300&h=300&fit=crop",
      duration: "2h 49m",
      publishDate: "Jan 25, 2025",
      isNew: true
    },
    {
      id: 2,
      title: "MURDERED: Kirsten Hatfield",
      showName: "Crime Junkie",
      description: "In 1997, 8-year-old Kirsten Hatfield was abducted from her bedroom in the middle of the night in Midwest City, Oklahoma.",
      artwork: "https://images.pexels.com/photos/6963098/pexels-photo-6963098.jpeg?w=300&h=300&fit=crop",
      duration: "52m",
      publishDate: "Jan 24, 2025",
      isNew: true
    },
    {
      id: 3,
      title: "Friday, January 24, 2025",
      showName: "The Daily",
      description: "A look at the biggest stories of the day, and the people behind them.",
      artwork: "https://images.pexels.com/photos/7130468/pexels-photo-7130468.jpeg?w=300&h=300&fit=crop",
      duration: "28m",
      publishDate: "Jan 24, 2025",
      isNew: true
    },
    {
      id: 4,
      title: "Daddy Issues with Tana Mongeau",
      showName: "Call Her Daddy",
      description: "Tana Mongeau joins Alex to discuss her wild stories, relationships, and life in the spotlight.",
      artwork: "https://images.pexels.com/photos/7130721/pexels-photo-7130721.jpeg?w=300&h=300&fit=crop",
      duration: "1h 15m",
      publishDate: "Jan 23, 2025",
      isNew: false
    }
  ];

  const seasonalCollections = [
    {
      id: 1,
      title: "Winter Vibes 2025",
      description: "Cozy up with the perfect soundtrack for cold winter days. From indie folk to ambient electronic, these playlists capture the essence of the season.",
      badge: "SEASONAL",
      icon: "Snowflake",
      backgroundImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop",
      playlistCount: 12,
      followers: "2.3M",
      featuredPlaylists: [
        {
          id: 1,
          title: "Cozy Winter Nights",
          artwork: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop",
          trackCount: 45
        },
        {
          id: 2,
          title: "Snowy Day Acoustic",
          artwork: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=100&h=100&fit=crop",
          trackCount: 32
        },
        {
          id: 3,
          title: "Winter Electronic",
          artwork: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=100&h=100&fit=crop",
          trackCount: 28
        }
      ]
    },
    {
      id: 2,
      title: "Grammy Awards 2025",
      description: "Celebrate music's biggest night with nominees, winners, and unforgettable performances from the 67th Annual Grammy Awards.",
      badge: "EVENT",
      icon: "Award",
      backgroundImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop",
      playlistCount: 8,
      followers: "5.1M",
      featuredPlaylists: [
        {
          id: 1,
          title: "Grammy Nominees 2025",
          artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop",
          trackCount: 67
        },
        {
          id: 2,
          title: "Best New Artist",
          artwork: "https://images.unsplash.com/photo-1571974599782-87624638275c?w=100&h=100&fit=crop",
          trackCount: 24
        },
        {
          id: 3,
          title: "Album of the Year",
          artwork: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=100&h=100&fit=crop",
          trackCount: 18
        }
      ]
    }
  ];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Handle infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loadingMore) {
        return;
      }
      
      setLoadingMore(true);
      // Simulate loading more content
      setTimeout(() => {
        setLoadingMore(false);
      }, 1000);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadingMore]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <Helmet>
        <title>Browse Music - HarmonyStream</title>
        <meta name="description" content="Discover new music, playlists, podcasts, and more on HarmonyStream. Browse by genre, mood, and activity." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        <Header />
        
        {/* Main Content */}
        <main className="pt-[120px] md:pt-[140px] pb-[100px] md:pb-[120px] px-4 lg:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <AnimatedSection animationType="fade-up" delay={0.1} repeatOnScroll={true}>
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  Browse Music
                </h1>
                <p className="text-muted-foreground">
                  Discover new music, playlists, and podcasts tailored to your taste
                </p>
              </div>
            </AnimatedSection>

            {/* Search Bar */}
            <AnimatedSection animationType="fade-up" delay={0.2} repeatOnScroll={true}>
              <div className="mb-6">
                <div className="relative max-w-md">
                  <Icon 
                    name="Search" 
                    size={18} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                  />
                  <Input
                    type="search"
                    placeholder="Search genres, moods, activities..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="pl-10 pr-4 py-3 bg-card border-border rounded-full"
                  />
                </div>
              </div>
            </AnimatedSection>

            {/* Category Chips */}
            <AnimatedSection animationType="fade-up" delay={0.3} repeatOnScroll={true}>
              <CategoryChips
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategorySelect}
              />
            </AnimatedSection>

            {/* Content Sections */}
            {isLoading ? (
              <AnimatedSection animationType="fade-up" delay={0.4} repeatOnScroll={true}>
                <div className="space-y-8">
                  <LoadingSkeleton type="section" />
                  <LoadingSkeleton type="chart" />
                  <LoadingSkeleton type="section" />
                </div>
              </AnimatedSection>
            ) : (
              <div className="space-y-12">
                {/* Seasonal Collections */}
                <AnimatedSection animationType="fade-up" delay={0.4} repeatOnScroll={true}>
                  <div className="glassmorphism p-6 rounded-xl">
                    <SeasonalSection collections={seasonalCollections} />
                  </div>
                </AnimatedSection>

                {/* Made For You */}
                <AnimatedSection animationType="fade-up" delay={0.5} repeatOnScroll={true}>
                  <div className="glassmorphism p-6 rounded-xl">
                    <MadeForYouSection playlists={madeForYouPlaylists} />
                  </div>
                </AnimatedSection>

                {/* Charts */}
                <AnimatedSection animationType="fade-up" delay={0.6} repeatOnScroll={true}>
                  <div className="glassmorphism p-6 rounded-xl">
                    <ChartsSection charts={charts} />
                  </div>
                </AnimatedSection>

                {/* Featured Playlists */}
                <AnimatedSection animationType="fade-up" delay={0.7} repeatOnScroll={true}>
                  <div className="glassmorphism p-6 rounded-xl">
                    <FeaturedSection
                      title="Featured Playlists"
                      items={featuredPlaylists}
                      type="playlist"
                    />
                  </div>
                </AnimatedSection>

                {/* New Releases */}
                <AnimatedSection animationType="fade-up" delay={0.8} repeatOnScroll={true}>
                  <div className="glassmorphism p-6 rounded-xl">
                    <FeaturedSection
                      title="New Releases"
                      items={newReleases}
                      type="album"
                    />
                  </div>
                </AnimatedSection>

                {/* Podcasts & Shows */}
                <AnimatedSection animationType="fade-up" delay={0.9} repeatOnScroll={true}>
                  <div className="glassmorphism p-6 rounded-xl">
                    <PodcastsSection
                      podcasts={podcasts}
                      episodes={episodes}
                    />
                  </div>
                </AnimatedSection>

                {/* Loading More Indicator */}
                {loadingMore && (
                  <AnimatedSection animationType="fade-up" delay={1.0} repeatOnScroll={true}>
                    <div className="flex items-center justify-center py-8">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm">Loading more content...</span>
                      </div>
                    </div>
                  </AnimatedSection>
                )}
              </div>
            )}
          </div>
        </main>

        <PlayerBar />
      </div>
    </>
  );
};

export default Browse;