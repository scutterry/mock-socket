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
	
	var _socketIo = __webpack_require__(18);
	
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
	
	var _normalizeUrl = __webpack_require__(8);
	
	var _normalizeUrl2 = _interopRequireDefault(_normalizeUrl);
	
	var _globalObject = __webpack_require__(17);
	
	var _globalObject2 = _interopRequireDefault(_globalObject);
	
	var _eventFactory = __webpack_require__(11);
	
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
	
	    _this.url = (0, _normalizeUrl2.default)(url);
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
	
	var _normalizeUrl = __webpack_require__(8);
	
	var _normalizeUrl2 = _interopRequireDefault(_normalizeUrl);
	
	var _logger = __webpack_require__(9);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	var _eventFactory = __webpack_require__(11);
	
	var _normalizeProtocol = __webpack_require__(16);
	
	var _normalizeProtocol2 = _interopRequireDefault(_normalizeProtocol);
	
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
	
	  /*
	  * @param {string} url
	  */
	  function WebSocket(url) {
	    var protocol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	
	    _classCallCheck(this, WebSocket);
	
	    var _this = _possibleConstructorReturn(this, (WebSocket.__proto__ || Object.getPrototypeOf(WebSocket)).call(this));
	
	    if (!url) {
	      throw new TypeError('Failed to construct \'WebSocket\': 1 argument required, but only 0 present.');
	    }
	
	    _this.binaryType = 'blob';
	    _this.url = (0, _normalizeUrl2.default)(url);
	    _this.readyState = WebSocket.CONNECTING;
	    _this.protocol = (0, _normalizeProtocol2.default)(protocol);
	
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
	      url: { writable: false },
	      protocol: { writable: false },
	      readyState: { writable: false },
	      bufferedAmount: { writable: false },
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
	
	    var server = _networkBridge2.default.attachWebSocket(_this, _this.url);
	
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
	      if (server) {
	        if (server.options.verifyClient && typeof server.options.verifyClient === 'function' && !server.options.verifyClient()) {
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
	    value: function close() {
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
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = normalizeUrl;
	function normalizeUrl(url) {
	  var parts = url.split('://');
	  return parts[1] && parts[1].indexOf('/') === -1 ? url + '/' : url;
	}

/***/ },
/* 9 */
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ },
/* 10 */
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createCloseEvent = exports.createMessageEvent = exports.createEvent = undefined;
	
	var _event = __webpack_require__(12);
	
	var _event2 = _interopRequireDefault(_event);
	
	var _messageEvent = __webpack_require__(14);
	
	var _messageEvent2 = _interopRequireDefault(_messageEvent);
	
	var _closeEvent = __webpack_require__(15);
	
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _eventPrototype = __webpack_require__(13);
	
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
/* 13 */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _eventPrototype = __webpack_require__(13);
	
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _eventPrototype = __webpack_require__(13);
	
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
/* 16 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.default = normalizeProtocol;
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
	    throw new Error('Failed to construct \'WebSocket\': The subprotocol \'' + String(activeProtocol).includes(' ') + '\' is invalid'); // TODO Should be DOMException
	  }
	
	  return activeProtocol;
	}

/***/ },
/* 17 */
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10), (function() { return this; }())))

