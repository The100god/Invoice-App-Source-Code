import React, { useEffect, useState } from "react";
import { FiSearch, FiLink } from "react-icons/fi";
import MaterialSearchBar from "./MaterialSearchBar";
import { itemSelectionDataAtom } from "../../variables/electricalInvoiceVariable";
import { useAtom } from "jotai";

interface SearchLinkToggleProps {
  selectedValue: string;
  onSearchChange: (value: string) => void;
  error?: string;
  activeTabIndex: number;
}

const SearchLinkToggle: React.FC<SearchLinkToggleProps> = ({
  selectedValue,
  onSearchChange,
  error,
  activeTabIndex,
}) => {
  const [isLinkMode, setIsLinkMode] = useState(false);
  const [link, setLink] = useState("");
  const [, setItemSelectionData] = useAtom(itemSelectionDataAtom);

  const handleLinkClick = () => {
    if (isLinkMode && link) {
      window.open(link, "_blank");
    } else {
      setIsLinkMode(true);
    }
  };

  useEffect(()=>{
    setItemSelectionData((prev) => {
        const updated = [...prev];
        updated[activeTabIndex] = { ...updated[activeTabIndex], materialLink: link };
        return updated;
      });
  }, [link])

  return (
    <div className="flex flex-col w-[577px]">
      <label className="text-lg font-medium text-[#000000B2] bg-transparent dark:text-white mb-2">
        Search Item*
      </label>
      <div
        className={`flex items-center dark:border-white rounded-lg transition-all duration-300 ease-in-out`}
      >
        {!isLinkMode ? (
          // 🔍 MaterialSearchBar (Default View)
          <div className="w-full">
            <MaterialSearchBar
              selectedValue={selectedValue}
              onChange={onSearchChange}
              error={error}
              activeTabIndex={activeTabIndex}
              width={495}
              height={55}
            />
          </div>
        ) : (
          // 🔗 Direct Link Input Mode
          <div className="flex w-full justify-between">
            <button
              className="p-3 border-2 border-[#A9A5A5] rounded-[10px] flex justify-center items-center h-[55px] w-[71px] text-[#757575] dark:text-white"
              onClick={() => setIsLinkMode(false)}
            >
              <FiSearch size={20} />
            </button>
            <div className="flex items-center w-[495px] h-[55px] relative border-2 border-[#A9A5A5] dark:border-white p-1 rounded-[10px] focus:border-[#00C5FF] ">
              <input
                type="text"
                placeholder="Insert direct item link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-[424px] h-full bg-transparent dark:text-white p-1 text-left outline-none"
              />

              <button
                className="p-2 relative flex justify-center items-center h-[55px] w-[71px] text-[#757575] dark:text-white  group transition-transform duration-300"
                onClick={handleLinkClick}
              >
                <FiLink size={20} />
                {/* Tooltip on Hover */}
                {isLinkMode && link && (
                  <div className="absolute bottom-10 right-0 bg-gray-800 text-white text-xs px-3 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Click to visit link in new browser
                  </div>
                )}
              </button>

            </div>
          </div>
        )}
        {!isLinkMode && <button
          className="p-3 border-2 border-[#A9A5A5] rounded-[10px] flex justify-center items-center h-[55px] w-[71px] text-[#757575] dark:text-white"
          onClick={handleLinkClick}
        >
          <FiLink size={20} />
        </button>}
      </div>
      {error && <p className="text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default SearchLinkToggle;
