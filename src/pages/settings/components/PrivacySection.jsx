import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const PrivacySection = ({ isExpanded, onToggle }) => {
  const [listeningActivity, setListeningActivity] = useState(true);
  const [recentlyPlayed, setRecentlyPlayed] = useState(true);
  const [playlistPrivacy, setPlaylistPrivacy] = useState('public');
  const [dataSharing, setDataSharing] = useState(false);
  const [socialSharing, setSocialSharing] = useState(true);
  const [friendActivity, setFriendActivity] = useState(true);

  const privacyOptions = [
    { id: 'public', name: 'Public', description: 'Anyone can see and follow your playlists' },
    { id: 'private', name: 'Private', description: 'Only you can see your playlists' },
    { id: 'followers', name: 'Followers Only', description: 'Only your followers can see your playlists' }
  ];

  return (
    <div className="border-b border-border">
      <Button
        variant="ghost"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50"
      >
        <div className="flex items-center space-x-3">
          <Icon name="Shield" size={20} className="text-primary" />
          <span className="font-medium text-foreground">Privacy</span>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground" 
        />
      </Button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-6">
          {/* Listening Activity */}
          <div>
            <Checkbox
              label="Share Listening Activity"
              description="Let friends see what you're currently listening to"
              checked={listeningActivity}
              onChange={(e) => setListeningActivity(e.target.checked)}
            />
          </div>

          {/* Recently Played */}
          <div>
            <Checkbox
              label="Show Recently Played"
              description="Display your recently played tracks on your profile"
              checked={recentlyPlayed}
              onChange={(e) => setRecentlyPlayed(e.target.checked)}
            />
          </div>

          {/* Friend Activity */}
          <div>
            <Checkbox
              label="Friend Activity"
              description="See what your friends are listening to and let them see yours"
              checked={friendActivity}
              onChange={(e) => setFriendActivity(e.target.checked)}
            />
          </div>

          {/* Default Playlist Privacy */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Default Playlist Privacy</h4>
            <div className="space-y-3">
              {privacyOptions.map((option) => (
                <label
                  key={option.id}
                  className="flex items-start space-x-3 cursor-pointer p-3 rounded-lg hover:bg-muted/30 transition-smooth"
                >
                  <input
                    type="radio"
                    name="playlistPrivacy"
                    value={option.id}
                    checked={playlistPrivacy === option.id}
                    onChange={(e) => setPlaylistPrivacy(e.target.value)}
                    className="mt-1 w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-foreground">{option.name}</span>
                    <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Social Sharing */}
          <div>
            <Checkbox
              label="Social Media Sharing"
              description="Allow sharing tracks and playlists to social media platforms"
              checked={socialSharing}
              onChange={(e) => setSocialSharing(e.target.checked)}
            />
          </div>

          {/* Data Sharing */}
          <div>
            <Checkbox
              label="Data Sharing for Recommendations"
              description="Share anonymized listening data to improve music recommendations"
              checked={dataSharing}
              onChange={(e) => setDataSharing(e.target.checked)}
            />
          </div>

          {/* Privacy Actions */}
          <div className="pt-4 border-t border-border space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Icon name="FileText" size={16} className="mr-3" />
              Privacy Policy
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Icon name="Eye" size={16} className="mr-3" />
              View Data Usage
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Icon name="Download" size={16} className="mr-3" />
              Request Data Export
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacySection;