import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import {
  activeDropdownAtom,
  activeInnerDropdownAtom,
  activeProjectIdAtom,
  activeTabIndexAtom,
  colorChangeAtom,
  homeClickAtom,
  isEnterInvoiceAtom,
  printBillAtom,
  projectsAtom,
  showDescriptionsColorPickerAtom,
  showLabelColorPickerAtom,
  showOutlineColorPickerAtom,
  showValueColorPickerAtom,
  zoomInOutAtom,
} from "../../variables/NavbarVariables";
import { useNavigate } from "react-router";
import {
  activeProjAtom,
  breakDownAtom,
  invoiceSelectAtom,
  progressAtom,
  stepsAtom,
} from "../../variables/Home";
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
import { IoClose } from "react-icons/io5";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const [, setActiveProj] = useAtom(activeProjAtom);

  const [filterText, setFilterText] = useState("");
  const [recentFiles, setRecentFiles] = useState<
    {
      name: string;
      id: number;
      date: string;
    }[]
  >(() => {
    return JSON.parse(localStorage.getItem("recentFileToSave") || "[]");
  });

  const [sortOrder, setSortOrder] = useState("Recent");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenModalOpen, setIsOpenModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  const [, setIsEnterInvoice] = useAtom(isEnterInvoiceAtom);
  const [projects, setProjects] = useAtom(projectsAtom);
  const [, setActiveProjectId] = useAtom(activeProjectIdAtom);

  const [homeClick, setHomeClick] = useAtom(homeClickAtom);
  const [, setStepsData] = useAtom(stepsAtom);
  const [, setProgress] = useAtom(progressAtom);
  const [invoiceSelect, setInvoiceSelect] = useAtom(invoiceSelectAtom);

  const [, setShowLabalColorPicker] = useAtom(showLabelColorPickerAtom);
  const [, setShowValueColorPicker] = useAtom(showValueColorPickerAtom);
  const [, setShowOutlineColorPicker] = useAtom(showOutlineColorPickerAtom);
  const [, setShowDescriptionsColorPicker] = useAtom(
    showDescriptionsColorPickerAtom
  );

  const [, setActiveDropdown] = useAtom(activeDropdownAtom);
  const [, setActiveInnerDropdown] = useAtom(activeInnerDropdownAtom);

  //breakdown variable
  const [breakDown, setBreakDown] = useAtom(breakDownAtom);

  const [, setFormData] = useAtom(formDataAtom);
  const [, setErrors] = useAtom(errorsAtom);

  const [, setClientFormData] = useAtom(clientFormDataAtom);
  const [, setClientErrors] = useAtom(clientErrorsAtom);

  const [, setItemSelectionData] = useAtom(
    itemSelectionDataAtom
  );
  const [, setItemErrors] = useAtom(itemErrorsAtom);

  const [, setLabourStateVariable] =
    useAtom(labourStateAtom);
  const [, setLabourErrors] = useAtom(labourErrorsAtom);
  const [, setTripCharge] = useAtom(tripChargeAtom);
  const [, setTripChargeError] = useAtom(tripChargeErrorAtom);
  // const navigate = useNavigate();

  const [, setTaxRate] = useAtom(taxRateAtom);

  const [, setTermsConditions] = useAtom(termConditionAtom);

  const [, setClientContractorData] =
    useAtom(clientContractorAtom);
  const [, setClientContractorErrors] = useAtom(
    clientContractorErrorsAtom
  );

  const [, setMaterialSectionSteps] = useAtom(
    materialSectionStepsAtom
  );
  const [newMaterial, setNewMaterial] = useAtom(newMaterialVariableAtom);
  const [newMaterialError, setNewMaterialError] = useAtom(
    newMaterialVariableErrorAtom
  );
  const [, setNewMaterialIndex] = useAtom(newMaterialIndexAtom);

  // const [isRename, setIsRename] = useState(false);
  // const [newName, setNewName] = useState("");

  const [openAddNewMaterial, setOpenAddNewMaterial] = useAtom(
    openAddNewMaterialAtom
  );

  const [isExistingProjectVariable, setIsExistingProjectVariable] = useAtom(
    isExistingProjectAtom
  );

  const [colorChange, setColorChange] = useAtom(colorChangeAtom);

  const [, setActiveTabIndex] = useAtom(activeTabIndexAtom);

  const [zoomLevel, setZoomLevel] = useAtom(zoomInOutAtom); // Default zoom level is 100%
  const [printBill, setPrintBill] = useAtom(printBillAtom)
    const [invoiceBillSelect, setInvoiceBillSelect] = useAtom(invoiceBillSelectAtom)
    const [billLogoImageData, setBillLogoImageData] = useAtom(billLogoImageDataAtom)

  const hasSeenTour = localStorage.getItem("hasSeenTour"); // variable for chacking if tour run for once or not

  const parseRelativeDate = (relativeDate: string): Date => {
    const [value] = relativeDate.split(" ");
    const daysAgo = parseInt(value, 10);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - daysAgo);
    return currentDate;
  };

  useEffect(() => {
    const sortedFiles = [...recentFiles].sort((a, b) => {
      const dateA = parseRelativeDate(a.date);
      const dateB = parseRelativeDate(b.date);

      if (sortOrder === "Recent") {
        return dateB.getTime() - dateA.getTime();
      }
      return dateA.getTime() - dateB.getTime();
    });

    setRecentFiles(sortedFiles);
  }, [sortOrder]);
  const sortedFiles = [...recentFiles].sort((a, b) => {
    if (sortOrder === "Recent") {
      return new Date(a.date) > new Date(b.date) ? -1 : 1;
    }
    return new Date(a.date) < new Date(b.date) ? -1 : 1;
  });

  const filteredFiles = sortedFiles.filter((file) =>
    file.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const addNewProject = () => {
    const newProjectId = projects.length;
    // console.log(newProjectId)

    // setProjects([
    //   ...projects,
    //   { name: `Untitled - Project ${newProjectId + 1}`, id: newProjectId },
    // ]);

    setPrintBill([
      ...printBill, 
      {
        selectedPrintBill:false,
      }
    ])

    setBillLogoImageData([
      ...billLogoImageData,
      {
        billLogoImage:null,
      }
    ])

    setInvoiceBillSelect([
      ...invoiceBillSelect,
      Array(11).fill({ 
    selectedBillInvoice: "BillLayout3",
    selectedBillImage: "bill3",

   }) // adjust array size if you support more tabs
    ])
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
      // ...stepsData,
      {
        electricalSteps: 1,
      },
    ]);

    //progress
    setProgress([
      // ...progress,
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
      // ...formData,
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
      // ...errors,
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
      // ...clientFormData,
      {
        clientName: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
      },
    ]);

    setClientErrors([
      // ...clientErrors,
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
      // ...itemSelectionData,
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
        linkPoductType: "",
        productLinkAmount: "0",
        isCommission: false,
        productDetails: {
          price: "",
        },
      },
    ]);

    setItemErrors([
      // ...itemErrors,
      {
        selectedItem: "",
        brand: "",
        style: "",
        quantity: "",
        color: "",
        use: "",
        version: "",
        neutral: "",
        type: "",
        pole: "",
        materialLink: "",
        amp: "",
        commissionType: "",
        commissionValue: "",
      },
    ]);

    // labour data
    setLabourStateVariable([
      // ...labourStateVariable,
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
      // ...labourErrors,
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
      // ...tripCharge,
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
      // ...tripChargeError,
      {
        tripChargeVal: "",
        amountPerMiles: "",
        traveledMiles: "",
      },
    ]);

    //taxRate data
    setTaxRate([
      // ...taxRate,
      { tax: "" },
    ]);

    //term and conditions data
    setTermsConditions([
      // ...termsCondition, 
      { termAndCondition: "" }
    ]);

    // Client Contractor Data
    setClientContractorData([
      // ...clientContractorData,
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
      // ...clientContractorErrors,
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
      // ...materialSectionSteps,
      {
        materialSectionStepsCount: 0,
      },
    ]);

    // add new Material.
    setNewMaterial([...newMaterial, []]);
    setNewMaterialError([...newMaterialError, []]);
    setNewMaterialIndex([
      // ...newMaterialIndex, 
      { activeNewMaterialIndex: 0 }]);
    setOpenAddNewMaterial([
      ...openAddNewMaterial,
      { openAddNewMaterialPopUp: false },
    ]);
    setIsExistingProjectVariable([
      ...isExistingProjectVariable,
      {
        isExistingProject: false,
      },
    ]);

    setActiveTabIndex(newProjectId); // New tab index

    setActiveProjectId(newProjectId); // Make the new project active
  };

  const handleSaveProject = () => {
    if (newProjectName.trim() === "") return;

    const newProject = {
      name: newProjectName,
      id: projects.length,
      d: new Date().toISOString(), // Save as ISO date for consistency
    };

    setProjects((prev) => [
      ...prev,
      { name: newProject.name, id: newProject.id },
    ]);
    addNewProject();
    setActiveProjectId(newProject.id);
    setIsModalOpen(false);
    setNewProjectName("");
    setIsEnterInvoice(true);
    setHomeClick((prev) => {
      const updated = [...prev];
      updated[newProject.id] = { elctronicHomeClick: true };
      return updated;
    });

    // Update recentFiles and store in localStorage
    setRecentFiles((prev) => {
      const updatedRecentFiles = [
        ...prev,
        { name: newProject.name, id: newProject.id, date: newProject.d },
      ];
      localStorage.setItem(
        "recentFileToSave",
        JSON.stringify(updatedRecentFiles)
      );
      return updatedRecentFiles; // Return the new state
    });

    setTimeout(() => {
      // console.log("Updated recent files:", recentFiles); // Debugging
      navigate(`/project/${newProject.id}`);
      if (!hasSeenTour) {
        setActiveProj(true);
      }
    }, 100);
  };

  const handleGoToSelectedProject = (name: string, id: number) => {
    setProjects((prev) => [...prev, { name: name, id: id }]);
    addNewProject();
    setActiveProjectId(id);
    setIsEnterInvoice(true);
    navigate(`/project/${id}`);
  };

  const handleClick = () => {
    setActiveDropdown(null);
    setActiveInnerDropdown(null);
    setShowDescriptionsColorPicker(false);
    setShowValueColorPicker(false);
    setShowLabalColorPicker(false);
    setShowOutlineColorPicker(false);
  };
  const handleZoom = (increment: boolean) => {
    setZoomLevel((prevZoom) => {
      const newZoom = increment ? prevZoom + 10 : prevZoom - 10;
      return Math.min(Math.max(newZoom, 50), 450); // Restrict zoom level to 50%-450%
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "+") {
        e.preventDefault(); // Prevent default browser zoom behavior
        handleZoom(true);
      } else if (e.ctrlKey && e.key === "-") {
        e.preventDefault();
        handleZoom(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      style={{
        transform: `scale(${zoomLevel / 100})`,
        transformOrigin: "center center", // Ensure scaling happens from the top-left corner
      }}
      onClick={handleClick}
      className="flex flex-row h-screen w-full bg-transparent"
    >
      {/* <div className="w-full fixed">
      <Navbar/>
      </div> */}
      {/* <div className="flex h-full w-full"> */}

      {/* Sidebar */}

      <div className="w-1/4 bg-transparent p-6 flex flex-col">
        <div className="flex item-center text-[24px] font-medium w-[314px] h-[44px] bg-[#0000000D] pl-2 mt-10 rounded-lg">
          Home
        </div>
        <div className="flex flex-col gap-3 w-full mt-14">
          <div className="relative w-fit h-fit rounded-[50px] bg-gradient-to-tr from-[#00C5FF] to-[#0054F0] p-[1px]">
            <button
              onClick={() => setIsModalOpen(!isModalOpen)}
              className="flex justify-center items-center bg-black w-[181px] h-[49px] rounded-[50px] text-white text-[24px] border-[1px]"
            >
              Create New
            </button>
          </div>
          <div className="relative w-fit h-fit rounded-[50px] bg-gradient-to-tr from-[#00C5FF] to-[#0054F0] p-[1px]">
            <button
              onClick={() => setIsOpenModalOpen(!isOpenModalOpen)}
              className="flex justify-center items-center bg-black w-[110px] h-[49px] rounded-[50px] text-white text-[24px] border-[1px]"
            >
              Open
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-9 w-3/4 p-6 mt-20">
        <h1 className="flex justify-center items-center w-full text-3xl font-medium mb-3">
          Welcome to WiseCharge
        </h1>

        {/* Recent Section */}
        <div className="flex flex-col gap-4">
          <div className="flex text-[24px] font-medium">Recent</div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-8">
              <span className="text-[#00000080] dark:text-[#FFFFFF80] text-[18px]">
                Sort
              </span>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border-b-[1px] text-[#000000] dark:text-[#ffffff] bg-transparent text-[18px] w-[122px] border-[#00000066] dark:border-[#FFFFFF66] px-2 py-1"
              >
                <option value="Recent" className="bg-transparent">
                  Recent
                </option>
                <option value="Oldest" className="bg-transparent">
                  Oldest
                </option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#000000] dark:text-[#ffffff] text-[18px]">
                Filter
              </span>
              <input
                type="text"
                placeholder="Filter Recent Files"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="border-b-[1px] bg-transparent text-[#000000] text-[18px] w-[213px] border-[#00000040] dark:border-[#FFFFFF66] px-2 py-1"
              />
            </div>
          </div>
        </div>

        {/* File Cards */}
        <div className="grid grid-cols-3 mb-4 gap-8 p-3 pl-6 overflow-y-auto ">
          <div
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="relative w-fit h-fit rounded-lg bg-gradient-to-tr from-[rgb(0,197,255)] to-[#0054F0] p-[1px] cursor-pointer"
          >
            <div className=" bg-white dark:bg-[#000000] rounded-lg w-[257px] h-[191px] flex justify-center text-center dark:text-[#ffffff] items-center text-[150px] font-bold">
              +
            </div>
          </div>

          {filteredFiles.map((file, index) => (
            <div
              key={index}
              className="flex flex-col w-[257px] h-[244px] gap-2 cursor-pointer"
              onClick={() => handleGoToSelectedProject(file.name, file.id)}
            >
              <div className="relative w-fit h-fit rounded-lg bg-gradient-to-tr from-[#00C5FF] to-[#0054F0] p-[1px]">
                <div className="bg-gray-200 dark:bg-[#000000] rounded-lg  w-[257px] h-[191px] flex justify-center items-center text-md font-bold">
                  <div className="bg-[#FFFFFF] rounded-lg h-[171px] w-[125px] m-auto" />
                </div>
              </div>
              <div className="pt-2 pl-1">
                <div className="font-[400] text-[14px] dark:text-[#ffffff] text-[#000000]">
                  {file.name}
                </div>
                <div className="text-[12px] dark:text-[#FFFFFFB2] font-[400] text-[#00000060]">
                  {new Date(file.date).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* </div> */}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-xl text-[#000000] font-bold mb-4">
              Create New Project
            </h2>
            <input
              type="text"
              placeholder="Enter project name"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className="w-full border dark:text-black p-2 rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProject}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {isOpenModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white relative p-6 rounded-lg shadow-md w-96">
            <span
              onClick={() => setIsOpenModalOpen(false)}
              className="absolute hover:bg-red-400 right-2 top-2 text-[20px] cursor-pointer p-1 rounded-sm"
            >
              <IoClose/>
            </span>
            <h2 className="text-xl text-[#000000] font-bold mb-4 border-b-2">
              Open Existing Project
            </h2>
            <ol
              type="1"
              className="list-decimal list-inside flex flex-col gap-4"
            >
              {recentFiles.map((rfiles, index) => (
                <li
                  onClick={() =>
                    handleGoToSelectedProject(rfiles.name, rfiles.id)
                  }
                  key={index}
                  className="flex justify-between items-center p-2 border-b-2 cursor-pointer"
                >
                  <span className="font-[400] text-[14px] text-[#000000]">
                    {index + 1 + "."} {rfiles.name}
                  </span>
                  <span className="font-[400] text-[12px] text-[#00000080]">
                    {new Date(rfiles.date).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
