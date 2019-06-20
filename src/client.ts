import { WebLNProvider } from './provider';
import { MissingProviderError } from './errors';

/**
 * Everything needed to get and set providers on the client.
 * The methodology here is pretty brittle, so it could use some changes.
 *
 * TODO: Handle multiple provider registrations?
 */

export interface GetProviderParameters {
  pubkey?: string;
}

export function requestProvider(_: GetProviderParameters = {}): Promise<WebLNProvider> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      return reject(new Error('Must be called in a browser context'));
    }

    const webln: WebLNProvider = (window as any).webln;
    if (!webln) {
      return reject(new MissingProviderError('Your browser has no WebLN provider'));
    }

    webln.enable()
      .then(() => resolve(webln))
      .catch(err => reject(err));
  });
}
