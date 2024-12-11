import React, { useState } from "react";

interface RadioGroupProps {
  name: string;
  options: { value: string; label: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
  label: string;
  error?: string;
  width: number;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  selectedValue,
  onChange,
  label,
  error,
  width
}) => {
  const [err, setErr] = useState(false)
  return (
    <div className={`flex flex-col items-start w-[${width}px] dark:bg-black dark:text-white`}>
      <label className="text-lg font-medium text-[#000000B2] dark:text-white mb-2 bg-transparent">{label}</label>
      <div className="flex space-x-4">
        {options.map((option) => (
          <label key={option.value} className="flex items-center font-[14px] bg-transparent">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => {
                onChange(option.value)
                setErr(true)
              }}
              className="mr-2 text-[#00C5FF66] checked:bg-[#00C5FF66]"
              hidden
            />
            <span
        className={`w-4 h-4 mr-2 flex items-center justify-center border-2 rounded-full bg-transparent ${
          selectedValue === option.value ? "border-[#00C5FF]" : "border-[#A9A5A5] dark:border-white"
        }`}
      >
        {selectedValue === option.value && (
          <span className="w-2 h-2 bg-[#00C5FF] rounded-full"></span>
        )}
      </span>
            {option.label}
          </label>
        ))}
      </div>
      {(error && !err) && <p className="text-red-500 bg-transparent">{error}</p>}
    </div>
  );
};

export default RadioGroup;
