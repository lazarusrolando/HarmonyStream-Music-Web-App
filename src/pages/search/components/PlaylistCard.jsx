import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PlaylistCard = ({ playlist, onPlay, onFollow }) => {
  const formatTrackCount = (count) => {
    return `${count} ${count === 1 ? 'track' : 'tracks'}`;
  };

  return (
    <div className="bg-card rounded-lg p-4 hover:bg-card/80 transition-smooth group cursor-pointer">
      <div className="relative mb-4">
        <div className="w-full aspect-square rounded-lg overflow-hidden bg-muted">
          <Image
            src={playlist.artwork}
            alt={playlist.title}
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
              onPlay(playlist);
            }}
          >
            <Icon name="Play" size={20} color="white" />
          </Button>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-foreground mb-1 truncate">
          {playlist.title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-2 truncate">
          By {playlist.creator}
        </p>

        <p className="text-xs text-muted-foreground mb-3">
          {formatTrackCount(playlist.trackCount)} • {playlist.followers} followers
        </p>

        <div className="flex items-center space-x-2">
          <Button
            variant={playlist.isFollowing ? "default" : "outline"}
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onFollow(playlist);
            }}
            className="flex-1"
          >
            <Icon 
              name={playlist.isFollowing ? "Check" : "Plus"} 
              size={14} 
              className="mr-1"
            />
            {playlist.isFollowing ? 'Following' : 'Follow'}
          </Button>
          
          <Button variant="ghost" size="icon">
            <Icon name="MoreHorizontal" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;