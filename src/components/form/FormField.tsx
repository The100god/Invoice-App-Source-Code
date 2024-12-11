import React from "react";

interface FormFieldProps {
  title: string;
  name: string;
  type: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  width: number;
  height: number;
}

const FormField = ({
  title,
  name,
  type,
  value,
  handleChange,
  error,
  width,
  height,
}: FormFieldProps) => {
  return (
    <div
      style={{ width: `${width}px`
     }}
      className={`flex flex-col w-[${width}px] dark:bg-black dark:text-white `}
    >
      <label className="text-lg font-medium text-[#000000B2] dark:text-white mb-2 bg-transparent">
        {title}
      </label>
      <input
        style={{ 
          height: `${height}px`,
          // colorScheme:`${type==="data"? "dark":""}`
          
         }}
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className={`dark:[color-scheme:dark] p-2 outline-none border-2 dark:bg-transparent dark:text-white border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] h-[${height}px]`}
      />
      {error && <p className="text-red-500 bg-transparent">{error}</p>}
    </div>
  );
};

export default FormField;
