import React from 'react';
import Icon from '../../../components/AppIcon';

const LibraryTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'playlists', label: 'Playlists', icon: 'ListMusic' },
    { id: 'artists', label: 'Artists', icon: 'User' },
    { id: 'albums', label: 'Albums', icon: 'Disc' },
    { id: 'downloaded', label: 'Downloaded', icon: 'Download' }
  ];

  return (
    <div className="flex space-x-1 bg-muted/20 rounded-lg p-1 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth flex-1 justify-center ${
            activeTab === tab.id
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          <Icon name={tab.icon} size={16} />
          <span className="hidden sm:inline">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default LibraryTabs;