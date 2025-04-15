import { atom } from "jotai";

export interface stepsStates{
    electricalSteps:number
}

export const stepsAtom = atom<stepsStates[]>([{electricalSteps:1
}]);

// Atom for invoice selection (default: "Electrical Invoice")
export interface invoiceSelectState{
    selectedInvoice:string;
}
export const invoiceSelectAtom = atom<invoiceSelectState[]>([{selectedInvoice:"Electrical Invoice"}]);
export const formFieldErrorAtom = atom<boolean>(false);

//progress 
export interface progressStates{
    progress:number;
}

export const progressAtom = atom<progressStates[]>([{
    progress: Math.ceil(100 / 9)
}])

export const joyrideRunAtom = atom<boolean>(false)
export const activeProjAtom = atom<boolean>(false)
export const joyrideStepIndexAtom = atom<number>(0)

export interface breakDownStates{
    labourBreakDown:boolean;
    materialBreakDown:boolean;
    tripChargeBreakDown:boolean;
}
export const breakDownAtom = atom<breakDownStates[]>([])


  

  