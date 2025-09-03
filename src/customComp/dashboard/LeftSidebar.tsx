'use client';

import { useState } from 'react';

const LeftSidebar = () => {
  const [expandedSections, setExpandedSections] = useState({
    about: false,
    help: false,
  });

  const navigationLinks = [
    { id: 'home', icon: '🏠', label: 'Home', active: true },
    { id: 'notifications', icon: '🔔', label: 'Notifications' },
    { id: 'messages', icon: '💬', label: 'Messages' },
    { id: 'friends', icon: '👥', label: 'Friends', count: '1000+' },
    { id: 'languages', icon: '🌐', label: 'Languages' },
  ];

  const toggleSection = (section: 'about' | 'help') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <aside className="w-80 bg-white shadow-sm border-r border-gray-200 p-6 space-y-6">
      {/* User Profile Section */}
      <div className="text-center pb-6 border-b border-gray-200">
        <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-3 flex items-center justify-center">
          <span className="text-gray-600 font-semibold text-2xl">VK</span>
        </div>
        <h3 className="font-semibold text-gray-800">Virat Kohli</h3>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          🔍
        </div>
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
          ⚙️
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="space-y-2">
        {navigationLinks.map((link) => (
          <button
            key={link.id}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
              link.active
                ? 'bg-green-100 text-green-600'
                : 'text-gray-600 hover:text-green-600 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-xl">{link.icon}</span>
              <span className="font-medium">{link.label}</span>
            </div>
            {link.count && (
              <span className="text-sm bg-gray-200 px-2 py-1 rounded-full">
                {link.count}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Bottom Sections */}
      <div className="space-y-2 pt-6 border-t border-gray-200">
        <button
          onClick={() => toggleSection('about')}
          className="w-full flex items-center justify-between p-3 rounded-lg text-gray-600 hover:text-green-600 hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <span className="text-xl">ℹ️</span>
            <span className="font-medium">About</span>
          </div>
          <span className={`transform transition-transform ${expandedSections.about ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        
        {expandedSections.about && (
          <div className="pl-11 pr-3 pb-2 text-sm text-gray-500">
            Learn more about FAYKAR platform and its features.
          </div>
        )}

        <button
          onClick={() => toggleSection('help')}
          className="w-full flex items-center justify-between p-3 rounded-lg text-gray-600 hover:text-green-600 hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <span className="text-xl">❓</span>
            <span className="font-medium">Faykar Help</span>
          </div>
          <span className={`transform transition-transform ${expandedSections.help ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        
        {expandedSections.help && (
          <div className="pl-11 pr-3 pb-2 text-sm text-gray-500">
            Get help and support for using the platform.
          </div>
        )}
      </div>
    </aside>
  );
};

export default LeftSidebar;