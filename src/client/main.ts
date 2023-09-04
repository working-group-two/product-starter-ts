import {
    SendTextToSubscriberRequest,
    SendMessageResponse
} from "../proto/wgtwo/sms/v1/sms_pb";

import {
    Client,
    credentials
} from "@grpc/grpc-js";

(async function main() {
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
})()

async function sendSMS(smsRequest: SendTextToSubscriberRequest): Promise<SendMessageResponse> {
    const client = new Client("sandbox.api.wgtwo.com:443", credentials.createSsl());

    try {
        const serialize = (request: SendTextToSubscriberRequest) => Buffer.from(JSON.stringify(request));
        const deserialize = (response: Buffer) => JSON.parse(response.toString());
        return new Promise((resolve, reject) => {
            client.makeUnaryRequest(
                "/wgtwo.sms.v1.SmsService/SendTextToSubscriber",
                serialize,
                deserialize,
                smsRequest,
                (err, value) => {
                    client.close();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(value);
                    }
                }
            );
        });
    } catch (error) {
        client.close();
        throw error;
    }
}
