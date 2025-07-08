import React from 'react';
import Message from './Message';
import { Bot, Loader2, Scale, BookOpen, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MessageList = ({ messages, isLoading, onCitationClick }) => {
  return (
    <motion.div 
      className="flex-1 overflow-y-auto p-4 relative scroll-smooth"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <AnimatePresence mode="wait">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-12"
            >
              {/* Welcome Screen */}
              <div className="relative">
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-20 animate-pulse" />
                
                {/* Bot icon with animation */}
                <motion.div
                  className="relative z-10"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Bot className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                </motion.div>
              </div>

              <motion.h2 
                className="text-2xl font-semibold text-gray-900 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Welcome to Lexi Legal Assistant
              </motion.h2>

              {/* Features Grid */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {[
                  {
                    icon: <Search className="w-5 h-5" />,
                    title: "Legal Research",
                    description: "Instant access to legal precedents"
                  },
                  {
                    icon: <Scale className="w-5 h-5" />,
                    title: "Case Analysis",
                    description: "Comprehensive legal insights"
                  },
                  {
                    icon: <BookOpen className="w-5 h-5" />,
                    title: "Citations",
                    description: "Backed by legal documents"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-blue-600 mb-2">{feature.icon}</div>
                    <h3 className="font-medium text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-500">{feature.description}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.p 
                className="text-gray-600 max-w-md mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Ask any legal question and I'll provide you with detailed answers backed by legal precedents.
              </motion.p>
            </motion.div>
          ) : (
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Message message={message} onCitationClick={onCitationClick} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Loading State */}
          {isLoading && (
            <motion.div 
              className="flex gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400 rounded-full blur-md opacity-20 animate-pulse" />
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0 relative">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              </div>
              
              <motion.div 
                className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
                animate={{
                  boxShadow: [
                    "0 1px 2px 0 rgb(0 0 0 / 0.05)",
                    "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    "0 1px 2px 0 rgb(0 0 0 / 0.05)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex items-center gap-3 text-gray-600">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <div className="space-y-2">
                    <p>Analyzing legal precedents...</p>
                    <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full w-1/2 bg-blue-600 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MessageList;