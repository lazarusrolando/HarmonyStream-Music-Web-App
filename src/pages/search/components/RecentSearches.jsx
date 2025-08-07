import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentSearches = ({ searches, onSearchClick, onRemoveSearch, onClearAll }) => {
  if (searches.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Searches</h3>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onClearAll}
          className="text-muted-foreground hover:text-foreground"
        >
          Clear All
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {searches.map((search, index) => (
          <div
            key={index}
            className="flex items-center bg-muted/50 hover:bg-muted rounded-full px-3 py-2 cursor-pointer transition-smooth group"
            onClick={() => onSearchClick(search)}
          >
            <Icon 
              name="Clock" 
              size={14} 
              className="text-muted-foreground mr-2 flex-shrink-0"
            />
            <span className="text-sm text-foreground mr-2">{search}</span>
            <Button
              variant="ghost"
              size="icon"
              className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-smooth hover:bg-destructive/20"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveSearch(index);
              }}
            >
              <Icon name="X" size={12} className="text-muted-foreground hover:text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;