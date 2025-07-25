import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LuAlignCenter, LuAlignLeft, LuAlignRight } from "react-icons/lu";
import { MdFormatListNumbered, MdArrowRight } from "react-icons/md";
import { HiListBullet } from "react-icons/hi2";
import { IoIosCheckmark } from "react-icons/io";
import { useAtom } from "jotai";
import {
  activeDropdownAtom,
  activeInnerDropdownAtom,
  activeProjectIdAtom,
  activeTabIndexAtom,
  colorChangeAtom,
  costCalculatorAtom,
  disableContractorClientSignaturesAtom,
  disableTaxAtom,
  disableTermsConAtom,
  disableTripChargeAtom,
  homeClickAtom,
  isEnterInvoiceAtom,
  printBillAtom,
  projectMaterialDetailsAtom,
  projectsAtom,
  searchTermAtom,
  SelectedProjectNameAtom,
  showDescriptionsColorPickerAtom,
  showLabelColorPickerAtom,
  showOutlineColorPickerAtom,
  showValueColorPickerAtom,
  zoomInOutAtom,
} from "../../variables/NavbarVariables";
import ColorPicker from "../colorPicker/ColorPicker";
import LightDarkThemeBtn from "../lightDarkTheme/lightDarkThemeBtn";
import BreakDownSwitch from "../breakDownSwitch/BreakDownSwitch";
import {
  billLogoImageDataAtom,
  clientContractorAtom,
  clientContractorErrorsAtom,
  clientErrorsAtom,
  clientFormDataAtom,
  errorsAtom,
  formDataAtom,
  invoiceBillSelectAtom,
  isExistingProjectAtom,
  itemErrorsAtom,
  itemSelectionDataAtom,
  labourErrorsAtom,
  labourStateAtom,
  materialSectionStepsAtom,
  newMaterialIndexAtom,
  newMaterialVariableAtom,
  newMaterialVariableErrorAtom,
  openAddNewMaterialAtom,
  taxRateAtom,
  termConditionAtom,
  tripChargeAtom,
  tripChargeErrorAtom,
} from "../../variables/electricalInvoiceVariable";
import {
  breakDownAtom,
  invoiceSelectAtom,
  progressAtom,
  stepsAtom,
} from "../../variables/Home";
import { toast } from "react-toastify";

interface ElectronAPI {
  minimizeWindow: () => void;
  toggleMaximizeWindow: () => void;
  closeWindow: () => void;
  printInvoice: () => void;
}

const Navbar: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const [projects, setProjects] = useAtom(projectsAtom);
  const [isEnterInvoice, setISEnterInvoice] = useAtom(isEnterInvoiceAtom);
  const [activeProjectId, setActiveProjectId] = useAtom(activeProjectIdAtom);

  const [activeDropdown, setActiveDropdown] = useAtom(activeDropdownAtom);
  const [activeInnerDropdown, setActiveInnerDropdown] = useAtom(
    activeInnerDropdownAtom
  );

  const [zoomLevel] = useAtom(zoomInOutAtom); // Default zoom level is 100%
  const [printBill, setPrintBill] = useAtom(printBillAtom);
  const [invoiceSelect, setInvoiceSelect] = useAtom(invoiceSelectAtom);

  const [stepsData, setStepsData] = useAtom(stepsAtom);
  const [progress, setProgress] = useAtom(progressAtom);

  const [disableTripCharge, setDisableTripCharge] = useAtom(
    disableTripChargeAtom
  );
  const [disableTax, setDisableTax] = useAtom(disableTaxAtom);
  const [disableTermsCon, setDisableTermsCon] = useAtom(disableTermsConAtom);
  const [
    disableContractorClientSignatures,
    setDisableContractorClientSignatures,
  ] = useAtom(disableContractorClientSignaturesAtom);
  const [costCalculator, setCostCalculator] = useAtom(costCalculatorAtom);
  const [, setProjectMaterialDetails] = useAtom(projectMaterialDetailsAtom);

  const [showLabalColorPicker, setShowLabalColorPicker] = useAtom(
    showLabelColorPickerAtom
  );
  const [showValueColorPicker, setShowValueColorPicker] = useAtom(
    showValueColorPickerAtom
  );
  const [showOutlineColorPicker, setShowOutlineColorPicker] = useAtom(
    showOutlineColorPickerAtom
  );
  const [showDescriptionsColorPicker, setShowDescriptionsColorPicker] = useAtom(
    showDescriptionsColorPickerAtom
  );

  const [colorChange, setColorChange] = useAtom(colorChangeAtom);

  const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);
  const [panels, setPanels] = useState<
    { id: number; title: string; x: number; y: number }[]
  >([]);
  const [activeTabIndex, setActiveTabIndex] = useAtom(activeTabIndexAtom);
  const [, SetSelectedProjectName] = useAtom(SelectedProjectNameAtom);

  //breakdown variable
  const [breakDown, setBreakDown] = useAtom(breakDownAtom);

  const [formData, setFormData] = useAtom(formDataAtom);
  const [errors, setErrors] = useAtom(errorsAtom);

  const [clientFormData, setClientFormData] = useAtom(clientFormDataAtom);
  const [clientErrors, setClientErrors] = useAtom(clientErrorsAtom);

  const [itemSelectionData, setItemSelectionData] = useAtom(
    itemSelectionDataAtom
  );
  const [itemErrors, setItemErrors] = useAtom(itemErrorsAtom);

  const [labourStateVariable, setLabourStateVariable] =
    useAtom(labourStateAtom);
  const [labourErrors, setLabourErrors] = useAtom(labourErrorsAtom);
  const [tripCharge, setTripCharge] = useAtom(tripChargeAtom);
  const [tripChargeError, setTripChargeError] = useAtom(tripChargeErrorAtom);
  const navigate = useNavigate();

  const [taxRate, setTaxRate] = useAtom(taxRateAtom);

  const [termsCondition, setTermsConditions] = useAtom(termConditionAtom);

  const [homeClick, setHomeClick] = useAtom(homeClickAtom);

  const [clientContractorData, setClientContractorData] =
    useAtom(clientContractorAtom);
  const [clientContractorErrors, setClientContractorErrors] = useAtom(
    clientContractorErrorsAtom
  );

  const [newMaterial, setNewMaterial] = useAtom(newMaterialVariableAtom);
  const [newMaterialError, setNewMaterialError] = useAtom(
    newMaterialVariableErrorAtom
  );
  const [newMaterialIndex, setNewMaterialIndex] = useAtom(newMaterialIndexAtom);

  const [isRename, setIsRename] = useState(false);
  const [newName, setNewName] = useState("");

  const [openAddNewMaterial, setOpenAddNewMaterial] = useAtom(
    openAddNewMaterialAtom
  );

  const [isExistingProjectVariable, setIsExistingProjectVariable] = useAtom(
    isExistingProjectAtom
  );

  const [materialSectionSteps, setMaterialSectionSteps] = useAtom(
    materialSectionStepsAtom
  );

  const [invoiceBillSelect, setInvoiceBillSelect] = useAtom(
    invoiceBillSelectAtom
  );
  const [billLogoImageData, setBillLogoImageData] = useAtom(
    billLogoImageDataAtom
  );

  // Add a new project
  const addNewProject = () => {
    const newProjectId = projects.length;
    // console.log(newProjectId)

    setProjects([
      ...projects,
      { name: `Untitled - Project ${newProjectId + 1}`, id: newProjectId },
    ]);

    // const usedNumbers = projects
    //   .map((p) => {
    //     const match = p.name.match(/Untitled - Project (\d+)/);
    //     return match ? parseInt(match[1]) : null;
    //   })
    //   .filter((n): n is number => n !== null)
    //   .sort((a, b) => a - b);

    // let newProjectNumber = 1;
    // for (let i = 0; i < usedNumbers.length; i++) {
    //   if (usedNumbers[i] !== i + 1) {
    //     newProjectNumber = i + 1;
    //     break;
    //   }
    //   newProjectNumber = usedNumbers.length + 1;
    // }

    // const newProjectName = `Untitled - Project ${newProjectNumber}`;
    // const newProjectId = Date.now(); // unique ID

    // setProjects([...projects, { name: newProjectName, id: newProjectId }]);

    // Followed by rest of atoms: formData, errors, etc.

    setPrintBill([
      ...printBill,
      {
        selectedPrintBill: false,
      },
    ]);
    setBillLogoImageData([
      ...billLogoImageData,
      {
        billLogoImage: null,
      },
    ]);
    setInvoiceBillSelect([
      ...invoiceBillSelect,
      Array(11).fill({
        selectedBillInvoice: "BillLayout3",
        selectedBillImage: "bill3",
      }), // adjust array size if you support more tabs
    ]);

    //invoice selction
    setInvoiceSelect([
      ...invoiceSelect,
      { selectedInvoice: "Electrical Invoice" },
    ]);

    // navbar color picker
    setColorChange([
      ...colorChange,
      {
        labelColor: "#00000099",
        outlineColor: "#000000E5",
        valuesColor: "#FFEA00",
        descriptionsColor: "#00FF11",
      },
    ]);

    // homeClick
    setHomeClick([
      ...homeClick,
      {
        elctronicHomeClick: false,
      },
    ]);

    //steps
    setStepsData([
      ...stepsData,
      {
        electricalSteps: 1,
      },
    ]);

    //progress
    setProgress([
      ...progress,
      {
        progress: Math.ceil(100 / 9),
      },
    ]);

    // break down
    setBreakDown([
      ...breakDown,
      {
        labourBreakDown: false,
        materialBreakDown: false,
        tripChargeBreakDown: false,
      },
    ]);

    //form data
    setFormData([
      ...formData,
      {
        dateOfIssue: "",
        companyName: "",
        phoneNumber: "",
        countryCode: "+1",
        email: "",
        companyLogo: null,
      },
    ]);
    setErrors([
      ...errors,
      {
        dateOfIssue: "",
        companyName: "",
        phoneNumber: "",
        email: "",
        companyLogo: "",
      },
    ]);

    //client details data
    setClientFormData([
      ...clientFormData,
      {
        clientName: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
      },
    ]);

    setClientErrors([
      ...clientErrors,
      {
        clientName: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
      },
    ]);

    //item selection data

    setItemSelectionData([
      ...itemSelectionData,
      {
        selectedItem: "",
        brand: "",
        style: "",
        quantity: 1,
        color: "",
        pole: "",
        use: "",
        version: "",
        neutral: "",
        type: "",
        amp: "",
        note: "",
        materialLink: "",
        commissionType: "",
        commissionValue: "",
        linkPoductType: "",
        productLinkAmount: "0",
        isCommission: false,
        productDetails: {
          price: "",
        },
      },
    ]);

    setItemErrors([
      ...itemErrors,
      {
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
        materialLink: "",
        amp: "",
        commissionType: "",
        commissionValue: "",
      },
    ]);

    // labour data
    setLabourStateVariable([
      ...labourStateVariable,
      {
        labourSelectedVal: "",
        labourType: "Uniform",
        labourHour: "0",
        contContractorRate: "",
        employeesNo: "0",
        employeesRate: "",
        uniformScopeWork: "",
        hourlyRateScopeWork: "",
        materialCostVal: "Yes",
        uniformProjectAmount: "0",
        variableContRatePerHour: "",
        variableContTotHourRate: "",
        projectAmountQuantityVal: "",
        variableAddEmployees: [{ name: "", hours: 0, rate: 0 }],
      },
    ]);

    setLabourErrors([
      ...labourErrors,
      {
        labourType: "",
        labourSelectedVal: "",
        labourHour: "",
        contContractorRate: "",
        employeesNo: "",
        employeesRate: "",
        uniformScopeWork: "",
        uniformProjectAmount: "",
        variableContTotHourRate: "",
        variableAddEmployees: "",
        materialCostVal: "",
        hourlyRateScopeWork: "",
        variableContRatePerHour: "",
        projectAmountQuantityVal: "",
      },
    ]);

    // TripCharge data
    setTripCharge([
      ...tripCharge,
      {
        tripChargeVal: "",
        isStandardCost: false,
        isCalculateCost: false,
        amountPerMiles: "",
        traveledMiles: "",
        totalMilesAmount: "00.00",
      },
    ]);

    setTripChargeError([
      ...tripChargeError,
      {
        tripChargeVal: "",
        amountPerMiles: "",
        traveledMiles: "",
      },
    ]);

    //taxRate data
    setTaxRate([...taxRate, { tax: "" }]);

    //term and conditions data
    setTermsConditions([...termsCondition, { termAndCondition: "" }]);

    // Client Contractor Data
    setClientContractorData([
      ...clientContractorData,
      {
        contractorNameValue: "",
        contractDateValue: "",
        contractorSignFile: null,
        contractorSign: "",
        clientNameValue: "",
        clientDateValue: "",
        clientSignFile: null,
        clientSign: "",
        sign: "No",
      },
    ]);

    setClientContractorErrors([
      ...clientContractorErrors,
      {
        contractorNameValue: "",
        contractDateValue: "",
        contractorSign: "",
        contractorSignFile: "",
        clientNameValue: "",
        clientDateValue: "",
        clientSign: "",
        clientSignFile: "",
        sign: "",
      },
    ]);

    setMaterialSectionSteps([
      ...materialSectionSteps,
      {
        materialSectionStepsCount: 0,
      },
    ]);

    // add new Material.
    setNewMaterial([...newMaterial, []]);
    setNewMaterialError([...newMaterialError, []]);
    setNewMaterialIndex([...newMaterialIndex, { activeNewMaterialIndex: 0 }]);
    setOpenAddNewMaterial([
      // ...openAddNewMaterial,
      { openAddNewMaterialPopUp: false },
    ]);
    setIsExistingProjectVariable([
      ...isExistingProjectVariable,
      {
        isExistingProject: false,
      },
    ]);
    // const newActiveTabIndex = projects.length;
    setActiveTabIndex(newProjectId); // New tab index

    setActiveProjectId(newProjectId); // Make the new project active
    navigate(`/project/${newProjectId}`);
  };

  // Select a project
  const selectProject = (id: number) => {
    setActiveProjectId(id);
    setActiveTabIndex(id);
  };
  // console.log("activeTabIndex", activeTabIndex);
  // console.log("activeProjectId", activeProjectId);

  // Remove a project
  const removeProject = (id: number) => {
    const updatedProjects = projects.filter((project) => project.id !== id);
    const updatedColorPickerData = colorChange.filter(
      (data, index) => index != id
    );
    const updatedFromData = formData.filter((data, index) => index != id);
    const updatedBreakDown = breakDown.filter((data, index) => index != id);
    const updatedClientFromData = clientFormData.filter(
      (data, index) => index != id
    );
    const updatedItemData = itemSelectionData.filter(
      (data, index) => index != id
    );
    const updatedLabourData = labourStateVariable.filter(
      (data, index) => index != id
    );
    const updatedTripChargeData = tripCharge.filter(
      (data, index) => index != id
    );
    const updatedTaxRateData = taxRate.filter((data, index) => index != id);
    const updatedTermAndConditionData = termsCondition.filter(
      (data, index) => index != id
    );
    const updatedClientContractorData = clientContractorData.filter(
      (data, index) => index != id
    );
    const updatedSelectedInvoice = invoiceSelect.filter(
      (data, index) => index != id
    );
    const updatedAddNewMaterial = newMaterial.filter(
      (data, index) => index != id
    );
    const updatedOpenAddNewMaterial = openAddNewMaterial.filter(
      (data, index) => index != id
    );
    const updatedAddNewMaterialIndex = newMaterialIndex.filter(
      (data, index) => index != id
    );
    const updatedIsExistingProject = isExistingProjectVariable.filter(
      (data, index) => index != id
    );
    const updatedProgress = progress.filter((data, index) => index != id);
    const updatedHomeClick = homeClick.filter((data, index) => index != id);
    const updatedPrintBillVariable = printBill.filter(
      (data, index) => index != id
    );
    const updatedInvoiceBillSelect = invoiceBillSelect.filter(
      (data, index) => index != id
    );
    const updatedBillLogoImageData = billLogoImageData.filter(
      (data, index) => index != id
    );
    setHomeClick(updatedHomeClick); //homeClick data
    setBreakDown(updatedBreakDown); //breakdown data
    setColorChange(updatedColorPickerData); //homeClick data
    setInvoiceSelect(updatedSelectedInvoice); //invoice selction data
    setProgress(updatedProgress); //progress data
    setFormData(updatedFromData); //from data
    setClientFormData(updatedClientFromData); // client form data
    setItemSelectionData(updatedItemData); // item selection form data
    setLabourStateVariable(updatedLabourData); // labour selection data
    setTripCharge(updatedTripChargeData); // Trip charge data
    setTaxRate(updatedTaxRateData); //taxRate data
    setTermsConditions(updatedTermAndConditionData); // term and condition data
    setClientContractorData(updatedClientContractorData); // Client contractor data
    setNewMaterial(updatedAddNewMaterial);
    setOpenAddNewMaterial(updatedOpenAddNewMaterial);
    setNewMaterialIndex(updatedAddNewMaterialIndex);
    setIsExistingProjectVariable(updatedIsExistingProject);
    setActiveTabIndex(updatedProjects.length);
    setProjects(updatedProjects);
    setPrintBill(updatedPrintBillVariable);
    setInvoiceBillSelect(updatedInvoiceBillSelect);
    setBillLogoImageData(updatedBillLogoImageData);

    // If the active project is removed, set the active project to null or the first available project
    if (activeProjectId === id) {
      const newActiveProjectId =
        updatedProjects.length > 0 ? updatedProjects[0].id : null;
      setActiveProjectId(newActiveProjectId);
      if (newActiveProjectId) {
        navigate(`/project/${newActiveProjectId}`);
      } else {
        navigate("/");
      }
    }
  };

  // const [isDragging, setIsDragging] = useState<number | null>(null);
  // const [panelPosition, setPanelPosition] = useState({ x: 50, y: 50 });
  // const panelRef = useRef<HTMLDivElement>(null);

  // Local Storage Effect
  useEffect(() => {
    const savedPanels = localStorage.getItem("panels");
    if (savedPanels) {
      setPanels(JSON.parse(savedPanels));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("panels", JSON.stringify(panels));
  }, [panels]);

  // Panel Functions
  // const addPanel = () => {
  //   const newPanel = {
  //     id: panels.length + 1,
  //     title: `Panel ${panels.length + 1}`,
  //     x: 100 + panels.length * 30,
  //     y: 100 + panels.length * 30,
  //   };
  //   setPanels((prev) => [...prev, newPanel]);
  // };

  // const handleMouseDown = (id: number) => setIsDragging(id);
  // const handleMouseMove = (e: React.MouseEvent) => {
  //   if (isDragging !== null) {
  //     setPanels((prev) =>
  //       prev.map((panel) =>
  //         panel.id === isDragging
  //           ? { ...panel, x: e.clientX - 100, y: e.clientY - 20 }
  //           : panel
  //       )
  //     );
  //   }
  // };
  // const handleMouseUp = () => setIsDragging(null);

  // useEffect(() => {
  //   const stopDragging = () => setIsDragging(null);
  //   window.addEventListener("mouseup", stopDragging);
  //   return () => window.removeEventListener("mouseup", stopDragging);
  // }, []);

  // Window Action Handler

  const handleWindowAction = (action: "minimize" | "maximize" | "close") => {
    const actionMap: {
      [key in "minimize" | "maximize" | "close"]: keyof ElectronAPI;
    } = {
      minimize: "minimizeWindow",
      maximize: "toggleMaximizeWindow",
      close: "closeWindow",
    };

    // Use the mapped action to call the correct function
    window.electron[actionMap[action]]();
  };

  // Dropdown Toggle Handler
  const toggleDropdown = (menu: string) => {
    setActiveDropdown((prev: string | null) => (prev === menu ? null : menu));
    setIsRename(false);
  };
  const toggleInnerDropdown = (menu: string) => {
    setActiveInnerDropdown((prev: string | null) =>
      prev === menu ? null : menu
    );
  };

  // Color Picker Handler
  // const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setColor(event.target.value);
  // };

  // Search Handler
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      console.log("Please enter a search query!");
      return;
    }
    // console.log(`Searching for: ${searchTerm}`);
    // console.log(searchTerm);
    setSearchTerm("");
    // console.log(searchTerm);
  };

  const handleRename = () => {
    if (newName && newName.trim()) {
      // Update the project name
      setProjects((prevProjects) => {
        return prevProjects.map((project, index) => {
          if (index === activeTabIndex) {
            return { ...project, name: newName };
          }
          return project;
        });
      });

      // console.log(`Project renamed to: ${newName}`);
    } else {
      console.log("Invalid name. Operation canceled.");
    }
  };

  // Drag Panel Logic
  // const handlePanelMouseDown = (e: React.MouseEvent) => {
  //   setIsDragging(1);
  // };

  // const handlePanelMouseUp = () => {
  //   setIsDragging(0);
  // };

  // const handlePanelMouseMove = (e: React.MouseEvent) => {
  //   if (isDragging && panelRef.current) {
  //     setPanelPosition({
  //       x: e.clientX - panelRef.current.offsetWidth / 2,
  //       y: e.clientY - panelRef.current.offsetHeight / 2,
  //     });
  //   }
  // };

  // Handle Dropdown Actions
  const handleFileDropdownAction = (op1: string, op2: string) => {
    // console.log(op1, op2);

    if (op1 === "Rename Invoice" || op2 === "F2") {
      setIsRename(true);
      // Prompt the user to enter a new project name
    }
    if (op1 === "Print" || op2 === "Ctrl+P") {
      setPrintBill((prev) => {
        const updated = [...prev];
        updated[activeTabIndex] = {
          ...updated[activeTabIndex],
          selectedPrintBill: true,
        };
        return updated;
      });
    }

    // switch (action) {
    //   case "Send PDF":
    //     alert("PDF sent!");
    //     break;
    //   case "Check for Updates":
    //     alert("Checking for updates...");
    //     break;
    //   case "Save":
    //     alert("Project saved!");
    //     break;
    //   default:
    //     alert(`Action: ${action}`);
    // }
  };

  const activeColorData = colorChange[activeTabIndex];
  const handelColorPickerAction = (
    key: keyof typeof activeColorData,
    value: string
  ) => {
    setColorChange((prev) => {
      const updated = [...prev];
      updated[activeTabIndex] = { ...updated[activeTabIndex], [key]: value };
      return updated;
    });
  };

  const handleSelectMaterialClick = (index1: number, index2: number) => {
    // console.log(index1, index2);
    navigate(`/project/selectMaterial?index1=${index1}&index2=${index2}`);
    setActiveDropdown(null);
  };

  const handleEditAddAttributeClick = (index1: number, index2: number) => {
    // console.log(index1, index2);
    navigate(`/project/EditAddAttribute?index1=${index1}&index2=${index2}`);
    setActiveDropdown(null);
  };

  const handleAddNewMaterial = () => {
    const newMaterialObject = {
      selectedItem: "",
      brand: "",
      style: "",
      quantity: 0,
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
    };

    setNewMaterial((prev) => {
      const updated = [...prev];

      // Check if the current active tab index exists; if not, initialize a new array
      if (!updated[activeTabIndex]) {
        updated[activeTabIndex] = [
          {
            selectedItem: "",
            brand: "",
            style: "",
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
          },
        ];
      }

      // Add the new material object to the current active tab's material list
      updated[activeTabIndex].push(newMaterialObject);

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
  };

  const handleEditDropdownAction = (op: string) => {
    //
    // console.log(op);
    if (op === "Add New Material") {
      handleAddNewMaterial();
      setOpenAddNewMaterial((prev) => {
        const updated = [...prev];
        updated[activeTabIndex] = {
          // openAddNewMaterialPopUp:!updated[activeTabIndex].openAddNewMaterialPopUp
          openAddNewMaterialPopUp: true,
        };
        return updated;
      });
      setTimeout(() => {
        setActiveDropdown(null);
      }, 300);
      // console.log(newMaterial);
    }
  };
  const handleViewDropdownAction = (op: string) => {
    //
    console.log(op);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F2") {
        toggleDropdown("File");
        setIsRename(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleGoToHome = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    console.log("goto home");
    navigate("/");
    setISEnterInvoice(false);
    setProjects([]);
    setStepsData([
      {
        electricalSteps: 1,
      },
    ]);
  };

  const handlePrint = () => {
    // try {
    //   console.log("print")
    //   // window.electron?.send("print-invoice");
    //   window.electron?.printInvoice();
    setPrintBill((prev) => {
      const updated = [...prev];
      updated[activeTabIndex] = {
        ...updated[activeTabIndex],
        selectedPrintBill: true,
      };
      return updated;
    });

    // } catch (error) {
    //   console.log("printPage",error)
    // }
    // navigate("/project/bill", { state: { shouldPrint: true } });
    // window.print();
    // if (window.electron?.ipcRenderer) {
    //   console.log(window.electron.send("print-invoice"))
    //   window.electron?.send("print-invoice");
    // } else {
    //   console.error("IPC renderer not available");
    // }
  };

  return (
    <div
      id="titlebar"
      className="no-print flex flex-col w-full bg-[#000000] dark:bg-custom-bgcl-gradient text-white "
    >
      {/* First Row */}
      <div className="flex justify-between w-full h-[44px] items-center px-4 py-2 ">
        {/* Left Side: Logo and Buttons */}
        <div className="flex flex-col items-center space-x-4 relative">
          <div
            id="navTopLeftBtn"
            className="flex flex-row items-center w-fit space-x-4 rounded-lg"
          >
            <div
              id="title"
              onClick={handleGoToHome}
              className="font-bold text-2xl cursor-pointer"
            >
              S
            </div>
            {["File", "Edit", "View", "Tools", "Share", "Help"].map((item) => (
              <div id={item} key={item} className="relative">
                <button
                  onClick={() => toggleDropdown(item)}
                  className="hover:underline focus:outline-none"
                >
                  {item}
                </button>
              </div>
            ))}

            <div className="absolute left-0">
              {/* {activeDropdown === item && ( */}
              <div
                className={`absolute mt-2 left-2 top-3 bg-[#F2F2F2] text-[16px] font-[400] rounded-[10px] border-[0.25px] border-solid border-[#000000] shadow-lg ${
                  activeDropdown === "File"
                    ? "z-50 opacity-100"
                    : "z-[-1] opacity-0"
                }`}
              >
                {/* {(item === "File") && ( */}
                <ul className="py-2 px-2 w-[246px] gap-2 text-primary rounded-[10px] bg-transparent">
                  {[
                    ["New Invoice", "Ctrl+N"],
                    ["Save", "Ctrl+S"],
                    ["Save As", "Shift+Ctrl+S"],
                    ["Rename Invoice", "F2"],
                    ["Export", "Ctrl+E"],
                    ["Print", "Ctrl+P"],
                  ].map((option, index) => (
                    <div
                      id={`f-option-${index}`}
                      key={index}
                      className=" relative"
                    >
                      <li
                        className="flex flex-row justify-between items-center px-4 py-2 hover:bg-[#00C5FF] text-[16px] font-[400] rounded-[10px] cursor-pointer"
                        onClick={() =>
                          handleFileDropdownAction(option[0], option[1])
                        }
                      >
                        <span>{option[0]}</span>
                        <span>{option[1]}</span>
                      </li>

                      {isRename && option[0] === "Rename Invoice" && (
                        <div className="flex justify-center items-center mt-1 m-auto rounded-[5px] w-fit border-[2px] border-black">
                          <input
                            type="text"
                            className=" outline-none p-1 border-1 rounded-[5px] border-black"
                            onChange={(e) => setNewName(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleRename();
                                setIsRename(false);
                              }
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </ul>
                {/* )} */}
              </div>
              <div
                className={`absolute mt-2 left-14 top-3 bg-[#F2F2F2] text-[16px] font-[400] rounded-[10px] border-[0.25px] border-solid border-[#000000] shadow-lg ${
                  activeDropdown === "Edit"
                    ? "z-50 opacity-100"
                    : "z-[-1] opacity-0"
                }`}
              >
                {/* {item === "Edit" && ( */}
                <ul className="py-2 px-2 w-[240px] gap-2 text-primary rounded-[10px] bg-transparent">
                  {[
                    "Add New Material",
                    "Select Existing Project",
                    "Select Material",
                    "Edit/Add Attribute",
                    ``,
                  ].map((option) => (
                    <li
                      key={option}
                      className="flex flex-row relative justify-between items-center text-primary px-4 py-2 hover:bg-[#00C5FF] text-[16px] font-[400] rounded-[10px] cursor-pointer"
                      onClick={() => handleEditDropdownAction(option)}
                    >
                      {option === "Add New Material" && <span>{option}</span>}
                      {option === "Select Existing Project" && (
                        <div
                          className=" relative flex flex-row justify-between items-center w-full bg-transparent cursor-pointer"
                          onClick={() => toggleInnerDropdown(option)}
                        >
                          <span>{option}</span>
                          <span>
                            <MdArrowRight />
                          </span>
                          {activeInnerDropdown === option && (
                            <div className="absolute left-[100%] top-0 mt-2 ml-6 bg-[#F2F2F2] text-[16px] font-[400] rounded-[10px] border-[0.25px] border-solid border-[#000000] shadow-lg z-50">
                              {
                                <ul className="py-2 px-2 w-[202px] gap-2 text-primary rounded-[10px] bg-transparent">
                                  {projects?.map((mat, index) => (
                                    <li
                                      key={index}
                                      onClick={() => {
                                        if (
                                          isExistingProjectVariable[
                                            activeTabIndex
                                          ]?.isExistingProject
                                        ) {
                                          selectProject(mat.id);
                                          navigate(`/project/${mat.id}`);
                                          if (
                                            homeClick[mat.id]?.elctronicHomeClick
                                          ) {
                                            navigate(
                                              "/project/existingPtoject"
                                            );
                                          }
                                        } else {
                                          toast.warning(
                                            "There is no existing project. Please select one.",
                                            {
                                              position: "bottom-right",
                                            }
                                          );
                                        }
                                        setActiveDropdown(null);
                                      }}
                                      className="flex flex-row justify-between items-center px-4 py-2 hover:bg-[#00C5FF] text-[16px] font-[400] rounded-[10px] cursor-pointer"
                                    >
                                      <span>{mat.name}</span>
                                    </li>
                                  ))}
                                </ul>
                              }
                            </div>
                          )}
                        </div>
                      )}
                      {option === "Select Material" && (
                        <div
                          className="flex flex-row justify-between items-center w-full bg-transparent cursor-pointer"
                          onClick={() => toggleInnerDropdown(option)}
                        >
                          <span>{option}</span>
                          <span>
                            <MdArrowRight />
                          </span>
                          {activeInnerDropdown === option && (
                            <div className="absolute left-[100%] top-0 mt-2 ml-2 bg-[#F2F2F2] text-[16px] font-[400] rounded-[10px] border-[0.25px] border-solid border-[#000000] shadow-lg z-50 max-h-80 overflow-y-scroll">
                              {projects?.map((project, ind) => (
                                <ul
                                  key={ind}
                                  className="py-2 px-2 w-[202px] gap-2 text-primary rounded-[10px] bg-transparent"
                                >
                                  <li className="flex w-full p-2">
                                    {project.name}
                                  </li>
                                  {newMaterial[project.id]?.map(
                                    (mat, index) => (
                                      <li
                                        key={index}
                                        className="flex flex-row justify-between items-center px-4 py-2 hover:bg-[#00C5FF] text-[16px] font-[400] rounded-[10px] cursor-pointer"
                                        onClick={() =>
                                          handleSelectMaterialClick(ind, index)
                                        }
                                      >
                                        <span>- Material {index + 1}</span>
                                      </li>
                                    )
                                  )}
                                </ul>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                      {option === "Edit/Add Attribute" && (
                        <div
                          className="flex flex-row justify-between items-center w-full bg-transparent cursor-pointer"
                          onClick={() => toggleInnerDropdown(option)}
                        >
                          <span>{option}</span>
                          <span>
                            <MdArrowRight />
                          </span>
                          {activeInnerDropdown === option && (
                            <div className="absolute left-[100%] top-0 mt-2 ml-2 bg-[#F2F2F2] text-[16px] font-[400] rounded-[10px] border-[0.25px] border-solid border-[#000000] shadow-lg z-50 max-h-80 overflow-y-scroll">
                              {projects?.map((project, ind) => (
                                <ul
                                  key={ind}
                                  className="py-2 px-2 w-[202px] gap-2 text-primary rounded-[10px] bg-transparent"
                                >
                                  <li className="flex w-full p-2">
                                    {project.name}
                                  </li>
                                  {newMaterial[project.id]?.map(
                                    (mat, index) => (
                                      <li
                                        key={index}
                                        className="flex flex-row justify-between items-center px-4 py-2 hover:bg-[#00C5FF] text-[16px] font-[400] rounded-[10px] cursor-pointer"
                                        onClick={() =>
                                          handleEditAddAttributeClick(
                                            ind,
                                            index
                                          )
                                        }
                                      >
                                        <span>- Material {index + 1}</span>
                                      </li>
                                    )
                                  )}
                                </ul>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
                {/* )} */}
              </div>
              <div
                className={`absolute mt-2 left-[6.5rem] top-3 bg-[#F2F2F2] text-[16px] font-[400] rounded-[10px] border-[0.25px] border-solid border-[#000000] shadow-lg ${
                  activeDropdown === "View"
                    ? "z-50 opacity-100"
                    : "z-[-1] opacity-0"
                }`}
              >
                {/* {item === "View" && ( */}
                <ul className="py-2 px-2 w-[345px] text-[16px] gap-2 text-primary rounded-[10px] bg-transparent">
                  {[
                    "Zoom",
                    "Layout",
                    "Disable Trip Charge",
                    "Disable Tax",
                    "Disable Terms& Con...",
                    "Disable Contractor/Client Signatures",
                  ].map((option, index) => (
                    <li
                      key={index}
                      className="flex flex-row justify-between items-center px-2 py-2 hover:bg-[#00C5FF] text-[16px] font-[400] rounded-[10px] cursor-pointer"
                      onClick={() => handleViewDropdownAction(option)}
                    >
                      {option === "Zoom" && (
                        <div
                          className="flex flex-row justify-between items-center text-[16px] w-full bg-transparent cursor-pointer"
                          // onClick={() => toggleInnerDropdown(option)}
                        >
                          <span>{option}</span>
                          <span>{zoomLevel}%</span>

                          <span className="flex justify-center items-center">
                            Ctrl + / -
                          </span>
                        </div>
                      )}

                      {option === "Layout" && (
                        <div
                          className="flex flex-row relative justify-between items-center text-[16px] w-full bg-transparent cursor-pointer"
                          onClick={() => toggleInnerDropdown(option)}
                        >
                          <span>{option}</span>
                          <span className="flex justify-center items-center">
                            <MdArrowRight />
                          </span>
                          {activeInnerDropdown === option && (
                            <div className="absolute left-[100%] top-0 ml-3 mt-2 bg-[#F2F2F2] text-[16px] font-[400] rounded-[10px] border-[0.25px] border-solid border-[#000000] shadow-lg z-50">
                              {
                                <ul className="py-2 px-2 w-[202px] gap-2 text-primary rounded-[10px] bg-transparent">
                                  {["Layout 1", "Layout 2", "Layout 3"].map(
                                    (mat, index) => (
                                      <li
                                        key={index}
                                        className="flex flex-row justify-between items-center px-4 py-2 hover:bg-[#00C5FF] text-[16px] font-[400] rounded-[10px] cursor-pointer"
                                      >
                                        <span>{mat}</span>
                                      </li>
                                    )
                                  )}
                                </ul>
                              }
                            </div>
                          )}
                        </div>
                      )}
                      {option === "Disable Trip Charge" && (
                        <div
                          className="flex flex-row relative justify-between items-center text-[16px] w-full bg-transparent cursor-pointer"
                          onClick={() => {
                            setActiveInnerDropdown(null);
                            setDisableTripCharge(!disableTripCharge);
                          }}
                        >
                          <span>{option}</span>
                          <span className="flex justify-center items-center text-[24px]">
                            {disableTripCharge && <IoIosCheckmark />}
                          </span>
                        </div>
                      )}
                      {option === "Disable Tax" && (
                        <div
                          className="flex flex-row relative justify-between items-center text-[16px] w-full bg-transparent cursor-pointer"
                          onClick={() => {
                            setActiveInnerDropdown(null);
                            setDisableTax(!disableTax);
                          }}
                        >
                          <span>{option}</span>
                          <span className="flex justify-center items-center text-[24px]">
                            {disableTax && <IoIosCheckmark />}
                          </span>
                        </div>
                      )}
                      {option === "Disable Terms& Con..." && (
                        <div
                          className="flex flex-row relative justify-between items-center text-[16px] w-full bg-transparent cursor-pointer"
                          onClick={() => {
                            setActiveInnerDropdown(null);
                            setDisableTermsCon(!disableTermsCon);
                          }}
                        >
                          <span>{option}</span>
                          <span className="flex justify-center items-center text-[24px]">
                            {disableTermsCon && <IoIosCheckmark />}
                          </span>
                        </div>
                      )}
                      {option === "Disable Contractor/Client Signatures" && (
                        <div
                          className="flex flex-row relative justify-between items-center text-[16px] w-full bg-transparent cursor-pointer"
                          onClick={() => {
                            setDisableContractorClientSignatures(
                              !disableContractorClientSignatures
                            );
                            setActiveInnerDropdown(null);
                          }}
                        >
                          <span>{option}</span>
                          <span className="flex justify-center items-center text-[24px]">
                            {disableContractorClientSignatures && (
                              <IoIosCheckmark />
                            )}
                          </span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
                {/* )} */}
              </div>
              <div
                className={`absolute mt-2 left-[9.5rem] top-3 bg-[#F2F2F2] text-[16px] font-[400] rounded-[10px] border-[0.25px] border-solid border-[#000000] shadow-lg ${
                  activeDropdown === "Tools"
                    ? "z-50 opacity-100"
                    : "z-[-1] opacity-0"
                }`}
              >
                {/* {item === "Tools" && ( */}
                <ul className="py-2 px-2 w-[277px] text-[16px] gap-2 text-primary rounded-[10px] bg-transparent">
                  {["Cost Calculator", "Project-Material"].map((option) => (
                    <li
                      key={option}
                      className="flex flex-row justify-between items-center px-2 py-2 hover:bg-[#00C5FF] text-[16px] font-[400] rounded-[10px] cursor-pointer"
                    >
                      {option === "Cost Calculator" && (
                        <div
                          className="flex flex-row relative justify-between items-center text-[16px] h-fit w-full bg-transparent cursor-pointer"
                          onClick={() => {
                            setCostCalculator(!costCalculator);
                            setActiveInnerDropdown(null);
                          }}
                        >
                          <span>{option}</span>
                          <span className="flex justify-center items-center text-[24px]">
                            {costCalculator && <IoIosCheckmark />}
                          </span>
                        </div>
                      )}

                      {option === "Project-Material" && (
                        <div
                          className="flex flex-row relative justify-between items-center text-[16px] w-full bg-transparent cursor-pointer"
                          // onClick={() => toggleInnerDropdown(option)}
                        >
                          <div
                            className="flex flex-row justify-between items-center text-[16px] w-full bg-transparent cursor-pointer"
                            onClick={() => toggleInnerDropdown(option)}
                          >
                            <span>{option}</span>
                            <span className="flex justify-center items-center">
                              <MdArrowRight />
                            </span>
                          </div>
                          {activeInnerDropdown === option && (
                            <div className="absolute left-[100%] top-0 ml-3 mt-2 bg-[#F2F2F2] text-[16px] font-[400] rounded-[10px] border-[0.25px] border-solid border-[#000000] shadow-lg z-50">
                              {
                                <ul className="py-2 px-2 w-[202px] gap-2 text-primary rounded-[10px] bg-transparent">
                                  {projects?.map((mat, index) => (
                                    <li
                                      key={index}
                                      className="flex flex-row justify-between items-center px-4 py-2 hover:bg-[#00C5FF] text-[16px] font-[400] rounded-[10px] cursor-pointer"
                                      onClick={() => {
                                        setProjectMaterialDetails(true);
                                        SetSelectedProjectName(mat.name);
                                      }}
                                    >
                                      <span>{mat.name}</span>
                                    </li>
                                  ))}
                                </ul>
                              }
                            </div>
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
                {/* )} */}
              </div>
              <div
                className={`absolute mt-2 left-[13.5rem] top-3 bg-[#F2F2F2] text-[16px] font-[400] rounded-[10px] border-[0.25px] border-solid border-[#000000] shadow-lg ${
                  activeDropdown === "Share"
                    ? "z-50 opacity-100"
                    : "z-[-1] opacity-0"
                }`}
              >
                {/* {item === "Share" && ( */}
                <ul className="py-2 px-2 w-[136px] text-[16px] gap-2 text-primary rounded-[10px] bg-transparent">
                  {["Send File", "Send as PDF"].map((option) => (
                    <li
                      key={option}
                      className="flex flex-row justify-between items-center px-2 py-2 hover:bg-[#00C5FF] text-[16px] font-[400] rounded-[10px] cursor-pointer"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
                {/* )} */}
              </div>
              <div
                className={`absolute mt-2 left-[17.5rem] top-3 bg-[#F2F2F2] text-[16px] font-[400] rounded-[10px] border-[0.25px] border-solid border-[#000000] shadow-lg ${
                  activeDropdown === "Help"
                    ? "z-50 opacity-100"
                    : "z-[-1] opacity-0"
                }`}
              >
                {/* {item === "Help" && ( */}
                <ul className="py-2 px-2 w-[177px] text-[16px] gap-2 text-primary rounded-[10px] bg-transparent">
                  {["Check for Updates", "Leave Feedback"].map((option) => (
                    <li
                      key={option}
                      className="flex flex-row justify-between items-center px-2 py-2 hover:bg-[#00C5FF] text-[16px] font-[400] rounded-[10px] cursor-pointer"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
                {/* )} */}
              </div>
              {/* )} */}
            </div>
          </div>
        </div>

        {/* Right Side: Search Bar, Action Buttons, and Window Controls */}
        <div className="flex items-center gap-[3rem]">
          <div className="flex flex-row items-center justify-between space-x-6">
            <div className="flex flex-row items-center justify-between space-x-4">
              {/* printer */}
              <div
                onClick={handlePrint}
                className="print:hidden flex items-center justify-center cursor-pointer"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.25 0.5C4.05109 0.5 3.86032 0.579018 3.71967 0.71967C3.57902 0.860322 3.5 1.05109 3.5 1.25V4.25H2C1.60218 4.25 1.22064 4.40804 0.93934 4.68934C0.658035 4.97064 0.5 5.35218 0.5 5.75V11.75C0.5 12.1478 0.658035 12.5294 0.93934 12.8107C1.22064 13.092 1.60218 13.25 2 13.25H3.5V14.75C3.5 14.9489 3.57902 15.1397 3.71967 15.2803C3.86032 15.421 4.05109 15.5 4.25 15.5H11.75C11.9489 15.5 12.1397 15.421 12.2803 15.2803C12.421 15.1397 12.5 14.9489 12.5 14.75V13.25H14C14.3978 13.25 14.7794 13.092 15.0607 12.8107C15.342 12.5294 15.5 12.1478 15.5 11.75V5.75C15.5 5.35218 15.342 4.97064 15.0607 4.68934C14.7794 4.40804 14.3978 4.25 14 4.25H12.5V1.25C12.5 1.05109 12.421 0.860322 12.2803 0.71967C12.1397 0.579018 11.9489 0.5 11.75 0.5H4.25ZM11.75 9.5H4.25C4.05109 9.5 3.86032 9.57902 3.71967 9.71967C3.57902 9.86032 3.5 10.0511 3.5 10.25V11.75H2V5.75H14V11.75H12.5V10.25C12.5 10.0511 12.421 9.86032 12.2803 9.71967C12.1397 9.57902 11.9489 9.5 11.75 9.5ZM11 4.25H5V2H11V4.25ZM2.75 6.5V8H5V6.5H2.75ZM11 11V14H5V11H11Z"
                    fill="white"
                  />
                </svg>
              </div>
              {/* export */}
              <div className="flex items-center justify-center cursor-pointer">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.914 12.4549L14.4068 9.95795C14.371 9.93213 14.3287 9.9168 14.2846 9.91368C14.2406 9.91056 14.1966 9.91977 14.1575 9.94028C14.0769 9.9817 14.0275 10.0721 14.0273 10.1632L14.029 11.3451H10.8739C10.7398 11.3451 10.6096 11.4396 10.6096 11.5739V13.7479C10.6096 13.8822 10.7398 13.9747 10.8739 13.9747H14.061V15.166C14.061 15.2569 14.0959 15.3403 14.1767 15.3819C14.2574 15.4235 14.3387 15.4165 14.4127 15.3635L17.9147 12.8501C17.9784 12.8047 18.0054 12.7312 18.0054 12.6529V12.6525C18.0054 12.5739 17.978 12.5005 17.914 12.4549Z"
                    fill="white"
                  />
                  <path
                    d="M12.1714 14.9248H10.9383C10.8511 14.9248 10.7675 14.9594 10.7059 15.0211C10.6442 15.0827 10.6096 15.1663 10.6096 15.2535H10.6082V15.8254H2.88627V6.87013H6.25364C6.34082 6.87013 6.42442 6.8355 6.48606 6.77385C6.54771 6.71221 6.58234 6.6286 6.58234 6.54143V3.17406H10.6081V10.0817H10.6101C10.6121 10.1675 10.6475 10.2491 10.7087 10.3091C10.77 10.3691 10.8523 10.4028 10.9381 10.403H12.1712C12.3504 10.403 12.4951 10.2597 12.4991 10.0817H12.4999V2.37473H12.4989V1.61093C12.4989 1.52375 12.4643 1.44014 12.4027 1.3785C12.341 1.31686 12.2574 1.28223 12.1702 1.28223H5.92494L0.994629 6.21273V17.3883C0.994629 17.57 1.14169 17.717 1.32333 17.717H12.1702C12.2574 17.717 12.341 17.6824 12.4027 17.6208C12.4643 17.5591 12.4989 17.4755 12.4989 17.3883V16.9232H12.4999V15.2531C12.4998 15.166 12.4651 15.0826 12.4035 15.021C12.342 14.9594 12.2585 14.9248 12.1714 14.9248Z"
                    fill="white"
                  />
                  <path
                    d="M4.08984 11.7539V13.5078H4.62089V12.9557H5.02578C5.43599 12.9557 5.65677 12.6822 5.65677 12.356C5.65677 12.0273 5.43599 11.7539 5.02578 11.7539H4.08984ZM5.11793 12.356C5.11793 12.448 5.04687 12.4928 4.95757 12.4928H4.62089V12.2167H4.95738C5.04687 12.2167 5.11793 12.2614 5.11793 12.356ZM5.93341 11.7539V13.5078H6.71963C7.2693 13.5078 7.67951 13.1895 7.67951 12.6294C7.67951 12.0693 7.2693 11.7539 6.71716 11.7539H5.93341ZM7.14029 12.6296C7.14029 12.8506 6.98259 13.0451 6.71697 13.0451H6.46446V12.2167H6.71944C7.00349 12.2167 7.14029 12.3929 7.14029 12.6296ZM9.33213 12.2167V11.7539H8.00156V13.5078H8.53261V12.8531H9.31351V12.3902H8.53261V12.2167H9.33213Z"
                    fill="white"
                  />
                </svg>
              </div>

              {/* save */}
              <div className="flex items-center justify-center cursor-pointer">
                <svg
                  width="16"
                  height="14"
                  viewBox="0 0 16 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 3.25H2.75C2.35218 3.25 1.97064 3.40804 1.68934 3.68934C1.40804 3.97064 1.25 4.35218 1.25 4.75V11.5C1.25 11.8978 1.40804 12.2794 1.68934 12.5607C1.97064 12.842 2.35218 13 2.75 13H13.25C13.6478 13 14.0294 12.842 14.3107 12.5607C14.592 12.2794 14.75 11.8978 14.75 11.5V4.75C14.75 4.35218 14.592 3.97064 14.3107 3.68934C14.0294 3.40804 13.6478 3.25 13.25 3.25H11M10.25 6.25L8 8.5M8 8.5L5.75 6.25M8 8.5V1"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <form
              id="search"
              onSubmit={handleSearch}
              className="flex items-center rounded-[10px] px-1 w-[188px] bg-[#F3EFEF]"
            >
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
                placeholder="Search"
                className="flex-grow outline-none w-full bg-transparent text-black text-sm p-1"
              />
              <button
                type="submit"
                className="flex items-center justify-center bg-transparent text-black p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m1.85-4.15A7.5 7.5 0 1 0 3 12a7.5 7.5 0 0 0 14.5-4.5z"
                  />
                </svg>
              </button>
            </form>
          </div>
          <div className="flex flex-row items-center justify-between space-x-2">
            <LightDarkThemeBtn />
          </div>
          <div className="flex flex-row items-center justify-between space-x-2">
            <button
              className=" px-2 py-1 rounded text-[30px]"
              onClick={() => handleWindowAction("minimize")}
            >
              -
            </button>
            <button
              className=" px-2 py-1 rounded"
              onClick={() => handleWindowAction("maximize")}
            >
              ☐
            </button>
            <button
              className=" px-2 py-1 rounded"
              onClick={() => handleWindowAction("close")}
            >
              ✖
            </button>
          </div>
        </div>
      </div>
      {/* Second Row */}
      {isEnterInvoice && (
        <>
          <div className="flex items-center justify-between w-full h-[44px] px-4 py-2 bg-[#1E1E1E] dark:bg-[#000000E5]">
            <div className="flex items-center w-fit h-full space-x-6 bg-transparent">
              <div className="relative flex flex-row gap-3 justify-center items-center">
                <span
                  style={{
                    backgroundColor: colorChange[activeTabIndex]?.outlineColor,
                  }}
                  className="flex w-[11px] h-[11px]"
                ></span>
                <button
                  onClick={() => {
                    setShowOutlineColorPicker(!showOutlineColorPicker);
                    setShowDescriptionsColorPicker(false);
                    setShowValueColorPicker(false);
                    setShowLabalColorPicker(false);
                  }}
                  className="hover:underline focus:outline-none font-[400] text-[14px] leading-[13.93px]"
                >
                  Outline
                </button>
                {showOutlineColorPicker && (
                  <div className="absolute top-6 left-2 bg-primary dark:bg-transparent text-sm p-1 rounded shadow-lg z-50">
                    <ColorPicker
                      onColorChange={(color) =>
                        handelColorPickerAction("outlineColor", color)
                      }
                      initialColor={colorChange[activeTabIndex]?.outlineColor}
                    />
                  </div>
                )}
              </div>
              <div className="relative flex flex-row gap-3 justify-center items-center">
                <span
                  style={{
                    backgroundColor: colorChange[activeTabIndex]?.labelColor,
                  }}
                  className="flex w-[11px] h-[11px]"
                ></span>
                <button
                  onClick={() => {
                    setShowLabalColorPicker(!showLabalColorPicker);
                    setShowDescriptionsColorPicker(false);
                    setShowValueColorPicker(false);
                    setShowOutlineColorPicker(false);
                  }}
                  className="hover:underline focus:outline-none font-[400] text-[14px] leading-[13.93px]"
                >
                  Labels
                </button>
                {showLabalColorPicker && (
                  <div className="absolute top-6 left-2 bg-primary dark:bg-transparent text-sm p-1 rounded shadow-lg z-50">
                    <ColorPicker
                      onColorChange={(color) =>
                        handelColorPickerAction("labelColor", color)
                      }
                      initialColor={colorChange[activeTabIndex]?.labelColor}
                    />
                  </div>
                )}
              </div>
              <div className="relative flex flex-row gap-3 justify-center items-center">
                <span
                  style={{
                    backgroundColor: colorChange[activeTabIndex]?.valuesColor,
                  }}
                  className="flex w-[11px] h-[11px]"
                ></span>
                <button
                  onClick={() => {
                    setShowValueColorPicker(!showValueColorPicker);
                    setShowDescriptionsColorPicker(false);
                    setShowLabalColorPicker(false);
                    setShowOutlineColorPicker(false);
                  }}
                  className="hover:underline focus:outline-none font-[400] text-[14px] leading-[13.93px]"
                >
                  Values
                </button>
                {showValueColorPicker && (
                  <div className="absolute top-6 left-2 bg-primary dark:bg-transparent text-sm p-1 rounded shadow-lg z-50">
                    <ColorPicker
                      onColorChange={(color) =>
                        handelColorPickerAction("valuesColor", color)
                      }
                      initialColor={colorChange[activeTabIndex]?.valuesColor}
                    />
                  </div>
                )}
              </div>
              <div className="relative flex flex-row gap-3 justify-center items-center">
                <span
                  style={{
                    backgroundColor:
                      colorChange[activeTabIndex]?.descriptionsColor,
                  }}
                  className="flex w-[11px] h-[11px]"
                ></span>
                <button
                  onClick={() => {
                    setShowDescriptionsColorPicker(
                      !showDescriptionsColorPicker
                    );
                    setShowValueColorPicker(false);
                    setShowLabalColorPicker(false);
                    setShowOutlineColorPicker(false);
                  }}
                  className="hover:underline focus:outline-none font-[400] text-[14px] leading-[13.93px]"
                >
                  Descriptions
                </button>
                {showDescriptionsColorPicker && (
                  <div className="absolute top-6 left-2 bg-primary dark:bg-transparent text-sm p-1 rounded shadow-lg z-50">
                    <ColorPicker
                      onColorChange={(color) =>
                        handelColorPickerAction("descriptionsColor", color)
                      }
                      initialColor={
                        colorChange[activeTabIndex]?.descriptionsColor
                      }
                    />
                  </div>
                )}
              </div>

              <div className="icon flex flex-row gap-1 justify-center items-center ">
                <div className="flex justify-center text-[17px] items-center cursor-pointer p-1">
                  <LuAlignLeft width={17} height={17} />
                </div>
                <div className="flex justify-center text-[17px] items-center cursor-pointer p-1">
                  <LuAlignCenter width={17} height={17} />
                </div>
                <div className="flex justify-center text-[17px] items-center cursor-pointer p-1">
                  <LuAlignRight width={17} height={17} />
                </div>
              </div>

              <div className="icon flex flex-row gap-1 justify-center items-center ">
                <div className="flex justify-center text-[17px] items-center cursor-pointer p-1">
                  <HiListBullet width={17} height={17} />
                </div>
                <div className="flex justify-center text-[17px] items-center cursor-pointer p-1">
                  <MdFormatListNumbered width={17} height={17} />
                </div>
              </div>
            </div>
            <div className="flex items-center w-fit h-full space-x-6 bg-transparent">
              <BreakDownSwitch title={"Labour"} />
              <BreakDownSwitch title={"Material"} />
              <BreakDownSwitch title={"Trip Charge"} />
            </div>
          </div>

          {/* Third Row: Panel */}

          <div className="flex p-1 items-center justify-start h-[34px] w-full">
            {projects?.map((project) => (
              <div
                key={project.id}
                className={`relative flex p-1 rounded-sm items-center justify-between w-[182px] h-full space-x-2  ${
                  activeProjectId === project.id
                    ? "bg-[#262626] text-white"
                    : "bg-[#1E1E1E80] text-[#585656]"
                }`}
              >
                <button
                  onClick={() => {
                    selectProject(project.id);
                    // if(stepsData[activeTabIndex].electricalSteps>9){
                    //   navigate("/project/bill");
                    // }
                    navigate(`/project/${project.id}`);

                    if (homeClick[project.id]?.elctronicHomeClick) {
                      navigate("/project/selection");
                    }
                  }}
                  className="w-full h-full"
                >
                  {project.name}
                </button>
                {/* Remove Button */}
                <button onClick={() => removeProject(project.id)}>✖</button>
              </div>
            ))}
            <button
              onClick={addNewProject}
              className="px-4 py-2 text-white bg-transparent"
            >
              +
            </button>
          </div>
          {/* <div
        ref={panelRef}
        className="absolute bg-blue-700 text-white p-4 rounded"
        style={{ left: panelPosition.x, top: panelPosition.y }}
        onMouseDown={handlePanelMouseDown}
        onMouseUp={handlePanelMouseUp}
        onMouseMove={handlePanelMouseMove}
      >
        <h3 className="font-bold text-lg">Draggable Panel</h3>
        <button
          onClick={addPanel}
          className="bg-green-500 px-4 py-2 rounded text-sm mt-2"
        >
          Add Panel
        </button>
      </div> */}
        </>
      )}
    </div>
  );
};

export default Navbar;
