import React from "react";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="flex w-full h-[10px] bg-[#00C5FF29] dark:bg-[#B0EDFF54]">
      <div
        style={{ width: `${progress}%` }}
        className="h-full bg-gradient-to-r from-[#00C5FF] via-[#0793CF] to-[#0793CF] transition-width duration-500 ease-in-out"
      ></div>
    </div>
  );
};

export default ProgressBar;
