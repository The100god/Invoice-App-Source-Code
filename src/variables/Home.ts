import { atom } from "jotai";

export const stepsAtom = atom<number>(4);

// Atom for invoice selection (default: "Electrical Invoice")
export const invoiceSelectAtom = atom<string>("Electrical Invoice");
export const formFieldErrorAtom = atom<boolean>(false);