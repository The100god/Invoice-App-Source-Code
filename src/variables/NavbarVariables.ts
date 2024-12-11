import { atom } from "jotai";

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
export const labelColorAtom = atom("#FF5900");
export const outlineColorAtom = atom("#FF0000");
export const valuesColorAtom = atom("#FFEA00");
export const descriptionsColorAtom = atom("#00FF11");

// Search term atom
export const searchTermAtom = atom("");
