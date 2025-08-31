import React from 'react';

const RightSidebar: React.FC = () => {
  return (
    <aside className="w-80 bg-white border-l border-gray-200 p-6 space-y-6">
      {/* Your Latest Post */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-green-600 mb-3">Your Latest Post</h3>
        <p className="text-gray-700 text-sm mb-2">
          Add product details without a catalog or shop
        </p>
        <p className="text-gray-700 text-sm mb-3">
          Add product details without a catalog or shop
        </p>
        <a href="#" className="text-green-600 hover:text-green-700 text-sm font-medium">
          See More
        </a>
      </div>

      {/* Advertisement */}
      <div className="bg-gray-50 rounded-lg overflow-hidden">
        <div className="w-full h-32 bg-gray-300 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <span className="text-blue-600 text-xs font-medium">Clothing</span>
            </div>
            <p className="text-gray-600 text-xs">Store racks</p>
          </div>
        </div>
        <div className="p-4">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">
            50% off for clothing &
          </h4>
          <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors font-medium">
            Shop Now
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent</h3>
        <div className="space-y-4">
          {/* Activity Item 1 */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-semibold">PL</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Patrick Light</p>
              <p className="text-xs text-gray-500">Just Now</p>
            </div>
          </div>

          {/* Activity Item 2 */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-semibold">CM</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Chris Morgan</p>
              <p className="text-xs text-gray-500">2mins ago</p>
            </div>
          </div>

          {/* Activity Item 3 */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-semibold">SL</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Segun Lolake</p>
              <p className="text-xs text-gray-500">15mins ago</p>
            </div>
          </div>

          {/* Activity Item 4 */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-semibold">C</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Chris</p>
              <p className="text-xs text-gray-500">1hour ago</p>
            </div>
          </div>

          {/* Activity Item 5 */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-semibold">PL</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Patrick Loom</p>
              <p className="text-xs text-gray-500">11:20am</p>
            </div>
          </div>

          {/* Activity Item 6 */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-semibold">P</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Patrick</p>
              <p className="text-xs text-gray-500">11:20am</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;