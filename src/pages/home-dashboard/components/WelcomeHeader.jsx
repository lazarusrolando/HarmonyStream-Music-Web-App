import React, { useState, useEffect } from 'react';
import AnimatedSection from '../../../components/AnimatedSection';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WelcomeHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName] = useState('John'); // Mock user name

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getTimeBasedRecommendation = () => {
    const hour = currentTime.getHours();
    if (hour < 10) return 'Start your day with some energizing music';
    if (hour < 14) return 'Keep the momentum going with your favorites';
    if (hour < 18) return 'Afternoon vibes to keep you motivated';
    return 'Wind down with some relaxing tunes';
  };

  return (
    <AnimatedSection 
      className="mb-8"
      animationType="fade-up"
      delay={0.3}
      repeatOnScroll={true}
    >
      <section className="glassmorphism bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {getGreeting()}, {userName}!
            </h1>
            <p className="text-muted-foreground mb-4">
              {getTimeBasedRecommendation()}
            </p>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={16} />
                <span>
                  {currentTime.toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit',
                    hour12: true 
                  })}
                </span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Calendar" size={16} />
                <span>
                  {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    month: 'short', 
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="outline"
              className="bg-background/50 backdrop-blur-sm border-border/50"
            >
              <Icon name="Shuffle" size={16} className="mr-2" />
              Shuffle Play
            </Button>
            
            <Button
              variant="default"
              className="bg-primary hover:bg-primary/90"
            >
              <Icon name="Play" size={16} className="mr-2" />
              Resume
            </Button>
          </div>
        </div>
      </section>
      
      {/* Quick Stats */}
      <AnimatedSection animationType="fade-up" delay={0.4} repeatOnScroll={true}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-card rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">732</div>
            <div className="text-xs text-muted-foreground">Liked Songs</div>
          </div>
          
          <div className="bg-card rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-accent mb-1">45</div>
            <div className="text-xs text-muted-foreground">Hours Listened</div>
          </div>
          
          <div className="bg-card rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-success mb-1">12</div>
            <div className="text-xs text-muted-foreground">Playlists</div>
          </div>
          
          <div className="bg-card rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-warning mb-1">156</div>
            <div className="text-xs text-muted-foreground">Artists</div>
          </div>
        </div>
      </AnimatedSection>
    </AnimatedSection>
  );
};

export default WelcomeHeader;