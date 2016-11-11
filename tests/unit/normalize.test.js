import test from 'ava';
import { normalizeProtocol, normalizeUrl } from '../../src/utils/normalize';

test('that normalizeProtocol correctly normalizes the protocol', (t) => {
  t.plan(8);

  t.is(normalizeProtocol('foo'), 'foo');
  t.is(normalizeProtocol(['foo']), 'foo');
  t.is(normalizeProtocol(['foo', 'bar']), 'foo');
  t.is(normalizeProtocol(), '');
  t.is(normalizeProtocol([]), '');
  t.throws(() => normalizeProtocol(Symbol('foo')), 'Cannot convert a Symbol value to a string');
  t.throws(
    () => normalizeProtocol({}),
    'Failed to construct \'WebSocket\': The subprotocol \'[object Object]\' is invalid'
  );
  t.throws(
    () => normalizeProtocol('something bad'),
   'Failed to construct \'WebSocket\': The subprotocol \'something bad\' is invalid'
  );
});

test('that normalizeUrl correctly adds a / to the url', (t) => {
  t.plan(4);

  t.is(normalizeUrl('ws://example.com'), 'ws://example.com/');
  t.is(normalizeUrl('ws://example.com:7000'), 'ws://example.com:7000/');
  t.is(normalizeUrl('ws://example.com:7000/foo'), 'ws://example.com:7000/foo');
  t.is(normalizeUrl('ws://example.com:7000/foo/'), 'ws://example.com:7000/foo/');
});
