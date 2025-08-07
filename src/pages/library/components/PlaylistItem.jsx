import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PlaylistItem = ({ playlist, onEdit, onShare, onDelete, onPlay }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleMenuAction = (action) => {
    setShowMenu(false);
    switch (action) {
      case 'edit':
        onEdit(playlist.id);
        break;
      case 'share':
        onShare(playlist.id);
        break;
      case 'delete':
        onDelete(playlist.id);
        break;
    }
  };

  return (
    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-smooth group">
      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
        <Image
          src={playlist.artwork}
          alt={`${playlist.name} playlist artwork`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onPlay(playlist.id)}
            className="w-8 h-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
          >
            <Icon name="Play" size={14} />
          </Button>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-foreground truncate">
          {playlist.name}
        </h3>
        <p className="text-xs text-muted-foreground truncate">
          {playlist.isOwned ? 'Created by you' : `By ${playlist.creator}`} • {playlist.trackCount} songs
        </p>
      </div>

      <div className="flex items-center space-x-2">
        {playlist.isDownloaded && (
          <Icon name="Download" size={16} className="text-success" />
        )}
        
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleMenuToggle}
            className="opacity-0 group-hover:opacity-100 transition-smooth"
          >
            <Icon name="MoreHorizontal" size={16} />
          </Button>

          {showMenu && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-lg z-dropdown">
              <div className="py-1">
                <button
                  onClick={() => handleMenuAction('edit')}
                  className="flex items-center w-full px-3 py-2 text-sm text-foreground hover:bg-muted/50 transition-smooth"
                >
                  <Icon name="Edit" size={14} className="mr-3" />
                  Edit details
                </button>
                <button
                  onClick={() => handleMenuAction('share')}
                  className="flex items-center w-full px-3 py-2 text-sm text-foreground hover:bg-muted/50 transition-smooth"
                >
                  <Icon name="Share" size={14} className="mr-3" />
                  Share
                </button>
                {playlist.isOwned && (
                  <button
                    onClick={() => handleMenuAction('delete')}
                    className="flex items-center w-full px-3 py-2 text-sm text-destructive hover:bg-muted/50 transition-smooth"
                  >
                    <Icon name="Trash2" size={14} className="mr-3" />
                    Delete
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistItem;