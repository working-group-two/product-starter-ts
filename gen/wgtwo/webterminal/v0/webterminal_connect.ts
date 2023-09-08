// Copyright 2020 Working Group Two AS
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

// @generated by protoc-gen-connect-es v0.13.2 with parameter "target=ts"
// @generated from file wgtwo/webterminal/v0/webterminal.proto (package wgtwo.webterminal.v0, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { WebTerminalMessage } from "./webterminal_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * Gateway for WebTerminalProtocol. Requires user's consent to answer and initiate calls.
 *
 * @generated from service wgtwo.webterminal.v0.WebTerminalService
 */
export const WebTerminalService = {
  typeName: "wgtwo.webterminal.v0.WebTerminalService",
  methods: {
    /**
     * @generated from rpc wgtwo.webterminal.v0.WebTerminalService.Pipe
     */
    pipe: {
      name: "Pipe",
      I: WebTerminalMessage,
      O: WebTerminalMessage,
      kind: MethodKind.BiDiStreaming,
    },
    /**
     * @generated from rpc wgtwo.webterminal.v0.WebTerminalService.MultiPipe
     */
    multiPipe: {
      name: "MultiPipe",
      I: WebTerminalMessage,
      O: WebTerminalMessage,
      kind: MethodKind.BiDiStreaming,
    },
  }
} as const;

