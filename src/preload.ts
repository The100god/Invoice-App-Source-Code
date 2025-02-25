import { contextBridge, ipcRenderer } from 'electron';

// Define the type for the updatedLinks parameter
// interface SaveLinksPayload {
//   updatedLinks: string[];
// }

// Exposing a safe API to the renderer process
contextBridge.exposeInMainWorld('electron', {
  // Use the correct types for each method
  loadLinks: ()=> ipcRenderer.invoke('load-links'), // loadLinks returns a Promise of string[]
  saveLinks: (updatedLinks: string[]) => ipcRenderer.invoke('save-links', updatedLinks), // saveLinks returns a Promise<void>
  
  // Example: Minimize the window
  minimizeWindow: (): void => ipcRenderer.send('manualMinimize'),
  
  // Example: Maximize or unmaximize the window
  toggleMaximizeWindow: (): void => ipcRenderer.send('manualMaximize'),
  
  // Example: Close the window
  closeWindow: (): void => ipcRenderer.send('manualClose'),
});
