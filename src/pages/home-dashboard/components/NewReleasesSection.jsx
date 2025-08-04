import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const NewReleasesSection = () => {
  const newReleases = [
    {
      id: 1,
      title: "Midnights",
      artist: "Taylor Swift",
      type: "Album",
      artwork: "https://preview.redd.it/taylor-swifts-midnights-album-cover-and-tracklist-designed-v0-74cp8duxfrla1.jpg?width=1400&format=pjpg&auto=webp&s=0cb492a8dae00341320ddbf63befd36774a0c472",
      releaseDate: "2025-01-20",
      trackCount: 13,
      isNew: true
    },
    {
      id: 2,
      title: "Un Verano Sin Ti",
      artist: "Bad Bunny",
      type: "Album",
      artwork: "https://th.bing.com/th/id/OIP.TkdL9oCDJcYLuQA2RdZ_hwHaGh?w=227&h=200&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
      releaseDate: "2025-01-18",
      trackCount: 23,
      isNew: true
    },
    {
      id: 3,
      title: "Renaissance",
      artist: "Beyoncé",
      type: "Album",
      artwork: "https://www.officialcharts.com/media/663666/beyonce-renaissance-tour-setlist-2023-full-songs-start-time-support-act-tickets-concert-merch-song-list-how-long-hours.jpg?width=796&mode=stretch",
      releaseDate: "2025-01-15",
      trackCount: 16,
      isNew: true
    },
    {
      id: 4,
      title: "As It Was",
      artist: "Harry Styles",
      type: "Single",
      artwork: "https://th.bing.com/th/id/OIP.DrmGFKX2IBobnxBWKV6sewHaHa?w=163&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
      releaseDate: "2025-01-22",
      trackCount: 1,
      isNew: true
    },
    {
      id: 5,
      title: "About Damn Time",
      artist: "Lizzo",
      type: "Single",
      artwork: "https://th.bing.com/th/id/OIP.cPF4yF2_95k-LJ6fYnzY1QHaHa?w=186&h=186&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
      releaseDate: "2025-01-19",
      trackCount: 1,
      isNew: true
    }
  ];

  const formatReleaseDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">New Releases</h2>
        <Link 
          to="/browse" 
          className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
        >
          See all
        </Link>
      </div>
      
      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        {newReleases.map((release) => (
          <div
            key={release.id}
            className="flex-shrink-0 w-40 group cursor-pointer"
          >
            <div className="relative mb-3">
              <div className="w-40 h-40 rounded-lg overflow-hidden bg-muted">
                <Image
                  src={release.artwork}
                  alt={`${release.title} by ${release.artist}`}
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
              
              {/* New Badge */}
              {release.isNew && (
                <div className="absolute top-2 left-2 bg-accent/90 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-xs font-medium text-white">NEW</span>
                </div>
              )}
              
              {/* Type Badge */}
              <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
                <span className="text-xs font-medium text-white">{release.type}</span>
              </div>
              
              {/* Add to Library Button */}
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-smooth">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 bg-black/60 backdrop-blur-sm hover:bg-black/80 rounded-full"
                >
                  <Icon name="Plus" size={16} color="white" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-smooth">
                {release.title}
              </h3>
              <p className="text-xs text-muted-foreground truncate">
                {release.artist}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground/80">
                <span>{formatReleaseDate(release.releaseDate)}</span>
                <span>
                  {release.trackCount} {release.trackCount === 1 ? 'track' : 'tracks'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewReleasesSection;