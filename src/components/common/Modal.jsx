import React, { useState } from "react";
import { CameraIcon, XIcon } from "lucide-react";

const ProfileUploadModal = ({ isOpen, onClose, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    // console.log(selectedFile);
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      onClose();
    } else {
      alert("Please select a file first!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <XIcon size={20} />
        </button>

        <h3 className="text-lg font-semibold flex items-center justify-center text-gray-700 mb-4">
          Upload Profile Picture
        </h3>

        {/* File Input */}
        <div className="flex flex-col items-center">
          <label
            htmlFor="file-upload"
            className="flex items-center justify-center w-32 h-32 border border-gray-300 rounded-full cursor-pointer hover:bg-gray-100"
          >
            {selectedFile ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <CameraIcon size={40} className="text-gray-500" />
            )}
          </label>
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <p className="mt-2 text-sm text-gray-500">
            Click the circle to upload
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex items-center justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-600"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileUploadModal;
