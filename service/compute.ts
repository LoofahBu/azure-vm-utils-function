import * as msRest from '@azure/ms-rest-js';
import { ComputeManagementClient } from '@azure/arm-compute';
import ComputeInfo from './computeInfo';
import * as ComputeSecret from './computeSecret';

class ComputeManager {
  public resourcesGroupName: string;

  private client: ComputeManagementClient;

  private timeout: NodeJS.Timeout;

  public async initialize(secret: ComputeSecret.AzureSecretBase): Promise<void> {
    const response = await secret.login();
    this.client = new ComputeManagementClient(response.credentials, secret.azureSubscriptionID);
    this.resourcesGroupName = secret.azureResourcesGroupName;
  }

  public async queryComputeInfo(): Promise<ComputeInfo[]> {
    const handle = this.client;
    const group = this.resourcesGroupName;

    const vms = await handle.virtualMachines.list(group);
    const vmsPromise = vms.map((vm) => {
      return (async (): Promise<ComputeInfo> => {
        const instanceView = await handle.virtualMachines.instanceView(group, vm.name);
        if (instanceView == null) {
          throw new Error(`Can not find instance view of ${vm.name} in group ${group}`);
        }

        const instancePowerStatus = instanceView.statuses.find((x) => x.code.includes('Power'));
        return new ComputeInfo(vm.name, instancePowerStatus);
      })();
    });

    const vmInfo = await Promise.all(vmsPromise);
    return vmInfo as ComputeInfo[];
  }

  public async powerOn(vmName: string): Promise<msRest.RestResponse> {
    const handle = this.client;
    const group = this.resourcesGroupName;
    const response = await handle.virtualMachines.start(group, vmName);

    // * Even though we receive response, vm still waits its agent up.
    // * User still can't using SSH to access it. So we should periodically check if whether agent is available.
    const timer = new Promise((resolve) => {
      const handleInterval = async () => {
        const instanceView = await handle.virtualMachines.instanceView(group, vmName);
        const { vmAgent } = instanceView;

        if (vmAgent.vmAgentVersion !== 'Unknown') {
          resolve(null);
        }
      };

      this.timeout = setInterval(handleInterval, 0, 1000);
      setTimeout(async () => resolve(null), 600000);
    });

    await timer;
    clearInterval(this.timeout);

    return response;
  }

  public async powerOff(vmName: string): Promise<msRest.RestResponse> {
    return this.client.virtualMachines.deallocate(this.resourcesGroupName, vmName);
  }
}

export default ComputeManager;
