'use client';

const RightSidebar = () => {
  const recentActivities = [
    { id: 1, name: 'Patrick Light', time: 'Just Now', avatar: 'PL' },
    { id: 2, name: 'Chris Morgan', time: '2mins ago', avatar: 'CM' },
    { id: 3, name: 'Segun Lolake', time: '15mins ago', avatar: 'SL' },
    { id: 4, name: 'Patrick Loom', time: '1hour ago', avatar: 'PL' },
    { id: 5, name: 'Alex Johnson', time: '11:20am', avatar: 'AJ' },
  ];

  return (
    <aside className="w-80 bg-white shadow-sm border-l border-gray-200 p-6 space-y-6">
      {/* Your Latest Post Section */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-3">Your Latest Post</h3>
        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-600">
            Add product details without a catalog or shop
          </p>
          <p className="text-sm text-gray-600">
            Add product details without a catalog or shop
          </p>
        </div>
        <button className="text-green-500 text-sm font-medium hover:text-green-600 transition-colors">
          See More
        </button>
      </div>

      {/* Advertisement Section */}
      <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
        <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100">
          {/* Clothing racks background representation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-600">
              <span className="text-4xl">👕</span>
              <p className="text-sm mt-2">Fashion Collection</p>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="absolute top-8 right-6 w-3 h-3 bg-purple-400 rounded-full"></div>
          <div className="absolute bottom-6 left-8 w-2 h-2 bg-blue-400 rounded-full"></div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            50% off for clothing &
          </h3>
          <button className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors font-medium">
            Shop Now
          </button>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-4">Recent</h3>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-gray-600">
                  {activity.avatar}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {activity.name}
                </p>
                <p className="text-xs text-gray-500">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;