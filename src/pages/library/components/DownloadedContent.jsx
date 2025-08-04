import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DownloadedContent = ({ downloads, onPlay, onRemoveDownload }) => {
  const totalSize = downloads.reduce((sum, item) => sum + item.size, 0);
  const formatSize = (bytes) => {
    const mb = bytes / (1024 * 1024);
    return mb < 1024 ? `${mb.toFixed(1)} MB` : `${(mb / 1024).toFixed(1)} GB`;
  };

  return (
    <div className="space-y-6">
      {/* Storage Info */}
      <div className="bg-card rounded-lg p-4 border border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-foreground">Storage Usage</h3>
          <span className="text-sm text-muted-foreground">
            {formatSize(totalSize)} used
          </span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-smooth"
            style={{ width: `${Math.min((totalSize / (5 * 1024 * 1024 * 1024)) * 100, 100)}%` }}
          ></div>
        </div>
        
        <p className="text-xs text-muted-foreground mt-2">
          {downloads.length} items downloaded • 5 GB limit
        </p>
      </div>

      {/* Downloaded Items */}
      <div className="space-y-2">
        {downloads.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-smooth group"
          >
            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={item.artwork}
                alt={`${item.title} artwork`}
                className="w-full h-full object-cover"
              />
              
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-success rounded-full border-2 border-card flex items-center justify-center">
                <Icon name="Download" size={8} color="white" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-foreground truncate">
                {item.title}
              </h3>
              <p className="text-xs text-muted-foreground truncate">
                {item.type === 'playlist' ? `${item.trackCount} songs` : item.artist}
                <span className="ml-2">{formatSize(item.size)}</span>
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 text-xs text-success">
                <Icon name="Wifi" size={12} />
                <span>Downloaded</span>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onPlay(item.id)}
                className="opacity-0 group-hover:opacity-100 transition-smooth"
              >
                <Icon name="Play" size={16} />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveDownload(item.id)}
                className="opacity-0 group-hover:opacity-100 transition-smooth text-muted-foreground hover:text-destructive"
              >
                <Icon name="Trash2" size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {downloads.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Download" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No downloads yet</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Download your favorite music to listen offline
          </p>
          <Button variant="outline">
            Browse Music
          </Button>
        </div>
      )}
    </div>
  );
};

export default DownloadedContent;