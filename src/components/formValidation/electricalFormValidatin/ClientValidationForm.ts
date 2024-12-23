interface ClientValidateData {
  clientName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

interface ClientValidateErrors {
  clientName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

interface ClientValidateProps {
  clientFormData: ClientValidateData[];
  activeTabIndex: number;
  clientErrors: ClientValidateErrors[];
  setClientErrors: React.Dispatch<React.SetStateAction<ClientValidateErrors[]>>;
}

export const clientValidate = ({
  clientFormData,
  activeTabIndex,
  clientErrors,
  setClientErrors,
}: ClientValidateProps): boolean => {
  let isValid = true;

  // Initialize errors for the active tab
  const newErrors: ClientValidateErrors = {
    clientName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  };

  const activeFormData = clientFormData[activeTabIndex];

  // Validation logic
  if (!activeFormData.clientName.trim()) {
    newErrors.clientName = "Client name is required.";
    isValid = false;
  }

  if (!activeFormData.address.trim()) {
    newErrors.address = "Address is required.";
    isValid = false;
  }

  if (!activeFormData.city.trim()) {
    newErrors.city = "City is required.";
    isValid = false;
  }

  if (!activeFormData.state.trim()) {
    newErrors.state = "State is required.";
    isValid = false;
  }

  if (!/^\d{5}$/.test(activeFormData.zipCode.trim())) {
    newErrors.zipCode = "Zip code must be 5 digits.";
    isValid = false;
  }

  // Update the errors for the active tab
  const updatedErrors = [...clientErrors];
  updatedErrors[activeTabIndex] = newErrors;

  setClientErrors(updatedErrors);

  return isValid;
};
