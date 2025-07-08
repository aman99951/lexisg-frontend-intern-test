import React from 'react';
import { FileText, X, ExternalLink, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PdfModal = ({ onClose, documentName = "Legal Document", paragraphNumber = 7 }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      {/* Modal Content */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <motion.button
          whileHover={{ rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </motion.button>

        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-400 rounded-lg blur-md opacity-20" />
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center relative shadow-lg"
            >
              <FileText className="w-6 h-6 text-white" />
            </motion.div>
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-lg mb-1">
              PDF Successfully Opened
            </h3>
            <p className="text-sm text-gray-600">
              {documentName} opened in a new tab
            </p>
          </div>
        </div>

        {/* Status Steps */}
        <div className="space-y-3 mb-6">
          {[
            { icon: <Check />, text: "Document loaded" },
            { icon: <ArrowRight />, text: `Scrolled to Paragraph ${paragraphNumber}` },
            { icon: <ExternalLink />, text: "Relevant text highlighted" }
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 text-sm"
            >
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                {step.icon}
              </div>
              <span className="text-gray-600">{step.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200 rounded-xl p-4"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-blue-900 font-medium mb-1">
                Navigation Tip
              </p>
              <p className="text-sm text-blue-700">
                Use Ctrl/Cmd + F to search for specific terms within the document.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
            onClick={onClose}
          >
            Close
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            onClick={() => window.focus()}
          >
            Switch to PDF
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

export default PdfModal;