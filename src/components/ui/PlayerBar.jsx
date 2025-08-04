import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Image from '../AppImage';
import Button from './Button';

const PlayerBar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(240); // 4 minutes in seconds
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off'); // 'off', 'all', 'one'
  const [showQueue, setShowQueue] = useState(false);
  const progressRef = useRef(null);

  // Mock current track data
  const currentTrack = {
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    artwork: "/assets/images/album-placeholder.jpg"
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    setCurrentTime(0);
    // Handle previous track logic
  };

  const handleNext = () => {
    setCurrentTime(0);
    // Handle next track logic
  };

  const handleProgressClick = (e) => {
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
  };

  const toggleRepeat = () => {
    const modes = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setRepeatMode(modes[nextIndex]);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (currentTime / duration) * 100;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-player glassmorphism-player border-t border-border/30 player-shadow">
      <div className="flex items-center justify-between h-player px-4 lg:px-6">
        {/* Track Info */}
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
            <Image
              src={currentTrack.artwork}
              alt={`${currentTrack.album} artwork`}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-medium text-foreground truncate">
              {currentTrack.title}
            </h4>
            <p className="text-xs text-muted-foreground truncate">
              {currentTrack.artist}
            </p>
          </div>
          
          <Button variant="ghost" size="icon" className="flex-shrink-0">
            <Icon name="Heart" size={16} />
          </Button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 flex-1 max-w-md mx-8">
          {/* Control Buttons */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleShuffle}
              className={`hidden sm:flex ${isShuffled ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <Icon name="Shuffle" size={16} />
            </Button>
            
            <Button variant="ghost" size="icon" onClick={handlePrevious}>
              <Icon name="SkipBack" size={18} />
            </Button>
            
            <Button
              variant="default"
              size="icon"
              onClick={togglePlayPause}
              className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90"
            >
              <Icon 
                name={isPlaying ? "Pause" : "Play"} 
                size={20} 
                color="white"
                className={isPlaying ? 'pulse-playing' : ''}
              />
            </Button>
            
            <Button variant="ghost" size="icon" onClick={handleNext}>
              <Icon name="SkipForward" size={18} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleRepeat}
              className={`hidden sm:flex ${repeatMode !== 'off' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <Icon name={repeatMode === 'one' ? "Repeat1" : "Repeat"} size={16} />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-2 w-full">
            <span className="text-xs text-muted-foreground font-mono min-w-[35px]">
              {formatTime(currentTime)}
            </span>
            
            <div
              ref={progressRef}
              className="flex-1 h-1 bg-muted rounded-full cursor-pointer group"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-primary rounded-full relative transition-smooth group-hover:bg-primary/80"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-smooth"></div>
              </div>
            </div>
            
            <span className="text-xs text-muted-foreground font-mono min-w-[35px]">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume & Additional Controls */}
        <div className="flex items-center space-x-3 flex-1 justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowQueue(!showQueue)}
            className="hidden lg:flex"
          >
            <Icon name="ListMusic" size={16} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="hidden md:flex"
          >
            <Icon 
              name={isMuted || volume === 0 ? "VolumeX" : volume < 0.5 ? "Volume1" : "Volume2"} 
              size={16} 
            />
          </Button>
          
          <div className="hidden md:flex items-center space-x-2 w-24">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-full h-1 bg-muted rounded-full appearance-none cursor-pointer slider"
            />
          </div>
          
          <Button variant="ghost" size="icon" className="hidden lg:flex">
            <Icon name="Maximize2" size={16} />
          </Button>
        </div>
      </div>

      {/* Queue Overlay */}
      {showQueue && (
        <div className="absolute bottom-full right-0 w-80 max-h-96 glassmorphism m-4 overflow-hidden rounded-xl">
          <div className="p-4 border-b border-border/20">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-foreground">Queue</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowQueue(false)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>
          
          <div className="p-2 max-h-80 overflow-y-auto">
            <div className="text-sm text-muted-foreground text-center py-8">
              Queue is empty
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerBar;