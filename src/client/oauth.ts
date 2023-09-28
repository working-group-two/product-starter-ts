import { CallCredentials } from '@grpc/grpc-js'
import { Metadata } from '@grpc/grpc-js/src/metadata'
import { type CallMetadataOptions } from '@grpc/grpc-js/src/call-credentials'
import { OAuth2Client, OAuth2Fetch } from '@badgateway/oauth2-client'

const oAuth2Client = new OAuth2Client({
  server: 'https://id.wgtwo.com/',
  clientId: process.env.CLIENT_ID as string,
  clientSecret: process.env.CLIENT_SECRET as string,
  tokenEndpoint: '/oauth2/token'
})

const tokenSupplier = new OAuth2Fetch({
  client: oAuth2Client,
  getNewToken: async () => {
    console.log('Fetching new OAuth 2.0 client credentials token')
    return await oAuth2Client.clientCredentials({
      scope: ['sms.text:send_from_subscriber']
    })
  }
})

function metadataGenerator (options: CallMetadataOptions, callback: (err: Error | null, metadata: Metadata) => void): void {
  const metadata = new Metadata()
  tokenSupplier.getAccessToken()
    .then(accessToken => {
      metadata.add('Authorization', 'Bearer ' + accessToken)
      callback(null, metadata)
    })
    .catch(err => { callback(err, metadata) })
}

// @ts-expect-error ssss
export const Wg2CallCredentials = CallCredentials.createFromMetadataGenerator(metadataGenerator)
