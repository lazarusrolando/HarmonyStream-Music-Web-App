import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AboutSection = ({ isExpanded, onToggle }) => {
  const appInfo = {
    version: "2.1.4",
    buildNumber: "20250126",
    lastUpdated: "January 26, 2025",
    platform: "Web Application"
  };

  const supportLinks = [
    {
      title: "Help Center",
      description: "Find answers to common questions",
      icon: "HelpCircle",
      action: () => console.log('Opening help center')
    },
    {
      title: "Contact Support",
      description: "Get help from our support team",
      icon: "MessageCircle",
      action: () => console.log('Opening contact support')
    },
    {
      title: "Report a Bug",
      description: "Help us improve by reporting issues",
      icon: "Bug",
      action: () => console.log('Opening bug report')
    },
    {
      title: "Feature Request",
      description: "Suggest new features for HarmonyStream",
      icon: "Lightbulb",
      action: () => console.log('Opening feature request')
    }
  ];

  const legalLinks = [
    {
      title: "Terms of Service",
      icon: "FileText",
      action: () => console.log('Opening terms of service')
    },
    {
      title: "Privacy Policy",
      icon: "Shield",
      action: () => console.log('Opening privacy policy')
    },
    {
      title: "Cookie Policy",
      icon: "Cookie",
      action: () => console.log('Opening cookie policy')
    },
    {
      title: "Licenses",
      icon: "Award",
      action: () => console.log('Opening licenses')
    }
  ];

  return (
    <div className="border-b border-border">
      <Button
        variant="ghost"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50"
      >
        <div className="flex items-center space-x-3">
          <Icon name="Info" size={20} className="text-primary" />
          <span className="font-medium text-foreground">About</span>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground" 
        />
      </Button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-6">
          {/* App Information */}
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Music" size={32} color="white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">HarmonyStream</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Premium music streaming experience
            </p>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-card rounded-lg border border-border">
                <p className="text-lg font-semibold text-foreground">{appInfo.version}</p>
                <p className="text-xs text-muted-foreground">Version</p>
              </div>
              <div className="p-3 bg-card rounded-lg border border-border">
                <p className="text-lg font-semibold text-foreground">{appInfo.buildNumber}</p>
                <p className="text-xs text-muted-foreground">Build</p>
              </div>
            </div>
            
            <div className="mt-4 text-xs text-muted-foreground">
              <p>Last updated: {appInfo.lastUpdated}</p>
              <p>Platform: {appInfo.platform}</p>
            </div>
          </div>

          {/* Support Section */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-4">Support</h4>
            <div className="space-y-2">
              {supportLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start h-auto p-4"
                  onClick={link.action}
                >
                  <Icon name={link.icon} size={18} className="mr-3 text-primary" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-foreground">{link.title}</p>
                    <p className="text-xs text-muted-foreground">{link.description}</p>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Legal Section */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-4">Legal</h4>
            <div className="grid grid-cols-2 gap-2">
              {legalLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="justify-start h-auto p-3"
                  onClick={link.action}
                >
                  <Icon name={link.icon} size={16} className="mr-2 text-muted-foreground" />
                  <span className="text-xs text-foreground">{link.title}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* System Information */}
          <div className="p-4 bg-card rounded-lg border border-border">
            <h5 className="text-sm font-medium text-foreground mb-3">System Information</h5>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>User Agent:</span>
                <span className="text-right max-w-48 truncate">
                  {navigator.userAgent.split(' ')[0]}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Language:</span>
                <span>{navigator.language}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform:</span>
                <span>{navigator.platform}</span>
              </div>
              <div className="flex justify-between">
                <span>Online:</span>
                <span>{navigator.onLine ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} HarmonyStream. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Made with ❤️ for music lovers everywhere
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutSection;