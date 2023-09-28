import {GrpcTransport} from "@protobuf-ts/grpc-transport";
import {ConsentEventServiceClient} from "@buf/wgtwo_wgtwoapis.community_timostamm-protobuf-ts/wgtwo/consents/v1/consent_events_pb.client";
import {StreamConsentChangeEventsRequest, StreamConsentChangeEventsResponse} from "@buf/wgtwo_wgtwoapis.community_timostamm-protobuf-ts/wgtwo/consents/v1/consent_events_pb";
import {AckStatus_StatusCode} from "@buf/wgtwo_wgtwoapis.community_timostamm-protobuf-ts/wgtwo/events/v1/events_pb";

import {LOG} from "./logger";

export class ConsentEvents {
    private readonly client: ConsentEventServiceClient;

    constructor(transport: GrpcTransport) {
        this.client = new ConsentEventServiceClient(transport);
    }

    async ackConsentEvent(response: StreamConsentChangeEventsResponse) {
        let request = {
            ackInfo: response!!.metadata!!.ackInfo,
        };
        const call = await this.client.ackConsentChangeEvent(request);
        const status = name(call.response.ackStatus?.statusCode)
        LOG.info(`Ack status: ${status}`);
    }

    async stream({request, callback}: {
        request: StreamConsentChangeEventsRequest,
        callback: (response: StreamConsentChangeEventsResponse) => Promise<void>
    }) {
        while (true) {
            LOG.info("Starting new stream")
            const call = this.client.streamConsentChangeEvents(request);
            try {
                LOG.debug("Waiting for consent events")
                call.responses.onMessage(async (response) => {
                    await callback(response);
                    await this.ackConsentEvent(response);
                });
                await call;
            } catch (e) {
                // @ts-ignore
                const grpcStatusCode = e.code;
                switch (grpcStatusCode) {
                    case "UNAVAILABLE":
                    case "DEADLINE_EXCEEDED":
                        LOG.info(`Disconnected, reconnecting in 100ms ${grpcStatusCode}`)
                        await new Promise(resolve => setTimeout(resolve, 5000));
                        break;
                    default:
                        LOG.info(`Disconnected, reconnecting in 10s: ${grpcStatusCode}`)
                        await new Promise(resolve => setTimeout(resolve, 10000));
                        break;
                }
            }
        }
    }
}

function name(value: AckStatus_StatusCode | undefined) {
    return value === undefined ? AckStatus_StatusCode.UNSPECIFIED : AckStatus_StatusCode[value];
}
