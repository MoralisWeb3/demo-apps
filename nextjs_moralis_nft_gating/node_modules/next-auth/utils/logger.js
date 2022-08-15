"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.proxyLogger = proxyLogger;
exports.setLogger = setLogger;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _errors = require("../core/errors");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function formatError(o) {
  if (o instanceof Error && !(o instanceof _errors.UnknownError)) {
    return {
      message: o.message,
      stack: o.stack,
      name: o.name
    };
  }

  if (hasErrorProperty(o)) {
    var _o$message;

    o.error = formatError(o.error);
    o.message = (_o$message = o.message) !== null && _o$message !== void 0 ? _o$message : o.error.message;
  }

  return o;
}

function hasErrorProperty(x) {
  return !!(x !== null && x !== void 0 && x.error);
}

var _logger = {
  error: function error(code, metadata) {
    metadata = formatError(metadata);
    console.error("[next-auth][error][".concat(code, "]"), "\nhttps://next-auth.js.org/errors#".concat(code.toLowerCase()), metadata.message, metadata);
  },
  warn: function warn(code) {
    console.warn("[next-auth][warn][".concat(code, "]"), "\nhttps://next-auth.js.org/warnings#".concat(code.toLowerCase()));
  },
  debug: function debug(code, metadata) {
    console.log("[next-auth][debug][".concat(code, "]"), metadata);
  }
};

function setLogger() {
  var newLogger = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var debug = arguments.length > 1 ? arguments[1] : undefined;
  if (!debug) _logger.debug = function () {};
  if (newLogger.error) _logger.error = newLogger.error;
  if (newLogger.warn) _logger.warn = newLogger.warn;
  if (newLogger.debug) _logger.debug = newLogger.debug;
}

var _default = _logger;
exports.default = _default;

function proxyLogger() {
  var logger = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _logger;
  var basePath = arguments.length > 1 ? arguments[1] : undefined;

  try {
    if (typeof window === "undefined") {
      return logger;
    }

    var clientLogger = {};

    var _loop = function _loop(level) {
      clientLogger[level] = function (code, metadata) {
        _logger[level](code, metadata);

        if (level === "error") {
          metadata = formatError(metadata);
        }

        ;
        metadata.client = true;
        var url = "".concat(basePath, "/_log");
        var body = new URLSearchParams(_objectSpread({
          level: level,
          code: code
        }, metadata));

        if (navigator.sendBeacon) {
          return navigator.sendBeacon(url, body);
        }

        return fetch(url, {
          method: "POST",
          body: body,
          keepalive: true
        });
      };
    };

    for (var level in logger) {
      _loop(level);
    }

    return clientLogger;
  } catch (_unused) {
    return _logger;
  }
}