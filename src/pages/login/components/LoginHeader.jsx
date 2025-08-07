import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* App Logo */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
          <Icon name="Music" size={32} color="white" />
        </div>
      </div>

      {/* App Name */}
      <h1 className="text-3xl font-bold text-foreground mb-2">
        HarmonyStream
      </h1>

      {/* Welcome Message */}
      <p className="text-muted-foreground text-base leading-relaxed">
        Welcome back! Sign in to access your personalized music streaming experience.
      </p>

      {/* Spotify Integration Badge */}
      <div className="flex items-center justify-center mt-4 space-x-2">
        <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-[#1DB954]/10 border border-[#1DB954]/20">
          <Icon name="Shield" size={14} className="text-[#1DB954]" />
          <span className="text-xs font-medium text-[#1DB954]">
            Spotify API Integrated
          </span>
        </div>
        <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-muted/30 border border-border">
          <Icon name="Lock" size={14} className="text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">
            SSL Secured
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;