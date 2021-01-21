import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { AzureSecretFactory } from '../service/computeSecret';
import ComputeManager from '../service/compute';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const { subscription, rgname, vmname } = req.headers;
  const secret = await AzureSecretFactory.produce(subscription, rgname);
  const computeHandler = new ComputeManager();
  await computeHandler.initialize(secret);

  const machineInfo = await computeHandler.queryComputeInfo();
  const deallocatedItem = machineInfo.find((x) => x.vmName === vmname);
  if (deallocatedItem == null) {
    context.res = { status: 200, body: `All VM in [${computeHandler.resourcesGroupName}] have been allocated` };
    return;
  }

  await computeHandler.powerOn(deallocatedItem.vmName);
  context.res = { status: 200, body: `VM [${deallocatedItem.vmName}] has been allocated.` };
};

export default httpTrigger;
