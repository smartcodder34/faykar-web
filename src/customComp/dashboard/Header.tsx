'use client';

import { useState } from 'react';

const Header = () => {
  const [activeTab, setActiveTab] = useState('home');

  const navigationItems = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'chat', icon: '💬', label: 'Chat' },
    { id: 'search', icon: '🔍', label: 'Search' },
    { id: 'profile', icon: '👤', label: 'Profile' },
    { id: 'add', icon: '➕', label: 'Add' },
    { id: 'message', icon: '📧', label: 'Message' },
    { id: 'notifications', icon: '🔔', label: 'Notifications' },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">F</span>
          </div>
          <h1 className="text-2xl font-bold text-green-500">FAYKAR</h1>
        </div>

        {/* Navigation Icons */}
        <nav className="flex items-center space-x-6">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`p-2 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-green-100 text-green-600'
                  : 'text-gray-600 hover:text-green-600 hover:bg-gray-100'
              }`}
              title={item.label}
            >
              <span className="text-xl">{item.icon}</span>
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-semibold">VK</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <span className="text-sm font-medium text-gray-700">Virat Kohli</span>
        </div>
      </div>
    </header>
  );
};

export default Header;