import { atom } from "jotai";

// Define the type for the form data
export interface InvoiceFormData {
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
export const formDataAtom = atom<InvoiceFormData[]>([
  {
    dateOfIssue: "",
    companyName: "",
    phoneNumber: "",
    countryCode: "+1",
    email: "",
    companyLogo: null,
  },
]);

// Errors atom
export const errorsAtom = atom<Errors[]>([
  {
    dateOfIssue: "",
    companyName: "",
    phoneNumber: "",
    email: "",
    companyLogo: "",
  },
]);

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
export const clientFormDataAtom = atom<ClientFormData[]>([
  {
    clientName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  },
]);

// Client errors atom
export const clientErrorsAtom = atom<ClientErrors[]>([
  {
    clientName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  },
]);

//item selection

export interface ItemSelectionData {
  selectedItem: string;
  brand: string;
  style: string;
  quantity: number;
  color: string;
  pole:string;
  amp:string;
  commissionType: string;
  linkPoductType: string;
  productLinkAmount: string;
  commissionValue: string;
  isCommission: boolean;
  productDetails: {
    price: string;
  } | null;
}
export interface ItemErrors {
  selectedItem: string;
  brand: string;
  style: string;
  quantity: string;
  color: string;
  pole:string;
  amp:string;
  commissionType: string;
  commissionValue: string;
}

export const itemSelectionDataAtom = atom<ItemSelectionData[]>([
  {
    selectedItem: "",
    brand: "",
    style: "",
    quantity: 1,
    color: "",
    pole:"",
  amp:"",
    commissionType: "",
    commissionValue: "",
    linkPoductType: "",
    productLinkAmount: "0",
    isCommission: false,
    productDetails: {
      price: "",
    },
  },
]);

// Errors atom
export const itemErrorsAtom = atom<ItemErrors[]>([
  {
    selectedItem: "",
    brand: "",
    style: "",
    quantity: "",
    color: "",
    pole:"",
  amp:"",
    commissionType: "",
    commissionValue: "",
  },
]);
// export const productDetailsAtom = atom<{
//   price: string;
//   // color: string;
//   // type: string;
// } | null>(null);

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
  variableContTotHourRate: string;
  variableAddEmployees: string;
  materialCostVal: string;
  hourlyRateScopeWork: string;
  variableContRatePerHour: string;
  projectAmountQuantityVal: string;
}

// Atoms for each field

interface Employee {
  name: string;
  hours: number;
  rate: number;
}
interface LabourState {
  labourSelectedVal: string;
  labourType: string;
  labourHour: string;
  contContractorRate: string;
  employeesNo: string;
  employeesRate: string;
  uniformScopeWork: string;
  hourlyRateScopeWork: string;
  materialCostVal: string;
  uniformProjectAmount: string;
  variableContRatePerHour: string;
  variableContTotHourRate: string;
  projectAmountQuantityVal: string;
  variableAddEmployees: Employee[];
}

export const labourStateAtom = atom<LabourState[]>([
  {
    labourSelectedVal: "",
    labourType: "Uniform",
    labourHour: "0",
    contContractorRate: "",
    employeesNo: "0",
    employeesRate: "",
    uniformScopeWork: "",
    hourlyRateScopeWork: "",
    materialCostVal: "Yes",
    uniformProjectAmount: "0",
    variableContRatePerHour: "",
    variableContTotHourRate: "",
    projectAmountQuantityVal: "",
    variableAddEmployees: [
      {
        name: "",
        hours: 0,
        rate: 0,
      },
    ],
  },
]);

// Errors atom
export const labourErrorsAtom = atom<LabourErrors[]>([
  {
    labourType: "",
    labourSelectedVal: "",
    labourHour: "",
    contContractorRate: "",
    employeesNo: "",
    employeesRate: "",
    uniformScopeWork: "",
    uniformProjectAmount: "",
    variableContTotHourRate: "",
    variableAddEmployees: "",
    materialCostVal: "",
    hourlyRateScopeWork: "",
    variableContRatePerHour: "",
    projectAmountQuantityVal: "",
  },
]);

