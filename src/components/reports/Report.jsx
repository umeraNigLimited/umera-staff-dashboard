import React, { useState } from "react";
import { motion } from "framer-motion";
import AdminReview from "./AdminReview";

const Report = ({ name, date, content, chalenge, gadget, request }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className={`bg-gray-100 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border transition-all duration-300 p-4 ${
        isExpanded ? "max-h-screen" : "max-h-64"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-800">{name}</h2>
      <span className="text-gray-500 text-sm">{date}</span>

      {/* Collapsible Content */}
      <motion.div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? "h-auto" : "h-0"
        }`}
      >
        <div className="mt-4 text-gray-300 overflow-hidden">
          <textarea
            disabled={true}
            className="w-full h-40 p-3 bg-gray-900 border border-gray-700 rounded-md text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none overflow-auto"
            value={content}
          />

          <textarea
            disabled={true}
            className="w-full h-40 p-3 bg-gray-900 border border-gray-700 rounded-md text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none overflow-auto"
            value={chalenge}
          />

          <textarea
            disabled={true}
            className="w-full h-40 p-3 bg-gray-900 border border-gray-700 rounded-md text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none overflow-auto"
            value={gadget}
          />

          <textarea
            disabled={true}
            className="w-full h-40 p-3 bg-gray-900 border border-gray-700 rounded-md text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none overflow-auto"
            value={request}
          />
        </div>
        <AdminReview />
      </motion.div>

      {/* Toggle Button */}
      <button
        className="mt-4 text-sm text-blue-500 hover:underline"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Show Less" : "Read More"}
      </button>
    </motion.div>
  );
};

export default Report;
