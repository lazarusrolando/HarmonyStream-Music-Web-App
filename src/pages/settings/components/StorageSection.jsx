import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StorageSection = ({ isExpanded, onToggle }) => {
  const [cacheSize] = useState(2.4); // GB
  const [downloadSize] = useState(8.7); // GB
  const [totalStorage] = useState(50); // GB available

  const storageData = [
    {
      type: 'Downloaded Music',
      size: downloadSize,
      color: 'bg-primary',
      description: '247 songs downloaded for offline listening'
    },
    {
      type: 'Cache',
      size: cacheSize,
      color: 'bg-accent',
      description: 'Temporary files for faster loading'
    },
    {
      type: 'Available',
      size: totalStorage - downloadSize - cacheSize,
      color: 'bg-muted',
      description: 'Free space remaining'
    }
  ];

  const handleClearCache = () => {
    // Handle cache clearing
    console.log('Clearing cache...');
  };

  const handleManageDownloads = () => {
    // Handle download management
    console.log('Managing downloads...');
  };

  return (
    <div className="border-b border-border">
      <Button
        variant="ghost"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50"
      >
        <div className="flex items-center space-x-3">
          <Icon name="HardDrive" size={20} className="text-primary" />
          <span className="font-medium text-foreground">Storage</span>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground" 
        />
      </Button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-6">
          {/* Storage Overview */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-4">Storage Usage</h4>
            
            {/* Storage Bar */}
            <div className="w-full h-4 bg-muted rounded-full overflow-hidden mb-4">
              <div className="h-full flex">
                <div 
                  className="bg-primary h-full"
                  style={{ width: `${(downloadSize / totalStorage) * 100}%` }}
                ></div>
                <div 
                  className="bg-accent h-full"
                  style={{ width: `${(cacheSize / totalStorage) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Storage Legend */}
            <div className="space-y-3">
              {storageData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <div>
                      <span className="text-sm font-medium text-foreground">{item.type}</span>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {item.size.toFixed(1)} GB
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Storage Actions */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Storage Management</h4>
            
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleClearCache}
              >
                <Icon name="Trash2" size={16} className="mr-3" />
                Clear Cache ({cacheSize.toFixed(1)} GB)
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleManageDownloads}
              >
                <Icon name="Download" size={16} className="mr-3" />
                Manage Downloads ({downloadSize.toFixed(1)} GB)
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Icon name="FolderOpen" size={16} className="mr-3" />
                Change Download Location
              </Button>
            </div>
          </div>

          {/* Download Settings */}
          <div className="p-4 bg-card rounded-lg border border-border">
            <h5 className="text-sm font-medium text-foreground mb-2">Download Settings</h5>
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>• Downloads are stored locally for offline listening</p>
              <p>• Downloaded music expires after 30 days without internet</p>
              <p>• Premium subscribers can download up to 10,000 songs</p>
            </div>
          </div>

          {/* Storage Tips */}
          <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-warning mt-0.5" />
              <div>
                <h5 className="text-sm font-medium text-foreground mb-1">Storage Tips</h5>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• Clear cache regularly to free up space</p>
                  <p>• Remove old downloads you no longer need</p>
                  <p>• Use streaming instead of downloading when connected to Wi-Fi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StorageSection;