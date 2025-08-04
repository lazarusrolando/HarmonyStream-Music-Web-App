import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ArtistItem = ({ artist, onPlay, onUnfollow }) => {
  return (
    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-smooth group">
      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
        <Image
          src={artist.image}
          alt={`${artist.name} profile`}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-foreground truncate">
          {artist.name}
        </h3>
        <p className="text-xs text-muted-foreground truncate">
          {artist.followers.toLocaleString()} followers
          {artist.hasNewRelease && (
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-primary/20 text-primary">
              New release
            </span>
          )}
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPlay(artist.id)}
          className="opacity-0 group-hover:opacity-100 transition-smooth"
        >
          <Icon name="Play" size={14} className="mr-1" />
          Play
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onUnfollow(artist.id)}
          className="opacity-0 group-hover:opacity-100 transition-smooth text-muted-foreground hover:text-foreground"
        >
          Following
        </Button>
      </div>
    </div>
  );
};

export default ArtistItem;