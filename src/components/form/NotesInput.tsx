import React from "react";
import { TfiHelp } from "react-icons/tfi";

interface NotesInputProps {
  value: string;
  onChange: (value: string) => void;
}

const NotesInput: React.FC<NotesInputProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col w-[577px]">
      {/* Label */}
      <label className="text-lg font-medium text-[#000000B2] bg-transparent dark:text-white mb-2">
        Item Notes <span className="font-normal">(If you want to remember later)*</span>
      </label>

      {/* Input Field */}
      <div className="flex items-center border border-[#A9A5A5] dark:border-white rounded-lg w-full mt-2">
        <input
          type="text"
          placeholder="e.g. Use only for outdoor installations"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 outline-none bg-transparent italic"
        />

        {/* Tooltip Icon */}
        <div className="relative group">
          <TfiHelp className="mr-3 text-gray-500 dark:text-white cursor-pointer" size={20} />

          {/* Tooltip */}
          <div className="absolute bottom-10 right-0 bg-gray-800 text-white text-xs px-3 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Add notes to remember important details
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesInput;
