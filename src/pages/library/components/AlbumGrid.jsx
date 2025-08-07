import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AlbumGrid = ({ albums, onPlay, onRemove }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {albums.map((album) => (
        <div
          key={album.id}
          className="bg-card rounded-lg p-4 hover:bg-muted/50 transition-smooth group cursor-pointer"
        >
          <div className="relative mb-3">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <Image
                src={album.artwork}
                alt={`${album.title} album cover`}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onPlay(album.id)}
                className="w-12 h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
              >
                <Icon name="Play" size={20} />
              </Button>
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-medium text-foreground truncate">
              {album.title}
            </h3>
            <p className="text-xs text-muted-foreground truncate">
              {album.artist}
            </p>
            <p className="text-xs text-muted-foreground">
              {album.year} • {album.trackCount} songs
            </p>
          </div>

          <div className="flex items-center justify-between mt-2 opacity-0 group-hover:opacity-100 transition-smooth">
            <Button
              variant="ghost"
              size="icon"
              className="w-6 h-6"
            >
              <Icon name="Heart" size={14} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove(album.id)}
              className="w-6 h-6 text-muted-foreground hover:text-destructive"
            >
              <Icon name="X" size={14} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlbumGrid;