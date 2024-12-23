import { atom } from "jotai";

export const activeTabIndexAtom = atom<number>(0);

// Atom to store the list of projects
export const projectsAtom = atom<{ name: string; id: number }[]>([
    { name: "Untitled - Project 1", id: 0 },
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
export const labelColorAtom = atom("#00000099");
export const outlineColorAtom = atom("#000000E5");
export const valuesColorAtom = atom("#FFEA00");
export const descriptionsColorAtom = atom("#00FF11");

// Search term atom
export const searchTermAtom = atom("");
