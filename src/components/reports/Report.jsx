import React, { useState } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { useAuthContext } from "../hooks/useAuthContext";
import { useUpdateReport } from "../hooks/useUpdateReport";
import { useReportContext } from "../hooks/useReportContext";

const Report = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editReport, setEditReport] = useState(false);
  const [updatedReport, setUpdatedReport] = useState(data);

  const { user } = useAuthContext();
  const { report } = useReportContext();
  const { updateReport, loading, error } = useUpdateReport();

  // Check if the current user is the owner of the report
  const isEditable =
    user.staffID === data.staff_id || user?.department === "UMeRA-DPT-AD";

  // console.log("report", report);

  // Handle field change
  const handleChange = (field, value) => {
    setUpdatedReport((prev) => ({ ...prev, [field]: value }));
  };

  // Auto-resize textarea
  const autoResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  // Toggle edit mode and save changes
  const toggleEdit = async () => {
    if (editReport) {
      try {
        await updateReport(updatedReport.report_id, updatedReport);
        // console.log("Updated report:", updatedReport);
      } catch (err) {
        console.error("Failed to update report:", err);
      }
    }
    setEditReport(!editReport);
  };

  return (
    <motion.div
      className={`bg-gray-100 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border transition-all duration-300 ${
        isExpanded ? "h-auto" : "max-h-64"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-800">
        {updatedReport.other_name}
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
          {[
            "content",
            "chalenge",
            "workinprogress",
            "objectives",
            "recommendations",
            "gadget",
            "request",
          ].map((field) => (
            <textarea
              key={field}
              disabled={!editReport}
              className="w-full h-auto min-h-40 p-3 bg-gray-900 border border-gray-700 rounded-md text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none overflow-auto mb-4"
              value={updatedReport[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              onInput={autoResize}
              placeholder={`Enter ${field}`}
            />
          ))}
        </div>

        {/* Edit/Save Button */}
        {isEditable && (
          <button
            onClick={toggleEdit}
            disabled={loading}
            className={`mt-2 p-2 rounded-md text-white ${
              loading ? "bg-gray-500" : "bg-red-800 hover:bg-red-700"
            }`}
          >
            {editReport ? "Save" : "Edit"}
          </button>
        )}
      </motion.div>

      {/* Toggle Expand/Collapse */}
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
