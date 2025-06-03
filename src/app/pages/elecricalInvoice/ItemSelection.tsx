/* eslint-disable @typescript-eslint/no-explicit-any */
// import RadioGroup from "../../../components/form/RadioGroup"; // Adjust the path as needed
import Dropdown from "../../../components/form/Dropdown"; // New Dropdown Component
import { useAtom } from "jotai";
import {
  itemErrorsAtom,
  itemSelectionDataAtom,
  materialSectionStepsAtom,
} from "../../../variables/electricalInvoiceVariable";
import ProductDetailsFetcher from "../../../components/form/FatchDetailsByLink";
import { activeTabIndexAtom } from "../../../variables/NavbarVariables";
import SearchLinkToggle from "../../../components/form/SearchLinkToggle";
import NotesInput from "../../../components/form/NotesInput";
import NavigateMaterialSectionStepsBtn from "../../../components/navigation/NavigateMaterialSectionSteps";

const ItemSelectionScreen = () => {
  const [itemSelectionData, setItemSelectionData] = useAtom(
    itemSelectionDataAtom
  );
  const [activeTabIndex] = useAtom(activeTabIndexAtom);
  const [itemErrors, setItemErrors] = useAtom(itemErrorsAtom);
  const [materialSectionSteps, setMaterialSectionSteps] = useAtom(materialSectionStepsAtom)
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
  const activeErrors = itemErrors[activeTabIndex];

  const updateItemData = (key: keyof typeof activeItemData, value: any) => {
    setItemSelectionData((prev) => {
      const updated = [...prev];
      updated[activeTabIndex] = { ...updated[activeTabIndex], [key]: value };
      return updated;
    });
  };

  const handleQuantityChange = (value: string) => {
    const quantity = parseInt(value) || 1;
    updateItemData("quantity", quantity);
    setItemErrors((prev) => ({
      ...prev,
      quantity: "",
    }));
  };
  const handleCommissionvalueChange = (value: string) => {
    updateItemData("commissionValue", value);
    setItemErrors((prev) => ({
      ...prev,
      commissionValue: "",
    }));
  };


  const handleMaterialNextFun = ()=>{
    const activeMaterialStep = materialSectionSteps[activeTabIndex].materialSectionStepsCount
    if (activeMaterialStep < 3) {
      let stepValue = activeMaterialStep; // Start with the current step count
  
      // Check conditions to increment the step value
      if (stepValue === 0 && (activeItemData.selectedItem !== "" || activeItemData.materialLink !== "")) {
        stepValue = 1; // Move to step 1 if first condition is met
      }
      if (stepValue === 1 && ((activeItemData.brand !== "" && activeItemData.style !== "") || 
                              (activeItemData.brand !== "" && activeItemData.amp !== ""))) {
        stepValue = 2; // Move to step 2 if second condition is met
      }
      if (stepValue === 2 && (activeItemData.selectedItem === "Breaker" || (activeItemData.color !== "" && activeItemData.quantity > 0))) {
        stepValue = 3; // Move to step 3 if third condition is met
      }
      setMaterialSectionSteps((prev)=>{
        const updated = [...prev]
        updated[activeTabIndex] = {
          ...updated[activeTabIndex],
          materialSectionStepsCount: stepValue-activeMaterialStep>1?activeMaterialStep+1: stepValue, // Increment the step count
        };
  
        return updated;
      })
    }
  }
  const handleMaterialPrevFun = ()=>{
    //
    const activeMaterialStep = materialSectionSteps[activeTabIndex].materialSectionStepsCount
    if(activeMaterialStep>0){
      setMaterialSectionSteps((prev)=>{
        const updated = [...prev]
        updated[activeTabIndex] = {
          ...updated[activeTabIndex],
          materialSectionStepsCount: activeMaterialStep - 1, // Increment the step count
        };
  
        return updated;
      })
    }
  }

  // console.log("itemSelectionData", itemSelectionData);
  // console.log( "isCommission",activeItemData.isCommission)

  return (
    <div
      id="itemSelectionTour"
      className="w-full h-full px-4 pb-4 flex flex-col gap-y-4 items-center justify-center bg-transparent"
    >
      <div className="flex flex-row-reverse justify-between w-full gap-x-8 bg-transparent">
        {/* Other form fields such as quantity, color, etc. remain the same */}
        <div className="flex flex-col justify-between items-center w-full  gap-y-8 bg-transparent">
          {/* Bar 1: Dropdown for item selection */}

          {materialSectionSteps[activeTabIndex].materialSectionStepsCount === 0 && <>
            <SearchLinkToggle
            selectedValue={activeItemData.selectedItem}
            onSearchChange={(value) => updateItemData("selectedItem", value)}
            prevVal={activeItemData.selectedItem}
            error={activeErrors.selectedItem}
            activeTabIndex={activeTabIndex}
            />

          <NotesInput
            value={activeItemData.note}
            onChange={(value) => updateItemData("note", value)}
            />
            </>
          }
          {materialSectionSteps[activeTabIndex].materialSectionStepsCount === 1 && <div className="flex flex-row justify-center items-center w-full gap-y-4 bg-transparent">
            {activeItemData.selectedItem === "Outlet" && (
              <div className=" flex flex-row justify-between items-center w-[577px] bg-transparent">
                {/* Bar 2: Brand selection using RadioGroup */}
                <Dropdown
                  label="Select Brand*"
                  options={[
                    { value: "Leviton", label: "Leviton" },
                    { value: "LeGrand", label: "LeGrand" },
                    { value: "Lutron", label: "Lutron" },
                  ]}
                  selectedValue={activeItemData.brand}
                  onChange={(value) => updateItemData("brand", value)}
                  error={activeErrors.brand}
                  activeTabIndex={activeTabIndex}
                  width={259}
                  height={55}
                />

                {/* Bar 3: Style selection using RadioGroup */}
                {activeItemData.brand && (
                  <Dropdown
                    label="Select Style*"
                    options={[
                      { value: "Decora", label: "Decora" },
                      { value: "Duplex", label: "Duplex" },
                    ]}
                    selectedValue={activeItemData.style}
                    onChange={(value) => updateItemData("style", value)}
                    error={activeErrors.style}
                    activeTabIndex={activeTabIndex}
                    width={158}
                    height={55}
                  />
                )}
              </div>
            )}

            {[
              // "15amp Breaker",
              // "20amp Breaker",
              // "30amp Breaker",
              // "40amp Breaker",
              // "50amp Breaker",
              "Breaker",
            ].includes(activeItemData.selectedItem) && (
              <div className=" flex flex-row flex-wrap justify-between items-start gap-4 w-[577px] bg-transparent">
                {/* Bar 2: Brand selection for switches using RadioGroup */}
                <Dropdown
                  label="Select Brand*"
                  options={[
                    { value: "Siemens", label: "Siemens" },
                    { value: "Eaton", label: "Eaton" },
                    { value: "General Electric", label: "General Electric" },
                    { value: "Square D", label: "Square D" },
                  ]}
                  selectedValue={activeItemData.brand}
                  onChange={(value) => updateItemData("brand", value)}
                  error={activeErrors.brand}
                  activeTabIndex={activeTabIndex}
                  width={255}
                  height={55}
                />
                <Dropdown
                  label="Select Use*"
                  options={[
                    { value: "Standard", label: "Standard" },
                    { value: "Main Breaker", label: "Main Breaker" },
                    { value: "AFCI", label: "AFCI" },
                    { value: "GFCI", label: "GFCI" },
                    { value: "AFCI/GFCI", label: "AFCI/GFCI" },
                  ]}
                  selectedValue={activeItemData?.use}
                  onChange={(value) => updateItemData("use", value)}
                  error={activeErrors?.use}
                  activeTabIndex={activeTabIndex}
                  width={255}
                  height={55}
                />
                {(
  activeItemData?.brand !== "Siemens" ||
  activeItemData?.use !== "Main Breaker"
)  && <Dropdown
                  label="Select Version*"
                  options={[
                    { value: "Homeline", label: "Homeline" },
                    { value: "QO", label: "QO" },
                    { value: "x", label: "x" },
                  ]}
                  selectedValue={activeItemData?.version}
                  onChange={(value) => updateItemData("version", value)}
                  error={activeErrors?.version}
                  activeTabIndex={activeTabIndex}
                  width={255}
                  height={55}
                />}
                {/* {activeItemData.brand && <div className=" flex flex-row justify-between items-center w-full bg-transparent"> */}
                <Dropdown
                  label="Select Pole*"
                  options={[
                    { value: "Single Pole", label: "Single Pole" },
                    { value: "2-Pole", label: "2-Pole" },
                    { value: "3-Pole", label: "3-Pole" },
                  ]}
                  selectedValue={activeItemData.pole}
                  onChange={(value) => updateItemData("pole", value)}
                  error={activeErrors.style}
                  activeTabIndex={activeTabIndex}
                  width={255}
                  height={55}
                />
                <Dropdown
                  label="Select Neutral*"
                  options={
                    activeItemData?.use === "Main Breaker"?[
                    { value: "Snap-On", label: "Snap-On" },
                    { value: "x", label: "x" },
                  ]:
                    [
                    { value: "Snap-On", label: "Snap-On" },
                    { value: "Pig-Tail", label: "Pig-Tail" },
                    { value: "x", label: "x" },
                  ]
                }
                  selectedValue={activeItemData?.neutral}
                  onChange={(value) => updateItemData("neutral", value)}
                  error={activeErrors?.neutral}
                  activeTabIndex={activeTabIndex}
                  width={255}
                  height={55}
                />
                <Dropdown
                  label="Select Type*"
                  options={[
                    { value: "Single", label: "Single" },
                    { value: "Twin", label: "Twin" },
                    { value: "Threeplex", label: "Threeplex" },
                    { value: "Quad", label: "Quad" },
                  ]}
                  selectedValue={activeItemData?.type}
                  onChange={(value) => updateItemData("type", value)}
                  error={activeErrors?.type}
                  activeTabIndex={activeTabIndex}
                  width={255}
                  height={55}
                />
                
                  <Dropdown
                    label="Select Amps*"
                    options={[
                      { value: "x", label: "x" },
                      { value: "10", label: "10" },
                      { value: "15", label: "15" },
                      { value: "20", label: "20" },
                      { value: "25", label: "25" },
                      { value: "30", label: "30" },
                      { value: "35", label: "35" },
                      { value: "40", label: "40" },
                      { value: "45", label: "45" },
                      { value: "50", label: "50" },
                      { value: "60", label: "60" },
                      { value: "70", label: "70" },
                      { value: "80", label: "80" },
                      { value: "90", label: "90" },
                      { value: "100", label: "100" },
                      { value: "125", label: "125" },
                      { value: "15/15", label: "15/15" },
                      { value: "15/20", label: "15/20" },
                      {
                        value: "(15/20 - Homeline Only)",
                        label: "(15/20 - Homeline Only)",
                      },
                      { value: "20/20", label: "20/20" },
                      { value: "20/30", label: "20/30" },
                      { value: "30/30", label: "30/30" },
                      { value: "15/(20/20)/15", label: "15/(20/20)/15" },
                      { value: "15/(25/25)/15", label: "15/(25/25)/15" },
                      { value: "15/(30/30)/15", label: "15/(30/30)/15" },
                      { value: "15/(40/40)/15", label: "15/(40/40)/15" },
                      { value: "15/(50/50)/15", label: "15/(50/50)/15" },
                      { value: "20/(20/20)/20", label: "20/(20/20)/20" },
                      { value: "20/(25/25)/20", label: "20/(25/25)/20" },
                      { value: "20/(30/30)/20", label: "20/(30/30)/20" },
                      { value: "20/(40/40)/20", label: "20/(40/40)/20" },
                      { value: "20/(50/50)/20", label: "20/(50/50)/20" },
                      { value: "30/(30/30)/30", label: "30/(30/30)/30" },
                      { value: "20/20/20/20", label: "20/20/20/20" },
                      { value: "20/30/30/20", label: "20/30/30/20" },
                      { value: "30/20/20/30", label: "30/20/20/30" },
                      { value: "30/30/30/30", label: "30/30/30/30" },
                      { value: "40/20/20/40", label: "40/20/20/40" },
                      { value: "40/30/30/40", label: "40/30/30/40" },
                      { value: "40/40/40/40", label: "40/40/40/40" },
                    ]}
                    selectedValue={activeItemData.amp}
                    onChange={(value) => updateItemData("amp", value)}
                    error={activeErrors.style}
                    activeTabIndex={activeTabIndex}
                    width={255}
                    height={55}
                  />
              
                {/* </div>} */}
              </div>
            )}

            {["switches", "three-way-switches", "four-way-switches"].includes(
              activeItemData.selectedItem.toLowerCase()
            ) && (
              <div className=" flex flex-row justify-between items-center w-[577px] bg-transparent">
                {/* Bar 2: Brand selection for switches using RadioGroup */}
                <Dropdown
                  label="Select Brand*"
                  options={[
                    { value: "Leviton", label: "Leviton" },
                    { value: "LeGrand", label: "LeGrand" },
                    { value: "Lutron", label: "Lutron" },
                  ]}
                  selectedValue={activeItemData.brand}
                  onChange={(value) => updateItemData("brand", value)}
                  error={activeErrors.brand}
                  activeTabIndex={activeTabIndex}
                  width={259}
                  height={55}
                />

                {/* Bar 3: Style selection for switches using RadioGroup */}
                {activeItemData.brand && (
                  <Dropdown
                    label="Select Style*"
                    options={[
                      { value: "Toggle", label: "Toggle" },
                      { value: "Rocker", label: "Rocker" },
                    ]}
                    selectedValue={activeItemData.style}
                    onChange={(value) => updateItemData("style", value)}
                    error={activeErrors.style}
                    activeTabIndex={activeTabIndex}
                    width={158}
                    height={55}
                  />
                )}
              </div>
            )}
          </div>}

          {/* Quantity section */}

          {materialSectionSteps[activeTabIndex].materialSectionStepsCount === 2 && (
            <>
              <div className="flex flex-row justify-between items-start gap-2 w-[577px] bg-transparent">
                {/* Bar 4: Quantity input */}
                <div className={`flex flex-col items-start ${activeItemData.selectedItem!=="Breaker"?"w-[145px]":"w-[295px]"} bg-transparent`}>
                  <label className="text-lg font-medium text-[#000000B2] dark:text-white bg-transparent mb-2">
                    Quantity*
                  </label>
                  <input
                    type="number"
                    value={activeItemData.quantity}
                    min="1"
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    className="p-2 outline-none border-2 border-[#A9A5A5] h-[55px] rounded-[10px] focus:border-[#00C5FF] w-full bg-transparent"
                  />
                  {activeErrors.quantity && (
                    <p className="text-red-500 bg-transparent">
                      {activeErrors.quantity}
                    </p>
                  )}
                </div>

                {/* Bar 5: Preferred color */}
                {activeItemData.selectedItem!=="Breaker" && <Dropdown
                  label="Preferred Color*"
                  options={[
                    { value: "White", label: "White" },
                    { value: "Black", label: "Black" },
                  ]}
                  selectedValue={activeItemData.color}
                  onChange={(value) => updateItemData("color", value)}
                  error={activeErrors.color}
                  activeTabIndex={activeTabIndex}
                  width={205}
                  height={55}
                />}

                <div className={`flex flex-col items-start ${activeItemData.selectedItem!=="Breaker"?"w-[145px]":"w-[295px]"} bg-transparent`}>
                  <label className="text-lg font-medium text-[#000000B2] dark:text-white bg-transparent mb-2">
                    Total Amount*
                  </label>
                  <div className="p-2 border-2 border-[#A9A5A5] rounded-[10px] w-full h-[55px] focus:border-[#00C5FF] bg-[#D9D9D980] text-lg ">
                    ${computeTotal()}
                  </div>
                </div>
              </div>

              <div className="flex flex-row justify-between items-start gap-2 w-[577px] bg-transparent">
                <ProductDetailsFetcher activeTabIndex={activeTabIndex} />
              </div>
            </>
          )}

          {/* Commission Type */}

          {materialSectionSteps[activeTabIndex].materialSectionStepsCount === 3 &&  (
            <>
              <div className="flex flex-row justify-between items-start bg-transparent gap-2 w-[577px]">
                <label htmlFor="commission" className="flex gap-2">
                  <input
                    type="checkbox"
                    name="commission"
                    className="text-[18px]"
                    onChange={() => {
                      updateItemData(
                        "isCommission",
                        !activeItemData.isCommission
                      );
                    }}
                  />
                  Comission*
                </label>
              </div>

              <div className="flex flex-row justify-between items-start gap-2 w-[577px] bg-transparent">
                {/* Bar 7: Commission Selection */}
                <Dropdown
                  label="Commission Type*"
                  options={[
                    { value: "%", label: "%" },
                    { value: "$", label: "$" },
                  ]}
                  selectedValue={activeItemData.commissionType}
                  onChange={(value) => updateItemData("commissionType", value)}
                  error={activeErrors.commissionType}
                  activeTabIndex={activeTabIndex}
                  // width={commissionType ? 150 : 205}
                  width={180}
                  height={55}
                />

                {/* Bar 4: commission value input */}
                <div className="flex flex-col items-start w-[145px] bg-transparent mt-[37px]">
                  {/* <label className="text-primary mb-1 bg-transparent">Quantity*</label> */}
                  <input
                    type="number"
                    value={activeItemData.commissionValue}
                    min="1"
                    onChange={(e) =>
                      handleCommissionvalueChange(e.target.value)
                    }
                    disabled={!activeItemData.isCommission}
                    className="p-2 outline-none border-2 border-[#A9A5A5] h-[55px] bg-transparent rounded-[10px] focus:border-[#00C5FF] w-full"
                  />
                  {activeErrors.commissionValue && (
                    <p className="text-red-500 bg-transparent">
                      {activeErrors.commissionValue}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-start w-[164px] bg-transparent">
                  <label className="text-lg font-medium text-[#000000B2] dark:text-white bg-transparent mb-2">
                    Grand Total*
                  </label>
                  <div className="p-2 border-2 border-[#A9A5A5] rounded-[10px] w-full h-[55px] focus:border-[#00C5FF] bg-[#D9D9D980] text-lg ">
                    ${computeGrandTotal()}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

      </div>
        <div className=" flex justify-center items-center mt-5">
        <NavigateMaterialSectionStepsBtn 
         activeSteps = {materialSectionSteps[activeTabIndex]
        .materialSectionStepsCount}
        handleBack={handleMaterialPrevFun}
        handleNext={handleMaterialNextFun}
      />
        </div>
    </div>
  );
};

export default ItemSelectionScreen;
