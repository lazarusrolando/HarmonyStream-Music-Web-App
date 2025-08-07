import React from 'react';
import AnimatedSection from '../../../components/AnimatedSection';

const RecentlyPlayedSection = () => {
  const recentlyPlayed = [
    {
      id: 1,
      title: "Fine Line",
      artist: "Harry Styles",
      album: "Fine Line",
      artwork: "/assets/images/no_image.png",
      type: "playlist",
      lastPlayed: "2 days ago"
    },
    {
      id: 2,
      title: "Watermelon Sugar",
      artist: "Harry Styles",
      album: "Fine Line",
      artwork: "/assets/images/no_image.png",
      type: "track",
      lastPlayed: "1 week ago"
    }
  ];

  return (
    <AnimatedSection 
      className="mb-8"
      animationType="fade-up"
      delay={0.2}
      repeatOnScroll={true}
    >
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Recently Played</h2>
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {recentlyPlayed.map((item, index) => (
            <AnimatedSection
              key={item.id}
              animationType="slide-in-left"
              delay={0.1 * index}
              repeatOnScroll={true}
              className="flex-shrink-0 w-44 cursor-pointer"
            >
              <div className="glassmorphism w-44 h-44 rounded-lg overflow-hidden bg-muted mb-3">
                <img
                  src={item.artwork}
                  alt={`${item.title} cover`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/assets/images/no_image.png';
                  }}
                />
              </div>
              <h3 className="text-sm font-medium text-foreground truncate">{item.title}</h3>
              <p className="text-xs text-muted-foreground truncate">{item.artist}</p>
              <p className="text-xs text-muted-foreground">{item.lastPlayed}</p>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </AnimatedSection>
  );
};

export default RecentlyPlayedSection;
