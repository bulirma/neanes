import { Workspace } from '@/models/Workspace';
import { IIpcService } from '@/services/ipc/IIpcService';
import { IpcService } from '@/services/ipc/IpcService';

export interface ExportPageAsPngSettings {
  dpi: number;
  transparentBackground: boolean;
}

//export interface ExportPageAsPngArgs {
//  filePath: string;
//  settings: ExportPageAsPngSettings;
//  page: HTMLElement;
//}

export class SaveGeneratedDataService {
  ipcService: IIpcService;
  directory?: string;

  constructor() {
    this.ipcService = new IpcService();
  }

  async setupDirectory() {
    const directoryResult = await this.ipcService.setupBatchDirectory();
    if (directoryResult.success) {
      this.directory = directoryResult.directory!;
    } else {
      console.error('failed to setup batch directory');
    }
  }

  async saveWorkspace(workspace: Workspace) {
    workspace.filePath = `${this.directory ?? '.'}/${workspace.filePath}`;
    return await this.ipcService.saveWorkspace(workspace);
  }

  async exportPageAsPng(filePath: string, data: string) {
    return await this.ipcService.exportPageAsImage(filePath, data);
  }
}
