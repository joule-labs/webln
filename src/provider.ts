/**
 * Everything needed to implement your own provider.
 */

export interface WebLNNode {
  alias: string;
  pubkey: string;
  color?: string;
}

export interface GetInfoResponse {
  node: WebLNNode;
}

export interface SendPaymentResponse {
  preimage: string;
}

export interface RequestInvoiceResponse {
  paymentRequest: string;
}

export interface SignMessageResponse {
  signedMessage: string;
}

export interface WebLNProvider {
  enable(): Promise<void>;
  getInfo(): Promise<GetInfoResponse>;
  sendPayment(paymentRequest: string): Promise<SendPaymentResponse>;
  makeInvoice(amount: string): Promise<RequestInvoiceResponse>;
  signMessage(message: string): Promise<SignMessageResponse>;
  verifyMessage(signedMessage: string): Promise<void>;
}
