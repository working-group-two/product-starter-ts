import { SmsServiceClient } from '@buf/wgtwo_wgtwoapis.community_timostamm-protobuf-ts/wgtwo/sms/v1/sms_pb.client'
import { type GrpcTransport } from '@protobuf-ts/grpc-transport'
import { SendMessageResponse_SendStatus, type SendTextFromSubscriberRequest } from '@buf/wgtwo_wgtwoapis.community_timostamm-protobuf-ts/wgtwo/sms/v1/sms_pb'
import { LOG } from './logger'

export interface Sms {
  from: string
  to: string
  content: string
}

export class SmsClient {
  private readonly smsClient: SmsServiceClient

  constructor (transport: GrpcTransport) {
    this.smsClient = new SmsServiceClient(transport)
  }

  async sendSms (sms: Sms): Promise<void> {
    const smsRequest: SendTextFromSubscriberRequest = {
      fromSubscriber: sms.from,
      toAddress: sms.to,
      content: sms.content
    }

    const call = await this.smsClient.sendTextFromSubscriber(smsRequest, { timeout: 5000 })
    const response = call.response
    LOG.info(`SMS sent: status='${SendMessageResponse_SendStatus[response.status]}' description='${response.description}' message-id='${response.messageId}'`)
  }
}
