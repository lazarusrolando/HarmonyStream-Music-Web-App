import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChartsSection = ({ charts }) => {
  const [selectedChart, setSelectedChart] = useState('global');

  const chartTabs = [
    { id: 'global', name: 'Global Top 50', icon: 'Globe' },
    { id: 'viral', name: 'Viral 50', icon: 'TrendingUp' },
    { id: 'new', name: 'New Music Friday', icon: 'Calendar' }
  ];

  const currentChart = charts.find(chart => chart.id === selectedChart) || charts[0];

  const formatPlayCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <section className="mb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Charts</h2>
      </div>

      {/* Chart Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted/20 rounded-lg p-1">
        {chartTabs.map((tab) => (
          <Button
            key={tab.id}
            variant={selectedChart === tab.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setSelectedChart(tab.id)}
            className="flex-1 rounded-md"
            iconName={tab.icon}
            iconPosition="left"
            iconSize={16}
          >
            {tab.name}
          </Button>
        ))}
      </div>

      {/* Chart Content */}
      <div className="bg-card rounded-lg p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden">
            <Image
              src={currentChart.artwork}
              alt={`${currentChart.name} artwork`}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{currentChart.name}</h3>
            <p className="text-sm text-muted-foreground">{currentChart.description}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Updated {currentChart.lastUpdated}
            </p>
          </div>
          
          <Button variant="default" size="icon" className="rounded-full">
            <Icon name="Play" size={20} color="white" />
          </Button>
        </div>

        {/* Top Tracks */}
        <div className="space-y-2">
          {currentChart.tracks.slice(0, 5).map((track, index) => (
            <div
              key={track.id}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-smooth group cursor-pointer"
            >
              {/* Rank */}
              <div className="w-6 text-center">
                <span className={`text-sm font-bold ${
                  index < 3 ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {index + 1}
                </span>
              </div>

              {/* Track Info */}
              <div className="w-10 h-10 rounded overflow-hidden">
                <Image
                  src={track.artwork}
                  alt={`${track.title} artwork`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground truncate">
                  {track.title}
                </h4>
                <p className="text-xs text-muted-foreground truncate">
                  {track.artist}
                </p>
              </div>

              {/* Play Count */}
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Icon name="Play" size={12} />
                <span>{formatPlayCount(track.playCount)}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-smooth">
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Icon name="Heart" size={14} />
                </Button>
                
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Icon name="MoreHorizontal" size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Chart */}
        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="outline" fullWidth>
            View Full Chart
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ChartsSection;