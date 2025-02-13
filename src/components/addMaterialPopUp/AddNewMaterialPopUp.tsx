import { useAtom } from "jotai";
import Dropdown from "../form/Dropdown";
import ProductDetailsFetcher from "../form/FatchDetailsByLink";
import {
  newMaterialIndexAtom,
  newMaterialVariableAtom,
  newMaterialVariableErrorAtom,
  openAddNewMaterialAtom,
} from "../../variables/electricalInvoiceVariable";
import { activeTabIndexAtom } from "../../variables/NavbarVariables";
import { IoClose } from "react-icons/io5";
import NavigationSaveCancel from "../navigation/NavigationSaveCancel";
import { addNewMaterialValidate } from "../formValidation/electricalFormValidatin/AddNewMeterialValidation";
import { toast } from "react-toastify";
import SearchLinkToggle from "../form/SearchLinkToggle";
import NotesInput from "../form/NotesInput";

const AddNewMaterialPopUp = () => {
  const [newMaterial, setNewMaterial] = useAtom(newMaterialVariableAtom);
  const [newMaterialError, setNewMaterialError] = useAtom(
    newMaterialVariableErrorAtom
  );
  const [newMaterialIndex, setNewMaterialIndex] = useAtom(newMaterialIndexAtom);
  const [activeTabIndex] = useAtom(activeTabIndexAtom);
  const activeNewMaterialIndex =
    newMaterialIndex[activeTabIndex].activeNewMaterialIndex;
  const activeNewMaterialData =
    newMaterial[activeTabIndex][activeNewMaterialIndex];
  const activeNewMaterialError =
    newMaterialError[activeTabIndex][activeNewMaterialIndex];

  const [, setOpenAddNewMaterial] = useAtom(openAddNewMaterialAtom);

  let grandTot: number;

  const computeTotal = (): string => {
    const unitPrice =
      activeNewMaterialData.productLinkAmount === "0"
        ? 10
        : parseInt(activeNewMaterialData.productLinkAmount, 10); // Example unit price per item
    const total = activeNewMaterialData.quantity * unitPrice;
    grandTot = total; // Store total as a number
    return total.toFixed(2); // Return total as a string with 2 decimal places
  };

  const computeGrandTotal = (): number => {
    if (!activeNewMaterialData.isCommission) {
      return 0; // If commission is not applicable, return 0
    }

    // Ensure grandTot and commissionValue are numbers
    const grandTotal = Number(grandTot) || 0;
    const commission = Number(activeNewMaterialData.commissionValue) || 0;

    let grandPrice: number;

    if (activeNewMaterialData.commissionType === "$") {
      // Flat commission
      grandPrice = grandTotal + commission;
    } else {
      // Percentage commission
      grandPrice = grandTotal + (grandTotal * commission) / 100;
    }

    return parseFloat(grandPrice.toFixed(2)); // Return grand total rounded to 2 decimal places
  };

  const updateItemData = (
    key: keyof typeof activeNewMaterialData,
    value: any
  ) => {
    setNewMaterial((prev) => {
      const updated = [...prev];
      updated[activeTabIndex][activeNewMaterialIndex] = {
        ...updated[activeTabIndex][activeNewMaterialIndex],
        [key]: value,
      };
      return updated;
    });
  };

  const handleQuantityChange = (value: string) => {
    const quantity = parseInt(value, 10) || 1; // Ensure fallback to 1
    updateItemData("quantity", quantity);
    setNewMaterialError((prev) => {
      const updated = [...prev];
      updated[activeTabIndex][activeNewMaterialIndex] = {
        ...updated[activeTabIndex][activeNewMaterialIndex],
        quantity: "",
      };
      return updated;
    });
  };
  const handleCommissionvalueChange = (value: string) => {
    updateItemData("commissionValue", value);
    setNewMaterialError((prev) => {
      const updated = [...prev];
      updated[activeTabIndex][activeNewMaterialIndex] = {
        ...updated[activeTabIndex][activeNewMaterialIndex],
        commissionValue: "",
      };
      return updated;
    });
  };

  const handleCancel = () => {
    setOpenAddNewMaterial((prev) => {
      const updated = [...prev];
      updated[activeTabIndex] = {
        // openAddNewMaterialPopUp:!updated[activeTabIndex].openAddNewMaterialPopUp
        openAddNewMaterialPopUp: false,
      };
      return updated;
    });

    const updatedAddNewMaterial = newMaterial.map((tab, tabIndex) => {
      if (tabIndex === activeTabIndex) {
        return tab.filter((_, index) => index !== activeNewMaterialIndex);
      }
      return tab;
    });

    setNewMaterial(updatedAddNewMaterial);
    setNewMaterialIndex((prev) => {
      const updated = [...prev];
      updated[activeTabIndex] = {
        activeNewMaterialIndex:
          updated[activeTabIndex].activeNewMaterialIndex === 0
            ? 0
            : updated[activeTabIndex].activeNewMaterialIndex - 1,
      };
      return updated;
    });
    // console.log(newMaterial)
  };
  const handleSave = () => {
    if (
      addNewMaterialValidate({
        newMaterial,
        activeTabIndex,
        activeNewMaterialIndex,
        newMaterialError,
        setNewMaterialError,
      })
    ) {
      setOpenAddNewMaterial((prev) => {
        const updated = [...prev];
        updated[activeTabIndex] = {
          // openAddNewMaterialPopUp:!updated[activeTabIndex].openAddNewMaterialPopUp
          openAddNewMaterialPopUp: false,
        };
        return updated;
      });
      // console.log("add new material is saved")
      toast.success("Material Added succesfully");
    } else {
      console.log("Please add new material");
      toast.info("Material not added!");
    }
  };

  //   console.log(itemSelectionData)
  return (
    <div className="h-full w-full flex flex-row items-center justify-between overflow-y-scroll ">
      <div className=" m-auto relative h-[80%] w-[926px] flex flex-col items-center justify-between dark:bg-black shadow-[0_0px_12.2px_8px_rgba(0,0,0,0.2)] dark:shadow-[0_0px_12.2px_5px_rgba(256,256,256,0.2)] rounded-[25px]">
        <span className=" absolute flex flex-col justify-center items-center top-2 right-2 w-6 h-6 text-[18px] cursor-pointer bg-transparent">
          <IoClose />
        </span>
        <div className="flex flex-col justify-center w-full items-center h-[fit-content] bg-transparent">
          <div className="flex flex-col justify-center w-full items-center gap-4 h-[fit-content] px-6 py-6 bg-transparent">
            <div className="flex flex-col justify-center w-full items-center gap-4 h-[fit-content] bg-transparent">
              <h1 className="text-4xl text-primary dark:text-white font-[700] font-[Helvetica Neue] bg-transparent">
                Add New Meterial
              </h1>
            </div>
          </div>
        </div>
        <div className="flex w-full h-[10px] bg-[#00C5FF29] dark:bg-[#B0EDFF54]"></div>

        <div
          className={`flex flex-col w-full h-[506px] bg-transparent p-4 overflow-y-scroll`}
        >
          <div className="mt-8 bg-transparent">
            <div className="w-full h-full px-4 pb-4 flex flex-col gap-y-4 items-center justify-center bg-transparent">
              <div className="flex flex-row-reverse justify-between w-full gap-x-8 bg-transparent">
                {/* Other form fields such as quantity, color, etc. remain the same */}
                <div className="flex flex-col justify-between items-center w-full  gap-y-8 bg-transparent">
                  {/* Bar 1: Dropdown for item selection */}

                  <SearchLinkToggle
                    selectedValue={activeNewMaterialData.selectedItem}
                    onSearchChange={(value) =>
                      updateItemData("selectedItem", value)
                    }
                    error={activeNewMaterialError.selectedItem}
                    activeTabIndex={activeTabIndex}
                  />

                  <NotesInput
                    value={activeNewMaterialData.note}
                    onChange={(value) => updateItemData("note", value)}
                  />

                  <div className="flex flex-row justify-center items-center w-full gap-y-4 bg-transparent">
                    {activeNewMaterialData.selectedItem.toLowerCase() ===
                      "outlet" && (
                      <div className=" flex flex-row justify-between items-center w-[577px] bg-transparent">
                        {/* Bar 2: Brand selection using RadioGroup */}
                        <Dropdown
                          label="Select Brand*"
                          options={[
                            { value: "Leviton", label: "Leviton" },
                            { value: "LeGrand", label: "LeGrand" },
                            { value: "Lutron", label: "Lutron" },
                          ]}
                          selectedValue={activeNewMaterialData.brand}
                          onChange={(value) => updateItemData("brand", value)}
                          error={activeNewMaterialError.brand}
                          activeTabIndex={activeTabIndex}
                          width={259}
                          height={55}
                        />

                        {/* Bar 3: Style selection using RadioGroup */}
                        {activeNewMaterialData.brand && (
                          <Dropdown
                            label="Select Style*"
                            options={[
                              { value: "Decora", label: "Decora" },
                              { value: "Duplex", label: "Duplex" },
                            ]}
                            selectedValue={activeNewMaterialData.style}
                            onChange={(value) => updateItemData("style", value)}
                            error={activeNewMaterialError.style}
                            activeTabIndex={activeTabIndex}
                            width={158}
                            height={55}
                          />
                        )}
                      </div>
                    )}

                    {[
                      "15amp Breaker",
                      "20amp Breaker",
                      "30amp Breaker",
                      "40amp Breaker",
                      "50amp Breaker",
                    ].includes(activeNewMaterialData.selectedItem) && (
                      <div className=" flex flex-col justify-between items-start gap-4 w-[577px] bg-transparent">
                        {/* Bar 2: Brand selection for switches using RadioGroup */}
                        <Dropdown
                          label="Select Brand*"
                          options={[
                            { value: "Siemens", label: "Siemens" },
                            { value: "Eaton", label: "Eaton" },
                            { value: "Murray", label: "Murray" },
                            { value: "Square", label: "Square" },
                          ]}
                          selectedValue={activeNewMaterialData.brand}
                          onChange={(value) => updateItemData("brand", value)}
                          error={activeNewMaterialError.brand}
                          activeTabIndex={activeTabIndex}
                          width={336}
                          height={55}
                        />
                        {activeNewMaterialData.brand && (
                          <div className=" flex flex-row justify-between items-center w-full bg-transparent">
                            <Dropdown
                              label="Select Pole*"
                              options={[
                                { value: "Single Pole", label: "Single Pole" },
                                { value: "2-Pole", label: "2-Pole" },
                                { value: "3-Pole", label: "3-Pole" },
                              ]}
                              selectedValue={activeNewMaterialData.pole}
                              onChange={(value) =>
                                updateItemData("pole", value)
                              }
                              error={activeNewMaterialError.pole}
                              activeTabIndex={activeTabIndex}
                              width={255}
                              height={55}
                            />
                            {activeNewMaterialData.pole && (
                              <Dropdown
                                label="D/General Electric*"
                                options={[
                                  { value: " Standard", label: " Standard" },
                                  { value: "GFCI", label: "GFCI" },
                                  { value: "AFCI", label: "AFCI" },
                                ]}
                                selectedValue={activeNewMaterialData.amp}
                                onChange={(value) =>
                                  updateItemData("amp", value)
                                }
                                error={activeNewMaterialError.amp}
                                activeTabIndex={activeTabIndex}
                                width={255}
                                height={55}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {[
                      "switches",
                      "three-way-switches",
                      "four-way-switches",
                    ].includes(
                      activeNewMaterialData.selectedItem.toLowerCase()
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
                          selectedValue={activeNewMaterialData.brand}
                          onChange={(value) => updateItemData("brand", value)}
                          error={activeNewMaterialError.brand}
                          activeTabIndex={activeTabIndex}
                          width={259}
                          height={55}
                        />

                        {/* Bar 3: Style selection for switches using RadioGroup */}
                        {activeNewMaterialData.brand && (
                          <Dropdown
                            label="Select Style*"
                            options={[
                              { value: "Toggle", label: "Toggle" },
                              { value: "Rocker", label: "Rocker" },
                            ]}
                            selectedValue={activeNewMaterialData.style}
                            onChange={(value) => updateItemData("style", value)}
                            error={activeNewMaterialError.style}
                            activeTabIndex={activeTabIndex}
                            width={158}
                            height={55}
                          />
                        )}
                      </div>
                    )}
                  </div>

                  {activeNewMaterialData.style && (
                    <>
                      <div className="flex flex-row justify-between items-start gap-2 w-[577px] bg-transparent">
                        {/* Bar 4: Quantity input */}
                        <div className="flex flex-col items-start w-[145px] bg-transparent">
                          <label className="text-lg font-medium text-[#000000B2] dark:text-white bg-transparent mb-2">
                            Quantity*
                          </label>
                          <input
                            type="number"
                            value={activeNewMaterialData.quantity}
                            min="1"
                            onChange={(e) =>
                              handleQuantityChange(e.target.value)
                            }
                            className="p-2 outline-none border-2 border-[#A9A5A5] h-[55px] rounded-[10px] focus:border-[#00C5FF] w-full bg-transparent"
                          />
                          {activeNewMaterialError.quantity && (
                            <p className="text-red-500 bg-transparent">
                              {activeNewMaterialError.quantity}
                            </p>
                          )}
                        </div>

                        {/* Bar 5: Preferred color */}
                        <Dropdown
                          label="Preferred Color*"
                          options={[
                            { value: "White", label: "White" },
                            { value: "Black", label: "Black" },
                          ]}
                          selectedValue={activeNewMaterialData.color}
                          onChange={(value) => updateItemData("color", value)}
                          error={activeNewMaterialError.color}
                          activeTabIndex={activeTabIndex}
                          width={205}
                          height={55}
                        />

                        <div className="flex flex-col items-start w-[156px] bg-transparent">
                          <label className="text-lg font-medium text-[#000000B2] dark:text-white bg-transparent mb-2">
                            Total Amount*
                          </label>
                          <div className="p-2 border-2 border-[#A9A5A5] rounded-[10px] w-full h-[55px] focus:border-[#00C5FF] bg-[#D9D9D980] text-lg ">
                            ${computeTotal()}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-row justify-between items-start gap-2 w-[577px] bg-transparent">
                        <ProductDetailsFetcher
                          activeTabIndex={activeTabIndex}
                        />
                      </div>
                    </>
                  )}
                  {/* Commission Type */}
                  {(activeNewMaterialData.productLinkAmount !== "0" ||
                    (activeNewMaterialData.color &&
                      activeNewMaterialData.quantity)) && (
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
                                !activeNewMaterialData.isCommission
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
                          selectedValue={activeNewMaterialData.commissionType}
                          onChange={(value) =>
                            updateItemData("commissionType", value)
                          }
                          error={activeNewMaterialError.commissionType}
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
                            value={activeNewMaterialData.commissionValue}
                            min="1"
                            onChange={(e) =>
                              handleCommissionvalueChange(e.target.value)
                            }
                            disabled={!activeNewMaterialData.isCommission}
                            className="p-2 outline-none border-2 border-[#A9A5A5] h-[55px] bg-transparent rounded-[10px] focus:border-[#00C5FF] w-full"
                          />
                          {activeNewMaterialError.commissionValue && (
                            <p className="text-red-500 bg-transparent">
                              {activeNewMaterialError.commissionValue}
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
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full h-[fit-content] bg-[#C5D9DE80] dark:darkBottom bottom-0 px-4 py-6 rounded-b-[15px]">
          <NavigationSaveCancel
            handleCancel={handleCancel}
            handleSave={handleSave}
          />
        </div>
      </div>
    </div>
  );
};

export default AddNewMaterialPopUp;
