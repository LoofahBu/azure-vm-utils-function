import AzureSecret from './base';

class AzureSecretExample1 extends AzureSecret {
  constructor() {
    super();
    this.azureSubscriptionID = process.env.AZURE_EXAMPLE1_SUBSCRIPTION_ID;
    this.azureUsername = process.env.AZURE_EXAMPLE1_USERNAME;
    this.azurePassword = process.env.AZURE_EXAMPLE1_PASSWORD;
  }
}

export default AzureSecretExample1;
