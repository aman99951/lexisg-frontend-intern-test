import React from 'react';
import { Bot, BookOpen } from 'lucide-react';

const Header = () => (
  <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200 transition-all duration-300 ease-in-out hover:bg-white">
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between">
        {/* Left side - Logo and Title */}
        <div className="flex items-center gap-3 group">
          <div className="relative">
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-blue-400 rounded-lg blur-md group-hover:blur-lg transition-all duration-300 opacity-20 group-hover:opacity-30" />
            
            {/* Logo container with hover effects */}
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center relative transform transition-all duration-300 ease-in-out hover:scale-110 hover:rotate-3 cursor-pointer">
              <Bot className="w-5 h-5 text-white transform transition-transform group-hover:scale-110" />
            </div>
          </div>

          {/* Title with hover effect */}
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold text-gray-900 transform transition-all duration-300 hover:text-blue-600">
              Lexi Legal Assistant
            </h1>
            <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              AI-Powered Legal Research
            </span>
          </div>
        </div>

        {/* Right side - Status indicators */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 hover:border-blue-200 transition-all duration-300">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-gray-600">Online</span>
          </div>
          
          <div className="hidden sm:flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm font-medium">Legal AI</span>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Header;