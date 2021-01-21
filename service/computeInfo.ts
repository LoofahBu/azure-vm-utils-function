import { ComputeManagementModels } from '@azure/arm-compute';

class ComputeInfo {
  public vmName: string;

  public isDeallocated: boolean;

  constructor(vmName: string, statusItem: ComputeManagementModels.InstanceViewStatus) {
    this.vmName = vmName;
    this.isDeallocated = statusItem.displayStatus.includes('deallocated');
  }
}

export default ComputeInfo;
