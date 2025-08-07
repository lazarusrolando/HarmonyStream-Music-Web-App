import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../../../components/AnimatedSection';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfileSection = ({ user }) => {
  const [currentStreak, setCurrentStreak] = useState(7);

  const formatNumber = (num) => {
    if (!num && num !== 0) return '0';
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <AnimatedSection 
      className="mb-8"
      animationType="fade-up"
      delay={0.1}
      repeatOnScroll={true}
    >
      <section>
        {/* Main Profile Card */}
        <div className="glassmorphism bg-gradient-to-br from-primary/20 via-accent/10 to-primary/30 p-6 mb-6 border border-primary/20 shadow-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Profile Avatar & Basic Info */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl md:text-3xl font-bold text-white">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>

                
                {/* Premium Badge */}
                {user?.premium && (
                  <div className="absolute -top-2 -right-2 bg-warning text-black px-2 py-1 rounded-full text-xs font-bold">
                    <Icon name="Crown" size={12} />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    {user?.name || 'User'}
                  </h2>
                  {user?.premium && (
                    <div className="bg-warning/20 text-warning px-2 py-1 rounded-full text-xs font-medium">
                      Premium
                    </div>
                  )}
                </div>
                
                <p className="text-muted-foreground mb-2">{user?.email || 'user@example.com'}</p>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span>Member since {user?.memberSince || new Date().getFullYear()}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Icon name="Zap" size={14} />
                    <span>{currentStreak} day streak</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <Link to="/settings">
                <Button 
                  variant="outline" 
                  className="bg-background/50 backdrop-blur-sm border-border/50 w-full md:w-auto"
                >
                  <Icon name="Settings" size={16} className="mr-2" />
                  Edit Profile
                </Button>
              </Link>
              
              <Button 
                variant="default"
                className="bg-primary hover:bg-primary/90 w-full md:w-auto"
                onClick={() => {
                  const profileData = {
                    name: user.name,
                    email: user.email,
                    memberSince: user.memberSince,
                    premium: user.premium,
                    stats: user.stats,
                  };
                  const jsonString = JSON.stringify(profileData, null, 2);
                  const blob = new Blob([jsonString], { type: 'application/json' });
                  const fileName = `${user.name.replace(/\s+/g, '_')}_profile.json`;

                  // Always download the JSON file on click
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = fileName;
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                  URL.revokeObjectURL(url);
                }}
              >
                <Icon name="Share" size={16} className="mr-2" />
                Share Profile
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <AnimatedSection animationType="fade-up" delay={0.2} repeatOnScroll={true}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <div className="glassmorphism rounded-xl p-4 text-center border border-border/30 hover:border-primary/30 transition-all duration-300 hover:scale-105">
              <div className="text-2xl font-bold text-primary mb-1">
                {formatNumber(user?.stats?.totalPlays)}
              </div>
              <div className="text-xs text-muted-foreground">Total Plays</div>
              <div className="w-full bg-muted/30 rounded-full h-1 mt-2">
                <div
                  className="bg-primary h-1 rounded-full"
                  style={{ width: user?.stats?.totalPlays > 0 ? '75%' : '0%' }}
                ></div>
              </div>
            </div>
            
            <div className="glassmorphism rounded-xl p-4 text-center border border-border/30 hover:border-accent/30 transition-all duration-300 hover:scale-105">
              <div className="text-2xl font-bold text-accent mb-1">
                {formatNumber(user?.stats?.hoursListened)}h
              </div>
              <div className="text-xs text-muted-foreground">Hours Listened</div>
              <div className="w-full bg-muted/30 rounded-full h-1 mt-2">
                <div
                  className="bg-accent h-1 rounded-full"
                  style={{ width: user?.stats?.hoursListened > 0 ? '80%' : '0%' }}
                ></div>
              </div>
            </div>
            
            <div className="glassmorphism rounded-xl p-4 text-center border border-border/30 hover:border-destructive/30 transition-all duration-300 hover:scale-105">
              <div className="text-2xl font-bold text-destructive mb-1">
                {formatNumber(user?.stats?.songsLiked)}
              </div>
              <div className="text-xs text-muted-foreground">Liked Songs</div>
              <div className="w-full bg-muted/30 rounded-full h-1 mt-2">
                <div
                  className="bg-destructive h-1 rounded-full"
                  style={{ width: user?.stats?.songsLiked > 0 ? '66%' : '0%' }}
                ></div>
              </div>
            </div>
            
            <div className="glassmorphism rounded-xl p-4 text-center border border-border/30 hover:border-success/30 transition-all duration-300 hover:scale-105">
              <div className="text-2xl font-bold text-success mb-1">
                {formatNumber(user?.stats?.playlistsCreated)}
              </div>
              <div className="text-xs text-muted-foreground">Playlists</div>
              <div className="w-full bg-muted/30 rounded-full h-1 mt-2">
                <div
                  className="bg-success h-1 rounded-full"
                  style={{ width: user?.stats?.playlistsCreated > 0 ? '50%' : '0%' }}
                ></div>
              </div>
            </div>
            
            <div className="glassmorphism rounded-xl p-4 text-center border border-border/30 hover:border-warning/30 transition-all duration-300 hover:scale-105">
              <div className="text-2xl font-bold text-warning mb-1">
                {formatNumber(user?.stats?.followingArtists)}
              </div>
              <div className="text-xs text-muted-foreground">Following</div>
              <div className="w-full bg-muted/30 rounded-full h-1 mt-2">
                <div
                  className="bg-warning h-1 rounded-full"
                  style={{ width: user?.stats?.followingArtists > 0 ? '60%' : '0%' }}
                ></div>
              </div>
            </div>
            
            <div className="glassmorphism rounded-xl p-4 text-center border border-border/30 hover:border-info/30 transition-all duration-300 hover:scale-105">
              <div className="text-2xl font-bold text-info mb-1">
                {formatNumber(user?.stats?.followers)}
              </div>
              <div className="text-xs text-muted-foreground">Followers</div>
              <div className="w-full bg-muted/30 rounded-full h-1 mt-2">
                <div
                  className="bg-info h-1 rounded-full"
                  style={{ width: user?.stats?.followers > 0 ? '33%' : '0%' }}
                ></div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Achievement Badges */}
        <AnimatedSection animationType="fade-up" delay={0.3} repeatOnScroll={true}>
          <div className="glassmorphism rounded-xl p-4 border border-border/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Recent Achievements</h3>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                View All
                <Icon name="ChevronRight" size={14} className="ml-1" />
              </Button>
            </div>
            
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
              <div className="flex-shrink-0 glassmorphism rounded-lg p-3 text-center min-w-[120px] border border-primary/20">
                <Icon name="Music" size={24} className="mx-auto mb-2 text-primary" />
                <div className="text-sm font-medium text-foreground">Music Lover</div>
                <div className="text-xs text-muted-foreground">1000+ songs played</div>
              </div>
              
              <div className="flex-shrink-0 glassmorphism rounded-lg p-3 text-center min-w-[120px] border border-success/20">
                <Icon name="Headphones" size={24} className="mx-auto mb-2 text-success" />
                <div className="text-sm font-medium text-foreground">Marathon</div>
                <div className="text-xs text-muted-foreground">10+ hours today</div>
              </div>
              
              <div className="flex-shrink-0 glassmorphism rounded-lg p-3 text-center min-w-[120px] border border-warning/20">
                <Icon name="Star" size={24} className="mx-auto mb-2 text-warning" />
                <div className="text-sm font-medium text-foreground">Curator</div>
                <div className="text-xs text-muted-foreground">Popular playlist</div>
              </div>
              
              <div className="flex-shrink-0 glassmorphism rounded-lg p-3 text-center min-w-[120px] border border-destructive/20">
                <Icon name="Heart" size={24} className="mx-auto mb-2 text-destructive" />
                <div className="text-sm font-medium text-foreground">Superfan</div>
                <div className="text-xs text-muted-foreground">500+ likes</div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </AnimatedSection>
  );
};

export default ProfileSection;
