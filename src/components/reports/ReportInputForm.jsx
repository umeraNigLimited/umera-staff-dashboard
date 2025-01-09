import React, { useState } from "react";

const ReportInputForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure both fields are filled before submitting
    if (!title || !content) {
      alert("Please fill out both the title and content fields.");
      return;
    }

    // Pass the form data to the parent via onSubmit callback
    onSubmit({ title, content });

    // Clear the form
    setTitle("");
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 w-96 h-auto transition-all duration-300 space-y-4 w-full max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-100">Submit a Report</h2>

      {/* Title Input */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-md bg-gray-900 border border-gray-700 text-gray-100 focus:ring-2 focus:ring-red-500 focus:outline-none"
          placeholder="Enter the report title"
          required
        />
      </div>

      {/* Content Input */}
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-40 p-3 rounded-md bg-gray-900 border border-gray-700 text-gray-100 focus:ring-2 focus:ring-red-500 focus:outline-none"
          placeholder="Enter the detailed content of the report"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-red-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition"
      >
        Submit Report
      </button>
    </form>
  );
};

export default ReportInputForm;
