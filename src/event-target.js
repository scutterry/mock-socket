import { reject, filter } from './helpers/array-helpers';

/*
* EventTarget is an interface implemented by objects that can
* receive events and may have listeners for them.
*
* https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
*/
const listeners = new WeakMap();

class EventTarget {
  constructor() {
    listeners.set(this, {});
  }

  /*
  * Ties a listener function to an event type which can later be invoked via the
  * dispatchEvent method.
  *
  * @param {string} type - the type of event (ie: 'open', 'message', etc.)
  * @param {function} listener - the callback function to invoke whenever an event is dispatched matching the given type
  * @param {boolean} useCapture - N/A TODO: implement useCapture functionality
  */
  addEventListener(type, listener /* , useCapture */) {
    if (typeof listener === 'function') {
      if (!Array.isArray(listener.get(this)[type])) {
        listeners.get(this)[type] = [];
      }

      // Only add the same function once
      if (filter(listeners.get(this)[type], item => item === listener).length === 0) {
        listeners.get(this)[type].push(listener);
      }
    }
  }

  /*
  * Removes the listener so it will no longer be invoked via the dispatchEvent method.
  *
  * @param {string} type - the type of event (ie: 'open', 'message', etc.)
  * @param {function} listener - the callback function to invoke whenever an event is dispatched matching the given type
  * @param {boolean} useCapture - N/A TODO: implement useCapture functionality
  */
  removeEventListener(type, removingListener /* , useCapture */) {
    const arrayOfListeners = listeners.get(this)[type];
    listeners.get(this)[type] = reject(arrayOfListeners, listener => listener === removingListener);
  }

  /*
  * Invokes all listener functions that are listening to the given event.type property. Each
  * listener will be passed the event as the first argument.
  *
  * @param {object} event - event object which will be passed to all listeners of the event.type property
  */
  dispatchEvent(event, ...customArguments) {
    const eventName = event.type;
    const eventListeners = listeners.get(this)[eventName];

    if (!Array.isArray(eventListeners)) {
      return false;
    }

    eventListeners.forEach((listener) => {
      if (customArguments.length > 0) {
        listener.apply(this, customArguments);
      } else {
        listener.call(this, event);
      }
    });

    return true;
  }
}

export default EventTarget;
