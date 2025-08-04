import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecentlyPlayed = ({ recentTracks, onPlay, onRemove }) => {
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const played = new Date(timestamp);
    const diffInHours = Math.floor((now - played) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Recently Played</h2>
        <Button variant="ghost" size="sm">
          <Icon name="MoreHorizontal" size={16} />
        </Button>
      </div>

      <div className="p-2">
        {recentTracks.slice(0, 5).map((track, index) => (
          <div
            key={`${track.id}-${index}`}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-smooth group"
          >
            <div className="relative w-10 h-10 rounded-md overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={track.artwork}
                alt={`${track.title} artwork`}
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onPlay(track.id)}
                  className="w-6 h-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
                >
                  <Icon name="Play" size={12} />
                </Button>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-foreground truncate">
                {track.title}
              </h3>
              <p className="text-xs text-muted-foreground truncate">
                {track.artist}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-muted-foreground">
                {formatTimeAgo(track.playedAt)}
              </span>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemove(track.id)}
                className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-smooth text-muted-foreground hover:text-destructive"
              >
                <Icon name="X" size={12} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {recentTracks.length > 5 && (
        <div className="p-4 border-t border-border">
          <Button variant="ghost" size="sm" fullWidth>
            Show all recent tracks
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentlyPlayed;