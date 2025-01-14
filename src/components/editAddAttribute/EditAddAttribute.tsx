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
    { selectedItem: string; brand: string; style: string }[]
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
    key: keyof { selectedItem: string; brand: string; style: string },
    value: any,
    index:number

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
      updated.push({ selectedItem: "", brand: "", style: "" });
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
                  <Dropdown
                    label="Select Item Type*"
                    options={[
                      { value: "outlet", label: "Outlet" },
                      { value: "Breakers", label: "Breakers" },
                      { value: "Cover Plates", label: "Cover Plates" },
                      { value: "Exterior Boxes", label: "Exterior Boxes" },
                      { value: "Boxes", label: "Boxes" },
                      { value: "Panels", label: "Panels" },
                      { value: "Conduit", label: "Conduit" },
                      { value: "Wire", label: "Wire" },
                      { value: "Romex", label: "romex" },
                      {
                        value: "Miscellaneous Material",
                        label: "Miscellaneous Material",
                      },
                      { value: "Wirenuts", label: "Wirenuts" },
                      { value: "switches", label: "Switches" },
                      {
                        value: "three-way-switches",
                        label: "Three-Way Switches",
                      },
                      {
                        value: "four-way-switches",
                        label: "Four-Way Switches",
                      },
                      { value: "15amp Breaker", label: "15amp Breaker" },
                      { value: "20amp Breaker", label: "20amp Breaker" },
                      { value: "30amp Breaker", label: "30amp Breaker" },
                      { value: "40amp Breaker", label: "40amp Breaker" },
                      { value: "50amp Breaker", label: "50amp Breaker" },
                    ]}
                    selectedValue={activeNewMaterialData?.selectedItem}
                    onChange={(value) => updateItemData("selectedItem", value)}
                    error={activeNewMaterialError?.selectedItem}
                    activeTabIndex={index1}
                    width={577}
                    height={55}
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
                      </div>
                    )}

                    {[
                      "15amp Breaker",
                      "20amp Breaker",
                      "30amp Breaker",
                      "40amp Breaker",
                      "50amp Breaker",
                    ].includes(activeNewMaterialData?.selectedItem) && (
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
                          selectedValue={activeNewMaterialData?.brand}
                          onChange={(value) => updateItemData("brand", value)}
                          error={activeNewMaterialError?.brand}
                          activeTabIndex={index1}
                          width={336}
                          height={55}
                        />
                        <div className=" flex flex-row justify-between items-center w-full bg-transparent">
                          <Dropdown
                            label="Select Pole*"
                            options={[
                              { value: "Single Pole", label: "Single Pole" },
                              { value: "2-Pole", label: "2-Pole" },
                              { value: "3-Pole", label: "3-Pole" },
                            ]}
                            selectedValue={activeNewMaterialData?.style}
                            onChange={(value) => updateItemData("style", value)}
                            error={activeNewMaterialError?.style}
                            activeTabIndex={index1}
                            width={255}
                            height={55}
                          />
                          <Dropdown
                            label="D/General Electric*"
                            options={[
                              { value: " Standard", label: " Standard" },
                              { value: "GFCI", label: "GFCI" },
                              { value: "AFCI", label: "AFCI" },
                            ]}
                            selectedValue={activeNewMaterialData?.style}
                            onChange={(value) => updateItemData("style", value)}
                            error={activeNewMaterialError?.style}
                            activeTabIndex={index1}
                            width={255}
                            height={55}
                          />
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
                      <Dropdown
                        label="Select Item Type*"
                        options={[
                          { value: "outlet", label: "Outlet" },
                          { value: "Breakers", label: "Breakers" },
                          { value: "Cover Plates", label: "Cover Plates" },
                          { value: "Exterior Boxes", label: "Exterior Boxes" },
                          { value: "Boxes", label: "Boxes" },
                          { value: "Panels", label: "Panels" },
                          { value: "Conduit", label: "Conduit" },
                          { value: "Wire", label: "Wire" },
                          { value: "Romex", label: "romex" },
                          {
                            value: "Miscellaneous Material",
                            label: "Miscellaneous Material",
                          },
                          { value: "Wirenuts", label: "Wirenuts" },
                          { value: "switches", label: "Switches" },
                          {
                            value: "three-way-switches",
                            label: "Three-Way Switches",
                          },
                          {
                            value: "four-way-switches",
                            label: "Four-Way Switches",
                          },
                          { value: "15amp Breaker", label: "15amp Breaker" },
                          { value: "20amp Breaker", label: "20amp Breaker" },
                          { value: "30amp Breaker", label: "30amp Breaker" },
                          { value: "40amp Breaker", label: "40amp Breaker" },
                          { value: "50amp Breaker", label: "50amp Breaker" },
                        ]}
                        selectedValue={addAttri?.selectedItem}
                        onChange={(value) =>
                          updateAddAttributeData("selectedItem", value, index)
                        }
                        error={""}
                        activeTabIndex={index1}
                        width={577}
                        height={55}
                      />

                      <div className="flex flex-row justify-center items-center w-full gap-y-4 bg-transparent">
                        {addAttri?.selectedItem === "outlet" && (
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
                          </div>
                        )}

                        {[
                          "15amp Breaker",
                          "20amp Breaker",
                          "30amp Breaker",
                          "40amp Breaker",
                          "50amp Breaker",
                        ].includes(addAttri?.selectedItem) && (
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
                              selectedValue={addAttri?.brand}
                              onChange={(value) =>
                                updateAddAttributeData("brand", value, index)
                              }
                              error={""}
                              activeTabIndex={index1}
                              width={336}
                              height={55}
                            />
                            <div className=" flex flex-row justify-between items-center w-full bg-transparent">
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
                                selectedValue={addAttri?.style}
                                onChange={(value) =>
                                  updateAddAttributeData("style", value, index)
                                }
                                error={""}
                                activeTabIndex={index1}
                                width={255}
                                height={55}
                              />
                              <Dropdown
                                label="D/General Electric*"
                                options={[
                                  { value: " Standard", label: " Standard" },
                                  { value: "GFCI", label: "GFCI" },
                                  { value: "AFCI", label: "AFCI" },
                                ]}
                                selectedValue={addAttri?.style}
                                onChange={(value) =>
                                  updateAddAttributeData("style", value, index)
                                }
                                error={""}
                                activeTabIndex={index1}
                                width={255}
                                height={55}
                              />
                            </div>
                          </div>
                        )}

                        {[
                          "switches",
                          "three-way-switches",
                          "four-way-switches",
                        ].includes(addAttri?.selectedItem) && (
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
