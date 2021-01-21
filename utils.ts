import { IncomingWebhook } from '@slack/webhook';
import AzureSubscription from './service/enums/subscription';

class Utils {
  public static async sleepSecond(sec: number): Promise<void> {
    return this.sleep(sec * 1000);
  }

  public static async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public static async sendSlackMessage(message: string): Promise<void> {
    const url = process.env.SLACK_DS_CHANNEL_URL;
    const webhook = new IncomingWebhook(url);
    webhook.send({
      icon_url: process.env.SLACK_DS_CHANNEL_ICON_URL,
      username: 'Azure Function',
      text: message,
    });
  }

  public static convertSubscriptionFromString(name: string): AzureSubscription {
    const azureSubscriptions = Object.keys(AzureSubscription).filter((key) => Number.isNaN(Number(key)));
    const answer = azureSubscriptions.find((key) => key.toLowerCase() === name.toLowerCase());
    return answer == null ? AzureSubscription.Null : AzureSubscription[answer.toString()];
  }
}

export default Utils;
