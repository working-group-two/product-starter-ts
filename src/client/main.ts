import {ChannelCredentials, credentials} from "@grpc/grpc-js";
import {GrpcTransport} from '@protobuf-ts/grpc-transport';
import {StreamConsentChangeEventsResponse} from "@buf/wgtwo_wgtwoapis.community_timostamm-protobuf-ts/wgtwo/consents/v1/consent_events_pb";

import {LOG} from "./logger";
import {SmsClient} from "./sms";
import {ConsentEvents} from "./consentEvents";
import {AtShutdown} from "./shutdown";
import {Wg2CallCredentials} from "./oauth";

const transport = new GrpcTransport({
    host: "api.wgtwo.com:443",
    channelCredentials: credentials.combineChannelCredentials(
        ChannelCredentials.createSsl(),
        Wg2CallCredentials,
    ),
});

AtShutdown(() => transport.close())

const smsClient = new SmsClient(transport)
const consentEvents = new ConsentEvents(transport)

async function handleConsentEvent(response: StreamConsentChangeEventsResponse) {
    LOG.info(`Got new consent event: ${JSON.stringify(response)}`)

    let event = response.consentChangeEvent

    if (event?.target?.oneofKind !== "number") {
        LOG.info(`Skip consent of target type="${event?.target?.oneofKind}"`)
        return
    }

    let number = event.target.number.e164
    switch (event?.type?.oneofKind) {
        case "added":
            LOG.info(`Consent added for ${number}`)
            let sms = {
                from: number,
                to: number,
                content: "A product has been added to your subscription"
            };
            await smsClient.sendSms(sms)
            break

        case "updated":
            LOG.info(`Consent updated for ${number}`)
            break

        case "revoked":
            LOG.info(`Consent removed for ${number}`)
            break
    }
}

async function main() {
    await consentEvents.stream({
        request: {},
        callback: handleConsentEvent,
    })
}

void main();
