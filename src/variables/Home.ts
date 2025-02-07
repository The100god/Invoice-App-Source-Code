import { atom } from "jotai";

export interface stepsStates{
    electricalSteps:number
}

export const stepsAtom = atom<stepsStates[]>([{electricalSteps:4
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