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
    'Failed to construct \'WebSocket\': The URL \'invalid-urlws:\/\/\' is invalid.'
  );
});

test('that websocket has the correct properties', (t) => {
  t.plan(6);

  const staticProperties = [];

  for (const staticProperty in WebSocket) {
    staticProperties.push(staticProperty);
  }

  t.is(staticProperties.length, 4);
  t.true(staticProperties.includes('CONNECTING'));
  t.true(staticProperties.includes('OPEN'));
  t.true(staticProperties.includes('CLOSING'));
  t.true(staticProperties.includes('CLOSED'));

  const instanceProperties = [];

  for (const instanceProperty in new WebSocket('ws://foo-bar')) {
    instanceProperties.push(instanceProperty);
  }

  t.is.skip(instanceProperties.length, 19);
});

test('that on(open, message, error, and close) can be set', (t) => {
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

test('that sending when the socket is closed throws an expection', (t) => {
  const mySocket = new WebSocket('ws://not-real', 'foo');
  mySocket.readyState = WebSocket.CLOSED;
  t.throws(() => {
    mySocket.send('testing');
  }, 'WebSocket is already in CLOSING or CLOSED state', 'an expection is thrown when sending while closed');
});
