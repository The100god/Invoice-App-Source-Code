/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAtom } from "jotai";
import Dropdown from "../form/Dropdown";
import {
  newMaterialIndexAtom,
  newMaterialVariableAtom,
  newMaterialVariableErrorAtom,
  openAddNewMaterialAtom,
} from "../../variables/electricalInvoiceVariable";
// import { activeTabIndexAtom } from "../../variables/NavbarVariables";
import { IoClose } from "react-icons/io5";
import NavigationSaveCancel from "../navigation/NavigationSaveCancel";
// import { selectMaterialValidate } from "../formValidation/electricalFormValidatin/SelectMaterialPageValidation";
import { useLocation, useNavigate } from "react-router/dist";
import { toast } from "react-toastify";
import { useState } from "react";
import { activeTabIndexAtom } from "../../variables/NavbarVariables";
import SearchLinkToggle from "../form/SearchLinkToggle";
import NotesInput from "../form/NotesInput";

const EditAddAttributePopUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const index1 = Number(searchParams.get("index1"));
  const index2 = Number(searchParams.get("index2"));
  const [newMaterial, setNewMaterial] = useAtom(newMaterialVariableAtom);
  const [newMaterialError, setNewMaterialError] = useAtom(
    newMaterialVariableErrorAtom
  );
  const [activeTabIndex] = useAtom(activeTabIndexAtom);

  const [countAttribute, setCountAttribute] = useState(-1);
  const [addAttributeVariable, setAddAttributeVariable] = useState<
    {
      selectedItem: string;
      brand: string;
      style: string;
      use: string;
      version: string;
      neutral: string;
      type: string;
      pole: string;
      amp: string;
      note: string;
    }[]
  >([]);

  const [, setNewMaterialIndex] = useAtom(newMaterialIndexAtom);
  //   const [activeTabIndex] = useAtom(activeTabIndexAtom);
  const activeNewMaterialIndex = index2;

  const activeNewMaterialData = newMaterial[index1][activeNewMaterialIndex];
  const activeNewMaterialError =
    newMaterialError[index1][activeNewMaterialIndex];

  const [, setOpenAddNewMaterial] = useAtom(openAddNewMaterialAtom);

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
  const updateAddAttributeData = (
    key: keyof {
      selectedItem: string;
      brand: string;
      style: string;
      pole: string;
      use: string;
      version: string;
      neutral: string;
      type: string;
      amp: string;
      note: string;
    },
    value: any,
    index: number
  ) => {
    setAddAttributeVariable((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [key]: value,
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
    setOpenAddNewMaterial((prev) => {
      const updated = [...prev];
      updated[index1] = {
        // openAddNewMaterialPopUp:!updated[index1].openAddNewMaterialPopUp
        openAddNewMaterialPopUp: false,
      };
      return updated;
    });

    // console.log("add new material is saved");
    addAttributeVariable?.forEach((element) => {
      // handleAddNewMaterial();
      setNewMaterial((prev) => {
        const updated = [...prev];
        updated[index1].push({
          selectedItem: element.selectedItem,
          brand: element.brand,
          style: element.style,
          quantity: 1,
          color: "",
          pole: "",
          amp: "",
          use: "",
          version: "",
          neutral: "",
          type: "",
          note: "",
          materialLink: "",
          commissionType: "",
          commissionValue: "",
          linkProductType: "",
          productLinkAmount: "0",
          isCommission: false,
          productDetails: {
            price: "",
          },
        });
        return updated;
      });

      const newErrorObject = {
        selectedItem: "",
        brand: "",
        style: "",
        quantity: "",
        color: "",
        pole: "",
        use: "",
        version: "",
        neutral: "",
        type: "",
        amp: "",
        materialLink: "",
        commissionType: "",
        commissionValue: "",
      };

      setNewMaterialError((prev) => {
        const updated = [...prev];

        // Check if the current active tab index exists; if not, initialize a new array
        if (!updated[activeTabIndex]) {
          updated[activeTabIndex] = [];
        }

        // Add the new error object to the current active tab's error list
        updated[activeTabIndex].push(newErrorObject);

        return updated;
      });

      setNewMaterialIndex((prev) => {
        const updated = [...prev];
        updated[activeTabIndex] = {
          activeNewMaterialIndex: newMaterial[activeTabIndex].length - 1,
        };
        return updated;
      });
    });

    toast.success(`Materials is Add or Edit Successfully!`, {
      position: "bottom-right",
    });

    navigate("/project/selection");
  };

  console.log("newMaterial", newMaterial);

  const handleAddAttribute = () => {
    const newAttributeCount = countAttribute + 1;
    setCountAttribute(newAttributeCount);
    setAddAttributeVariable((prev) => {
      const updated = [...prev];
      updated.push({
        selectedItem: "",
        brand: "",
        style: "",
        use: "",
        version: "",
        neutral: "",
        type: "",
        amp: "",
        pole: "",
        note: "",
      });
      return updated;
    });
  };
  const handleRemoveAttribute = (ind: number) => {
    setAddAttributeVariable((prev) => prev.filter((_, index) => index !== ind));
    const newAttributeCount = countAttribute - 1;
    setCountAttribute(newAttributeCount);
  };
  //   console.log("countAttribute", countAttribute);
  //   console.log("addAttribute", addAttributeVariable);

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
                Edit/Add Material
              </h1>
              <p className="text-[14px] leading-5 font-[400] text-center w-[75%] bg-transparent">
                Right Click to Add or Remove Atributes
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full h-[10px] bg-[#00C5FF29] dark:bg-[#B0EDFF54]"></div>

        <div
          className={`flex flex-col w-full h-[506px] bg-transparent p-4 overflow-y-scroll`}
        >
          <div className="mt-8 bg-transparent">
            <div className="w-full h-full px-4 pb-4 flex flex-col gap-y-4 items-center justify-center bg-transparent">
              <div className="flex flex-col justify-between items-center w-full gap-y-8 bg-transparent">
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
                            onChange={(value) => updateItemData("style", value)}
                            error={activeNewMaterialError?.style}
                            activeTabIndex={index1}
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
                    ].includes(activeNewMaterialData?.selectedItem) && (
                      <div className=" flex flex-row flex-wrap justify-between items-start gap-4 w-[577px] bg-transparent">
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
                          options={[
                            { value: "Standard", label: "Standard" },
                            { value: "Main Breaker", label: "Main Breaker" },
                            { value: "AFCI", label: "AFCI" },
                            { value: "GFCI", label: "GFCI" },
                            { value: "AFCI/GFCI", label: "AFCI/GFCI" },
                          ]}
                          selectedValue={activeNewMaterialData?.use}
                          onChange={(value) => updateItemData("use", value)}
                          error={activeNewMaterialError?.use}
                          activeTabIndex={index1}
                          width={255}
                          height={55}
                        />
                        {(activeNewMaterialData?.brand !== "Siemens" || activeNewMaterialData?.use !=="Main Breaker") && <Dropdown
                          label="Select Version*"
                          options={[
                            { value: "Homeline", label: "Homeline" },
                            { value: "QO", label: "QO" },
                            { value: "x", label: "x" },
                          ]}
                          selectedValue={activeNewMaterialData?.version}
                          onChange={(value) => updateItemData("version", value)}
                          error={activeNewMaterialError?.version}
                          activeTabIndex={index1}
                          width={255}
                          height={55}
                        />}
                        {/* {activeNewMaterialData?.brand && (
                          <div className=" flex flex-row justify-between items-center w-full bg-transparent"> */}
                        <Dropdown
                          label="Select Pole*"
                          options={[
                            { value: "Single Pole", label: "Single Pole" },
                            { value: "2-Pole", label: "2-Pole" },
                            { value: "3-Pole", label: "3-Pole" },
                          ]}
                          selectedValue={activeNewMaterialData?.pole}
                          onChange={(value) => updateItemData("pole", value)}
                          error={activeNewMaterialError?.pole}
                          activeTabIndex={index1}
                          width={255}
                          height={55}
                        />
                        <Dropdown
                          label="Select Neutral*"
                          options={
                            activeNewMaterialData?.use === "Main Breaker"?[
                              { value: "Snap-On", label: "Snap-On" },
                              { value: "x", label: "x" },
                            ]:
                              [
                              { value: "Snap-On", label: "Snap-On" },
                              { value: "Pig-Tail", label: "Pig-Tail" },
                              { value: "x", label: "x" },
                            ]
                        }
                          selectedValue={activeNewMaterialData?.neutral}
                          onChange={(value) => updateItemData("neutral", value)}
                          error={activeNewMaterialError?.neutral}
                          activeTabIndex={index1}
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
                          selectedValue={activeNewMaterialData?.type}
                          onChange={(value) => updateItemData("type", value)}
                          error={activeNewMaterialError?.type}
                          activeTabIndex={index1}
                          width={255}
                          height={55}
                        />
                        {activeNewMaterialData?.pole && (
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
                              {
                                value: "15/(20/20)/15",
                                label: "15/(20/20)/15",
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
                                value: "15/(50/50)/15",
                                label: "15/(50/50)/15",
                              },
                              {
                                value: "20/(20/20)/20",
                                label: "20/(20/20)/20",
                              },
                              {
                                value: "20/(25/25)/20",
                                label: "20/(25/25)/20",
                              },
                              {
                                value: "20/(30/30)/20",
                                label: "20/(30/30)/20",
                              },
                              {
                                value: "20/(40/40)/20",
                                label: "20/(40/40)/20",
                              },
                              {
                                value: "20/(50/50)/20",
                                label: "20/(50/50)/20",
                              },
                              {
                                value: "30/(30/30)/30",
                                label: "30/(30/30)/30",
                              },
                              { value: "20/20/20/20", label: "20/20/20/20" },
                              { value: "20/30/30/20", label: "20/30/30/20" },
                              { value: "30/20/20/30", label: "30/20/20/30" },
                              { value: "30/30/30/30", label: "30/30/30/30" },
                              { value: "40/20/20/40", label: "40/20/20/40" },
                              { value: "40/30/30/40", label: "40/30/30/40" },
                              { value: "40/40/40/40", label: "40/40/40/40" },
                            ]}
                            selectedValue={activeNewMaterialData?.amp}
                            onChange={(value) => updateItemData("amp", value)}
                            error={activeNewMaterialError?.amp}
                            activeTabIndex={index1}
                            width={255}
                            height={55}
                          />
                        )}
                      </div>
                    )}
                    {/* </div>
                    )} */}

                    {[
                      "switches",
                      "three-way-switches",
                      "four-way-switches",
                    ].includes(activeNewMaterialData?.selectedItem) && (
                      <div className=" flex flex-row justify-between items-center w-[577px] bg-transparent">
                        {/* Bar 2: Brand selection for switches using RadioGroup */}
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
                            onChange={(value) => updateItemData("style", value)}
                            error={activeNewMaterialError?.style}
                            activeTabIndex={index1}
                            width={158}
                            height={55}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {addAttributeVariable?.map((addAttri, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-between items-center w-full gap-y-1 bg-transparent"
                  >
                    <div className="flex flex-col justify-between items-center w-full  gap-y-8 bg-transparent">
                      {/* Bar 1: Dropdown for item selection */}

                      <SearchLinkToggle
                        selectedValue={addAttri?.selectedItem}
                        onSearchChange={(value) =>
                          updateAddAttributeData("selectedItem", value, index)
                        }
                        prevVal={addAttri?.selectedItem}
                        error={""}
                        activeTabIndex={index1}
                      />

                      <NotesInput
                        value={addAttri?.note}
                        onChange={(value) =>
                          updateAddAttributeData("note", value, index)
                        }
                      />

                      <div className="flex flex-row justify-center items-center w-full gap-y-4 bg-transparent">
                        {addAttri?.selectedItem.toLowerCase() === "outlet" && (
                          <div className=" flex flex-row justify-between items-center w-[577px] bg-transparent">
                            {/* Bar 2: Brand selection using RadioGroup */}
                            <Dropdown
                              label="Select Brand*"
                              options={[
                                { value: "Leviton", label: "Leviton" },
                                { value: "LeGrand", label: "LeGrand" },
                                { value: "Lutron", label: "Lutron" },
                              ]}
                              selectedValue={addAttri?.brand}
                              onChange={(value) =>
                                updateAddAttributeData("brand", value, index)
                              }
                              error={""}
                              activeTabIndex={index1}
                              width={259}
                              height={55}
                            />

                            {/* Bar 3: Style selection using RadioGroup */}
                            {addAttri?.brand && (
                              <Dropdown
                                label="Select Style*"
                                options={[
                                  { value: "Decora", label: "Decora" },
                                  { value: "Duplex", label: "Duplex" },
                                ]}
                                selectedValue={addAttri?.style}
                                onChange={(value) =>
                                  updateAddAttributeData("style", value, index)
                                }
                                error={""}
                                activeTabIndex={index1}
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
                        ].includes(addAttri?.selectedItem) && (
                          <div className=" flex flex-col justify-between items-start gap-4 w-[577px] bg-transparent">
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
                              selectedValue={addAttri?.brand}
                              onChange={(value) =>
                                updateAddAttributeData("brand", value, index)
                              }
                              error={""}
                              activeTabIndex={index1}
                              width={336}
                              height={55}
                            />

                            <Dropdown
                              label="Select Use*"
                              options={[
                                { value: "Standard", label: "Standard" },
                                {
                                  value: "Main Breaker",
                                  label: "Main Breaker",
                                },
                                { value: "AFCI", label: "AFCI" },
                                { value: "GFCI", label: "GFCI" },
                                { value: "AFCI/GFCI", label: "AFCI/GFCI" },
                              ]}
                              selectedValue={addAttri?.use}
                              onChange={(value) => updateAddAttributeData("use", value, index)}
                              error={""}
                              activeTabIndex={index1}
                              width={255}
                              height={55}
                            />

                           {(addAttri?.brand !== "Siemens" || addAttri?.use !=="Main Breaker") &&  <Dropdown
                              label="Select Version*"
                              options={
                                [
                                
                                { value: "Homeline", label: "Homeline" },
                                { value: "QO", label: "QO" },
                                { value: "x", label: "x" },
                              ]
                            }
                              selectedValue={addAttri?.version}
                              onChange={(value) =>
                                updateAddAttributeData("version", value, index)
                              }
                              error={""}
                              activeTabIndex={index1}
                              width={255}
                              height={55}
                            />}
                            {/* {addAttri?.brand && (
                              <div className=" flex flex-row justify-between items-center w-full bg-transparent"> */}
                                <Dropdown
                                  label="Select Pole*"
                                  options={[
                                    {
                                      value: "Single Pole",
                                      label: "Single Pole",
                                    },
                                    { value: "2-Pole", label: "2-Pole" },
                                    { value: "3-Pole", label: "3-Pole" },
                                  ]}
                                  selectedValue={addAttri?.pole}
                                  onChange={(value) =>
                                    updateAddAttributeData("pole", value, index)
                                  }
                                  error={""}
                                  activeTabIndex={index1}
                                  width={255}
                                  height={55}
                                />
                                <Dropdown
                                  label="Select Neutral*"
                                  options={
                                    addAttri?.use === "Main Breaker"?[
                                      { value: "Snap-On", label: "Snap-On" },
                                      { value: "x", label: "x" },
                                    ]:
                                      [
                                      { value: "Snap-On", label: "Snap-On" },
                                      { value: "Pig-Tail", label: "Pig-Tail" },
                                      { value: "x", label: "x" },
                                    ]
                                }
                                  selectedValue={addAttri?.neutral}
                                  onChange={(value) =>
                                    updateAddAttributeData("neutral", value, index)
                                  }
                                  error={""}
                                  activeTabIndex={index1}
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
                                  selectedValue={addAttri?.type}
                                  onChange={(value) =>
                                    updateAddAttributeData("type", value, index)
                                  }
                                  error={""}
                                  activeTabIndex={index1}
                                  width={255}
                                  height={55}
                                />
                                {addAttri?.pole && (
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
                                      {
                                        value: "15/(20/20)/15",
                                        label: "15/(20/20)/15",
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
                                        value: "15/(50/50)/15",
                                        label: "15/(50/50)/15",
                                      },
                                      {
                                        value: "20/(20/20)/20",
                                        label: "20/(20/20)/20",
                                      },
                                      {
                                        value: "20/(25/25)/20",
                                        label: "20/(25/25)/20",
                                      },
                                      {
                                        value: "20/(30/30)/20",
                                        label: "20/(30/30)/20",
                                      },
                                      {
                                        value: "20/(40/40)/20",
                                        label: "20/(40/40)/20",
                                      },
                                      {
                                        value: "20/(50/50)/20",
                                        label: "20/(50/50)/20",
                                      },
                                      {
                                        value: "30/(30/30)/30",
                                        label: "30/(30/30)/30",
                                      },
                                      {
                                        value: "20/20/20/20",
                                        label: "20/20/20/20",
                                      },
                                      {
                                        value: "20/30/30/20",
                                        label: "20/30/30/20",
                                      },
                                      {
                                        value: "30/20/20/30",
                                        label: "30/20/20/30",
                                      },
                                      {
                                        value: "30/30/30/30",
                                        label: "30/30/30/30",
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
                                    ]}
                                    selectedValue={addAttri?.amp}
                                    onChange={(value) =>
                                      updateAddAttributeData(
                                        "amp",
                                        value,
                                        index
                                      )
                                    }
                                    error={""}
                                    activeTabIndex={index1}
                                    width={255}
                                    height={55}
                                  />
                                )}
                              {/* </div> */}
                            {/* )} */}
                          </div>
                        )}

                        {[
                          "switches",
                          "three-way-switches",
                          "four-way-switches",
                        ].includes(addAttri?.selectedItem.toLowerCase()) && (
                          <div className=" flex flex-row justify-between items-center w-[577px] bg-transparent">
                            {/* Bar 2: Brand selection for switches using RadioGroup */}
                            <Dropdown
                              label="Select Brand*"
                              options={[
                                { value: "Leviton", label: "Leviton" },
                                { value: "LeGrand", label: "LeGrand" },
                                { value: "Lutron", label: "Lutron" },
                              ]}
                              selectedValue={addAttri?.brand}
                              onChange={(value) =>
                                updateAddAttributeData("brand", value, index)
                              }
                              error={""}
                              activeTabIndex={index1}
                              width={259}
                              height={55}
                            />

                            {/* Bar 3: Style selection for switches using RadioGroup */}
                            {addAttri?.brand && (
                              <Dropdown
                                label="Select Style*"
                                options={[
                                  { value: "Toggle", label: "Toggle" },
                                  { value: "Rocker", label: "Rocker" },
                                ]}
                                selectedValue={addAttri?.style}
                                onChange={(value) =>
                                  updateAddAttributeData("style", value, index)
                                }
                                error={""}
                                activeTabIndex={index1}
                                width={158}
                                height={55}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className="flex justify-center items-center text-[#00000080] dark:text-white text-[12px] font-[400] leading-[11.94px] w-[577px] h-[30px] rounded-[8px] bg-[#f8989833] cursor-pointer"
                      onClick={() => handleRemoveAttribute(index)}
                    >
                      - Remove Attribute
                    </div>
                  </div>
                ))}

                <div
                  className="flex justify-center items-center text-[#00000080] dark:text-white text-[12px] font-[400] leading-[11.94px] w-[577px] h-[30px] rounded-[8px] bg-[#99E8FF33] cursor-pointer"
                  onClick={handleAddAttribute}
                >
                  + Add Attribute
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

export default EditAddAttributePopUp;
