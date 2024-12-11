// import { errorsAtom, formDataAtom } from "../../../variables/electricalInvoiceVariable";
// import { useAtom } from "jotai";

// // Define the structure of the formData (InvoiceInfoValidationData)
// // interface InvoiceInfoValidationData {
// //   dateOfIssue: string;
// //   companyName: string;
// //   phoneNumber: string;
// //   countryCode: string;
// //   email: string;
// //   companyLogo: File | null;
// // }

// // // Define the structure of the error messages (InvoiceInfoValidationErrors)
// interface InvoiceInfoValidationErrors {
//   dateOfIssue: string;
//   companyName: string;
//   phoneNumber: string;
//   email: string;
//   companyLogo: string;
// }

// // Function to validate the form
// export const validate = (): boolean => {
//   const [formData] = useAtom(formDataAtom); // formData from the atom
//   const [, setErrors] = useAtom(errorsAtom); // errorsAtom to update errors state
  
//   let isValid = true;
  
//   // Initialize new errors object with default empty values
//   const newErrors: InvoiceInfoValidationErrors = {
//     dateOfIssue: "",
//     companyName: "",
//     phoneNumber: "",
//     email: "",
//     companyLogo: "",
//   };

//   // Check each field in formData and set corresponding error message if invalid
//   if (!formData.dateOfIssue) {
//     newErrors.dateOfIssue = "Date of issue is required.";
//     isValid = false;
//   }

//   if (!formData.companyName) {
//     newErrors.companyName = "Company name is required.";
//     isValid = false;
//   }

//   if (!/^\d{10}$/.test(formData.phoneNumber)) {
//     newErrors.phoneNumber = "Phone number must be 10 digits.";
//     isValid = false;
//   }

//   if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
//     newErrors.email = "Invalid email address.";
//     isValid = false;
//   }

//   if (!formData.companyLogo) {
//     newErrors.companyLogo = "Company logo is required.";
//     isValid = false;
//   }

//   // Update the errors atom with new error messages
//   setErrors(newErrors);
  
//   return isValid;
// };


// import { errorsAtom, formDataAtom } from "../../../variables/electricalInvoiceVariable";
// import { useAtom } from "jotai";

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
    formData: InvoiceInfoValidationData;
    
    
    setErrors: React.Dispatch<React.SetStateAction<InvoiceInfoValidationErrors>>;
  }
export const validate = ({formData,setErrors}:InvoiceInfoValidationProp) => {
  // const [formData, ] = useAtom(formDataAtom);
  // const [, setErrors] = useAtom(errorsAtom);
    let isValid = true;
    const newErrors = {
      dateOfIssue: "",
      companyName: "",
      phoneNumber: "",
      email: "",
      companyLogo: "",
    };
  
    if (!formData.dateOfIssue) {
      newErrors.dateOfIssue = "Date of issue is required.";
      isValid = false;
    }
  
    if (!formData.companyName) {
      newErrors.companyName = "Company name is required.";
      isValid = false;
    }
  
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits.";
      isValid = false;
    }
  
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
      isValid = false;
    }
  
    if (!formData.companyLogo) {
      newErrors.companyLogo = "Company logo is required.";
      isValid = false;
    }
  
    setErrors(newErrors);
    // setValid(isValid)
    return isValid;
  };