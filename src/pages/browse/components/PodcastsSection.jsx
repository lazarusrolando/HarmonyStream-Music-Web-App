import React, { useState } from 'react';
import BrowseCard from './BrowseCard';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PodcastsSection = ({ podcasts, episodes }) => {
  const [activeTab, setActiveTab] = useState('shows');

  const tabs = [
    { id: 'shows', name: 'Shows', icon: 'Mic' },
    { id: 'episodes', name: 'Episodes', icon: 'Play' }
  ];

  return (
    <section className="mb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Podcasts & Shows</h2>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted/20 rounded-lg p-1 w-fit">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab(tab.id)}
            className="rounded-md"
            iconName={tab.icon}
            iconPosition="left"
            iconSize={16}
          >
            {tab.name}
          </Button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'shows' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {podcasts.map((podcast) => (
            <BrowseCard
              key={podcast.id}
              item={podcast}
              type="podcast"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {episodes.map((episode) => (
            <div
              key={episode.id}
              className="flex items-center space-x-4 p-4 bg-card rounded-lg hover:bg-card/80 transition-smooth group cursor-pointer"
            >
              {/* Episode Artwork */}
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={episode.artwork}
                  alt={`${episode.title} artwork`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Episode Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground text-sm line-clamp-1 group-hover:text-primary transition-smooth">
                  {episode.title}
                </h3>
                
                <p className="text-xs text-muted-foreground mb-1">
                  {episode.showName}
                </p>
                
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {episode.description}
                </p>
                
                <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                  <span>{episode.duration}</span>
                  <span>•</span>
                  <span>{episode.publishDate}</span>
                  {episode.isNew && (
                    <>
                      <span>•</span>
                      <span className="text-primary font-medium">NEW</span>
                    </>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 opacity-0 group-hover:opacity-100 transition-smooth"
                >
                  <Icon name="Play" size={18} />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10"
                >
                  <Icon name="MoreHorizontal" size={18} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PodcastsSection;