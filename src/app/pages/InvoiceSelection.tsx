import { Link, useNavigate } from "react-router-dom";
import NavigateButtons from "../../components/navigation/NavigateButtons"; // Adjust the path as needed
import ProgrssBar from "../../components/progressbar/ProgrssBar";

import CostCalculator from "../../components/costCalculator/CostCalculator";
import NavigateCloseButtons from "../../components/navigation/NavigationCloseBtn";

import { labourValidation } from "../../components/formValidation/electricalFormValidatin/LabourFormValidation";
import { itemValidate } from "../../components/formValidation/electricalFormValidatin/ItemValidationForm";
import { clientValidate } from "../../components/formValidation/electricalFormValidatin/ClientValidationForm";
import { validate } from "../../components/formValidation/electricalFormValidatin/InvoiceInfoValidationForm";
// import { TripChargeValidation } from "../../components/formValidation/electricalFormValidatin/TripChargeValidationForm";
import { useAtom } from "jotai";
import {
  clientContractorAtom,
  clientContractorErrorsAtom,
  clientErrorsAtom,
  clientFormDataAtom,
  errorsAtom,
  formDataAtom,
  isExistingProjectAtom,
  itemErrorsAtom,
  itemSelectionDataAtom,
  labourErrorsAtom,
  labourStateAtom,
  tripChargeAtom,
  tripChargeErrorAtom,
} from "../../variables/electricalInvoiceVariable";
import { invoiceSelectAtom, progressAtom, stepsAtom, stepsStates } from "../../variables/Home";
import ElecricalInvoiceHero from "./elecricalInvoice/ElecricalInvoiceHero";
import ElectricalInvoiceHeading from "./elecricalInvoice/ElectricalInvoiceHeading";
import NavigatePreview from "../../components/navigation/NavigatePreviewBtn";
import { ClientContractorSignValidation } from "../../components/formValidation/electricalFormValidatin/ClientContractorSignValidation";
import { activeDropdownAtom, activeInnerDropdownAtom, activeTabIndexAtom, disableContractorClientSignaturesAtom, disableTaxAtom, disableTermsConAtom, disableTripChargeAtom, showDescriptionsColorPickerAtom, showLabelColorPickerAtom, showOutlineColorPickerAtom, showValueColorPickerAtom, zoomInOutAtom } from "../../variables/NavbarVariables";
import { TripChargeValidation } from "../../components/formValidation/electricalFormValidatin/TripChargeValidationForm";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";



