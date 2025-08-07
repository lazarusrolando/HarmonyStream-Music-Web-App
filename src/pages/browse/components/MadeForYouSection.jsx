import React from 'react';

import Icon from '../../../components/AppIcon';

const MadeForYouSection = ({ playlists }) => {
  return (
    <section className="mb-8">
      {/* Section Header */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
          <Icon name="Sparkles" size={16} color="white" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Made For You</h2>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        Uniquely yours. Updated regularly based on your listening habits.
      </p>

      {/* Playlists Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="group relative bg-gradient-to-br from-card to-card/50 rounded-lg p-4 transition-smooth hover:from-card/80 hover:to-card/30 hover-scale cursor-pointer"
          >
            {/* Custom Artwork with Gradient */}
            <div className="relative mb-4 overflow-hidden rounded-lg">
              <div className={`w-full aspect-square bg-gradient-to-br ${playlist.gradient} flex items-center justify-center`}>
                <div className="text-center">
                  <Icon name={playlist.icon} size={32} color="white" className="mx-auto mb-2" />
                  <div className="text-white text-xs font-medium px-2">
                    {playlist.subtitle}
                  </div>
                </div>
              </div>
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                <button className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-smooth">
                  <Icon name="Play" size={20} color="white" />
                </button>
              </div>

              {/* Update Badge */}
              {playlist.isNew && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              )}
            </div>

            {/* Content */}
            <div className="space-y-1">
              <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-smooth">
                {playlist.title}
              </h3>
              
              <p className="text-xs text-muted-foreground line-clamp-2">
                {playlist.description}
              </p>
              
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-muted-foreground">
                  {playlist.trackCount} songs
                </span>
                
                {playlist.lastUpdated && (
                  <span className="text-xs text-muted-foreground">
                    Updated {playlist.lastUpdated}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MadeForYouSection;