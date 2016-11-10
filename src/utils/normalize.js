export function normalizeProtocol(protocol = '') {
  let activeProtocol = protocol;

  if (Array.isArray(protocol)) {
    if (protocol.length > 0) {
      activeProtocol = protocol[0];
    }
    else {
      activeProtocol = '';
    }
  }

  if (typeof activeProtocol === 'symbol') {
    throw new TypeError('Cannot convert a Symbol value to a string');
  }

  if (String(activeProtocol).includes(' ')) {
    // TODO Should be DOMException
    throw new Error(`Failed to construct 'WebSocket': The subprotocol '${String(activeProtocol)}' is invalid`);
  }

  return activeProtocol;
}


export function normalizeUrl(url) {
  const parts = url.split('://');
  return (parts[1] && parts[1].indexOf('/') === -1) ? `${url}/` : url;
}
