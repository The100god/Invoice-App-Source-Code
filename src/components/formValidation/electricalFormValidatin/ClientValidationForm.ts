
interface clientValidateData {
    clientName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  }
  
  interface clientValidateErrors {
    clientName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  }
  
  interface clientValidateProps {
    clientFormData: clientValidateData;
    
    setClientErrors: React.Dispatch<React.SetStateAction<clientValidateErrors>>;
  }
export const clientValidate = ({clientFormData, setClientErrors}: clientValidateProps) => {
    let isValid = true;
    const newErrors = {
      clientName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    };
  
    if (!clientFormData.clientName) {
      newErrors.clientName = "Client name is required.";
      isValid = false;
    }
  
    if (!clientFormData.address) {
      newErrors.address = "Address is required.";
      isValid = false;
    }
  
    if (!clientFormData.city) {
      newErrors.city = "City is required.";
      isValid = false;
    }
  
    if (!clientFormData.state) {
      newErrors.state = "State is required.";
      isValid = false;
    }
  
    if (!/^\d{5}$/.test(clientFormData.zipCode)) {
      newErrors.zipCode = "Zip code must be 5 digits.";
      isValid = false;
    }
  
    setClientErrors(newErrors);
    return isValid;
  };
  