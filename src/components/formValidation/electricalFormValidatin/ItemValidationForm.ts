

interface ItemValidateData {
  selectedItem: string;
  brand: string;
  style: string;
  quantity: number;
  color: string;
  pole:string;
  use:string;
  version:string;
  neutral:string;
  type:string;
  amp:string;
  materialLink:string;
  commissionType: string;
  commissionValue: string;
  isCommission: boolean;
}

interface ItemValidateErrors {
  selectedItem: string;
  brand: string;
  style: string;
  quantity: string;
  color: string;
  pole:string;
  use:string;
  version:string;
  neutral:string;
  type:string;
  amp:string;
  materialLink:string;
  commissionType: string;
  commissionValue: string;
}

interface ItemValidateProps {
  itemSelectionData: ItemValidateData[];
  activeTabIndex: number;
  itemErrors: ItemValidateErrors[];
  setItemErrors: React.Dispatch<React.SetStateAction<ItemValidateErrors[]>>;
}

export const itemValidate = ({
  itemSelectionData,
  activeTabIndex,
  itemErrors,
  setItemErrors,
}: ItemValidateProps): boolean => {
  let isValid = true;

  // Initialize errors for the active tab
  const newErrors: ItemValidateErrors = {
    selectedItem: "",
    brand: "",
    style: "",
    quantity: "",
    color: "",pole:"",
    use:"",
  version:"",
  neutral:"",
  type:"",
    amp:"",
    materialLink:"",
    commissionType: "",
    commissionValue: "",
  };

  const activeFormData = itemSelectionData[activeTabIndex];

  // Validation logic
  if (!activeFormData.selectedItem.trim() && !activeFormData.materialLink) {
    newErrors.selectedItem = "Selecting a item or adding link of material is required.";
    isValid = false;
  }  else {
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

  // Update the errors for the active tab
  // console.log("itemErrors", itemErrors)
  // const updatedErrors = [itemErrors];
  const updatedErrors = [...itemErrors];
updatedErrors[activeTabIndex] = newErrors;
setItemErrors(updatedErrors);
console.log("isValid: ", isValid)
  return isValid;
};
