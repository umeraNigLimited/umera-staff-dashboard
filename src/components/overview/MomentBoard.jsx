import React from "react";

function MomentBoard({ heading, Icon, color }) {
  return (
    <div>
      <span className="flex items-center text-sm font-medium text-gray-400">
        <h2 className="text-lg font-medium mb-4 text-gray-100">{heading}</h2>
        <Icon size={20} className="mr-2" style={{ color }} />
      </span>

      <div></div>
    </div>
  );
}

export default MomentBoard;
