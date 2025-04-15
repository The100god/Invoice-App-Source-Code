// import { itemSelectionDataAtom } from "../../variables/electricalInvoiceVariable";
// import { useAtom } from "jotai";
import React, { useState, useRef, useEffect } from "react";
import { materialOptions } from "../../constants/states";
import { useAtom } from "jotai";
import { itemErrorsAtom } from "../../variables/electricalInvoiceVariable";

interface MaterialSearchBarProps {
  selectedValue: string;
  onChange: (value: string) => void;
  error?: string;
  prevVal?: string;
  width: number;
  height: number;
  activeTabIndex: number;
}

const MaterialSearchBar: React.FC<MaterialSearchBarProps> = ({
  selectedValue,
  onChange,
  prevVal,
  width,
  height,
  activeTabIndex,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(prevVal ? prevVal : "");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [, setItemErrors] = useAtom(itemErrorsAtom);
  //   const [itemSelectionData] = useAtom(itemSelectionDataAtom);
  const [, setErr] = useState(false);

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

  const handleSelect = (value: string) => {
    onChange(value);
    setSearchTerm(value);
    setIsOpen(false);
    setErr(true);
    setItemErrors((prev) => {
      const updated = [...prev];
      updated[activeTabIndex] = {
        ...updated[activeTabIndex],
        selectedItem: "",
      };
      return updated;
    });
  };

  const filteredOptions = materialOptions.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{ width: `${width}px` }}
      className="flex relative flex-col items-start dark:bg-black dark:text-white"
      ref={dropdownRef}
    >
      {/* <label className="text-lg font-medium text-[#000000B2] bg-transparent dark:text-white mb-2">
        Search Material
      </label> */}
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search material..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border-2 bg-transparent dark:text-white border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] text-left"
          style={{ height: `${height}px` }}
          onFocus={() => setIsOpen(true)}
        />
        {isOpen && searchTerm && (
          <div
            style={{ width: `${width}px` }}
            className="absolute p-3 w-full mt-1 bg-white dark:bg-black dark:text-white border border-[#A9A5A5] max-h-[334px] rounded-md shadow-lg z-10 h-fit overflow-y-auto"
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`px-4 py-2 mb-1 cursor-pointer rounded-[5px] h-[53px] hover:bg-[#00C5FF] ${
                    selectedValue === option.value
                      ? "bg-[#00C5FF] text-white"
                      : ""
                  }`}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">No results found</div>
            )}
          </div>
        )}
      </div>
      {/* {error && !err && (
        <p className="text-red-500 w-full text-wrap mt-1 bg-transparent">
          {error}
        </p>
      )} */}
    </div>
  );
};

export default MaterialSearchBar;
