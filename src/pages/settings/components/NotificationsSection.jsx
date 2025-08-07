import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const NotificationsSection = ({ isExpanded, onToggle }) => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [newReleases, setNewReleases] = useState(true);
  const [playlistUpdates, setPlaylistUpdates] = useState(false);
  const [friendActivity, setFriendActivity] = useState(true);
  const [concertAlerts, setConcertAlerts] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  return (
    <div className="border-b border-border">
      <Button
        variant="ghost"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50"
      >
        <div className="flex items-center space-x-3">
          <Icon name="Bell" size={20} className="text-primary" />
          <span className="font-medium text-foreground">Notifications</span>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground" 
        />
      </Button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-6">
          {/* General Notifications */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-4">General</h4>
            <div className="space-y-4">
              <Checkbox
                label="Email Notifications"
                description="Receive notifications via email"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
              />
              <Checkbox
                label="Push Notifications"
                description="Receive push notifications in your browser"
                checked={pushNotifications}
                onChange={(e) => setPushNotifications(e.target.checked)}
              />
            </div>
          </div>

          {/* Music Notifications */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-4">Music Updates</h4>
            <div className="space-y-4">
              <Checkbox
                label="New Releases"
                description="Get notified when artists you follow release new music"
                checked={newReleases}
                onChange={(e) => setNewReleases(e.target.checked)}
              />
              <Checkbox
                label="Playlist Updates"
                description="Notifications when playlists you follow are updated"
                checked={playlistUpdates}
                onChange={(e) => setPlaylistUpdates(e.target.checked)}
              />
              <Checkbox
                label="Concert Alerts"
                description="Get notified about concerts from your favorite artists"
                checked={concertAlerts}
                onChange={(e) => setConcertAlerts(e.target.checked)}
              />
            </div>
          </div>

          {/* Social Notifications */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-4">Social</h4>
            <div className="space-y-4">
              <Checkbox
                label="Friend Activity"
                description="Notifications when friends share music or create playlists"
                checked={friendActivity}
                onChange={(e) => setFriendActivity(e.target.checked)}
              />
            </div>
          </div>

          {/* Email Preferences */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-4">Email Preferences</h4>
            <div className="space-y-4">
              <Checkbox
                label="Weekly Music Digest"
                description="A weekly summary of your listening activity and recommendations"
                checked={weeklyDigest}
                onChange={(e) => setWeeklyDigest(e.target.checked)}
              />
              <Checkbox
                label="Marketing Emails"
                description="Promotional emails about new features and offers"
                checked={marketingEmails}
                onChange={(e) => setMarketingEmails(e.target.checked)}
              />
            </div>
          </div>

          {/* Notification Settings */}
          <div className="pt-4 border-t border-border">
            <Button variant="outline" className="w-full justify-start">
              <Icon name="Settings" size={16} className="mr-3" />
              Advanced Notification Settings
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsSection;