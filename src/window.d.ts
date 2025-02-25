// window.d.ts

interface FilePickerAcceptType {
    description: string;
    accept: {
      [key: string]: string[];
    };
  }
  
  interface FilePickerOptions {
    suggestedName?: string;
    types: FilePickerAcceptType[];
  }
  
  interface FileSystemFileHandle {
    getFile(): Promise<File>;
  }
  
  interface Window {
    showOpenFilePicker(options?: FilePickerOptions): Promise<FileSystemFileHandle[]>;
    showSaveFilePicker(options?: FilePickerOptions): Promise<FileSystemFileHandle>;
  }
  