import React from "react";

export default function AdminReview() {
  return (
    <div className="flex flex-col w-full justify-between">
      <div>
        <h4 className="text-xl font-bold text-gray-100">Admin Review</h4>
        <span className="bg-red-500 text-white px-2 py-1 text-sm rounded-md">
          Pending
        </span>
      </div>
      <div className="mt-4">
        <hr className="border-gray-600" />
        <p className="text-gray-300 mt-2">Comments</p>
      </div>
    </div>
  );
}
