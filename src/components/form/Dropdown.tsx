import { linkProductTypeAtom } from "../../variables/electricalInvoiceVariable";
import { useAtom } from "jotai";
import React, { useState, useRef, useEffect } from "react";

interface DropdownProps {
  label: string;
  options: { value: string; label: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
  error?: string;
  width: number;
  height: number;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selectedValue,
  onChange,
  error,
  width,
  height,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // const [, setProductLinkAmount] = useAtom(productLinkAmountAtom)
  // const [, setProductLinkAmount] = useAtom(productLinkAmountAtom)
  const [err, setErr] = useState(false)
  const [linkProductType,] = useAtom(linkProductTypeAtom)
  // const [,setColor] = useAtom(colorAtom);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
    setErr(true)
  };

  

  const selectedLabel = selectedValue || linkProductType ||
  options.find((option) => option.value === selectedValue)?.label ||
  (label === "Commission Type*" ? "$ or %" : label === "Preferred Color*" ? "Choose Color" : "Select an option");
  
  
  


  return (
    <div
      style={{ width: `${width}px` }}
      className="flex relative flex-col items-start dark:bg-black dark:text-white"
      ref={dropdownRef}
    >
      <label className="text-lg font-medium text-[#000000B2] bg-transparent dark:text-white mb-2">{label}</label>
      <button
        type="button"
        onClick={toggleDropdown}
        className={`p-2 border-2 border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] w-full text-left flex justify-between items-center ${
          isOpen ? "border-[#00C5FF]" : "border-[#A9A5A5] dark:border-white"
        }`}
        style={{ height: `${height}px` }}
      >
        <span className="w-full max-h-[23px] overflow-hidden text-ellipsis whitespace-nowrap bg-transparent">{selectedLabel}</span>
        <span className="text-primary bg-transparent dark:text-white text-[35px] flex-shrink-0 ml-2 mb-[25px]">&#x2304;</span>
      </button>
      {isOpen && (
        <div
          style={{ width: `${width}px` }}
          className="absolute p-3 w-full mt-[84px] bg-white dark:bg-black dark:text-white border border-[#A9A5A5] max-h-[334px] rounded-md shadow-lg z-10 h-fit overflow-y-auto"
        >
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`px-4 py-2 mb-1 cursor-pointer rounded-[5px] h-[53px] hover:bg-[#00C5FF] ${
                selectedValue === option.value ? "bg-[#00C5FF] text-white" : ""
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
      {(error && !err )&& <p className="text-red-500 w-full text-wrap mt-1 bg-transparent">{error}</p>}
    </div>
  );
};

export default Dropdown;
