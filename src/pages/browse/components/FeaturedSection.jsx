import React from 'react';
import BrowseCard from './BrowseCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeaturedSection = ({ title, items, type = 'playlist', showViewAll = true }) => {
  return (
    <section className="mb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        
        {showViewAll && (
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            View All
            <Icon name="ChevronRight" size={16} className="ml-1" />
          </Button>
        )}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {items.map((item) => (
          <BrowseCard
            key={item.id}
            item={item}
            type={type}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;