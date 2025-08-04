import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ArtistCard = ({ artist, onPlay, onFollow }) => {
  const formatFollowers = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="bg-card rounded-lg p-4 hover:bg-card/80 transition-smooth group cursor-pointer">
      <div className="relative mb-4">
        <div className="w-full aspect-square rounded-full overflow-hidden bg-muted">
          <Image
            src={artist.image}
            alt={artist.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
          <Button
            variant="default"
            size="icon"
            className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              onPlay(artist);
            }}
          >
            <Icon name="Play" size={20} color="white" />
          </Button>
        </div>
      </div>

      <div className="text-center">
        <h3 className="font-semibold text-foreground mb-1 truncate">
          {artist.name}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-3">
          {formatFollowers(artist.followers)} followers
        </p>

        <div className="flex items-center justify-center space-x-2">
          <Button
            variant={artist.isFollowing ? "default" : "outline"}
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onFollow(artist);
            }}
            className="flex-1"
          >
            {artist.isFollowing ? 'Following' : 'Follow'}
          </Button>
          
          <Button variant="ghost" size="icon">
            <Icon name="MoreHorizontal" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;