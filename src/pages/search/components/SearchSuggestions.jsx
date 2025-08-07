import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SearchSuggestions = ({ suggestions, onSuggestionClick, isVisible }) => {
  if (!isVisible || suggestions.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 bg-popover border border-border rounded-lg shadow-lg z-dropdown mt-1 max-h-96 overflow-y-auto">
      {suggestions.map((suggestion, index) => (
        <div
          key={`${suggestion.type}-${suggestion.id}`}
          className="flex items-center p-3 hover:bg-muted/50 cursor-pointer transition-smooth border-b border-border last:border-b-0"
          onClick={() => onSuggestionClick(suggestion)}
        >
          {/* Icon/Image */}
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted flex-shrink-0 mr-3">
            {suggestion.image ? (
              <Image
                src={suggestion.image}
                alt={suggestion.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Icon 
                  name={
                    suggestion.type === 'artist' ? 'User' :
                    suggestion.type === 'album' ? 'Disc3' :
                    suggestion.type === 'playlist'? 'ListMusic' : 'Music'
                  } 
                  size={20} 
                  className="text-muted-foreground"
                />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium text-foreground truncate">
                {suggestion.title}
              </p>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full flex-shrink-0">
                {suggestion.type}
              </span>
            </div>
            {suggestion.subtitle && (
              <p className="text-xs text-muted-foreground truncate mt-1">
                {suggestion.subtitle}
              </p>
            )}
          </div>

          {/* Action Icon */}
          <Icon 
            name="ArrowUpLeft" 
            size={16} 
            className="text-muted-foreground flex-shrink-0 ml-2"
          />
        </div>
      ))}
    </div>
  );
};

export default SearchSuggestions;