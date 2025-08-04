import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CreatePlaylistModal = ({ isOpen, onClose, onCreate }) => {
  const [playlistName, setPlaylistName] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = [
    { id: 'blank', name: 'Blank Playlist', icon: 'Plus', description: 'Start from scratch' },
    { id: 'workout', name: 'Workout Mix', icon: 'Zap', description: 'High-energy tracks' },
    { id: 'chill', name: 'Chill Vibes', icon: 'Coffee', description: 'Relaxing music' },
    { id: 'party', name: 'Party Hits', icon: 'Music', description: 'Popular dance tracks' }
  ];

  const handleCreate = () => {
    if (playlistName.trim()) {
      onCreate({
        name: playlistName,
        description: description,
        isPrivate: isPrivate,
        template: selectedTemplate
      });
      
      // Reset form
      setPlaylistName('');
      setDescription('');
      setIsPrivate(false);
      setSelectedTemplate(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-modal bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-popover border border-border rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Create Playlist</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Template Selection */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              Choose a template
            </label>
            <div className="grid grid-cols-2 gap-3">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`p-3 rounded-lg border text-left transition-smooth ${
                    selectedTemplate === template.id
                      ? 'border-primary bg-primary/10' :'border-border hover:border-muted-foreground'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon 
                      name={template.icon} 
                      size={16} 
                      className={selectedTemplate === template.id ? 'text-primary' : 'text-muted-foreground'} 
                    />
                    <span className="text-sm font-medium text-foreground">
                      {template.name}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {template.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Playlist Details */}
          <div className="space-y-4">
            <Input
              label="Playlist name"
              type="text"
              placeholder="My awesome playlist"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              required
            />

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Description (optional)
              </label>
              <textarea
                placeholder="Add a description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth resize-none"
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="private"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary focus:ring-2"
              />
              <label htmlFor="private" className="text-sm text-foreground">
                Make playlist private
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            variant="default" 
            onClick={handleCreate}
            disabled={!playlistName.trim()}
          >
            Create Playlist
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;