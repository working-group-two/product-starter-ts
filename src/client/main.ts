import { SendTextFromSubscriberRequest } from "@buf/wgtwo_wgtwoapis.community_timostamm-protobuf-ts/wgtwo/sms/v1/sms_pb.d"
import { StreamConsentChangeEventsRequest, AckConsentChangeEventRequest, ConsentAdded } from "@buf/wgtwo_wgtwoapis.community_timostamm-protobuf-ts/wgtwo/consents/v1/consent_events_pb.d"
import { CallCredentials, ChannelCredentials, credentials } from "@grpc/grpc-js";
import { SmsServiceClient } from "@buf/wgtwo_wgtwoapis.community_timostamm-protobuf-ts/wgtwo/sms/v1/sms_pb.client";
import { ConsentEventServiceClient } from "@buf/wgtwo_wgtwoapis.community_timostamm-protobuf-ts/wgtwo/consents/v1/consent_events_pb.client";
import { GrpcTransport } from '@protobuf-ts/grpc-transport';
import { Metadata } from "@grpc/grpc-js/src/metadata";
import { CallMetadataOptions } from "@grpc/grpc-js/src/call-credentials";
import { OAuth2Client, OAuth2Fetch } from '@badgateway/oauth2-client';

async function main() {

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

    const token = await tokenSupplier.getAccessToken()
    console.log(`Token ${token}`)

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

    const stub: SmsServiceClient = new SmsServiceClient(transport);

    const consentEventClient: ConsentEventServiceClient = new ConsentEventServiceClient(transport);

    const consentEventRequest: StreamConsentChangeEventsRequest = {};

    const consentEventCall = consentEventClient.streamConsentChangeEvents(consentEventRequest);
    consentEventCall.responses.onMessage(async (consentEvent) => {
        console.log(consentEvent.consentChangeEvent);

        if (consentEvent.consentChangeEvent?.type?.oneofKind === "added" && consentEvent.consentChangeEvent.target?.oneofKind === "number") {
            const number = consentEvent.consentChangeEvent.target.number.e164;

            const smsRequest: SendTextFromSubscriberRequest = {
                content: "Hello, world",
                toAddress: number,
                fromSubscriber: number,
            }

            const sendSmsCall = await stub.sendTextFromSubscriber(smsRequest, { timeout: 5000 });
            console.log(sendSmsCall.response.messageId)

            const ackRequest: AckConsentChangeEventRequest = {
                ackInfo: consentEvent!!.metadata!!.ackInfo,
            };

            const ackResponse = await consentEventClient.ackConsentChangeEvent(ackRequest);
            console.log(ackResponse.response);
        }
    });

    await consentEventCall;
}

void main();
