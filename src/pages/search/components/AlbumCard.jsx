import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AlbumCard = ({ album, onPlay, onSave }) => {
  const formatReleaseDate = (dateString) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  return (
    <div className="bg-card rounded-lg p-4 hover:bg-card/80 transition-smooth group cursor-pointer">
      <div className="relative mb-4">
        <div className="w-full aspect-square rounded-lg overflow-hidden bg-muted">
          <Image
            src={album.artwork}
            alt={album.title}
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
              onPlay(album);
            }}
          >
            <Icon name="Play" size={20} color="white" />
          </Button>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-foreground mb-1 truncate">
          {album.title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-2 truncate">
          {album.artist}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <span>{formatReleaseDate(album.releaseDate)}</span>
          <span>{album.trackCount} tracks</span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={album.isSaved ? "default" : "outline"}
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onSave(album);
            }}
            className="flex-1"
          >
            <Icon 
              name={album.isSaved ? "Check" : "Plus"} 
              size={14} 
              className="mr-1"
            />
            {album.isSaved ? 'Saved' : 'Save'}
          </Button>
          
          <Button variant="ghost" size="icon">
            <Icon name="MoreHorizontal" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;