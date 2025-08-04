import React from 'react';
import AnimatedSection from '../../../components/AnimatedSection';

const RecommendedSection = () => {
  const playlists = [
    {
      id: 1,
      title: "High-energy tracks to power your workout",
      artwork: "/assets/images/no_image.png",
      type: "playlist",
      description: "High-energy tracks to power your workout",
    },
    {
      id: 2,
      title: "Playlist • 47 songs",
      artwork: "/assets/images/no_image.png",
      type: "playlist",
      description: "Popular playlist",
    },
  ];

  return (
    <AnimatedSection 
      className="mb-8"
      animationType="fade-up"
      delay={0.2}
      repeatOnScroll={true}
    >
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">Recommended for You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {playlists.map((playlist) => (
            <AnimatedSection 
              key={playlist.id}
              className="glassmorphism rounded-xl p-4 hover:bg-accent transition-colors cursor-pointer"
              animationType="scale-up"
              delay={0.1 * playlist.id}
              repeatOnScroll={true}
            >
              <div className="aspect-square rounded-lg overflow-hidden mb-4">
                <img 
                  src={playlist.artwork} 
                  alt={playlist.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-foreground mb-1 line-clamp-2">{playlist.title}</h3>
              <p className="text-sm text-muted-foreground">{playlist.description}</p>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </AnimatedSection>
  );
};

export default RecommendedSection;
