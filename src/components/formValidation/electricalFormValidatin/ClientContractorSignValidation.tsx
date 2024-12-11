

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
    contractorNameValue: string;
    contractDateValue: string;
    contractorSign: File | null;
    clientNameValue: string;
    clientDateValue: string;
    clientSign: File | null;
    sign: string;
    setClientContractorErrors: React.Dispatch<React.SetStateAction<ClientContractorErrorsType>>
  }

  

export const ClientContractorSignValidation = ({contractorNameValue,contractDateValue,
    contractorSign,
    clientNameValue,
    clientDateValue,
    clientSign,
    sign,
    setClientContractorErrors}:ClientContractorProps) => {
    
    const newErrors = {
        contractorNameValue:"",
        contractDateValue:"",
        contractorSign:"",
        clientNameValue:"",
        clientDateValue:"",
        clientSign:"",
        sign:"",
    };
  
    let isValid = true;

    // Validate contractor fields
    if (!contractorNameValue.trim()) {
      newErrors.contractorNameValue="Contractor's name is required.";
      isValid = false;
    }

    if (!contractDateValue.trim()) {
      newErrors.contractDateValue="Contract date is required.";
      isValid = false;
    }

    if (!contractorSign) {
      newErrors.contractorSign="Contractor's signature is required.";
      isValid = false;
    }

    // Validate client fields
    if (!clientNameValue.trim()) {
      newErrors.clientNameValue="Client's name is required.";
      isValid = false;
    }

    if (!clientDateValue.trim()) {
      newErrors.clientDateValue="Client date is required.";
      isValid = false;
    }

    if (!clientSign) {
      newErrors.clientSign="Client's signature is required.";
      isValid = false;
    }

    // Validate radio group
    if (!sign) {
      newErrors.sign="Selecting 'Require Signature' is required.";
      isValid = false;
    }
    setClientContractorErrors(newErrors);

    return isValid;
  };
  