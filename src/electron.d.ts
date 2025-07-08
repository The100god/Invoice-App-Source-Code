// electron.d.ts
import { ElectronAPI } from "electron";

declare global {
  interface Window {
    electron: ElectronAPI & {
      loadLinks: () => Promise<string[]>;
      saveLinks: (updatedLinks: string[]) => Promise<void>;
      loadBillImages: () => Promise<string[]>;
      printInvoice: () => Promise<{
        success: boolean;
        filePath?: string;
        message?: string;
        error?: any;
      }>;
      printInvoiceByName: (
        htmlContent: string,
        projectName: string
      ) => Promise<{ success: boolean; filePath?: string; message?: string }>;
    };
    env:{
      UNSPLASH_KEY:string;
    }
  }
}

export {};