/***/ },
/* 18 */
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
	
	var _normalizeUrl = __webpack_require__(8);
	
	var _normalizeUrl2 = _interopRequireDefault(_normalizeUrl);
	
	var _logger = __webpack_require__(9);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	var _eventFactory = __webpack_require__(11);
	
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
	    _this.url = (0, _normalizeUrl2.default)(url);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAzYWE3NmZlZTdlMGZiMjcyYWViMSIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd2Vic29ja2V0LmpzIiwid2VicGFjazovLy8uL3NyYy9oZWxwZXJzL2RlbGF5LmpzIiwid2VicGFjazovLy8uL3NyYy9ldmVudC10YXJnZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMvYXJyYXktaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbmV0d29yay1icmlkZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMvY2xvc2UtY29kZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMvbm9ybWFsaXplLXVybC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVycy9sb2dnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V2ZW50LWZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMvZXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMvZXZlbnQtcHJvdG90eXBlLmpzIiwid2VicGFjazovLy8uL3NyYy9oZWxwZXJzL21lc3NhZ2UtZXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMvY2xvc2UtZXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL25vcm1hbGl6ZS1wcm90b2NvbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVycy9nbG9iYWwtb2JqZWN0LmpzIiwid2VicGFjazovLy8uL3NyYy9zb2NrZXQtaW8uanMiXSwibmFtZXMiOlsiU2VydmVyIiwiV2ViU29ja2V0IiwiU29ja2V0SU8iLCJ1cmwiLCJvcHRpb25zIiwib3JpZ2luYWxXZWJTb2NrZXQiLCJzZXJ2ZXIiLCJhdHRhY2hTZXJ2ZXIiLCJkaXNwYXRjaEV2ZW50IiwidHlwZSIsIkVycm9yIiwidmVyaWZpeUNsaWVudCIsInN0YXJ0IiwiZ2xvYmFsT2JqIiwiY2FsbGJhY2siLCJyZW1vdmVTZXJ2ZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiZGF0YSIsImVtaXQiLCJldmVudCIsIndlYnNvY2tldHMiLCJ3ZWJzb2NrZXRzTG9va3VwIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImNhbGwiLCJmb3JFYWNoIiwic29ja2V0IiwiaXNBcnJheSIsIm9yaWdpbiIsInRhcmdldCIsImNvZGUiLCJyZWFzb24iLCJ3YXNDbGVhbiIsImxpc3RlbmVycyIsInJlYWR5U3RhdGUiLCJDTE9TRSIsIkNMT1NFX05PUk1BTCIsInJvb20iLCJicm9hZGNhc3RlciIsInNlbGYiLCJhcmdzIiwidG8iLCJhcHBseSIsIm9mIiwicHJvdG9jb2wiLCJUeXBlRXJyb3IiLCJiaW5hcnlUeXBlIiwiQ09OTkVDVElORyIsIk9iamVjdCIsImRlZmluZVByb3BlcnRpZXMiLCJvbm9wZW4iLCJjb25maWd1cmFibGUiLCJlbnVtZXJhYmxlIiwiZ2V0Iiwib3BlbiIsInNldCIsImxpc3RlbmVyIiwib25tZXNzYWdlIiwibWVzc2FnZSIsIm9uY2xvc2UiLCJjbG9zZSIsIm9uZXJyb3IiLCJlcnJvciIsIndyaXRhYmxlIiwiYnVmZmVyZWRBbW91bnQiLCJ2YWx1ZSIsImluZGV4T2YiLCJjb25zb2xlIiwid2FybiIsInRvU3RyaW5nIiwiYXR0YWNoV2ViU29ja2V0IiwiZGVsYXlDYWxsYmFjayIsInZlcmlmeUNsaWVudCIsIkNMT1NFRCIsInJlbW92ZVdlYlNvY2tldCIsIk9QRU4iLCJDTE9TSU5HIiwibWVzc2FnZUV2ZW50Iiwic2VydmVyTG9va3VwIiwidW5kZWZpbmVkIiwiY2xvc2VFdmVudCIsImRlbGF5IiwiY29udGV4dCIsInNldFRpbWVvdXQiLCJ0aW1lb3V0Q29udGV4dCIsIkV2ZW50VGFyZ2V0IiwiaXRlbSIsInB1c2giLCJyZW1vdmluZ0xpc3RlbmVyIiwiYXJyYXlPZkxpc3RlbmVycyIsImN1c3RvbUFyZ3VtZW50cyIsImV2ZW50TmFtZSIsInJlamVjdCIsImZpbHRlciIsImFycmF5IiwicmVzdWx0cyIsIml0ZW1JbkFycmF5IiwiTmV0d29ya0JyaWRnZSIsInVybE1hcCIsIndlYnNvY2tldCIsImNvbm5lY3Rpb25Mb29rdXAiLCJyb29tTWVtYmVyc2hpcHMiLCJtZW1iZXJzIiwibWVtYmVyc2hpcHMiLCJjb2RlcyIsIkNMT1NFX0dPSU5HX0FXQVkiLCJDTE9TRV9QUk9UT0NPTF9FUlJPUiIsIkNMT1NFX1VOU1VQUE9SVEVEIiwiQ0xPU0VfTk9fU1RBVFVTIiwiQ0xPU0VfQUJOT1JNQUwiLCJDTE9TRV9VTlNVUFBPUlRFRF9EQVRBIiwiQ0xPU0VfVE9PX0xBUkdFIiwiQ0xPU0VfTUlTU0lOR19FWFRFTlNJT04iLCJDTE9TRV9JTlRFUk5BTF9FUlJPUiIsIkNMT1NFX1NFUlZJQ0VfUkVTVEFSVCIsIkNMT1NFX1RSWV9BR0FJTl9MQVRFUiIsIkNMT1NFX1RMU19IQU5EU0hBS0UiLCJub3JtYWxpemVVcmwiLCJwYXJ0cyIsInNwbGl0IiwibG9nIiwibWV0aG9kIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwiY3JlYXRlRXZlbnQiLCJjb25maWciLCJldmVudE9iamVjdCIsInNyY0VsZW1lbnQiLCJjdXJyZW50VGFyZ2V0IiwiY3JlYXRlTWVzc2FnZUV2ZW50IiwiY3JlYXRlQ2xvc2VFdmVudCIsIkV2ZW50IiwiZXZlbnRJbml0Q29uZmlnIiwiYnViYmxlcyIsImNhbmNlbGFibGUiLCJTdHJpbmciLCJ0aW1lU3RhbXAiLCJEYXRlIiwibm93IiwicmV0dXJuVmFsdWUiLCJpc1RydXN0ZWQiLCJldmVudFBoYXNlIiwiZGVmYXVsdFByZXZlbnRlZCIsIkJvb2xlYW4iLCJjYW5uY2VsQnViYmxlIiwiRXZlbnRQcm90b3R5cGUiLCJNZXNzYWdlRXZlbnQiLCJsYXN0RXZlbnRJZCIsInBvcnRzIiwiQ2xvc2VFdmVudCIsIk51bWJlciIsIm5vcm1hbGl6ZVByb3RvY29sIiwiYWN0aXZlUHJvdG9jb2wiLCJpbmNsdWRlcyIsInJldHJpZXZlR2xvYmFsT2JqZWN0Iiwid2luZG93IiwiZ2xvYmFsIiwiYWRkTWVtYmVyc2hpcFRvUm9vbSIsInJlbW92ZU1lbWJlcnNoaXBGcm9tUm9vbSIsImluIiwiSU8iLCJpb0NvbnN0cnVjdG9yIiwiY29ubmVjdCIsImlvQ29ubmVjdCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3RDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVPLEtBQU1BLDBDQUFOO0FBQ0EsS0FBTUMsbURBQU47QUFDQSxLQUFNQyxnREFBTixDOzs7Ozs7Ozs7Ozs7Ozs7O0FDTlA7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBOzs7S0FHTUYsTTs7O0FBQ0o7OztBQUdBLG1CQUFZRyxHQUFaLEVBQStCO0FBQUEsU0FBZEMsT0FBYyx1RUFBSixFQUFJOztBQUFBOztBQUFBOztBQUU3QixXQUFLRCxHQUFMLEdBQVcsNEJBQVVBLEdBQVYsQ0FBWDtBQUNBLFdBQUtFLGlCQUFMLEdBQXlCLElBQXpCO0FBQ0EsU0FBTUMsU0FBUyx3QkFBY0MsWUFBZCxRQUFpQyxNQUFLSixHQUF0QyxDQUFmOztBQUVBLFNBQUksQ0FBQ0csTUFBTCxFQUFhO0FBQ1gsYUFBS0UsYUFBTCxDQUFtQiwr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UCxrQkFBT2xDLE9BQU82SixFQUFQLENBQVUzSCxJQUFWLEVBQWdCRSxJQUFoQixDQUFQO0FBQ0Q7QUFUSSxRQUFQO0FBV0Q7Ozs7OztBQXNESHhDLFVBQVNnRCxVQUFULEdBQXNCLENBQXRCO0FBQ0FoRCxVQUFTNEUsSUFBVCxHQUFnQixDQUFoQjtBQUNBNUUsVUFBUzZFLE9BQVQsR0FBbUIsQ0FBbkI7QUFDQTdFLFVBQVMwRSxNQUFULEdBQWtCLENBQWxCOztBQUVBOzs7QUFHQSxLQUFNd0YsS0FBSyxTQUFTQyxhQUFULENBQXVCbEssR0FBdkIsRUFBNEI7QUFDckMsVUFBTyxJQUFJRCxRQUFKLENBQWFDLEdBQWIsQ0FBUDtBQUNELEVBRkQ7O0FBSUE7OztBQUdBaUssSUFBR0UsT0FBSCxHQUFhLFNBQVNDLFNBQVQsQ0FBbUJwSyxHQUFuQixFQUF3QjtBQUNuQztBQUNBLFVBQU9pSyxHQUFHakssR0FBSCxDQUFQO0FBQ0E7QUFDRCxFQUpEOzttQkFNZWlLLEUiLCJmaWxlIjoiZGlzdC9tb2NrLXNvY2tldC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIk1vY2tcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiTW9ja1wiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAzYWE3NmZlZTdlMGZiMjcyYWViMSIsImltcG9ydCBNb2NrU2VydmVyIGZyb20gJy4vc2VydmVyJztcbmltcG9ydCBNb2NrU29ja2V0SU8gZnJvbSAnLi9zb2NrZXQtaW8nO1xuaW1wb3J0IE1vY2tXZWJTb2NrZXQgZnJvbSAnLi93ZWJzb2NrZXQnO1xuXG5leHBvcnQgY29uc3QgU2VydmVyID0gTW9ja1NlcnZlcjtcbmV4cG9ydCBjb25zdCBXZWJTb2NrZXQgPSBNb2NrV2ViU29ja2V0O1xuZXhwb3J0IGNvbnN0IFNvY2tldElPID0gTW9ja1NvY2tldElPO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwiaW1wb3J0IFdlYlNvY2tldCBmcm9tICcuL3dlYnNvY2tldCc7XG5pbXBvcnQgRXZlbnRUYXJnZXQgZnJvbSAnLi9ldmVudC10YXJnZXQnO1xuaW1wb3J0IG5ldHdvcmtCcmlkZ2UgZnJvbSAnLi9uZXR3b3JrLWJyaWRnZSc7XG5pbXBvcnQgQ0xPU0VfQ09ERVMgZnJvbSAnLi9oZWxwZXJzL2Nsb3NlLWNvZGVzJztcbmltcG9ydCBub3JtYWxpemUgZnJvbSAnLi9oZWxwZXJzL25vcm1hbGl6ZS11cmwnO1xuaW1wb3J0IGdsb2JhbE9iamVjdCBmcm9tICcuL2hlbHBlcnMvZ2xvYmFsLW9iamVjdCc7XG5pbXBvcnQgeyBjcmVhdGVFdmVudCwgY3JlYXRlTWVzc2FnZUV2ZW50LCBjcmVhdGVDbG9zZUV2ZW50IH0gZnJvbSAnLi9ldmVudC1mYWN0b3J5JztcblxuLypcbiogaHR0cHM6Ly9naXRodWIuY29tL3dlYnNvY2tldHMvd3Mjc2VydmVyLWV4YW1wbGVcbiovXG5jbGFzcyBTZXJ2ZXIgZXh0ZW5kcyBFdmVudFRhcmdldCB7XG4gIC8qXG4gICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAqL1xuICBjb25zdHJ1Y3Rvcih1cmwsIG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy51cmwgPSBub3JtYWxpemUodXJsKTtcbiAgICB0aGlzLm9yaWdpbmFsV2ViU29ja2V0ID0gbnVsbDtcbiAgICBjb25zdCBzZXJ2ZXIgPSBuZXR3b3JrQnJpZGdlLmF0dGFjaFNlcnZlcih0aGlzLCB0aGlzLnVybCk7XG5cbiAgICBpZiAoIXNlcnZlcikge1xuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGNyZWF0ZUV2ZW50KHsgdHlwZTogJ2Vycm9yJyB9KSk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0EgbW9jayBzZXJ2ZXIgaXMgYWxyZWFkeSBsaXN0ZW5pbmcgb24gdGhpcyB1cmwnKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMudmVyaWZpeUNsaWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIG9wdGlvbnMudmVyaWZpeUNsaWVudCA9IG51bGw7XG4gICAgfVxuXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuICAgIHRoaXMuc3RhcnQoKTtcbiAgfVxuXG4gIC8qXG4gICogQXR0YWNoZXMgdGhlIG1vY2sgd2Vic29ja2V0IG9iamVjdCB0byB0aGUgZ2xvYmFsIG9iamVjdFxuICAqL1xuICBzdGFydCgpIHtcbiAgICBjb25zdCBnbG9iYWxPYmogPSBnbG9iYWxPYmplY3QoKTtcblxuICAgIGlmIChnbG9iYWxPYmouV2ViU29ja2V0KSB7XG4gICAgICB0aGlzLm9yaWdpbmFsV2ViU29ja2V0ID0gZ2xvYmFsT2JqLldlYlNvY2tldDtcbiAgICB9XG5cbiAgICBnbG9iYWxPYmouV2ViU29ja2V0ID0gV2ViU29ja2V0O1xuICB9XG5cbiAgLypcbiAgKiBSZW1vdmVzIHRoZSBtb2NrIHdlYnNvY2tldCBvYmplY3QgZnJvbSB0aGUgZ2xvYmFsIG9iamVjdFxuICAqL1xuICBzdG9wKGNhbGxiYWNrID0gKCkgPT4ge30pIHtcbiAgICBjb25zdCBnbG9iYWxPYmogPSBnbG9iYWxPYmplY3QoKTtcblxuICAgIGlmICh0aGlzLm9yaWdpbmFsV2ViU29ja2V0KSB7XG4gICAgICBnbG9iYWxPYmouV2ViU29ja2V0ID0gdGhpcy5vcmlnaW5hbFdlYlNvY2tldDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIGdsb2JhbE9iai5XZWJTb2NrZXQ7XG4gICAgfVxuXG4gICAgdGhpcy5vcmlnaW5hbFdlYlNvY2tldCA9IG51bGw7XG5cbiAgICBuZXR3b3JrQnJpZGdlLnJlbW92ZVNlcnZlcih0aGlzLnVybCk7XG5cbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICogVGhpcyBpcyB0aGUgbWFpbiBmdW5jdGlvbiBmb3IgdGhlIG1vY2sgc2VydmVyIHRvIHN1YnNjcmliZSB0byB0aGUgb24gZXZlbnRzLlxuICAqXG4gICogaWU6IG1vY2tTZXJ2ZXIub24oJ2Nvbm5lY3Rpb24nLCBmdW5jdGlvbigpIHsgY29uc29sZS5sb2coJ2EgbW9jayBjbGllbnQgY29ubmVjdGVkJyk7IH0pO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSBUaGUgZXZlbnQga2V5IHRvIHN1YnNjcmliZSB0by4gVmFsaWQga2V5cyBhcmU6IGNvbm5lY3Rpb24sIG1lc3NhZ2UsIGFuZCBjbG9zZS5cbiAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayB3aGljaCBzaG91bGQgYmUgY2FsbGVkIHdoZW4gYSBjZXJ0YWluIGV2ZW50IGlzIGZpcmVkLlxuICAqL1xuICBvbih0eXBlLCBjYWxsYmFjaykge1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjayk7XG4gIH1cblxuICAvKlxuICAqIFRoaXMgc2VuZCBmdW5jdGlvbiB3aWxsIG5vdGlmeSBhbGwgbW9jayBjbGllbnRzIHZpYSB0aGVpciBvbm1lc3NhZ2UgY2FsbGJhY2tzIHRoYXQgdGhlIHNlcnZlclxuICAqIGhhcyBhIG1lc3NhZ2UgZm9yIHRoZW0uXG4gICpcbiAgKiBAcGFyYW0geyp9IGRhdGEgLSBBbnkgamF2YXNjcmlwdCBvYmplY3Qgd2hpY2ggd2lsbCBiZSBjcmFmdGVkIGludG8gYSBNZXNzYWdlT2JqZWN0LlxuICAqL1xuICBzZW5kKGRhdGEsIG9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMuZW1pdCgnbWVzc2FnZScsIGRhdGEsIG9wdGlvbnMpO1xuICB9XG5cbiAgLypcbiAgKiBTZW5kcyBhIGdlbmVyaWMgbWVzc2FnZSBldmVudCB0byBhbGwgbW9jayBjbGllbnRzLlxuICAqL1xuICBlbWl0KGV2ZW50LCBkYXRhLCBvcHRpb25zID0ge30pIHtcbiAgICBsZXQgeyB3ZWJzb2NrZXRzIH0gPSBvcHRpb25zO1xuXG4gICAgaWYgKCF3ZWJzb2NrZXRzKSB7XG4gICAgICB3ZWJzb2NrZXRzID0gbmV0d29ya0JyaWRnZS53ZWJzb2NrZXRzTG9va3VwKHRoaXMudXJsKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnIHx8IGFyZ3VtZW50cy5sZW5ndGggPiAzKSB7XG4gICAgICBkYXRhID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxLCBhcmd1bWVudHMubGVuZ3RoKTtcbiAgICB9XG5cbiAgICB3ZWJzb2NrZXRzLmZvckVhY2goKHNvY2tldCkgPT4ge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgc29ja2V0LmRpc3BhdGNoRXZlbnQoY3JlYXRlTWVzc2FnZUV2ZW50KHtcbiAgICAgICAgICB0eXBlOiBldmVudCxcbiAgICAgICAgICBkYXRhLFxuICAgICAgICAgIG9yaWdpbjogdGhpcy51cmwsXG4gICAgICAgICAgdGFyZ2V0OiBzb2NrZXRcbiAgICAgICAgfSksIC4uLmRhdGEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc29ja2V0LmRpc3BhdGNoRXZlbnQoY3JlYXRlTWVzc2FnZUV2ZW50KHtcbiAgICAgICAgICB0eXBlOiBldmVudCxcbiAgICAgICAgICBkYXRhLFxuICAgICAgICAgIG9yaWdpbjogdGhpcy51cmwsXG4gICAgICAgICAgdGFyZ2V0OiBzb2NrZXRcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLypcbiAgKiBDbG9zZXMgdGhlIGNvbm5lY3Rpb24gYW5kIHRyaWdnZXJzIHRoZSBvbmNsb3NlIG1ldGhvZCBvZiBhbGwgbGlzdGVuaW5nXG4gICogd2Vic29ja2V0cy4gQWZ0ZXIgdGhhdCBpdCByZW1vdmVzIGl0c2VsZiBmcm9tIHRoZSB1cmxNYXAgc28gYW5vdGhlciBzZXJ2ZXJcbiAgKiBjb3VsZCBhZGQgaXRzZWxmIHRvIHRoZSB1cmwuXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICAqL1xuICBjbG9zZShvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCB7XG4gICAgICBjb2RlLFxuICAgICAgcmVhc29uLFxuICAgICAgd2FzQ2xlYW5cbiAgICB9ID0gb3B0aW9ucztcbiAgICBjb25zdCBsaXN0ZW5lcnMgPSBuZXR3b3JrQnJpZGdlLndlYnNvY2tldHNMb29rdXAodGhpcy51cmwpO1xuXG4gICAgbGlzdGVuZXJzLmZvckVhY2goKHNvY2tldCkgPT4ge1xuICAgICAgc29ja2V0LnJlYWR5U3RhdGUgPSBXZWJTb2NrZXQuQ0xPU0U7XG4gICAgICBzb2NrZXQuZGlzcGF0Y2hFdmVudChjcmVhdGVDbG9zZUV2ZW50KHtcbiAgICAgICAgdHlwZTogJ2Nsb3NlJyxcbiAgICAgICAgdGFyZ2V0OiBzb2NrZXQsXG4gICAgICAgIGNvZGU6IGNvZGUgfHwgQ0xPU0VfQ09ERVMuQ0xPU0VfTk9STUFMLFxuICAgICAgICByZWFzb246IHJlYXNvbiB8fCAnJyxcbiAgICAgICAgd2FzQ2xlYW5cbiAgICAgIH0pKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChjcmVhdGVDbG9zZUV2ZW50KHsgdHlwZTogJ2Nsb3NlJyB9KSwgdGhpcyk7XG4gICAgbmV0d29ya0JyaWRnZS5yZW1vdmVTZXJ2ZXIodGhpcy51cmwpO1xuICB9XG5cbiAgLypcbiAgKiBSZXR1cm5zIGFuIGFycmF5IG9mIHdlYnNvY2tldHMgd2hpY2ggYXJlIGxpc3RlbmluZyB0byB0aGlzIHNlcnZlclxuICAqL1xuICBjbGllbnRzKCkge1xuICAgIHJldHVybiBuZXR3b3JrQnJpZGdlLndlYnNvY2tldHNMb29rdXAodGhpcy51cmwpO1xuICB9XG5cbiAgLypcbiAgKiBQcmVwYXJlcyBhIG1ldGhvZCB0byBzdWJtaXQgYW4gZXZlbnQgdG8gbWVtYmVycyBvZiB0aGUgcm9vbVxuICAqXG4gICogZS5nLiBzZXJ2ZXIudG8oJ215LXJvb20nKS5lbWl0KCdoaSEnKTtcbiAgKi9cbiAgdG8ocm9vbSwgYnJvYWRjYXN0ZXIpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBjb25zdCB3ZWJzb2NrZXRzID0gbmV0d29ya0JyaWRnZS53ZWJzb2NrZXRzTG9va3VwKHRoaXMudXJsLCByb29tLCBicm9hZGNhc3Rlcik7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVtaXQoZXZlbnQsIGRhdGEpIHtcbiAgICAgICAgc2VsZi5lbWl0KGV2ZW50LCBkYXRhLCB7IHdlYnNvY2tldHMgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8qXG4gICAqIEFsaWFzIGZvciBTZXJ2ZXIudG9cbiAgICovXG4gIGluKC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gdGhpcy50by5hcHBseShudWxsLCBhcmdzKTtcbiAgfVxufVxuXG4vKlxuICogQWx0ZXJuYXRpdmUgY29uc3RydWN0b3IgdG8gc3VwcG9ydCBuYW1lc3BhY2VzIGluIHNvY2tldC5pb1xuICpcbiAqIGh0dHA6Ly9zb2NrZXQuaW8vZG9jcy9yb29tcy1hbmQtbmFtZXNwYWNlcy8jY3VzdG9tLW5hbWVzcGFjZXNcbiAqL1xuU2VydmVyLm9mID0gZnVuY3Rpb24gb2YodXJsKSB7XG4gIHJldHVybiBuZXcgU2VydmVyKHVybCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTZXJ2ZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmVyLmpzIiwiaW1wb3J0IGRlbGF5IGZyb20gJy4vaGVscGVycy9kZWxheSc7XG5pbXBvcnQgRXZlbnRUYXJnZXQgZnJvbSAnLi9ldmVudC10YXJnZXQnO1xuaW1wb3J0IG5ldHdvcmtCcmlkZ2UgZnJvbSAnLi9uZXR3b3JrLWJyaWRnZSc7XG5pbXBvcnQgQ0xPU0VfQ09ERVMgZnJvbSAnLi9oZWxwZXJzL2Nsb3NlLWNvZGVzJztcbmltcG9ydCBub3JtYWxpemUgZnJvbSAnLi9oZWxwZXJzL25vcm1hbGl6ZS11cmwnO1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuL2hlbHBlcnMvbG9nZ2VyJztcbmltcG9ydCB7IGNyZWF0ZUV2ZW50LCBjcmVhdGVNZXNzYWdlRXZlbnQsIGNyZWF0ZUNsb3NlRXZlbnQgfSBmcm9tICcuL2V2ZW50LWZhY3RvcnknO1xuaW1wb3J0IG5vcm1hbGl6ZVByb3RvY29sIGZyb20gJy4vdXRpbHMvbm9ybWFsaXplLXByb3RvY29sJztcblxuLypcbiogVGhlIG1haW4gd2Vic29ja2V0IGNsYXNzIHdoaWNoIGlzIGRlc2lnbmVkIHRvIG1pbWljayB0aGUgbmF0aXZlIFdlYlNvY2tldCBjbGFzcyBhcyBjbG9zZVxuKiBhcyBwb3NzaWJsZS5cbipcbiogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dlYlNvY2tldFxuKi9cbmNsYXNzIFdlYlNvY2tldCBleHRlbmRzIEV2ZW50VGFyZ2V0IHtcblxuICBzdGF0aWMgQ09OTkVDVElORyA9IDA7XG4gIHN0YXRpYyBPUEVOID0gMTtcbiAgc3RhdGljIENMT1NJTkcgPSAyO1xuICBzdGF0aWMgQ0xPU0VEID0gMztcblxuICAvKlxuICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgKi9cbiAgY29uc3RydWN0b3IodXJsLCBwcm90b2NvbCA9ICcnKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGlmICghdXJsKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGYWlsZWQgdG8gY29uc3RydWN0IFxcJ1dlYlNvY2tldFxcJzogMSBhcmd1bWVudCByZXF1aXJlZCwgYnV0IG9ubHkgMCBwcmVzZW50LicpO1xuICAgIH1cblxuICAgIHRoaXMuYmluYXJ5VHlwZSA9ICdibG9iJztcbiAgICB0aGlzLnVybCA9IG5vcm1hbGl6ZSh1cmwpO1xuICAgIHRoaXMucmVhZHlTdGF0ZSA9IFdlYlNvY2tldC5DT05ORUNUSU5HO1xuICAgIHRoaXMucHJvdG9jb2wgPSBub3JtYWxpemVQcm90b2NvbChwcm90b2NvbCk7XG5cbiAgICAvKlxuICAgICogSW4gb3JkZXIgdG8gY2FwdHVyZSB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gd2UgbmVlZCB0byBkZWZpbmUgY3VzdG9tIHNldHRlcnMuXG4gICAgKiBUbyBpbGx1c3RyYXRlOlxuICAgICogICBteVNvY2tldC5vbm9wZW4gPSBmdW5jdGlvbigpIHsgYWxlcnQodHJ1ZSkgfTtcbiAgICAqXG4gICAgKiBUaGUgb25seSB3YXkgdG8gY2FwdHVyZSB0aGF0IGZ1bmN0aW9uIGFuZCBob2xkIG9udG8gaXQgZm9yIGxhdGVyIGlzIHdpdGggdGhlXG4gICAgKiBiZWxvdyBjb2RlOlxuICAgICovXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xuICAgICAgb25vcGVuOiB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0KCkgeyByZXR1cm4gdGhpcy5saXN0ZW5lcnMub3BlbjsgfSxcbiAgICAgICAgc2V0KGxpc3RlbmVyKSB7XG4gICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdvcGVuJywgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgb25tZXNzYWdlOiB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0KCkgeyByZXR1cm4gdGhpcy5saXN0ZW5lcnMubWVzc2FnZTsgfSxcbiAgICAgICAgc2V0KGxpc3RlbmVyKSB7XG4gICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgb25jbG9zZToge1xuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGdldCgpIHsgcmV0dXJuIHRoaXMubGlzdGVuZXJzLmNsb3NlOyB9LFxuICAgICAgICBzZXQobGlzdGVuZXIpIHtcbiAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2Nsb3NlJywgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgb25lcnJvcjoge1xuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGdldCgpIHsgcmV0dXJuIHRoaXMubGlzdGVuZXJzLmVycm9yOyB9LFxuICAgICAgICBzZXQobGlzdGVuZXIpIHtcbiAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdXJsOiB7IHdyaXRhYmxlOiBmYWxzZSB9LFxuICAgICAgcHJvdG9jb2w6IHsgd3JpdGFibGU6IGZhbHNlIH0sXG4gICAgICByZWFkeVN0YXRlOiB7IHdyaXRhYmxlOiBmYWxzZSB9LFxuICAgICAgYnVmZmVyZWRBbW91bnQ6IHsgd3JpdGFibGU6IGZhbHNlIH0sXG4gICAgICBiaW5hcnlUeXBlOiB7XG4gICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgIGlmIChbJ2Jsb2InLCAnYXJyYXlidWZmZXInXS5pbmRleE9mKHZhbHVlKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuYmluYXJ5VHlwZSA9IHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgVGhlIHByb3ZpZGVkIHZhbHVlICcke3ZhbHVlLnRvU3RyaW5nKCl9JyBpcyBub3QgYSB2YWxpZCBlbnVtIHZhbHVlIG9mIHR5cGUgQmluYXJ5VHlwZWApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qgc2VydmVyID0gbmV0d29ya0JyaWRnZS5hdHRhY2hXZWJTb2NrZXQodGhpcywgdGhpcy51cmwpO1xuXG4gICAgLypcbiAgICAqIFRoaXMgZGVsYXkgaXMgbmVlZGVkIHNvIHRoYXQgd2UgZG9udCB0cmlnZ2VyIGFuIGV2ZW50IGJlZm9yZSB0aGUgY2FsbGJhY2tzIGhhdmUgYmVlblxuICAgICogc2V0dXAuIEZvciBleGFtcGxlOlxuICAgICpcbiAgICAqIHZhciBzb2NrZXQgPSBuZXcgV2ViU29ja2V0KCd3czovL2xvY2FsaG9zdCcpO1xuICAgICpcbiAgICAqIC8vIElmIHdlIGRvbnQgaGF2ZSB0aGUgZGVsYXkgdGhlbiB0aGUgZXZlbnQgd291bGQgYmUgdHJpZ2dlcmVkIHJpZ2h0IGhlcmUgYW5kIHRoaXMgaXNcbiAgICAqIC8vIGJlZm9yZSB0aGUgb25vcGVuIGhhZCBhIGNoYW5jZSB0byByZWdpc3RlciBpdHNlbGYuXG4gICAgKlxuICAgICogc29ja2V0Lm9ub3BlbiA9ICgpID0+IHsgLy8gdGhpcyB3b3VsZCBuZXZlciBiZSBjYWxsZWQgfTtcbiAgICAqXG4gICAgKiAvLyBhbmQgd2l0aCB0aGUgZGVsYXkgdGhlIGV2ZW50IGdldHMgdHJpZ2dlcmVkIGhlcmUgYWZ0ZXIgYWxsIG9mIHRoZSBjYWxsYmFja3MgaGF2ZSBiZWVuXG4gICAgKiAvLyByZWdpc3RlcmVkIDotKVxuICAgICovXG4gICAgZGVsYXkoZnVuY3Rpb24gZGVsYXlDYWxsYmFjaygpIHtcbiAgICAgIGlmIChzZXJ2ZXIpIHtcbiAgICAgICAgaWYgKHNlcnZlci5vcHRpb25zLnZlcmlmeUNsaWVudFxuICAgICAgICAgICYmIHR5cGVvZiBzZXJ2ZXIub3B0aW9ucy52ZXJpZnlDbGllbnQgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAmJiAhc2VydmVyLm9wdGlvbnMudmVyaWZ5Q2xpZW50KCkpIHtcbiAgICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBXZWJTb2NrZXQuQ0xPU0VEO1xuXG4gICAgICAgICAgbG9nZ2VyKFxuICAgICAgICAgICAgJ2Vycm9yJyxcbiAgICAgICAgICAgIGBXZWJTb2NrZXQgY29ubmVjdGlvbiB0byAnJHt0aGlzLnVybH0nIGZhaWxlZDogSFRUUCBBdXRoZW50aWNhdGlvbiBmYWlsZWQ7IG5vIHZhbGlkIGNyZWRlbnRpYWxzIGF2YWlsYWJsZWBcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgbmV0d29ya0JyaWRnZS5yZW1vdmVXZWJTb2NrZXQodGhpcywgdGhpcy51cmwpO1xuICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChjcmVhdGVFdmVudCh7IHR5cGU6ICdlcnJvcicsIHRhcmdldDogdGhpcyB9KSk7XG4gICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGNyZWF0ZUNsb3NlRXZlbnQoeyB0eXBlOiAnY2xvc2UnLCB0YXJnZXQ6IHRoaXMsIGNvZGU6IENMT1NFX0NPREVTLkNMT1NFX05PUk1BTCB9KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gV2ViU29ja2V0Lk9QRU47XG4gICAgICAgICAgc2VydmVyLmRpc3BhdGNoRXZlbnQoY3JlYXRlRXZlbnQoeyB0eXBlOiAnY29ubmVjdGlvbicgfSksIHNlcnZlciwgdGhpcyk7XG4gICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGNyZWF0ZUV2ZW50KHsgdHlwZTogJ29wZW4nLCB0YXJnZXQ6IHRoaXMgfSkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBXZWJTb2NrZXQuQ0xPU0VEO1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoY3JlYXRlRXZlbnQoeyB0eXBlOiAnZXJyb3InLCB0YXJnZXQ6IHRoaXMgfSkpO1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoY3JlYXRlQ2xvc2VFdmVudCh7IHR5cGU6ICdjbG9zZScsIHRhcmdldDogdGhpcywgY29kZTogQ0xPU0VfQ09ERVMuQ0xPU0VfTk9STUFMIH0pKTtcblxuICAgICAgICBsb2dnZXIoJ2Vycm9yJywgYFdlYlNvY2tldCBjb25uZWN0aW9uIHRvICcke3RoaXMudXJsfScgZmFpbGVkYCk7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG4gIH1cblxuICAvKlxuICAqIFRyYW5zbWl0cyBkYXRhIHRvIHRoZSBzZXJ2ZXIgb3ZlciB0aGUgV2ViU29ja2V0IGNvbm5lY3Rpb24uXG4gICpcbiAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2ViU29ja2V0I3NlbmQoKVxuICAqL1xuICBzZW5kKGRhdGEpIHtcbiAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuQ0xPU0lORyB8fCB0aGlzLnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5DTE9TRUQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignV2ViU29ja2V0IGlzIGFscmVhZHkgaW4gQ0xPU0lORyBvciBDTE9TRUQgc3RhdGUnKTtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlRXZlbnQgPSBjcmVhdGVNZXNzYWdlRXZlbnQoe1xuICAgICAgdHlwZTogJ21lc3NhZ2UnLFxuICAgICAgb3JpZ2luOiB0aGlzLnVybCxcbiAgICAgIGRhdGFcbiAgICB9KTtcblxuICAgIGNvbnN0IHNlcnZlciA9IG5ldHdvcmtCcmlkZ2Uuc2VydmVyTG9va3VwKHRoaXMudXJsKTtcblxuICAgIGlmIChzZXJ2ZXIpIHtcbiAgICAgIHNlcnZlci5kaXNwYXRjaEV2ZW50KG1lc3NhZ2VFdmVudCwgZGF0YSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgKiBDbG9zZXMgdGhlIFdlYlNvY2tldCBjb25uZWN0aW9uIG9yIGNvbm5lY3Rpb24gYXR0ZW1wdCwgaWYgYW55LlxuICAqIElmIHRoZSBjb25uZWN0aW9uIGlzIGFscmVhZHkgQ0xPU0VELCB0aGlzIG1ldGhvZCBkb2VzIG5vdGhpbmcuXG4gICpcbiAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2ViU29ja2V0I2Nsb3NlKClcbiAgKi9cbiAgY2xvc2UoKSB7XG4gICAgaWYgKHRoaXMucmVhZHlTdGF0ZSAhPT0gV2ViU29ja2V0Lk9QRU4pIHsgcmV0dXJuIHVuZGVmaW5lZDsgfVxuXG4gICAgY29uc3Qgc2VydmVyID0gbmV0d29ya0JyaWRnZS5zZXJ2ZXJMb29rdXAodGhpcy51cmwpO1xuICAgIGNvbnN0IGNsb3NlRXZlbnQgPSBjcmVhdGVDbG9zZUV2ZW50KHtcbiAgICAgIHR5cGU6ICdjbG9zZScsXG4gICAgICB0YXJnZXQ6IHRoaXMsXG4gICAgICBjb2RlOiBDTE9TRV9DT0RFUy5DTE9TRV9OT1JNQUxcbiAgICB9KTtcblxuICAgIG5ldHdvcmtCcmlkZ2UucmVtb3ZlV2ViU29ja2V0KHRoaXMsIHRoaXMudXJsKTtcblxuICAgIHRoaXMucmVhZHlTdGF0ZSA9IFdlYlNvY2tldC5DTE9TRUQ7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KGNsb3NlRXZlbnQpO1xuXG4gICAgaWYgKHNlcnZlcikge1xuICAgICAgc2VydmVyLmRpc3BhdGNoRXZlbnQoY2xvc2VFdmVudCwgc2VydmVyKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuICdmdW5jdGlvbiBXZWJTb2NrZXQoKSB7IFtuYXRpdmUgY29kZV0gfSc7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2ViU29ja2V0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3dlYnNvY2tldC5qcyIsIi8qXG4qIFRoaXMgZGVsYXkgYWxsb3dzIHRoZSB0aHJlYWQgdG8gZmluaXNoIGFzc2lnbmluZyBpdHMgb24qIG1ldGhvZHNcbiogYmVmb3JlIGludm9raW5nIHRoZSBkZWxheSBjYWxsYmFjay4gVGhpcyBpcyBwdXJlbHkgYSB0aW1pbmcgaGFjay5cbiogaHR0cDovL2dlZWthYnl0ZS5ibG9nc3BvdC5jb20vMjAxNC8wMS9qYXZhc2NyaXB0LWVmZmVjdC1vZi1zZXR0aW5nLXNldHRpbWVvdXQuaHRtbFxuKlxuKiBAcGFyYW0ge2NhbGxiYWNrOiBmdW5jdGlvbn0gdGhlIGNhbGxiYWNrIHdoaWNoIHdpbGwgYmUgaW52b2tlZCBhZnRlciB0aGUgdGltZW91dFxuKiBAcGFybWEge2NvbnRleHQ6IG9iamVjdH0gdGhlIGNvbnRleHQgaW4gd2hpY2ggdG8gaW52b2tlIHRoZSBmdW5jdGlvblxuKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlbGF5KGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gIHNldFRpbWVvdXQodGltZW91dENvbnRleHQgPT4gY2FsbGJhY2suY2FsbCh0aW1lb3V0Q29udGV4dCksIDQsIGNvbnRleHQpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2hlbHBlcnMvZGVsYXkuanMiLCJpbXBvcnQgeyByZWplY3QsIGZpbHRlciB9IGZyb20gJy4vaGVscGVycy9hcnJheS1oZWxwZXJzJztcblxuLypcbiogRXZlbnRUYXJnZXQgaXMgYW4gaW50ZXJmYWNlIGltcGxlbWVudGVkIGJ5IG9iamVjdHMgdGhhdCBjYW5cbiogcmVjZWl2ZSBldmVudHMgYW5kIG1heSBoYXZlIGxpc3RlbmVycyBmb3IgdGhlbS5cbipcbiogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0V2ZW50VGFyZ2V0XG4qL1xuY2xhc3MgRXZlbnRUYXJnZXQge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubGlzdGVuZXJzID0ge307XG4gIH1cblxuICAvKlxuICAqIFRpZXMgYSBsaXN0ZW5lciBmdW5jdGlvbiB0byBhIGV2ZW50IHR5cGUgd2hpY2ggY2FuIGxhdGVyIGJlIGludm9rZWQgdmlhIHRoZVxuICAqIGRpc3BhdGNoRXZlbnQgbWV0aG9kLlxuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSB0aGUgdHlwZSBvZiBldmVudCAoaWU6ICdvcGVuJywgJ21lc3NhZ2UnLCBldGMuKVxuICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyIC0gdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGludm9rZSB3aGVuZXZlciBhIGV2ZW50IGlzIGRpc3BhdGNoZWQgbWF0Y2hpbmcgdGhlIGdpdmVuIHR5cGVcbiAgKiBAcGFyYW0ge2Jvb2xlYW59IHVzZUNhcHR1cmUgLSBOL0EgVE9ETzogaW1wbGVtZW50IHVzZUNhcHR1cmUgZnVuY3Rpb25hbGl0eVxuICAqL1xuICBhZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyIC8qICwgdXNlQ2FwdHVyZSAqLykge1xuICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLmxpc3RlbmVyc1t0eXBlXSkpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0gPSBbXTtcbiAgICAgIH1cblxuICAgICAgLy8gT25seSBhZGQgdGhlIHNhbWUgZnVuY3Rpb24gb25jZVxuICAgICAgaWYgKGZpbHRlcih0aGlzLmxpc3RlbmVyc1t0eXBlXSwgaXRlbSA9PiBpdGVtID09PSBsaXN0ZW5lcikubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qXG4gICogUmVtb3ZlcyB0aGUgbGlzdGVuZXIgc28gaXQgd2lsbCBubyBsb25nZXIgYmUgaW52b2tlZCB2aWEgdGhlIGRpc3BhdGNoRXZlbnQgbWV0aG9kLlxuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSB0aGUgdHlwZSBvZiBldmVudCAoaWU6ICdvcGVuJywgJ21lc3NhZ2UnLCBldGMuKVxuICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyIC0gdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGludm9rZSB3aGVuZXZlciBhIGV2ZW50IGlzIGRpc3BhdGNoZWQgbWF0Y2hpbmcgdGhlIGdpdmVuIHR5cGVcbiAgKiBAcGFyYW0ge2Jvb2xlYW59IHVzZUNhcHR1cmUgLSBOL0EgVE9ETzogaW1wbGVtZW50IHVzZUNhcHR1cmUgZnVuY3Rpb25hbGl0eVxuICAqL1xuICByZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIHJlbW92aW5nTGlzdGVuZXIgLyogLCB1c2VDYXB0dXJlICovKSB7XG4gICAgY29uc3QgYXJyYXlPZkxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzW3R5cGVdO1xuICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdID0gcmVqZWN0KGFycmF5T2ZMaXN0ZW5lcnMsIGxpc3RlbmVyID0+IGxpc3RlbmVyID09PSByZW1vdmluZ0xpc3RlbmVyKTtcbiAgfVxuXG4gIC8qXG4gICogSW52b2tlcyBhbGwgbGlzdGVuZXIgZnVuY3Rpb25zIHRoYXQgYXJlIGxpc3RlbmluZyB0byB0aGUgZ2l2ZW4gZXZlbnQudHlwZSBwcm9wZXJ0eS4gRWFjaFxuICAqIGxpc3RlbmVyIHdpbGwgYmUgcGFzc2VkIHRoZSBldmVudCBhcyB0aGUgZmlyc3QgYXJndW1lbnQuXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnQgLSBldmVudCBvYmplY3Qgd2hpY2ggd2lsbCBiZSBwYXNzZWQgdG8gYWxsIGxpc3RlbmVycyBvZiB0aGUgZXZlbnQudHlwZSBwcm9wZXJ0eVxuICAqL1xuICBkaXNwYXRjaEV2ZW50KGV2ZW50LCAuLi5jdXN0b21Bcmd1bWVudHMpIHtcbiAgICBjb25zdCBldmVudE5hbWUgPSBldmVudC50eXBlO1xuICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV07XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkobGlzdGVuZXJzKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGxpc3RlbmVycy5mb3JFYWNoKChsaXN0ZW5lcikgPT4ge1xuICAgICAgaWYgKGN1c3RvbUFyZ3VtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGN1c3RvbUFyZ3VtZW50cyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaXN0ZW5lci5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEV2ZW50VGFyZ2V0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2V2ZW50LXRhcmdldC5qcyIsImV4cG9ydCBmdW5jdGlvbiByZWplY3QoYXJyYXksIGNhbGxiYWNrKSB7XG4gIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgYXJyYXkuZm9yRWFjaCgoaXRlbUluQXJyYXkpID0+IHtcbiAgICBpZiAoIWNhbGxiYWNrKGl0ZW1JbkFycmF5KSkge1xuICAgICAgcmVzdWx0cy5wdXNoKGl0ZW1JbkFycmF5KTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiByZXN1bHRzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyKGFycmF5LCBjYWxsYmFjaykge1xuICBjb25zdCByZXN1bHRzID0gW107XG4gIGFycmF5LmZvckVhY2goKGl0ZW1JbkFycmF5KSA9PiB7XG4gICAgaWYgKGNhbGxiYWNrKGl0ZW1JbkFycmF5KSkge1xuICAgICAgcmVzdWx0cy5wdXNoKGl0ZW1JbkFycmF5KTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiByZXN1bHRzO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2hlbHBlcnMvYXJyYXktaGVscGVycy5qcyIsImltcG9ydCB7IHJlamVjdCB9IGZyb20gJy4vaGVscGVycy9hcnJheS1oZWxwZXJzJztcblxuLypcbiogVGhlIG5ldHdvcmsgYnJpZGdlIGlzIGEgd2F5IGZvciB0aGUgbW9jayB3ZWJzb2NrZXQgb2JqZWN0IHRvICdjb21tdW5pY2F0ZScgd2l0aFxuKiBhbGwgYXZhaWxhYmxlIHNlcnZlcnMuIFRoaXMgaXMgYSBzaW5nbGV0b24gb2JqZWN0IHNvIGl0IGlzIGltcG9ydGFudCB0aGF0IHlvdVxuKiBjbGVhbiB1cCB1cmxNYXAgd2hlbmV2ZXIgeW91IGFyZSBmaW5pc2hlZC5cbiovXG5jbGFzcyBOZXR3b3JrQnJpZGdlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy51cmxNYXAgPSB7fTtcbiAgfVxuXG4gIC8qXG4gICogQXR0YWNoZXMgYSB3ZWJzb2NrZXQgb2JqZWN0IHRvIHRoZSB1cmxNYXAgaGFzaCBzbyB0aGF0IGl0IGNhbiBmaW5kIHRoZSBzZXJ2ZXJcbiAgKiBpdCBpcyBjb25uZWN0ZWQgdG8gYW5kIHRoZSBzZXJ2ZXIgaW4gdHVybiBjYW4gZmluZCBpdC5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSB3ZWJzb2NrZXQgLSB3ZWJzb2NrZXQgb2JqZWN0IHRvIGFkZCB0byB0aGUgdXJsTWFwIGhhc2hcbiAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICovXG4gIGF0dGFjaFdlYlNvY2tldCh3ZWJzb2NrZXQsIHVybCkge1xuICAgIGNvbnN0IGNvbm5lY3Rpb25Mb29rdXAgPSB0aGlzLnVybE1hcFt1cmxdO1xuXG4gICAgaWYgKGNvbm5lY3Rpb25Mb29rdXAgJiZcbiAgICAgICAgY29ubmVjdGlvbkxvb2t1cC5zZXJ2ZXIgJiZcbiAgICAgICAgY29ubmVjdGlvbkxvb2t1cC53ZWJzb2NrZXRzLmluZGV4T2Yod2Vic29ja2V0KSA9PT0gLTEpIHtcbiAgICAgIGNvbm5lY3Rpb25Mb29rdXAud2Vic29ja2V0cy5wdXNoKHdlYnNvY2tldCk7XG4gICAgICByZXR1cm4gY29ubmVjdGlvbkxvb2t1cC5zZXJ2ZXI7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgKiBBdHRhY2hlcyBhIHdlYnNvY2tldCB0byBhIHJvb21cbiAgKi9cbiAgYWRkTWVtYmVyc2hpcFRvUm9vbSh3ZWJzb2NrZXQsIHJvb20pIHtcbiAgICBjb25zdCBjb25uZWN0aW9uTG9va3VwID0gdGhpcy51cmxNYXBbd2Vic29ja2V0LnVybF07XG5cbiAgICBpZiAoY29ubmVjdGlvbkxvb2t1cCAmJlxuICAgICAgICBjb25uZWN0aW9uTG9va3VwLnNlcnZlciAmJlxuICAgICAgICBjb25uZWN0aW9uTG9va3VwLndlYnNvY2tldHMuaW5kZXhPZih3ZWJzb2NrZXQpICE9PSAtMSkge1xuICAgICAgaWYgKCFjb25uZWN0aW9uTG9va3VwLnJvb21NZW1iZXJzaGlwc1tyb29tXSkge1xuICAgICAgICBjb25uZWN0aW9uTG9va3VwLnJvb21NZW1iZXJzaGlwc1tyb29tXSA9IFtdO1xuICAgICAgfVxuXG4gICAgICBjb25uZWN0aW9uTG9va3VwLnJvb21NZW1iZXJzaGlwc1tyb29tXS5wdXNoKHdlYnNvY2tldCk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgKiBBdHRhY2hlcyBhIHNlcnZlciBvYmplY3QgdG8gdGhlIHVybE1hcCBoYXNoIHNvIHRoYXQgaXQgY2FuIGZpbmQgYSB3ZWJzb2NrZXRzXG4gICogd2hpY2ggYXJlIGNvbm5lY3RlZCB0byBpdCBhbmQgc28gdGhhdCB3ZWJzb2NrZXRzIGNhbiBpbiB0dXJuIGNhbiBmaW5kIGl0LlxuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHNlcnZlciAtIHNlcnZlciBvYmplY3QgdG8gYWRkIHRvIHRoZSB1cmxNYXAgaGFzaFxuICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgKi9cbiAgYXR0YWNoU2VydmVyKHNlcnZlciwgdXJsKSB7XG4gICAgY29uc3QgY29ubmVjdGlvbkxvb2t1cCA9IHRoaXMudXJsTWFwW3VybF07XG5cbiAgICBpZiAoIWNvbm5lY3Rpb25Mb29rdXApIHtcbiAgICAgIHRoaXMudXJsTWFwW3VybF0gPSB7XG4gICAgICAgIHNlcnZlcixcbiAgICAgICAgd2Vic29ja2V0czogW10sXG4gICAgICAgIHJvb21NZW1iZXJzaGlwczoge31cbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBzZXJ2ZXI7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgKiBGaW5kcyB0aGUgc2VydmVyIHdoaWNoIGlzICdydW5uaW5nJyBvbiB0aGUgZ2l2ZW4gdXJsLlxuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHVybCAtIHRoZSB1cmwgdG8gdXNlIHRvIGZpbmQgd2hpY2ggc2VydmVyIGlzIHJ1bm5pbmcgb24gaXRcbiAgKi9cbiAgc2VydmVyTG9va3VwKHVybCkge1xuICAgIGNvbnN0IGNvbm5lY3Rpb25Mb29rdXAgPSB0aGlzLnVybE1hcFt1cmxdO1xuXG4gICAgaWYgKGNvbm5lY3Rpb25Mb29rdXApIHtcbiAgICAgIHJldHVybiBjb25uZWN0aW9uTG9va3VwLnNlcnZlcjtcbiAgICB9XG4gIH1cblxuICAvKlxuICAqIEZpbmRzIGFsbCB3ZWJzb2NrZXRzIHdoaWNoIGlzICdsaXN0ZW5pbmcnIG9uIHRoZSBnaXZlbiB1cmwuXG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIC0gdGhlIHVybCB0byB1c2UgdG8gZmluZCBhbGwgd2Vic29ja2V0cyB3aGljaCBhcmUgYXNzb2NpYXRlZCB3aXRoIGl0XG4gICogQHBhcmFtIHtzdHJpbmd9IHJvb20gLSBpZiBhIHJvb20gaXMgcHJvdmlkZWQsIHdpbGwgb25seSByZXR1cm4gc29ja2V0cyBpbiB0aGlzIHJvb21cbiAgKiBAcGFyYW0ge2NsYXNzfSBicm9hZGNhc3RlciAtIHNvY2tldCB0aGF0IGlzIGJyb2FkY2FzdGluZyBhbmQgaXMgdG8gYmUgZXhjbHVkZWQgZnJvbSB0aGUgbG9va3VwXG4gICovXG4gIHdlYnNvY2tldHNMb29rdXAodXJsLCByb29tLCBicm9hZGNhc3Rlcikge1xuICAgIGxldCB3ZWJzb2NrZXRzO1xuICAgIGNvbnN0IGNvbm5lY3Rpb25Mb29rdXAgPSB0aGlzLnVybE1hcFt1cmxdO1xuXG4gICAgd2Vic29ja2V0cyA9IGNvbm5lY3Rpb25Mb29rdXAgPyBjb25uZWN0aW9uTG9va3VwLndlYnNvY2tldHMgOiBbXTtcblxuICAgIGlmIChyb29tKSB7XG4gICAgICBjb25zdCBtZW1iZXJzID0gY29ubmVjdGlvbkxvb2t1cC5yb29tTWVtYmVyc2hpcHNbcm9vbV07XG4gICAgICB3ZWJzb2NrZXRzID0gbWVtYmVycyB8fCBbXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnJvYWRjYXN0ZXIgPyB3ZWJzb2NrZXRzLmZpbHRlcih3ZWJzb2NrZXQgPT4gd2Vic29ja2V0ICE9PSBicm9hZGNhc3RlcikgOiB3ZWJzb2NrZXRzO1xuICB9XG5cbiAgLypcbiAgKiBSZW1vdmVzIHRoZSBlbnRyeSBhc3NvY2lhdGVkIHdpdGggdGhlIHVybC5cbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgKi9cbiAgcmVtb3ZlU2VydmVyKHVybCkge1xuICAgIGRlbGV0ZSB0aGlzLnVybE1hcFt1cmxdO1xuICB9XG5cbiAgLypcbiAgKiBSZW1vdmVzIHRoZSBpbmRpdmlkdWFsIHdlYnNvY2tldCBmcm9tIHRoZSBtYXAgb2YgYXNzb2NpYXRlZCB3ZWJzb2NrZXRzLlxuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHdlYnNvY2tldCAtIHdlYnNvY2tldCBvYmplY3QgdG8gcmVtb3ZlIGZyb20gdGhlIHVybCBtYXBcbiAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICovXG4gIHJlbW92ZVdlYlNvY2tldCh3ZWJzb2NrZXQsIHVybCkge1xuICAgIGNvbnN0IGNvbm5lY3Rpb25Mb29rdXAgPSB0aGlzLnVybE1hcFt1cmxdO1xuXG4gICAgaWYgKGNvbm5lY3Rpb25Mb29rdXApIHtcbiAgICAgIGNvbm5lY3Rpb25Mb29rdXAud2Vic29ja2V0cyA9IHJlamVjdChjb25uZWN0aW9uTG9va3VwLndlYnNvY2tldHMsIHNvY2tldCA9PiBzb2NrZXQgPT09IHdlYnNvY2tldCk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgKiBSZW1vdmVzIGEgd2Vic29ja2V0IGZyb20gYSByb29tXG4gICovXG4gIHJlbW92ZU1lbWJlcnNoaXBGcm9tUm9vbSh3ZWJzb2NrZXQsIHJvb20pIHtcbiAgICBjb25zdCBjb25uZWN0aW9uTG9va3VwID0gdGhpcy51cmxNYXBbd2Vic29ja2V0LnVybF07XG4gICAgY29uc3QgbWVtYmVyc2hpcHMgPSBjb25uZWN0aW9uTG9va3VwLnJvb21NZW1iZXJzaGlwc1tyb29tXTtcblxuICAgIGlmIChjb25uZWN0aW9uTG9va3VwICYmIG1lbWJlcnNoaXBzICE9PSBudWxsKSB7XG4gICAgICBjb25uZWN0aW9uTG9va3VwLnJvb21NZW1iZXJzaGlwc1tyb29tXSA9IHJlamVjdChtZW1iZXJzaGlwcywgc29ja2V0ID0+IHNvY2tldCA9PT0gd2Vic29ja2V0KTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IE5ldHdvcmtCcmlkZ2UoKTsgLy8gTm90ZTogdGhpcyBpcyBhIHNpbmdsZXRvblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL25ldHdvcmstYnJpZGdlLmpzIiwiLypcbiogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0Nsb3NlRXZlbnRcbiovXG5jb25zdCBjb2RlcyA9IHtcbiAgQ0xPU0VfTk9STUFMOiAxMDAwLFxuICBDTE9TRV9HT0lOR19BV0FZOiAxMDAxLFxuICBDTE9TRV9QUk9UT0NPTF9FUlJPUjogMTAwMixcbiAgQ0xPU0VfVU5TVVBQT1JURUQ6IDEwMDMsXG4gIENMT1NFX05PX1NUQVRVUzogMTAwNSxcbiAgQ0xPU0VfQUJOT1JNQUw6IDEwMDYsXG4gIENMT1NFX1VOU1VQUE9SVEVEX0RBVEE6IDEwMDcsXG4gIENMT1NFX1RPT19MQVJHRTogMTAwOSxcbiAgQ0xPU0VfTUlTU0lOR19FWFRFTlNJT046IDEwMTAsXG4gIENMT1NFX0lOVEVSTkFMX0VSUk9SOiAxMDExLFxuICBDTE9TRV9TRVJWSUNFX1JFU1RBUlQ6IDEwMTIsXG4gIENMT1NFX1RSWV9BR0FJTl9MQVRFUjogMTAxMyxcbiAgQ0xPU0VfVExTX0hBTkRTSEFLRTogMTAxNVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29kZXM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaGVscGVycy9jbG9zZS1jb2Rlcy5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vcm1hbGl6ZVVybCh1cmwpIHtcbiAgY29uc3QgcGFydHMgPSB1cmwuc3BsaXQoJzovLycpO1xuICByZXR1cm4gKHBhcnRzWzFdICYmIHBhcnRzWzFdLmluZGV4T2YoJy8nKSA9PT0gLTEpID8gYCR7dXJsfS9gIDogdXJsO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2hlbHBlcnMvbm9ybWFsaXplLXVybC5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvZyhtZXRob2QsIG1lc3NhZ2UpIHtcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuICBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAndGVzdCcpIHtcbiAgICBjb25zb2xlW21ldGhvZF0uY2FsbChudWxsLCBtZXNzYWdlKTtcbiAgfVxuICAvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbnNvbGUgKi9cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9oZWxwZXJzL2xvZ2dlci5qcyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcHJvY2Vzcy9icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgRXZlbnQgZnJvbSAnLi9oZWxwZXJzL2V2ZW50JztcbmltcG9ydCBNZXNzYWdlRXZlbnQgZnJvbSAnLi9oZWxwZXJzL21lc3NhZ2UtZXZlbnQnO1xuaW1wb3J0IENsb3NlRXZlbnQgZnJvbSAnLi9oZWxwZXJzL2Nsb3NlLWV2ZW50JztcblxuLypcbiogQ3JlYXRlcyBhbiBFdmVudCBvYmplY3QgYW5kIGV4dGVuZHMgaXQgdG8gYWxsb3cgZnVsbCBtb2RpZmljYXRpb24gb2ZcbiogaXRzIHByb3BlcnRpZXMuXG4qXG4qIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgLSB3aXRoaW4gY29uZmlnIHlvdSB3aWxsIG5lZWQgdG8gcGFzcyB0eXBlIGFuZCBvcHRpb25hbGx5IHRhcmdldFxuKi9cbmZ1bmN0aW9uIGNyZWF0ZUV2ZW50KGNvbmZpZykge1xuICBjb25zdCB7IHR5cGUsIHRhcmdldCB9ID0gY29uZmlnO1xuICBjb25zdCBldmVudE9iamVjdCA9IG5ldyBFdmVudCh0eXBlKTtcblxuICBpZiAodGFyZ2V0KSB7XG4gICAgZXZlbnRPYmplY3QudGFyZ2V0ID0gdGFyZ2V0O1xuICAgIGV2ZW50T2JqZWN0LnNyY0VsZW1lbnQgPSB0YXJnZXQ7XG4gICAgZXZlbnRPYmplY3QuY3VycmVudFRhcmdldCA9IHRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBldmVudE9iamVjdDtcbn1cblxuLypcbiogQ3JlYXRlcyBhIE1lc3NhZ2VFdmVudCBvYmplY3QgYW5kIGV4dGVuZHMgaXQgdG8gYWxsb3cgZnVsbCBtb2RpZmljYXRpb24gb2ZcbiogaXRzIHByb3BlcnRpZXMuXG4qXG4qIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgLSB3aXRoaW4gY29uZmlnOiB0eXBlLCBvcmlnaW4sIGRhdGEgYW5kIG9wdGlvbmFsbHkgdGFyZ2V0XG4qL1xuZnVuY3Rpb24gY3JlYXRlTWVzc2FnZUV2ZW50KGNvbmZpZykge1xuICBjb25zdCB7IHR5cGUsIG9yaWdpbiwgZGF0YSwgdGFyZ2V0IH0gPSBjb25maWc7XG4gIGNvbnN0IG1lc3NhZ2VFdmVudCA9IG5ldyBNZXNzYWdlRXZlbnQodHlwZSwge1xuICAgIGRhdGEsXG4gICAgb3JpZ2luXG4gIH0pO1xuXG4gIGlmICh0YXJnZXQpIHtcbiAgICBtZXNzYWdlRXZlbnQudGFyZ2V0ID0gdGFyZ2V0O1xuICAgIG1lc3NhZ2VFdmVudC5zcmNFbGVtZW50ID0gdGFyZ2V0O1xuICAgIG1lc3NhZ2VFdmVudC5jdXJyZW50VGFyZ2V0ID0gdGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lc3NhZ2VFdmVudDtcbn1cblxuLypcbiogQ3JlYXRlcyBhIENsb3NlRXZlbnQgb2JqZWN0IGFuZCBleHRlbmRzIGl0IHRvIGFsbG93IGZ1bGwgbW9kaWZpY2F0aW9uIG9mXG4qIGl0cyBwcm9wZXJ0aWVzLlxuKlxuKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIC0gd2l0aGluIGNvbmZpZzogdHlwZSBhbmQgb3B0aW9uYWxseSB0YXJnZXQsIGNvZGUsIGFuZCByZWFzb25cbiovXG5mdW5jdGlvbiBjcmVhdGVDbG9zZUV2ZW50KGNvbmZpZykge1xuICBjb25zdCB7IGNvZGUsIHJlYXNvbiwgdHlwZSwgdGFyZ2V0IH0gPSBjb25maWc7XG4gIGxldCB7IHdhc0NsZWFuIH0gPSBjb25maWc7XG5cbiAgaWYgKCF3YXNDbGVhbikge1xuICAgIHdhc0NsZWFuID0gKGNvZGUgPT09IDEwMDApO1xuICB9XG5cbiAgY29uc3QgY2xvc2VFdmVudCA9IG5ldyBDbG9zZUV2ZW50KHR5cGUsIHtcbiAgICBjb2RlLFxuICAgIHJlYXNvbixcbiAgICB3YXNDbGVhblxuICB9KTtcblxuICBpZiAodGFyZ2V0KSB7XG4gICAgY2xvc2VFdmVudC50YXJnZXQgPSB0YXJnZXQ7XG4gICAgY2xvc2VFdmVudC5zcmNFbGVtZW50ID0gdGFyZ2V0O1xuICAgIGNsb3NlRXZlbnQuY3VycmVudFRhcmdldCA9IHRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBjbG9zZUV2ZW50O1xufVxuXG5leHBvcnQge1xuICBjcmVhdGVFdmVudCxcbiAgY3JlYXRlTWVzc2FnZUV2ZW50LFxuICBjcmVhdGVDbG9zZUV2ZW50XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2V2ZW50LWZhY3RvcnkuanMiLCJpbXBvcnQgRXZlbnRQcm90b3R5cGUgZnJvbSAnLi9ldmVudC1wcm90b3R5cGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudCBleHRlbmRzIEV2ZW50UHJvdG90eXBlIHtcbiAgY29uc3RydWN0b3IodHlwZSwgZXZlbnRJbml0Q29uZmlnID0ge30pIHtcbiAgICBzdXBlcigpO1xuXG4gICAgaWYgKCF0eXBlKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGYWlsZWQgdG8gY29uc3RydWN0IFxcJ0V2ZW50XFwnOiAxIGFyZ3VtZW50IHJlcXVpcmVkLCBidXQgb25seSAwIHByZXNlbnQuJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBldmVudEluaXRDb25maWcgIT09ICdvYmplY3QnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGYWlsZWQgdG8gY29uc3RydWN0IFxcJ0V2ZW50XFwnOiBwYXJhbWV0ZXIgMiAoXFwnZXZlbnRJbml0RGljdFxcJykgaXMgbm90IGFuIG9iamVjdCcpO1xuICAgIH1cblxuICAgIGNvbnN0IHsgYnViYmxlcywgY2FuY2VsYWJsZSB9ID0gZXZlbnRJbml0Q29uZmlnO1xuXG4gICAgdGhpcy50eXBlID0gU3RyaW5nKHR5cGUpO1xuICAgIHRoaXMudGltZVN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLnRhcmdldCA9IG51bGw7XG4gICAgdGhpcy5zcmNFbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLnJldHVyblZhbHVlID0gdHJ1ZTtcbiAgICB0aGlzLmlzVHJ1c3RlZCA9IGZhbHNlO1xuICAgIHRoaXMuZXZlbnRQaGFzZSA9IDA7XG4gICAgdGhpcy5kZWZhdWx0UHJldmVudGVkID0gZmFsc2U7XG4gICAgdGhpcy5jdXJyZW50VGFyZ2V0ID0gbnVsbDtcbiAgICB0aGlzLmNhbmNlbGFibGUgPSBjYW5jZWxhYmxlID8gQm9vbGVhbihjYW5jZWxhYmxlKSA6IGZhbHNlO1xuICAgIHRoaXMuY2FubmNlbEJ1YmJsZSA9IGZhbHNlO1xuICAgIHRoaXMuYnViYmxlcyA9IGJ1YmJsZXMgPyBCb29sZWFuKGJ1YmJsZXMpIDogZmFsc2U7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9oZWxwZXJzL2V2ZW50LmpzIiwiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudFByb3RvdHlwZSB7XG4gIC8vIE5vb3BzXG4gIHN0b3BQcm9wYWdhdGlvbigpIHt9XG4gIHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpIHt9XG5cbiAgLy8gaWYgbm8gYXJndW1lbnRzIGFyZSBwYXNzZWQgdGhlbiB0aGUgdHlwZSBpcyBzZXQgdG8gXCJ1bmRlZmluZWRcIiBvblxuICAvLyBjaHJvbWUgYW5kIHNhZmFyaS5cbiAgaW5pdEV2ZW50KHR5cGUgPSAndW5kZWZpbmVkJywgYnViYmxlcyA9IGZhbHNlLCBjYW5jZWxhYmxlID0gZmFsc2UpIHtcbiAgICB0aGlzLnR5cGUgPSBTdHJpbmcodHlwZSk7XG4gICAgdGhpcy5idWJibGVzID0gQm9vbGVhbihidWJibGVzKTtcbiAgICB0aGlzLmNhbmNlbGFibGUgPSBCb29sZWFuKGNhbmNlbGFibGUpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaGVscGVycy9ldmVudC1wcm90b3R5cGUuanMiLCJpbXBvcnQgRXZlbnRQcm90b3R5cGUgZnJvbSAnLi9ldmVudC1wcm90b3R5cGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXNzYWdlRXZlbnQgZXh0ZW5kcyBFdmVudFByb3RvdHlwZSB7XG4gIGNvbnN0cnVjdG9yKHR5cGUsIGV2ZW50SW5pdENvbmZpZyA9IHt9KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGlmICghdHlwZSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRmFpbGVkIHRvIGNvbnN0cnVjdCBcXCdNZXNzYWdlRXZlbnRcXCc6IDEgYXJndW1lbnQgcmVxdWlyZWQsIGJ1dCBvbmx5IDAgcHJlc2VudC4nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGV2ZW50SW5pdENvbmZpZyAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ZhaWxlZCB0byBjb25zdHJ1Y3QgXFwnTWVzc2FnZUV2ZW50XFwnOiBwYXJhbWV0ZXIgMiAoXFwnZXZlbnRJbml0RGljdFxcJykgaXMgbm90IGFuIG9iamVjdCcpO1xuICAgIH1cblxuICAgIGNvbnN0IHtcbiAgICAgIGJ1YmJsZXMsXG4gICAgICBjYW5jZWxhYmxlLFxuICAgICAgZGF0YSxcbiAgICAgIG9yaWdpbixcbiAgICAgIGxhc3RFdmVudElkLFxuICAgICAgcG9ydHNcbiAgICB9ID0gZXZlbnRJbml0Q29uZmlnO1xuXG4gICAgdGhpcy50eXBlID0gU3RyaW5nKHR5cGUpO1xuICAgIHRoaXMudGltZVN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLnRhcmdldCA9IG51bGw7XG4gICAgdGhpcy5zcmNFbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLnJldHVyblZhbHVlID0gdHJ1ZTtcbiAgICB0aGlzLmlzVHJ1c3RlZCA9IGZhbHNlO1xuICAgIHRoaXMuZXZlbnRQaGFzZSA9IDA7XG4gICAgdGhpcy5kZWZhdWx0UHJldmVudGVkID0gZmFsc2U7XG4gICAgdGhpcy5jdXJyZW50VGFyZ2V0ID0gbnVsbDtcbiAgICB0aGlzLmNhbmNlbGFibGUgPSBjYW5jZWxhYmxlID8gQm9vbGVhbihjYW5jZWxhYmxlKSA6IGZhbHNlO1xuICAgIHRoaXMuY2FubmNlbEJ1YmJsZSA9IGZhbHNlO1xuICAgIHRoaXMuYnViYmxlcyA9IGJ1YmJsZXMgPyBCb29sZWFuKGJ1YmJsZXMpIDogZmFsc2U7XG4gICAgdGhpcy5vcmlnaW4gPSBvcmlnaW4gPyBTdHJpbmcob3JpZ2luKSA6ICcnO1xuICAgIHRoaXMucG9ydHMgPSB0eXBlb2YgcG9ydHMgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IHBvcnRzO1xuICAgIHRoaXMuZGF0YSA9IHR5cGVvZiBkYXRhID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiBkYXRhO1xuICAgIHRoaXMubGFzdEV2ZW50SWQgPSBsYXN0RXZlbnRJZCA/IFN0cmluZyhsYXN0RXZlbnRJZCkgOiAnJztcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2hlbHBlcnMvbWVzc2FnZS1ldmVudC5qcyIsImltcG9ydCBFdmVudFByb3RvdHlwZSBmcm9tICcuL2V2ZW50LXByb3RvdHlwZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsb3NlRXZlbnQgZXh0ZW5kcyBFdmVudFByb3RvdHlwZSB7XG4gIGNvbnN0cnVjdG9yKHR5cGUsIGV2ZW50SW5pdENvbmZpZyA9IHt9KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGlmICghdHlwZSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRmFpbGVkIHRvIGNvbnN0cnVjdCBcXCdDbG9zZUV2ZW50XFwnOiAxIGFyZ3VtZW50IHJlcXVpcmVkLCBidXQgb25seSAwIHByZXNlbnQuJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBldmVudEluaXRDb25maWcgIT09ICdvYmplY3QnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGYWlsZWQgdG8gY29uc3RydWN0IFxcJ0Nsb3NlRXZlbnRcXCc6IHBhcmFtZXRlciAyIChcXCdldmVudEluaXREaWN0XFwnKSBpcyBub3QgYW4gb2JqZWN0Jyk7XG4gICAgfVxuXG4gICAgY29uc3Qge1xuICAgICAgYnViYmxlcyxcbiAgICAgIGNhbmNlbGFibGUsXG4gICAgICBjb2RlLFxuICAgICAgcmVhc29uLFxuICAgICAgd2FzQ2xlYW5cbiAgICB9ID0gZXZlbnRJbml0Q29uZmlnO1xuXG4gICAgdGhpcy50eXBlID0gU3RyaW5nKHR5cGUpO1xuICAgIHRoaXMudGltZVN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLnRhcmdldCA9IG51bGw7XG4gICAgdGhpcy5zcmNFbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLnJldHVyblZhbHVlID0gdHJ1ZTtcbiAgICB0aGlzLmlzVHJ1c3RlZCA9IGZhbHNlO1xuICAgIHRoaXMuZXZlbnRQaGFzZSA9IDA7XG4gICAgdGhpcy5kZWZhdWx0UHJldmVudGVkID0gZmFsc2U7XG4gICAgdGhpcy5jdXJyZW50VGFyZ2V0ID0gbnVsbDtcbiAgICB0aGlzLmNhbmNlbGFibGUgPSBjYW5jZWxhYmxlID8gQm9vbGVhbihjYW5jZWxhYmxlKSA6IGZhbHNlO1xuICAgIHRoaXMuY2FubmNlbEJ1YmJsZSA9IGZhbHNlO1xuICAgIHRoaXMuYnViYmxlcyA9IGJ1YmJsZXMgPyBCb29sZWFuKGJ1YmJsZXMpIDogZmFsc2U7XG4gICAgdGhpcy5jb2RlID0gdHlwZW9mIGNvZGUgPT09ICdudW1iZXInID8gTnVtYmVyKGNvZGUpIDogMDtcbiAgICB0aGlzLnJlYXNvbiA9IHJlYXNvbiA/IFN0cmluZyhyZWFzb24pIDogJyc7XG4gICAgdGhpcy53YXNDbGVhbiA9IHdhc0NsZWFuID8gQm9vbGVhbih3YXNDbGVhbikgOiBmYWxzZTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2hlbHBlcnMvY2xvc2UtZXZlbnQuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub3JtYWxpemVQcm90b2NvbChwcm90b2NvbCA9ICcnKSB7XG4gIGxldCBhY3RpdmVQcm90b2NvbCA9IHByb3RvY29sO1xuXG4gIGlmIChBcnJheS5pc0FycmF5KHByb3RvY29sKSkge1xuICAgIGlmIChwcm90b2NvbC5sZW5ndGggPiAwKSB7XG4gICAgICBhY3RpdmVQcm90b2NvbCA9IHByb3RvY29sWzBdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGFjdGl2ZVByb3RvY29sID0gJyc7XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiBhY3RpdmVQcm90b2NvbCA9PT0gJ3N5bWJvbCcpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCBhIFN5bWJvbCB2YWx1ZSB0byBhIHN0cmluZycpO1xuICB9XG5cbiAgaWYgKFN0cmluZyhhY3RpdmVQcm90b2NvbCkuaW5jbHVkZXMoJyAnKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGNvbnN0cnVjdCAnV2ViU29ja2V0JzogVGhlIHN1YnByb3RvY29sICcke1N0cmluZyhhY3RpdmVQcm90b2NvbCkuaW5jbHVkZXMoJyAnKX0nIGlzIGludmFsaWRgKTsgLy8gVE9ETyBTaG91bGQgYmUgRE9NRXhjZXB0aW9uXG4gIH1cblxuICByZXR1cm4gYWN0aXZlUHJvdG9jb2w7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMvbm9ybWFsaXplLXByb3RvY29sLmpzIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmV0cmlldmVHbG9iYWxPYmplY3QoKSB7XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiB3aW5kb3c7XG4gIH1cblxuICByZXR1cm4gKHR5cGVvZiBwcm9jZXNzID09PSAnb2JqZWN0JyAmJlxuICAgICAgdHlwZW9mIHJlcXVpcmUgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIHR5cGVvZiBnbG9iYWwgPT09ICdvYmplY3QnKSA/IGdsb2JhbCA6IHRoaXM7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaGVscGVycy9nbG9iYWwtb2JqZWN0LmpzIiwiaW1wb3J0IGRlbGF5IGZyb20gJy4vaGVscGVycy9kZWxheSc7XG5pbXBvcnQgRXZlbnRUYXJnZXQgZnJvbSAnLi9ldmVudC10YXJnZXQnO1xuaW1wb3J0IG5ldHdvcmtCcmlkZ2UgZnJvbSAnLi9uZXR3b3JrLWJyaWRnZSc7XG5pbXBvcnQgQ0xPU0VfQ09ERVMgZnJvbSAnLi9oZWxwZXJzL2Nsb3NlLWNvZGVzJztcbmltcG9ydCBub3JtYWxpemUgZnJvbSAnLi9oZWxwZXJzL25vcm1hbGl6ZS11cmwnO1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuL2hlbHBlcnMvbG9nZ2VyJztcbmltcG9ydCB7IGNyZWF0ZUV2ZW50LCBjcmVhdGVNZXNzYWdlRXZlbnQsIGNyZWF0ZUNsb3NlRXZlbnQgfSBmcm9tICcuL2V2ZW50LWZhY3RvcnknO1xuXG4vKlxuKiBUaGUgc29ja2V0LWlvIGNsYXNzIGlzIGRlc2lnbmVkIHRvIG1pbWljayB0aGUgcmVhbCBBUEkgYXMgY2xvc2VseSBhcyBwb3NzaWJsZS5cbipcbiogaHR0cDovL3NvY2tldC5pby9kb2NzL1xuKi9cbmNsYXNzIFNvY2tldElPIGV4dGVuZHMgRXZlbnRUYXJnZXQge1xuICAvKlxuICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgKi9cbiAgY29uc3RydWN0b3IodXJsID0gJ3NvY2tldC5pbycsIHByb3RvY29sID0gJycpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5iaW5hcnlUeXBlID0gJ2Jsb2InO1xuICAgIHRoaXMudXJsID0gbm9ybWFsaXplKHVybCk7XG4gICAgdGhpcy5yZWFkeVN0YXRlID0gU29ja2V0SU8uQ09OTkVDVElORztcbiAgICB0aGlzLnByb3RvY29sID0gJyc7XG5cbiAgICBpZiAodHlwZW9mIHByb3RvY29sID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5wcm90b2NvbCA9IHByb3RvY29sO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShwcm90b2NvbCkgJiYgcHJvdG9jb2wubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5wcm90b2NvbCA9IHByb3RvY29sWzBdO1xuICAgIH1cblxuICAgIGNvbnN0IHNlcnZlciA9IG5ldHdvcmtCcmlkZ2UuYXR0YWNoV2ViU29ja2V0KHRoaXMsIHRoaXMudXJsKTtcblxuICAgIC8qXG4gICAgKiBEZWxheSB0cmlnZ2VyaW5nIHRoZSBjb25uZWN0aW9uIGV2ZW50cyBzbyB0aGV5IGNhbiBiZSBkZWZpbmVkIGluIHRpbWUuXG4gICAgKi9cbiAgICBkZWxheShmdW5jdGlvbiBkZWxheUNhbGxiYWNrKCkge1xuICAgICAgaWYgKHNlcnZlcikge1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBTb2NrZXRJTy5PUEVOO1xuICAgICAgICBzZXJ2ZXIuZGlzcGF0Y2hFdmVudChjcmVhdGVFdmVudCh7IHR5cGU6ICdjb25uZWN0aW9uJyB9KSwgc2VydmVyLCB0aGlzKTtcbiAgICAgICAgc2VydmVyLmRpc3BhdGNoRXZlbnQoY3JlYXRlRXZlbnQoeyB0eXBlOiAnY29ubmVjdCcgfSksIHNlcnZlciwgdGhpcyk7IC8vIGFsaWFzXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChjcmVhdGVFdmVudCh7IHR5cGU6ICdjb25uZWN0JywgdGFyZ2V0OiB0aGlzIH0pKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFNvY2tldElPLkNMT1NFRDtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGNyZWF0ZUV2ZW50KHsgdHlwZTogJ2Vycm9yJywgdGFyZ2V0OiB0aGlzIH0pKTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGNyZWF0ZUNsb3NlRXZlbnQoe1xuICAgICAgICAgIHR5cGU6ICdjbG9zZScsXG4gICAgICAgICAgdGFyZ2V0OiB0aGlzLFxuICAgICAgICAgIGNvZGU6IENMT1NFX0NPREVTLkNMT1NFX05PUk1BTFxuICAgICAgICB9KSk7XG5cbiAgICAgICAgbG9nZ2VyKCdlcnJvcicsIGBTb2NrZXQuaW8gY29ubmVjdGlvbiB0byAnJHt0aGlzLnVybH0nIGZhaWxlZGApO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuXG4gICAgLyoqXG4gICAgICBBZGQgYW4gYWxpYXNlZCBldmVudCBsaXN0ZW5lciBmb3IgY2xvc2UgLyBkaXNjb25uZWN0XG4gICAgICovXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsIChldmVudCkgPT4ge1xuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGNyZWF0ZUNsb3NlRXZlbnQoe1xuICAgICAgICB0eXBlOiAnZGlzY29ubmVjdCcsXG4gICAgICAgIHRhcmdldDogZXZlbnQudGFyZ2V0LFxuICAgICAgICBjb2RlOiBldmVudC5jb2RlXG4gICAgICB9KSk7XG4gICAgfSk7XG4gIH1cblxuICAvKlxuICAqIENsb3NlcyB0aGUgU29ja2V0SU8gY29ubmVjdGlvbiBvciBjb25uZWN0aW9uIGF0dGVtcHQsIGlmIGFueS5cbiAgKiBJZiB0aGUgY29ubmVjdGlvbiBpcyBhbHJlYWR5IENMT1NFRCwgdGhpcyBtZXRob2QgZG9lcyBub3RoaW5nLlxuICAqL1xuICBjbG9zZSgpIHtcbiAgICBpZiAodGhpcy5yZWFkeVN0YXRlICE9PSBTb2NrZXRJTy5PUEVOKSB7IHJldHVybiB1bmRlZmluZWQ7IH1cblxuICAgIGNvbnN0IHNlcnZlciA9IG5ldHdvcmtCcmlkZ2Uuc2VydmVyTG9va3VwKHRoaXMudXJsKTtcbiAgICBuZXR3b3JrQnJpZGdlLnJlbW92ZVdlYlNvY2tldCh0aGlzLCB0aGlzLnVybCk7XG5cbiAgICB0aGlzLnJlYWR5U3RhdGUgPSBTb2NrZXRJTy5DTE9TRUQ7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KGNyZWF0ZUNsb3NlRXZlbnQoe1xuICAgICAgdHlwZTogJ2Nsb3NlJyxcbiAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgIGNvZGU6IENMT1NFX0NPREVTLkNMT1NFX05PUk1BTFxuICAgIH0pKTtcblxuICAgIGlmIChzZXJ2ZXIpIHtcbiAgICAgIHNlcnZlci5kaXNwYXRjaEV2ZW50KGNyZWF0ZUNsb3NlRXZlbnQoe1xuICAgICAgICB0eXBlOiAnZGlzY29ubmVjdCcsXG4gICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgY29kZTogQ0xPU0VfQ09ERVMuQ0xPU0VfTk9STUFMXG4gICAgICB9KSwgc2VydmVyKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAqIEFsaWFzIGZvciBTb2NrZXQjY2xvc2VcbiAgKlxuICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9zb2NrZXRpby9zb2NrZXQuaW8tY2xpZW50L2Jsb2IvbWFzdGVyL2xpYi9zb2NrZXQuanMjTDM4M1xuICAqL1xuICBkaXNjb25uZWN0KCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIC8qXG4gICogU3VibWl0cyBhbiBldmVudCB0byB0aGUgc2VydmVyIHdpdGggYSBwYXlsb2FkXG4gICovXG4gIGVtaXQoZXZlbnQsIC4uLmRhdGEpIHtcbiAgICBpZiAodGhpcy5yZWFkeVN0YXRlICE9PSBTb2NrZXRJTy5PUEVOKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvY2tldElPIGlzIGFscmVhZHkgaW4gQ0xPU0lORyBvciBDTE9TRUQgc3RhdGUnKTtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlRXZlbnQgPSBjcmVhdGVNZXNzYWdlRXZlbnQoe1xuICAgICAgdHlwZTogZXZlbnQsXG4gICAgICBvcmlnaW46IHRoaXMudXJsLFxuICAgICAgZGF0YVxuICAgIH0pO1xuXG4gICAgY29uc3Qgc2VydmVyID0gbmV0d29ya0JyaWRnZS5zZXJ2ZXJMb29rdXAodGhpcy51cmwpO1xuXG4gICAgaWYgKHNlcnZlcikge1xuICAgICAgc2VydmVyLmRpc3BhdGNoRXZlbnQobWVzc2FnZUV2ZW50LCAuLi5kYXRhKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAqIFN1Ym1pdHMgYSAnbWVzc2FnZScgZXZlbnQgdG8gdGhlIHNlcnZlci5cbiAgKlxuICAqIFNob3VsZCBiZWhhdmUgZXhhY3RseSBsaWtlIFdlYlNvY2tldCNzZW5kXG4gICpcbiAgKiBodHRwczovL2dpdGh1Yi5jb20vc29ja2V0aW8vc29ja2V0LmlvLWNsaWVudC9ibG9iL21hc3Rlci9saWIvc29ja2V0LmpzI0wxMTNcbiAgKi9cbiAgc2VuZChkYXRhKSB7XG4gICAgdGhpcy5lbWl0KCdtZXNzYWdlJywgZGF0YSk7XG4gIH1cblxuICAvKlxuICAqIEZvciBicm9hZGNhc3RpbmcgZXZlbnRzIHRvIG90aGVyIGNvbm5lY3RlZCBzb2NrZXRzLlxuICAqXG4gICogZS5nLiBzb2NrZXQuYnJvYWRjYXN0LmVtaXQoJ2hpIScpO1xuICAqIGUuZy4gc29ja2V0LmJyb2FkY2FzdC50bygnbXktcm9vbScpLmVtaXQoJ2hpIScpO1xuICAqL1xuICBnZXQgYnJvYWRjYXN0KCkge1xuICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgIT09IFNvY2tldElPLk9QRU4pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU29ja2V0SU8gaXMgYWxyZWFkeSBpbiBDTE9TSU5HIG9yIENMT1NFRCBzdGF0ZScpO1xuICAgIH1cblxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGNvbnN0IHNlcnZlciA9IG5ldHdvcmtCcmlkZ2Uuc2VydmVyTG9va3VwKHRoaXMudXJsKTtcbiAgICBpZiAoIXNlcnZlcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBTb2NrZXRJTyBjYW4gbm90IGZpbmQgYSBzZXJ2ZXIgYXQgdGhlIHNwZWNpZmllZCBVUkwgKCR7dGhpcy51cmx9KWApO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBlbWl0KGV2ZW50LCBkYXRhKSB7XG4gICAgICAgIHNlcnZlci5lbWl0KGV2ZW50LCBkYXRhLCB7IHdlYnNvY2tldHM6IG5ldHdvcmtCcmlkZ2Uud2Vic29ja2V0c0xvb2t1cChzZWxmLnVybCwgbnVsbCwgc2VsZikgfSk7XG4gICAgICB9LFxuICAgICAgdG8ocm9vbSkge1xuICAgICAgICByZXR1cm4gc2VydmVyLnRvKHJvb20sIHNlbGYpO1xuICAgICAgfSxcbiAgICAgIGluKHJvb20pIHtcbiAgICAgICAgcmV0dXJuIHNlcnZlci5pbihyb29tLCBzZWxmKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLypcbiAgKiBGb3IgcmVnaXN0ZXJpbmcgZXZlbnRzIHRvIGJlIHJlY2VpdmVkIGZyb20gdGhlIHNlcnZlclxuICAqL1xuICBvbih0eXBlLCBjYWxsYmFjaykge1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjayk7XG4gIH1cblxuICAvKlxuICAgKiBKb2luIGEgcm9vbSBvbiBhIHNlcnZlclxuICAgKlxuICAgKiBodHRwOi8vc29ja2V0LmlvL2RvY3Mvcm9vbXMtYW5kLW5hbWVzcGFjZXMvI2pvaW5pbmctYW5kLWxlYXZpbmdcbiAgICovXG4gIGpvaW4ocm9vbSkge1xuICAgIG5ldHdvcmtCcmlkZ2UuYWRkTWVtYmVyc2hpcFRvUm9vbSh0aGlzLCByb29tKTtcbiAgfVxuXG4gIC8qXG4gICAqIEdldCB0aGUgd2Vic29ja2V0IHRvIGxlYXZlIHRoZSByb29tXG4gICAqXG4gICAqIGh0dHA6Ly9zb2NrZXQuaW8vZG9jcy9yb29tcy1hbmQtbmFtZXNwYWNlcy8jam9pbmluZy1hbmQtbGVhdmluZ1xuICAgKi9cbiAgbGVhdmUocm9vbSkge1xuICAgIG5ldHdvcmtCcmlkZ2UucmVtb3ZlTWVtYmVyc2hpcEZyb21Sb29tKHRoaXMsIHJvb20pO1xuICB9XG5cbiAgLypcbiAgICogSW52b2tlcyBhbGwgbGlzdGVuZXIgZnVuY3Rpb25zIHRoYXQgYXJlIGxpc3RlbmluZyB0byB0aGUgZ2l2ZW4gZXZlbnQudHlwZSBwcm9wZXJ0eS4gRWFjaFxuICAgKiBsaXN0ZW5lciB3aWxsIGJlIHBhc3NlZCB0aGUgZXZlbnQgYXMgdGhlIGZpcnN0IGFyZ3VtZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnQgLSBldmVudCBvYmplY3Qgd2hpY2ggd2lsbCBiZSBwYXNzZWQgdG8gYWxsIGxpc3RlbmVycyBvZiB0aGUgZXZlbnQudHlwZSBwcm9wZXJ0eVxuICAgKi9cbiAgZGlzcGF0Y2hFdmVudChldmVudCwgLi4uY3VzdG9tQXJndW1lbnRzKSB7XG4gICAgY29uc3QgZXZlbnROYW1lID0gZXZlbnQudHlwZTtcbiAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdO1xuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGxpc3RlbmVycykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBsaXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIpID0+IHtcbiAgICAgIGlmIChjdXN0b21Bcmd1bWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBjdXN0b21Bcmd1bWVudHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUmVndWxhciBXZWJTb2NrZXRzIGV4cGVjdCBhIE1lc3NhZ2VFdmVudCBidXQgU29ja2V0aW8uaW8ganVzdCB3YW50cyByYXcgZGF0YVxuICAgICAgICAvLyAgcGF5bG9hZCBpbnN0YW5jZW9mIE1lc3NhZ2VFdmVudCB3b3JrcywgYnV0IHlvdSBjYW4ndCBpc250YW5jZSBvZiBOb2RlRXZlbnRcbiAgICAgICAgLy8gIGZvciBub3cgd2UgZGV0ZWN0IGlmIHRoZSBvdXRwdXQgaGFzIGRhdGEgZGVmaW5lZCBvbiBpdFxuICAgICAgICBsaXN0ZW5lci5jYWxsKHRoaXMsIGV2ZW50LmRhdGEgPyBldmVudC5kYXRhIDogZXZlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cblNvY2tldElPLkNPTk5FQ1RJTkcgPSAwO1xuU29ja2V0SU8uT1BFTiA9IDE7XG5Tb2NrZXRJTy5DTE9TSU5HID0gMjtcblNvY2tldElPLkNMT1NFRCA9IDM7XG5cbi8qXG4qIFN0YXRpYyBjb25zdHJ1Y3RvciBtZXRob2RzIGZvciB0aGUgSU8gU29ja2V0XG4qL1xuY29uc3QgSU8gPSBmdW5jdGlvbiBpb0NvbnN0cnVjdG9yKHVybCkge1xuICByZXR1cm4gbmV3IFNvY2tldElPKHVybCk7XG59O1xuXG4vKlxuKiBBbGlhcyB0aGUgcmF3IElPKCkgY29uc3RydWN0b3JcbiovXG5JTy5jb25uZWN0ID0gZnVuY3Rpb24gaW9Db25uZWN0KHVybCkge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBuZXctY2FwICovXG4gIHJldHVybiBJTyh1cmwpO1xuICAvKiBlc2xpbnQtZW5hYmxlIG5ldy1jYXAgKi9cbn07XG5cbmV4cG9ydCBkZWZhdWx0IElPO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NvY2tldC1pby5qcyJdLCJzb3VyY2VSb290IjoiIn0=