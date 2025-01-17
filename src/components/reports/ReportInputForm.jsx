import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";

const ReportInputForm = ({ onSubmit }) => {
  const [content, setContent] = useState("");
  const [chalenge, setChalenge] = useState("");
  const [gadget, setGadget] = useState("");
  const [request, setRequest] = useState("");
  const [date, setDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure both fields are filled before submitting
    if (!content || !chalenge) {
      alert("Please fill out both the title and content fields.");
      return;
    }

    // Pass the form data to the parent via onSubmit callback
    onSubmit({ content, chalenge, gadget, request });
    toast("Oshey! Serious UMéRA Staff 📥", {
      position: "top-center",
      autoClose: 5000, // Closes after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    // Clear the form
    setContent("");
    setChalenge("");
    setGadget("");
    setRequest("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 w-96 h-auto transition-all duration-300 space-y-4 w-full max-w-lg mx-auto mt-4"
    >
      <h2 className="text-2xl font-bold text-gray-800">Submit a Report</h2>

      {/* Title Input */}
      {/* <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-800 mb-1"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-md bg-gray-100 border border-gray-300 text-gray-100 focus:ring-2 focus:ring-red-500 focus:outline-none"
          placeholder="Enter the report title"
          required
        />
      </div> */}

      {/*  Task Completed */}
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-800 mb-1"
        >
          Acomplished Task Overview
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-40 p-3 rounded-md bg-gray-100 border border-gray-300 text-gray-800 focus:ring-2 focus:ring-red-500 focus:outline-none text-gray-800"
          placeholder="Enter the detailed and comprehensive content of the report"
          required
        />
      </div>

      {/*  Chalenges Faced */}
      <div>
        <label
          htmlFor="chalenge"
          className="block text-sm font-medium text-gray-800 mb-1"
        >
          Chalenges Faced
        </label>
        <textarea
          id="chalenge"
          value={chalenge}
          onChange={(e) => setChalenge(e.target.value)}
          className="w-full h-28 p-3 rounded-md bg-gray-100 border border-gray-300 text-gray-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
          placeholder="Enter the detailed content of the report"
          required
        />
      </div>

      {/*  Office Gadget */}
      <div>
        <label
          htmlFor="gadget"
          className="block text-sm font-medium text-gray-800 mb-1"
        >
          Official Gadget
        </label>
        <textarea
          id="gadget"
          value={gadget}
          onChange={(e) => setGadget(e.target.value)}
          className="w-full h-20 p-3 rounded-md bg-gray-100 border border-gray-300 text-gray-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
          placeholder="Enter the detailed content of the report"
        />
      </div>

      {/*  Official Request */}
      <div>
        <label
          htmlFor="request"
          className="block text-sm font-medium text-gray-800 mb-1"
        >
          Official Request
        </label>
        <textarea
          id="request"
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          className="w-full h-20 p-3 rounded-md bg-gray-100 border border-gray-300 text-gray-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
          placeholder="Enter the detailed content of the report"
        />
      </div>

      {/* <DatePicker selected={{}} onChange={{}} /> */}

      {/* Content Input */}
      {/* <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-800 mb-1"
        >
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-40 p-3 rounded-md bg-gray-100 border border-gray-300 text-gray-100 focus:ring-2 focus:ring-red-500 focus:outline-none"
          placeholder="Enter the detailed content of the report"
          required
        />
      </div> */}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-red-800 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition"
      >
        Submit Report
      </button>
    </form>
  );
};

export default ReportInputForm;
