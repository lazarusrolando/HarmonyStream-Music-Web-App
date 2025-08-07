import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../../../components/AnimatedSection';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickAccessSection = () => {
  const quickAccessItems = [
    {
      id: 1,
      title: "Liked Songs",
      subtitle: "732 songs",
      artwork: "https://preview.redd.it/taylor-swifts-midnights-album-cover-and-tracklist-designed-v0-74cp8duxfrla1.jpg?width=1400&format=pjpg&auto=webp&s=0cb492a8dae00341320ddbf63befd36774a0c472",
      route: "/library",
      icon: "Heart",
      gradient: "from-purple-600 to-blue-600"
    },
    {
      id: 2,
      title: "Downloaded",
      subtitle: "Available offline",
      artwork: "https://th.bing.com/th/id/OIP.TkdL9oCDJcYLuQA2RdZ_hwHaGh?w=227&h=200&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
      route: "/library",
      icon: "Download",
      gradient: "from-green-600 to-teal-600"
    },
    {
      id: 3,
      title: "Recently Added",
      subtitle: "45 songs",
      artwork: "https://www.officialcharts.com/media/663666/beyonce-renaissance-tour-setlist-2023-full-songs-start-time-support-act-tickets-concert-merch-song-list-how-long-hours.jpg?width=796&mode=stretch",
      route: "/library",
      icon: "Clock",
      gradient: "from-orange-600 to-red-600"
    },
    {
      id: 4,
      title: "My Playlists",
      subtitle: "12 playlists",
      artwork: "https://th.bing.com/th/id/OIP.DrmGFKX2IBobnxBWKV6sewHaHa?w=163&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
      route: "/library",
      icon: "ListMusic",
      gradient: "from-pink-600 to-purple-600"
    },
    {
      id: 5,
      title: "Top Artists",
      subtitle: "This month",
      artwork: "https://th.bing.com/th/id/OIP.cPF4yF2_95k-LJ6fYnzY1QHaHa?w=186&h=186&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
      route: "/library",
      icon: "Mic",
      gradient: "from-blue-600 to-indigo-600"
    }
  ];

  return (
    <AnimatedSection
      className="mb-8"
      animationType="fade-up"
      delay={0.3}
      repeatOnScroll={true}
    >
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Quick Access</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickAccessItems.map((item, index) => (
            <AnimatedSection
              key={item.id}
              animationType="scale-up"
              delay={0.1 * index}
              repeatOnScroll={true}
            >
              <Link
                to={item.route}
                className="group"
              >
                <div className="relative bg-card rounded-lg overflow-hidden hover-scale transition-smooth card-shadow">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-80`}></div>
                  
                  <div className="relative p-4 h-24 flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-white truncate mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-white/80 truncate">
                        {item.subtitle}
                      </p>
                    </div>
                    
                    <div className="flex-shrink-0 ml-2">
                      <div className="w-8 h-8 glassmorphism rounded-full flex items-center justify-center">
                        <Icon name={item.icon} size={16} color="white" />
                      </div>
                    </div>
                  </div>
                  <img
                    src={item.artwork}
                    alt={`${item.title} artwork`}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/assets/images/no_image.png';
                    }}
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                    <Button
                      variant="default"
                      size="icon"
                      className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
                    >
                      <Icon name="Play" size={16} color="white" />
                    </Button>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </AnimatedSection>
  );
};

export default QuickAccessSection;