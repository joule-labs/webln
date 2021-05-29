# WebLN

This library provides the spec and client libraries for WebLN, a way of
interacting with a user's Lightning node via the browser.

**Heads up: This spec is in early stages, and is subject to change.
Join in the discussion in the issue queue, and please be mindful
when building apps with it!**

## Documentation and Demos

Check out the documentation site at https://webln.dev/

If you'd like to contribute to the documentation, you can find it over at https://github.com/wbobeirne/webln-docs

## TL;DR Docs

### Installation

For use in node-built projects, install via npm or yarn:

```bash
npm install webln
# OR #
yarn add webln
```

If you don't have a build system, you can add the following script tag to your
project which will add all functionality under the global `WebLN` namespace:
```html
<script
  src="https://unpkg.com/webln@0.2.1/dist/webln.min.js"
  integrity="sha384-Enk2tnv6U0yPoFk7RasscZ5oQIG2fzVYaG4ledkAf7MdEXP9fMazV74tAgEwvxm7"
  crossorigin="anonymous"
></script>
```
<sup>Make sure you leave the integrity hash in to prevent possibly malicious JS</sup>

### Client Library

Apps that want to enable WebLN interactions can use the `requestProvider` function to grab a WebLN provider:

```ts
import { requestProvider } from 'webln';

let webln;
try {
  webln = await requestProvider();
} catch (err) {
  // Handle users without WebLN
}

// Elsewhere in the code...
if (webln) {
  // Call webln functions
}
```


### WebLN Provider

Providers are classes that implement the interface provided in `webln/lib/provider`.
The spec is as follows:

```ts
export interface WebLNProvider {
  /* Determines if the WebLNProvider will allow the page to use it */
  enable(): Promise<void>;

  /* Returns some basic information about the node */
  getInfo(): Promise<GetInfoResponse>;

  /* Prompts the user with a BOLT-11 payment request */
  sendPayment(paymentRequest: string): Promise<SendPaymentResponse>;

  /* Sends a keysend payment to a node without needing an invoice */
  keysend(pubkey: string, amount: number | string): Promise<SendPaymentResponse>;

  /* Prompts the user to provide the page with an invoice */
  makeInvoice(amount: string | number | RequestInvoiceArgs): Promise<RequestInvoiceResponse>;

  /* Prompts the user to sign a message with their private key */
  signMessage(message: string): Promise<SignMessageResponse>;

  /* Shows the user a view that verifies a signed message */
  verifyMessage(signature: string, message: string): Promise<void>;
}
```

See the [typescript definitions](https://github.com/wbobeirne/webln/blob/master/src/provider.ts)
for more detail about request objects and response shapes. The spec
is far from complete, and will need more functions to be fully-fledged,
but these methods should cover most use-cases.


### Errors

Both apps and providers will want to make use of WebLN's pre-defined errors.
They can be found in `webln/lib/errors` and should be used when throwing and
handling errors to best inform the user of what's going on:

```ts
// For example, an app should check if an uncommon method isn't supported,
// and let the user know what to do.
import { requestProvider } from 'webln';
import { UnsupportedMethodError } from 'webln/lib/errors';

async function signMsg(msg: string) {
  try {
    const webln = await requestProvider();
    const res = await webln.signMessage(msg);
    return res;
  } catch(err) {
    if (err.constructor === UnsupportedMethodError) {
      alert('Your WebLN provider doesn’t support message signing, please email support@app.com for manual verification');
    } else {
      alert(err.message);
    }
  }
```

And the provider should throw the correct error when possible:

```ts
// And a provider should correctly throw this error
import { WebLNProvider } from 'webln';
import { UnsupportedMethodError } from 'webln/lib/errors';

class MyProvider extends WebLNProvider {
  signMessage() {
    throw new UnsupportedMethodError('MyProvider doesn’t support message signatures!');
  }
}
```

See the [full list of error types](https://github.com/wbobeirne/webln/blob/master/src/errors.ts)
for more information.

## Contributing

Please [join the issue queue](https://github.com/wbobeirne/webln/issues) to
discuss the future of the WebLN spec.
