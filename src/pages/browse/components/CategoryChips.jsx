import React, { useState } from 'react';
import Button from '../../../components/ui/Button';

const CategoryChips = ({ categories, selectedCategory, onCategorySelect }) => {
  const [showAll, setShowAll] = useState(false);
  
  const displayedCategories = showAll ? categories : categories.slice(0, 8);

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 mb-3">
        {displayedCategories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => onCategorySelect(category.id)}
            className="rounded-full px-4 py-2 text-sm font-medium transition-smooth hover-scale"
          >
            {category.name}
          </Button>
        ))}
        
        {categories.length > 8 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            {showAll ? 'Show Less' : `+${categories.length - 8} More`}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CategoryChips;