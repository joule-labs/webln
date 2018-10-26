import { WebLNProvider } from './provider';

/**
 * Everything needed to get and set providers on the client.
 * The methodology here is pretty brittle, so it could use some changes.
 *
 * TODO: Handle multiple provider registrations?
 * TODO: Something more sophistacted than while true loop
 */

export interface GetProviderParameters {
  pubkey?: string;
}

export async function requestProvider(_: GetProviderParameters = {}): Promise<WebLNProvider> {
  if (typeof window === 'undefined') {
    throw new Error('Must be called in a browser context');
  }

  const webln: WebLNProvider = (window as any).webln;
  if (!webln) {
    throw new Error('Your browser does not support WebLN');
  }

  return webln.enable().then(() => webln);
}
