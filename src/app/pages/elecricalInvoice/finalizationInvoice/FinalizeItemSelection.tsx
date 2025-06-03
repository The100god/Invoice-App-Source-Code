/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAtom } from "jotai";
import { itemSelectionDataAtom } from "../../../../variables/electricalInvoiceVariable";
import { activeTabIndexAtom } from "../../../../variables/NavbarVariables";
import { useEffect, useState } from "react";
import {
  extractKeyword,
  fetchImage,
  findMatchingElectricalWord,
  isElectricalImage,
} from "../../../../components/form/FetchImageOnHover";

const FinalizeItemSelection = () => {
  const [itemSelectionData] = useAtom(itemSelectionDataAtom);
  const [activeTabIndex] = useAtom(activeTabIndexAtom);
  const [imagePreview, setImagePreview] = useState("");
  // console.log("isCommission:", isCommission)
  // Function to compute the total amount
  let grandTot: number;

  const computeTotal = (): string => {
    const unitPrice =
      itemSelectionData[activeTabIndex].productLinkAmount === "0"
        ? 10
        : parseInt(itemSelectionData[activeTabIndex].productLinkAmount, 10); // Example unit price per item
    const total = itemSelectionData[activeTabIndex].quantity * unitPrice;
    grandTot = total; // Store total as a number
    return total.toFixed(2); // Return total as a string with 2 decimal places
  };

  const computeGrandTotal = (): number => {
    if (!itemSelectionData[activeTabIndex].isCommission) {
      return 0; // If commission is not applicable, return 0
    }

    // Ensure grandTot and commissionValue are numbers
    const grandTotal = Number(grandTot) || 0;
    const commission =
      Number(itemSelectionData[activeTabIndex].commissionValue) || 0;

    let grandPrice: number;

    if (itemSelectionData[activeTabIndex].commissionType === "$") {
      // Flat commission
      grandPrice = grandTotal + commission;
    } else {
      // Percentage commission
      grandPrice = grandTotal + (grandTotal * commission) / 100;
    }

    return parseFloat(grandPrice.toFixed(2)); // Return grand total rounded to 2 decimal places
  };

  const activeItemData = itemSelectionData[activeTabIndex];
  const discriptionData = `${
    activeItemData?.brand ? activeItemData?.brand + "," : ""
  }${
    activeItemData?.style ? activeItemData?.style + "," : ""
  }${activeItemData?.use ? activeItemData?.use + "," : ""}${
    activeItemData?.version ? activeItemData?.version + "," : ""
  }${activeItemData?.neutral ? activeItemData?.neutral + "," : ""}${
    activeItemData?.pole ? activeItemData?.pole + "," : ""
  }${activeItemData?.amp ? activeItemData?.amp + " amp" : ""}`;

  useEffect(() => {
    const fatchMaterialImage = async () => {
      const matchedWord = findMatchingElectricalWord(
        activeItemData.selectedItem
      );
      const query = matchedWord
        ? "electrical" + " " + matchedWord
        : `electrical ${activeItemData.selectedItem}`;

      try {
        let results = await fetchImage(query);
        let validImage = results.find(isElectricalImage) || results[0];

        // 🔁 If not found, try again with extracted keyword
        if (!validImage) {
          const keyword = extractKeyword(activeItemData.selectedItem);
          const fallbackQuery = `electrical ${keyword} `;
          results = await fetchImage(fallbackQuery);
          validImage = results.find(isElectricalImage);
        }

        if (validImage) {
          setImagePreview(validImage.urls.small);
        } else {
          setImagePreview(""); // or set a placeholder
        }
      } catch (err) {
        console.error("Error fetching image:", err);
        setImagePreview("");
      }
    };

    fatchMaterialImage();
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-y-4 items-center justify-center bg-transparent">
      <div className="flex flex-row-reverse justify-between w-full gap-x-8 bg-transparent">
        {/* Other form fields such as quantity, color, etc. remain the same */}
        <div className="flex flex-col justify-between items-center w-full  gap-y-8 bg-transparent">
          {/* Bar 1: Dropdown for item selection */}

          <div className="flex justify-start items-center dark:[color-scheme:dark] w-full p-2 outline-none border-2 dark:bg-transparent dark:text-white border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] h-[55px]">
            {discriptionData}
          </div>

          <div className="flex flex-row justify-start items-start w-full h-fit bg-transparent">
            <div className="flex flex-col flex-1 gap-y-4 bg-transparent">
              {/* Quantity section */}
              <div
                className={`flex flex-row ${
                  activeItemData.selectedItem === "Breaker" ? "" : "flex-wrap"
                } items-start gap-2 w-full bg-transparent`}
              >
                {/* Bar 4: Quantity input */}
                <div
                  className={`flex flex-col items-start w-[105px] bg-transparent`}
                >
                  <label className="text-lg font-medium text-[#000000B2] dark:text-white bg-transparent mb-2">
                    Quantity*
                  </label>
                  <div className=" flex justify-start items-center p-2 outline-none border-2 border-[#A9A5A5] h-[55px] rounded-[10px] focus:border-[#00C5FF] w-full bg-transparent">
                    {activeItemData.quantity}
                  </div>
                </div>

                {/* Bar 5: Preferred color */}
                {activeItemData?.selectedItem !== "Breaker" && (
                  <div
                    className={`flex flex-col w-[155px] dark:bg-black dark:text-white `}
                  >
                    <div className="text-lg font-medium text-[#000000B2] dark:text-white mb-2 bg-transparent">
                      Preferred Color*
                    </div>
                    <div
                      className={`flex justify-start items-center dark:[color-scheme:dark] p-2 outline-none border-2 dark:bg-transparent dark:text-white border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] h-[55px]`}
                    >
                      {activeItemData.color}
                    </div>
                  </div>
                )}

                <div
                  className={`flex flex-col items-start ${
                    activeItemData.selectedItem !== "Breaker"
                      ? "w-[145px]"
                      : "w-[295px]"
                  } bg-transparent`}
                >
                  <label className="text-lg font-medium text-[#000000B2] dark:text-white bg-transparent mb-2">
                    Total Amount*
                  </label>
                  <div className="p-2 border-2 border-[#A9A5A5] rounded-[10px] w-full h-[55px] focus:border-[#00C5FF] bg-[#D9D9D980] text-lg ">
                    ${computeTotal()}
                  </div>
                </div>
              </div>

              {/* Commission Type */}

              {activeItemData.isCommission && (
                <div className="flex flex-row justify-start items-start gap-2 w-full bg-transparent">
                  {/* Bar 7: Commission Selection */}
                  <div
                    className={`flex flex-col w-[180px] dark:bg-black dark:text-white `}
                  >
                    <div className="text-lg font-medium text-[#000000B2] dark:text-white mb-2 bg-transparent">
                      Commission Type*
                    </div>
                    <div
                      className={`flex justify-start items-center dark:[color-scheme:dark] p-2 outline-none border-2 dark:bg-transparent dark:text-white border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] h-[55px]`}
                    >
                      {activeItemData.commissionType}
                    </div>
                  </div>

                  {/* Bar 4: commission value input */}
                  <div className="flex flex-col items-start w-[85px] bg-transparent mt-[37px]">
                    <div className="flex justify-start items-center p-2 outline-none border-2 border-[#A9A5A5] h-[55px] bg-transparent rounded-[10px] focus:border-[#00C5FF] w-full">
                      {activeItemData.commissionValue}
                    </div>
                  </div>
                </div>
              )}
              <div className="flex flex-col items-start w-[164px] bg-transparent">
                <label className="text-lg font-medium text-[#000000B2] dark:text-white bg-transparent mb-2">
                  Grand Total*
                </label>
                <div className="p-2 border-2 border-[#A9A5A5] rounded-[10px] w-full h-[55px] focus:border-[#00C5FF] bg-[#D9D9D980] text-lg ">
                  ${computeGrandTotal()}
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-start w-fit h-fit p-4 bg-gray-300 ">
              <div className="flex flex-col justify-center items-center w-fit bg-transparent p">
                <img
                  src={
                    imagePreview
                      ? imagePreview
                      : "https://upload.wikimedia.org/wikipedia/commons/f/fd/Jtecul.jpg"
                  }
                  alt="breakers"
                  className=" rounded-lg w-[200px] h-[200px]"
                />
              </div>
              <div className="flex justify-center items-center w-full h-fit bg-transparent p-2 text-black font-medium text-lg">
                {activeItemData.selectedItem}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalizeItemSelection;
