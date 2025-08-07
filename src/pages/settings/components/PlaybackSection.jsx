import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const PlaybackSection = ({ isExpanded, onToggle }) => {
  const [autoplay, setAutoplay] = useState(true);
  const [gaplessPlayback, setGaplessPlayback] = useState(true);
  const [defaultRepeat, setDefaultRepeat] = useState('off');
  const [defaultShuffle, setDefaultShuffle] = useState(false);
  const [showUnplayable, setShowUnplayable] = useState(false);

  const repeatOptions = [
    { id: 'off', name: 'Off', description: 'No repeat' },
    { id: 'all', name: 'Repeat All', description: 'Repeat entire playlist' },
    { id: 'one', name: 'Repeat One', description: 'Repeat current track' }
  ];

  return (
    <div className="border-b border-border">
      <Button
        variant="ghost"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50"
      >
        <div className="flex items-center space-x-3">
          <Icon name="Play" size={20} className="text-primary" />
          <span className="font-medium text-foreground">Playback</span>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground" 
        />
      </Button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-6">
          {/* Autoplay */}
          <div>
            <Checkbox
              label="Autoplay"
              description="Automatically play similar songs when your music ends"
              checked={autoplay}
              onChange={(e) => setAutoplay(e.target.checked)}
            />
          </div>

          {/* Gapless Playback */}
          <div>
            <Checkbox
              label="Gapless Playback"
              description="Remove silence between tracks for seamless listening"
              checked={gaplessPlayback}
              onChange={(e) => setGaplessPlayback(e.target.checked)}
            />
          </div>

          {/* Default Repeat Mode */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Default Repeat Mode</h4>
            <div className="space-y-3">
              {repeatOptions.map((option) => (
                <label
                  key={option.id}
                  className="flex items-start space-x-3 cursor-pointer p-3 rounded-lg hover:bg-muted/30 transition-smooth"
                >
                  <input
                    type="radio"
                    name="defaultRepeat"
                    value={option.id}
                    checked={defaultRepeat === option.id}
                    onChange={(e) => setDefaultRepeat(e.target.value)}
                    className="mt-1 w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-foreground">{option.name}</span>
                    <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Default Shuffle */}
          <div>
            <Checkbox
              label="Default Shuffle"
              description="Start new playlists in shuffle mode"
              checked={defaultShuffle}
              onChange={(e) => setDefaultShuffle(e.target.checked)}
            />
          </div>

          {/* Show Unplayable Songs */}
          <div>
            <Checkbox
              label="Show Unplayable Songs"
              description="Display grayed-out songs that aren't available in your region"
              checked={showUnplayable}
              onChange={(e) => setShowUnplayable(e.target.checked)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaybackSection;