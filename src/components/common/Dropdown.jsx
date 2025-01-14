import { useState } from "react";

export function CustomDropdown({ options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selectedValue) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full max-w-xs px-4 py-2 text-left bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Show {value}
        <span className="float-right">&darr;</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="absolute z-10 w-full max-w-xs mt-2 bg-white border rounded-lg shadow-lg">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
            >
              Show {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
