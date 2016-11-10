export default function normalizeProtocol(protocol = '') {
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
    throw new Error(`Failed to construct 'WebSocket': The subprotocol '${String(activeProtocol).includes(' ')}' is invalid`); // TODO Should be DOMException
  }

  return activeProtocol;
}
