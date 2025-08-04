import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const AccountSection = ({ isExpanded, onToggle }) => {
  const [showDevices, setShowDevices] = useState(false);

  const userProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    plan: "Premium",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  };

  const connectedDevices = [
    {
      id: 1,
      name: "MacBook Pro",
      type: "Computer",
      lastActive: "Active now",
      isActive: true
    },
    {
      id: 2,
      name: "iPhone 14",
      type: "Mobile",
      lastActive: "2 hours ago",
      isActive: false
    },
    {
      id: 3,
      name: "Living Room Speaker",
      type: "Speaker",
      lastActive: "Yesterday",
      isActive: false
    }
  ];

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'Computer': return 'Monitor';
      case 'Mobile': return 'Smartphone';
      case 'Speaker': return 'Speaker';
      default: return 'Device';
    }
  };

  return (
    <div className="border-b border-border">
      <Button
        variant="ghost"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50"
      >
        <div className="flex items-center space-x-3">
          <Icon name="User" size={20} className="text-primary" />
          <span className="font-medium text-foreground">Account</span>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground" 
        />
      </Button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-6">
          {/* Profile Information */}
          <div className="flex items-center space-x-4 p-4 bg-card rounded-lg border border-border">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
              <Image
                src={userProfile.avatar}
                alt="Profile picture"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-medium text-foreground">{userProfile.name}</h4>
              <p className="text-sm text-muted-foreground">{userProfile.email}</p>
              <div className="flex items-center space-x-2 mt-2">
                <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full">
                  {userProfile.plan}
                </span>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Edit Profile
            </Button>
          </div>

          {/* Subscription Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Subscription</h4>
            <div className="p-4 bg-card rounded-lg border border-border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-foreground">HarmonyStream Premium</span>
                <span className="text-sm font-medium text-primary">$9.99/month</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Next billing date: February 26, 2025
              </p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Manage Plan
                </Button>
                <Button variant="ghost" size="sm">
                  Cancel
                </Button>
              </div>
            </div>
          </div>

          {/* Connected Devices */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-foreground">Connected Devices</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDevices(!showDevices)}
              >
                {showDevices ? 'Hide' : 'Show'} ({connectedDevices.length})
              </Button>
            </div>
            
            {showDevices && (
              <div className="space-y-2">
                {connectedDevices.map((device) => (
                  <div
                    key={device.id}
                    className="flex items-center justify-between p-3 bg-card rounded-lg border border-border"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon 
                        name={getDeviceIcon(device.type)} 
                        size={18} 
                        className="text-muted-foreground" 
                      />
                      <div>
                        <p className="text-sm font-medium text-foreground">{device.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {device.type} • {device.lastActive}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {device.isActive && (
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                      )}
                      <Button variant="ghost" size="sm">
                        <Icon name="MoreHorizontal" size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Account Actions */}
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Icon name="Key" size={16} className="mr-3" />
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Icon name="Download" size={16} className="mr-3" />
              Download Your Data
            </Button>
            <Button variant="destructive" className="w-full justify-start">
              <Icon name="Trash2" size={16} className="mr-3" />
              Delete Account
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSection;