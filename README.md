# Azure Compute Utility Functions

## Background

This project can make developers easily start or deallocate Azure Linux VM by sending HTTP request. It can help us reducing the cloud cost if you integrate it with other monitor system such like *AlertManager*, *Azure Monitor*. You can also trigger them from your application.

## Quick Start (VSCode)

1. Install [Azure Function Core Tools](https://docs.microsoft.com/zh-tw/azure/azure-functions/functions-run-local?tabs=macos%2Ccsharp%2Cbash).
2. Install [Azure Fucntions](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions) extension.
3. Initialize project with *Azure Function* extension.
4. Update local setting. You need to tell function how to get your Azure credential. We have 2 examples, one is by [user account](service/azureSecretDefs/example1.ts), another is [service principal](service/azureSecretDefs/example2.ts).
5. Attach to debugger. You will see function urls on debug console.
6. Use any API client to trigger them.
7. Upload to your Azure Function APP.
