// Copyright 2021 Working Group Two AS
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

// @generated by protoc-gen-es v1.3.1 with parameter "target=ts"
// @generated from file wgtwo/consents/v1/consent_events.proto (package wgtwo.consents.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import { AckInfo, AckStatus, Metadata, StreamConfiguration } from "../../events/v1/events_pb.js";
import { E164 } from "../../common/v1/phonenumber_pb.js";

/**
 * @generated from message wgtwo.consents.v1.StreamConsentChangeEventsRequest
 */
export class StreamConsentChangeEventsRequest extends Message<StreamConsentChangeEventsRequest> {
  /**
   * @generated from field: wgtwo.events.v1.StreamConfiguration stream_configuration = 1;
   */
  streamConfiguration?: StreamConfiguration;

  constructor(data?: PartialMessage<StreamConsentChangeEventsRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "wgtwo.consents.v1.StreamConsentChangeEventsRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "stream_configuration", kind: "message", T: StreamConfiguration },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): StreamConsentChangeEventsRequest {
    return new StreamConsentChangeEventsRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): StreamConsentChangeEventsRequest {
    return new StreamConsentChangeEventsRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): StreamConsentChangeEventsRequest {
    return new StreamConsentChangeEventsRequest().fromJsonString(jsonString, options);
  }

  static equals(a: StreamConsentChangeEventsRequest | PlainMessage<StreamConsentChangeEventsRequest> | undefined, b: StreamConsentChangeEventsRequest | PlainMessage<StreamConsentChangeEventsRequest> | undefined): boolean {
    return proto3.util.equals(StreamConsentChangeEventsRequest, a, b);
  }
}

/**
 * @generated from message wgtwo.consents.v1.StreamConsentChangeEventsResponse
 */
export class StreamConsentChangeEventsResponse extends Message<StreamConsentChangeEventsResponse> {
  /**
   * @generated from field: wgtwo.events.v1.Metadata metadata = 1;
   */
  metadata?: Metadata;

  /**
   * @generated from field: wgtwo.consents.v1.ConsentChangeEvent consent_change_event = 2;
   */
  consentChangeEvent?: ConsentChangeEvent;

  constructor(data?: PartialMessage<StreamConsentChangeEventsResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "wgtwo.consents.v1.StreamConsentChangeEventsResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "metadata", kind: "message", T: Metadata },
    { no: 2, name: "consent_change_event", kind: "message", T: ConsentChangeEvent },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): StreamConsentChangeEventsResponse {
    return new StreamConsentChangeEventsResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): StreamConsentChangeEventsResponse {
    return new StreamConsentChangeEventsResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): StreamConsentChangeEventsResponse {
    return new StreamConsentChangeEventsResponse().fromJsonString(jsonString, options);
  }

  static equals(a: StreamConsentChangeEventsResponse | PlainMessage<StreamConsentChangeEventsResponse> | undefined, b: StreamConsentChangeEventsResponse | PlainMessage<StreamConsentChangeEventsResponse> | undefined): boolean {
    return proto3.util.equals(StreamConsentChangeEventsResponse, a, b);
  }
}

/**
 * @generated from message wgtwo.consents.v1.AckConsentChangeEventRequest
 */
export class AckConsentChangeEventRequest extends Message<AckConsentChangeEventRequest> {
  /**
   * @generated from field: wgtwo.events.v1.AckInfo ack_info = 1;
   */
  ackInfo?: AckInfo;

  constructor(data?: PartialMessage<AckConsentChangeEventRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "wgtwo.consents.v1.AckConsentChangeEventRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "ack_info", kind: "message", T: AckInfo },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AckConsentChangeEventRequest {
    return new AckConsentChangeEventRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AckConsentChangeEventRequest {
    return new AckConsentChangeEventRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AckConsentChangeEventRequest {
    return new AckConsentChangeEventRequest().fromJsonString(jsonString, options);
  }

  static equals(a: AckConsentChangeEventRequest | PlainMessage<AckConsentChangeEventRequest> | undefined, b: AckConsentChangeEventRequest | PlainMessage<AckConsentChangeEventRequest> | undefined): boolean {
    return proto3.util.equals(AckConsentChangeEventRequest, a, b);
  }
}

/**
 * @generated from message wgtwo.consents.v1.AckConsentChangeEventResponse
 */
export class AckConsentChangeEventResponse extends Message<AckConsentChangeEventResponse> {
  /**
   * @generated from field: wgtwo.events.v1.AckStatus ack_status = 1;
   */
  ackStatus?: AckStatus;

  constructor(data?: PartialMessage<AckConsentChangeEventResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "wgtwo.consents.v1.AckConsentChangeEventResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "ack_status", kind: "message", T: AckStatus },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AckConsentChangeEventResponse {
    return new AckConsentChangeEventResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AckConsentChangeEventResponse {
    return new AckConsentChangeEventResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AckConsentChangeEventResponse {
    return new AckConsentChangeEventResponse().fromJsonString(jsonString, options);
  }

  static equals(a: AckConsentChangeEventResponse | PlainMessage<AckConsentChangeEventResponse> | undefined, b: AckConsentChangeEventResponse | PlainMessage<AckConsentChangeEventResponse> | undefined): boolean {
    return proto3.util.equals(AckConsentChangeEventResponse, a, b);
  }
}

/**
 * @generated from message wgtwo.consents.v1.ConsentChangeEvent
 */
export class ConsentChangeEvent extends Message<ConsentChangeEvent> {
  /**
   * @generated from oneof wgtwo.consents.v1.ConsentChangeEvent.type
   */
  type: {
    /**
     * @generated from field: wgtwo.consents.v1.ConsentAdded added = 1;
     */
    value: ConsentAdded;
    case: "added";
  } | {
    /**
     * @generated from field: wgtwo.consents.v1.ConsentUpdated updated = 2;
     */
    value: ConsentUpdated;
    case: "updated";
  } | {
    /**
     * @generated from field: wgtwo.consents.v1.ConsentRevoked revoked = 3;
     */
    value: ConsentRevoked;
    case: "revoked";
  } | { case: undefined; value?: undefined } = { case: undefined };

  /**
   * @generated from oneof wgtwo.consents.v1.ConsentChangeEvent.target
   */
  target: {
    /**
     * The international number of the subscriber.
     *
     * @generated from field: wgtwo.common.v1.E164 number = 4;
     */
    value: E164;
    case: "number";
  } | {
    /**
     * @generated from field: string tenant = 5;
     */
    value: string;
    case: "tenant";
  } | { case: undefined; value?: undefined } = { case: undefined };

  constructor(data?: PartialMessage<ConsentChangeEvent>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "wgtwo.consents.v1.ConsentChangeEvent";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "added", kind: "message", T: ConsentAdded, oneof: "type" },
    { no: 2, name: "updated", kind: "message", T: ConsentUpdated, oneof: "type" },
    { no: 3, name: "revoked", kind: "message", T: ConsentRevoked, oneof: "type" },
    { no: 4, name: "number", kind: "message", T: E164, oneof: "target" },
    { no: 5, name: "tenant", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "target" },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ConsentChangeEvent {
    return new ConsentChangeEvent().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ConsentChangeEvent {
    return new ConsentChangeEvent().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ConsentChangeEvent {
    return new ConsentChangeEvent().fromJsonString(jsonString, options);
  }

  static equals(a: ConsentChangeEvent | PlainMessage<ConsentChangeEvent> | undefined, b: ConsentChangeEvent | PlainMessage<ConsentChangeEvent> | undefined): boolean {
    return proto3.util.equals(ConsentChangeEvent, a, b);
  }
}

/**
 * @generated from message wgtwo.consents.v1.ConsentAdded
 */
export class ConsentAdded extends Message<ConsentAdded> {
  /**
   * @generated from field: repeated string scopes = 1;
   */
  scopes: string[] = [];

  constructor(data?: PartialMessage<ConsentAdded>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "wgtwo.consents.v1.ConsentAdded";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "scopes", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ConsentAdded {
    return new ConsentAdded().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ConsentAdded {
    return new ConsentAdded().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ConsentAdded {
    return new ConsentAdded().fromJsonString(jsonString, options);
  }

  static equals(a: ConsentAdded | PlainMessage<ConsentAdded> | undefined, b: ConsentAdded | PlainMessage<ConsentAdded> | undefined): boolean {
    return proto3.util.equals(ConsentAdded, a, b);
  }
}

/**
 * @generated from message wgtwo.consents.v1.ConsentUpdated
 */
export class ConsentUpdated extends Message<ConsentUpdated> {
  /**
   * @generated from field: repeated string scopes = 1;
   */
  scopes: string[] = [];

  constructor(data?: PartialMessage<ConsentUpdated>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "wgtwo.consents.v1.ConsentUpdated";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "scopes", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ConsentUpdated {
    return new ConsentUpdated().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ConsentUpdated {
    return new ConsentUpdated().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ConsentUpdated {
    return new ConsentUpdated().fromJsonString(jsonString, options);
  }

  static equals(a: ConsentUpdated | PlainMessage<ConsentUpdated> | undefined, b: ConsentUpdated | PlainMessage<ConsentUpdated> | undefined): boolean {
    return proto3.util.equals(ConsentUpdated, a, b);
  }
}

/**
 * @generated from message wgtwo.consents.v1.ConsentRevoked
 */
export class ConsentRevoked extends Message<ConsentRevoked> {
  constructor(data?: PartialMessage<ConsentRevoked>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "wgtwo.consents.v1.ConsentRevoked";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ConsentRevoked {
    return new ConsentRevoked().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ConsentRevoked {
    return new ConsentRevoked().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ConsentRevoked {
    return new ConsentRevoked().fromJsonString(jsonString, options);
  }

  static equals(a: ConsentRevoked | PlainMessage<ConsentRevoked> | undefined, b: ConsentRevoked | PlainMessage<ConsentRevoked> | undefined): boolean {
    return proto3.util.equals(ConsentRevoked, a, b);
  }
}
