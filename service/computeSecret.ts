import AzureSecretBase from './azureSecretDefs/base';
import AzureSecretExample1 from './azureSecretDefs/example1';
import AzureSecretExample2 from './azureSecretDefs/example2';
import AzureSecretNull from './azureSecretDefs/null';
import AzureSubscription from './enums/subscription';
import Utils from '../utils';

export { AzureSecretBase };

export class AzureSecretFactory {
  public static async produce(subscription: string, resourceGroupName: string): Promise<AzureSecretBase> {
    const azureSubscription = Utils.convertSubscriptionFromString(subscription);
    const product = this.initialize(azureSubscription);
    product.initialize(resourceGroupName);
    return product;
  }

  private static initialize(subscription: AzureSubscription): AzureSecretBase {
    switch (subscription) {
      case AzureSubscription.Example1:
        return new AzureSecretExample1();

      case AzureSubscription.Example2:
        return new AzureSecretExample2();

      default:
        return new AzureSecretNull();
    }
  }
}
