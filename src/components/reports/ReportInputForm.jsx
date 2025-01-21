import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "../hooks/useAuthContext";
import { useReportContext } from "../hooks/useReportContext";

const ReportInputForm = ({ onSubmit }) => {
  const [content, setContent] = useState("");
  const [chalenge, setChallenge] = useState("");
  const [gadget, setGadget] = useState("");
  const [request, setRequest] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const { dispatch } = useReportContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setError(null);

    // Validate required fields
    if (!content || !chalenge) {
      setError("Please fill out all required fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:29199/api/report/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, chalenge, gadget, request }),
      });

      const json = await response.json();

      if (!response.ok) {
        setLoading(false);
        setError(
          json.error || "An error occurred while submitting the report."
        );
        return;
      }

      dispatch({ type: "CREATE_REPORT", payload: json.data });

      // Call parent onSubmit callback if provided
      // if (onSubmit) {
      //   onSubmit(json.data);
      // }

      // Show success notification
      toast.success("Report submitted successfully!", {
        position: "top-center",
        autoClose: 3000,
      });

      // Clear form fields
      setContent("");
      setChallenge("");
      setGadget("");
      setRequest("");
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 w-full max-w-lg mx-auto mt-4 space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-800">Submit a Report</h2>

      {error && (
        <p className="text-sm text-red-600 bg-red-100 p-2 rounded">{error}</p>
      )}

      {/* Task Completed */}
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-800 mb-1"
        >
          Accomplished Task Overview
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-40 p-3 rounded-md bg-gray-100 border border-gray-300 text-gray-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
          placeholder="Describe tasks completed"
          required
        />
      </div>

      {/* Challenges Faced */}
      <div>
        <label
          htmlFor="challenge"
          className="block text-sm font-medium text-gray-800 mb-1"
        >
          Challenges Faced
        </label>
        <textarea
          id="challenge"
          value={chalenge}
          onChange={(e) => setChallenge(e.target.value)}
          className="w-full h-28 p-3 rounded-md bg-gray-100 border border-gray-300 text-gray-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
          placeholder="Describe challenges faced"
          required
        />
      </div>

      {/* Office Gadget */}
      <div>
        <label
          htmlFor="gadget"
          className="block text-sm font-medium text-gray-800 mb-1"
        >
          Office Gadget (Optional)
        </label>
        <textarea
          id="gadget"
          value={gadget}
          onChange={(e) => setGadget(e.target.value)}
          className="w-full h-20 p-3 rounded-md bg-gray-100 border border-gray-300 text-gray-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
          placeholder="Describe official gadgets used"
        />
      </div>

      {/* Official Request */}
      <div>
        <label
          htmlFor="request"
          className="block text-sm font-medium text-gray-800 mb-1"
        >
          Official Request (Optional)
        </label>
        <textarea
          id="request"
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          className="w-full h-20 p-3 rounded-md bg-gray-100 border border-gray-300 text-gray-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
          placeholder="Enter official requests, if any"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full bg-red-800 text-white py-2 px-4 rounded-md font-medium transition ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"
        }`}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Report"}
      </button>
    </form>
  );
};

export default ReportInputForm;
