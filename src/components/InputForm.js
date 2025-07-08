import React from 'react';
import { Send, Loader2, Sparkles, X } from 'lucide-react';

const InputForm = ({ query, setQuery, handleSubmit, isLoading }) => {
  const isQueryEmpty = !query.trim();

  return (
    <div className="bg-white border-t border-gray-200 p-4 relative">
     
      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
       
        <div className="transform transition-all duration-300 ease-in-out">
          <div className="flex gap-3 relative">
    
            <div className="flex-1 relative group">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask a legal question... (e.g., In a motor accident claim where the deceased was self-employed and aged 54–55 years...)"
                className="w-full p-4 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white/50 backdrop-blur-sm transition-all duration-300 placeholder-gray-400"
                rows="3"
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />

           
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <span className="text-xs text-gray-400">
                  {query.length}/1000
                </span>
              </div>

             
              <div className="absolute inset-0 rounded-xl border border-blue-500 opacity-0 scale-105 group-focus-within:opacity-100 group-focus-within:scale-100 transition-all duration-300 pointer-events-none" />
            </div>

           
            <button
              onClick={handleSubmit}
              disabled={isLoading || isQueryEmpty}
              className={`
                px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all duration-300
                ${isLoading || isQueryEmpty 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-100 active:scale-95'
                }
              `}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </>
              )}
            </button>
          </div>

        
          <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
            <Sparkles className="w-3 h-3" />
            <span>Press Enter to send, Shift + Enter for new line</span>
          </div>
        </div>

        
        
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <div className="flex items-center gap-3 text-blue-600">
              <div className="relative">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <div className="absolute inset-0 border-2 border-blue-200 rounded-full animate-pulse" />
              </div>
              <span className="font-medium">Analyzing your question...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputForm;