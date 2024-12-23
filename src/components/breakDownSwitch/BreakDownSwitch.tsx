import React, { useState } from "react";


// ToggleSwitch Component with a dynamic title
interface BreakDownSwitchProps {
  title: string;
}

const BreakDownSwitch: React.FC<BreakDownSwitchProps> = ({ title }) => {
  const [isOn, setIsOn] = useState<boolean>(false);

  // Handle toggle state
  const toggleSwitch = () => setIsOn((prev) => !prev);

  return (
    <div className="bg-[#3E3C3C] dark:bg-[#000000] rounded-sm w-[45px] h-[38px] flex flex-col justify-center items-center shadow-lg">
      {/* Static Text */}
      <p className="text-[#858585] text-[6.25px] font-[400]">Break Down</p>
      <p className="text-[#A9A5A5] text-[6.5px] font-[400] ">{title}</p>

      {/* Toggle Button */}
      <button
        onClick={toggleSwitch}
        className={`w-[20px] h-[10px] flex items-center px-[1px] pb-[1px]  mt-[2px] rounded-full transition-all ${
          isOn ? "bg-green-500" : "bg-red-500"
        }`}
      >
        <div
          className={`w-[8px] h-[8px] rounded-full bg-white shadow-md transform transition-transform ${
            isOn ? "translate-x-[9px]" : "translate-x-0"
          }`}
        ></div>
      </button>
    </div>
  );
};


export default BreakDownSwitch;
