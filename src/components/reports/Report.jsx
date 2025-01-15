import React, { useState } from "react";
import { motion } from "framer-motion";
import AdminReview from "./AdminReview";
import { formatDistanceToNow } from "date-fns";
import { useReportContext } from "../hooks/useReportContext";
import { useUpdateReport } from "../hooks/useUpdateReport";
import { useAuthContext } from "../hooks/useAuthContext";

const Report = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [content, setContent] = useState(data.content);
  const [chalenge, setChalenge] = useState(data.chalenge);
  const [gadget, setGadget] = useState(data.gadget);
  const [request, setRequest] = useState(data.request);
  const [editReport, setEditReport] = useState(false);

  const { updateReport, error, loading, setError } = useUpdateReport();
  const { user } = useAuthContext();

  // Check if the current user is the owner of the report
  const isEditable =
    user.staffID === data.staff_id || user?.department == "UMeRA-DPT-AD";
  // const isAdmin = user.department == "UMeRA-DPT-AD";

  // Handle content change
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleChalengeChange = (e) => {
    setChalenge(e.target.value);
  };

  const handleGadgetChange = (e) => {
    setGadget(e.target.value);
  };

  const handleRequestChange = (e) => {
    setRequest(e.target.value);
  };

  // Toggle edit mode
  const toggleEdit = async () => {
    if (editReport) {
      // Save changes when in edit mode
      const updatedReports = {
        content,
        chalenge,
        gadget,
        request,
      };

      await updateReport(data.report_id, updatedReports);
      // Here you would make the API call to update the report
      console.log("Saving updated report:", data.report_id, updatedReports);
    }
    setEditReport(!editReport); // Toggle edit mode
  };

  return (
    <motion.div
      className={`bg-gray-100 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border transition-all duration-300 p-4 ${
        isExpanded ? "max-h-screen" : "max-h-64"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-800">
        {data.other_name}
      </h2>
      <span className="text-gray-500 text-sm">
        {formatDistanceToNow(new Date(data.sent_at), { addSuffix: true })}
      </span>

      {/* Collapsible Content */}
      <motion.div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? "h-auto" : "h-0"
        }`}
      >
        <div className="mt-4 text-gray-300 overflow-hidden">
          <textarea
            disabled={!editReport}
            className="w-full h-80 p-3 bg-gray-900 border border-gray-700 rounded-md text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none overflow-auto"
            value={content}
            onChange={(e) => {
              handleContentChange(e);
              e.target.style.height = "80";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            onClick={() => {
              // setEditReport(true);
              console.log(editReport);
            }}
          />

          <textarea
            disabled={!editReport}
            className="w-full h-auto p-3 bg-gray-900 border border-gray-700 rounded-md text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none overflow-auto"
            value={chalenge}
            onChange={(e) => {
              handleChalengeChange(e);
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          />

          <textarea
            disabled={!editReport}
            className="w-full h-auto p-3 bg-gray-900 border border-gray-700 rounded-md text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none overflow-auto"
            value={gadget}
            onChange={(e) => {
              handleGadgetChange(e);
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          />

          <textarea
            disabled={!editReport}
            className="w-full h-auto p-3 bg-gray-900 border border-gray-700 rounded-md text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none overflow-auto"
            value={request}
            onChange={(e) => {
              handleRequestChange(e);
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          />
        </div>
        {/* Button to toggle editing mode */}
        {isEditable && (
          // Show edit button only for the owner of the report
          <button
            onClick={toggleEdit}
            className="mt-2 p-2 bg-red-800 text-white rounded-md"
          >
            {editReport ? "Save" : "Edit"}
          </button>
        )}
        {/* <AdminReview /> */}
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
