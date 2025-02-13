

interface SelectMeterialValidateData {
    selectedItem: string;
    brand: string;
    style: string;
    quantity: number;
    color: string;
    pole:string;
  amp:string;
  materialLink:string;
    commissionType: string;
    commissionValue: string;
    isCommission: boolean;
  }
  
  interface SelectMeterialValidateErrors {
    selectedItem: string;
    brand: string;
    style: string;
    quantity: string;
    color: string;
    pole:string;
  amp:string;
  materialLink:string;
    commissionType: string;
    commissionValue: string;
  }
  
  interface SelectMeterialValidateProps {
    newMaterial: SelectMeterialValidateData[][];
    index1: number;
    activeNewMaterialIndex:number;
    newMaterialError: SelectMeterialValidateErrors[][];
    setNewMaterialError: React.Dispatch<React.SetStateAction<SelectMeterialValidateErrors[][]>>;
  }
  
  export const selectMaterialValidate = ({
    newMaterial,
    index1,
    activeNewMaterialIndex,
    newMaterialError, setNewMaterialError
  }: SelectMeterialValidateProps): boolean => {
    let isValid = true;
  
    // Initialize errors for the active tab
    const newErrors: SelectMeterialValidateErrors = {
      selectedItem: "",
      brand: "",
      style: "",
      quantity: "",
      color: "",
      pole:"",
  amp:"",
  materialLink:"",
      commissionType: "",
      commissionValue: "",
    };
  
    const activeFormData = newMaterial[index1][activeNewMaterialIndex];
  
    // Validation logic
    if (!activeFormData.selectedItem.trim() || !activeFormData.materialLink) {
      newErrors.selectedItem = "Selecting a item or adding link of material is required.";
      isValid = false;
    } else {
      if (
        [
          "outlet",
          "15amp Breaker",
          "20amp Breaker",
          "30amp Breaker",
          "40amp Breaker",
          "50amp Breaker",
          "switches",
          "three-way-switches",
          "four-way-switches",
        ].includes(activeFormData.selectedItem)
      ) {
        if (!activeFormData.brand.trim()) {
          newErrors.brand = "Brand selection is required.";
          isValid = false;
        }
  
        if (!activeFormData.style.trim()) {
          newErrors.style = "Style selection is required.";
          isValid = false;
        }
      }
    }
  
    if (activeFormData.quantity < 1) {
      newErrors.quantity = "Quantity must be at least 1.";
      isValid = false;
    }
  
    if (!activeFormData.color.trim()) {
      newErrors.color = "Color is required.";
      isValid = false;
    }
  
    if (activeFormData.isCommission) {
      if (!activeFormData.commissionType.trim()) {
        newErrors.commissionType = "Commission type is required.";
        isValid = false;
      }
  
      if (
        !activeFormData.commissionValue.trim() ||
        parseFloat(activeFormData.commissionValue) <= 0
      ) {
        newErrors.commissionValue = "Valid commission value is required.";
        isValid = false;
      }
    }
  
    const updatedErrors = [...newMaterialError];
    updatedErrors[index1] = [...updatedErrors[index1]];
    updatedErrors[index1][activeNewMaterialIndex] = newErrors;
  
    setNewMaterialError(updatedErrors);
  
    return isValid;
  };
  