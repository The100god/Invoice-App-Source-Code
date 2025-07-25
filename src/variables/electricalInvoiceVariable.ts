import { atom } from "jotai";

type InvoiceBillSelectType = {
  selectedBillInvoice: string;
  selectedBillImage: string;
}[];

// Default value: all tabs start with BillLayout1
export const invoiceBillSelectAtom = atom<InvoiceBillSelectType[]>([
  Array(11).fill({ 
    selectedBillInvoice: "BillLayout3",
    selectedBillImage: "bill3",

   }) // adjust array size if you support more tabs
]);


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
  pole: string;
  use: string;
  version: string;
  neutral: string;
  type: string;
  amp: string;
  note: string;
  materialLink: string;
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
  materialLink: string;
  pole: string;
  amp: string;
  use: string;
  version: string;
  neutral: string;
  type: string;
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
    pole: "",
    use: "",
    version: "",
    neutral: "",
    type: "",
    amp: "",
    note: "",
    materialLink: "",
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
    pole: "",
    use: "",
    version: "",
    neutral: "",
    type: "",
    amp: "",
    materialLink: "",
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
  contractorSignFile:string;
  clientNameValue: string;
  clientDateValue: string;
  clientSign: string;
  clientSignFile: string;
  sign: string;
}
export interface ClientContractorStates {
  contractorNameValue: string;
  contractDateValue: string;
  contractorSignFile: File | null;
  contractorSign: string;
  clientNameValue: string;
  clientDateValue: string;
  clientSignFile: File | null;
  clientSign: string;
  sign: string;
}

// Atom to store error state
export const clientContractorErrorsAtom = atom<ClientContractorErrorsType[]>([
  {
    contractorNameValue: "",
    contractDateValue: "",
    contractorSign: "",
    contractorSignFile: "",
    clientNameValue: "",
    clientDateValue: "",
    clientSign: "",
    clientSignFile: "",
    sign: "",
  },
]);
export const clientContractorAtom = atom<ClientContractorStates[]>([
  {
    contractorNameValue: "",
    contractDateValue: "",
    contractorSignFile: null,
    contractorSign: "",
    clientNameValue: "",
    clientDateValue: "",
    clientSign: "",
    clientSignFile: null,
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
  pole: string;
  amp: string;
  note: string;
  use: string;
  version: string;
  neutral: string;
  type: string;
  materialLink: string;
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
  use: string;
  version: string;
  neutral: string;
  type: string;
  pole: string;
  materialLink: string;
  amp: string;
  commissionType: string;
  commissionValue: string;
}

export const newMaterialVariableAtom = atom<newMaterialVariableStates[][]>([
  [],
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

export const newMaterialVariableErrorAtom = atom<newMaterialVariableError[][]>([
  [],
]);
// export const newMaterialVariableErrorAtom = atom<newMaterialVariableError[][]>([[{
//   selectedItem: "",
//     brand: "",
//     style: "",
//     quantity: "",
//     color: "",
//     commissionType: "",
//     commissionValue: "",
// }]])

export interface newMaterialIndexState {
  activeNewMaterialIndex: number;
}
export interface MaterialSectionStepsState {
  materialSectionStepsCount: number;
}
export interface SelectMaterialSectionStepsState {
  selectMaterialSectionStepsCount: number;
}
export interface AddNewMaterialSectionStepsState {
  addNewMaterialSectionStepsCount: number;
}

export interface openAddNewMaterialState {
  openAddNewMaterialPopUp: boolean;
}
export interface isExistingProjectState {
  isExistingProject: boolean;
}
export interface billLogoImageDataState {
  billLogoImage: File | null;
}

export const openAddNewMaterialAtom = atom<openAddNewMaterialState[]>([
  // { openAddNewMaterialPopUp: false },
]);
export const newMaterialIndexAtom = atom<newMaterialIndexState[]>([
  { activeNewMaterialIndex: 0 },
]);
export const materialSectionStepsAtom = atom<MaterialSectionStepsState[]>([
  { materialSectionStepsCount: 0 },
]);
export const selectMaterialSectionStepsAtom = atom<
  SelectMaterialSectionStepsState[]
>([{ selectMaterialSectionStepsCount: 0 }]);
export const addNewMaterialSectionStepsAtom = atom<
  AddNewMaterialSectionStepsState[]
>([{ addNewMaterialSectionStepsCount: 0 }]);
export const isExistingProjectAtom = atom<isExistingProjectState[]>([
  {
    isExistingProject: false,
  },
]);
export const billLogoImageDataAtom = atom<billLogoImageDataState[]>([
  {
    billLogoImage: null,
  },
]);
