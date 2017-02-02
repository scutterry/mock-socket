import delay from './helpers/delay';
import EventTarget from './event-target';
import networkBridge from './network-bridge';
import CLOSE_CODES from './helpers/close-codes';
import { isValid, normalize, correctScheme } from './helpers/url';
import { parse } from 'url';
import logger from './helpers/logger';
import { createEvent, createMessageEvent, createCloseEvent } from './event-factory';

const ERROR_PREFIX_CONSTRUCT = `Failed to construct 'WebSocket':`;
const ERROR_CLASS = typeof DOMException !== 'undefined' ? DOMException : TypeError;

/*
* The main websocket class which is designed to mimick the native WebSocket class as close
* as possible.
*
* https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
* https://html.spec.whatwg.org/multipage/comms.html#network
*/
class WebSocket extends EventTarget {
  constructor(url, protocols = '') {
    super();

    if (typeof url === 'undefined') {
      throw new ERROR_CLASS(`${ERROR_PREFIX_CONSTRUCT} 1 argument required, but only 0 present.`);
    }

    const parsedURL = parse(url.toString());

    if (!parsedURL.hostname) {
      throw new ERROR_CLASS(`${ERROR_PREFIX_CONSTRUCT} The URL '${url.toString()}' is invalid.`);
    }

    if (!parsedURL.protocol.includes('ws:') && !parsedURL.protocol.includes('wss:')) {
      throw new ERROR_CLASS(`${ERROR_PREFIX_CONSTRUCT} The URL's scheme must be either 'ws' or 'wss'. '${parsedURL.protocol.slice(0, -1)}' is not allowed.`);
    }

    if (parsedURL.hash) {
      throw new ERROR_CLASS(`${ERROR_PREFIX_CONSTRUCT} The URL contains a fragment identifier ('${parsedURL.hash.substr(1)}'). Fragment identifiers are not allowed in WebSocket URLs.`);
    }

    if (Array.isArray(protocols)) {
      const seenProtocols = {};

      // TODO: add ability to only allow certain protocols
      protocols.forEach(p => {
        if (seenProtocols[p]) {
          throw new ERROR_CLASS(`${ERROR_PREFIX_CONSTRUCT} The subprotocol '${p}' is duplicated.`);
        }

        seenProtocols[p] = true;
      });
    }

    let binaryType = 'blob';
    let readyState = WebSocket.CONNECTING;

    this.CONNECTING = 0;
    this.OPEN = 1;
    this.CLOSING = 2;
    this.CLOSED = 3;

    /*
    * In order to capture the callback function we need to define custom setters.
    * To illustrat:
    *   mySocket.onopen = function() { alert(true) };
    *
    * The only way to capture that function and hold onto it for later is with the
    * below code:
    */
    Object.defineProperties(this, {
      url: {
        enumerable: true,
        value: normalize(url)
      },
      readyState: {
        configurable: true, // TODO: see about making this private
        enumerable: true,
        get() {
          return readyState;
        },
        set(value) {
          readyState = value;
          return value;
        }
      },
      bufferedAmount: {
        configurable: true, // TODO: see about making this private
        enumerable: true,
        get() {
          return 0;
        }
      },
      onopen: {
        configurable: true,
        enumerable: true,
        get() { return this.listeners.open; },
        set(listener) {
          this.addEventListener('open', listener);
        }
      },
      onerror: {
        configurable: true,
        enumerable: true,
        get() { return this.listeners.error; },
        set(listener) {
          this.addEventListener('error', listener);
        }
      },
      onclose: {
        configurable: true,
        enumerable: true,
        get() { return this.listeners.close; },
        set(listener) {
          this.addEventListener('close', listener);
        }
      },
      extensions: {
        enumerable: true,
        value: ''
      },
      protocol: {
        enumerable: true,
        value: Array.isArray(protocols) && protocol.length > 0 ? protocols[0] : String(protocols)
      },
      onmessage: {
        configurable: true,
        enumerable: true,
        get() { return this.listeners.message; },
        set(listener) {
          this.addEventListener('message', listener);
        }
      },
      binaryType: {
        configurable: true,
        enumerable: true,
        get() {
          return binaryType;
        },
        set(value) {
          if (value === 'blob' || value === 'arraybuffer') {
            binaryType = value;
            return binaryType;
          }

          console.warn(`The provided value '${value.toString()}' is not a valid enum value of type BinaryType.`);
        }
      }
    });

    const server = networkBridge.attachWebSocket(this, this.url);

    /*
    * This delay is needed so that we dont trigger an event before the callbacks have been
    * setup. For example:
    *
    * var socket = new WebSocket('ws://localhost');
    *
    * // If we dont have the delay then the event would be triggered right here and this is
    * // before the onopen had a chance to register itself.
    *
    * socket.onopen = () => { // this would never be called };
    *
    * // and with the delay the event gets triggered here after all of the callbacks have been
    * // registered :-)
    */
    delay(function delayCallback() {
      if (server) {
        if (server.options.verifyClient
          && typeof server.options.verifyClient === 'function'
          && !server.options.verifyClient()) {
          this.readyState = WebSocket.CLOSED;

          logger(
            'error',
            `WebSocket connection to '${this.url}' failed: HTTP Authentication failed; no valid credentials available`
          );

          networkBridge.removeWebSocket(this, this.url);
          this.dispatchEvent(createEvent({ type: 'error', target: this }));
          this.dispatchEvent(createCloseEvent({ type: 'close', target: this, code: CLOSE_CODES.CLOSE_NORMAL }));
        } else {
          this.readyState = WebSocket.OPEN;
          server.dispatchEvent(createEvent({ type: 'connection' }), server, this);
          this.dispatchEvent(createEvent({ type: 'open', target: this }));
        }
      } else {
        this.readyState = WebSocket.CLOSED;
        this.dispatchEvent(createEvent({ type: 'error', target: this }));
        this.dispatchEvent(createCloseEvent({ type: 'close', target: this, code: CLOSE_CODES.CLOSE_NORMAL }));

        logger('error', `WebSocket connection to '${this.url}' failed`);
      }
    }, this);
  }

