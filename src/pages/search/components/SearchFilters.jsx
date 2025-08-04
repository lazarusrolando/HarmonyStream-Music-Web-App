import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const SearchFilters = ({ isOpen, onClose, filters, onFiltersChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const genreOptions = [
    { value: 'all', label: 'All Genres' },
    { value: 'pop', label: 'Pop' },
    { value: 'rock', label: 'Rock' },
    { value: 'hip-hop', label: 'Hip Hop' },
    { value: 'electronic', label: 'Electronic' },
    { value: 'jazz', label: 'Jazz' },
    { value: 'classical', label: 'Classical' },
    { value: 'country', label: 'Country' },
    { value: 'r&b', label: 'R&B' },
    { value: 'indie', label: 'Indie' }
  ];

  const yearOptions = [
    { value: 'all', label: 'All Years' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' },
    { value: '2020s', label: '2020s' },
    { value: '2010s', label: '2010s' },
    { value: '2000s', label: '2000s' },
    { value: '1990s', label: '1990s' },
    { value: '1980s', label: '1980s' }
  ];

  const durationOptions = [
    { value: 'all', label: 'All Durations' },
    { value: 'short', label: 'Under 3 minutes' },
    { value: 'medium', label: '3-5 minutes' },
    { value: 'long', label: 'Over 5 minutes' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleResetFilters = () => {
    const resetFilters = {
      genre: 'all',
      year: 'all',
      duration: 'all',
      explicit: false,
      hasLyrics: false,
      popularity: 'all'
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div className="md:hidden fixed inset-0 bg-black/50 z-modal" onClick={onClose} />
      
      {/* Filter Panel */}
      <div className={`
        fixed z-modal bg-card border-l border-border
        md:relative md:w-80 md:border-l-0 md:border md:rounded-lg
        ${isOpen 
          ? 'right-0 top-0 bottom-0 w-80 transform translate-x-0' 
          : 'right-0 top-0 bottom-0 w-80 transform translate-x-full'
        }
        transition-transform duration-300 ease-in-out
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Filters</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Filter Content */}
        <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-120px)]">
          {/* Genre Filter */}
          <div>
            <Select
              label="Genre"
              options={genreOptions}
              value={localFilters.genre}
              onChange={(value) => handleFilterChange('genre', value)}
            />
          </div>

          {/* Release Year Filter */}
          <div>
            <Select
              label="Release Year"
              options={yearOptions}
              value={localFilters.year}
              onChange={(value) => handleFilterChange('year', value)}
            />
          </div>

          {/* Duration Filter */}
          <div>
            <Select
              label="Duration"
              options={durationOptions}
              value={localFilters.duration}
              onChange={(value) => handleFilterChange('duration', value)}
            />
          </div>

          {/* Content Filters */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Content</h4>
            
            <Checkbox
              label="Explicit content"
              checked={localFilters.explicit}
              onChange={(e) => handleFilterChange('explicit', e.target.checked)}
            />
            
            <Checkbox
              label="Has lyrics"
              checked={localFilters.hasLyrics}
              onChange={(e) => handleFilterChange('hasLyrics', e.target.checked)}
            />
          </div>

          {/* Popularity Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Popularity
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={localFilters.popularity}
              onChange={(e) => handleFilterChange('popularity', e.target.value)}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Underground</span>
              <span>Mainstream</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-border space-y-2">
          <Button 
            variant="default" 
            fullWidth 
            onClick={handleApplyFilters}
          >
            Apply Filters
          </Button>
          <Button 
            variant="outline" 
            fullWidth 
            onClick={handleResetFilters}
          >
            Reset All
          </Button>
        </div>
      </div>
    </>
  );
};

export default SearchFilters;