import { createPromiseClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-node";
import { SmsService } from "../../gen/wgtwo/sms/v1/sms_connect";
import {
    SendTextToSubscriberRequest,
    SendMessageResponse,
    
} from "../../gen/wgtwo/sms/v1/sms_pb";

const transport = createConnectTransport({
    baseUrl: "https://sandbox.api.wgtwo.com:443",
    httpVersion: "1.1",
    useBinaryFormat: false,
});

async function main() {
    const smsRequest = new SendTextToSubscriberRequest();
    smsRequest.content = "Hello, this is your SMS content.";
    smsRequest.toSubscriber = "+1234567890"; // The recipient's international phone number
    smsRequest.fromAddress = "YourSenderID";   // Your sender ID

    try {
        const response = await sendSMS(smsRequest);
        console.log("SMS sent:", response);
    } catch (error) {
        console.error("Error sending SMS:", error);
    }
}

async function sendSMS(smsRequest: SendTextToSubscriberRequest): Promise<SendMessageResponse> {
    const client = createPromiseClient(SmsService, transport);
    const res = await client.sendTextToSubscriber(smsRequest);
    return res;
}

void main();
