import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import MessageList from './components/MessageList';
import InputForm from './components/InputForm';
import PdfModal from './components/PdfModal';
import { Bot, AlertCircle } from 'lucide-react';

const App = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [error, setError] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const simulatedResponse = {
    answer: "Yes, under Section 166 of the Motor Vehicles Act, 1988, the claimants are entitled to an addition for future prospects even when the deceased was self-employed and aged 54–55 years at the time of the accident. In *Dani Devi v. Pritam Singh*, the Court held that **10% of the deceased's annual income** should be added as future prospects.",
    citations: [
      {
        text: "as the age of the deceased at the time of accident was held to be about 54-55 years by the learned Tribunal, being self-employed, as such, 10% of annual income should have been awarded on account of future prospects.",
        source: "Dani Devi v. Pritam Singh (P&H)",
        paragraph: "Para 7",
        link: "https://lexisingapore-my.sharepoint.com/:b:/g/personal/harshit_lexi_sg/EdOegeiR_gdBvQxdyW4xE6oBCDgj5E4Bo5wjvhPHpqgIuQ?e=TEu4vz"
      }
    ]
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isLoading) {
      const typingInterval = setInterval(() => {
        setIsTyping(prev => !prev);
      }, 500);
      return () => clearInterval(typingInterval);
    }
  }, [isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setError(null);
      const userMessage = {
        id: Date.now(),
        type: 'user',
        content: query,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      setIsLoading(true);
      setQuery('');

      await new Promise(resolve => setTimeout(resolve, 1500));

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: simulatedResponse.answer,
        citations: simulatedResponse.citations,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setError('Failed to get response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCitationClick = (citation) => {
    window.open(citation.link, '_blank');
    setShowPdfModal(true);
    setTimeout(() => setShowPdfModal(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col"
    >
      <Header />

  
      <main className="flex-1 flex flex-col max-w-6xl mx-auto w-full px-4 py-6">
      
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-700 text-sm">{error}</p>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                Dismiss
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
          <MessageList
            messages={messages}
            isLoading={isLoading}
            onCitationClick={handleCitationClick}
          />
          
         
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="px-6 py-3 border-t border-gray-100"
              >
                <div className="flex items-center gap-3 text-gray-500">
                  <Bot className="w-5 h-5" />
                  <div className="flex gap-1">
                    <motion.div
                      animate={{ y: isTyping ? -2 : 0 }}
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                    />
                    <motion.div
                      animate={{ y: isTyping ? -2 : 0 }}
                      transition={{ delay: 0.15 }}
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                    />
                    <motion.div
                      animate={{ y: isTyping ? -2 : 0 }}
                      transition={{ delay: 0.3 }}
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input Form */}
          <div className="border-t border-gray-200">
            <InputForm
              query={query}
              setQuery={setQuery}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
        </div>

        <div ref={messagesEndRef} />
      </main>

  
      <AnimatePresence>
        {showPdfModal && (
          <PdfModal onClose={() => setShowPdfModal(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default App;