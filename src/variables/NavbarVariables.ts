import { atom } from "jotai";

export const isEnterInvoiceAtom = atom<boolean>(false)

export const activeTabIndexAtom = atom<number>(0);

// Atom to store the list of projects
export const projectsAtom = atom<{ name: string; id: number }[]>([
    // { name: "Untitled - Project 1", id: 0 },
]);

// Atom to store the active project ID
export const activeProjectIdAtom = atom<number | null>(null);

// State atoms
export const activeDropdownAtom = atom<string | null>(null);
export const activeInnerDropdownAtom = atom<string | null>(null);

export const disableTripChargeAtom = atom(false);
export const disableTaxAtom = atom(false);
export const disableTermsConAtom = atom(false);
export const disableContractorClientSignaturesAtom = atom(false);
export const costCalculatorAtom = atom(false);
export const projectMaterialDetailsAtom = atom(false);
export const SelectedProjectNameAtom = atom("");

export const showLabelColorPickerAtom = atom(false);
export const showValueColorPickerAtom = atom(false);
export const showOutlineColorPickerAtom = atom(false);
export const showDescriptionsColorPickerAtom = atom(false);

// Color atoms
export interface colorStates {
    labelColor:string,
    outlineColor:string,
    valuesColor:string,
    descriptionsColor:string,
}
export const colorChangeAtom = atom<colorStates[]>([{
    // labelColor:"#00000099",
    // outlineColor:"#000000E5",
    // valuesColor:"#FFEA00",
    // descriptionsColor:"#00FF11",
    labelColor:"#000000",
    outlineColor:"#000000",
    valuesColor:"#000000",
    descriptionsColor:"#000000",
}])

// Search term atom
export const searchTermAtom = atom("");

//
export interface elctronicFormClickStates{
    elctronicHomeClick:boolean;
}
export const homeClickAtom = atom<elctronicFormClickStates[]>([{
    elctronicHomeClick:true,
}])


// zoom in/out


export const zoomInOutAtom = atom<number>(100); // Default zoom level is 100%
  

export interface printBillStates{
    selectedPrintBill:boolean;
}
export const printBillAtom = atom<printBillStates[]>([{
    selectedPrintBill:false
}])