//labour Validation

interface Employee {
  name: string;
  hours: number;
  rate: number;
}

interface LabourErrorsType {
  labourType: string,
  labourSelectedVal: string,
  labourHour: string,
  contContractorRate: string,
  employeesNo: string,
  employeesRate: string,
  uniformScopeWork: string,
  uniformProjectAmount: string,
  varriableContTotHourRate: string,
  variableAddEmployees: string,
  materialCostVal: string,
  hourlyRateScopeWork: string,
  varriableContRatePerHour: string,
  projectAmountQuantityVal: string,
}

interface LabourValidationProps {
  labourType: string;
  labourSelectedVal: string;
  labourHour: string;
  contContractorRate: string;
  employeesNo: string;
  employeesRate: string;
  uniformScopeWork: string;
  uniformProjectAmount: string;
  varriableContTotHourRate: string;
  variableAddEmployees: Employee[];
  materialCostVal:string;
  hourlyRateScopeWork:string;
  varriableContRatePerHour:string;
  projectAmountQuantityVal:string;
  setLabourErrors: React.Dispatch<React.SetStateAction<LabourErrorsType>>;
  
}

export const labourValidation = ({labourType,
    labourSelectedVal,
    labourHour,
    contContractorRate,
    employeesNo,
    employeesRate,
    uniformScopeWork,
    uniformProjectAmount,
    varriableContTotHourRate,
    varriableContRatePerHour,
    projectAmountQuantityVal,
    variableAddEmployees, materialCostVal,hourlyRateScopeWork,setLabourErrors}:LabourValidationProps) => {
    let isValid = true;
    const newErrors = {
      labourType: "",
      labourSelectedVal: "",
      labourHour: "",
      contContractorRate: "",
      employeesNo: "",
      employeesRate: "",
      uniformScopeWork: "",
      uniformProjectAmount: "",
      varriableContTotHourRate: "",
      variableAddEmployees: "",
      varriableContRatePerHour: "",
      materialCostVal: "",
      hourlyRateScopeWork: "",
      projectAmountQuantityVal: "",
    };

    if (!labourType) {
      newErrors.labourType = "Labour type selection is required.";
      isValid = false;
    }
    if (!labourSelectedVal) {
      newErrors.labourSelectedVal = "labour pay type selection is required.";
      isValid = false;
    }
    if (labourSelectedVal=== "Hourly Rate" && labourType === "Uniform") {
      if (!labourHour || parseFloat(labourHour) <= 0) {
        newErrors.labourHour = "labour hour selection is required.";
        isValid = false;
      }
      if (!contContractorRate) {
        newErrors.contContractorRate = "Contractor rate selection is required.";
        isValid = false;
      }
      if (!hourlyRateScopeWork) {
        newErrors.hourlyRateScopeWork = "Scope of work selection is required.";
        isValid = false;
      }
      if (!employeesNo || parseFloat(employeesNo) <= 0) {
        newErrors.employeesNo = "employees number is required.";
        isValid = false;
      }
      if (!employeesRate) {
        newErrors.employeesRate = "Employees Rate is required.";
        isValid = false;
      }
    }

    if (labourSelectedVal=== "Hourly Rate" && labourType == "Variable" ) {
      if (
        !varriableContTotHourRate ||
        parseFloat(varriableContTotHourRate) <= 0
      ) {
        newErrors.varriableContTotHourRate =
        "Contractor's Hourly Rate is required.";
        isValid = false;
      }
      if (
        !varriableContRatePerHour ||
        parseFloat(varriableContRatePerHour) <= 0
      ) {
        newErrors.varriableContRatePerHour =
        "Contractor's Rate/hr is required.";
        isValid = false;
      }
      if (!hourlyRateScopeWork) {
        newErrors.hourlyRateScopeWork = "Scope of work selection is required.";
        isValid = false;
      }
      if (variableAddEmployees.length <= 0) {
        newErrors.variableAddEmployees = "Adding Employees is required.";
        isValid = false;
      }
    }
    
    if (labourSelectedVal == "Project Amount" && materialCostVal==="Yes") {
      if (!uniformScopeWork) {
        newErrors.uniformScopeWork = "Scope of Work selection is required.";
        isValid = false;
      }
      if (!uniformProjectAmount || parseInt(uniformProjectAmount)<=0) {
        newErrors.uniformProjectAmount = "Amount is required.";
        isValid = false;
      }
      if (!projectAmountQuantityVal) {
        newErrors.projectAmountQuantityVal = "Quantity is required.";
        isValid = false;
      }
      if (!materialCostVal) {
        newErrors.materialCostVal = "select MAterial cost is required.";
        isValid = false;
      }
    }

    setLabourErrors(newErrors);
    return isValid;
  };


