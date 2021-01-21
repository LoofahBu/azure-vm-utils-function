import * as msRestNodeAuth from '@azure/ms-rest-nodeauth';

abstract class AzureSecret {
  public azureUsername: string;

  public azurePassword: string;

  public azureSubscriptionID: string;

  public azureResourcesGroupName: string;

  public initialize(vmResourceGroupName: string): void {
    this.azureResourcesGroupName = vmResourceGroupName;
  }

  public async login(): Promise<msRestNodeAuth.AuthResponse> {
    return msRestNodeAuth.loginWithUsernamePasswordWithAuthResponse(this.azureUsername, this.azurePassword);
  }
}

export default AzureSecret;
