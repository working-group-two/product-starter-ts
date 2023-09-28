import { type GrpcTransport } from '@protobuf-ts/grpc-transport'
import {
  ConsentEventServiceClient
} from '@buf/wgtwo_wgtwoapis.community_timostamm-protobuf-ts/wgtwo/consents/v1/consent_events_pb.client'
import {
  type StreamConsentChangeEventsRequest,
  type StreamConsentChangeEventsResponse
} from '@buf/wgtwo_wgtwoapis.community_timostamm-protobuf-ts/wgtwo/consents/v1/consent_events_pb'
import { AckStatus_StatusCode } from '@buf/wgtwo_wgtwoapis.community_timostamm-protobuf-ts/wgtwo/events/v1/events_pb'

import { LOG } from './logger'

export class ConsentEvents {
  private readonly client: ConsentEventServiceClient
  private readonly callback: (response: StreamConsentChangeEventsResponse) => Promise<void>

  constructor (transport: GrpcTransport, callback: (response: StreamConsentChangeEventsResponse) => Promise<void>) {
    this.client = new ConsentEventServiceClient(transport)
    this.callback = callback
  }

  async ackConsentEvent (response: StreamConsentChangeEventsResponse): Promise<void> {
    const request = {
      ackInfo: response.metadata?.ackInfo
    }
    const call = await this.client.ackConsentChangeEvent(request)
    const status = name(call.response.ackStatus?.statusCode)
    LOG.info(`Ack status: ${status}`)
  }

  async stream ({ request }: {
    request: StreamConsentChangeEventsRequest
  }): Promise<void> {
    while (true) {
      LOG.info('Starting new stream')
      const call = this.client.streamConsentChangeEvents(request)
      try {
        LOG.debug('Waiting for consent events')
        call.responses.onMessage((response) => {
          void (async () => {
            try {
              await this.callback(response)
              await this.ackConsentEvent(response)
            } catch (e) {
              LOG.info(`Error handling consent event: ${String(e)}`)
            }
          })()
        })

        await call
      } catch (e) {
        // @ts-expect-error Error type is not exported
        const grpcStatusCode = e.code
        switch (grpcStatusCode) {
          case 'UNAVAILABLE':
          case 'DEADLINE_EXCEEDED':
            LOG.info(`Disconnected, reconnecting in 100ms ${grpcStatusCode}`)
            await new Promise(resolve => setTimeout(resolve, 5000))
            break
          default:
            LOG.info(`Disconnected, reconnecting in 10s: ${grpcStatusCode}`)
            await new Promise(resolve => setTimeout(resolve, 10000))
            break
        }
      }
    }
  }
}

function name (value: AckStatus_StatusCode | undefined): string {
  return value === undefined ? AckStatus_StatusCode[AckStatus_StatusCode.UNSPECIFIED] : AckStatus_StatusCode[value]
}
