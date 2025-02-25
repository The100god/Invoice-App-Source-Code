// electron.d.ts
import { ElectronAPI } from 'electron';

declare global {
  interface Window {
    electron: ElectronAPI & {
      loadLinks: () => Promise<string[]>;
      saveLinks: (updatedLinks: string[]) => Promise<void>;
    };
  }
}

export {};
