import test from 'ava';
import WebSocket from '../../src/websocket';

test('that incorrect parameters throw the correct errors', (t) => {
  t.plan(3);

  t.throws(
    () => { new WebSocket(); },
    'Failed to construct \'WebSocket\': 1 argument required, but only 0 present.'
  );

  t.throws(
    () => { new WebSocket('invalid-url'); },
    'Failed to construct \'WebSocket\': The URL \'invalid-url\' is invalid.'
  );

  t.throws(
    () => { new WebSocket('invalid-urlws://'); },
    'Failed to construct \'WebSocket\': The URL \'invalid-urlws://\' is invalid.'
  );
});

test('that websocket has the correct properties', (t) => {
  t.plan(6);

  const ws = new WebSocket('ws://not-real');

  t.is(typeof WebSocket.CONNECTING, 'number');
  t.is(typeof WebSocket.OPEN, 'number');
  t.is(typeof WebSocket.CLOSING, 'number');
  t.is(typeof WebSocket.CLOSED, 'number');
  t.is(typeof ws.send, 'function');
  t.is(typeof ws.close, 'function');
});

test('that on(open, message, error, and close) can be set', (t) => {
  t.plan(4);

  const mySocket = new WebSocket('ws://not-real');

  mySocket.onopen = () => {};
  mySocket.onmessage = () => {};
  mySocket.onclose = () => {};
  mySocket.onerror = () => {};

  const listeners = mySocket.listeners;

  t.is(listeners.open.length, 1);
  t.is(listeners.message.length, 1);
  t.is(listeners.close.length, 1);
  t.is(listeners.error.length, 1);
});

test('that the correct default values are set after creation', (t) => {
  t.plan(5);

  const mySocket = new WebSocket('ws://not-real');

  t.is(mySocket.binaryType, 'blob');
  t.is(mySocket.readyState, WebSocket.CONNECTING);
  t.is(mySocket.url, 'ws://not-real/');
  t.is(mySocket.protocol, '');
  t.is(mySocket.extensions, '');
});
