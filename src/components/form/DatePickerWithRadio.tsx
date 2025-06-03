import React, { useState, useEffect } from "react";
import { MdOutlineDateRange } from "react-icons/md";

interface DatePickerWithRadioProps {
  title: string;
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width: number;
  height: number;
  error?: string;
}

const DatePickerWithRadio: React.FC<DatePickerWithRadioProps> = ({
  title,
  name,
  value,
  handleChange,
  width,
  height,
  error,
}) => {
  const [isDatePicked, setIsDatePicked] = useState(false);
  const [manualSelect, setManualSelect] = useState(false);

  useEffect(() => {
    setIsDatePicked(!!value);
  }, [value]);

  return (
    <div
      style={{ width: `${width}px` }}
      className="relative flex flex-col dark:bg-black dark:text-white"
    >
      <label className="flex items-center text-lg font-medium text-[#000000B2] dark:text-white mb-2 bg-transparent">
        {title}
      </label>

      {/* Date Picker with Radio */}
      <div className="flex flex-row items-center relative mb-4">
        <span
          className={`w-4 h-4 mr-2 flex items-center justify-center border-2 rounded-full ${
            isDatePicked ? "border-[#00C5FF]" : "border-[#A9A5A5] dark:border-white"
          }`}
        >
          {isDatePicked && <span className="w-2 h-2 bg-[#00C5FF] rounded-full" />}
        </span>

        <input
          style={{ height: `${height}px` }}
          type="date"
          name={name}
          value={value}
          placeholder="Select Date*"
          onChange={(e) => {
            handleChange(e);
            setIsDatePicked(!!e.target.value);
            setManualSelect(false); // disable manual radio if date selected
          }}
          className={`w-full dark:[color-scheme:dark] p-2 outline-none border-b-[2px] border-[#A9A5A5] dark:bg-transparent dark:text-white focus:border-[#00C5FF]`}
        />
        <MdOutlineDateRange className="absolute right-[0.65rem] cursor-pointer top-1/2 transform -translate-y-1/2 text-black pointer-events-none" />
      </div>

      {/* Manual Entry Radio Option */}
      <label
        className="flex items-center text-[#5f5e5e] dark:text-white cursor-pointer text-base"
        onClick={() => {
          setManualSelect(true);
          setIsDatePicked(false);
          handleChange({ target: { name, value: "" } } as React.ChangeEvent<HTMLInputElement>);
        }}
      >
        <span
          className={`w-4 h-4 mr-2 flex items-center justify-center border-2 rounded-full ${
            manualSelect ? "border-[#00C5FF]" : "border-[#A9A5A5] dark:border-white"
          }`}
        >
          {manualSelect && <span className="w-2 h-2 bg-[#00C5FF] rounded-full" />}
        </span>
        Write Manually after Print*
      </label>

      {error && !isDatePicked && !manualSelect && (
        <p className="text-red-500 bg-transparent text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default DatePickerWithRadio;
