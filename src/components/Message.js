import React, { useState, useEffect } from 'react';
import { Bot, User, FileText, ExternalLink, Check, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TypewriterText = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 30); // Adjust speed here (lower number = faster)

      return () => clearTimeout(timeout);
    } else {
      onComplete && onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return <span>{displayedText}</span>;
};

const formatAnswer = (text) => {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
};

const Message = ({ message, onCitationClick }) => {
  const isBot = message.type === 'bot';
  const [isTypingComplete, setIsTypingComplete] = useState(!isBot);
  const [showCitations, setShowCitations] = useState(false);

  return (
    <motion.div
      className={`flex gap-4 ${isBot ? 'justify-start' : 'justify-end'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Avatar */}
      <AnimatePresence>
        {isBot && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-blue-400 rounded-full blur-md opacity-20" />
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg relative"
            >
              <Bot className="w-5 h-5 text-white" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message Content */}
      <motion.div 
        className={`max-w-3xl ${!isBot ? 'order-1' : ''}`}
        layout
      >
        <motion.div
          className={`rounded-2xl p-4 shadow-sm ${
            isBot 
              ? 'bg-white border border-gray-100 hover:border-blue-100 transition-colors' 
              : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
          }`}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Message Text */}
          <div className={`${isBot ? 'text-gray-800' : 'text-white'} prose prose-sm`}>
            {isBot ? (
              <TypewriterText 
                text={message.content} 
                onComplete={() => {
                  setIsTypingComplete(true);
                  setShowCitations(true);
                }}
              />
            ) : (
              message.content
            )}
          </div>

          {/* Typing Cursor */}
          {isBot && !isTypingComplete && (
            <motion.span
              className="inline-block w-0.5 h-4 bg-blue-500 ml-1"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          )}

          {/* Timestamp and Status */}
          <AnimatePresence>
            {isTypingComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`mt-2 flex items-center gap-2 text-xs ${
                  isBot ? 'text-gray-400' : 'text-blue-100'
                }`}
              >
                <Clock className="w-3 h-3" />
                <span>{new Date().toLocaleTimeString()}</span>
                {!isBot && <Check className="w-3 h-3" />}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Citations */}
          <AnimatePresence>
            {showCitations && message.citations && message.citations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-3"
              >
                <div className="text-sm font-medium text-gray-700 border-t border-gray-100 pt-3">
                  Citations
                </div>
                {message.citations.map((citation, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-blue-500 hover:bg-blue-50/50 transition-colors">
                      {/* Citation Quote */}
                      <TypewriterText
                        text={citation.text}
                        className="text-sm text-gray-600 mb-3 relative pl-6"
                      />

                      {/* Citation Source Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onCitationClick(citation)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-blue-600 hover:text-blue-700 hover:border-blue-200 hover:bg-blue-50 text-sm font-medium transition-colors shadow-sm"
                      >
                        <FileText className="w-4 h-4" />
                        <span>{citation.source}</span>
                        <span className="text-gray-400">•</span>
                        <span>Para {citation.paragraph}</span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* User Avatar */}
      <AnimatePresence>
        {!isBot && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
          >
            <User className="w-5 h-5 text-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Message;