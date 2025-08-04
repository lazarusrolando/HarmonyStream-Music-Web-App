import React from 'react';

const SearchTabs = ({ activeTab, onTabChange, resultCounts }) => {
  const tabs = [
    { id: 'all', label: 'All', count: resultCounts.all },
    { id: 'artists', label: 'Artists', count: resultCounts.artists },
    { id: 'albums', label: 'Albums', count: resultCounts.albums },
    { id: 'tracks', label: 'Tracks', count: resultCounts.tracks },
    { id: 'playlists', label: 'Playlists', count: resultCounts.playlists }
  ];

  return (
    <div className="border-b border-border mb-6">
      <div className="flex space-x-6 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center space-x-2 px-4 py-3 border-b-2 transition-smooth whitespace-nowrap
              ${activeTab === tab.id
                ? 'border-primary text-primary font-medium' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
              }
            `}
          >
            <span>{tab.label}</span>
            {tab.count > 0 && (
              <span className={`
                text-xs px-2 py-1 rounded-full
                ${activeTab === tab.id
                  ? 'bg-primary/20 text-primary' :'bg-muted text-muted-foreground'
                }
              `}>
                {tab.count > 999 ? '999+' : tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchTabs;