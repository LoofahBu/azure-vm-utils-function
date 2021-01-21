import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { AzureSecretFactory } from '../service/computeSecret';
import ComputeManager from '../service/compute';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const { subscription, rgname, vmname } = req.headers;
  const secret = await AzureSecretFactory.produce(subscription, rgname);
  const computeHandler = new ComputeManager();
  await computeHandler.initialize(secret);

  await computeHandler.powerOff(vmname);
  context.res = { status: 200, body: `VM [${vmname}] has been deallocated.` };
};

export default httpTrigger;