const InvoiceSelection = () => {
  const divide = 100 / 9;
  const navigate = useNavigate();
  const [, setActiveDropdown] = useAtom(activeDropdownAtom)
  const [, setActiveInnerDropdown] = useAtom(activeInnerDropdownAtom)
  const [activeTabIndex] = useAtom(activeTabIndexAtom);
  const [progress, setProgress] = useAtom(progressAtom);
  const [stepsData, setStepsData] = useAtom(stepsAtom);
  const [invoiceSelect,] = useAtom(invoiceSelectAtom);

  const [, setRun] = useState(false)

  const [, setShowLabalColorPicker] = useAtom(
    showLabelColorPickerAtom
  );
  const [, setShowValueColorPicker] = useAtom(
    showValueColorPickerAtom
  );
  const [, setShowOutlineColorPicker] = useAtom(
    showOutlineColorPickerAtom
  );
  const [, setShowDescriptionsColorPicker] = useAtom(
    showDescriptionsColorPickerAtom
  );

  const [zoomLevel, setZoomLevel] = useAtom(zoomInOutAtom); // Default zoom level is 100%
  const [disableTripCharge,] = useAtom(
    disableTripChargeAtom
  );
const [disableTax,] = useAtom(disableTaxAtom);
  const [disableTermsCon,] = useAtom(disableTermsConAtom);
  const [
    disableContractorClientSignatures,
  ] = useAtom(disableContractorClientSignaturesAtom);
  //invoiceinfo
  const [formData] = useAtom(formDataAtom);
  const [errors, setErrors] = useAtom(errorsAtom);

  //clientdetails
  const [clientFormData] = useAtom(clientFormDataAtom);
  const [clientErrors, setClientErrors] = useAtom(clientErrorsAtom);

  //itemselection
  const [itemSelectionData] = useAtom(itemSelectionDataAtom);
  const [itemErrors, setItemErrors] = useAtom(itemErrorsAtom);

  //labour data
  const [labourStateVariable] = useAtom(labourStateAtom);
  const [labourErrors, setLabourErrors] = useAtom(labourErrorsAtom);
  const [, setIsExistingProjectVariable] = useAtom(isExistingProjectAtom)

  //tripcharge
  const [tripCharge] = useAtom(tripChargeAtom);
  const [tripChargeError, setTripChargeError] = useAtom(tripChargeErrorAtom);

  //clientContractor sign variables
const [clientContractorData,] = useAtom(clientContractorAtom)
  const [clientContractorErrors, setClientContractorErrors] = useAtom(
    clientContractorErrorsAtom
  );
  
  const activeSelectedInvoice = invoiceSelect[activeTabIndex]
  const activeSteps = stepsData[activeTabIndex]
  const activeProgress = progress[activeTabIndex]

  

  const handlePreview = () => {
    //
  };

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

  

  const handleBack = () => {
    if (activeSteps?.electricalSteps === 1) {
      navigate(-1);
      return;
    }
  
    const stepsToSkip: number[] = [];
  
    if (disableTripCharge) stepsToSkip.push(5);
    if (disableTax) stepsToSkip.push(6);
    if (disableTermsCon) stepsToSkip.push(7);
    if (disableContractorClientSignatures) stepsToSkip.push(8);
  
    const previousValidStep = (currentStep:number) => {
      let step = currentStep - 1;
      while (stepsToSkip.includes(step)) {
        step--; // Skip disabled steps
      }
      return step;
    };
  
    const prevStep = previousValidStep(activeSteps?.electricalSteps);
    updateSteps(activeTabIndex, { electricalSteps: prevStep });
  
    setProgress((prevProgress) => {
      const updatedProgress = [...prevProgress];
      updatedProgress[activeTabIndex] = {
        progress: prevStep >= 9 ? 100 : prevStep * Math.ceil(divide),
      };
      return updatedProgress;
    });
  
    console.log(`Going back to step ${prevStep}...`);
  };
  

  const handleNext = () => {

    const stepsToSkip: number[] = [];

    if (disableTripCharge) stepsToSkip.push(5);
    if (disableTax) stepsToSkip.push(6);
    if (disableTermsCon) stepsToSkip.push(7);
    if (disableContractorClientSignatures) stepsToSkip.push(8);

    const nextValidStep = (currentStep:number) => {
      let step = currentStep +1;
      while (stepsToSkip.includes(step)){
        step++
      }
      return step
    }

    //   console.log("Proceeding to the next step...");
    const stepConfigurations = [
      {
        step: 1,
        validateFn: () =>
          validate({ formData, activeTabIndex, errors, setErrors }),
      },
      {
        step: 2,
        validateFn: () =>
          clientValidate({
            clientFormData,
            activeTabIndex,
            clientErrors,
            setClientErrors,
          }),
      },
      {
        step: 3,
        validateFn: () =>
          labourValidation({
            labourStateVariable,
            activeTabIndex,
            labourErrors,
            setLabourErrors,
          }),
      },
      {
        step: 4,
        validateFn: () =>
          itemValidate({
            itemSelectionData,
            activeTabIndex,
            itemErrors,
            setItemErrors,
          }),
      },
      
      {
        step: 5,
        validateFn: () =>
          TripChargeValidation({
            tripCharge,
            activeTabIndex,
            tripChargeError,
            setTripChargeError,
          }),
      },
      {
        step: 8,
        validateFn: () =>
          clientContractorData[activeTabIndex].sign === "Yes"
            ? ClientContractorSignValidation({
                clientContractorData,
                activeTabIndex,
                clientContractorErrors,
                setClientContractorErrors,
              })
            : true,
      },
    ];
  
    const currentStepConfig = stepConfigurations.find(
      (config) => config.step === activeSteps?.electricalSteps
    );

  
    if (currentStepConfig?.validateFn()) {
      if (activeSteps?.electricalSteps === 5){
        setIsExistingProjectVariable((prev) => {
          const updated = [...prev];
          // Update the value for the active tab
          updated[activeTabIndex] = { isExistingProject: true };
      
          return updated;
        });
      }
      
      const nextStep = nextValidStep(activeSteps?.electricalSteps);
      updateSteps(activeTabIndex, { electricalSteps: nextStep });
  
      setProgress((prevProgress) => {
        const updatedProgress = [...prevProgress];
        updatedProgress[activeTabIndex] =
          {progress:nextStep >= 9 ? 100 : nextStep * Math.ceil(divide)};
        return updatedProgress;
      });
  
      console.log("Proceeding to the next step...");
    } else if (activeSteps?.electricalSteps === 6 || activeSteps?.electricalSteps === 7) {
      const nextStep = activeSteps?.electricalSteps + 1;
      updateSteps(activeTabIndex, { electricalSteps: nextStep });
      setProgress((prevProgress) => {
        const updatedProgress = [...prevProgress];
        updatedProgress[activeTabIndex] =
          {progress:nextStep >= 9 ? 100 : nextStep * Math.ceil(divide)};
        return updatedProgress;
      });
      console.log("Proceeding to the next step...");
    } else {
      console.error("Form has errors:", errors);
      setIsExistingProjectVariable((prev) => {
        const updated = [...prev];
        // Update the value for the active tab
        updated[activeTabIndex] = { isExistingProject: false };
    
        return updated;
      });
    }
  };
  

  const handleCloseForm = () => {
    navigate("/project/bill");
    updateSteps(activeTabIndex, {
      electricalSteps:9,
    });
  };

  const handleOnClick = ()=>{
    setActiveDropdown(null);
    setActiveInnerDropdown(null);
    setShowOutlineColorPicker(false);
    setShowDescriptionsColorPicker(false);
    setShowValueColorPicker(false);
    setShowLabalColorPicker(false);
  }

  
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

    useEffect(()=>{
      setRun(true)
    })

    useEffect(() => {
    const scrollContainer = document.getElementById("scroll-container-at-top");
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeSteps.electricalSteps]);

  return (
    <div style={{
      transform: `scale(${zoomLevel / 100})`,
      transformOrigin: "center center", // Ensure scaling happens from the top-left corner
      // width: "100%", // Prevent layout shifts during scaling
      // height: "100%", // Prevent layout shifts during scaling
    }} onClick={handleOnClick} className="h-full w-full flex flex-row items-center justify-between overflow-y-scroll overflow-hidden">
      <div className=" m-auto relative h-[80%] w-[926px] flex flex-col items-center justify-between dark:bg-black shadow-[0_0px_12.2px_8px_rgba(0,0,0,0.2)] dark:shadow-[0_0px_12.2px_5px_rgba(256,256,256,0.2)] rounded-[25px]">
        <span className=" absolute flex flex-col justify-center items-center top-2 right-2 w-6 h-6 text-[18px] cursor-pointer bg-transparent">
          <IoClose />
        </span>
        <div className="flex flex-col justify-center w-full items-center h-[fit-content] bg-transparent">
          <div className="flex flex-col justify-center w-full items-center gap-4 h-[fit-content] px-6 py-6 bg-transparent">
            {activeSelectedInvoice?.selectedInvoice == "Electrical Invoice" && (
              <ElectricalInvoiceHeading />
            )}
          </div>
          <ProgrssBar progress={activeProgress?.progress} />
        </div>

        <div
        id="scroll-container-at-top"
          className={`flex flex-col w-full h-[506px] bg-transparent p-4 ${
            (activeSteps?.electricalSteps == 7) ? " overflow-y-hidden" : "overflow-y-scroll"
          }`}
        >
          {activeSteps?.electricalSteps == 1 && (
            <div id="selectInvoiceType" className="flex flex-row justify-around items-center bg-transparent">
              <Link to="/info/rough-in">
                <button
                  disabled
                  className=" flex justify-center items-center w-[200px] h-[45px] hover:border-blue-200 hover:border-2 text-[20px] font-[500] rounded-[10px] bg-[#D9D9D9] text-[#00000099] active:text-secondary active:bg-invoice-btn-gradient active:border-2 active:border-[#069FDA]"
                >
                  Rough-in Invoice
                </button>
              </Link>
              <Link to="/info/finished">
                <button
                  disabled
                  className=" flex justify-center items-center w-[200px] h-[45px] hover:border-blue-200 hover:border-2 text-[20px] font-[500] bg-[#D9D9D9] rounded-[10px] text-[#00000099] active:text-secondary active:bg-invoice-btn-gradient active:border-2 active:border-[#069FDA]"
                >
                  Finished Invoice
                </button>
              </Link>
              <Link to="/info/electrical">
                <button className=" flex justify-center items-center w-[200px] h-[45px] hover:border-blue-200 hover:border-2 text-[20px] font-[500] rounded-[10px] text-secondary bg-invoice-btn-gradient border-2 border-[#069FDA]">
                  Electrical Invoice
                </button>
              </Link>
            </div>
          )}
          <div className="mt-8 bg-transparent">
            {activeSelectedInvoice?.selectedInvoice == "Electrical Invoice" && <ElecricalInvoiceHero />}
          </div>
        </div>

        {/* Add the navigation buttons here */}
        {activeSteps?.electricalSteps == 9 ? (
          <div className="flex w-full h-[fit-content] bg-[#C5D9DE80] dark:darkBottom bottom-0 px-2 py-6 rounded-b-[15px]">
            <NavigateCloseButtons handleCloseForm={handleCloseForm} />
          </div>
        ) : (
          <div className="flex justify-between w-full h-[fit-content] bg-[#C5D9DE80] dark:darkBottom bottom-0 px-4 py-6 rounded-b-[15px]">
            {![5, 6, 7, 8, 9].includes(activeSteps?.electricalSteps) && (
              <NavigatePreview handlePreview={handlePreview} />
            )}
            <NavigateButtons handleBack={handleBack} handleNext={handleNext} />
          </div>
        )}
      </div>
      <div className="relative flex w-fit h-[90%] justify-end items-end m-2 right-0 bg-transparent">
        {activeSteps?.electricalSteps == 3 ? (
          <CostCalculator />
        ) : (
          <div className="w-[23.06px] h-[142px] m-auto mr-0 right-0 border-[4px] border-solid border-[#D9D9D9] bg-[#000000] rounded-[5px] backdrop-blur-[100px]">
            <div className="flex h-full w-full text-center justify-center items-center bg-[#000000] rounded-[5px] backdrop-blur-[100px] text-[20px] text-[#ffffff]">
              ‹
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default InvoiceSelection;
