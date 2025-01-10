import React from "react";

function CelebrationList({ name, date, type }) {
  return (
    <div>
      <div>
        <span className="text-lg font-medium mb-4 text-gray-800">{name}</span>
        <span>{date}</span>
      </div>
      <span>{type}</span>
    </div>
  );
}

export default CelebrationList;
