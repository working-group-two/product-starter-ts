import {SendTextFromSubscriberRequest} from "@buf/wgtwo_wgtwoapis.community_timostamm-protobuf-ts/wgtwo/sms/v1/sms_pb.d"
import {CallCredentials, ChannelCredentials, credentials} from "@grpc/grpc-js";
import {SmsServiceClient} from "@buf/wgtwo_wgtwoapis.community_timostamm-protobuf-ts/wgtwo/sms/v1/sms_pb.client";
import {
    ConsentEventServiceClient
} from "@buf/wgtwo_wgtwoapis.community_timostamm-protobuf-ts/wgtwo/consents/v1/consent_events_pb.client";
import {GrpcTransport} from '@protobuf-ts/grpc-transport';
import {Metadata} from "@grpc/grpc-js/src/metadata";
import {CallMetadataOptions} from "@grpc/grpc-js/src/call-credentials";
import {OAuth2Client, OAuth2Fetch} from '@badgateway/oauth2-client';
import {
    StreamConsentChangeEventsResponse
} from "@buf/wgtwo_wgtwoapis.community_timostamm-protobuf-ts/wgtwo/consents/v1/consent_events_pb";

const oAuth2Client = new OAuth2Client({
    server: 'https://id.wgtwo.com/',
    clientId: process.env.CLIENT_ID as string,
    clientSecret: process.env.CLIENT_SECRET as string,
    tokenEndpoint: '/oauth2/token',
});

const tokenSupplier = new OAuth2Fetch({
    client: oAuth2Client,
    getNewToken: async () => {
        console.log("Fetching new OAuth 2.0 client credentials token")
        return oAuth2Client.clientCredentials({
            scope: ['sms.text:send_from_subscriber'],
        });
    }
})

async function metadataGenerator(options: CallMetadataOptions, callback: (err: Error | null, metadata: Metadata) => void) {
    const metadata = new Metadata();
    const accessToken = await tokenSupplier.getAccessToken()
    metadata.add('Authorization', "Bearer " + accessToken)
    callback(null, metadata);
}

const transport = new GrpcTransport({
    host: "api.wgtwo.com:443",
    channelCredentials: credentials.combineChannelCredentials(
        ChannelCredentials.createSsl(),
        CallCredentials.createFromMetadataGenerator(metadataGenerator),
    ),
});

const smsClient = new SmsServiceClient(transport);
const consentEventClient = new ConsentEventServiceClient(transport);

async function sendSms(from: string, to: string, content: string) {
    const smsRequest: SendTextFromSubscriberRequest = {
        fromSubscriber: from,
        toAddress: to,
        content: content,
    }

    const sendSmsCall = await smsClient.sendTextFromSubscriber(smsRequest, {timeout: 5000});
    console.log("SMS sent: " + sendSmsCall.response.description + " " + sendSmsCall.response.messageId)
}

async function ackConsentEvent(response: StreamConsentChangeEventsResponse) {
    const ackCall = await consentEventClient.ackConsentChangeEvent({
        ackInfo: response!!.metadata!!.ackInfo,
    });
    console.log(`Ack response${JSON.stringify(ackCall.response)}`);
}

async function handleConsentEvent(response: StreamConsentChangeEventsResponse) {
    console.log(`Got new consent event: ${JSON.stringify(response)}`)

    if (response.consentChangeEvent?.type?.oneofKind === "added" && response.consentChangeEvent.target?.oneofKind === "number") {
        const number = response.consentChangeEvent.target.number.e164;

        // Send SMS from subscriber to subscriber
        await sendSms(number, number, "A product has been added to your subscription")

        await ackConsentEvent(response);
    }
}

async function main() {

    const consentEventCall = consentEventClient.streamConsentChangeEvents({});

    while (true) {
        console.log("Setting up new stream")
        try {
            consentEventCall.responses.onMessage(async (response) => {
                await handleConsentEvent(response);
            });
            await consentEventCall;
        } catch (e) {
            console.log("Error: " + e)
            // Wait 5 seconds before reconnecting
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
}

void main();
