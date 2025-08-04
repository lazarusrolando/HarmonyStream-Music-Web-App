import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const AudioQualitySection = ({ isExpanded, onToggle }) => {
  const [streamingQuality, setStreamingQuality] = useState('high');
  const [downloadQuality, setDownloadQuality] = useState('very_high');
  const [volumeNormalization, setVolumeNormalization] = useState(true);
  const [crossfadeDuration, setCrossfadeDuration] = useState(5);

  const qualityOptions = [
    {
      id: 'low',
      name: 'Low',
      description: '96 kbps - Uses less data',
      bandwidth: '~1.4 MB per song'
    },
    {
      id: 'normal',
      name: 'Normal',
      description: '160 kbps - Good quality',
      bandwidth: '~2.4 MB per song'
    },
    {
      id: 'high',
      name: 'High',
      description: '320 kbps - Best quality',
      bandwidth: '~4.8 MB per song'
    },
    {
      id: 'very_high',
      name: 'Very High',
      description: 'Lossless - Premium only',
      bandwidth: '~30-50 MB per song'
    }
  ];

  const handleCrossfadeChange = (e) => {
    setCrossfadeDuration(parseInt(e.target.value));
  };

  return (
    <div className="border-b border-border">
      <Button
        variant="ghost"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50"
      >
        <div className="flex items-center space-x-3">
          <Icon name="Volume2" size={20} className="text-primary" />
          <span className="font-medium text-foreground">Audio Quality</span>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground" 
        />
      </Button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-6">
          {/* Streaming Quality */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Streaming Quality</h4>
            <div className="space-y-3">
              {qualityOptions.slice(0, 3).map((option) => (
                <label
                  key={option.id}
                  className="flex items-start space-x-3 cursor-pointer p-3 rounded-lg hover:bg-muted/30 transition-smooth"
                >
                  <input
                    type="radio"
                    name="streamingQuality"
                    value={option.id}
                    checked={streamingQuality === option.id}
                    onChange={(e) => setStreamingQuality(e.target.value)}
                    className="mt-1 w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{option.name}</span>
                      <span className="text-xs text-muted-foreground">{option.bandwidth}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Download Quality */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Download Quality</h4>
            <div className="space-y-3">
              {qualityOptions.map((option) => (
                <label
                  key={option.id}
                  className="flex items-start space-x-3 cursor-pointer p-3 rounded-lg hover:bg-muted/30 transition-smooth"
                >
                  <input
                    type="radio"
                    name="downloadQuality"
                    value={option.id}
                    checked={downloadQuality === option.id}
                    onChange={(e) => setDownloadQuality(e.target.value)}
                    className="mt-1 w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{option.name}</span>
                      <span className="text-xs text-muted-foreground">{option.bandwidth}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Crossfade */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Crossfade</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Duration</span>
                <span className="text-sm text-muted-foreground">{crossfadeDuration}s</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="12"
                  value={crossfadeDuration}
                  onChange={handleCrossfadeChange}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Off</span>
                  <span>12s</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Allows tracks to fade into each other for seamless listening
              </p>
            </div>
          </div>

          {/* Volume Normalization */}
          <div>
            <Checkbox
              label="Volume Normalization"
              description="Maintain consistent volume levels across all tracks"
              checked={volumeNormalization}
              onChange={(e) => setVolumeNormalization(e.target.checked)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioQualitySection;