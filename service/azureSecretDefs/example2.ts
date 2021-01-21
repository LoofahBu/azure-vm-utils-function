import * as msRestNodeAuth from '@azure/ms-rest-nodeauth';
import AzureSecret from './base';

class AzureSecretSamsung extends AzureSecret {
  constructor() {
    super();
    this.azureSubscriptionID = process.env.AZURE_EXAMPLE2_SUBSCRIPTION_ID;
  }

  public async login(): Promise<msRestNodeAuth.AuthResponse> {
    const clientId = process.env.AZURE_EXAMPLE2_SERVICE_PRINCIPAL_CLIENT_ID;
    const secretId = process.env.AZURE_EXAMPLE2_SERVICE_PRINCIPAL_SECRET;
    const tenantId = process.env.AZURE_EXAMPLE2_SERVICE_PRINCIPAL_TENANT_ID;
    return msRestNodeAuth.loginWithServicePrincipalSecretWithAuthResponse(clientId, secretId, tenantId);
  }
}

export default AzureSecretSamsung;
