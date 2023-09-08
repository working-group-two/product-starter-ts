import {SendTextFromSubscriberRequest} from "@buf/wgtwo_wgtwoapis.community_timostamm-protobuf-ts/wgtwo/sms/v1/sms_pb.d"
import {CallCredentials, ChannelCredentials, credentials} from "@grpc/grpc-js";
import {SmsServiceClient} from "@buf/wgtwo_wgtwoapis.community_timostamm-protobuf-ts/wgtwo/sms/v1/sms_pb.client";
import {GrpcTransport} from '@protobuf-ts/grpc-transport';
import {Metadata} from "@grpc/grpc-js/src/metadata";
import {CallMetadataOptions} from "@grpc/grpc-js/src/call-credentials";
import {OAuth2Client, OAuth2Fetch} from '@badgateway/oauth2-client';

async function main() {
    const sendFrom = process.env.SEND_FROM as string
    const sendTo = process.env.SEND_TO as string


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


    // Create a SMS client
    const stub: SmsServiceClient = new SmsServiceClient(transport);

    const request: SendTextFromSubscriberRequest = {
        content: "Hello, world",
        toAddress: sendTo,
        fromSubscriber: sendFrom,
    }

    const call = await stub.sendTextFromSubscriber(request, {timeout: 1000})
    console.log(call.response.messageId)
}

void main();
