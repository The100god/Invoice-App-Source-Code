import { atom } from "jotai";

// Define the type for the form data
export interface FormData {
  dateOfIssue: string;
  companyName: string;
  phoneNumber: string;
  countryCode: string;
  email: string;
  companyLogo: File | null;
}

// Define the type for the errors state
export interface Errors {
  dateOfIssue: string;
  companyName: string;
  phoneNumber: string;
  email: string;
  companyLogo: string;
}

// Form data atom
export const formDataAtom = atom<FormData>({
  dateOfIssue: "",
  companyName: "",
  phoneNumber: "",
  countryCode: "+1",
  email: "",
  companyLogo: null,
});

// Errors atom
export const errorsAtom = atom<Errors>({
  dateOfIssue: "",
  companyName: "",
  phoneNumber: "",
  email: "",
  companyLogo: "",
});


//client details
export interface ClientFormData {
    clientName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  }
  
  // Define the type for the client errors
  export interface ClientErrors {
    clientName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  }
  
  // Client form data atom
  export const clientFormDataAtom = atom<ClientFormData>({
    clientName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });
  
  
  // Client errors atom
  export const clientErrorsAtom = atom<ClientErrors>({
    clientName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });



  //item selection
  export interface ItemErrors {
    selectedItem: string;
    brand: string;
    style: string;
    quantity: string;
    color: string;
    commissionType: string;
    commissionValue: string;
  }
  
  // Atoms for each field
  export const selectedItemAtom = atom<string>(""); 
  export const brandAtom = atom<string>(""); 
  export const styleAtom = atom<string>(""); 
  export const quantityAtom = atom<number>(1); 
  export const colorAtom = atom<string>(""); 
  export const commissionTypeAtom = atom<string>("");
  export const commissionValueAtom = atom<string>("");
  export const linkProductTypeAtom = atom<string>("");
  export const isCommissionAtom = atom<boolean>(false);

  export const productDetailsAtom = atom<{
    price: string;
    // color: string;
    // type: string;
  } | null>(null);
  
  // Errors atom
  export const itemErrorsAtom = atom<ItemErrors>({
    selectedItem: "",
    brand: "",
    style: "",
    quantity: "",
    color: "",
    commissionType: "",
    commissionValue: "",
  });

  //labour variable data

  export interface LabourErrors {
    labourType: string;
    labourSelectedVal: string;
    labourHour: string;
    contContractorRate: string;
    employeesNo: string;
    employeesRate: string;
    uniformScopeWork: string;
    uniformProjectAmount: string;
    varriableContTotHourRate: string;
    variableAddEmployees: string;
    materialCostVal: string;
    hourlyRateScopeWork:string;
    varriableContRatePerHour:string;
    projectAmountQuantityVal:string;
  }
  
  // Atoms for each field

  interface Employee {
    name: string;
    hours: number;
    rate: number;
  }
  export const labourSelectedValAtom = atom<string>("");
  export const labourTypeAtom = atom<string>("Uniform");
  export const labourHourAtom = atom<string>("0");
  export const contContractorRateAtom = atom<string>("");
  export const employeesNoAtom = atom<string>("0");
  export const employeesRateAtom = atom<string>("");
  export const uniformScopeWorkAtom = atom<string>("");
  export const hourlyRateScopeWorkAtom = atom<string>("");
  export const labourMaterialCostAtom = atom<string>("Yes");
  export const uniformProjectAmountAtom = atom<string>("0");
  export const varriableContRatePerHourAtom = atom<string>("");
  export const varriableContTotHourRateAtom = atom<string>("");
  export const projectAmountQuantityValAtom = atom<string>("");
  export const variableAddEmployeesAtom = atom<Employee[]>([]);
  
  // Errors atom
  export const labourErrorsAtom = atom<LabourErrors>({
    labourType: "",
    labourSelectedVal: "",
    labourHour: "",
    contContractorRate: "",
    employeesNo: "",
    employeesRate: "",
    uniformScopeWork: "",
    uniformProjectAmount: "",
    varriableContTotHourRate: "",
    variableAddEmployees: "",
    materialCostVal:"",
    hourlyRateScopeWork:"",
    varriableContRatePerHour:"",
    projectAmountQuantityVal:"",
  });


  // Trip charge
  // Atoms for trip charge value and error state
export const tripChargeValAtom = atom<string>("");
export const tripChargeErrorAtom = atom<string>("");

export const productLinkAmountAtom = atom<string>("0");



// client and contractor variable 

export interface ClientContractorErrorsType {
  contractorNameValue: string;
  contractDateValue: string;
  contractorSign: string;
  clientNameValue: string;
  clientDateValue: string;
  clientSign: string;
  sign: string;
}

// Atom to store error state
export const clientContractorErrorsAtom = atom<ClientContractorErrorsType>({
  contractorNameValue: "",
  contractDateValue: "",
  contractorSign: "",
  clientNameValue: "",
  clientDateValue: "",
  clientSign: "",
  sign: "",
});
export const contractorNameValueAtom = atom<string>("");
export const contractorDateValueAtom = atom<string>("");
export const contractorSignAtom = atom<File | null>(null);


// Client fields
export const clientNameValueAtom = atom<string>("");
export const clientDateValueAtom = atom<string>("");
export const clientSignAtom = atom<File | null>(null);


// Radio group
export const signAtom = atom<string>("Yes");
