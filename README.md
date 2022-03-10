# Azure VM Utility Functions

## Introduction
People always use GPU machines when they are training machine learning models. GPU machines are costly on a cloud. So we want to deallocate or start automatically to save cost. That's why the project comes.

We deploy monitoring daemon on GPU VMs to trace its usage and define alerts. When it observes GPU usage is low, the alert system will send an HTTP request to deallocate VM.

This project can make developers quickly manipulate VM by Azure Function. Now it only supports actions below:
- Start
- Deallocate

You should attach VM **subscription**, **resource group**, and **virtual machine names** in the HTTP header and define secrets to let the function have permission to execute those actions.

## Quick Start (VSCode)

1. Install [Azure Function Core Tools](https://docs.microsoft.com/zh-tw/azure/azure-functions/functions-run-local?tabs=macos%2Ccsharp%2Cbash).
2. Install [Azure Fucntions](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions) extension.
3. Initialize project with **Azure Function** extension.
4. Update local setting. You need to tell the function how to get your **Azure credential**. We have 2 examples. One is by [user account](service/azureSecretDefs/example1.ts), another is [service principal](service/azureSecretDefs/example2.ts).
5. Attach to the debugger. You will see function URLs on debug console.
6. Use any API client to trigger them.
7. Upload to your Azure Function APP.
