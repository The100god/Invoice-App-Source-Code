import { Link, useNavigate } from "react-router-dom";
import NavigateButtons from "../../components/navigation/NavigateButtons"; // Adjust the path as needed
import { IoClose } from "react-icons/io5";
import ProgrssBar from "../../components/progressbar/ProgrssBar";
import { useState } from "react";

import CostCalculator from "../../components/costCalculator/CostCalculator";
import NavigateCloseButtons from "../../components/navigation/NavigationCloseBtn";

import { labourValidation } from "../../components/formValidation/electricalFormValidatin/LabourFormValidation";
import { itemValidate } from "../../components/formValidation/electricalFormValidatin/ItemValidationForm";
import { clientValidate } from "../../components/formValidation/electricalFormValidatin/ClientValidationForm";
import { validate } from "../../components/formValidation/electricalFormValidatin/InvoiceInfoValidationForm";
// import { TripChargeValidation } from "../../components/formValidation/electricalFormValidatin/TripChargeValidationForm";
import { useAtom } from "jotai";
import {
  brandAtom,
  clientContractorErrorsAtom,
  clientDateValueAtom,
  clientErrorsAtom,
  clientFormDataAtom,
  clientNameValueAtom,
  clientSignAtom,
  colorAtom,
  commissionTypeAtom,
  commissionValueAtom,
  contContractorRateAtom,
  contractorDateValueAtom,
  contractorNameValueAtom,
  contractorSignAtom,
  employeesNoAtom,
  employeesRateAtom,
  errorsAtom,
  formDataAtom,
  hourlyRateScopeWorkAtom,
  itemErrorsAtom,
  labourErrorsAtom,
  labourHourAtom,
  labourMaterialCostAtom,
  labourSelectedValAtom,
  labourTypeAtom,
  projectAmountQuantityValAtom,
  quantityAtom,
  selectedItemAtom,
  signAtom,
  styleAtom,
  // tripChargeErrorAtom,
  // tripChargeValAtom,
  uniformProjectAmountAtom,
  uniformScopeWorkAtom,
  variableAddEmployeesAtom,
  varriableContRatePerHourAtom,
  varriableContTotHourRateAtom,
} from "../../variables/electricalInvoiceVariable";
import { invoiceSelectAtom, stepsAtom } from "../../variables/Home";
import ElecricalInvoiceHero from "./elecricalInvoice/ElecricalInvoiceHero";
import ElectricalInvoiceHeading from "./elecricalInvoice/ElectricalInvoiceHeading";
import NavigatePreview from "../../components/navigation/NavigatePreviewBtn";
import { ClientContractorSignValidation } from "../../components/formValidation/electricalFormValidatin/ClientContractorSignValidation";

const InvoiceSelection = () => {
  const divide = 100 / 9
  const navigate = useNavigate();
  const [progress, setProgress] = useState(Math.ceil(divide));
  const [electricalSteps, setElectricalSteps] = useAtom(stepsAtom);
  const [invoiceSelect, setInvoiceSelect] = useAtom(invoiceSelectAtom);
  //invoiceinfo
  const [formData] = useAtom(formDataAtom);
  const [errors, setErrors] = useAtom(errorsAtom);
  //clientdetails
  const [clientFormData] = useAtom(clientFormDataAtom);
  const [, setClientErrors] = useAtom(clientErrorsAtom);

  //itemselection
  const [selectedItem] = useAtom(selectedItemAtom);
  const [brand] = useAtom(brandAtom);
  const [style] = useAtom(styleAtom);
  const [quantity] = useAtom(quantityAtom);
  const [color] = useAtom(colorAtom);
  const [commissionType] = useAtom(commissionTypeAtom);
  const [commissionValue] = useAtom(commissionValueAtom);
  const [, setItemErrors] = useAtom(itemErrorsAtom);

  //labour data
  const [labourSelectedVal] = useAtom(labourSelectedValAtom);
  const [labourType] = useAtom(labourTypeAtom);
  const [labourHour] = useAtom(labourHourAtom);
  const [contContractorRate] = useAtom(contContractorRateAtom);
  const [employeesNo] = useAtom(employeesNoAtom);
  const [employeesRate] = useAtom(employeesRateAtom);
  const [uniformScopeWork] = useAtom(uniformScopeWorkAtom);
  const [uniformProjectAmount] = useAtom(uniformProjectAmountAtom);
  const [varriableContTotHourRate] = useAtom(
    varriableContTotHourRateAtom
  );
  const [variableAddEmployees] = useAtom(variableAddEmployeesAtom);
  const [materialCostVal] = useAtom(labourMaterialCostAtom);
  const [hourlyRateScopeWork] = useAtom(hourlyRateScopeWorkAtom);
  const [varriableContRatePerHour] = useAtom(varriableContRatePerHourAtom);
  const [projectAmountQuantityVal] = useAtom(projectAmountQuantityValAtom);
  const [, setLabourErrors] = useAtom(labourErrorsAtom);

  //tripcharge
  // const [tripChargeVal] = useAtom(tripChargeValAtom);
  // const [, setTripChargeError] = useAtom(tripChargeErrorAtom);

  //clientContractor sign variables

  const [contractorNameValue, ] = useAtom(contractorNameValueAtom);
  const [contractDateValue, ] = useAtom(contractorDateValueAtom);
  const [contractorSign, ] = useAtom(contractorSignAtom);
  const [clientNameValue, ] = useAtom(clientNameValueAtom);
  const [clientDateValue, ] = useAtom(clientDateValueAtom);
  const [clientSign, ] = useAtom(clientSignAtom);
  const [sign,] = useAtom(signAtom);
  const [, setClientContractorErrors] = useAtom(clientContractorErrorsAtom);

  const handlePreview = ()=>{
    //
  }

  

  const handleBack = () => {
    if (electricalSteps == 1) {
      navigate(-1); // Navigate to the previous page
    }
    setElectricalSteps(electricalSteps > 1 ? electricalSteps - 1 : 1);
    setProgress(progress - Math.ceil(divide));
  };

  const handleNext = () => {
    // You can add your logic here if there's a 'next' page
    if (electricalSteps == 1 && validate({ formData, setErrors })) {
      setElectricalSteps(2);
      setProgress(electricalSteps * Math.ceil(divide));
    }
    if (electricalSteps == 2 && clientValidate({ clientFormData, setClientErrors })) {
      setElectricalSteps(3);
      setProgress(electricalSteps * Math.ceil(divide));
    }
    if (
      electricalSteps == 3 &&
      itemValidate({
        selectedItem,
        brand,
        style,
        quantity,
        color,
        commissionType,
        commissionValue,
        setItemErrors,
      })
    ) {
      setElectricalSteps(4);
      setProgress(electricalSteps * Math.ceil(divide));
    }
    if (
      electricalSteps == 4 &&
      labourValidation({
        labourType,
        labourSelectedVal,
        labourHour,
        contContractorRate,
        employeesNo,
        employeesRate,
        uniformScopeWork,
        uniformProjectAmount,
        varriableContTotHourRate,
        variableAddEmployees,
        materialCostVal,
        hourlyRateScopeWork,
        varriableContRatePerHour,
        projectAmountQuantityVal,
        setLabourErrors,
      })
    ) {
      setElectricalSteps(5);
      setProgress(electricalSteps * Math.ceil(divide));
    }
    if (
      electricalSteps == 5 
    ) {
      setElectricalSteps(6);
      // console.log(steps)
      setProgress(electricalSteps * Math.ceil(divide));
    }
    if (
      electricalSteps == 6 
    ) {
      setElectricalSteps(7);
      // console.log(steps)
      setProgress(electricalSteps * Math.ceil(divide));
    }
    if (
      electricalSteps == 7 
    ) {
      setElectricalSteps(8);
      // console.log(steps)
      setProgress(electricalSteps * Math.ceil(divide));
    }
    if ( sign ==="Yes"?
      electricalSteps == 8 && ClientContractorSignValidation({contractorNameValue,contractDateValue,
        contractorSign,
        clientNameValue,
        clientDateValue,
        clientSign,
        sign,
        setClientContractorErrors}): electricalSteps == 8
    ) {
      setElectricalSteps(9);
      // console.log(steps)
      setProgress(100);
    }
    if (electricalSteps == 9) {
      setElectricalSteps(10);
      // console.log(steps)
      setProgress(100);
    } else {
      console.log("Form has errors:", errors);
    }

    console.log("Proceeding to the next step...");
  };

  const handleCloseForm = () => {
    navigate(-1);
    setElectricalSteps(1)
  };

  return (
    <div className="h-full w-full flex flex-row items-center justify-between ">
      <div className=" m-auto relative h-[80%] w-[926px] flex flex-col items-center justify-between dark:bg-black shadow-[0_0px_12.2px_8px_rgba(0,0,0,0.2)] dark:shadow-[0_0px_12.2px_5px_rgba(256,256,256,0.2)] rounded-[25px]">
        <span className=" absolute flex flex-col justify-center items-center top-2 right-2 w-6 h-6 text-[18px] cursor-pointer bg-transparent">
          <IoClose />
        </span>
        <div className="flex flex-col justify-center w-full items-center h-[fit-content] bg-transparent">
          <div className="flex flex-col justify-center w-full items-center gap-4 h-[fit-content] px-6 py-6 bg-transparent">
            {invoiceSelect == "Electrical Invoice" &&
            <ElectricalInvoiceHeading/>
            }
          </div>
          <ProgrssBar progress={progress} />
        </div>

        <div
          className={`flex flex-col w-full h-[506px] bg-transparent p-4 ${
            electricalSteps == 7 ? " overflow-y-hidden" : "overflow-y-scroll"
          }`}
        >
          {electricalSteps == 1 && (
            <div className="flex flex-row justify-around items-center bg-transparent">
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
            {invoiceSelect == "Electrical Invoice" &&

              <ElecricalInvoiceHero/>
            }
          </div>
        </div>

        {/* Add the navigation buttons here */}
        {electricalSteps == 9 ? (
          <div className="flex w-full h-[fit-content] bg-[#C5D9DE80] dark:darkBottom bottom-0 px-2 py-6 rounded-b-[15px]">
            <NavigateCloseButtons handleCloseForm={handleCloseForm} />
          </div>
        ) : (
          <div className="flex justify-between w-full h-[fit-content] bg-[#C5D9DE80] dark:darkBottom bottom-0 px-4 py-6 rounded-b-[15px]">
            {![5, 6, 7, 8, 9, 10].includes(electricalSteps) && <NavigatePreview handlePreview={handlePreview}/>}
            <NavigateButtons handleBack={handleBack} handleNext={handleNext} />
          </div>
        )}
      </div>
      <div className="relative flex w-fit h-[90%] justify-end items-end m-2 right-0 bg-transparent">
        {electricalSteps == 4 ? (
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
