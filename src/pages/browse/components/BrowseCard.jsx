import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BrowseCard = ({ item, type = 'playlist' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = (e) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const handleAddClick = (e) => {
    e.stopPropagation();
    // Handle add to library
  };

  const formatFollowers = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div
      className="group relative bg-card rounded-lg p-4 transition-smooth hover:bg-card/80 hover-scale cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Artwork */}
      <div className="relative mb-4 overflow-hidden rounded-lg">
        <Image
          src={item.artwork}
          alt={`${item.title} artwork`}
          className="w-full aspect-square object-cover transition-smooth group-hover:scale-105"
        />
        
        {/* Overlay Controls */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-smooth ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex items-center space-x-2">
            <Button
              variant="default"
              size="icon"
              onClick={handlePlayClick}
              className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
            >
              <Icon 
                name={isPlaying ? "Pause" : "Play"} 
                size={20} 
                color="white"
              />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleAddClick}
              className="w-10 h-10 rounded-full bg-background/20 hover:bg-background/40 backdrop-blur-sm"
            >
              <Icon name="Plus" size={18} color="white" />
            </Button>
          </div>
        </div>

        {/* Type Badge */}
        {type === 'podcast' && (
          <div className="absolute top-2 left-2 bg-accent px-2 py-1 rounded-full">
            <span className="text-xs font-medium text-white">PODCAST</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-1">
        <h3 className="font-semibold text-foreground text-sm line-clamp-2 group-hover:text-primary transition-smooth">
          {item.title}
        </h3>
        
        <p className="text-xs text-muted-foreground line-clamp-2">
          {item.description}
        </p>
        
        {/* Metadata */}
        <div className="flex items-center justify-between pt-2">
          {item.creator && (
            <span className="text-xs text-muted-foreground">
              By {item.creator}
            </span>
          )}
          
          {item.followers && (
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={12} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {formatFollowers(item.followers)}
              </span>
            </div>
          )}
          
          {item.playCount && (
            <div className="flex items-center space-x-1">
              <Icon name="Play" size={12} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {formatFollowers(item.playCount)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseCard;