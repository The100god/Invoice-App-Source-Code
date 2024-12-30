// Labour Validation

interface Employee {
  name: string;
  hours: number;
  rate: number;
}

interface LabourErrorsType {
  labourType: string;
  labourSelectedVal: string;
  labourHour: string;
  contContractorRate: string;
  employeesNo: string;
  employeesRate: string;
  uniformScopeWork: string;
  uniformProjectAmount: string;
  variableContTotHourRate: string;
  variableAddEmployees: string;
  materialCostVal: string;
  hourlyRateScopeWork: string;
  variableContRatePerHour: string;
  projectAmountQuantityVal: string;
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
  variableContTotHourRate: string;
  variableAddEmployees: Employee[];
  materialCostVal: string;
  hourlyRateScopeWork: string;
  variableContRatePerHour: string;
  projectAmountQuantityVal: string;
}

interface LabourStateValidationProps {
  labourStateVariable: LabourValidationProps[];
  activeTabIndex: number;
  labourErrors: LabourErrorsType[];
  setLabourErrors: React.Dispatch<React.SetStateAction<LabourErrorsType[]>>;
}

export const labourValidation = ({
  labourStateVariable,
  activeTabIndex,
  labourErrors,
  setLabourErrors,
}: LabourStateValidationProps): boolean => {
  let isValid = true;

  // Initialize errors object for the active tab
  const newErrors: LabourErrorsType = {
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
  };

  const activeLabourData = labourStateVariable[activeTabIndex];

  // Validate Labour Type
  if (!activeLabourData.labourType) {
    newErrors.labourType = "Labour type selection is required.";
    isValid = false;
  }

  // Validate Labour Selected Value
  if (!activeLabourData.labourSelectedVal) {
    newErrors.labourSelectedVal = "Labour pay type selection is required.";
    isValid = false;
  }

  // Validate Hourly Rate for Uniform Type
  if (
    activeLabourData.labourSelectedVal === "Hourly Rate" &&
    activeLabourData.labourType === "Uniform"
  ) {
    if (!activeLabourData.labourHour || parseFloat(activeLabourData.labourHour) <= 0) {
      newErrors.labourHour = "Labour hour selection is required.";
      isValid = false;
    }
    if (!activeLabourData.contContractorRate) {
      newErrors.contContractorRate = "Contractor rate selection is required.";
      isValid = false;
    }
    if (!activeLabourData.hourlyRateScopeWork) {
      newErrors.hourlyRateScopeWork = "Scope of work selection is required.";
      isValid = false;
    }
    if (!activeLabourData.employeesNo || parseFloat(activeLabourData.employeesNo) <= 0) {
      newErrors.employeesNo = "Employee number is required.";
      isValid = false;
    }
    if (!activeLabourData.employeesRate) {
      newErrors.employeesRate = "Employees rate is required.";
      isValid = false;
    }
  }

  // Validate Hourly Rate for Variable Type
  if (
    activeLabourData.labourSelectedVal === "Hourly Rate" &&
    activeLabourData.labourType === "Variable"
  ) {
    if (
      !activeLabourData.variableContTotHourRate ||
      parseFloat(activeLabourData.variableContTotHourRate) <= 0
    ) {
      newErrors.variableContTotHourRate = "Contractor's hourly rate is required.";
      isValid = false;
    }
    if (
      !activeLabourData.variableContRatePerHour ||
      parseFloat(activeLabourData.variableContRatePerHour) <= 0
    ) {
      newErrors.variableContRatePerHour = "Contractor's rate/hr is required.";
      isValid = false;
    }
    if (!activeLabourData.hourlyRateScopeWork) {
      newErrors.hourlyRateScopeWork = "Scope of work selection is required.";
      isValid = false;
    }
    if (activeLabourData.variableAddEmployees.length <= 0) {
      newErrors.variableAddEmployees = "Adding employees is required.";
      isValid = false;
    }
  }

  // Validate Project Amount
  if (
    activeLabourData.labourSelectedVal === "Project Amount" &&
    activeLabourData.materialCostVal === "Yes"
  ) {
    if (!activeLabourData.uniformScopeWork) {
      newErrors.uniformScopeWork = "Scope of work selection is required.";
      isValid = false;
    }
    if (
      !activeLabourData.uniformProjectAmount ||
      parseInt(activeLabourData.uniformProjectAmount, 10) <= 0
    ) {
      newErrors.uniformProjectAmount = "Project amount is required.";
      isValid = false;
    }
    if (!activeLabourData.projectAmountQuantityVal) {
      newErrors.projectAmountQuantityVal = "Quantity is required.";
      isValid = false;
    }
    if (!activeLabourData.materialCostVal) {
      newErrors.materialCostVal = "Material cost selection is required.";
      isValid = false;
    }
  }

  // Update errors in state for the active tab
  const updatedLabourErrors = [...labourErrors];
  updatedLabourErrors[activeTabIndex] = newErrors;
  setLabourErrors(updatedLabourErrors);

  return isValid;
};
