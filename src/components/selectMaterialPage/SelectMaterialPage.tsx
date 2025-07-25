/* eslint-disable @typescript-eslint/no-explicit-any */

import { useAtom } from "jotai";
import Dropdown from "../form/Dropdown";
import ProductDetailsFetcher from "../form/FatchDetailsByLink";
import {
  newMaterialIndexAtom,
  newMaterialVariableAtom,
  newMaterialVariableErrorAtom,
  openAddNewMaterialAtom,
} from "../../variables/electricalInvoiceVariable";
// import { activeTabIndexAtom } from "../../variables/NavbarVariables";
import { IoClose } from "react-icons/io5";
import NavigationSaveCancel from "../navigation/NavigationSaveCancel";
import { selectMaterialValidate } from "../formValidation/electricalFormValidatin/SelectMaterialPageValidation";
import { useLocation, useNavigate } from "react-router/dist";
import { toast } from "react-toastify";
import SearchLinkToggle from "../form/SearchLinkToggle";
import NotesInput from "../form/NotesInput";
import {
  extractKeyword,
  fetchImage,
  findMatchingElectricalWord,
  isElectricalImage,
} from "../form/FetchImageOnHover";
import { useEffect, useState } from "react";

const SelectMaterialPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const index1 = Number(searchParams.get("index1"));
  const index2 = Number(searchParams.get("index2"));
  const [newMaterial, setNewMaterial] = useAtom(newMaterialVariableAtom);
  const [newMaterialError, setNewMaterialError] = useAtom(
    newMaterialVariableErrorAtom
  );
  const [, setNewMaterialIndex] = useAtom(newMaterialIndexAtom);
  //   const [activeTabIndex] = useAtom(activeTabIndexAtom);
  const activeNewMaterialIndex = index2;

  const activeNewMaterialData = newMaterial[index1][activeNewMaterialIndex];
  const activeNewMaterialError =
    newMaterialError[index1][activeNewMaterialIndex];
  const [imagePreview, setImagePreview] = useState("");

  const [, setOpenAddNewMaterial] = useAtom(openAddNewMaterialAtom);
  // const [materialSectionSteps, setMaterialSectionSteps] = useAtom(materialSectionStepsAtom)

  let grandTot: number;

  const computeTotal = (): string => {
    const unitPrice =
      activeNewMaterialData?.productLinkAmount === "0"
        ? 10
        : parseInt(activeNewMaterialData?.productLinkAmount, 10); // Example unit price per item
    const total = activeNewMaterialData?.quantity * unitPrice;
    grandTot = total; // Store total as a number
    return total.toFixed(2); // Return total as a string with 2 decimal places
  };

  const computeGrandTotal = (): number => {
    if (!activeNewMaterialData?.isCommission) {
      return 0; // If commission is not applicable, return 0
    }

    // Ensure grandTot and commissionValue are numbers
    const grandTotal = Number(grandTot) || 0;
    const commission = Number(activeNewMaterialData?.commissionValue) || 0;

    let grandPrice: number;

    if (activeNewMaterialData?.commissionType === "$") {
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
      updated[index1][activeNewMaterialIndex] = {
        ...updated[index1][activeNewMaterialIndex],
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
      updated[index1][activeNewMaterialIndex] = {
        ...updated[index1][activeNewMaterialIndex],
        quantity: "",
      };
      return updated;
    });
  };
  const handleCommissionvalueChange = (value: string) => {
    updateItemData("commissionValue", value);
    setNewMaterialError((prev) => {
      const updated = [...prev];
      updated[index1][activeNewMaterialIndex] = {
        ...updated[index1][activeNewMaterialIndex],
        commissionValue: "",
      };
      return updated;
    });
  };

  const handleCancel = () => {
    setOpenAddNewMaterial((prev) => {
      const updated = [...prev];
      updated[index1] = {
        // openAddNewMaterialPopUp:!updated[index1].openAddNewMaterialPopUp
        openAddNewMaterialPopUp: false,
      };
      return updated;
    });

    const updatedAddNewMaterial = newMaterial.map((tab, tabIndex) => {
      if (tabIndex === index1) {
        return tab.filter((_, index) => index !== activeNewMaterialIndex);
      }
      return tab;
    });

    setNewMaterial(updatedAddNewMaterial);
    setNewMaterialIndex((prev) => {
      const updated = [...prev];
      updated[index1] = {
        activeNewMaterialIndex:
          updated[index1].activeNewMaterialIndex === 0
            ? 0
            : updated[index1].activeNewMaterialIndex - 1,
      };
      return updated;
    });
    // console.log(newMaterial)
  };
  const handleSave = () => {
    if (
      selectMaterialValidate({
        newMaterial,
        index1,
        activeNewMaterialIndex,
        newMaterialError,
        setNewMaterialError,
      })
    ) {
      setOpenAddNewMaterial((prev) => {
        const updated = [...prev];
        updated[index1] = {
          // openAddNewMaterialPopUp:!updated[index1].openAddNewMaterialPopUp
          openAddNewMaterialPopUp: false,
        };
        return updated;
      });
      // console.log("add new material is saved");

      toast.success(`Material ${index2 + 1} is Saved!`, {
        position: "bottom-right",
      });
    } else {
      // console.log("Please add new material");
      toast.info(`Material ${index2 + 1} is not changed!`, {
        position: "bottom-right",
      });
    }
    navigate("/project/selection");
  };

  useEffect(() => {
    const fatchMaterialImage = async () => {
      const matchedWord = findMatchingElectricalWord(
        activeNewMaterialData.selectedItem
      );
      const query = matchedWord
        ? "electrical" + " " + matchedWord
        : `electrical ${activeNewMaterialData.selectedItem}`;

      try {
        let results = await fetchImage(query);
        let validImage = results.find(isElectricalImage) || results[0];

        // 🔁 If not found, try again with extracted keyword
        if (!validImage) {
          const keyword = extractKeyword(activeNewMaterialData.selectedItem);
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
  }, [activeNewMaterialData.selectedItem]);

  // const handleMaterialNextFun = ()=>{
  //   const activeMaterialStep = materialSectionSteps[activeTabIndex].materialSectionStepsCount
  //   if (activeMaterialStep < 3) {
  //     let stepValue = activeMaterialStep; // Start with the current step count

  //     // Check conditions to increment the step value
  //     if (stepValue === 0 && (activeItemData.selectedItem !== "" || activeItemData.materialLink !== "")) {
  //       stepValue = 1; // Move to step 1 if first condition is met
  //     }
  //     if (stepValue === 1 && ((activeItemData.brand !== "" && activeItemData.style !== "") ||
  //                             (activeItemData.brand !== "" && activeItemData.amp !== ""))) {
  //       stepValue = 2; // Move to step 2 if second condition is met
  //     }
  //     if (stepValue === 2 && (activeItemData.color !== "" && activeItemData.quantity > 0)) {
  //       stepValue = 3; // Move to step 3 if third condition is met
  //     }
  //     setMaterialSectionSteps((prev)=>{
  //       const updated = [...prev]
  //       updated[activeTabIndex] = {
  //         ...updated[activeTabIndex],
  //         materialSectionStepsCount: stepValue-activeMaterialStep>1?activeMaterialStep+1: stepValue, // Increment the step count
  //       };

  //       return updated;
  //     })
  //   }
  // }
  // const handleMaterialPrevFun = ()=>{
  //   //
  //   const activeMaterialStep = materialSectionSteps[activeTabIndex].materialSectionStepsCount
  //   if(activeMaterialStep>0){
  //     setMaterialSectionSteps((prev)=>{
  //       const updated = [...prev]
  //       updated[activeTabIndex] = {
  //         ...updated[activeTabIndex],
  //         materialSectionStepsCount: activeMaterialStep - 1, // Increment the step count
  //       };

  //       return updated;
  //     })
  //   }
  // }

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
                Material {index2 + 1}
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
                    selectedValue={activeNewMaterialData?.selectedItem}
                    onSearchChange={(value) =>
                      updateItemData("selectedItem", value)
                    }
                    prevVal={activeNewMaterialData?.selectedItem}
                    error={activeNewMaterialError?.selectedItem}
                    activeTabIndex={index1}
                  />

                  <NotesInput
                    value={activeNewMaterialData?.note}
                    onChange={(value) => updateItemData("note", value)}
                  />

                  <div className="flex flex-row justify-center items-center w-full gap-y-4 bg-transparent">
                    {activeNewMaterialData?.selectedItem === "outlet" && (
                      <div className=" flex flex-row justify-between items-center w-[577px] bg-transparent">
                        {/* Bar 2: Brand selection using RadioGroup */}
                        <div className=" flex flex-col justify-between items-center w-full bg-transparent">
                          <Dropdown
                            label="Select Brand*"
                            options={[
                              { value: "Leviton", label: "Leviton" },
                              { value: "LeGrand", label: "LeGrand" },
                              { value: "Lutron", label: "Lutron" },
                            ]}
                            selectedValue={activeNewMaterialData?.brand}
                            onChange={(value) => updateItemData("brand", value)}
                            error={activeNewMaterialError?.brand}
                            activeTabIndex={index1}
                            width={259}
                            height={55}
                          />

                          {/* Bar 3: Style selection using RadioGroup */}
                          {activeNewMaterialData?.brand && (
                            <Dropdown
                              label="Select Style*"
                              options={[
                                { value: "Decora", label: "Decora" },
                                { value: "Duplex", label: "Duplex" },
                              ]}
                              selectedValue={activeNewMaterialData?.style}
                              onChange={(value) =>
                                updateItemData("style", value)
                              }
                              error={activeNewMaterialError?.style}
                              activeTabIndex={index1}
                              width={259}
                              height={55}
                            />
                          )}
                        </div>
                        <div className="flex flex-col justify-center items-start w-fit h-fit p-4 bg-gray-300 ">
                          <div className="flex flex-col justify-center items-center w-fit bg-transparent">
                            <img
                              src={
                                imagePreview
                                  ? imagePreview
                                  : "https://upload.wikimedia.org/wikipedia/commons/f/fd/Jtecul.jpg"
                              }
                              alt="preview img"
                              className=" rounded-lg w-[200px] h-[200px]"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {[
                      // "15amp Breaker",
                      // "20amp Breaker",
                      // "30amp Breaker",
                      // "40amp Breaker",
                      // "50amp Breaker",
                      "Breaker",
                    ].includes(activeNewMaterialData?.selectedItem) && (
                      <div className=" flex flex-col flex-wrap justify-between items-start h-[500px] w-[577px] bg-transparent">
                        {/* Bar 2: Brand selection for switches using RadioGroup */}
                        <Dropdown
                          label="Select Brand*"
                          options={[
                            { value: "Siemens", label: "Siemens" },
                            { value: "Eaton", label: "Eaton" },
                            {
                              value: "General Electric",
                              label: "General Electric",
                            },
                            { value: "Square D", label: "Square D" },
                          ]}
                          selectedValue={activeNewMaterialData?.brand}
                          onChange={(value) => updateItemData("brand", value)}
                          error={activeNewMaterialError?.brand}
                          activeTabIndex={index1}
                          width={255}
                          height={55}
                        />

                        {/* updating */}
                        <Dropdown
                          label="Select Use*"
                          options={
                            // activeNewMaterialData.brand === "Siemens" ||
                            // activeNewMaterialData.brand === "Eaton"
                            //   ?
                            [
                              { value: "Standard", label: "Standard" },
                              {
                                value: "Main Breaker",
                                label: "Main Breaker",
                              },
                              // { value: "Tandem", label: "Tandem" },
                              { value: "AFCI", label: "AFCI" },
                              { value: "GFCI", label: "GFCI" },
                              { value: "AFCI/GFCI", label: "AFCI/GFCI" },
                            ]
                            // [
                            //     { value: "Standard", label: "Standard" },
                            //     { value: "Tandem", label: "Tandem" },
                            //     { value: "AFCI", label: "AFCI" },
                            //     { value: "GFCI", label: "GFCI" },
                            //   ]
                            // : activeNewMaterialData.brand ===
                            //   "General Electric"
                            // ? [
                            //     { value: "Standard", label: "Standard" },
                            //     { value: "Tandem", label: "Tandem" },
                            //     { value: "Quadplex", label: "Quadplex" },
                            //     { value: "GFCI", label: "GFCI" },
                            //   ]
                            // : [
                            //     { value: "Standard", label: "Standard" },
                            //     {
                            //       value: "Dual Function",
                            //       label: "Dual Function",
                            //     },
                            //     {
                            //       value: "CAFCI/GFCI",
                            //       label: "CAFCI/GFCI",
                            //     },
                            //   ]
                          }
                          selectedValue={activeNewMaterialData?.use}
                          onChange={(value) => updateItemData("use", value)}
                          error={activeNewMaterialError?.use}
                          activeTabIndex={index1}
                          width={255}
                          height={55}
                        />
                        {activeNewMaterialData?.brand === "Square D" &&
                          activeNewMaterialData?.use !== "Main Breaker" && (
                            <Dropdown
                              label="Select Version*"
                              options={
                                // activeNewMaterialData.brand === "Siemens"
                                //   ? [
                                //       { value: "Tandem", label: "Tandem" },
                                //       { value: "QP", label: "QP" },
                                //       { value: "QT", label: "QT" },
                                //       { value: "x", label: "x" },
                                //     ]
                                //   : activeNewMaterialData.brand === "Eaton"
                                //   ? [
                                //       { value: "BR", label: "BR" },
                                //       { value: "CH", label: "CH" },
                                //       { value: "x", label: "x" },
                                //     ]
                                //   : activeNewMaterialData.brand ===
                                //     "General Electric"
                                //   ? [
                                //       { value: "Q-Line", label: "Q-Line" },
                                //       { value: "THQL", label: "THQL" },
                                //       { value: "THQP", label: "THQP" },
                                //       { value: "x", label: "x" },
                                //     ]
                                // :
                                [
                                  { value: "Homeline", label: "Homeline" },
                                  { value: "QO", label: "QO" },
                                  // { value: "x", label: "x" },
                                ]
                              }
                              selectedValue={activeNewMaterialData?.version}
                              onChange={(value) =>
                                updateItemData("version", value)
                              }
                              error={activeNewMaterialError?.version}
                              activeTabIndex={index1}
                              width={255}
                              height={55}
                            />
                          )}
                        {/* <div className=" flex flex-row justify-between items-center w-full bg-transparent"> */}
                        <Dropdown
                          label="Select Pole*"
                          options={
                            activeNewMaterialData.use === "Standard"
                              ? activeNewMaterialData.brand === "Square D"
                                ? activeNewMaterialData.version === "H"
                                  ? [
                                      {
                                        value: "Single Pole",
                                        label: "Single Pole",
                                      },
                                      { value: "2-Pole", label: "2-Pole" },
                                    ]
                                  : // activeNewMaterialData.version === "QO"
                                    // ? [
                                    //     { value: "Single Pole", label: "Single Pole" },
                                    //     { value: "2-Pole", label: "2-Pole" },
                                    //     { value: "3-Pole", label: "3-Pole" },
                                    //   ]
                                    // :
                                    [
                                      {
                                        value: "Single Pole",
                                        label: "Single Pole",
                                      },
                                      { value: "2-Pole", label: "2-Pole" },
                                      { value: "3-Pole", label: "3-Pole" },
                                      // { value: "1-Pole", label: "1-Pole" },
                                      // { value: "2-Pole", label: "2-Pole" },
                                      // { value: "Quad", label: "Quad" },
                                    ]
                                : [
                                    {
                                      value: "Single Pole",
                                      label: "Single Pole",
                                    },
                                    { value: "2-Pole", label: "2-Pole" },
                                    { value: "3-Pole", label: "3-Pole" },
                                    // { value: "1-Pole", label: "1-Pole" },
                                    // { value: "2-Pole", label: "2-Pole" },
                                    // { value: "Quad", label: "Quad" },
                                  ]
                              : activeNewMaterialData.use === "Main Breaker"
                              ? [
                                  // { value: "1-Pole", label: "1-Pole" },
                                  { value: "2-Pole", label: "2-Pole" },
                                ]
                              : [
                                  { value: "1-Pole", label: "1-Pole" },
                                  { value: "2-Pole", label: "2-Pole" },
                                  // { value: "3-Pole", label: "3-Pole" },
                                ]
                          }
                          selectedValue={activeNewMaterialData?.pole}
                          onChange={(value) => updateItemData("pole", value)}
                          error={activeNewMaterialError?.pole}
                          activeTabIndex={index1}
                          width={255}
                          height={55}
                        />

                        {(activeNewMaterialData?.brand === "Siemens" ||
                          activeNewMaterialData?.brand === "Square D") &&
                          (activeNewMaterialData?.use === "AFCI" ||
                            activeNewMaterialData?.use === "GFCI" ||
                            activeNewMaterialData?.use === "AFCI/GFCI") && (
                            <Dropdown
                              label="Select Neutral*"
                              options={
                                activeNewMaterialData?.brand === "Siemens"
                                  ? [
                                      { value: "Snap-On", label: "Snap-On" },
                                      // { value: "x", label: "x" },
                                    ]
                                  : [
                                      // {
                                      //   value: "Plug-On Neutral",
                                      //   label: "Plug-On Neutral",
                                      // },
                                      { value: "Pigtail", label: "Pigtail" },
                                      // { value: "x", label: "x" },
                                    ]
                                // activeNewMaterialData?.use === "Main Breaker"
                                //   ? [
                                //       { value: "Snap-On", label: "Snap-On" },
                                //       { value: "x", label: "x" },
                                //     ]
                                //   : [
                                //       {
                                //         value: "Plug-On Neutral",
                                //         label: "Plug-On Neutral",
                                //       },
                                //       { value: "Pigtail", label: "Pigtail" },
                                //       { value: "x", label: "x" },
                                //     ]
                              }
                              selectedValue={activeNewMaterialData?.neutral}
                              onChange={(value) =>
                                updateItemData("neutral", value)
                              }
                              error={activeNewMaterialError?.neutral}
                              activeTabIndex={index1}
                              width={255}
                              height={55}
                            />
                          )}

                        {activeNewMaterialData.version !== "H" &&
                          activeNewMaterialData.pole !== "3-Pole" && (
                            <Dropdown
                              label="Select Type*"
                              options={
                                activeNewMaterialData.use === "Standard"
                                  ? activeNewMaterialData.pole === "Single-Pole"
                                    ? [
                                        { value: "Single", label: "Single" },
                                        { value: "Twin", label: "Twin" },
                                      ]
                                    : activeNewMaterialData.pole === "2-Pole"
                                    ? activeNewMaterialData.brand ===
                                        "Square D" &&
                                      activeNewMaterialData.version === "QO"
                                      ? [
                                          {
                                            value: "Single",
                                            label: "Single",
                                          },

                                          { value: "Quad", label: "Quad" },
                                        ]
                                      : [
                                          {
                                            value: "Single",
                                            label: "Single",
                                          },
                                          {
                                            value: "Threeplex",
                                            label: "Threeplex",
                                          },
                                          { value: "Quad", label: "Quad" },
                                        ]
                                    : [{ value: "Single", label: "Single" }]
                                  : activeNewMaterialData.use ===
                                      "Main Breaker" &&
                                    activeNewMaterialData.pole === "2-Pole"
                                  ? [{ value: "Single", label: "Single" }]
                                  : activeNewMaterialData.use === "AFCI" ||
                                    activeNewMaterialData.use === "GFCI" ||
                                    activeNewMaterialData.use === "AFCI/GCFI"
                                  ? (activeNewMaterialData?.brand ===
                                      "Siemens" ||
                                      activeNewMaterialData?.brand ===
                                        "Square D") &&
                                    activeNewMaterialData.neutral === "Snap-On"
                                    ? [
                                        { value: "Single", label: "Single" },
                                        { value: "Twin", label: "Twin" },
                                      ]
                                    : [{ value: "Single", label: "Single" }]
                                  : [
                                      { value: "Single", label: "Single" },
                                      { value: "Twin", label: "Twin" },
                                      {
                                        value: "Threeplex",
                                        label: "Threeplex",
                                      },
                                      { value: "Quad", label: "Quad" },
                                    ]
                              }
                              selectedValue={activeNewMaterialData?.type}
                              onChange={(value) =>
                                updateItemData("type", value)
                              }
                              error={activeNewMaterialError?.type}
                              activeTabIndex={index1}
                              width={255}
                              height={55}
                            />
                          )}
                        {activeNewMaterialData?.pole && (
                          <Dropdown
                            label="Select Amps*"
                            options={
                              activeNewMaterialData.brand === "Siemens"
                                ? activeNewMaterialData.use === "Standard"
                                  ? activeNewMaterialData.pole === "Single Pole"
                                    ? activeNewMaterialData.type === "Single"
                                      ? [
                                          { value: "15-30", label: "15-30" },
                                          { value: "15", label: "15" },
                                          { value: "20", label: "20" },
                                          { value: "30", label: "30" },
                                        ]
                                      : [
                                          { value: "10/30", label: "10/30" },
                                          { value: "15/15", label: "15/15" },
                                          { value: "15/20", label: "15/20" },
                                          { value: "20/20", label: "20/20" },
                                          { value: "20/30", label: "20/30" },
                                          { value: "30/20", label: "30/20" },
                                          { value: "30/30", label: "30/30" },
                                        ]
                                    : activeNewMaterialData.pole === "2-Pole"
                                    ? activeNewMaterialData.type === "Single"
                                      ? [
                                          {
                                            value: "100-200",
                                            label: "100-200",
                                          },
                                          { value: "15", label: "15" },
                                          { value: "20", label: "20" },
                                          { value: "25", label: "25" },
                                          { value: "30", label: "30" },
                                          { value: "40", label: "40" },
                                          { value: "50", label: "50" },
                                          { value: "60", label: "60" },
                                          { value: "70", label: "70" },
                                          { value: "100", label: "100" },
                                          { value: "125", label: "125" },
                                        ]
                                      : activeNewMaterialData.type ===
                                        "Threeplex"
                                      ? [
                                          {
                                            value: "100-200",
                                            label: "100-200",
                                          },
                                          {
                                            value: "15/(25/25)/15",
                                            label: "15/(25/25)/15",
                                          },
                                          {
                                            value: "15/(30/30)/15",
                                            label: "15/(30/30)/15",
                                          },
                                          {
                                            value: "15/(40/40)/15",
                                            label: "15/(40/40)/15",
                                          },
                                          {
                                            value: "20/(20/20)/20",
                                            label: "20/(20/20)/20",
                                          },
                                          {
                                            value: "30/(30/30)/30",
                                            label: "30/(30/30)/30",
                                          },
                                        ]
                                      : [
                                          {
                                            value: "100-200",
                                            label: "100-200",
                                          },
                                          {
                                            value: "20/20/20/20",
                                            label: "20/20/20/20",
                                          },
                                          {
                                            value: "30/20/20/30",
                                            label: "30/20/20/30",
                                          },
                                          {
                                            value: "40/20/20/40",
                                            label: "40/20/20/40",
                                          },
                                          {
                                            value: "40/30/30/40",
                                            label: "40/30/30/40",
                                          },
                                          {
                                            value: "40/40/40/40",
                                            label: "40/40/40/40",
                                          },
                                        ]
                                    : [
                                        { value: "100-200", label: "100-200" },
                                        { value: "20", label: "20" },
                                        { value: "25", label: "25" },
                                        { value: "30", label: "30" },
                                        { value: "40", label: "40" },
                                        { value: "45", label: "45" },
                                        { value: "50", label: "50" },
                                        { value: "60", label: "60" },
                                        { value: "70", label: "70" },
                                        { value: "100", label: "100" },
                                      ]
                                  : activeNewMaterialData.use === "Main Breaker"
                                  ? [{ value: "150-225", label: "150-225" }]
                                  : // activeNewMaterialData.use === "AFCI" ||
                                    //   activeNewMaterialData.use === "GFCI" ||
                                    //   activeNewMaterialData.use === "AFCI/GFCI"
                                    // ?
                                    [
                                      { value: "15", label: "15" },
                                      { value: "20", label: "20" },
                                      { value: "15/15", label: "15/15" },
                                      { value: "15/20", label: "15/20" },
                                    ]
                                : // : []

                                activeNewMaterialData.brand === "Eaton"
                                ? activeNewMaterialData.use === "Standard"
                                  ? activeNewMaterialData.pole === "Single Pole"
                                    ? activeNewMaterialData.type === "Single"
                                      ? [
                                          { value: "15-30", label: "15-30" },
                                          { value: "15", label: "15" },
                                          { value: "20", label: "20" },
                                          { value: "30", label: "30" },
                                        ]
                                      : [
                                          { value: "15-20", label: "15-20" },
                                          { value: "15/15", label: "15/15" },
                                          { value: "20/20", label: "20/20" },
                                        ]
                                    : activeNewMaterialData.pole === "2-Pole"
                                    ? activeNewMaterialData.type === "Single"
                                      ? [
                                          { value: "15-200", label: "15-200" },
                                          { value: "15", label: "15" },
                                          { value: "20", label: "20" },
                                          { value: "25", label: "25" },
                                          { value: "30", label: "30" },
                                          { value: "35", label: "35" },
                                          { value: "40", label: "40" },
                                          { value: "50", label: "50" },
                                          { value: "60", label: "60" },
                                          { value: "70", label: "70" },
                                          { value: "100", label: "100" },
                                          { value: "125", label: "125" },
                                        ]
                                      : activeNewMaterialData.type === "Quad"
                                      ? [
                                          { value: "15-200", label: "15-200" },
                                          {
                                            value: "20/20/20/20",
                                            label: "20/20/20/20",
                                          },
                                          {
                                            value: "20/30/30/20",
                                            label: "20/30/30/20",
                                          },
                                          {
                                            value: "30/30/30/30",
                                            label: "30/30/30/30",
                                          },
                                          {
                                            value: "40/40/40/40",
                                            label: "40/40/40/40",
                                          },
                                        ]
                                      : [{ value: "x", label: "x" }]
                                    : [{ value: "15-200", label: "15-200" }]
                                  : activeNewMaterialData.use === "Main Breaker"
                                  ? [{ value: "200", label: "200" }]
                                  : // activeNewMaterialData.use === "AFCI" ||
                                    //   activeNewMaterialData.use === "GFCI" ||
                                    //   activeNewMaterialData.use === "AFCI/GFCI"
                                    // ?
                                    [
                                      { value: "15", label: "15" },
                                      { value: "20", label: "20" },
                                      { value: "15/15", label: "15/15" },
                                      { value: "15/20", label: "15/20" },
                                    ]
                                : // : []

                                activeNewMaterialData.brand === "Square D"
                                ? activeNewMaterialData.use === "Standard"
                                  ? activeNewMaterialData.pole === "Single Pole"
                                    ? activeNewMaterialData.type === "Single"
                                      ? [
                                          { value: "15-50", label: "15-50" },
                                          { value: "15", label: "15" },
                                          { value: "20", label: "20" },
                                          { value: "25", label: "25" },
                                          { value: "30", label: "30" },
                                          { value: "50", label: "50" },
                                        ]
                                      : [
                                          { value: "15-200", label: "15-200" },
                                          { value: "15/15", label: "15/15" },
                                          { value: "20/20", label: "20/20" },
                                          {
                                            value: "(15/20 - Homeline Only)",
                                            label: "(15/20 - Homeline Only)",
                                          },
                                        ]
                                    : activeNewMaterialData.pole === "2-Pole"
                                    ? activeNewMaterialData.type === "Single"
                                      ? [
                                          { value: "15-200", label: "15-200" },
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
                                        ]
                                      : activeNewMaterialData.type === "Quard"
                                      ? [{ value: "15-200", label: "15-200" }]
                                      : [{ value: "x", label: "x" }]
                                    : [
                                        { value: "15-200", label: "15-200" },
                                        { value: "20", label: "20" },
                                        { value: "40", label: "40" },
                                        { value: "50", label: "50" },
                                        { value: "60", label: "60" },
                                        { value: "100", label: "100" },
                                      ]
                                  : activeNewMaterialData.use === "Main Breaker"
                                  ? [{ value: "200", label: "200" }]
                                  : // activeNewMaterialData.use === "AFCI" ||
                                    //   activeNewMaterialData.use === "GFCI" ||
                                    //   activeNewMaterialData.use === "AFCI/GFCI"
                                    // ?
                                    [
                                      { value: "15", label: "15" },
                                      { value: "20", label: "20" },
                                      { value: "15/15", label: "15/15" },
                                      { value: "15/20", label: "15/20" },
                                    ]
                                : // : []

                                activeNewMaterialData.use === "Standard"
                                ? activeNewMaterialData.pole === "Single Pole"
                                  ? activeNewMaterialData.type === "Single"
                                    ? [
                                        { value: "15-30", label: "15-30" },
                                        { value: "15", label: "15" },
                                        { value: "20", label: "20" },
                                        { value: "30", label: "30" },
                                      ]
                                    : [{ value: "x", label: "x" }]
                                  : activeNewMaterialData.pole === "2-Pole"
                                  ? activeNewMaterialData.type === "Single"
                                    ? [
                                        { value: "15-200", label: "15-200" },
                                        { value: "15", label: "15" },
                                        { value: "20", label: "20" },
                                        { value: "25", label: "25" },
                                        { value: "30", label: "30" },
                                        { value: "35", label: "35" },
                                        { value: "40", label: "40" },
                                        { value: "50", label: "50" },
                                        { value: "60", label: "60" },
                                        { value: "70", label: "70" },
                                        { value: "90", label: "90" },
                                        { value: "100", label: "100" },
                                        { value: "125", label: "125" },
                                      ]
                                    : activeNewMaterialData.type === "Quad"
                                    ? [{ value: "15-200", label: "15-200" }]
                                    : [{ value: "x", label: "x" }]
                                  : [{ value: "15-200", label: "15-200" }]
                                : activeNewMaterialData.use === "Main Breaker"
                                ? [{ value: "x", label: "x" }]
                                : // activeNewMaterialData.use === "AFCI" ||
                                  //   activeNewMaterialData.use === "GFCI" ||
                                  //   activeNewMaterialData.use === "AFCI/GFCI"
                                  // ?
                                  [
                                    { value: "15", label: "15" },
                                    { value: "20", label: "20" },
                                    { value: "15/15", label: "15/15" },
                                    { value: "15/20", label: "15/20" },
                                  ]
                              // : []

                              // [
                              //   { value: "x", label: "x" },
                              //   { value: "10", label: "10" },
                              //   { value: "15", label: "15" },
                              //   { value: "20", label: "20" },
                              //   { value: "25", label: "25" },
                              //   { value: "30", label: "30" },
                              //   { value: "35", label: "35" },
                              //   { value: "40", label: "40" },
                              //   { value: "45", label: "45" },
                              //   { value: "50", label: "50" },
                              //   { value: "60", label: "60" },
                              //   { value: "70", label: "70" },
                              //   { value: "80", label: "80" },
                              //   { value: "90", label: "90" },
                              //   { value: "100", label: "100" },
                              //   { value: "125", label: "125" },
                              //   { value: "15/15", label: "15/15" },
                              //   { value: "15/20", label: "15/20" },
                              //   {
                              //     value: "(15/20 - Homeline Only)",
                              //     label: "(15/20 - Homeline Only)",
                              //   },
                              //   { value: "20/20", label: "20/20" },
                              //   { value: "20/30", label: "20/30" },
                              //   { value: "30/30", label: "30/30" },
                              //   { value: "15/(20/20)/15", label: "15/(20/20)/15" },
                              //   { value: "15/(25/25)/15", label: "15/(25/25)/15" },
                              //   { value: "15/(30/30)/15", label: "15/(30/30)/15" },
                              //   { value: "15/(40/40)/15", label: "15/(40/40)/15" },
                              //   { value: "15/(50/50)/15", label: "15/(50/50)/15" },
                              //   { value: "20/(20/20)/20", label: "20/(20/20)/20" },
                              //   { value: "20/(25/25)/20", label: "20/(25/25)/20" },
                              //   { value: "20/(30/30)/20", label: "20/(30/30)/20" },
                              //   { value: "20/(40/40)/20", label: "20/(40/40)/20" },
                              //   { value: "20/(50/50)/20", label: "20/(50/50)/20" },
                              //   { value: "30/(30/30)/30", label: "30/(30/30)/30" },
                              //   { value: "20/20/20/20", label: "20/20/20/20" },
                              //   { value: "20/30/30/20", label: "20/30/30/20" },
                              //   { value: "30/20/20/30", label: "30/20/20/30" },
                              //   { value: "30/30/30/30", label: "30/30/30/30" },
                              //   { value: "40/20/20/40", label: "40/20/20/40" },
                              //   { value: "40/30/30/40", label: "40/30/30/40" },
                              //   { value: "40/40/40/40", label: "40/40/40/40" },
                              // ]
                            }
                            selectedValue={activeNewMaterialData?.amp}
                            onChange={(value) => updateItemData("amp", value)}
                            error={activeNewMaterialError?.amp}
                            activeTabIndex={index1}
                            width={255}
                            height={55}
                          />
                        )}
                        {/* </div> */}
                        <div className="flex flex-col justify-center items-start w-fit h-fit p-4 bg-gray-300 ">
                          <div className="flex flex-col justify-center items-center w-fit bg-transparent">
                            <img
                              src={
                                imagePreview
                                  ? imagePreview
                                  : "https://upload.wikimedia.org/wikipedia/commons/f/fd/Jtecul.jpg"
                              }
                              alt="preview img"
                              className=" rounded-lg w-[200px] h-[200px]"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {[
                      "switches",
                      "three-way-switches",
                      "four-way-switches",
                    ].includes(activeNewMaterialData?.selectedItem) && (
                      <div className=" flex flex-row justify-between items-center w-[577px] bg-transparent">
                        {/* Bar 2: Brand selection for switches using RadioGroup */}
                        <div className=" flex flex-col justify-between items-center w-full bg-transparent">
                          <Dropdown
                            label="Select Brand*"
                            options={[
                              { value: "Leviton", label: "Leviton" },
                              { value: "LeGrand", label: "LeGrand" },
                              { value: "Lutron", label: "Lutron" },
                            ]}
                            selectedValue={activeNewMaterialData?.brand}
                            onChange={(value) => updateItemData("brand", value)}
                            error={activeNewMaterialError?.brand}
                            activeTabIndex={index1}
                            width={259}
                            height={55}
                          />

                          {/* Bar 3: Style selection for switches using RadioGroup */}
                          {activeNewMaterialData?.brand && (
                            <Dropdown
                              label="Select Style*"
                              options={[
                                { value: "Toggle", label: "Toggle" },
                                { value: "Rocker", label: "Rocker" },
                              ]}
                              selectedValue={activeNewMaterialData?.style}
                              onChange={(value) =>
                                updateItemData("style", value)
                              }
                              error={activeNewMaterialError?.style}
                              activeTabIndex={index1}
                              width={259}
                              height={55}
                            />
                          )}
                        </div>
                        <div className="flex flex-col justify-center items-start w-fit h-fit p-4 bg-gray-300 ">
                          <div className="flex flex-col justify-center items-center w-fit bg-transparent">
                            <img
                              src={
                                imagePreview
                                  ? imagePreview
                                  : "https://upload.wikimedia.org/wikipedia/commons/f/fd/Jtecul.jpg"
                              }
                              alt="preview img"
                              className=" rounded-lg w-[200px] h-[200px]"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {(activeNewMaterialData?.style ||
                    activeNewMaterialData?.amp) && (
                    <>
                      <div className="flex flex-row justify-between items-start gap-2 w-[577px] bg-transparent">
                        {/* Bar 4: Quantity input */}
                        <div
                          className={`flex flex-col items-start ${
                            activeNewMaterialData.selectedItem !== "Breaker"
                              ? "w-[145px]"
                              : "w-[295px]"
                          } bg-transparent`}
                        >
                          <label className="text-lg font-medium text-[#000000B2] dark:text-white bg-transparent mb-2">
                            Quantity*
                          </label>
                          <input
                            type="number"
                            value={activeNewMaterialData?.quantity}
                            min="1"
                            onChange={(e) =>
                              handleQuantityChange(e.target.value)
                            }
                            className="p-2 outline-none border-2 border-[#A9A5A5] h-[55px] rounded-[10px] focus:border-[#00C5FF] w-full bg-transparent"
                          />
                          {activeNewMaterialError?.quantity && (
                            <p className="text-red-500 bg-transparent">
                              {activeNewMaterialError?.quantity}
                            </p>
                          )}
                        </div>

                        {/* Bar 5: Preferred color */}
                        {activeNewMaterialData?.selectedItem !== "Breaker" && (
                          <Dropdown
                            label="Preferred Color*"
                            options={[
                              { value: "White", label: "White" },
                              { value: "Black", label: "Black" },
                            ]}
                            selectedValue={activeNewMaterialData?.color}
                            onChange={(value) => updateItemData("color", value)}
                            error={activeNewMaterialError?.color}
                            activeTabIndex={index1}
                            width={205}
                            height={55}
                          />
                        )}

                        <div
                          className={`flex flex-col items-start ${
                            activeNewMaterialData.selectedItem !== "Breaker"
                              ? "w-[156px]"
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

                      <div className="flex flex-row justify-between items-start gap-2 w-[577px] bg-transparent">
                        <ProductDetailsFetcher activeTabIndex={index1} />
                      </div>
                    </>
                  )}
                  {/* Commission Type */}
                  {(activeNewMaterialData?.productLinkAmount !== "0" ||
                    (activeNewMaterialData?.color &&
                      activeNewMaterialData?.quantity)) && (
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
                                !activeNewMaterialData?.isCommission
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
                          selectedValue={activeNewMaterialData?.commissionType}
                          onChange={(value) =>
                            updateItemData("commissionType", value)
                          }
                          error={activeNewMaterialError?.commissionType}
                          activeTabIndex={index1}
                          // width={commissionType ? 150 : 205}
                          width={180}
                          height={55}
                        />

                        {/* Bar 4: commission value input */}
                        <div className="flex flex-col items-start w-[145px] bg-transparent mt-[37px]">
                          {/* <label className="text-primary mb-1 bg-transparent">Quantity*</label> */}
                          <input
                            type="number"
                            value={activeNewMaterialData?.commissionValue}
                            min="1"
                            onChange={(e) =>
                              handleCommissionvalueChange(e.target.value)
                            }
                            disabled={!activeNewMaterialData?.isCommission}
                            className="p-2 outline-none border-2 border-[#A9A5A5] h-[55px] bg-transparent rounded-[10px] focus:border-[#00C5FF] w-full"
                          />
                          {activeNewMaterialError?.commissionValue && (
                            <p className="text-red-500 bg-transparent">
                              {activeNewMaterialError?.commissionValue}
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

export default SelectMaterialPage;
