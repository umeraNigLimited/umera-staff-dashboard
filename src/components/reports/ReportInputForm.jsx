import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useAuthContext } from "../hooks/useAuthContext";
import { useReportContext } from "../hooks/useReportContext";
import { XIcon } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const ReportInputForm = ({ setCreateReport }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [content, setContent] = useState("");
  const [chalenge, setChallenge] = useState("");
  const [workInProgress, setWorkInProgress] = useState("");
  const [objectives, setObjectives] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [gadget, setGadget] = useState("");
  const [request, setRequest] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const { dispatch } = useReportContext();

  function handleModal() {
    setCreateReport(false);
  }

  const handleNextStep = () => {
    if (currentStep === 1 && !content) {
      setError("Please fill out the Accomplished Task Overview.");
      return;
    }
    if (currentStep === 3 && !workInProgress) {
      setError("Please fill out the Challenges Faced.");
      return;
    }
    setError(null);
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setError(null);
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/report/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          chalenge,
          workInProgress,
          objectives,
          recommendations,
          gadget,
          request,
        }),
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
      setCreateReport(false);
      toast.success("Serious Staff don Submit Report👏🏾", {
        position: "top-center",
        autoClose: 3000,
      });
      setContent("");
      setChallenge("");
      setWorkInProgress("");
      setObjectives("");
      setRecommendations("");
      setGadget("");
      setRequest("");
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
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
              className="w-full h-48 p-3 rounded-md border border-gray-300 text-gray-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="Describe tasks completed"
              required
            />
          </div>
        );
      case 2:
        return (
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
              className="w-full h-48 p-3 rounded-md border border-gray-300 text-gray-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="Describe challenges faced"
              required
            />
          </div>
        );
      case 3:
        return (
          <div>
            <label
              htmlFor="workInProgress"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              Work in Progress
            </label>
            <textarea
              id="workInProgress"
              value={workInProgress}
              onChange={(e) => setWorkInProgress(e.target.value)}
              className="w-full h-48 p-3 rounded-md border border-gray-300 text-gray-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="Describe work in progress"
            />
          </div>
        );
      case 4:
        return (
          <div>
            <label
              htmlFor="objectives"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              Next Week's Objective
            </label>
            <textarea
              id="objectives"
              value={objectives}
              onChange={(e) => setObjectives(e.target.value)}
              className="w-full h-48 p-3 rounded-md border border-gray-300 text-gray-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="Describe objectives for next week"
            />
          </div>
        );
      case 5:
        return (
          <div>
            <label
              htmlFor="objectives"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              Recommendations
            </label>
            <textarea
              id="recommendations"
              value={recommendations}
              onChange={(e) => setRecommendations(e.target.value)}
              className="w-full h-48 p-3 rounded-md border border-gray-300 text-gray-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="Describe objectives for next week"
            />
          </div>
        );
      case 6:
        return (
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
              className="w-full h-48 p-3 rounded-md border border-gray-300 text-gray-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="Describe official gadgets used"
            />
          </div>
        );
      case 7:
        return (
          <div>
            <label
              htmlFor="request"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              Office Request (Optional)
            </label>
            <textarea
              id="request"
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              className="w-full h-48 p-3 rounded-md border border-gray-300 text-gray-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="Describe official your official request"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-6">
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={currentStep === 7 ? handleSubmit : (e) => e.preventDefault()}
        className="bg-white rounded-xl p-6 w-full max-w-lg mx-auto mt-4 space-y-4"
      >
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Submit a Report</h2>
          <XIcon
            size={20}
            className="text-gray-800 cursor-pointer hover:text-red-800"
            onClick={handleModal}
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-100 p-2 rounded">{error}</p>
        )}

        {renderStep()}

        <div className="flex justify-between">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handlePreviousStep}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md font-medium transition hover:bg-gray-400"
            >
              Previous
            </button>
          )}
          {currentStep < 6 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="bg-red-800 text-white py-2 px-4 rounded-md font-medium transition hover:bg-red-700"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className={`bg-red-800 text-white py-2 px-4 rounded-md font-medium transition ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </motion.form>
    </div>
  );
};

export default ReportInputForm;
