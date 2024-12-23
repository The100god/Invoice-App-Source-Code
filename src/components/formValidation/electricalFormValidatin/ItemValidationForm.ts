

interface ItemErrorsType {
    selectedItem: string;
    brand: string;
    style: string;
    quantity: string;
    color: string;
    commissionType: string;
    commissionValue: string;
}


interface ItemSelectionScreenProps {
    selectedItem: string; 
    brand: string; 
    style: string; 
    quantity: number; 
    color: string; 
    isCommission:boolean;
    commissionType: string; 
    commissionValue: string; 
    setItemErrors: React.Dispatch<React.SetStateAction<ItemErrorsType>>
  }

export const itemValidate = ({selectedItem,
    brand,
    style,
    quantity,
    color,
    commissionType,
    isCommission,
    commissionValue,setItemErrors}:ItemSelectionScreenProps) => {
    let isValid = true;
    const newErrors = {
      selectedItem: "",
      brand: "",
      style: "",
      quantity: "",
      color: "",
      commissionType: "",
      commissionValue: "",
    };
    

  
    if (!selectedItem) {
      newErrors.selectedItem = "Item selection is required.";
      isValid = false;
    }
    if (!brand) {
      newErrors.brand = "Brand selection is required.";
      isValid = false;
    }
    if (!style) {
      newErrors.style = "Style selection is required.";
      isValid = false;
    }
    if (quantity < 1) {
      newErrors.quantity = "Quantity must be at least 1.";
      isValid = false;
    }
    if (!color) {
      newErrors.color = "Color is required.";
      isValid = false;
    }
    if (isCommission){
      if (!commissionType) {
        newErrors.commissionType = "Commission type is required.";
        isValid = false;
      }
      if (!commissionValue || parseFloat(commissionValue) <= 0) {
        newErrors.commissionValue = "Valid commission value is required.";
        isValid = false;
      }
    }
  
    setItemErrors(newErrors);
    return isValid;
  };
  