import { Pin, PinOff } from "lucide-react";
import React, { useState } from "react";

function PinUnpin() {
  const [pinned, setPinned] = useState(false);

  const handlePinToggle = () => {
    setPinned(!pinned);
    console.log(pinned ? "Unpinned" : "Pinned");
  };

  return (
    <div
      className="absolute right-2 top-2 bg-white shadow-md rounded-md p-3 z-10"
      onClick={handlePinToggle}
    >
      <div className="flex items-center gap-2 cursor-pointer">
        {pinned ? (
          <>
            <PinOff className="w-5 h-5 text-gray-600" />
            <span className="text-gray-800 text-sm font-medium">Unpin</span>
          </>
        ) : (
          <>
            <Pin className="w-5 h-5 text-gray-600" />
            <span className="text-gray-800 text-sm font-medium">Pin</span>
          </>
        )}
      </div>
    </div>
  );
}

export default PinUnpin;
