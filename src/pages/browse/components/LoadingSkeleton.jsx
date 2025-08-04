import React from 'react';

const LoadingSkeleton = ({ type = 'card' }) => {
  if (type === 'card') {
    return (
      <div className="bg-card rounded-lg p-4 animate-pulse">
        <div className="w-full aspect-square bg-muted rounded-lg mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-3 bg-muted rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (type === 'section') {
    return (
      <div className="mb-8 animate-pulse">
        <div className="h-6 bg-muted rounded w-48 mb-4"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <LoadingSkeleton key={index} type="card" />
          ))}
        </div>
      </div>
    );
  }

  if (type === 'chart') {
    return (
      <div className="bg-card rounded-lg p-4 animate-pulse">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-16 h-16 bg-muted rounded-lg"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-3 bg-muted rounded w-1/2"></div>
          </div>
        </div>
        
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-3 p-2">
              <div className="w-6 h-4 bg-muted rounded"></div>
              <div className="w-10 h-10 bg-muted rounded"></div>
              <div className="flex-1 space-y-1">
                <div className="h-3 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default LoadingSkeleton;