/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../components/navigation/NavBar";
import CostCalculator from "../components/costCalculator/CostCalculator";
import { useAtom } from "jotai";
import {
  activeDropdownAtom,
  activeTabIndexAtom,
  costCalculatorAtom,
  homeClickAtom,
  isEnterInvoiceAtom,
  projectMaterialDetailsAtom,
  projectsAtom,
  // showDescriptionsColorPickerAtom,
  // showLabelColorPickerAtom,
  // showOutlineColorPickerAtom,
  // showValueColorPickerAtom,
} from "../variables/NavbarVariables";
import { useEffect, useRef, useState } from "react";
import ProjectMaterialDetails from "../components/projectMaterialDetails/ProjectMaterialDetails";
import {
  labourStateAtom,
  newMaterialVariableAtom,
  openAddNewMaterialAtom,
} from "../variables/electricalInvoiceVariable";
import AddNewMaterialPopUp from "../components/addMaterialPopUp/AddNewMaterialPopUp";
import { ToastContainer } from "react-toastify";
import Joyride, { ACTIONS, ORIGIN, CallBackProps } from "react-joyride";
import {
  activeProjAtom,
  joyrideRunAtom,
  joyrideStepIndexAtom,
  stepsAtom,
  stepsStates,
} from "../variables/Home";
import { joyrideStylesStates, stepTour } from "../constants/states";
const App = () => {
  // const navigate = useNavigate()

  const [run, setRun] = useAtom(joyrideRunAtom);
  const [activeProj, setActiveProj] = useAtom(activeProjAtom);
  const [stepIndex, setStepIndex] = useAtom(joyrideStepIndexAtom);
  const [isDisableScroll, setIsDisableScroll] = useState(true);
  const [, setISEnterInvoice] = useAtom(isEnterInvoiceAtom);
  const [labourStateVariable, setLabourStateVariable] =
    useAtom(labourStateAtom);

  const [showFinalPopup, setShowFinalPopup] = useState(false);

  // const [activeProjectId,] = useAtom(activeProjectIdAtom);
  const [projects, setProjects] = useAtom(projectsAtom);
  const [isDragging, setIsDragging] = useState<number | null>(null);
  const [isProjectDragging, setIsProjectDragging] = useState<number | null>(
    null
  );
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragProjectOffset, setDragProjectOffset] = useState({ x: 0, y: 0 });
  const [panelPosition, setPanelPosition] = useState({
    x: window.innerWidth - 50,
    y: 100,
  });

  const [projectPanelPosition, setProjectPanelPosition] = useState({
    x: window.innerWidth - 50,
    y: 400,
  });

  const panelRef = useRef<HTMLDivElement>(null);
  const projectPanelRef = useRef<HTMLDivElement>(null);

  const [costCalculator] = useAtom(costCalculatorAtom);
  const [projectMaterialDetails] = useAtom(projectMaterialDetailsAtom);

  const [newMaterial] = useAtom(newMaterialVariableAtom);
  const [openAddNewMaterial] = useAtom(openAddNewMaterialAtom);
  const [activeTabIndex] = useAtom(activeTabIndexAtom);

  const [activeDropdown, setActiveDropdown] = useAtom(activeDropdownAtom);
  const [stepsData, setStepsData] = useAtom(stepsAtom);

  const activeSteps = stepsData[activeTabIndex];
  const activeLabourData = labourStateVariable[activeTabIndex];

  const navigate = useNavigate();
  const [, setHomeClick] = useAtom(homeClickAtom);


  // const [showLabalColorPicker, setShowLabalColorPicker] = useAtom(
  //     showLabelColorPickerAtom
  //   );
  //   const [showValueColorPicker, setShowValueColorPicker] = useAtom(
  //     showValueColorPickerAtom
  //   );
  //   const [showOutlineColorPicker, setShowOutlineColorPicker] = useAtom(
  //     showOutlineColorPickerAtom
  //   );
  //   const [showDescriptionsColorPicker, setShowDescriptionsColorPicker] = useAtom(
  //     showDescriptionsColorPickerAtom
  //   );

  useEffect(() => {
    const stopDragging = () => {
      setIsDragging(0);
      setIsProjectDragging(0);
    };

    window.addEventListener("mouseup", stopDragging);
    return () => {
      window.removeEventListener("mouseup", stopDragging);
    };
  }, []);

  // const handlePanelMouseDown = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   setIsDragging(1);
  // };

  const handlePanelMouseDown = (e: React.MouseEvent) => {
    if (panelRef.current) {
      const panelRect = panelRef.current.getBoundingClientRect();
      const offsetX = e.clientX - panelRect.left;
      const offsetY = e.clientY - panelRect.top;
      setDragOffset({ x: offsetX, y: offsetY });
      setIsDragging(1);
    }
  };

  const handleProjectPanelMouseDown = (e: React.MouseEvent) => {
    if (projectPanelRef.current) {
      const panelRect = projectPanelRef.current.getBoundingClientRect();
      const offsetX = e.clientX - panelRect.left;
      const offsetY = e.clientY - panelRect.top;
      setDragProjectOffset({ x: offsetX, y: offsetY });
      setIsProjectDragging(1);
    }
  };

  const handlePanelMouseMove = (e: React.MouseEvent) => {
    if (isDragging && panelRef.current) {
      // const newX = e.clientX - panelRef.current.offsetWidth / 2;
      // const newY = e.clientY - panelRef.current.offsetHeight / 2;
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      setPanelPosition({
        x: Math.max(
          0,
          Math.min(newX, window.innerWidth - panelRef.current.offsetWidth)
        ), // Prevent horizontal overflow
        y: Math.max(
          0,
          Math.min(newY, window.innerHeight - panelRef.current.offsetHeight)
        ), // Prevent vertical overflow
      });
    }
    if (isProjectDragging && projectPanelRef.current) {
      // const newX = e.clientX - panelRef.current.offsetWidth / 2;
      // const newY = e.clientY - panelRef.current.offsetHeight / 2;
      const newX = e.clientX - dragProjectOffset.x;
      const newY = e.clientY - dragProjectOffset.y;

      setProjectPanelPosition({
        x: Math.max(
          0,
          Math.min(
            newX,
            window.innerWidth - projectPanelRef.current.offsetWidth
          )
        ), // Prevent horizontal overflow
        y: Math.max(
          0,
          Math.min(
            newY,
            window.innerHeight - projectPanelRef.current.offsetHeight
          )
        ), // Prevent vertical overflow
      });
    }
  };

  useEffect(() => {
    // Load projects from localStorage
    const savedProjects = localStorage.getItem("projects");
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  useEffect(() => {
    // Save projects to localStorage
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const updateSteps = (tabIndex: number, newSteps: Partial<stepsStates>) => {
    setStepsData((prevSteps) => {
      const updatedSteps = [...prevSteps];
      updatedSteps[tabIndex] = {
        ...updatedSteps[tabIndex],
        ...newSteps,
      };
      return updatedSteps;
    });
  };

  const updateLabourData = (key: keyof typeof activeLabourData, value: any) => {
    setLabourStateVariable((prev) => {
      const updated = [...prev];
      updated[activeTabIndex] = { ...updated[activeTabIndex], [key]: value };
      return updated;
    });
  };

  const steps = stepTour;
  const joyrideStyle = joyrideStylesStates;

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index, origin, status, type } = data;

    // console.log(temp.includes(type))
    // console.log(index, stepIndex);

    if (action === ACTIONS.CLOSE && origin === ORIGIN.KEYBOARD) {
      // do something
      navigate("/");
      setISEnterInvoice(false);
      setProjects([]);
    }

    if (
      index === 0 &&
      type &&
      ["step:after", "error:target_not_found"].includes(type) &&
      activeDropdown !== "File"
    ) {
      setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
      setActiveDropdown("File"); // Ensure dropdown is opened
    } else if (
      index === 1 &&
      type &&
      ["step:after", "error:target_not_found"].includes(type)
    ) {
      setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
      // setActiveDropdown("File"); // Ensure dropdown is opened
      setHomeClick((prev) => {
        const updated = [...prev];
        updated[activeTabIndex] = { elctronicHomeClick: true };
        return updated;
      });
      setActiveDropdown(null);
      navigate("/project/selection");
    } else if (
      index === 2 &&
      type &&
      ["step:after", "error:target_not_found"].includes(type)
    ) {
      setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
      setIsDisableScroll(false);
    } else if (
      index > 2 &&
      type &&
      ["step:after", "error:target_not_found"].includes(type)
    ) {
      if (index === 6) {
        setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
        updateLabourData("labourSelectedVal", "Hourly Rate");
      } else {
        setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
        const nextStep = activeSteps.electricalSteps + 1;
        updateSteps(activeTabIndex, { electricalSteps: nextStep });
      }
    } else if (
      type &&
      ["step:after", "error:target_not_found"].includes(type)
    ) {
      // Update state to advance the tour

      setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
      // setIsDisableScroll(true)
    } else if (status && ["finished", "skipped"].includes(status)) {
      // You need to set our running state to false, so we can restart if we click start again.
      setRun(false);
      localStorage.setItem("hasSeenTour", "true");

      if (status === "finished") {
        
        setShowFinalPopup(true); // Show final popup at the end
      }
    }

    // console.groupCollapsed(type);
    // console.log("type", type); //eslint-disable-line no-console
    // console.log("data", data); //eslint-disable-line no-console
    console.groupEnd();
  };

  // useEffect(() => {
  //   if (activeProj) {
  //     setActiveProj(false);
      
  //   }
  // }, [activeProj]);

  const handleCloseTour = () => {
    setShowFinalPopup(false);
    navigate("/");
    setISEnterInvoice(false);
    setProjects([]);
  };

  const handleStartTour = ()=>{
    setRun(true);
    setActiveProj(false);
  }
  const handleSkipTour = ()=>{
    setRun(false);
    setActiveProj(false);
    navigate("/");
    setISEnterInvoice(false);
    setProjects([]);
  }

  

  

  return (
    <div
    
      onMouseMove={handlePanelMouseMove}
      // onClick={handleAppOnClick}
      className="w-screen relative bg-secondary dark:bg-custom-bgcl-gradient dark:text-white h-screen flex flex-col items-center overflow-hidden"
    >
      <NavBar />
      {openAddNewMaterial?.length>0 && openAddNewMaterial[activeTabIndex]?.openAddNewMaterialPopUp &&
      newMaterial[activeTabIndex]?.length > 0 ? (
        <AddNewMaterialPopUp />
      ) : (
        <Outlet />
      )}
      {costCalculator && (
        <div
          ref={panelRef}
          style={{
            left: `${panelPosition.x}px`,
            top: `${panelPosition.y}px`,
          }}
          onMouseDown={handlePanelMouseDown}
          className="absolute z-[1] cursor-grab bg-transparent"
        >
          <CostCalculator />
        </div>
      )}

      {projectMaterialDetails && (
        <div
          ref={projectPanelRef}
          style={{
            left: `${projectPanelPosition.x}px`,
            top: `${projectPanelPosition.y}px`,
          }}
          onMouseDown={handleProjectPanelMouseDown}
          className="absolute z-[2] cursor-grab bg-transparent"
        >
          <ProjectMaterialDetails />
        </div>
      )}
      <ToastContainer />

      <Joyride
        steps={steps}
        run={run}
        stepIndex={stepIndex}
        continuous
        showSkipButton
        disableCloseOnEsc
        spotlightClicks
        disableOverlayClose={true}
        disableScrolling={isDisableScroll}
        callback={handleJoyrideCallback}
        styles={joyrideStyle}
        locale={{
          skip: "Skip Tutorial", // Set skip button text for every step
        }}
      />

      {
        activeProj && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="relative p-3 bg-white rounded-[15px]" >

          <div className="relative p-[4px] w-[500px] text-center bg-white shadow-lg rounded-[15px]">
      {/* Gradient Border */}
      <div className="absolute inset-0 rounded-[15px] border-[2px] border-transparent bg-gradient-to-b from-[#00C5FF] to-[#0054F0]"></div>

      {/* Content Inside */}
      <div className="relative flex flex-col items-center z-10 p-6 bg-white rounded-[15px]">
        <h2 className="text-[32px] font-[500] text-black">Hello</h2>
        <h3 className="text-2xl font-[500] text-black mt-1">
          Welcome to <span className="text-[#00C5FF] font-bold">Wise Charge</span>
        </h3>
        <p className="text-[#000000E5] italic text-center text-[16px] font-[400] my-3">
          Let's walk you through creating your first invoice.
        </p>

        {/* Start Tutorial Button */}
        <button
          className="relative mt-6 px-6 py-2 text-white text-[15px] font-medium rounded-lg bg-invoice-btn-gradient"
          onClick={handleStartTour}
        >
          Start Tutorial
        </button>

        {/* Skip Tutorial Button */}
        <button
          className="mt-3 block text-[#00000080]text-[15px] hover:underline"
          onClick={handleSkipTour}
        >
          Skip Tutorial
        </button>
      </div>
    </div>
    </div>
    </div>
        )
      }

      {showFinalPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="relative p-[4px] w-[500px] text-center bg-white shadow-lg rounded-xl">
            {/* Gradient Border */}
            <div className="absolute inset-0 rounded-xl border-[2px] border-transparent bg-gradient-to-b from-[#00C5FF] to-[#0054F0]"></div>

            {/* Content inside (above the border) */}
            <div className="relative z-10 p-6 bg-white rounded-xl">
              <h2 className="text-2xl font-[500] text-[#00C5FF]">
                Congratulations
              </h2>
              <p className="text-[#000000E5] italic text-center text-[16px] font-[400] mt-2">
              You’ve completed the walkthrough! You're now ready to create your own invoices. Access this tutorial anytime via the 'Help' menu.
              </p>

              {/* Button with Gradient Border */}
              <button
                className="relative mt-4 px-[1.3px] py-[1.3px] text-[#000000CC] text-[15px] font-medium rounded-lg bg-white hover:bg-gray-200"
                onClick={handleCloseTour}
              >
                <span className="absolute inset-0 rounded-lg border-[2px] border-transparent bg-gradient-to-b from-[#00C5FF] to-[#0054F0]"></span>
                <span className="relative z-10 px-4 py-2 block bg-white text-[15px] font-medium rounded-lg">Close</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
