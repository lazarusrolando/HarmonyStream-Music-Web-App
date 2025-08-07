import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SeasonalSection = ({ collections }) => {
  return (
    <section className="mb-8">
      {/* Section Header */}
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Calendar" size={20} className="text-primary" />
        <h2 className="text-xl font-bold text-foreground">Seasonal & Events</h2>
      </div>

      {/* Collections */}
      <div className="space-y-6">
        {collections.map((collection) => (
          <div
            key={collection.id}
            className="relative overflow-hidden rounded-xl bg-gradient-to-r from-card to-card/50 group cursor-pointer"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={collection.backgroundImage}
                alt={`${collection.title} background`}
                className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-smooth"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative p-6 md:p-8">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  {/* Badge */}
                  <div className="inline-flex items-center space-x-1 bg-primary/20 backdrop-blur-sm rounded-full px-3 py-1 mb-3">
                    <Icon name={collection.icon} size={14} className="text-primary" />
                    <span className="text-xs font-medium text-primary">
                      {collection.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {collection.title}
                  </h3>
                  
                  <p className="text-sm text-white/80 mb-4 max-w-md">
                    {collection.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center space-x-4 text-xs text-white/60 mb-4">
                    <div className="flex items-center space-x-1">
                      <Icon name="Music" size={12} />
                      <span>{collection.playlistCount} playlists</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={12} />
                      <span>{collection.followers} followers</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-primary hover:bg-primary/90"
                    iconName="Play"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Explore Collection
                  </Button>
                </div>

                {/* Featured Playlists Preview */}
                <div className="hidden md:flex flex-col space-y-2 ml-8">
                  {collection.featuredPlaylists.slice(0, 3).map((playlist, index) => (
                    <div
                      key={playlist.id}
                      className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-2 min-w-[200px]"
                    >
                      <div className="w-8 h-8 rounded overflow-hidden">
                        <Image
                          src={playlist.artwork}
                          alt={`${playlist.title} artwork`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-white truncate">
                          {playlist.title}
                        </p>
                        <p className="text-xs text-white/60 truncate">
                          {playlist.trackCount} songs
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SeasonalSection;