import React, { useState } from "react";
import Header from "../components/common/Header";

function BroadcastPage() {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure both fields are filled before submitting
    if (!content) {
      alert("Please fill out both the title and content fields.");
      return;
    }

    // Pass the form data to the parent via onSubmit callback
    onSubmit({ content });

    // Clear the form
    setContent("");
  };

  return (
    <div className="flex-1 overflow-auto relative z-10 bg-red-950">
      <Header title="Broadcast" />
      <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8">
        {/* Title Input */}
        {/* <div>
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
        </div> */}

        {/* Content Input */}
        <div className="mb-6">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-300 mb-6"
          >
            Broadcast Message
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-40 p-3 rounded-md bg-gray-900 border border-gray-700 text-gray-100 focus:ring-2 focus:ring-red-500 focus:outline-none"
            placeholder="Broadcast a message to All Staffs"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md font-medium hover:bg-red-700 transition"
        >
          Broadcast a Message
        </button>
      </main>
    </div>
  );
}

export default BroadcastPage;
