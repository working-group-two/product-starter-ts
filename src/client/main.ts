import { createPromiseClient } from "@connectrpc/connect";
import { createGrpcTransport } from "@connectrpc/connect-node";
import { SmsService } from "../../gen/wgtwo/sms/v1/sms_connect";
import {
    SendTextToSubscriberRequest,
    SendMessageResponse,

} from "../../gen/wgtwo/sms/v1/sms_pb";

const transport = createGrpcTransport({
    baseUrl: "https://sandbox.api.wgtwo.com:443",
    httpVersion: "2",
});
const client = createPromiseClient(SmsService, transport);

async function main() {
    const smsRequest = new SendTextToSubscriberRequest({
        content: "Hello, this is your SMS content.",
        toSubscriber: "+1234567890", // The recipient's international phone number
        fromAddress: "YourSenderID",   // Your sender ID
    });

    try {
        const response = await sendSMS(smsRequest);
        console.log("SMS sent:", response);
    } catch (error) {
        console.error("Error sending SMS:", error);
    }
}

async function sendSMS(smsRequest: SendTextToSubscriberRequest): Promise<SendMessageResponse> {
    return client.sendTextToSubscriber(smsRequest);
}

void main();
