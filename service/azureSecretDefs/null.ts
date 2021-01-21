import AzureSecret from './base';

class AzureSecretNull extends AzureSecret {
  constructor() {
    super();
    this.azureSubscriptionID = '';
    this.azureUsername = '';
    this.azurePassword = '';
  }
}

export default AzureSecretNull;
