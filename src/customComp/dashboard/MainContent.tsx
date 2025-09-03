'use client';

import { useState } from 'react';

const MainContent = () => {
  const [productImages] = useState([
    { id: 1, name: 'Abdul', isAdd: true },
    { id: 2, name: 'Meru', image: '👕' },
    { id: 3, name: 'Chandra', image: '🥩' },
    { id: 4, name: 'Namaha', image: '🍒' },
    { id: 5, name: 'Raamaya', image: '🍍' },
  ]);

  return (
    <main className="flex-1 p-6 space-y-6">
      {/* Share your Product Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-semibold">VK</span>
          </div>
          <div className="flex-1">
            <button className="w-full bg-green-500 text-white py-4 px-6 rounded-xl text-left hover:bg-green-600 transition-colors flex items-center justify-between">
              <span className="font-medium">Share your Product</span>
              <span className="text-2xl">📷</span>
            </button>
          </div>
        </div>

        {/* Product Preview Cards */}
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {productImages.map((product) => (
            <div key={product.id} className="flex-shrink-0">
              <div className="w-24 h-24 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center mb-2">
                {product.isAdd ? (
                  <div className="text-center">
                    <span className="text-3xl text-gray-400">➕</span>
                  </div>
                ) : (
                  <span className="text-4xl">{product.image}</span>
                )}
              </div>
              <p className="text-sm text-gray-600 text-center">{product.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sponsored Post Section */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Post Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">B</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">Balaji</h3>
              <p className="text-sm text-gray-500">sponsored post</p>
            </div>
          </div>
        </div>

        {/* Post Description */}
        <div className="px-4 py-3">
          <p className="text-gray-700 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra ..
          </p>
        </div>

        {/* Product Image */}
        <div className="px-4 pb-4">
          <div className="w-full h-64 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center relative overflow-hidden">
            <div className="text-center text-red-600">
              <span className="text-6xl">🥩</span>
              <p className="text-sm mt-2">Premium Beef Cuts</p>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-4 left-4 w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="absolute top-8 right-6 w-2 h-2 bg-yellow-400 rounded-full"></div>
            <div className="absolute bottom-6 left-8 w-2 h-2 bg-yellow-400 rounded-full"></div>
          </div>
        </div>

        {/* Post Footer */}
        <div className="px-4 pb-4 space-y-4">
          {/* Engagement Icons */}
          <div className="flex items-center space-x-6">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
              <span className="text-xl">❤️</span>
              <span className="text-sm">Like</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
              <span className="text-xl">💬</span>
              <span className="text-sm">Comment</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors">
              <span className="text-xl">⬆️</span>
              <span className="text-sm">Share</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-yellow-500 transition-colors">
              <span className="text-xl">🔖</span>
              <span className="text-sm">Save</span>
            </button>
          </div>

          {/* Location and Time */}
          <div className="text-center text-sm text-gray-500">
            13.5KM ... 54mins Away
          </div>

          {/* Action Buttons and Price */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <p>Category: Beef Meat</p>
              <p className="text-blue-600 cursor-pointer hover:underline">View all 57 comments</p>
            </div>
            <div className="text-right">
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2 mb-2">
                <span>👤</span>
                <span>Direct Message</span>
              </button>
              <div className="text-2xl font-bold text-green-600">$60</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;