  /*
  * Transmits data to the server over the WebSocket connection.
  *
  * https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#send()
  */
  send(data) {
    if (this.readyState === WebSocket.CONNECTING) {
      throw new DOMException('TODO TODO');
    }

    if (this.readyState === WebSocket.OPEN) {

      if (typeof data === 'string') {
        this.bufferedAmount += lengthInUTF8Bytes(data);
      }

      if (typeof data === 'blob') { // TODO fix me
        this.bufferedAmount += data.size;
      }

      if (typeof data === 'arraybuffer') { // TODO fix me
        this.bufferedAmount += data.byteLength;
      }


      const messageEvent = createMessageEvent({
        type: 'message',
        origin: this.url,
        data
      });



      const server = networkBridge.serverLookup(this.url);

      if (server) {
        server.dispatchEvent(messageEvent, data);
      }
    }
  }

  /*
  * Closes the WebSocket connection or connection attempt, if any.
  * If the connection is already CLOSED, this method does nothing.
  *
  * https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#close()
  */
  close(code, reason) {
    // Do nothing if the connection is already closed or closing
    if (this.readyState === WebSocket.CLOSING || this.readyState === WebSocket.CLOSED) {
      return;
    }

    this.readyState = CLOSING;

    const server = networkBridge.serverLookup(this.url);
    networkBridge.removeWebSocket(this, this.url);

    const closeEvent = createCloseEvent({
      type: 'close',
      target: this,
      code: CLOSE_CODES.CLOSE_NORMAL,
      wasClean: true // TODO: fix this
    });

    // TODO why is this server check needed?
    if (server) {
      server.dispatchEvent(closeEvent, server);
    }

    delay(function() {
      this.readyState = CLOSED;
      // TODO fire error event in some cases
      this.dispatchEvent(closeEvent);
    });
  }
}

WebSocket.CONNECTING = 0;
WebSocket.OPEN = 1;
WebSocket.CLOSING = 2;
WebSocket.CLOSED = 3;

export default WebSocket;
