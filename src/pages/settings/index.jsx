import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Navigation from '../../components/ui/Navigation';
import PlayerBar from '../../components/ui/PlayerBar';
import AudioQualitySection from './components/AudioQualitySection';
import PlaybackSection from './components/PlaybackSection';
import AccountSection from './components/AccountSection';
import PrivacySection from './components/PrivacySection';
import NotificationsSection from './components/NotificationsSection';
import StorageSection from './components/StorageSection';
import AboutSection from './components/AboutSection';

const Settings = () => {
  const [expandedSections, setExpandedSections] = useState({
    audioQuality: false,
    playback: false,
    account: false,
    privacy: false,
    notifications: false,
    storage: false,
    about: false
  })


  useEffect(() => {
    const savedLanguage = localStorage.getItem('harmonystream_language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const settingsSections = [
    {
      key: 'audioQuality',
      component: AudioQualitySection,
      props: {
        isExpanded: expandedSections.audioQuality,
        onToggle: () => toggleSection('audioQuality')
      }
    },
    {
      key: 'playback',
      component: PlaybackSection,
      props: {
        isExpanded: expandedSections.playback,
        onToggle: () => toggleSection('playback')
      }
    },
    {
      key: 'account',
      component: AccountSection,
      props: {
        isExpanded: expandedSections.account,
        onToggle: () => toggleSection('account')
      }
    },
    {
      key: 'privacy',
      component: PrivacySection,
      props: {
        isExpanded: expandedSections.privacy,
        onToggle: () => toggleSection('privacy')
      }
    },
    {
      key: 'notifications',
      component: NotificationsSection,
      props: {
        isExpanded: expandedSections.notifications,
        onToggle: () => toggleSection('notifications')
      }
    },
    {
      key: 'storage',
      component: StorageSection,
      props: {
        isExpanded: expandedSections.storage,
        onToggle: () => toggleSection('storage')
      }
    },
    {
      key: 'about',
      component: AboutSection,
      props: {
        isExpanded: expandedSections.about,
        onToggle: () => toggleSection('about')
      }
    }
  ];

  return (
    <>
      <Helmet>
        <title>Settings - HarmonyStream</title>
        <meta name="description" content="Customize your HarmonyStream experience with audio quality, playback, privacy, and account settings." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        <Header />
        
        <main className="pt-[120px] md:pt-[140px] pb-[160px] md:pb-[120px] px-4 lg:px-6 w-full max-w-full">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
              <p className="text-muted-foreground">
                Customize your HarmonyStream experience with personalized preferences and controls.
              </p>
            </div>

            {/* Settings Sections */}
            <div className="bg-card rounded-lg border border-border overflow-hidden space-y-6">
              {settingsSections.map(({ key, component: Component, props }) => (
                <Component key={key} {...props} />
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 p-6 bg-card rounded-lg border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 text-center">
                  <div className="text-2xl mb-2">🎵</div>
                  <h4 className="font-medium text-foreground mb-1">Reset Audio Settings</h4>
                  <p className="text-xs text-muted-foreground">Restore default audio preferences</p>
                </div>
                
                <div className="p-4 bg-accent/10 rounded-lg border border-accent/20 text-center">
                  <div className="text-2xl mb-2">🔄</div>
                  <h4 className="font-medium text-foreground mb-1">Sync Settings</h4>
                  <p className="text-xs text-muted-foreground">Sync preferences across devices</p>
                </div>
                
                <div className="p-4 bg-warning/10 rounded-lg border border-warning/20 text-center">
                  <div className="text-2xl mb-2">📤</div>
                  <h4 className="font-medium text-foreground mb-1">Export Settings</h4>
                  <p className="text-xs text-muted-foreground">Backup your configuration</p>
                </div>
                <div
                  className="p-4 bg-destructive/10 rounded-lg border border-destructive/20 text-center cursor-pointer hover:bg-destructive/20 transition"
                  onClick={() => {
                    import('../../utils/spotifyApi').then(({ clearAccessToken }) => {
                      clearAccessToken();
                      localStorage.removeItem('harmonystream_auth');
                      window.location.href = '/login';
                    });
                  }}
                >
                  <div className="text-2xl mb-2">🚪</div>
                  <h4 className="font-medium text-foreground mb-1">Logout</h4>
                  <p className="text-xs text-muted-foreground">Sign out of your account</p>
                </div>
              </div>
            </div>

            {/* Settings Footer */}
            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>Settings are automatically saved as you make changes.</p>
              <p className="mt-1">
                Need help? Visit our{' '}
                <button className="text-primary hover:underline">
                  Help Center
                </button>{' '}
                for detailed guides and support.
              </p>
            </div>
          </div>
        </main>

        <PlayerBar />
      </div>
    </>
  );
};

export default Settings;