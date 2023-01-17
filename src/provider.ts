/**
 * Everything needed to implement your own provider.
 */

import { RequestMethod } from "./request-method";
import { AdditionalString } from "./types";

export interface WebLNNode {
  alias: string;
  pubkey: string;
  color?: string;
}

export interface GetInfoResponse {
  node: WebLNNode;
  version: string;
  supports: ("lightning" | AdditionalString)[];
  methods: RequestMethod[];
}

export interface SendPaymentResponse {
  preimage: string;
}

export interface RequestInvoiceArgs {
  amount?: string | number;
  defaultAmount?: string | number;
  minimumAmount?: string | number;
  maximumAmount?: string | number;
  defaultMemo?: string;
}

export interface KeysendArgs {
  destination: string;
  customRecords?: Record<string, string>;
  amount: string | number;
}

export interface RequestInvoiceResponse {
  paymentRequest: string;
}

export interface SignMessageResponse {
  message: string;
  signature: string;
}

export interface EnableResponse {
  enabled: boolean;
  remember: boolean;
}

export interface WebLNProvider {
  enable(): Promise<EnableResponse>;
  getInfo(): Promise<GetInfoResponse>;
  sendPayment(paymentRequest: string): Promise<SendPaymentResponse>;
  keysend(args: KeysendArgs): Promise<SendPaymentResponse>;
  makeInvoice(
    args: string | number | RequestInvoiceArgs
  ): Promise<RequestInvoiceResponse>;
  signMessage(message: string): Promise<SignMessageResponse>;
  verifyMessage(signature: string, message: string): Promise<void>;
  // TODO: improve request typings
  request(method: RequestMethod, args?: unknown): Promise<unknown>;
}
