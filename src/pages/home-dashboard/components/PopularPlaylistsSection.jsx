import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../../../components/AnimatedSection';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PopularPlaylistsSection = () => {
  const popularPlaylists = [
    {
      id: 1,
      title: "Today\'s Top Hits",
      description: "The most played songs right now",
      artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center",
      followers: "32.5M",
      isOfficial: true,
      curator: "Spotify"
    },
    {
      id: 2,
      title: "RapCaviar",
      description: "New music from Drake, Travis Scott and more",
      artwork: "https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?w=300&h=300&fit=crop&crop=center",
      followers: "15.2M",
      isOfficial: true,
      curator: "Spotify"
    },
    {
      id: 3,
      title: "Pop Rising",
      description: "The biggest songs in pop right now",
      artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center",
      followers: "8.7M",
      isOfficial: true,
      curator: "Spotify"
    },
    {
      id: 4,
      title: "Mood Booster",
      description: "Get happy with today's dose of feel-good songs",
      artwork: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=center",
      followers: "5.1M",
      isOfficial: true,
      curator: "Spotify"
    },
    {
      id: 5,
      title: "Chill Hits",
      description: "Kick back to the best new and recent chill hits",
      artwork: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?w=300&h=300&fit=crop&crop=center",
      followers: "12.3M",
      isOfficial: true,
      curator: "Spotify"
    },
    {
      id: 6,
      title: "Viral 50",
      description: "The most viral tracks on Spotify right now",
      artwork: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=center",
      followers: "3.8M",
      isOfficial: true,
      curator: "Spotify"
    }
  ];

  const formatFollowers = (count) => {
    if (count.includes('M')) return count + ' followers';
    if (count.includes('K')) return count + ' followers';
    return count + ' followers';
  };

  return (
    <AnimatedSection
      className="mb-8"
      animationType="fade-up"
      delay={0.1}
      repeatOnScroll={true}
    >
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Popular Playlists</h2>
          <Link 
            to="/browse" 
            className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
          >
            See all
          </Link>
        </div>
        
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {popularPlaylists.map((playlist, index) => (
            <AnimatedSection
              key={playlist.id}
              animationType="slide-in-right"
              delay={0.1 * index}
              repeatOnScroll={true}
              className="flex-shrink-0 w-44 group cursor-pointer"
            >
              <div className="relative mb-3">
                <div className="glassmorphism w-44 h-44 rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={playlist.artwork}
                    alt={`${playlist.title} playlist cover`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/assets/images/no_image.png';
                    }}
                  />
                </div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-smooth rounded-lg flex items-center justify-center">
                  <Button
                    variant="default"
                    size="icon"
                    className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
                  >
                    <Icon name="Play" size={20} color="white" />
                  </Button>
                </div>
                
                {/* Official Badge */}
                {playlist.isOfficial && (
                  <div className="absolute top-2 left-2 bg-blue-600/90 backdrop-blur-sm rounded-full px-2 py-1">
                    <div className="flex items-center space-x-1">
                      <Icon name="CheckCircle" size={10} color="white" />
                      <span className="text-xs font-medium text-white">Official</span>
                    </div>
                  </div>
                )}
                
                {/* More Options */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-smooth">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 bg-black/60 backdrop-blur-sm hover:bg-black/80 rounded-full"
                  >
                    <Icon name="MoreHorizontal" size={16} color="white" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-smooth">
                  {playlist.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {playlist.description}
                </p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground/80">
                  <span>{formatFollowers(playlist.followers)}</span>
                  <span>•</span>
                  <span>By {playlist.curator}</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </AnimatedSection>
  );
};

export default PopularPlaylistsSection;