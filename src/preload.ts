// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

// You can use Node.js APIs here, but avoid exposing them directly to the renderer


// Exposing a safe API to the renderer process
contextBridge.exposeInMainWorld('electron', {
  // Example: Minimize the window
  minimizeWindow: () => ipcRenderer.send('manualMinimize'),
  
  // Example: Maximize or unmaximize the window
  toggleMaximizeWindow: () => ipcRenderer.send('manualMaximize'),
  
  // Example: Close the window
  closeWindow: () => ipcRenderer.send('manualClose'),
});
