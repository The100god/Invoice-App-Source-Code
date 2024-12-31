import { ClientContractorStates } from "../../../variables/electricalInvoiceVariable";

interface ClientContractorErrorsType {
  contractorNameValue: string;
  contractDateValue: string;
  contractorSign: string;
  clientNameValue: string;
  clientDateValue: string;
  clientSign: string;
  sign: string;
}

interface ClientContractorProps {
  clientContractorData: ClientContractorStates[];
  activeTabIndex: number;
  clientContractorErrors: ClientContractorErrorsType[];
  setClientContractorErrors: React.Dispatch<
    React.SetStateAction<ClientContractorErrorsType[]>
  >;
}

export const ClientContractorSignValidation = ({
  clientContractorData,
  activeTabIndex,
  clientContractorErrors,
  setClientContractorErrors,
}: ClientContractorProps) => {
  const newErrors = {
    contractorNameValue: "",
    contractDateValue: "",
    contractorSign: "",
    clientNameValue: "",
    clientDateValue: "",
    clientSign: "",
    sign: "",
  };

  let isValid = true;

  const activeClientContractorData = clientContractorData[activeTabIndex];
  // Validate contractor fields
  if (!activeClientContractorData.contractorNameValue.trim()) {
    newErrors.contractorNameValue = "Contractor's name is required.";
    isValid = false;
  }

  if (!activeClientContractorData.contractDateValue.trim()) {
    newErrors.contractDateValue = "Contract date is required.";
    isValid = false;
  }

  if (!activeClientContractorData.contractorSign) {
    newErrors.contractorSign = "Contractor's signature is required.";
    isValid = false;
  }

  // Validate client fields
  if (!activeClientContractorData.clientNameValue.trim()) {
    newErrors.clientNameValue = "Client's name is required.";
    isValid = false;
  }

  if (!activeClientContractorData.clientDateValue.trim()) {
    newErrors.clientDateValue = "Client date is required.";
    isValid = false;
  }

  if (!activeClientContractorData.clientSign) {
    newErrors.clientSign = "Client's signature is required.";
    isValid = false;
  }

  // Validate radio group
  if (!activeClientContractorData.sign) {
    newErrors.sign = "Selecting 'Require Signature' is required.";
    isValid = false;
  }

  const updated = [...clientContractorErrors];
  updated[activeTabIndex] = newErrors;

  setClientContractorErrors(updated);

  return isValid;
};
