(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Mock"] = factory();
	else
		root["Mock"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SocketIO = exports.WebSocket = exports.Server = undefined;
	
	var _server = __webpack_require__(1);
	
	var _server2 = _interopRequireDefault(_server);
	
	var _socketIo = __webpack_require__(17);
	
	var _socketIo2 = _interopRequireDefault(_socketIo);
	
	var _websocket = __webpack_require__(2);
	
	var _websocket2 = _interopRequireDefault(_websocket);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Server = exports.Server = _server2.default;
	var WebSocket = exports.WebSocket = _websocket2.default;
	var SocketIO = exports.SocketIO = _socketIo2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _websocket = __webpack_require__(2);
	
	var _websocket2 = _interopRequireDefault(_websocket);
	
	var _eventTarget = __webpack_require__(4);
	
	var _eventTarget2 = _interopRequireDefault(_eventTarget);
	
	var _networkBridge = __webpack_require__(6);
	
	var _networkBridge2 = _interopRequireDefault(_networkBridge);
	
	var _closeCodes = __webpack_require__(7);
	
	var _closeCodes2 = _interopRequireDefault(_closeCodes);
	
	var _normalize = __webpack_require__(15);
	
	var _globalObject = __webpack_require__(16);
	
	var _globalObject2 = _interopRequireDefault(_globalObject);
	
	var _eventFactory = __webpack_require__(10);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/*
	* https://github.com/websockets/ws#server-example
	*/
	var Server = function (_EventTarget) {
	  _inherits(Server, _EventTarget);
	
	  /*
	  * @param {string} url
	  */
	  function Server(url) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    _classCallCheck(this, Server);
	
	    var _this = _possibleConstructorReturn(this, (Server.__proto__ || Object.getPrototypeOf(Server)).call(this));
	
	    _this.url = (0, _normalize.normalizeUrl)(url);
	    _this.originalWebSocket = null;
	    var server = _networkBridge2.default.attachServer(_this, _this.url);
	
	    if (!server) {
	      _this.dispatchEvent((0, _eventFactory.createEvent)({ type: 'error' }));
	      throw new Error('A mock server is already listening on this url');
	    }
	
	    if (typeof options.verifiyClient === 'undefined') {
	      options.verifiyClient = null;
	    }
	
	    _this.options = options;
	
	    _this.start();
	    return _this;
	  }
	
	  /*
	  * Attaches the mock websocket object to the global object
	  */
	
	
	  _createClass(Server, [{
	    key: 'start',
	    value: function start() {
	      var globalObj = (0, _globalObject2.default)();
	
	      if (globalObj.WebSocket) {
	        this.originalWebSocket = globalObj.WebSocket;
	      }
	
	      globalObj.WebSocket = _websocket2.default;
	    }
	
	    /*
	    * Removes the mock websocket object from the global object
	    */
	
	  }, {
	    key: 'stop',
	    value: function stop() {
	      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
	
	      var globalObj = (0, _globalObject2.default)();
	
	      if (this.originalWebSocket) {
	        globalObj.WebSocket = this.originalWebSocket;
	      } else {
	        delete globalObj.WebSocket;
	      }
	
	      this.originalWebSocket = null;
	
	      _networkBridge2.default.removeServer(this.url);
	
	      if (typeof callback === 'function') {
	        callback();
	      }
	    }
	
	    /*
	    * This is the main function for the mock server to subscribe to the on events.
	    *
	    * ie: mockServer.on('connection', function() { console.log('a mock client connected'); });
	    *
	    * @param {string} type - The event key to subscribe to. Valid keys are: connection, message, and close.
	    * @param {function} callback - The callback which should be called when a certain event is fired.
	    */
	
	  }, {
	    key: 'on',
	    value: function on(type, callback) {
	      this.addEventListener(type, callback);
	    }
	
	    /*
	    * This send function will notify all mock clients via their onmessage callbacks that the server
	    * has a message for them.
	    *
	    * @param {*} data - Any javascript object which will be crafted into a MessageObject.
	    */
	
	  }, {
	    key: 'send',
	    value: function send(data) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      this.emit('message', data, options);
	    }
	
	    /*
	    * Sends a generic message event to all mock clients.
	    */
	
	  }, {
	    key: 'emit',
	    value: function emit(event, data) {
	      var _this2 = this;
	
	      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	      var websockets = options.websockets;
	
	
	      if (!websockets) {
	        websockets = _networkBridge2.default.websocketsLookup(this.url);
	      }
	
	      if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object' || arguments.length > 3) {
	        data = Array.prototype.slice.call(arguments, 1, arguments.length);
	      }
	
	      websockets.forEach(function (socket) {
	        if (Array.isArray(data)) {
	          socket.dispatchEvent.apply(socket, [(0, _eventFactory.createMessageEvent)({
	            type: event,
	            data: data,
	            origin: _this2.url,
	            target: socket
	          })].concat(_toConsumableArray(data)));
	        } else {
	          socket.dispatchEvent((0, _eventFactory.createMessageEvent)({
	            type: event,
	            data: data,
	            origin: _this2.url,
	            target: socket
	          }));
	        }
	      });
	    }
	
	    /*
	    * Closes the connection and triggers the onclose method of all listening
	    * websockets. After that it removes itself from the urlMap so another server
	    * could add itself to the url.
	    *
	    * @param {object} options
	    */
	
	  }, {
	    key: 'close',
	    value: function close() {
	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      var code = options.code,
	          reason = options.reason,
	          wasClean = options.wasClean;
	
	      var listeners = _networkBridge2.default.websocketsLookup(this.url);
	
	      listeners.forEach(function (socket) {
	        socket.readyState = _websocket2.default.CLOSE;
	        socket.dispatchEvent((0, _eventFactory.createCloseEvent)({
	          type: 'close',
	          target: socket,
	          code: code || _closeCodes2.default.CLOSE_NORMAL,
	          reason: reason || '',
	          wasClean: wasClean
	        }));
	      });
	
	      this.dispatchEvent((0, _eventFactory.createCloseEvent)({ type: 'close' }), this);
	      _networkBridge2.default.removeServer(this.url);
	    }
	
	    /*
	    * Returns an array of websockets which are listening to this server
	    */
	
	  }, {
	    key: 'clients',
	    value: function clients() {
	      return _networkBridge2.default.websocketsLookup(this.url);
	    }
	
	    /*
	    * Prepares a method to submit an event to members of the room
	    *
	    * e.g. server.to('my-room').emit('hi!');
	    */
	
	  }, {
	    key: 'to',
	    value: function to(room, broadcaster) {
	      var self = this;
	      var websockets = _networkBridge2.default.websocketsLookup(this.url, room, broadcaster);
	      return {
	        emit: function emit(event, data) {
	          self.emit(event, data, { websockets: websockets });
	        }
	      };
	    }
	
	    /*
	     * Alias for Server.to
	     */
	
	  }, {
	    key: 'in',
	    value: function _in() {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	
	      return this.to.apply(null, args);
	    }
	  }]);
	
	  return Server;
	}(_eventTarget2.default);
	
	/*
	 * Alternative constructor to support namespaces in socket.io
	 *
	 * http://socket.io/docs/rooms-and-namespaces/#custom-namespaces
	 */
	
	
	Server.of = function of(url) {
	  return new Server(url);
	};
	
	exports.default = Server;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _delay = __webpack_require__(3);
	
	var _delay2 = _interopRequireDefault(_delay);
	
	var _eventTarget = __webpack_require__(4);
	
	var _eventTarget2 = _interopRequireDefault(_eventTarget);
	
	var _networkBridge = __webpack_require__(6);
	
	var _networkBridge2 = _interopRequireDefault(_networkBridge);
	
	var _closeCodes = __webpack_require__(7);
	
	var _closeCodes2 = _interopRequireDefault(_closeCodes);
	
	var _logger = __webpack_require__(8);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	var _eventFactory = __webpack_require__(10);
	
	var _normalize = __webpack_require__(15);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/*
	* The main websocket class which is designed to mimick the native WebSocket class as close
	* as possible.
	*
	* https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
	*/
	var WebSocket = function (_EventTarget) {
	  _inherits(WebSocket, _EventTarget);
	
	  function WebSocket(url) {
	    var protocol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	
	    _classCallCheck(this, WebSocket);
	
	    var _this = _possibleConstructorReturn(this, (WebSocket.__proto__ || Object.getPrototypeOf(WebSocket)).call(this));
	
	    if (!url) {
	      throw new TypeError('Failed to construct \'WebSocket\': 1 argument required, but only 0 present.');
	    } else if (!url.startsWith('ws://') && !url.startsWith('wss://')) {
	      throw new Error('Failed to construct \'WebSocket\': The URL \'' + String(url) + '\' is invalid.');
	    }
	
	    _this.binaryType = 'blob';
	    _this.url = (0, _normalize.normalizeUrl)(url);
	    _this.readyState = WebSocket.CONNECTING;
	    _this.protocol = (0, _normalize.normalizeProtocol)(protocol);
	
	    /*
	    * In order to capture the callback function we need to define custom setters.
	    * To illustrate:
	    *   mySocket.onopen = function() { alert(true) };
	    *
	    * The only way to capture that function and hold onto it for later is with the
	    * below code:
	    */
	    Object.defineProperties(_this, {
	      onopen: {
	        configurable: true,
	        enumerable: true,
	        get: function get() {
	          return this.listeners.open;
	        },
	        set: function set(listener) {
	          this.addEventListener('open', listener);
	        }
	      },
	      onmessage: {
	        configurable: true,
	        enumerable: true,
	        get: function get() {
	          return this.listeners.message;
	        },
	        set: function set(listener) {
	          this.addEventListener('message', listener);
	        }
	      },
	      onclose: {
	        configurable: true,
	        enumerable: true,
	        get: function get() {
	          return this.listeners.close;
	        },
	        set: function set(listener) {
	          this.addEventListener('close', listener);
	        }
	      },
	      onerror: {
	        configurable: true,
	        enumerable: true,
	        get: function get() {
	          return this.listeners.error;
	        },
	        set: function set(listener) {
	          this.addEventListener('error', listener);
	        }
	      },
	      binaryType: {
	        set: function set(value) {
	          if (['blob', 'arraybuffer'].indexOf(value) !== -1) {
	            this.binaryType = value;
	          } else {
	            console.warn('The provided value \'' + value.toString() + '\' is not a valid enum value of type BinaryType');
	          }
	        }
	      }
	    });
	
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
	    (0, _delay2.default)(function delayCallback() {
	      var server = _networkBridge2.default.attachWebSocket(this, this.url);
	
	      if (server) {
	        var options = server.options;
	
	
	        if (options.verifyClient && typeof options.verifyClient === 'function' && !options.verifyClient()) {
	          this.readyState = WebSocket.CLOSED;
	
	          (0, _logger2.default)('error', 'WebSocket connection to \'' + this.url + '\' failed: HTTP Authentication failed; no valid credentials available');
	
	          _networkBridge2.default.removeWebSocket(this, this.url);
	          this.dispatchEvent((0, _eventFactory.createEvent)({ type: 'error', target: this }));
	          this.dispatchEvent((0, _eventFactory.createCloseEvent)({ type: 'close', target: this, code: _closeCodes2.default.CLOSE_NORMAL }));
	        } else {
	          this.readyState = WebSocket.OPEN;
	          server.dispatchEvent((0, _eventFactory.createEvent)({ type: 'connection' }), server, this);
	          this.dispatchEvent((0, _eventFactory.createEvent)({ type: 'open', target: this }));
	        }
	      } else {
	        this.readyState = WebSocket.CLOSED;
	        this.dispatchEvent((0, _eventFactory.createEvent)({ type: 'error', target: this }));
	        this.dispatchEvent((0, _eventFactory.createCloseEvent)({ type: 'close', target: this, code: _closeCodes2.default.CLOSE_NORMAL }));
	
	        (0, _logger2.default)('error', 'WebSocket connection to \'' + this.url + '\' failed');
	      }
	    }, _this);
	    return _this;
	  }
	
	  /*
	  * Transmits data to the server over the WebSocket connection.
	  *
	  * https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#send()
	  */
	
	
	  _createClass(WebSocket, [{
	    key: 'send',
	    value: function send(data) {
	      if (this.readyState === WebSocket.CLOSING || this.readyState === WebSocket.CLOSED) {
	        throw new Error('WebSocket is already in CLOSING or CLOSED state');
	      }
	
	      var messageEvent = (0, _eventFactory.createMessageEvent)({
	        type: 'message',
	        origin: this.url,
	        data: data
	      });
	
	      var server = _networkBridge2.default.serverLookup(this.url);
	
	      if (server) {
	        server.dispatchEvent(messageEvent, data);
	      }
	    }
	
	    /*
	    * Closes the WebSocket connection or connection attempt, if any.
	    * If the connection is already CLOSED, this method does nothing.
	    *
	    * https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#close()
	    */
	
	  }, {
	    key: 'close',
	    value: function close(code, reason) {
	      if (Number(code) === NaN) {
	        code = 0;
	      }
	
	      if (code !== 1000 && (code < 3000 || code > 4999)) {
	        throw new Error('Failed to execute \'close\' on \'WebSocket\': The code must be either 1000, or between 3000 and 4999. ' + code + ' is neither'); // Should be DOMException
	      }
	
	      if (this.readyState !== WebSocket.OPEN) {
	        return undefined;
	      }
	
	      var server = _networkBridge2.default.serverLookup(this.url);
	      var closeEvent = (0, _eventFactory.createCloseEvent)({
	        type: 'close',
	        target: this,
	        code: _closeCodes2.default.CLOSE_NORMAL
	      });
	
	      _networkBridge2.default.removeWebSocket(this, this.url);
	
	      this.readyState = WebSocket.CLOSED;
	      this.dispatchEvent(closeEvent);
	
	      if (server) {
	        server.dispatchEvent(closeEvent, server);
	      }
	    }
	  }, {
	    key: 'toString',
	    value: function toString() {
	      return '[object WebSocket]';
	    }
	  }], [{
	    key: 'toString',
	    value: function toString() {
	      return 'function WebSocket() { [native code] }';
	    }
	  }]);
	
	  return WebSocket;
	}(_eventTarget2.default);
	
	WebSocket.CONNECTING = 0;
	WebSocket.OPEN = 1;
	WebSocket.CLOSING = 2;
	WebSocket.CLOSED = 3;
	exports.default = WebSocket;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = delay;
	/*
	* This delay allows the thread to finish assigning its on* methods
	* before invoking the delay callback. This is purely a timing hack.
	* http://geekabyte.blogspot.com/2014/01/javascript-effect-of-setting-settimeout.html
	*
	* @param {callback: function} the callback which will be invoked after the timeout
	* @parma {context: object} the context in which to invoke the function
	*/
	function delay(callback, context) {
	  setTimeout(function (timeoutContext) {
	    return callback.call(timeoutContext);
	  }, 4, context);
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _arrayHelpers = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/*
	* EventTarget is an interface implemented by objects that can
	* receive events and may have listeners for them.
	*
	* https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
	*/
	var EventTarget = function () {
	  function EventTarget() {
	    _classCallCheck(this, EventTarget);
	
	    this.listeners = {};
	  }
	
	  /*
	  * Ties a listener function to a event type which can later be invoked via the
	  * dispatchEvent method.
	  *
	  * @param {string} type - the type of event (ie: 'open', 'message', etc.)
	  * @param {function} listener - the callback function to invoke whenever a event is dispatched matching the given type
	  * @param {boolean} useCapture - N/A TODO: implement useCapture functionality
	  */
	
	
	  _createClass(EventTarget, [{
	    key: 'addEventListener',
	    value: function addEventListener(type, listener /* , useCapture */) {
	      if (typeof listener === 'function') {
	        if (!Array.isArray(this.listeners[type])) {
	          this.listeners[type] = [];
	        }
	
	        // Only add the same function once
	        if ((0, _arrayHelpers.filter)(this.listeners[type], function (item) {
	          return item === listener;
	        }).length === 0) {
	          this.listeners[type].push(listener);
	        }
	      }
	    }
	
	    /*
	    * Removes the listener so it will no longer be invoked via the dispatchEvent method.
	    *
	    * @param {string} type - the type of event (ie: 'open', 'message', etc.)
	    * @param {function} listener - the callback function to invoke whenever a event is dispatched matching the given type
	    * @param {boolean} useCapture - N/A TODO: implement useCapture functionality
	    */
	
	  }, {
	    key: 'removeEventListener',
	    value: function removeEventListener(type, removingListener /* , useCapture */) {
	      var arrayOfListeners = this.listeners[type];
	      this.listeners[type] = (0, _arrayHelpers.reject)(arrayOfListeners, function (listener) {
	        return listener === removingListener;
	      });
	    }
	
	    /*
	    * Invokes all listener functions that are listening to the given event.type property. Each
	    * listener will be passed the event as the first argument.
	    *
	    * @param {object} event - event object which will be passed to all listeners of the event.type property
	    */
	
	  }, {
	    key: 'dispatchEvent',
	    value: function dispatchEvent(event) {
	      var _this = this;
	
	      for (var _len = arguments.length, customArguments = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        customArguments[_key - 1] = arguments[_key];
	      }
	
	      var eventName = event.type;
	      var listeners = this.listeners[eventName];
	
	      if (!Array.isArray(listeners)) {
	        return false;
	      }
	
	      listeners.forEach(function (listener) {
	        if (customArguments.length > 0) {
	          listener.apply(_this, customArguments);
	        } else {
	          listener.call(_this, event);
	        }
	      });
	
	      return true;
	    }
	  }]);
	
	  return EventTarget;
	}();
	
	exports.default = EventTarget;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.reject = reject;
	exports.filter = filter;
	function reject(array, callback) {
	  var results = [];
	  array.forEach(function (itemInArray) {
	    if (!callback(itemInArray)) {
	      results.push(itemInArray);
	    }
	  });
	
	  return results;
	}
	
	function filter(array, callback) {
	  var results = [];
	  array.forEach(function (itemInArray) {
	    if (callback(itemInArray)) {
	      results.push(itemInArray);
	    }
	  });
	
	  return results;
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _arrayHelpers = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/*
	* The network bridge is a way for the mock websocket object to 'communicate' with
	* all available servers. This is a singleton object so it is important that you
	* clean up urlMap whenever you are finished.
	*/
	var NetworkBridge = function () {
	  function NetworkBridge() {
	    _classCallCheck(this, NetworkBridge);
	
	    this.urlMap = {};
	  }
	
	  /*
	  * Attaches a websocket object to the urlMap hash so that it can find the server
	  * it is connected to and the server in turn can find it.
	  *
	  * @param {object} websocket - websocket object to add to the urlMap hash
	  * @param {string} url
	  */
	
	
	  _createClass(NetworkBridge, [{
	    key: 'attachWebSocket',
	    value: function attachWebSocket(websocket, url) {
	      var connectionLookup = this.urlMap[url];
	
	      if (connectionLookup && connectionLookup.server && connectionLookup.websockets.indexOf(websocket) === -1) {
	        connectionLookup.websockets.push(websocket);
	        return connectionLookup.server;
	      }
	    }
	
	    /*
	    * Attaches a websocket to a room
	    */
	
	  }, {
	    key: 'addMembershipToRoom',
	    value: function addMembershipToRoom(websocket, room) {
	      var connectionLookup = this.urlMap[websocket.url];
	
	      if (connectionLookup && connectionLookup.server && connectionLookup.websockets.indexOf(websocket) !== -1) {
	        if (!connectionLookup.roomMemberships[room]) {
	          connectionLookup.roomMemberships[room] = [];
	        }
	
	        connectionLookup.roomMemberships[room].push(websocket);
	      }
	    }
	
	    /*
	    * Attaches a server object to the urlMap hash so that it can find a websockets
	    * which are connected to it and so that websockets can in turn can find it.
	    *
	    * @param {object} server - server object to add to the urlMap hash
	    * @param {string} url
	    */
	
	  }, {
	    key: 'attachServer',
	    value: function attachServer(server, url) {
	      var connectionLookup = this.urlMap[url];
	
	      if (!connectionLookup) {
	        this.urlMap[url] = {
	          server: server,
	          websockets: [],
	          roomMemberships: {}
	        };
	
	        return server;
	      }
	    }
	
	    /*
	    * Finds the server which is 'running' on the given url.
	    *
	    * @param {string} url - the url to use to find which server is running on it
	    */
	
	  }, {
	    key: 'serverLookup',
	    value: function serverLookup(url) {
	      var connectionLookup = this.urlMap[url];
	
	      if (connectionLookup) {
	        return connectionLookup.server;
	      }
	    }
	
	    /*
	    * Finds all websockets which is 'listening' on the given url.
	    *
	    * @param {string} url - the url to use to find all websockets which are associated with it
	    * @param {string} room - if a room is provided, will only return sockets in this room
	    * @param {class} broadcaster - socket that is broadcasting and is to be excluded from the lookup
	    */
	
	  }, {
	    key: 'websocketsLookup',
	    value: function websocketsLookup(url, room, broadcaster) {
	      var websockets = void 0;
	      var connectionLookup = this.urlMap[url];
	
	      websockets = connectionLookup ? connectionLookup.websockets : [];
	
	      if (room) {
	        var members = connectionLookup.roomMemberships[room];
	        websockets = members || [];
	      }
	
	      return broadcaster ? websockets.filter(function (websocket) {
	        return websocket !== broadcaster;
	      }) : websockets;
	    }
	
	    /*
	    * Removes the entry associated with the url.
	    *
	    * @param {string} url
	    */
	
	  }, {
	    key: 'removeServer',
	    value: function removeServer(url) {
	      delete this.urlMap[url];
	    }
	
	    /*
	    * Removes the individual websocket from the map of associated websockets.
	    *
	    * @param {object} websocket - websocket object to remove from the url map
	    * @param {string} url
	    */
	
	  }, {
	    key: 'removeWebSocket',
	    value: function removeWebSocket(websocket, url) {
	      var connectionLookup = this.urlMap[url];
	
	      if (connectionLookup) {
	        connectionLookup.websockets = (0, _arrayHelpers.reject)(connectionLookup.websockets, function (socket) {
	          return socket === websocket;
	        });
	      }
	    }
	
	    /*
	    * Removes a websocket from a room
	    */
	
	  }, {
	    key: 'removeMembershipFromRoom',
	    value: function removeMembershipFromRoom(websocket, room) {
	      var connectionLookup = this.urlMap[websocket.url];
	      var memberships = connectionLookup.roomMemberships[room];
	
	      if (connectionLookup && memberships !== null) {
	        connectionLookup.roomMemberships[room] = (0, _arrayHelpers.reject)(memberships, function (socket) {
	          return socket === websocket;
	        });
	      }
	    }
	  }]);
	
	  return NetworkBridge;
	}();
	
	exports.default = new NetworkBridge(); // Note: this is a singleton

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/*
	* https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
	*/
	var codes = {
	  CLOSE_NORMAL: 1000,
	  CLOSE_GOING_AWAY: 1001,
	  CLOSE_PROTOCOL_ERROR: 1002,
	  CLOSE_UNSUPPORTED: 1003,
	  CLOSE_NO_STATUS: 1005,
	  CLOSE_ABNORMAL: 1006,
	  CLOSE_UNSUPPORTED_DATA: 1007,
	  CLOSE_TOO_LARGE: 1009,
	  CLOSE_MISSING_EXTENSION: 1010,
	  CLOSE_INTERNAL_ERROR: 1011,
	  CLOSE_SERVICE_RESTART: 1012,
	  CLOSE_TRY_AGAIN_LATER: 1013,
	  CLOSE_TLS_HANDSHAKE: 1015
	};
	
	exports.default = codes;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = log;
	function log(method, message) {
	  /* eslint-disable no-console */
	  if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'test') {
	    console[method].call(null, message);
	  }
	  /* eslint-enable no-console */
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ },
/* 9 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createCloseEvent = exports.createMessageEvent = exports.createEvent = undefined;
	
	var _event = __webpack_require__(11);
	
	var _event2 = _interopRequireDefault(_event);
	
	var _messageEvent = __webpack_require__(13);
	
	var _messageEvent2 = _interopRequireDefault(_messageEvent);
	
	var _closeEvent = __webpack_require__(14);
	
	var _closeEvent2 = _interopRequireDefault(_closeEvent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*
	* Creates an Event object and extends it to allow full modification of
	* its properties.
	*
	* @param {object} config - within config you will need to pass type and optionally target
	*/
	function createEvent(config) {
	  var type = config.type,
	      target = config.target;
	
	  var eventObject = new _event2.default(type);
	
	  if (target) {
	    eventObject.target = target;
	    eventObject.srcElement = target;
	    eventObject.currentTarget = target;
	  }
	
	  return eventObject;
	}
	
	/*
	* Creates a MessageEvent object and extends it to allow full modification of
	* its properties.
	*
	* @param {object} config - within config: type, origin, data and optionally target
	*/
	function createMessageEvent(config) {
	  var type = config.type,
	      origin = config.origin,
	      data = config.data,
	      target = config.target;
	
	  var messageEvent = new _messageEvent2.default(type, {
	    data: data,
	    origin: origin
	  });
	
	  if (target) {
	    messageEvent.target = target;
	    messageEvent.srcElement = target;
	    messageEvent.currentTarget = target;
	  }
	
	  return messageEvent;
	}
	
	/*
	* Creates a CloseEvent object and extends it to allow full modification of
	* its properties.
	*
	* @param {object} config - within config: type and optionally target, code, and reason
	*/
	function createCloseEvent(config) {
	  var code = config.code,
	      reason = config.reason,
	      type = config.type,
	      target = config.target;
	  var wasClean = config.wasClean;
	
	
	  if (!wasClean) {
	    wasClean = code === 1000;
	  }
	
	  var closeEvent = new _closeEvent2.default(type, {
	    code: code,
	    reason: reason,
	    wasClean: wasClean
	  });
	
	  if (target) {
	    closeEvent.target = target;
	    closeEvent.srcElement = target;
	    closeEvent.currentTarget = target;
	  }
	
	  return closeEvent;
	}
	
	exports.createEvent = createEvent;
	exports.createMessageEvent = createMessageEvent;
	exports.createCloseEvent = createCloseEvent;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _eventPrototype = __webpack_require__(12);
	
	var _eventPrototype2 = _interopRequireDefault(_eventPrototype);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Event = function (_EventPrototype) {
	  _inherits(Event, _EventPrototype);
	
	  function Event(type) {
	    var eventInitConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    _classCallCheck(this, Event);
	
	    var _this = _possibleConstructorReturn(this, (Event.__proto__ || Object.getPrototypeOf(Event)).call(this));
	
	    if (!type) {
	      throw new TypeError('Failed to construct \'Event\': 1 argument required, but only 0 present.');
	    }
	
	    if ((typeof eventInitConfig === 'undefined' ? 'undefined' : _typeof(eventInitConfig)) !== 'object') {
	      throw new TypeError('Failed to construct \'Event\': parameter 2 (\'eventInitDict\') is not an object');
	    }
	
	    var bubbles = eventInitConfig.bubbles,
	        cancelable = eventInitConfig.cancelable;
	
	
	    _this.type = String(type);
	    _this.timeStamp = Date.now();
	    _this.target = null;
	    _this.srcElement = null;
	    _this.returnValue = true;
	    _this.isTrusted = false;
	    _this.eventPhase = 0;
	    _this.defaultPrevented = false;
	    _this.currentTarget = null;
	    _this.cancelable = cancelable ? Boolean(cancelable) : false;
	    _this.canncelBubble = false;
	    _this.bubbles = bubbles ? Boolean(bubbles) : false;
	    return _this;
	  }
	
	  return Event;
	}(_eventPrototype2.default);
	
	exports.default = Event;

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EventPrototype = function () {
	  function EventPrototype() {
	    _classCallCheck(this, EventPrototype);
	  }
	
	  _createClass(EventPrototype, [{
	    key: 'stopPropagation',
	
	    // Noops
	    value: function stopPropagation() {}
	  }, {
	    key: 'stopImmediatePropagation',
	    value: function stopImmediatePropagation() {}
	
	    // if no arguments are passed then the type is set to "undefined" on
	    // chrome and safari.
	
	  }, {
	    key: 'initEvent',
	    value: function initEvent() {
	      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'undefined';
	      var bubbles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	      var cancelable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	
	      this.type = String(type);
	      this.bubbles = Boolean(bubbles);
	      this.cancelable = Boolean(cancelable);
	    }
	  }]);
	
	  return EventPrototype;
	}();
	
	exports.default = EventPrototype;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _eventPrototype = __webpack_require__(12);
	
	var _eventPrototype2 = _interopRequireDefault(_eventPrototype);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MessageEvent = function (_EventPrototype) {
	  _inherits(MessageEvent, _EventPrototype);
	
	  function MessageEvent(type) {
	    var eventInitConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    _classCallCheck(this, MessageEvent);
	
	    var _this = _possibleConstructorReturn(this, (MessageEvent.__proto__ || Object.getPrototypeOf(MessageEvent)).call(this));
	
	    if (!type) {
	      throw new TypeError('Failed to construct \'MessageEvent\': 1 argument required, but only 0 present.');
	    }
	
	    if ((typeof eventInitConfig === 'undefined' ? 'undefined' : _typeof(eventInitConfig)) !== 'object') {
	      throw new TypeError('Failed to construct \'MessageEvent\': parameter 2 (\'eventInitDict\') is not an object');
	    }
	
	    var bubbles = eventInitConfig.bubbles,
	        cancelable = eventInitConfig.cancelable,
	        data = eventInitConfig.data,
	        origin = eventInitConfig.origin,
	        lastEventId = eventInitConfig.lastEventId,
	        ports = eventInitConfig.ports;
	
	
	    _this.type = String(type);
	    _this.timeStamp = Date.now();
	    _this.target = null;
	    _this.srcElement = null;
	    _this.returnValue = true;
	    _this.isTrusted = false;
	    _this.eventPhase = 0;
	    _this.defaultPrevented = false;
	    _this.currentTarget = null;
	    _this.cancelable = cancelable ? Boolean(cancelable) : false;
	    _this.canncelBubble = false;
	    _this.bubbles = bubbles ? Boolean(bubbles) : false;
	    _this.origin = origin ? String(origin) : '';
	    _this.ports = typeof ports === 'undefined' ? null : ports;
	    _this.data = typeof data === 'undefined' ? null : data;
	    _this.lastEventId = lastEventId ? String(lastEventId) : '';
	    return _this;
	  }
	
	  return MessageEvent;
	}(_eventPrototype2.default);
	
	exports.default = MessageEvent;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _eventPrototype = __webpack_require__(12);
	
	var _eventPrototype2 = _interopRequireDefault(_eventPrototype);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var CloseEvent = function (_EventPrototype) {
	  _inherits(CloseEvent, _EventPrototype);
	
	  function CloseEvent(type) {
	    var eventInitConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    _classCallCheck(this, CloseEvent);
	
	    var _this = _possibleConstructorReturn(this, (CloseEvent.__proto__ || Object.getPrototypeOf(CloseEvent)).call(this));
	
	    if (!type) {
	      throw new TypeError('Failed to construct \'CloseEvent\': 1 argument required, but only 0 present.');
	    }
	
	    if ((typeof eventInitConfig === 'undefined' ? 'undefined' : _typeof(eventInitConfig)) !== 'object') {
	      throw new TypeError('Failed to construct \'CloseEvent\': parameter 2 (\'eventInitDict\') is not an object');
	    }
	
	    var bubbles = eventInitConfig.bubbles,
	        cancelable = eventInitConfig.cancelable,
	        code = eventInitConfig.code,
	        reason = eventInitConfig.reason,
	        wasClean = eventInitConfig.wasClean;
	
	
	    _this.type = String(type);
	    _this.timeStamp = Date.now();
	    _this.target = null;
	    _this.srcElement = null;
	    _this.returnValue = true;
	    _this.isTrusted = false;
	    _this.eventPhase = 0;
	    _this.defaultPrevented = false;
	    _this.currentTarget = null;
	    _this.cancelable = cancelable ? Boolean(cancelable) : false;
	    _this.canncelBubble = false;
	    _this.bubbles = bubbles ? Boolean(bubbles) : false;
	    _this.code = typeof code === 'number' ? Number(code) : 0;
	    _this.reason = reason ? String(reason) : '';
	    _this.wasClean = wasClean ? Boolean(wasClean) : false;
	    return _this;
	  }
	
	  return CloseEvent;
	}(_eventPrototype2.default);
	
	exports.default = CloseEvent;

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.normalizeProtocol = normalizeProtocol;
	exports.normalizeUrl = normalizeUrl;
	function normalizeProtocol() {
	  var protocol = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	  var activeProtocol = protocol;
	
	  if (Array.isArray(protocol)) {
	    if (protocol.length > 0) {
	      activeProtocol = protocol[0];
	    } else {
	      activeProtocol = '';
	    }
	  }
	
	  if ((typeof activeProtocol === 'undefined' ? 'undefined' : _typeof(activeProtocol)) === 'symbol') {
	    throw new TypeError('Cannot convert a Symbol value to a string');
	  }
	
	  if (String(activeProtocol).includes(' ')) {
	    // TODO Should be DOMException
	    throw new Error('Failed to construct \'WebSocket\': The subprotocol \'' + String(activeProtocol) + '\' is invalid');
	  }
	
	  return activeProtocol;
	}
	
	function normalizeUrl(url) {
	  var parts = url.split('://');
	  return parts[1] && parts[1].indexOf('/') === -1 ? url + '/' : url;
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.default = retrieveGlobalObject;
	function retrieveGlobalObject() {
	  if (typeof window !== 'undefined') {
	    return window;
	  }
	
	  return (typeof process === 'undefined' ? 'undefined' : _typeof(process)) === 'object' && "function" === 'function' && (typeof global === 'undefined' ? 'undefined' : _typeof(global)) === 'object' ? global : this;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9), (function() { return this; }())))

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _delay = __webpack_require__(3);
	
	var _delay2 = _interopRequireDefault(_delay);
	
	var _eventTarget = __webpack_require__(4);
	
	var _eventTarget2 = _interopRequireDefault(_eventTarget);
	
	var _networkBridge = __webpack_require__(6);
	
	var _networkBridge2 = _interopRequireDefault(_networkBridge);
	
	var _closeCodes = __webpack_require__(7);
	
	var _closeCodes2 = _interopRequireDefault(_closeCodes);
	
	var _normalize = __webpack_require__(15);
	
	var _logger = __webpack_require__(8);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	var _eventFactory = __webpack_require__(10);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/*
	* The socket-io class is designed to mimick the real API as closely as possible.
	*
	* http://socket.io/docs/
	*/
	var SocketIO = function (_EventTarget) {
	  _inherits(SocketIO, _EventTarget);
	
	  /*
	  * @param {string} url
	  */
	  function SocketIO() {
	    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'socket.io';
	    var protocol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	
	    _classCallCheck(this, SocketIO);
	
	    var _this = _possibleConstructorReturn(this, (SocketIO.__proto__ || Object.getPrototypeOf(SocketIO)).call(this));
	
	    _this.binaryType = 'blob';
	    _this.url = (0, _normalize.normalizeUrl)(url);
	    _this.readyState = SocketIO.CONNECTING;
	    _this.protocol = '';
	
	    if (typeof protocol === 'string') {
	      _this.protocol = protocol;
	    } else if (Array.isArray(protocol) && protocol.length > 0) {
	      _this.protocol = protocol[0];
	    }
	
	    var server = _networkBridge2.default.attachWebSocket(_this, _this.url);
	
	    /*
	    * Delay triggering the connection events so they can be defined in time.
	    */
	    (0, _delay2.default)(function delayCallback() {
	      if (server) {
	        this.readyState = SocketIO.OPEN;
	        server.dispatchEvent((0, _eventFactory.createEvent)({ type: 'connection' }), server, this);
	        server.dispatchEvent((0, _eventFactory.createEvent)({ type: 'connect' }), server, this); // alias
	        this.dispatchEvent((0, _eventFactory.createEvent)({ type: 'connect', target: this }));
	      } else {
	        this.readyState = SocketIO.CLOSED;
	        this.dispatchEvent((0, _eventFactory.createEvent)({ type: 'error', target: this }));
	        this.dispatchEvent((0, _eventFactory.createCloseEvent)({
	          type: 'close',
	          target: this,
	          code: _closeCodes2.default.CLOSE_NORMAL
	        }));
	
	        (0, _logger2.default)('error', 'Socket.io connection to \'' + this.url + '\' failed');
	      }
	    }, _this);
	
	    /**
	      Add an aliased event listener for close / disconnect
	     */
	    _this.addEventListener('close', function (event) {
	      _this.dispatchEvent((0, _eventFactory.createCloseEvent)({
	        type: 'disconnect',
	        target: event.target,
	        code: event.code
	      }));
	    });
	    return _this;
	  }
	
	  /*
	  * Closes the SocketIO connection or connection attempt, if any.
	  * If the connection is already CLOSED, this method does nothing.
	  */
	
	
	  _createClass(SocketIO, [{
	    key: 'close',
	    value: function close() {
	      if (this.readyState !== SocketIO.OPEN) {
	        return undefined;
	      }
	
	      var server = _networkBridge2.default.serverLookup(this.url);
	      _networkBridge2.default.removeWebSocket(this, this.url);
	
	      this.readyState = SocketIO.CLOSED;
	      this.dispatchEvent((0, _eventFactory.createCloseEvent)({
	        type: 'close',
	        target: this,
	        code: _closeCodes2.default.CLOSE_NORMAL
	      }));
	
	      if (server) {
	        server.dispatchEvent((0, _eventFactory.createCloseEvent)({
	          type: 'disconnect',
	          target: this,
	          code: _closeCodes2.default.CLOSE_NORMAL
	        }), server);
	      }
	    }
	
	    /*
	    * Alias for Socket#close
	    *
	    * https://github.com/socketio/socket.io-client/blob/master/lib/socket.js#L383
	    */
	
	  }, {
	    key: 'disconnect',
	    value: function disconnect() {
	      this.close();
	    }
	
	    /*
	    * Submits an event to the server with a payload
	    */
	
	  }, {
	    key: 'emit',
	    value: function emit(event) {
	      for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        data[_key - 1] = arguments[_key];
	      }
	
	      if (this.readyState !== SocketIO.OPEN) {
	        throw new Error('SocketIO is already in CLOSING or CLOSED state');
	      }
	
	      var messageEvent = (0, _eventFactory.createMessageEvent)({
	        type: event,
	        origin: this.url,
	        data: data
	      });
	
	      var server = _networkBridge2.default.serverLookup(this.url);
	
	      if (server) {
	        server.dispatchEvent.apply(server, [messageEvent].concat(data));
	      }
	    }
	
	    /*
	    * Submits a 'message' event to the server.
	    *
	    * Should behave exactly like WebSocket#send
	    *
	    * https://github.com/socketio/socket.io-client/blob/master/lib/socket.js#L113
	    */
	
	  }, {
	    key: 'send',
	    value: function send(data) {
	      this.emit('message', data);
	    }
	
	    /*
	    * For broadcasting events to other connected sockets.
	    *
	    * e.g. socket.broadcast.emit('hi!');
	    * e.g. socket.broadcast.to('my-room').emit('hi!');
	    */
	
	  }, {
	    key: 'on',
	
	
	    /*
	    * For registering events to be received from the server
	    */
	    value: function on(type, callback) {
	      this.addEventListener(type, callback);
	    }
	
	    /*
	     * Join a room on a server
	     *
	     * http://socket.io/docs/rooms-and-namespaces/#joining-and-leaving
	     */
	
	  }, {
	    key: 'join',
	    value: function join(room) {
	      _networkBridge2.default.addMembershipToRoom(this, room);
	    }
	
	    /*
	     * Get the websocket to leave the room
	     *
	     * http://socket.io/docs/rooms-and-namespaces/#joining-and-leaving
	     */
	
	  }, {
	    key: 'leave',
	    value: function leave(room) {
	      _networkBridge2.default.removeMembershipFromRoom(this, room);
	    }
	
	    /*
	     * Invokes all listener functions that are listening to the given event.type property. Each
	     * listener will be passed the event as the first argument.
	     *
	     * @param {object} event - event object which will be passed to all listeners of the event.type property
	     */
	
	  }, {
	    key: 'dispatchEvent',
	    value: function dispatchEvent(event) {
	      var _this2 = this;
	
	      for (var _len2 = arguments.length, customArguments = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        customArguments[_key2 - 1] = arguments[_key2];
	      }
	
	      var eventName = event.type;
	      var listeners = this.listeners[eventName];
	
	      if (!Array.isArray(listeners)) {
	        return false;
	      }
	
	      listeners.forEach(function (listener) {
	        if (customArguments.length > 0) {
	          listener.apply(_this2, customArguments);
	        } else {
	          // Regular WebSockets expect a MessageEvent but Socketio.io just wants raw data
	          //  payload instanceof MessageEvent works, but you can't isntance of NodeEvent
	          //  for now we detect if the output has data defined on it
	          listener.call(_this2, event.data ? event.data : event);
	        }
	      });
	    }
	  }, {
	    key: 'broadcast',
	    get: function get() {
	      if (this.readyState !== SocketIO.OPEN) {
	        throw new Error('SocketIO is already in CLOSING or CLOSED state');
	      }
	
	      var self = this;
	      var server = _networkBridge2.default.serverLookup(this.url);
	      if (!server) {
	        throw new Error('SocketIO can not find a server at the specified URL (' + this.url + ')');
	      }
	
	      return {
	        emit: function emit(event, data) {
	          server.emit(event, data, { websockets: _networkBridge2.default.websocketsLookup(self.url, null, self) });
	        },
	        to: function to(room) {
	          return server.to(room, self);
	        },
	        in: function _in(room) {
	          return server.in(room, self);
	        }
	      };
	    }
	  }]);
	
	  return SocketIO;
	}(_eventTarget2.default);
	
	SocketIO.CONNECTING = 0;
	SocketIO.OPEN = 1;
	SocketIO.CLOSING = 2;
	SocketIO.CLOSED = 3;
	
	/*
	* Static constructor methods for the IO Socket
	*/
	var IO = function ioConstructor(url) {
	  return new SocketIO(url);
	};
	
	/*
	* Alias the raw IO() constructor
	*/
	IO.connect = function ioConnect(url) {
	  /* eslint-disable new-cap */
	  return IO(url);
	  /* eslint-enable new-cap */
	};
	
	exports.default = IO;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBhNGFjNWE3Njc4ZDFmMzgyYzVkMCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd2Vic29ja2V0LmpzIiwid2VicGFjazovLy8uL3NyYy9oZWxwZXJzL2RlbGF5LmpzIiwid2VicGFjazovLy8uL3NyYy9ldmVudC10YXJnZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMvYXJyYXktaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbmV0d29yay1icmlkZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMvY2xvc2UtY29kZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMvbG9nZ2VyLmpzIiwid2VicGFjazovLy8uL34vcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9ldmVudC1mYWN0b3J5LmpzIiwid2VicGFjazovLy8uL3NyYy9oZWxwZXJzL2V2ZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9oZWxwZXJzL2V2ZW50LXByb3RvdHlwZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVycy9tZXNzYWdlLWV2ZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9oZWxwZXJzL2Nsb3NlLWV2ZW50LmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9ub3JtYWxpemUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMvZ2xvYmFsLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc29ja2V0LWlvLmpzIl0sIm5hbWVzIjpbIlNlcnZlciIsIldlYlNvY2tldCIsIlNvY2tldElPIiwidXJsIiwib3B0aW9ucyIsIm9yaWdpbmFsV2ViU29ja2V0Iiwic2VydmVyIiwiYXR0YWNoU2VydmVyIiwiZGlzcGF0Y2hFdmVudCIsInR5cGUiLCJFcnJvciIsInZlcmlmaXlDbGllbnQiLCJzdGFydCIsImdsb2JhbE9iaiIsImNhbGxiYWNrIiwicmVtb3ZlU2VydmVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImRhdGEiLCJlbWl0IiwiZXZlbnQiLCJ3ZWJzb2NrZXRzIiwid2Vic29ja2V0c0xvb2t1cCIsImFyZ3VtZW50cyIsImxlbmd0aCIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJjYWxsIiwiZm9yRWFjaCIsInNvY2tldCIsImlzQXJyYXkiLCJvcmlnaW4iLCJ0YXJnZXQiLCJjb2RlIiwicmVhc29uIiwid2FzQ2xlYW4iLCJsaXN0ZW5lcnMiLCJyZWFkeVN0YXRlIiwiQ0xPU0UiLCJDTE9TRV9OT1JNQUwiLCJyb29tIiwiYnJvYWRjYXN0ZXIiLCJzZWxmIiwiYXJncyIsInRvIiwiYXBwbHkiLCJvZiIsInByb3RvY29sIiwiVHlwZUVycm9yIiwic3RhcnRzV2l0aCIsIlN0cmluZyIsImJpbmFyeVR5cGUiLCJDT05ORUNUSU5HIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydGllcyIsIm9ub3BlbiIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJnZXQiLCJvcGVuIiwic2V0IiwibGlzdGVuZXIiLCJvbm1lc3NhZ2UiLCJtZXNzYWdlIiwib25jbG9zZSIsImNsb3NlIiwib25lcnJvciIsImVycm9yIiwidmFsdWUiLCJpbmRleE9mIiwiY29uc29sZSIsIndhcm4iLCJ0b1N0cmluZyIsImRlbGF5Q2FsbGJhY2siLCJhdHRhY2hXZWJTb2NrZXQiLCJ2ZXJpZnlDbGllbnQiLCJDTE9TRUQiLCJyZW1vdmVXZWJTb2NrZXQiLCJPUEVOIiwiQ0xPU0lORyIsIm1lc3NhZ2VFdmVudCIsInNlcnZlckxvb2t1cCIsIk51bWJlciIsIk5hTiIsInVuZGVmaW5lZCIsImNsb3NlRXZlbnQiLCJkZWxheSIsImNvbnRleHQiLCJzZXRUaW1lb3V0IiwidGltZW91dENvbnRleHQiLCJFdmVudFRhcmdldCIsIml0ZW0iLCJwdXNoIiwicmVtb3ZpbmdMaXN0ZW5lciIsImFycmF5T2ZMaXN0ZW5lcnMiLCJjdXN0b21Bcmd1bWVudHMiLCJldmVudE5hbWUiLCJyZWplY3QiLCJmaWx0ZXIiLCJhcnJheSIsInJlc3VsdHMiLCJpdGVtSW5BcnJheSIsIk5ldHdvcmtCcmlkZ2UiLCJ1cmxNYXAiLCJ3ZWJzb2NrZXQiLCJjb25uZWN0aW9uTG9va3VwIiwicm9vbU1lbWJlcnNoaXBzIiwibWVtYmVycyIsIm1lbWJlcnNoaXBzIiwiY29kZXMiLCJDTE9TRV9HT0lOR19BV0FZIiwiQ0xPU0VfUFJPVE9DT0xfRVJST1IiLCJDTE9TRV9VTlNVUFBPUlRFRCIsIkNMT1NFX05PX1NUQVRVUyIsIkNMT1NFX0FCTk9STUFMIiwiQ0xPU0VfVU5TVVBQT1JURURfREFUQSIsIkNMT1NFX1RPT19MQVJHRSIsIkNMT1NFX01JU1NJTkdfRVhURU5TSU9OIiwiQ0xPU0VfSU5URVJOQUxfRVJST1IiLCJDTE9TRV9TRVJWSUNFX1JFU1RBUlQiLCJDTE9TRV9UUllfQUdBSU5fTEFURVIiLCJDTE9TRV9UTFNfSEFORFNIQUtFIiwibG9nIiwibWV0aG9kIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwiY3JlYXRlRXZlbnQiLCJjb25maWciLCJldmVudE9iamVjdCIsInNyY0VsZW1lbnQiLCJjdXJyZW50VGFyZ2V0IiwiY3JlYXRlTWVzc2FnZUV2ZW50IiwiY3JlYXRlQ2xvc2VFdmVudCIsIkV2ZW50IiwiZXZlbnRJbml0Q29uZmlnIiwiYnViYmxlcyIsImNhbmNlbGFibGUiLCJ0aW1lU3RhbXAiLCJEYXRlIiwibm93IiwicmV0dXJuVmFsdWUiLCJpc1RydXN0ZWQiLCJldmVudFBoYXNlIiwiZGVmYXVsdFByZXZlbnRlZCIsIkJvb2xlYW4iLCJjYW5uY2VsQnViYmxlIiwiRXZlbnRQcm90b3R5cGUiLCJNZXNzYWdlRXZlbnQiLCJsYXN0RXZlbnRJZCIsInBvcnRzIiwiQ2xvc2VFdmVudCIsIm5vcm1hbGl6ZVByb3RvY29sIiwibm9ybWFsaXplVXJsIiwiYWN0aXZlUHJvdG9jb2wiLCJpbmNsdWRlcyIsInBhcnRzIiwic3BsaXQiLCJyZXRyaWV2ZUdsb2JhbE9iamVjdCIsIndpbmRvdyIsImdsb2JhbCIsImFkZE1lbWJlcnNoaXBUb1Jvb20iLCJyZW1vdmVNZW1iZXJzaGlwRnJvbVJvb20iLCJpbiIsIklPIiwiaW9Db25zdHJ1Y3RvciIsImNvbm5lY3QiLCJpb0Nvbm5lY3QiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUN0Q0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFTyxLQUFNQSwwQ0FBTjtBQUNBLEtBQU1DLG1EQUFOO0FBQ0EsS0FBTUMsZ0RBQU4sQzs7Ozs7Ozs7Ozs7Ozs7OztBQ05QOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7OztLQUdNRixNOzs7QUFDSjs7O0FBR0EsbUJBQVlHLEdBQVosRUFBK0I7QUFBQSxTQUFkQyxPQUFjLHVFQUFKLEVBQUk7O0FBQUE7O0FBQUE7O0FBRTdCLFdBQUtELEdBQUwsR0FBVyw2QkFBYUEsR0FBYixDQUFYO0FBQ0EsV0FBS0UsaUJBQUwsR0FBeUIsSUFBekI7QUFDQSxTQUFNQyxTQUFTLHdCQUFjQyxZQUFkLFFBQWlDLE1BQUtKLEdBQXRDLENBQWY7O0FBRUEsU0FBSSxDQUFDRyxNQUFMLEVBQWE7QUFDWCxhQUFLRSxhQUFMLENBQW1CLCtCQUFZLEVBQUVDLE1BQU0sT0FBUixFQUFaLENBQW5CO0FBQ0EsYUFBTSxJQUFJQyxLQUFKLENBQVUsZ0RBQVYs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QUErQ3VDLElBQS9DLENBQWQsRUFBekI7QUFDRCxVQUhJO0FBSUxFLFdBSkssY0FJRkosSUFKRSxFQUlJO0FBQ1Asa0JBQU9sQyxPQUFPc0MsRUFBUCxDQUFVSixJQUFWLEVBQWdCRSxJQUFoQixDQUFQO0FBQ0QsVUFOSTtBQU9MeUgsV0FQSyxlQU9GM0gsSUFQRSxFQU9JO0FBQ1Asa0JBQU9sQyxPQUFPNkosRUFBUCxDQUFVM0gsSUFBVixFQUFnQkUsSUFBaEIsQ0FBUDtBQUNEO0FBVEksUUFBUDtBQVdEOzs7Ozs7QUFzREh4QyxVQUFTa0QsVUFBVCxHQUFzQixDQUF0QjtBQUNBbEQsVUFBUzRFLElBQVQsR0FBZ0IsQ0FBaEI7QUFDQTVFLFVBQVM2RSxPQUFULEdBQW1CLENBQW5CO0FBQ0E3RSxVQUFTMEUsTUFBVCxHQUFrQixDQUFsQjs7QUFFQTs7O0FBR0EsS0FBTXdGLEtBQUssU0FBU0MsYUFBVCxDQUF1QmxLLEdBQXZCLEVBQTRCO0FBQ3JDLFVBQU8sSUFBSUQsUUFBSixDQUFhQyxHQUFiLENBQVA7QUFDRCxFQUZEOztBQUlBOzs7QUFHQWlLLElBQUdFLE9BQUgsR0FBYSxTQUFTQyxTQUFULENBQW1CcEssR0FBbkIsRUFBd0I7QUFDbkM7QUFDQSxVQUFPaUssR0FBR2pLLEdBQUgsQ0FBUDtBQUNBO0FBQ0QsRUFKRDs7bUJBTWVpSyxFIiwiZmlsZSI6ImRpc3QvbW9jay1zb2NrZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJNb2NrXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIk1vY2tcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYTRhYzVhNzY3OGQxZjM4MmM1ZDAiLCJpbXBvcnQgTW9ja1NlcnZlciBmcm9tICcuL3NlcnZlcic7XG5pbXBvcnQgTW9ja1NvY2tldElPIGZyb20gJy4vc29ja2V0LWlvJztcbmltcG9ydCBNb2NrV2ViU29ja2V0IGZyb20gJy4vd2Vic29ja2V0JztcblxuZXhwb3J0IGNvbnN0IFNlcnZlciA9IE1vY2tTZXJ2ZXI7XG5leHBvcnQgY29uc3QgV2ViU29ja2V0ID0gTW9ja1dlYlNvY2tldDtcbmV4cG9ydCBjb25zdCBTb2NrZXRJTyA9IE1vY2tTb2NrZXRJTztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsImltcG9ydCBXZWJTb2NrZXQgZnJvbSAnLi93ZWJzb2NrZXQnO1xuaW1wb3J0IEV2ZW50VGFyZ2V0IGZyb20gJy4vZXZlbnQtdGFyZ2V0JztcbmltcG9ydCBuZXR3b3JrQnJpZGdlIGZyb20gJy4vbmV0d29yay1icmlkZ2UnO1xuaW1wb3J0IENMT1NFX0NPREVTIGZyb20gJy4vaGVscGVycy9jbG9zZS1jb2Rlcyc7XG5pbXBvcnQgeyBub3JtYWxpemVVcmwgfSBmcm9tICcuL3V0aWxzL25vcm1hbGl6ZSc7XG5pbXBvcnQgZ2xvYmFsT2JqZWN0IGZyb20gJy4vaGVscGVycy9nbG9iYWwtb2JqZWN0JztcbmltcG9ydCB7IGNyZWF0ZUV2ZW50LCBjcmVhdGVNZXNzYWdlRXZlbnQsIGNyZWF0ZUNsb3NlRXZlbnQgfSBmcm9tICcuL2V2ZW50LWZhY3RvcnknO1xuXG4vKlxuKiBodHRwczovL2dpdGh1Yi5jb20vd2Vic29ja2V0cy93cyNzZXJ2ZXItZXhhbXBsZVxuKi9cbmNsYXNzIFNlcnZlciBleHRlbmRzIEV2ZW50VGFyZ2V0IHtcbiAgLypcbiAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICovXG4gIGNvbnN0cnVjdG9yKHVybCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnVybCA9IG5vcm1hbGl6ZVVybCh1cmwpO1xuICAgIHRoaXMub3JpZ2luYWxXZWJTb2NrZXQgPSBudWxsO1xuICAgIGNvbnN0IHNlcnZlciA9IG5ldHdvcmtCcmlkZ2UuYXR0YWNoU2VydmVyKHRoaXMsIHRoaXMudXJsKTtcblxuICAgIGlmICghc2VydmVyKSB7XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoY3JlYXRlRXZlbnQoeyB0eXBlOiAnZXJyb3InIH0pKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQSBtb2NrIHNlcnZlciBpcyBhbHJlYWR5IGxpc3RlbmluZyBvbiB0aGlzIHVybCcpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy52ZXJpZml5Q2xpZW50ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgb3B0aW9ucy52ZXJpZml5Q2xpZW50ID0gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXG4gICAgdGhpcy5zdGFydCgpO1xuICB9XG5cbiAgLypcbiAgKiBBdHRhY2hlcyB0aGUgbW9jayB3ZWJzb2NrZXQgb2JqZWN0IHRvIHRoZSBnbG9iYWwgb2JqZWN0XG4gICovXG4gIHN0YXJ0KCkge1xuICAgIGNvbnN0IGdsb2JhbE9iaiA9IGdsb2JhbE9iamVjdCgpO1xuXG4gICAgaWYgKGdsb2JhbE9iai5XZWJTb2NrZXQpIHtcbiAgICAgIHRoaXMub3JpZ2luYWxXZWJTb2NrZXQgPSBnbG9iYWxPYmouV2ViU29ja2V0O1xuICAgIH1cblxuICAgIGdsb2JhbE9iai5XZWJTb2NrZXQgPSBXZWJTb2NrZXQ7XG4gIH1cblxuICAvKlxuICAqIFJlbW92ZXMgdGhlIG1vY2sgd2Vic29ja2V0IG9iamVjdCBmcm9tIHRoZSBnbG9iYWwgb2JqZWN0XG4gICovXG4gIHN0b3AoY2FsbGJhY2sgPSAoKSA9PiB7fSkge1xuICAgIGNvbnN0IGdsb2JhbE9iaiA9IGdsb2JhbE9iamVjdCgpO1xuXG4gICAgaWYgKHRoaXMub3JpZ2luYWxXZWJTb2NrZXQpIHtcbiAgICAgIGdsb2JhbE9iai5XZWJTb2NrZXQgPSB0aGlzLm9yaWdpbmFsV2ViU29ja2V0O1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgZ2xvYmFsT2JqLldlYlNvY2tldDtcbiAgICB9XG5cbiAgICB0aGlzLm9yaWdpbmFsV2ViU29ja2V0ID0gbnVsbDtcblxuICAgIG5ldHdvcmtCcmlkZ2UucmVtb3ZlU2VydmVyKHRoaXMudXJsKTtcblxuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgKiBUaGlzIGlzIHRoZSBtYWluIGZ1bmN0aW9uIGZvciB0aGUgbW9jayBzZXJ2ZXIgdG8gc3Vic2NyaWJlIHRvIHRoZSBvbiBldmVudHMuXG4gICpcbiAgKiBpZTogbW9ja1NlcnZlci5vbignY29ubmVjdGlvbicsIGZ1bmN0aW9uKCkgeyBjb25zb2xlLmxvZygnYSBtb2NrIGNsaWVudCBjb25uZWN0ZWQnKTsgfSk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIFRoZSBldmVudCBrZXkgdG8gc3Vic2NyaWJlIHRvLiBWYWxpZCBrZXlzIGFyZTogY29ubmVjdGlvbiwgbWVzc2FnZSwgYW5kIGNsb3NlLlxuICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIHdoaWNoIHNob3VsZCBiZSBjYWxsZWQgd2hlbiBhIGNlcnRhaW4gZXZlbnQgaXMgZmlyZWQuXG4gICovXG4gIG9uKHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8qXG4gICogVGhpcyBzZW5kIGZ1bmN0aW9uIHdpbGwgbm90aWZ5IGFsbCBtb2NrIGNsaWVudHMgdmlhIHRoZWlyIG9ubWVzc2FnZSBjYWxsYmFja3MgdGhhdCB0aGUgc2VydmVyXG4gICogaGFzIGEgbWVzc2FnZSBmb3IgdGhlbS5cbiAgKlxuICAqIEBwYXJhbSB7Kn0gZGF0YSAtIEFueSBqYXZhc2NyaXB0IG9iamVjdCB3aGljaCB3aWxsIGJlIGNyYWZ0ZWQgaW50byBhIE1lc3NhZ2VPYmplY3QuXG4gICovXG4gIHNlbmQoZGF0YSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5lbWl0KCdtZXNzYWdlJywgZGF0YSwgb3B0aW9ucyk7XG4gIH1cblxuICAvKlxuICAqIFNlbmRzIGEgZ2VuZXJpYyBtZXNzYWdlIGV2ZW50IHRvIGFsbCBtb2NrIGNsaWVudHMuXG4gICovXG4gIGVtaXQoZXZlbnQsIGRhdGEsIG9wdGlvbnMgPSB7fSkge1xuICAgIGxldCB7IHdlYnNvY2tldHMgfSA9IG9wdGlvbnM7XG5cbiAgICBpZiAoIXdlYnNvY2tldHMpIHtcbiAgICAgIHdlYnNvY2tldHMgPSBuZXR3b3JrQnJpZGdlLndlYnNvY2tldHNMb29rdXAodGhpcy51cmwpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcgfHwgYXJndW1lbnRzLmxlbmd0aCA+IDMpIHtcbiAgICAgIGRhdGEgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEsIGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIH1cblxuICAgIHdlYnNvY2tldHMuZm9yRWFjaCgoc29ja2V0KSA9PiB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgICBzb2NrZXQuZGlzcGF0Y2hFdmVudChjcmVhdGVNZXNzYWdlRXZlbnQoe1xuICAgICAgICAgIHR5cGU6IGV2ZW50LFxuICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgb3JpZ2luOiB0aGlzLnVybCxcbiAgICAgICAgICB0YXJnZXQ6IHNvY2tldFxuICAgICAgICB9KSwgLi4uZGF0YSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzb2NrZXQuZGlzcGF0Y2hFdmVudChjcmVhdGVNZXNzYWdlRXZlbnQoe1xuICAgICAgICAgIHR5cGU6IGV2ZW50LFxuICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgb3JpZ2luOiB0aGlzLnVybCxcbiAgICAgICAgICB0YXJnZXQ6IHNvY2tldFxuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKlxuICAqIENsb3NlcyB0aGUgY29ubmVjdGlvbiBhbmQgdHJpZ2dlcnMgdGhlIG9uY2xvc2UgbWV0aG9kIG9mIGFsbCBsaXN0ZW5pbmdcbiAgKiB3ZWJzb2NrZXRzLiBBZnRlciB0aGF0IGl0IHJlbW92ZXMgaXRzZWxmIGZyb20gdGhlIHVybE1hcCBzbyBhbm90aGVyIHNlcnZlclxuICAqIGNvdWxkIGFkZCBpdHNlbGYgdG8gdGhlIHVybC5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gICovXG4gIGNsb3NlKG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNvZGUsXG4gICAgICByZWFzb24sXG4gICAgICB3YXNDbGVhblxuICAgIH0gPSBvcHRpb25zO1xuICAgIGNvbnN0IGxpc3RlbmVycyA9IG5ldHdvcmtCcmlkZ2Uud2Vic29ja2V0c0xvb2t1cCh0aGlzLnVybCk7XG5cbiAgICBsaXN0ZW5lcnMuZm9yRWFjaCgoc29ja2V0KSA9PiB7XG4gICAgICBzb2NrZXQucmVhZHlTdGF0ZSA9IFdlYlNvY2tldC5DTE9TRTtcbiAgICAgIHNvY2tldC5kaXNwYXRjaEV2ZW50KGNyZWF0ZUNsb3NlRXZlbnQoe1xuICAgICAgICB0eXBlOiAnY2xvc2UnLFxuICAgICAgICB0YXJnZXQ6IHNvY2tldCxcbiAgICAgICAgY29kZTogY29kZSB8fCBDTE9TRV9DT0RFUy5DTE9TRV9OT1JNQUwsXG4gICAgICAgIHJlYXNvbjogcmVhc29uIHx8ICcnLFxuICAgICAgICB3YXNDbGVhblxuICAgICAgfSkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KGNyZWF0ZUNsb3NlRXZlbnQoeyB0eXBlOiAnY2xvc2UnIH0pLCB0aGlzKTtcbiAgICBuZXR3b3JrQnJpZGdlLnJlbW92ZVNlcnZlcih0aGlzLnVybCk7XG4gIH1cblxuICAvKlxuICAqIFJldHVybnMgYW4gYXJyYXkgb2Ygd2Vic29ja2V0cyB3aGljaCBhcmUgbGlzdGVuaW5nIHRvIHRoaXMgc2VydmVyXG4gICovXG4gIGNsaWVudHMoKSB7XG4gICAgcmV0dXJuIG5ldHdvcmtCcmlkZ2Uud2Vic29ja2V0c0xvb2t1cCh0aGlzLnVybCk7XG4gIH1cblxuICAvKlxuICAqIFByZXBhcmVzIGEgbWV0aG9kIHRvIHN1Ym1pdCBhbiBldmVudCB0byBtZW1iZXJzIG9mIHRoZSByb29tXG4gICpcbiAgKiBlLmcuIHNlcnZlci50bygnbXktcm9vbScpLmVtaXQoJ2hpIScpO1xuICAqL1xuICB0byhyb29tLCBicm9hZGNhc3Rlcikge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGNvbnN0IHdlYnNvY2tldHMgPSBuZXR3b3JrQnJpZGdlLndlYnNvY2tldHNMb29rdXAodGhpcy51cmwsIHJvb20sIGJyb2FkY2FzdGVyKTtcbiAgICByZXR1cm4ge1xuICAgICAgZW1pdChldmVudCwgZGF0YSkge1xuICAgICAgICBzZWxmLmVtaXQoZXZlbnQsIGRhdGEsIHsgd2Vic29ja2V0cyB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLypcbiAgICogQWxpYXMgZm9yIFNlcnZlci50b1xuICAgKi9cbiAgaW4oLi4uYXJncykge1xuICAgIHJldHVybiB0aGlzLnRvLmFwcGx5KG51bGwsIGFyZ3MpO1xuICB9XG59XG5cbi8qXG4gKiBBbHRlcm5hdGl2ZSBjb25zdHJ1Y3RvciB0byBzdXBwb3J0IG5hbWVzcGFjZXMgaW4gc29ja2V0LmlvXG4gKlxuICogaHR0cDovL3NvY2tldC5pby9kb2NzL3Jvb21zLWFuZC1uYW1lc3BhY2VzLyNjdXN0b20tbmFtZXNwYWNlc1xuICovXG5TZXJ2ZXIub2YgPSBmdW5jdGlvbiBvZih1cmwpIHtcbiAgcmV0dXJuIG5ldyBTZXJ2ZXIodXJsKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNlcnZlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2ZXIuanMiLCJpbXBvcnQgZGVsYXkgZnJvbSAnLi9oZWxwZXJzL2RlbGF5JztcbmltcG9ydCBFdmVudFRhcmdldCBmcm9tICcuL2V2ZW50LXRhcmdldCc7XG5pbXBvcnQgbmV0d29ya0JyaWRnZSBmcm9tICcuL25ldHdvcmstYnJpZGdlJztcbmltcG9ydCBDTE9TRV9DT0RFUyBmcm9tICcuL2hlbHBlcnMvY2xvc2UtY29kZXMnO1xuaW1wb3J0IGxvZyBmcm9tICcuL2hlbHBlcnMvbG9nZ2VyJztcbmltcG9ydCB7IGNyZWF0ZUV2ZW50LCBjcmVhdGVNZXNzYWdlRXZlbnQsIGNyZWF0ZUNsb3NlRXZlbnQgfSBmcm9tICcuL2V2ZW50LWZhY3RvcnknO1xuaW1wb3J0IHsgbm9ybWFsaXplUHJvdG9jb2wsIG5vcm1hbGl6ZVVybCB9IGZyb20gJy4vdXRpbHMvbm9ybWFsaXplJztcblxuLypcbiogVGhlIG1haW4gd2Vic29ja2V0IGNsYXNzIHdoaWNoIGlzIGRlc2lnbmVkIHRvIG1pbWljayB0aGUgbmF0aXZlIFdlYlNvY2tldCBjbGFzcyBhcyBjbG9zZVxuKiBhcyBwb3NzaWJsZS5cbipcbiogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dlYlNvY2tldFxuKi9cbmNsYXNzIFdlYlNvY2tldCBleHRlbmRzIEV2ZW50VGFyZ2V0IHtcblxuICBzdGF0aWMgQ09OTkVDVElORyA9IDA7XG4gIHN0YXRpYyBPUEVOID0gMTtcbiAgc3RhdGljIENMT1NJTkcgPSAyO1xuICBzdGF0aWMgQ0xPU0VEID0gMztcblxuICBjb25zdHJ1Y3Rvcih1cmwsIHByb3RvY29sID0gJycpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgaWYgKCF1cmwpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ZhaWxlZCB0byBjb25zdHJ1Y3QgXFwnV2ViU29ja2V0XFwnOiAxIGFyZ3VtZW50IHJlcXVpcmVkLCBidXQgb25seSAwIHByZXNlbnQuJyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCF1cmwuc3RhcnRzV2l0aCgnd3M6Ly8nKSAmJiAhdXJsLnN0YXJ0c1dpdGgoJ3dzczovLycpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBjb25zdHJ1Y3QgJ1dlYlNvY2tldCc6IFRoZSBVUkwgJyR7U3RyaW5nKHVybCl9JyBpcyBpbnZhbGlkLmApO1xuICAgIH1cblxuICAgIHRoaXMuYmluYXJ5VHlwZSA9ICdibG9iJztcbiAgICB0aGlzLnVybCA9IG5vcm1hbGl6ZVVybCh1cmwpO1xuICAgIHRoaXMucmVhZHlTdGF0ZSA9IFdlYlNvY2tldC5DT05ORUNUSU5HO1xuICAgIHRoaXMucHJvdG9jb2wgPSBub3JtYWxpemVQcm90b2NvbChwcm90b2NvbCk7XG5cbiAgICAvKlxuICAgICogSW4gb3JkZXIgdG8gY2FwdHVyZSB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gd2UgbmVlZCB0byBkZWZpbmUgY3VzdG9tIHNldHRlcnMuXG4gICAgKiBUbyBpbGx1c3RyYXRlOlxuICAgICogICBteVNvY2tldC5vbm9wZW4gPSBmdW5jdGlvbigpIHsgYWxlcnQodHJ1ZSkgfTtcbiAgICAqXG4gICAgKiBUaGUgb25seSB3YXkgdG8gY2FwdHVyZSB0aGF0IGZ1bmN0aW9uIGFuZCBob2xkIG9udG8gaXQgZm9yIGxhdGVyIGlzIHdpdGggdGhlXG4gICAgKiBiZWxvdyBjb2RlOlxuICAgICovXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xuICAgICAgb25vcGVuOiB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0KCkgeyByZXR1cm4gdGhpcy5saXN0ZW5lcnMub3BlbjsgfSxcbiAgICAgICAgc2V0KGxpc3RlbmVyKSB7XG4gICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdvcGVuJywgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgb25tZXNzYWdlOiB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0KCkgeyByZXR1cm4gdGhpcy5saXN0ZW5lcnMubWVzc2FnZTsgfSxcbiAgICAgICAgc2V0KGxpc3RlbmVyKSB7XG4gICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgb25jbG9zZToge1xuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGdldCgpIHsgcmV0dXJuIHRoaXMubGlzdGVuZXJzLmNsb3NlOyB9LFxuICAgICAgICBzZXQobGlzdGVuZXIpIHtcbiAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2Nsb3NlJywgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgb25lcnJvcjoge1xuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGdldCgpIHsgcmV0dXJuIHRoaXMubGlzdGVuZXJzLmVycm9yOyB9LFxuICAgICAgICBzZXQobGlzdGVuZXIpIHtcbiAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYmluYXJ5VHlwZToge1xuICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICBpZiAoWydibG9iJywgJ2FycmF5YnVmZmVyJ10uaW5kZXhPZih2YWx1ZSkgIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmJpbmFyeVR5cGUgPSB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYFRoZSBwcm92aWRlZCB2YWx1ZSAnJHt2YWx1ZS50b1N0cmluZygpfScgaXMgbm90IGEgdmFsaWQgZW51bSB2YWx1ZSBvZiB0eXBlIEJpbmFyeVR5cGVgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qXG4gICAgKiBUaGlzIGRlbGF5IGlzIG5lZWRlZCBzbyB0aGF0IHdlIGRvbnQgdHJpZ2dlciBhbiBldmVudCBiZWZvcmUgdGhlIGNhbGxiYWNrcyBoYXZlIGJlZW5cbiAgICAqIHNldHVwLiBGb3IgZXhhbXBsZTpcbiAgICAqXG4gICAgKiB2YXIgc29ja2V0ID0gbmV3IFdlYlNvY2tldCgnd3M6Ly9sb2NhbGhvc3QnKTtcbiAgICAqXG4gICAgKiAvLyBJZiB3ZSBkb250IGhhdmUgdGhlIGRlbGF5IHRoZW4gdGhlIGV2ZW50IHdvdWxkIGJlIHRyaWdnZXJlZCByaWdodCBoZXJlIGFuZCB0aGlzIGlzXG4gICAgKiAvLyBiZWZvcmUgdGhlIG9ub3BlbiBoYWQgYSBjaGFuY2UgdG8gcmVnaXN0ZXIgaXRzZWxmLlxuICAgICpcbiAgICAqIHNvY2tldC5vbm9wZW4gPSAoKSA9PiB7IC8vIHRoaXMgd291bGQgbmV2ZXIgYmUgY2FsbGVkIH07XG4gICAgKlxuICAgICogLy8gYW5kIHdpdGggdGhlIGRlbGF5IHRoZSBldmVudCBnZXRzIHRyaWdnZXJlZCBoZXJlIGFmdGVyIGFsbCBvZiB0aGUgY2FsbGJhY2tzIGhhdmUgYmVlblxuICAgICogLy8gcmVnaXN0ZXJlZCA6LSlcbiAgICAqL1xuICAgIGRlbGF5KGZ1bmN0aW9uIGRlbGF5Q2FsbGJhY2soKSB7XG4gICAgICBjb25zdCBzZXJ2ZXIgPSBuZXR3b3JrQnJpZGdlLmF0dGFjaFdlYlNvY2tldCh0aGlzLCB0aGlzLnVybCk7XG5cbiAgICAgIGlmIChzZXJ2ZXIpIHtcbiAgICAgICAgY29uc3QgeyBvcHRpb25zIH0gPSBzZXJ2ZXI7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMudmVyaWZ5Q2xpZW50ICYmIHR5cGVvZiBvcHRpb25zLnZlcmlmeUNsaWVudCA9PT0gJ2Z1bmN0aW9uJyAmJiAhb3B0aW9ucy52ZXJpZnlDbGllbnQoKSkge1xuICAgICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFdlYlNvY2tldC5DTE9TRUQ7XG5cbiAgICAgICAgICBsb2coXG4gICAgICAgICAgICAnZXJyb3InLFxuICAgICAgICAgICAgYFdlYlNvY2tldCBjb25uZWN0aW9uIHRvICcke3RoaXMudXJsfScgZmFpbGVkOiBIVFRQIEF1dGhlbnRpY2F0aW9uIGZhaWxlZDsgbm8gdmFsaWQgY3JlZGVudGlhbHMgYXZhaWxhYmxlYFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBuZXR3b3JrQnJpZGdlLnJlbW92ZVdlYlNvY2tldCh0aGlzLCB0aGlzLnVybCk7XG4gICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGNyZWF0ZUV2ZW50KHsgdHlwZTogJ2Vycm9yJywgdGFyZ2V0OiB0aGlzIH0pKTtcbiAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoY3JlYXRlQ2xvc2VFdmVudCh7IHR5cGU6ICdjbG9zZScsIHRhcmdldDogdGhpcywgY29kZTogQ0xPU0VfQ09ERVMuQ0xPU0VfTk9STUFMIH0pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBXZWJTb2NrZXQuT1BFTjtcbiAgICAgICAgICBzZXJ2ZXIuZGlzcGF0Y2hFdmVudChjcmVhdGVFdmVudCh7IHR5cGU6ICdjb25uZWN0aW9uJyB9KSwgc2VydmVyLCB0aGlzKTtcbiAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoY3JlYXRlRXZlbnQoeyB0eXBlOiAnb3BlbicsIHRhcmdldDogdGhpcyB9KSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFdlYlNvY2tldC5DTE9TRUQ7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChjcmVhdGVFdmVudCh7IHR5cGU6ICdlcnJvcicsIHRhcmdldDogdGhpcyB9KSk7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChjcmVhdGVDbG9zZUV2ZW50KHsgdHlwZTogJ2Nsb3NlJywgdGFyZ2V0OiB0aGlzLCBjb2RlOiBDTE9TRV9DT0RFUy5DTE9TRV9OT1JNQUwgfSkpO1xuXG4gICAgICAgIGxvZygnZXJyb3InLCBgV2ViU29ja2V0IGNvbm5lY3Rpb24gdG8gJyR7dGhpcy51cmx9JyBmYWlsZWRgKTtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgfVxuXG4gIC8qXG4gICogVHJhbnNtaXRzIGRhdGEgdG8gdGhlIHNlcnZlciBvdmVyIHRoZSBXZWJTb2NrZXQgY29ubmVjdGlvbi5cbiAgKlxuICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XZWJTb2NrZXQjc2VuZCgpXG4gICovXG4gIHNlbmQoZGF0YSkge1xuICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5DTE9TSU5HIHx8IHRoaXMucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0LkNMT1NFRCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZWJTb2NrZXQgaXMgYWxyZWFkeSBpbiBDTE9TSU5HIG9yIENMT1NFRCBzdGF0ZScpO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2VFdmVudCA9IGNyZWF0ZU1lc3NhZ2VFdmVudCh7XG4gICAgICB0eXBlOiAnbWVzc2FnZScsXG4gICAgICBvcmlnaW46IHRoaXMudXJsLFxuICAgICAgZGF0YVxuICAgIH0pO1xuXG4gICAgY29uc3Qgc2VydmVyID0gbmV0d29ya0JyaWRnZS5zZXJ2ZXJMb29rdXAodGhpcy51cmwpO1xuXG4gICAgaWYgKHNlcnZlcikge1xuICAgICAgc2VydmVyLmRpc3BhdGNoRXZlbnQobWVzc2FnZUV2ZW50LCBkYXRhKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAqIENsb3NlcyB0aGUgV2ViU29ja2V0IGNvbm5lY3Rpb24gb3IgY29ubmVjdGlvbiBhdHRlbXB0LCBpZiBhbnkuXG4gICogSWYgdGhlIGNvbm5lY3Rpb24gaXMgYWxyZWFkeSBDTE9TRUQsIHRoaXMgbWV0aG9kIGRvZXMgbm90aGluZy5cbiAgKlxuICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XZWJTb2NrZXQjY2xvc2UoKVxuICAqL1xuICBjbG9zZShjb2RlLCByZWFzb24pIHtcbiAgICBpZiAoTnVtYmVyKGNvZGUpID09PSBOYU4pIHtcbiAgICAgIGNvZGUgPSAwO1xuICAgIH1cblxuICAgIGlmIChjb2RlICE9PSAxMDAwICYmIChjb2RlIDwgMzAwMCB8fCBjb2RlID4gNDk5OSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGV4ZWN1dGUgJ2Nsb3NlJyBvbiAnV2ViU29ja2V0JzogVGhlIGNvZGUgbXVzdCBiZSBlaXRoZXIgMTAwMCwgb3IgYmV0d2VlbiAzMDAwIGFuZCA0OTk5LiAke2NvZGV9IGlzIG5laXRoZXJgKTsgLy8gU2hvdWxkIGJlIERPTUV4Y2VwdGlvblxuICAgIH1cblxuICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgIT09IFdlYlNvY2tldC5PUEVOKSB7IHJldHVybiB1bmRlZmluZWQ7IH1cblxuICAgIGNvbnN0IHNlcnZlciA9IG5ldHdvcmtCcmlkZ2Uuc2VydmVyTG9va3VwKHRoaXMudXJsKTtcbiAgICBjb25zdCBjbG9zZUV2ZW50ID0gY3JlYXRlQ2xvc2VFdmVudCh7XG4gICAgICB0eXBlOiAnY2xvc2UnLFxuICAgICAgdGFyZ2V0OiB0aGlzLFxuICAgICAgY29kZTogQ0xPU0VfQ09ERVMuQ0xPU0VfTk9STUFMXG4gICAgfSk7XG5cbiAgICBuZXR3b3JrQnJpZGdlLnJlbW92ZVdlYlNvY2tldCh0aGlzLCB0aGlzLnVybCk7XG5cbiAgICB0aGlzLnJlYWR5U3RhdGUgPSBXZWJTb2NrZXQuQ0xPU0VEO1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChjbG9zZUV2ZW50KTtcblxuICAgIGlmIChzZXJ2ZXIpIHtcbiAgICAgIHNlcnZlci5kaXNwYXRjaEV2ZW50KGNsb3NlRXZlbnQsIHNlcnZlcik7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiAnZnVuY3Rpb24gV2ViU29ja2V0KCkgeyBbbmF0aXZlIGNvZGVdIH0nO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuICdbb2JqZWN0IFdlYlNvY2tldF0nO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFdlYlNvY2tldDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy93ZWJzb2NrZXQuanMiLCIvKlxuKiBUaGlzIGRlbGF5IGFsbG93cyB0aGUgdGhyZWFkIHRvIGZpbmlzaCBhc3NpZ25pbmcgaXRzIG9uKiBtZXRob2RzXG4qIGJlZm9yZSBpbnZva2luZyB0aGUgZGVsYXkgY2FsbGJhY2suIFRoaXMgaXMgcHVyZWx5IGEgdGltaW5nIGhhY2suXG4qIGh0dHA6Ly9nZWVrYWJ5dGUuYmxvZ3Nwb3QuY29tLzIwMTQvMDEvamF2YXNjcmlwdC1lZmZlY3Qtb2Ytc2V0dGluZy1zZXR0aW1lb3V0Lmh0bWxcbipcbiogQHBhcmFtIHtjYWxsYmFjazogZnVuY3Rpb259IHRoZSBjYWxsYmFjayB3aGljaCB3aWxsIGJlIGludm9rZWQgYWZ0ZXIgdGhlIHRpbWVvdXRcbiogQHBhcm1hIHtjb250ZXh0OiBvYmplY3R9IHRoZSBjb250ZXh0IGluIHdoaWNoIHRvIGludm9rZSB0aGUgZnVuY3Rpb25cbiovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWxheShjYWxsYmFjaywgY29udGV4dCkge1xuICBzZXRUaW1lb3V0KHRpbWVvdXRDb250ZXh0ID0+IGNhbGxiYWNrLmNhbGwodGltZW91dENvbnRleHQpLCA0LCBjb250ZXh0KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9oZWxwZXJzL2RlbGF5LmpzIiwiaW1wb3J0IHsgcmVqZWN0LCBmaWx0ZXIgfSBmcm9tICcuL2hlbHBlcnMvYXJyYXktaGVscGVycyc7XG5cbi8qXG4qIEV2ZW50VGFyZ2V0IGlzIGFuIGludGVyZmFjZSBpbXBsZW1lbnRlZCBieSBvYmplY3RzIHRoYXQgY2FuXG4qIHJlY2VpdmUgZXZlbnRzIGFuZCBtYXkgaGF2ZSBsaXN0ZW5lcnMgZm9yIHRoZW0uXG4qXG4qIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FdmVudFRhcmdldFxuKi9cbmNsYXNzIEV2ZW50VGFyZ2V0IHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmxpc3RlbmVycyA9IHt9O1xuICB9XG5cbiAgLypcbiAgKiBUaWVzIGEgbGlzdGVuZXIgZnVuY3Rpb24gdG8gYSBldmVudCB0eXBlIHdoaWNoIGNhbiBsYXRlciBiZSBpbnZva2VkIHZpYSB0aGVcbiAgKiBkaXNwYXRjaEV2ZW50IG1ldGhvZC5cbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gdGhlIHR5cGUgb2YgZXZlbnQgKGllOiAnb3BlbicsICdtZXNzYWdlJywgZXRjLilcbiAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lciAtIHRoZSBjYWxsYmFjayBmdW5jdGlvbiB0byBpbnZva2Ugd2hlbmV2ZXIgYSBldmVudCBpcyBkaXNwYXRjaGVkIG1hdGNoaW5nIHRoZSBnaXZlbiB0eXBlXG4gICogQHBhcmFtIHtib29sZWFufSB1c2VDYXB0dXJlIC0gTi9BIFRPRE86IGltcGxlbWVudCB1c2VDYXB0dXJlIGZ1bmN0aW9uYWxpdHlcbiAgKi9cbiAgYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lciAvKiAsIHVzZUNhcHR1cmUgKi8pIHtcbiAgICBpZiAodHlwZW9mIGxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5saXN0ZW5lcnNbdHlwZV0pKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdID0gW107XG4gICAgICB9XG5cbiAgICAgIC8vIE9ubHkgYWRkIHRoZSBzYW1lIGZ1bmN0aW9uIG9uY2VcbiAgICAgIGlmIChmaWx0ZXIodGhpcy5saXN0ZW5lcnNbdHlwZV0sIGl0ZW0gPT4gaXRlbSA9PT0gbGlzdGVuZXIpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKlxuICAqIFJlbW92ZXMgdGhlIGxpc3RlbmVyIHNvIGl0IHdpbGwgbm8gbG9uZ2VyIGJlIGludm9rZWQgdmlhIHRoZSBkaXNwYXRjaEV2ZW50IG1ldGhvZC5cbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gdGhlIHR5cGUgb2YgZXZlbnQgKGllOiAnb3BlbicsICdtZXNzYWdlJywgZXRjLilcbiAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lciAtIHRoZSBjYWxsYmFjayBmdW5jdGlvbiB0byBpbnZva2Ugd2hlbmV2ZXIgYSBldmVudCBpcyBkaXNwYXRjaGVkIG1hdGNoaW5nIHRoZSBnaXZlbiB0eXBlXG4gICogQHBhcmFtIHtib29sZWFufSB1c2VDYXB0dXJlIC0gTi9BIFRPRE86IGltcGxlbWVudCB1c2VDYXB0dXJlIGZ1bmN0aW9uYWxpdHlcbiAgKi9cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCByZW1vdmluZ0xpc3RlbmVyIC8qICwgdXNlQ2FwdHVyZSAqLykge1xuICAgIGNvbnN0IGFycmF5T2ZMaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc1t0eXBlXTtcbiAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXSA9IHJlamVjdChhcnJheU9mTGlzdGVuZXJzLCBsaXN0ZW5lciA9PiBsaXN0ZW5lciA9PT0gcmVtb3ZpbmdMaXN0ZW5lcik7XG4gIH1cblxuICAvKlxuICAqIEludm9rZXMgYWxsIGxpc3RlbmVyIGZ1bmN0aW9ucyB0aGF0IGFyZSBsaXN0ZW5pbmcgdG8gdGhlIGdpdmVuIGV2ZW50LnR5cGUgcHJvcGVydHkuIEVhY2hcbiAgKiBsaXN0ZW5lciB3aWxsIGJlIHBhc3NlZCB0aGUgZXZlbnQgYXMgdGhlIGZpcnN0IGFyZ3VtZW50LlxuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IGV2ZW50IC0gZXZlbnQgb2JqZWN0IHdoaWNoIHdpbGwgYmUgcGFzc2VkIHRvIGFsbCBsaXN0ZW5lcnMgb2YgdGhlIGV2ZW50LnR5cGUgcHJvcGVydHlcbiAgKi9cbiAgZGlzcGF0Y2hFdmVudChldmVudCwgLi4uY3VzdG9tQXJndW1lbnRzKSB7XG4gICAgY29uc3QgZXZlbnROYW1lID0gZXZlbnQudHlwZTtcbiAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdO1xuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGxpc3RlbmVycykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBsaXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIpID0+IHtcbiAgICAgIGlmIChjdXN0b21Bcmd1bWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBjdXN0b21Bcmd1bWVudHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGlzdGVuZXIuY2FsbCh0aGlzLCBldmVudCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFdmVudFRhcmdldDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ldmVudC10YXJnZXQuanMiLCJleHBvcnQgZnVuY3Rpb24gcmVqZWN0KGFycmF5LCBjYWxsYmFjaykge1xuICBjb25zdCByZXN1bHRzID0gW107XG4gIGFycmF5LmZvckVhY2goKGl0ZW1JbkFycmF5KSA9PiB7XG4gICAgaWYgKCFjYWxsYmFjayhpdGVtSW5BcnJheSkpIHtcbiAgICAgIHJlc3VsdHMucHVzaChpdGVtSW5BcnJheSk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcmVzdWx0cztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlcihhcnJheSwgY2FsbGJhY2spIHtcbiAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICBhcnJheS5mb3JFYWNoKChpdGVtSW5BcnJheSkgPT4ge1xuICAgIGlmIChjYWxsYmFjayhpdGVtSW5BcnJheSkpIHtcbiAgICAgIHJlc3VsdHMucHVzaChpdGVtSW5BcnJheSk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcmVzdWx0cztcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9oZWxwZXJzL2FycmF5LWhlbHBlcnMuanMiLCJpbXBvcnQgeyByZWplY3QgfSBmcm9tICcuL2hlbHBlcnMvYXJyYXktaGVscGVycyc7XG5cbi8qXG4qIFRoZSBuZXR3b3JrIGJyaWRnZSBpcyBhIHdheSBmb3IgdGhlIG1vY2sgd2Vic29ja2V0IG9iamVjdCB0byAnY29tbXVuaWNhdGUnIHdpdGhcbiogYWxsIGF2YWlsYWJsZSBzZXJ2ZXJzLiBUaGlzIGlzIGEgc2luZ2xldG9uIG9iamVjdCBzbyBpdCBpcyBpbXBvcnRhbnQgdGhhdCB5b3VcbiogY2xlYW4gdXAgdXJsTWFwIHdoZW5ldmVyIHlvdSBhcmUgZmluaXNoZWQuXG4qL1xuY2xhc3MgTmV0d29ya0JyaWRnZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudXJsTWFwID0ge307XG4gIH1cblxuICAvKlxuICAqIEF0dGFjaGVzIGEgd2Vic29ja2V0IG9iamVjdCB0byB0aGUgdXJsTWFwIGhhc2ggc28gdGhhdCBpdCBjYW4gZmluZCB0aGUgc2VydmVyXG4gICogaXQgaXMgY29ubmVjdGVkIHRvIGFuZCB0aGUgc2VydmVyIGluIHR1cm4gY2FuIGZpbmQgaXQuXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gd2Vic29ja2V0IC0gd2Vic29ja2V0IG9iamVjdCB0byBhZGQgdG8gdGhlIHVybE1hcCBoYXNoXG4gICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAqL1xuICBhdHRhY2hXZWJTb2NrZXQod2Vic29ja2V0LCB1cmwpIHtcbiAgICBjb25zdCBjb25uZWN0aW9uTG9va3VwID0gdGhpcy51cmxNYXBbdXJsXTtcblxuICAgIGlmIChjb25uZWN0aW9uTG9va3VwICYmXG4gICAgICAgIGNvbm5lY3Rpb25Mb29rdXAuc2VydmVyICYmXG4gICAgICAgIGNvbm5lY3Rpb25Mb29rdXAud2Vic29ja2V0cy5pbmRleE9mKHdlYnNvY2tldCkgPT09IC0xKSB7XG4gICAgICBjb25uZWN0aW9uTG9va3VwLndlYnNvY2tldHMucHVzaCh3ZWJzb2NrZXQpO1xuICAgICAgcmV0dXJuIGNvbm5lY3Rpb25Mb29rdXAuc2VydmVyO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICogQXR0YWNoZXMgYSB3ZWJzb2NrZXQgdG8gYSByb29tXG4gICovXG4gIGFkZE1lbWJlcnNoaXBUb1Jvb20od2Vic29ja2V0LCByb29tKSB7XG4gICAgY29uc3QgY29ubmVjdGlvbkxvb2t1cCA9IHRoaXMudXJsTWFwW3dlYnNvY2tldC51cmxdO1xuXG4gICAgaWYgKGNvbm5lY3Rpb25Mb29rdXAgJiZcbiAgICAgICAgY29ubmVjdGlvbkxvb2t1cC5zZXJ2ZXIgJiZcbiAgICAgICAgY29ubmVjdGlvbkxvb2t1cC53ZWJzb2NrZXRzLmluZGV4T2Yod2Vic29ja2V0KSAhPT0gLTEpIHtcbiAgICAgIGlmICghY29ubmVjdGlvbkxvb2t1cC5yb29tTWVtYmVyc2hpcHNbcm9vbV0pIHtcbiAgICAgICAgY29ubmVjdGlvbkxvb2t1cC5yb29tTWVtYmVyc2hpcHNbcm9vbV0gPSBbXTtcbiAgICAgIH1cblxuICAgICAgY29ubmVjdGlvbkxvb2t1cC5yb29tTWVtYmVyc2hpcHNbcm9vbV0ucHVzaCh3ZWJzb2NrZXQpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICogQXR0YWNoZXMgYSBzZXJ2ZXIgb2JqZWN0IHRvIHRoZSB1cmxNYXAgaGFzaCBzbyB0aGF0IGl0IGNhbiBmaW5kIGEgd2Vic29ja2V0c1xuICAqIHdoaWNoIGFyZSBjb25uZWN0ZWQgdG8gaXQgYW5kIHNvIHRoYXQgd2Vic29ja2V0cyBjYW4gaW4gdHVybiBjYW4gZmluZCBpdC5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzZXJ2ZXIgLSBzZXJ2ZXIgb2JqZWN0IHRvIGFkZCB0byB0aGUgdXJsTWFwIGhhc2hcbiAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICovXG4gIGF0dGFjaFNlcnZlcihzZXJ2ZXIsIHVybCkge1xuICAgIGNvbnN0IGNvbm5lY3Rpb25Mb29rdXAgPSB0aGlzLnVybE1hcFt1cmxdO1xuXG4gICAgaWYgKCFjb25uZWN0aW9uTG9va3VwKSB7XG4gICAgICB0aGlzLnVybE1hcFt1cmxdID0ge1xuICAgICAgICBzZXJ2ZXIsXG4gICAgICAgIHdlYnNvY2tldHM6IFtdLFxuICAgICAgICByb29tTWVtYmVyc2hpcHM6IHt9XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gc2VydmVyO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICogRmluZHMgdGhlIHNlcnZlciB3aGljaCBpcyAncnVubmluZycgb24gdGhlIGdpdmVuIHVybC5cbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSB0aGUgdXJsIHRvIHVzZSB0byBmaW5kIHdoaWNoIHNlcnZlciBpcyBydW5uaW5nIG9uIGl0XG4gICovXG4gIHNlcnZlckxvb2t1cCh1cmwpIHtcbiAgICBjb25zdCBjb25uZWN0aW9uTG9va3VwID0gdGhpcy51cmxNYXBbdXJsXTtcblxuICAgIGlmIChjb25uZWN0aW9uTG9va3VwKSB7XG4gICAgICByZXR1cm4gY29ubmVjdGlvbkxvb2t1cC5zZXJ2ZXI7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgKiBGaW5kcyBhbGwgd2Vic29ja2V0cyB3aGljaCBpcyAnbGlzdGVuaW5nJyBvbiB0aGUgZ2l2ZW4gdXJsLlxuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHVybCAtIHRoZSB1cmwgdG8gdXNlIHRvIGZpbmQgYWxsIHdlYnNvY2tldHMgd2hpY2ggYXJlIGFzc29jaWF0ZWQgd2l0aCBpdFxuICAqIEBwYXJhbSB7c3RyaW5nfSByb29tIC0gaWYgYSByb29tIGlzIHByb3ZpZGVkLCB3aWxsIG9ubHkgcmV0dXJuIHNvY2tldHMgaW4gdGhpcyByb29tXG4gICogQHBhcmFtIHtjbGFzc30gYnJvYWRjYXN0ZXIgLSBzb2NrZXQgdGhhdCBpcyBicm9hZGNhc3RpbmcgYW5kIGlzIHRvIGJlIGV4Y2x1ZGVkIGZyb20gdGhlIGxvb2t1cFxuICAqL1xuICB3ZWJzb2NrZXRzTG9va3VwKHVybCwgcm9vbSwgYnJvYWRjYXN0ZXIpIHtcbiAgICBsZXQgd2Vic29ja2V0cztcbiAgICBjb25zdCBjb25uZWN0aW9uTG9va3VwID0gdGhpcy51cmxNYXBbdXJsXTtcblxuICAgIHdlYnNvY2tldHMgPSBjb25uZWN0aW9uTG9va3VwID8gY29ubmVjdGlvbkxvb2t1cC53ZWJzb2NrZXRzIDogW107XG5cbiAgICBpZiAocm9vbSkge1xuICAgICAgY29uc3QgbWVtYmVycyA9IGNvbm5lY3Rpb25Mb29rdXAucm9vbU1lbWJlcnNoaXBzW3Jvb21dO1xuICAgICAgd2Vic29ja2V0cyA9IG1lbWJlcnMgfHwgW107XG4gICAgfVxuXG4gICAgcmV0dXJuIGJyb2FkY2FzdGVyID8gd2Vic29ja2V0cy5maWx0ZXIod2Vic29ja2V0ID0+IHdlYnNvY2tldCAhPT0gYnJvYWRjYXN0ZXIpIDogd2Vic29ja2V0cztcbiAgfVxuXG4gIC8qXG4gICogUmVtb3ZlcyB0aGUgZW50cnkgYXNzb2NpYXRlZCB3aXRoIHRoZSB1cmwuXG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICovXG4gIHJlbW92ZVNlcnZlcih1cmwpIHtcbiAgICBkZWxldGUgdGhpcy51cmxNYXBbdXJsXTtcbiAgfVxuXG4gIC8qXG4gICogUmVtb3ZlcyB0aGUgaW5kaXZpZHVhbCB3ZWJzb2NrZXQgZnJvbSB0aGUgbWFwIG9mIGFzc29jaWF0ZWQgd2Vic29ja2V0cy5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSB3ZWJzb2NrZXQgLSB3ZWJzb2NrZXQgb2JqZWN0IHRvIHJlbW92ZSBmcm9tIHRoZSB1cmwgbWFwXG4gICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAqL1xuICByZW1vdmVXZWJTb2NrZXQod2Vic29ja2V0LCB1cmwpIHtcbiAgICBjb25zdCBjb25uZWN0aW9uTG9va3VwID0gdGhpcy51cmxNYXBbdXJsXTtcblxuICAgIGlmIChjb25uZWN0aW9uTG9va3VwKSB7XG4gICAgICBjb25uZWN0aW9uTG9va3VwLndlYnNvY2tldHMgPSByZWplY3QoY29ubmVjdGlvbkxvb2t1cC53ZWJzb2NrZXRzLCBzb2NrZXQgPT4gc29ja2V0ID09PSB3ZWJzb2NrZXQpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICogUmVtb3ZlcyBhIHdlYnNvY2tldCBmcm9tIGEgcm9vbVxuICAqL1xuICByZW1vdmVNZW1iZXJzaGlwRnJvbVJvb20od2Vic29ja2V0LCByb29tKSB7XG4gICAgY29uc3QgY29ubmVjdGlvbkxvb2t1cCA9IHRoaXMudXJsTWFwW3dlYnNvY2tldC51cmxdO1xuICAgIGNvbnN0IG1lbWJlcnNoaXBzID0gY29ubmVjdGlvbkxvb2t1cC5yb29tTWVtYmVyc2hpcHNbcm9vbV07XG5cbiAgICBpZiAoY29ubmVjdGlvbkxvb2t1cCAmJiBtZW1iZXJzaGlwcyAhPT0gbnVsbCkge1xuICAgICAgY29ubmVjdGlvbkxvb2t1cC5yb29tTWVtYmVyc2hpcHNbcm9vbV0gPSByZWplY3QobWVtYmVyc2hpcHMsIHNvY2tldCA9PiBzb2NrZXQgPT09IHdlYnNvY2tldCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBOZXR3b3JrQnJpZGdlKCk7IC8vIE5vdGU6IHRoaXMgaXMgYSBzaW5nbGV0b25cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9uZXR3b3JrLWJyaWRnZS5qcyIsIi8qXG4qIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DbG9zZUV2ZW50XG4qL1xuY29uc3QgY29kZXMgPSB7XG4gIENMT1NFX05PUk1BTDogMTAwMCxcbiAgQ0xPU0VfR09JTkdfQVdBWTogMTAwMSxcbiAgQ0xPU0VfUFJPVE9DT0xfRVJST1I6IDEwMDIsXG4gIENMT1NFX1VOU1VQUE9SVEVEOiAxMDAzLFxuICBDTE9TRV9OT19TVEFUVVM6IDEwMDUsXG4gIENMT1NFX0FCTk9STUFMOiAxMDA2LFxuICBDTE9TRV9VTlNVUFBPUlRFRF9EQVRBOiAxMDA3LFxuICBDTE9TRV9UT09fTEFSR0U6IDEwMDksXG4gIENMT1NFX01JU1NJTkdfRVhURU5TSU9OOiAxMDEwLFxuICBDTE9TRV9JTlRFUk5BTF9FUlJPUjogMTAxMSxcbiAgQ0xPU0VfU0VSVklDRV9SRVNUQVJUOiAxMDEyLFxuICBDTE9TRV9UUllfQUdBSU5fTEFURVI6IDEwMTMsXG4gIENMT1NFX1RMU19IQU5EU0hBS0U6IDEwMTVcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvZGVzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2hlbHBlcnMvY2xvc2UtY29kZXMuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2cobWV0aG9kLCBtZXNzYWdlKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbiAgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Rlc3QnKSB7XG4gICAgY29uc29sZVttZXRob2RdLmNhbGwobnVsbCwgbWVzc2FnZSk7XG4gIH1cbiAgLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaGVscGVycy9sb2dnZXIuanMiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Byb2Nlc3MvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgRXZlbnQgZnJvbSAnLi9oZWxwZXJzL2V2ZW50JztcbmltcG9ydCBNZXNzYWdlRXZlbnQgZnJvbSAnLi9oZWxwZXJzL21lc3NhZ2UtZXZlbnQnO1xuaW1wb3J0IENsb3NlRXZlbnQgZnJvbSAnLi9oZWxwZXJzL2Nsb3NlLWV2ZW50JztcblxuLypcbiogQ3JlYXRlcyBhbiBFdmVudCBvYmplY3QgYW5kIGV4dGVuZHMgaXQgdG8gYWxsb3cgZnVsbCBtb2RpZmljYXRpb24gb2ZcbiogaXRzIHByb3BlcnRpZXMuXG4qXG4qIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgLSB3aXRoaW4gY29uZmlnIHlvdSB3aWxsIG5lZWQgdG8gcGFzcyB0eXBlIGFuZCBvcHRpb25hbGx5IHRhcmdldFxuKi9cbmZ1bmN0aW9uIGNyZWF0ZUV2ZW50KGNvbmZpZykge1xuICBjb25zdCB7IHR5cGUsIHRhcmdldCB9ID0gY29uZmlnO1xuICBjb25zdCBldmVudE9iamVjdCA9IG5ldyBFdmVudCh0eXBlKTtcblxuICBpZiAodGFyZ2V0KSB7XG4gICAgZXZlbnRPYmplY3QudGFyZ2V0ID0gdGFyZ2V0O1xuICAgIGV2ZW50T2JqZWN0LnNyY0VsZW1lbnQgPSB0YXJnZXQ7XG4gICAgZXZlbnRPYmplY3QuY3VycmVudFRhcmdldCA9IHRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBldmVudE9iamVjdDtcbn1cblxuLypcbiogQ3JlYXRlcyBhIE1lc3NhZ2VFdmVudCBvYmplY3QgYW5kIGV4dGVuZHMgaXQgdG8gYWxsb3cgZnVsbCBtb2RpZmljYXRpb24gb2ZcbiogaXRzIHByb3BlcnRpZXMuXG4qXG4qIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgLSB3aXRoaW4gY29uZmlnOiB0eXBlLCBvcmlnaW4sIGRhdGEgYW5kIG9wdGlvbmFsbHkgdGFyZ2V0XG4qL1xuZnVuY3Rpb24gY3JlYXRlTWVzc2FnZUV2ZW50KGNvbmZpZykge1xuICBjb25zdCB7IHR5cGUsIG9yaWdpbiwgZGF0YSwgdGFyZ2V0IH0gPSBjb25maWc7XG4gIGNvbnN0IG1lc3NhZ2VFdmVudCA9IG5ldyBNZXNzYWdlRXZlbnQodHlwZSwge1xuICAgIGRhdGEsXG4gICAgb3JpZ2luXG4gIH0pO1xuXG4gIGlmICh0YXJnZXQpIHtcbiAgICBtZXNzYWdlRXZlbnQudGFyZ2V0ID0gdGFyZ2V0O1xuICAgIG1lc3NhZ2VFdmVudC5zcmNFbGVtZW50ID0gdGFyZ2V0O1xuICAgIG1lc3NhZ2VFdmVudC5jdXJyZW50VGFyZ2V0ID0gdGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lc3NhZ2VFdmVudDtcbn1cblxuLypcbiogQ3JlYXRlcyBhIENsb3NlRXZlbnQgb2JqZWN0IGFuZCBleHRlbmRzIGl0IHRvIGFsbG93IGZ1bGwgbW9kaWZpY2F0aW9uIG9mXG4qIGl0cyBwcm9wZXJ0aWVzLlxuKlxuKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIC0gd2l0aGluIGNvbmZpZzogdHlwZSBhbmQgb3B0aW9uYWxseSB0YXJnZXQsIGNvZGUsIGFuZCByZWFzb25cbiovXG5mdW5jdGlvbiBjcmVhdGVDbG9zZUV2ZW50KGNvbmZpZykge1xuICBjb25zdCB7IGNvZGUsIHJlYXNvbiwgdHlwZSwgdGFyZ2V0IH0gPSBjb25maWc7XG4gIGxldCB7IHdhc0NsZWFuIH0gPSBjb25maWc7XG5cbiAgaWYgKCF3YXNDbGVhbikge1xuICAgIHdhc0NsZWFuID0gKGNvZGUgPT09IDEwMDApO1xuICB9XG5cbiAgY29uc3QgY2xvc2VFdmVudCA9IG5ldyBDbG9zZUV2ZW50KHR5cGUsIHtcbiAgICBjb2RlLFxuICAgIHJlYXNvbixcbiAgICB3YXNDbGVhblxuICB9KTtcblxuICBpZiAodGFyZ2V0KSB7XG4gICAgY2xvc2VFdmVudC50YXJnZXQgPSB0YXJnZXQ7XG4gICAgY2xvc2VFdmVudC5zcmNFbGVtZW50ID0gdGFyZ2V0O1xuICAgIGNsb3NlRXZlbnQuY3VycmVudFRhcmdldCA9IHRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBjbG9zZUV2ZW50O1xufVxuXG5leHBvcnQge1xuICBjcmVhdGVFdmVudCxcbiAgY3JlYXRlTWVzc2FnZUV2ZW50LFxuICBjcmVhdGVDbG9zZUV2ZW50XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2V2ZW50LWZhY3RvcnkuanMiLCJpbXBvcnQgRXZlbnRQcm90b3R5cGUgZnJvbSAnLi9ldmVudC1wcm90b3R5cGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudCBleHRlbmRzIEV2ZW50UHJvdG90eXBlIHtcbiAgY29uc3RydWN0b3IodHlwZSwgZXZlbnRJbml0Q29uZmlnID0ge30pIHtcbiAgICBzdXBlcigpO1xuXG4gICAgaWYgKCF0eXBlKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGYWlsZWQgdG8gY29uc3RydWN0IFxcJ0V2ZW50XFwnOiAxIGFyZ3VtZW50IHJlcXVpcmVkLCBidXQgb25seSAwIHByZXNlbnQuJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBldmVudEluaXRDb25maWcgIT09ICdvYmplY3QnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGYWlsZWQgdG8gY29uc3RydWN0IFxcJ0V2ZW50XFwnOiBwYXJhbWV0ZXIgMiAoXFwnZXZlbnRJbml0RGljdFxcJykgaXMgbm90IGFuIG9iamVjdCcpO1xuICAgIH1cblxuICAgIGNvbnN0IHsgYnViYmxlcywgY2FuY2VsYWJsZSB9ID0gZXZlbnRJbml0Q29uZmlnO1xuXG4gICAgdGhpcy50eXBlID0gU3RyaW5nKHR5cGUpO1xuICAgIHRoaXMudGltZVN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLnRhcmdldCA9IG51bGw7XG4gICAgdGhpcy5zcmNFbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLnJldHVyblZhbHVlID0gdHJ1ZTtcbiAgICB0aGlzLmlzVHJ1c3RlZCA9IGZhbHNlO1xuICAgIHRoaXMuZXZlbnRQaGFzZSA9IDA7XG4gICAgdGhpcy5kZWZhdWx0UHJldmVudGVkID0gZmFsc2U7XG4gICAgdGhpcy5jdXJyZW50VGFyZ2V0ID0gbnVsbDtcbiAgICB0aGlzLmNhbmNlbGFibGUgPSBjYW5jZWxhYmxlID8gQm9vbGVhbihjYW5jZWxhYmxlKSA6IGZhbHNlO1xuICAgIHRoaXMuY2FubmNlbEJ1YmJsZSA9IGZhbHNlO1xuICAgIHRoaXMuYnViYmxlcyA9IGJ1YmJsZXMgPyBCb29sZWFuKGJ1YmJsZXMpIDogZmFsc2U7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9oZWxwZXJzL2V2ZW50LmpzIiwiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudFByb3RvdHlwZSB7XG4gIC8vIE5vb3BzXG4gIHN0b3BQcm9wYWdhdGlvbigpIHt9XG4gIHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpIHt9XG5cbiAgLy8gaWYgbm8gYXJndW1lbnRzIGFyZSBwYXNzZWQgdGhlbiB0aGUgdHlwZSBpcyBzZXQgdG8gXCJ1bmRlZmluZWRcIiBvblxuICAvLyBjaHJvbWUgYW5kIHNhZmFyaS5cbiAgaW5pdEV2ZW50KHR5cGUgPSAndW5kZWZpbmVkJywgYnViYmxlcyA9IGZhbHNlLCBjYW5jZWxhYmxlID0gZmFsc2UpIHtcbiAgICB0aGlzLnR5cGUgPSBTdHJpbmcodHlwZSk7XG4gICAgdGhpcy5idWJibGVzID0gQm9vbGVhbihidWJibGVzKTtcbiAgICB0aGlzLmNhbmNlbGFibGUgPSBCb29sZWFuKGNhbmNlbGFibGUpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaGVscGVycy9ldmVudC1wcm90b3R5cGUuanMiLCJpbXBvcnQgRXZlbnRQcm90b3R5cGUgZnJvbSAnLi9ldmVudC1wcm90b3R5cGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXNzYWdlRXZlbnQgZXh0ZW5kcyBFdmVudFByb3RvdHlwZSB7XG4gIGNvbnN0cnVjdG9yKHR5cGUsIGV2ZW50SW5pdENvbmZpZyA9IHt9KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGlmICghdHlwZSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRmFpbGVkIHRvIGNvbnN0cnVjdCBcXCdNZXNzYWdlRXZlbnRcXCc6IDEgYXJndW1lbnQgcmVxdWlyZWQsIGJ1dCBvbmx5IDAgcHJlc2VudC4nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGV2ZW50SW5pdENvbmZpZyAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ZhaWxlZCB0byBjb25zdHJ1Y3QgXFwnTWVzc2FnZUV2ZW50XFwnOiBwYXJhbWV0ZXIgMiAoXFwnZXZlbnRJbml0RGljdFxcJykgaXMgbm90IGFuIG9iamVjdCcpO1xuICAgIH1cblxuICAgIGNvbnN0IHtcbiAgICAgIGJ1YmJsZXMsXG4gICAgICBjYW5jZWxhYmxlLFxuICAgICAgZGF0YSxcbiAgICAgIG9yaWdpbixcbiAgICAgIGxhc3RFdmVudElkLFxuICAgICAgcG9ydHNcbiAgICB9ID0gZXZlbnRJbml0Q29uZmlnO1xuXG4gICAgdGhpcy50eXBlID0gU3RyaW5nKHR5cGUpO1xuICAgIHRoaXMudGltZVN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLnRhcmdldCA9IG51bGw7XG4gICAgdGhpcy5zcmNFbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLnJldHVyblZhbHVlID0gdHJ1ZTtcbiAgICB0aGlzLmlzVHJ1c3RlZCA9IGZhbHNlO1xuICAgIHRoaXMuZXZlbnRQaGFzZSA9IDA7XG4gICAgdGhpcy5kZWZhdWx0UHJldmVudGVkID0gZmFsc2U7XG4gICAgdGhpcy5jdXJyZW50VGFyZ2V0ID0gbnVsbDtcbiAgICB0aGlzLmNhbmNlbGFibGUgPSBjYW5jZWxhYmxlID8gQm9vbGVhbihjYW5jZWxhYmxlKSA6IGZhbHNlO1xuICAgIHRoaXMuY2FubmNlbEJ1YmJsZSA9IGZhbHNlO1xuICAgIHRoaXMuYnViYmxlcyA9IGJ1YmJsZXMgPyBCb29sZWFuKGJ1YmJsZXMpIDogZmFsc2U7XG4gICAgdGhpcy5vcmlnaW4gPSBvcmlnaW4gPyBTdHJpbmcob3JpZ2luKSA6ICcnO1xuICAgIHRoaXMucG9ydHMgPSB0eXBlb2YgcG9ydHMgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IHBvcnRzO1xuICAgIHRoaXMuZGF0YSA9IHR5cGVvZiBkYXRhID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiBkYXRhO1xuICAgIHRoaXMubGFzdEV2ZW50SWQgPSBsYXN0RXZlbnRJZCA/IFN0cmluZyhsYXN0RXZlbnRJZCkgOiAnJztcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2hlbHBlcnMvbWVzc2FnZS1ldmVudC5qcyIsImltcG9ydCBFdmVudFByb3RvdHlwZSBmcm9tICcuL2V2ZW50LXByb3RvdHlwZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsb3NlRXZlbnQgZXh0ZW5kcyBFdmVudFByb3RvdHlwZSB7XG4gIGNvbnN0cnVjdG9yKHR5cGUsIGV2ZW50SW5pdENvbmZpZyA9IHt9KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGlmICghdHlwZSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRmFpbGVkIHRvIGNvbnN0cnVjdCBcXCdDbG9zZUV2ZW50XFwnOiAxIGFyZ3VtZW50IHJlcXVpcmVkLCBidXQgb25seSAwIHByZXNlbnQuJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBldmVudEluaXRDb25maWcgIT09ICdvYmplY3QnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGYWlsZWQgdG8gY29uc3RydWN0IFxcJ0Nsb3NlRXZlbnRcXCc6IHBhcmFtZXRlciAyIChcXCdldmVudEluaXREaWN0XFwnKSBpcyBub3QgYW4gb2JqZWN0Jyk7XG4gICAgfVxuXG4gICAgY29uc3Qge1xuICAgICAgYnViYmxlcyxcbiAgICAgIGNhbmNlbGFibGUsXG4gICAgICBjb2RlLFxuICAgICAgcmVhc29uLFxuICAgICAgd2FzQ2xlYW5cbiAgICB9ID0gZXZlbnRJbml0Q29uZmlnO1xuXG4gICAgdGhpcy50eXBlID0gU3RyaW5nKHR5cGUpO1xuICAgIHRoaXMudGltZVN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLnRhcmdldCA9IG51bGw7XG4gICAgdGhpcy5zcmNFbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLnJldHVyblZhbHVlID0gdHJ1ZTtcbiAgICB0aGlzLmlzVHJ1c3RlZCA9IGZhbHNlO1xuICAgIHRoaXMuZXZlbnRQaGFzZSA9IDA7XG4gICAgdGhpcy5kZWZhdWx0UHJldmVudGVkID0gZmFsc2U7XG4gICAgdGhpcy5jdXJyZW50VGFyZ2V0ID0gbnVsbDtcbiAgICB0aGlzLmNhbmNlbGFibGUgPSBjYW5jZWxhYmxlID8gQm9vbGVhbihjYW5jZWxhYmxlKSA6IGZhbHNlO1xuICAgIHRoaXMuY2FubmNlbEJ1YmJsZSA9IGZhbHNlO1xuICAgIHRoaXMuYnViYmxlcyA9IGJ1YmJsZXMgPyBCb29sZWFuKGJ1YmJsZXMpIDogZmFsc2U7XG4gICAgdGhpcy5jb2RlID0gdHlwZW9mIGNvZGUgPT09ICdudW1iZXInID8gTnVtYmVyKGNvZGUpIDogMDtcbiAgICB0aGlzLnJlYXNvbiA9IHJlYXNvbiA/IFN0cmluZyhyZWFzb24pIDogJyc7XG4gICAgdGhpcy53YXNDbGVhbiA9IHdhc0NsZWFuID8gQm9vbGVhbih3YXNDbGVhbikgOiBmYWxzZTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2hlbHBlcnMvY2xvc2UtZXZlbnQuanMiLCJleHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplUHJvdG9jb2wocHJvdG9jb2wgPSAnJykge1xuICBsZXQgYWN0aXZlUHJvdG9jb2wgPSBwcm90b2NvbDtcblxuICBpZiAoQXJyYXkuaXNBcnJheShwcm90b2NvbCkpIHtcbiAgICBpZiAocHJvdG9jb2wubGVuZ3RoID4gMCkge1xuICAgICAgYWN0aXZlUHJvdG9jb2wgPSBwcm90b2NvbFswXTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBhY3RpdmVQcm90b2NvbCA9ICcnO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0eXBlb2YgYWN0aXZlUHJvdG9jb2wgPT09ICdzeW1ib2wnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgYSBTeW1ib2wgdmFsdWUgdG8gYSBzdHJpbmcnKTtcbiAgfVxuXG4gIGlmIChTdHJpbmcoYWN0aXZlUHJvdG9jb2wpLmluY2x1ZGVzKCcgJykpIHtcbiAgICAvLyBUT0RPIFNob3VsZCBiZSBET01FeGNlcHRpb25cbiAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBjb25zdHJ1Y3QgJ1dlYlNvY2tldCc6IFRoZSBzdWJwcm90b2NvbCAnJHtTdHJpbmcoYWN0aXZlUHJvdG9jb2wpfScgaXMgaW52YWxpZGApO1xuICB9XG5cbiAgcmV0dXJuIGFjdGl2ZVByb3RvY29sO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVVcmwodXJsKSB7XG4gIGNvbnN0IHBhcnRzID0gdXJsLnNwbGl0KCc6Ly8nKTtcbiAgcmV0dXJuIChwYXJ0c1sxXSAmJiBwYXJ0c1sxXS5pbmRleE9mKCcvJykgPT09IC0xKSA/IGAke3VybH0vYCA6IHVybDtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy9ub3JtYWxpemUuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXRyaWV2ZUdsb2JhbE9iamVjdCgpIHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIHdpbmRvdztcbiAgfVxuXG4gIHJldHVybiAodHlwZW9mIHByb2Nlc3MgPT09ICdvYmplY3QnICYmXG4gICAgICB0eXBlb2YgcmVxdWlyZSA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgdHlwZW9mIGdsb2JhbCA9PT0gJ29iamVjdCcpID8gZ2xvYmFsIDogdGhpcztcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9oZWxwZXJzL2dsb2JhbC1vYmplY3QuanMiLCJpbXBvcnQgZGVsYXkgZnJvbSAnLi9oZWxwZXJzL2RlbGF5JztcbmltcG9ydCBFdmVudFRhcmdldCBmcm9tICcuL2V2ZW50LXRhcmdldCc7XG5pbXBvcnQgbmV0d29ya0JyaWRnZSBmcm9tICcuL25ldHdvcmstYnJpZGdlJztcbmltcG9ydCBDTE9TRV9DT0RFUyBmcm9tICcuL2hlbHBlcnMvY2xvc2UtY29kZXMnO1xuaW1wb3J0IHsgbm9ybWFsaXplVXJsIH0gZnJvbSAnLi91dGlscy9ub3JtYWxpemUnO1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuL2hlbHBlcnMvbG9nZ2VyJztcbmltcG9ydCB7IGNyZWF0ZUV2ZW50LCBjcmVhdGVNZXNzYWdlRXZlbnQsIGNyZWF0ZUNsb3NlRXZlbnQgfSBmcm9tICcuL2V2ZW50LWZhY3RvcnknO1xuXG4vKlxuKiBUaGUgc29ja2V0LWlvIGNsYXNzIGlzIGRlc2lnbmVkIHRvIG1pbWljayB0aGUgcmVhbCBBUEkgYXMgY2xvc2VseSBhcyBwb3NzaWJsZS5cbipcbiogaHR0cDovL3NvY2tldC5pby9kb2NzL1xuKi9cbmNsYXNzIFNvY2tldElPIGV4dGVuZHMgRXZlbnRUYXJnZXQge1xuICAvKlxuICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgKi9cbiAgY29uc3RydWN0b3IodXJsID0gJ3NvY2tldC5pbycsIHByb3RvY29sID0gJycpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5iaW5hcnlUeXBlID0gJ2Jsb2InO1xuICAgIHRoaXMudXJsID0gbm9ybWFsaXplVXJsKHVybCk7XG4gICAgdGhpcy5yZWFkeVN0YXRlID0gU29ja2V0SU8uQ09OTkVDVElORztcbiAgICB0aGlzLnByb3RvY29sID0gJyc7XG5cbiAgICBpZiAodHlwZW9mIHByb3RvY29sID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5wcm90b2NvbCA9IHByb3RvY29sO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShwcm90b2NvbCkgJiYgcHJvdG9jb2wubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5wcm90b2NvbCA9IHByb3RvY29sWzBdO1xuICAgIH1cblxuICAgIGNvbnN0IHNlcnZlciA9IG5ldHdvcmtCcmlkZ2UuYXR0YWNoV2ViU29ja2V0KHRoaXMsIHRoaXMudXJsKTtcblxuICAgIC8qXG4gICAgKiBEZWxheSB0cmlnZ2VyaW5nIHRoZSBjb25uZWN0aW9uIGV2ZW50cyBzbyB0aGV5IGNhbiBiZSBkZWZpbmVkIGluIHRpbWUuXG4gICAgKi9cbiAgICBkZWxheShmdW5jdGlvbiBkZWxheUNhbGxiYWNrKCkge1xuICAgICAgaWYgKHNlcnZlcikge1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBTb2NrZXRJTy5PUEVOO1xuICAgICAgICBzZXJ2ZXIuZGlzcGF0Y2hFdmVudChjcmVhdGVFdmVudCh7IHR5cGU6ICdjb25uZWN0aW9uJyB9KSwgc2VydmVyLCB0aGlzKTtcbiAgICAgICAgc2VydmVyLmRpc3BhdGNoRXZlbnQoY3JlYXRlRXZlbnQoeyB0eXBlOiAnY29ubmVjdCcgfSksIHNlcnZlciwgdGhpcyk7IC8vIGFsaWFzXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChjcmVhdGVFdmVudCh7IHR5cGU6ICdjb25uZWN0JywgdGFyZ2V0OiB0aGlzIH0pKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFNvY2tldElPLkNMT1NFRDtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGNyZWF0ZUV2ZW50KHsgdHlwZTogJ2Vycm9yJywgdGFyZ2V0OiB0aGlzIH0pKTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGNyZWF0ZUNsb3NlRXZlbnQoe1xuICAgICAgICAgIHR5cGU6ICdjbG9zZScsXG4gICAgICAgICAgdGFyZ2V0OiB0aGlzLFxuICAgICAgICAgIGNvZGU6IENMT1NFX0NPREVTLkNMT1NFX05PUk1BTFxuICAgICAgICB9KSk7XG5cbiAgICAgICAgbG9nZ2VyKCdlcnJvcicsIGBTb2NrZXQuaW8gY29ubmVjdGlvbiB0byAnJHt0aGlzLnVybH0nIGZhaWxlZGApO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuXG4gICAgLyoqXG4gICAgICBBZGQgYW4gYWxpYXNlZCBldmVudCBsaXN0ZW5lciBmb3IgY2xvc2UgLyBkaXNjb25uZWN0XG4gICAgICovXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsIChldmVudCkgPT4ge1xuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGNyZWF0ZUNsb3NlRXZlbnQoe1xuICAgICAgICB0eXBlOiAnZGlzY29ubmVjdCcsXG4gICAgICAgIHRhcmdldDogZXZlbnQudGFyZ2V0LFxuICAgICAgICBjb2RlOiBldmVudC5jb2RlXG4gICAgICB9KSk7XG4gICAgfSk7XG4gIH1cblxuICAvKlxuICAqIENsb3NlcyB0aGUgU29ja2V0SU8gY29ubmVjdGlvbiBvciBjb25uZWN0aW9uIGF0dGVtcHQsIGlmIGFueS5cbiAgKiBJZiB0aGUgY29ubmVjdGlvbiBpcyBhbHJlYWR5IENMT1NFRCwgdGhpcyBtZXRob2QgZG9lcyBub3RoaW5nLlxuICAqL1xuICBjbG9zZSgpIHtcbiAgICBpZiAodGhpcy5yZWFkeVN0YXRlICE9PSBTb2NrZXRJTy5PUEVOKSB7IHJldHVybiB1bmRlZmluZWQ7IH1cblxuICAgIGNvbnN0IHNlcnZlciA9IG5ldHdvcmtCcmlkZ2Uuc2VydmVyTG9va3VwKHRoaXMudXJsKTtcbiAgICBuZXR3b3JrQnJpZGdlLnJlbW92ZVdlYlNvY2tldCh0aGlzLCB0aGlzLnVybCk7XG5cbiAgICB0aGlzLnJlYWR5U3RhdGUgPSBTb2NrZXRJTy5DTE9TRUQ7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KGNyZWF0ZUNsb3NlRXZlbnQoe1xuICAgICAgdHlwZTogJ2Nsb3NlJyxcbiAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgIGNvZGU6IENMT1NFX0NPREVTLkNMT1NFX05PUk1BTFxuICAgIH0pKTtcblxuICAgIGlmIChzZXJ2ZXIpIHtcbiAgICAgIHNlcnZlci5kaXNwYXRjaEV2ZW50KGNyZWF0ZUNsb3NlRXZlbnQoe1xuICAgICAgICB0eXBlOiAnZGlzY29ubmVjdCcsXG4gICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgY29kZTogQ0xPU0VfQ09ERVMuQ0xPU0VfTk9STUFMXG4gICAgICB9KSwgc2VydmVyKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAqIEFsaWFzIGZvciBTb2NrZXQjY2xvc2VcbiAgKlxuICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9zb2NrZXRpby9zb2NrZXQuaW8tY2xpZW50L2Jsb2IvbWFzdGVyL2xpYi9zb2NrZXQuanMjTDM4M1xuICAqL1xuICBkaXNjb25uZWN0KCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIC8qXG4gICogU3VibWl0cyBhbiBldmVudCB0byB0aGUgc2VydmVyIHdpdGggYSBwYXlsb2FkXG4gICovXG4gIGVtaXQoZXZlbnQsIC4uLmRhdGEpIHtcbiAgICBpZiAodGhpcy5yZWFkeVN0YXRlICE9PSBTb2NrZXRJTy5PUEVOKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvY2tldElPIGlzIGFscmVhZHkgaW4gQ0xPU0lORyBvciBDTE9TRUQgc3RhdGUnKTtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlRXZlbnQgPSBjcmVhdGVNZXNzYWdlRXZlbnQoe1xuICAgICAgdHlwZTogZXZlbnQsXG4gICAgICBvcmlnaW46IHRoaXMudXJsLFxuICAgICAgZGF0YVxuICAgIH0pO1xuXG4gICAgY29uc3Qgc2VydmVyID0gbmV0d29ya0JyaWRnZS5zZXJ2ZXJMb29rdXAodGhpcy51cmwpO1xuXG4gICAgaWYgKHNlcnZlcikge1xuICAgICAgc2VydmVyLmRpc3BhdGNoRXZlbnQobWVzc2FnZUV2ZW50LCAuLi5kYXRhKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAqIFN1Ym1pdHMgYSAnbWVzc2FnZScgZXZlbnQgdG8gdGhlIHNlcnZlci5cbiAgKlxuICAqIFNob3VsZCBiZWhhdmUgZXhhY3RseSBsaWtlIFdlYlNvY2tldCNzZW5kXG4gICpcbiAgKiBodHRwczovL2dpdGh1Yi5jb20vc29ja2V0aW8vc29ja2V0LmlvLWNsaWVudC9ibG9iL21hc3Rlci9saWIvc29ja2V0LmpzI0wxMTNcbiAgKi9cbiAgc2VuZChkYXRhKSB7XG4gICAgdGhpcy5lbWl0KCdtZXNzYWdlJywgZGF0YSk7XG4gIH1cblxuICAvKlxuICAqIEZvciBicm9hZGNhc3RpbmcgZXZlbnRzIHRvIG90aGVyIGNvbm5lY3RlZCBzb2NrZXRzLlxuICAqXG4gICogZS5nLiBzb2NrZXQuYnJvYWRjYXN0LmVtaXQoJ2hpIScpO1xuICAqIGUuZy4gc29ja2V0LmJyb2FkY2FzdC50bygnbXktcm9vbScpLmVtaXQoJ2hpIScpO1xuICAqL1xuICBnZXQgYnJvYWRjYXN0KCkge1xuICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgIT09IFNvY2tldElPLk9QRU4pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU29ja2V0SU8gaXMgYWxyZWFkeSBpbiBDTE9TSU5HIG9yIENMT1NFRCBzdGF0ZScpO1xuICAgIH1cblxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGNvbnN0IHNlcnZlciA9IG5ldHdvcmtCcmlkZ2Uuc2VydmVyTG9va3VwKHRoaXMudXJsKTtcbiAgICBpZiAoIXNlcnZlcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBTb2NrZXRJTyBjYW4gbm90IGZpbmQgYSBzZXJ2ZXIgYXQgdGhlIHNwZWNpZmllZCBVUkwgKCR7dGhpcy51cmx9KWApO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBlbWl0KGV2ZW50LCBkYXRhKSB7XG4gICAgICAgIHNlcnZlci5lbWl0KGV2ZW50LCBkYXRhLCB7IHdlYnNvY2tldHM6IG5ldHdvcmtCcmlkZ2Uud2Vic29ja2V0c0xvb2t1cChzZWxmLnVybCwgbnVsbCwgc2VsZikgfSk7XG4gICAgICB9LFxuICAgICAgdG8ocm9vbSkge1xuICAgICAgICByZXR1cm4gc2VydmVyLnRvKHJvb20sIHNlbGYpO1xuICAgICAgfSxcbiAgICAgIGluKHJvb20pIHtcbiAgICAgICAgcmV0dXJuIHNlcnZlci5pbihyb29tLCBzZWxmKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLypcbiAgKiBGb3IgcmVnaXN0ZXJpbmcgZXZlbnRzIHRvIGJlIHJlY2VpdmVkIGZyb20gdGhlIHNlcnZlclxuICAqL1xuICBvbih0eXBlLCBjYWxsYmFjaykge1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjayk7XG4gIH1cblxuICAvKlxuICAgKiBKb2luIGEgcm9vbSBvbiBhIHNlcnZlclxuICAgKlxuICAgKiBodHRwOi8vc29ja2V0LmlvL2RvY3Mvcm9vbXMtYW5kLW5hbWVzcGFjZXMvI2pvaW5pbmctYW5kLWxlYXZpbmdcbiAgICovXG4gIGpvaW4ocm9vbSkge1xuICAgIG5ldHdvcmtCcmlkZ2UuYWRkTWVtYmVyc2hpcFRvUm9vbSh0aGlzLCByb29tKTtcbiAgfVxuXG4gIC8qXG4gICAqIEdldCB0aGUgd2Vic29ja2V0IHRvIGxlYXZlIHRoZSByb29tXG4gICAqXG4gICAqIGh0dHA6Ly9zb2NrZXQuaW8vZG9jcy9yb29tcy1hbmQtbmFtZXNwYWNlcy8jam9pbmluZy1hbmQtbGVhdmluZ1xuICAgKi9cbiAgbGVhdmUocm9vbSkge1xuICAgIG5ldHdvcmtCcmlkZ2UucmVtb3ZlTWVtYmVyc2hpcEZyb21Sb29tKHRoaXMsIHJvb20pO1xuICB9XG5cbiAgLypcbiAgICogSW52b2tlcyBhbGwgbGlzdGVuZXIgZnVuY3Rpb25zIHRoYXQgYXJlIGxpc3RlbmluZyB0byB0aGUgZ2l2ZW4gZXZlbnQudHlwZSBwcm9wZXJ0eS4gRWFjaFxuICAgKiBsaXN0ZW5lciB3aWxsIGJlIHBhc3NlZCB0aGUgZXZlbnQgYXMgdGhlIGZpcnN0IGFyZ3VtZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnQgLSBldmVudCBvYmplY3Qgd2hpY2ggd2lsbCBiZSBwYXNzZWQgdG8gYWxsIGxpc3RlbmVycyBvZiB0aGUgZXZlbnQudHlwZSBwcm9wZXJ0eVxuICAgKi9cbiAgZGlzcGF0Y2hFdmVudChldmVudCwgLi4uY3VzdG9tQXJndW1lbnRzKSB7XG4gICAgY29uc3QgZXZlbnROYW1lID0gZXZlbnQudHlwZTtcbiAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdO1xuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGxpc3RlbmVycykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBsaXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIpID0+IHtcbiAgICAgIGlmIChjdXN0b21Bcmd1bWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBjdXN0b21Bcmd1bWVudHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUmVndWxhciBXZWJTb2NrZXRzIGV4cGVjdCBhIE1lc3NhZ2VFdmVudCBidXQgU29ja2V0aW8uaW8ganVzdCB3YW50cyByYXcgZGF0YVxuICAgICAgICAvLyAgcGF5bG9hZCBpbnN0YW5jZW9mIE1lc3NhZ2VFdmVudCB3b3JrcywgYnV0IHlvdSBjYW4ndCBpc250YW5jZSBvZiBOb2RlRXZlbnRcbiAgICAgICAgLy8gIGZvciBub3cgd2UgZGV0ZWN0IGlmIHRoZSBvdXRwdXQgaGFzIGRhdGEgZGVmaW5lZCBvbiBpdFxuICAgICAgICBsaXN0ZW5lci5jYWxsKHRoaXMsIGV2ZW50LmRhdGEgPyBldmVudC5kYXRhIDogZXZlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cblNvY2tldElPLkNPTk5FQ1RJTkcgPSAwO1xuU29ja2V0SU8uT1BFTiA9IDE7XG5Tb2NrZXRJTy5DTE9TSU5HID0gMjtcblNvY2tldElPLkNMT1NFRCA9IDM7XG5cbi8qXG4qIFN0YXRpYyBjb25zdHJ1Y3RvciBtZXRob2RzIGZvciB0aGUgSU8gU29ja2V0XG4qL1xuY29uc3QgSU8gPSBmdW5jdGlvbiBpb0NvbnN0cnVjdG9yKHVybCkge1xuICByZXR1cm4gbmV3IFNvY2tldElPKHVybCk7XG59O1xuXG4vKlxuKiBBbGlhcyB0aGUgcmF3IElPKCkgY29uc3RydWN0b3JcbiovXG5JTy5jb25uZWN0ID0gZnVuY3Rpb24gaW9Db25uZWN0KHVybCkge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBuZXctY2FwICovXG4gIHJldHVybiBJTyh1cmwpO1xuICAvKiBlc2xpbnQtZW5hYmxlIG5ldy1jYXAgKi9cbn07XG5cbmV4cG9ydCBkZWZhdWx0IElPO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NvY2tldC1pby5qcyJdLCJzb3VyY2VSb290IjoiIn0=