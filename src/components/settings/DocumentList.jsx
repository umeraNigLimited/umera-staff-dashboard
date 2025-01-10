import React from "react";

function DocumentList({ type, documentUrl }) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-gray-300">{type}</span>
      {!documentUrl == "" || null ? (
        <a href={documentUrl}>Download</a>
      ) : (
        <button
          className="px-3 py-1 rounded bg-green-600 hover:bg-green-700"
          onClick={() => {}}
        >
          Upload
        </button>
      )}
    </div>
  );
}

export default DocumentList;