// Trip charge
// Atoms for trip charge value and error state
interface tripChargeStates {
  tripChargeVal: string;
  isStandardCost: boolean;
  isCalculateCost: boolean;
  amountPerMiles: string;
  traveledMiles: string;
  totalMilesAmount: string;
}
interface tripChargeError {
  tripChargeVal: string;
  amountPerMiles: string;
  traveledMiles: string;
}

export const tripChargeAtom = atom<tripChargeStates[]>([
  {
    tripChargeVal: "",
    isStandardCost: false,
    isCalculateCost: false,
    amountPerMiles: "",
    traveledMiles: "",
    totalMilesAmount: "00.00",
  },
]);

export const tripChargeErrorAtom = atom<tripChargeError[]>([
  {
    tripChargeVal: "",
    amountPerMiles: "",
    traveledMiles: "",
  },
]);

//term and conditions
interface TermsConditionStates {
  termAndCondition: string;
}
export const termConditionAtom = atom<TermsConditionStates[]>([
  { termAndCondition: "" },
]);

//taxRate Data
interface TaxRateStates {
  tax: string;
}
export const taxRateAtom = atom<TaxRateStates[]>([{ tax: "" }]);

// export const productLinkAmountAtom = atom<string>("0");

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
export interface ClientContractorStates {
  contractorNameValue: string;
  contractDateValue: string;
  contractorSign: File | null;
  clientNameValue: string;
  clientDateValue: string;
  clientSign: File | null;
  sign: string;
}

// Atom to store error state
export const clientContractorErrorsAtom = atom<ClientContractorErrorsType[]>([
  {
    contractorNameValue: "",
    contractDateValue: "",
    contractorSign: "",
    clientNameValue: "",
    clientDateValue: "",
    clientSign: "",
    sign: "",
  },
]);
export const clientContractorAtom = atom<ClientContractorStates[]>([
  {
    contractorNameValue: "",
    contractDateValue: "",
    contractorSign: null,
    clientNameValue: "",
    clientDateValue: "",
    clientSign: null,
    sign: "No",
  },
]);

// Adding new material variable

export interface newMaterialVariableStates {
  selectedItem: string;
  brand: string;
  style: string;
  quantity: number;
  color: string;
  pole:string;
  amp:string;
  commissionType: string;
  linkProductType: string;
  productLinkAmount: string;
  commissionValue: string;
  isCommission: boolean;
  productDetails: {
    price: string;
  } | null;
}
export interface newMaterialVariableError {
  selectedItem: string;
  brand: string;
  style: string;
  quantity: string;
  color: string;
  pole:string;
  amp:string;
  commissionType: string;
  commissionValue: string;
}

export const newMaterialVariableAtom = atom<newMaterialVariableStates[][]>([
  []
]);
// export const newMaterialVariableAtom = atom<newMaterialVariableStates[][]>([
//   [{
//     selectedItem: "",
//     brand: "",
//     style: "",
//     quantity: 1,
//     color: "",
//     commissionType: "",
//     commissionValue: "",
//     linkProductType: "",
//     productLinkAmount: "0",
//     isCommission: false,
//     productDetails: {
//       price: "",
//     },
//   },]
// ]);

export const newMaterialVariableErrorAtom = atom<newMaterialVariableError[][]>([[]])
// export const newMaterialVariableErrorAtom = atom<newMaterialVariableError[][]>([[{
//   selectedItem: "",
//     brand: "",
//     style: "",
//     quantity: "",
//     color: "",
//     commissionType: "",
//     commissionValue: "",
// }]])

export interface newMaterialIndexState{
  activeNewMaterialIndex:number
}

export interface openAddNewMaterialState{
  openAddNewMaterialPopUp:boolean,
}
export interface isExistingProjectState{
  isExistingProject:boolean,
}

export const openAddNewMaterialAtom = atom<openAddNewMaterialState[]>([{openAddNewMaterialPopUp:false}])
export const newMaterialIndexAtom = atom<newMaterialIndexState[]>([{activeNewMaterialIndex:0}])
export const isExistingProjectAtom = atom<isExistingProjectState[]>([{
  isExistingProject:false,
}])