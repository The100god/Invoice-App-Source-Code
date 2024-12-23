interface InvoiceInfoValidationData {
  dateOfIssue: string;
  companyName: string;
  phoneNumber: string;
  countryCode: string;
  email: string;
  companyLogo: File | null;
}

interface InvoiceInfoValidationErrors {
  dateOfIssue: string;
  companyName: string;
  phoneNumber: string;
  email: string;
  companyLogo: string;
}

interface InvoiceInfoValidationProp {
  formData: InvoiceInfoValidationData[];
  activeTabIndex: number;
  errors:InvoiceInfoValidationErrors[];
  setErrors: React.Dispatch<React.SetStateAction<InvoiceInfoValidationErrors[]>>;
}

export const validate = ({
  formData,
  activeTabIndex,
  errors,
  setErrors,
}: InvoiceInfoValidationProp) => {
  let isValid = true;

  // Initialize errors for the active tab
  const newErrors: InvoiceInfoValidationErrors = {
    dateOfIssue: "",
    companyName: "",
    phoneNumber: "",
    email: "",
    companyLogo: "",
  };

  const activeFormData = formData[activeTabIndex];

  // Validate Date of Issue
  if (!activeFormData.dateOfIssue) {
    newErrors.dateOfIssue = "Date of issue is required.";
    isValid = false;
  }

  // Validate Company Name
  if (!activeFormData.companyName) {
    newErrors.companyName = "Company name is required.";
    isValid = false;
  }

  // Validate Phone Number (only check if the phone number is 10 digits)
  if (!/^\d{10}$/.test(activeFormData.phoneNumber)) {
    newErrors.phoneNumber = "Phone number must be 10 digits.";
    isValid = false;
  }

  // Validate Email (simple regex for email validation)
  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(activeFormData.email)) {
    newErrors.email = "Invalid email address.";
    isValid = false;
  }

  // Validate Company Logo (ensure it's either a valid file or null)
  if (!activeFormData.companyLogo) {
    newErrors.companyLogo = "Company logo is required.";
    isValid = false;
  } else if (!(activeFormData.companyLogo instanceof File)) {
    newErrors.companyLogo = "Invalid file for company logo.";
    isValid = false;
  }

  // Update the errors for the active tab
  const updatedErrors = [...errors];
  updatedErrors[activeTabIndex] = newErrors;

  setErrors(updatedErrors);

  return isValid;
};
