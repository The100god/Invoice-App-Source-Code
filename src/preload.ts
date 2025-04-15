import { contextBridge, ipcRenderer } from "electron";

// Define the type for the updatedLinks parameter
// interface SaveLinksPayload {
//   updatedLinks: string[];
// }
export interface PrintInvoicePayload {
  projectName: string;
}

export interface PrintInvoiceResponse {
  success: boolean;
  filePath?: string;
  message?: string;
  error?: any;
}

// Exposing a safe API to the renderer process
contextBridge.exposeInMainWorld("electron", {
  // Use the correct types for each method

  send: (channel: string, data?: any) => ipcRenderer.send(channel, data),

  loadLinks: () => ipcRenderer.invoke("load-links"), // loadLinks returns a Promise of string[]
  saveLinks: (updatedLinks: string[]) =>
    ipcRenderer.invoke("save-links", updatedLinks), // saveLinks returns a Promise<void>

  // printInvoice: () => ipcRenderer.invoke('print-invoice'),

  printInvoice: async (projectName: string): Promise<PrintInvoiceResponse> => {
    return await ipcRenderer.invoke('print-invoice', projectName);
  },

  printInvoiceByName: (htmlContent:string, projectName:string) =>
    ipcRenderer.invoke("print-invoice-by-name", { htmlContent, projectName }),
  // Example: Minimize the window
  minimizeWindow: (): void => ipcRenderer.send("manualMinimize"),

  // Example: Maximize or unmaximize the window
  toggleMaximizeWindow: (): void => ipcRenderer.send("manualMaximize"),

  // Example: Close the window
  closeWindow: (): void => ipcRenderer.send("manualClose"),
});
