import React from 'react';

const MainContent: React.FC = () => {
  return (
    <main className="flex-1 p-6 space-y-6">
      {/* Share Product Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-lg">VK</span>
          </div>
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Share your Product"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full">
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Product Stories */}
        <div className="mt-6">
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {/* Add New Product */}
            <div className="flex flex-col items-center space-y-2 flex-shrink-0">
              <div className="w-20 h-20 bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-green-500 transition-colors cursor-pointer">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-sm text-gray-600">Abdul</span>
            </div>

            {/* Product Story 1 */}
            <div className="flex flex-col items-center space-y-2 flex-shrink-0">
              <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-medium">T-Shirt</span>
                </div>
              </div>
              <span className="text-sm text-gray-600">Meru</span>
            </div>

            {/* Product Story 2 */}
            <div className="flex flex-col items-center space-y-2 flex-shrink-0">
              <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-medium">Meat</span>
                </div>
              </div>
              <span className="text-sm text-gray-600">Chandra</span>
            </div>

            {/* Product Story 3 */}
            <div className="flex flex-col items-center space-y-2 flex-shrink-0">
              <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-medium">Cherry</span>
                </div>
              </div>
              <span className="text-sm text-gray-600">Namaha</span>
            </div>

            {/* Product Story 4 */}
            <div className="flex flex-col items-center space-y-2 flex-shrink-0">
              <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="w-16 h-16 bg-yellow-400 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-medium">Pine</span>
                </div>
              </div>
              <span className="text-sm text-gray-600">Raamaya</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sponsored Post */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Post Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">B</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-900">Balaji</span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">sponsored post</span>
              </div>
            </div>
          </div>
          <p className="mt-2 text-gray-700 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra ..
          </p>
        </div>

        {/* Post Image */}
        <div className="w-full h-80 bg-gray-300 flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-32 bg-red-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-red-600 font-medium">Beef Meat</span>
            </div>
            <p className="text-gray-600 text-sm">Raw beef meat with garlic and peppercorns</p>
          </div>
        </div>

        {/* Post Actions */}
        <div className="p-4 space-y-4">
          {/* Action Icons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-sm">Like</span>
              </button>
              
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-sm">Comment</span>
              </button>
              
              <button className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
                <span className="text-sm">Share</span>
              </button>
              
              <button className="flex items-center space-x-2 text-gray-600 hover:text-yellow-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <span className="text-sm">Bookmark</span>
              </button>
            </div>
            
            <div className="text-sm text-gray-500">
              13.5KM ... 54mins Away
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <button className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>Direct Message</span>
            </button>
            
            <div className="text-2xl font-bold text-gray-900">$60</div>
          </div>

          {/* Category and Comments */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Category: <span className="font-medium text-gray-900">Beef Meat</span></span>
              <button className="text-green-600 hover:text-green-700">View all 57 comments</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;