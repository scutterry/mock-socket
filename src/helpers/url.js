import { parse } from 'url';

export function isValid(url) {
  return !!parse(url.toString()).hostname
}

export function correctScheme(url) {
  const protocol = url.parse(url.toString());

  return protocol.includes('ws://') || protocol.includes('wss://');
}

export function normalize(url) {
  const parts = url.split('://');
  return (parts[1] && parts[1].indexOf('/') === -1) ? `${url}/` : url;
}
