import test from 'ava';
import WebSocket from '../../src/websocket';
import Server from '../../src/server';

test.only('that constructing a websocket without a url throws an error', (t) => {
  const error = t.throws(() => { new WebSocket(); }, TypeError);
  t.is(error.message, `Failed to construct 'WebSocket': 1 argument required, but only 0 present.`);
});

test.only('that constructing a websocket with an invalid url throws an error', (t) => {
  let error = t.throws(() => { new WebSocket('a-bad-url'); }, TypeError);
  t.is(error.message, `Failed to construct 'WebSocket': The URL 'a-bad-url' is invalid.`);

  error = t.throws(() => { new WebSocket([]); }, TypeError);
  t.is(error.message, `Failed to construct 'WebSocket': The URL '' is invalid.`);
});

test.only('that constructing a websocket with a url without ws:// or wss:// throws an error', (t) => {
  let error = t.throws(() => { new WebSocket('http://echo.websocket.org'); }, TypeError);
  t.is(error.message, `Failed to construct 'WebSocket': The URL's scheme must be either 'ws' or 'wss'. 'http' is not allowed.`);

  error = t.throws(() => { new WebSocket('ftp://echo.websocket.org'); }, TypeError);
  t.is(error.message, `Failed to construct 'WebSocket': The URL's scheme must be either 'ws' or 'wss'. 'ftp' is not allowed.`);
});

test.only('that constructing a websocket with a url that contains a fragment throws an error', (t) => {
  let error = t.throws(() => { new WebSocket('ws://echo.websocket.org/#foo'); }, TypeError);
  t.is(error.message, `Failed to construct 'WebSocket': The URL contains a fragment identifier ('foo'). Fragment identifiers are not allowed in WebSocket URLs.`);

  error = t.throws(() => { new WebSocket('ws://echo.websocket.org/foo#bar'); }, TypeError);
  t.is(error.message, `Failed to construct 'WebSocket': The URL contains a fragment identifier ('bar'). Fragment identifiers are not allowed in WebSocket URLs.`);
});

test.only('that constructing a websocket with a duplicate protocols throws an error', (t) => {
  let error = t.throws(() => { new WebSocket('ws://echo.websocket.org', ['foo', 'foo']); }, TypeError);
  t.is(error.message, `Failed to construct 'WebSocket': The subprotocol 'foo' is duplicated.`);

  error = t.throws(() => { new WebSocket('ws://echo.websocket.org', ['foo', 'bar', 'baz', 'bar']); }, TypeError);
  t.is(error.message, `Failed to construct 'WebSocket': The subprotocol 'bar' is duplicated.`);
});

test.only('that a websocket instance has the correct properties', (t) => {
  const mySocket = new WebSocket('ws://echo.websocket.org');

  t.true('CONNECTING' in mySocket);
  t.true('OPEN' in mySocket);
  t.true('CLOSING' in mySocket);
  t.true('CLOSED' in mySocket);
  t.true('url' in mySocket);
  t.true('readyState' in mySocket);
  t.true('bufferedAmount' in mySocket);
  t.true('onopen' in mySocket);
  t.true('onerror' in mySocket);
  t.true('onclose' in mySocket);
  t.true('extensions' in mySocket);
  t.true('protocol' in mySocket);
  t.true('onmessage' in mySocket);
  t.true('binaryType' in mySocket);
  t.true('close' in mySocket);
  t.true('send' in mySocket);
  t.true('addEventListener' in mySocket);
  t.true('removeEventListener' in mySocket);
  t.true('dispatchEvent' in mySocket);
});

test('[close method] if code is present by not 1000 or in the range of 3000-4999 an error is thrown', (t) => {
  const mySocket = new WebSocket('ws://echo.websocket.org');

  let error = t.throws(() => { mySocket.close(1); }, DOMException);
  t.is(error.message, `Failed to execute 'close' on 'WebSocket': The code must be either 1000, or between 3000 and 4999. 1 is neither.`);

  error = t.throws(() => { mySocket.close(2000); }, DOMException);
  t.is(error.message, `Failed to execute 'close' on 'WebSocket': The code must be either 1000, or between 3000 and 4999. 2000 is neither.`);

  error = t.throws(() => { mySocket.close(5000); }, DOMException);
  t.is(error.message, `Failed to execute 'close' on 'WebSocket': The code must be either 1000, or between 3000 and 4999. 5000 is neither.`);
});

test('[close method] if reason is present and is longer than 123 bytes an error is thrown', (t) => {
  const mySocket = new WebSocket('ws://echo.websocket.org');

  const error = t.throws(() => { mySocket.close(1000, 'this is a very very very very very very very very long long long long long long long long long long long long long long string'); }, DOMException);
  t.is(error.message, `Failed to execute 'close' on 'WebSocket': The message must not be greater than 123 bytes.`);
});

test('[send method] that if readyState is connecting an error is thrown', (t) => {
  const myServer = new Server('ws://echo.websocket.org', {
    connectionDelay: 1000
  });

  const mySocket = new WebSocket('ws://echo.websocket.org');
  const error = t.throws(() => { mySocket.send('test-data'); }, DOMException);
  t.is(error.message, `Failed to execute 'send' on 'WebSocket': TODO`);
});

// THIS ONLY HAPPENS IN CHROME BUT NOT IN THE SPEC
test.skip('[send method] that if readyState is closing or closed an error is thrown', (t) => {
  const myServer = new Server('ws://echo.websocket.org');
  const mySocket = new WebSocket('ws://echo.websocket.org');

  mySocket.close();

  const error = t.throws(() => { mySocket.send('test-data'); }, DOMException);
  t.is(error.message, 'WebSocket is already in CLOSING or CLOSED state');
});


// test('that on(open, message, error, and close) can be set', (t) => {
//   const mySocket = new WebSocket('ws://not-real');

//   mySocket.onopen = () => {};
//   mySocket.onmessage = () => {};
//   mySocket.onclose = () => {};
//   mySocket.onerror = () => {};

//   const listeners = mySocket.listeners;

//   t.is(listeners.open.length, 1);
//   t.is(listeners.message.length, 1);
//   t.is(listeners.close.length, 1);
//   t.is(listeners.error.length, 1);
// });

// test('that passing protocols into the constructor works', (t) => {
//   const mySocket = new WebSocket('ws://not-real', 'foo');
//   const myOtherSocket = new WebSocket('ws://not-real', ['bar']);

//   t.is(mySocket.protocol, 'foo', 'the correct protocol is set when it was passed in as a string');
//   t.is(myOtherSocket.protocol, 'bar', 'the correct protocol is set when it was passed in as an array');
// });

// test('that sending when the socket is closed throws an expection', (t) => {
//   const mySocket = new WebSocket('ws://not-real', 'foo');
//   mySocket.readyState = WebSocket.CLOSED;
//   t.throws(() => {
//     mySocket.send('testing');
//   }, 'WebSocket is already in CLOSING or CLOSED state', 'an expection is thrown when sending while closed');
// });
