import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrendingSection = ({ onTrendingClick }) => {
  const trendingSearches = [
    {
      id: 1,
      query: "Taylor Swift",
      category: "Artist",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop&crop=face",
      trending: true
    },
    {
      id: 2,
      query: "Bad Bunny",
      category: "Artist",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face",
      trending: true
    },
    {
      id: 3,
      query: "Midnights",
      category: "Album",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop",
      trending: false
    },
    {
      id: 4,
      query: "Anti-Hero",
      category: "Track",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop",
      trending: true
    },
    {
      id: 5,
      query: "The Weeknd",
      category: "Artist",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face",
      trending: false
    }
  ];

  const genres = [
    { name: "Pop", color: "bg-pink-500", icon: "Music" },
    { name: "Hip Hop", color: "bg-orange-500", icon: "Mic" },
    { name: "Rock", color: "bg-red-500", icon: "Guitar" },
    { name: "Electronic", color: "bg-blue-500", icon: "Zap" },
    { name: "Jazz", color: "bg-yellow-500", icon: "Music2" },
    { name: "Classical", color: "bg-purple-500", icon: "Music3" }
  ];

  return (
    <div className="space-y-8">
      {/* Trending Searches */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">Trending Now</h2>
        <div className="space-y-3">
          {trendingSearches.map((item) => (
            <div
              key={item.id}
              className="flex items-center p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-smooth group"
              onClick={() => onTrendingClick(item.query)}
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted mr-3 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.query}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium text-foreground truncate">
                    {item.query}
                  </h3>
                  {item.trending && (
                    <div className="flex items-center space-x-1">
                      <Icon name="TrendingUp" size={14} className="text-primary" />
                      <span className="text-xs text-primary font-medium">Trending</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {item.category}
                </p>
              </div>
              
              <Icon 
                name="ArrowUpRight" 
                size={16} 
                className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-smooth"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Browse by Genre */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">Browse by Genre</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {genres.map((genre) => (
            <div
              key={genre.name}
              className={`
                ${genre.color} rounded-lg p-4 cursor-pointer transition-smooth hover:scale-105
                relative overflow-hidden group
              `}
              onClick={() => onTrendingClick(genre.name)}
            >
              <h3 className="text-white font-semibold text-lg mb-2">
                {genre.name}
              </h3>
              
              <div className="absolute bottom-2 right-2 opacity-60 group-hover:opacity-100 transition-smooth">
                <Icon name={genre.icon} size={24} color="white" />
              </div>
              
              {/* Decorative pattern */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"></div>
              <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-white/10 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            className="bg-card border border-border rounded-lg p-4 cursor-pointer hover:bg-card/80 transition-smooth"
            onClick={() => onTrendingClick("new releases")}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <Icon name="Calendar" size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">New Releases</h3>
                <p className="text-sm text-muted-foreground">Latest albums and singles</p>
              </div>
            </div>
          </div>
          
          <div 
            className="bg-card border border-border rounded-lg p-4 cursor-pointer hover:bg-card/80 transition-smooth"
            onClick={() => onTrendingClick("top charts")}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                <Icon name="BarChart3" size={20} className="text-accent" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Top Charts</h3>
                <p className="text-sm text-muted-foreground">Most popular tracks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingSection;