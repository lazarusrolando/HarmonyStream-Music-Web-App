import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TrackCard = ({ track, onPlay, onLike, onAddToPlaylist, isPlaying }) => {
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center p-3 rounded-lg hover:bg-muted/50 transition-smooth group">
      {/* Play Button / Track Number */}
      <div className="w-10 h-10 flex items-center justify-center mr-3 flex-shrink-0">
        {isPlaying ? (
          <div className="w-4 h-4 flex items-center justify-center">
            <div className="flex space-x-1">
              <div className="w-1 h-4 bg-primary rounded-full animate-pulse"></div>
              <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-smooth"
            onClick={() => onPlay(track)}
          >
            <Icon name="Play" size={16} />
          </Button>
        )}
      </div>

      {/* Track Artwork */}
      <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted mr-3 flex-shrink-0">
        <Image
          src={track.artwork}
          alt={track.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <h4 className={`font-medium truncate ${isPlaying ? 'text-primary' : 'text-foreground'}`}>
          {track.title}
        </h4>
        <p className="text-sm text-muted-foreground truncate">
          {track.artist}
        </p>
      </div>

      {/* Album Name - Hidden on mobile */}
      <div className="hidden md:block flex-1 min-w-0 mx-4">
        <p className="text-sm text-muted-foreground truncate">
          {track.album}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onLike(track)}
          className={track.isLiked ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}
        >
          <Icon name={track.isLiked ? "Heart" : "Heart"} size={16} />
        </Button>

        <span className="text-sm text-muted-foreground font-mono min-w-[35px] text-right">
          {formatDuration(track.duration)}
        </span>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onAddToPlaylist(track)}
          className="opacity-0 group-hover:opacity-100 transition-smooth"
        >
          <Icon name="MoreHorizontal" size={16} />
        </Button>
      </div>
    </div>
  );
};

export default TrackCard;