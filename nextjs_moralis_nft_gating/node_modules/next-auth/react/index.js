"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  useSession: true,
  getSession: true,
  getCsrfToken: true,
  getProviders: true,
  signIn: true,
  signOut: true,
  SessionProvider: true
};
exports.SessionProvider = SessionProvider;
exports.getCsrfToken = getCsrfToken;
exports.getProviders = getProviders;
exports.getSession = getSession;
exports.signIn = signIn;
exports.signOut = signOut;
exports.useSession = useSession;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var React = _interopRequireWildcard(require("react"));

var _logger2 = _interopRequireWildcard(require("../utils/logger"));

var _parseUrl = _interopRequireDefault(require("../utils/parse-url"));

var _utils = require("../client/_utils");

var _jsxRuntime = require("react/jsx-runtime");

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _types[key];
    }
  });
});

var _process$env$NEXTAUTH, _ref, _process$env$NEXTAUTH2, _process$env$NEXTAUTH3;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var __NEXTAUTH = {
  baseUrl: (0, _parseUrl.default)((_process$env$NEXTAUTH = process.env.NEXTAUTH_URL) !== null && _process$env$NEXTAUTH !== void 0 ? _process$env$NEXTAUTH : process.env.VERCEL_URL).origin,
  basePath: (0, _parseUrl.default)(process.env.NEXTAUTH_URL).path,
  baseUrlServer: (0, _parseUrl.default)((_ref = (_process$env$NEXTAUTH2 = process.env.NEXTAUTH_URL_INTERNAL) !== null && _process$env$NEXTAUTH2 !== void 0 ? _process$env$NEXTAUTH2 : process.env.NEXTAUTH_URL) !== null && _ref !== void 0 ? _ref : process.env.VERCEL_URL).origin,
  basePathServer: (0, _parseUrl.default)((_process$env$NEXTAUTH3 = process.env.NEXTAUTH_URL_INTERNAL) !== null && _process$env$NEXTAUTH3 !== void 0 ? _process$env$NEXTAUTH3 : process.env.NEXTAUTH_URL).path,
  _lastSync: 0,
  _session: undefined,
  _getSession: function _getSession() {}
};
var broadcast = (0, _utils.BroadcastChannel)();
var logger = (0, _logger2.proxyLogger)(_logger2.default, __NEXTAUTH.basePath);
var SessionContext = React.createContext(undefined);

function useSession(options) {
  var value = React.useContext(SessionContext);

  if (!value && process.env.NODE_ENV !== "production") {
    throw new Error("[next-auth]: `useSession` must be wrapped in a <SessionProvider />");
  }

  var _ref2 = options !== null && options !== void 0 ? options : {},
      required = _ref2.required,
      onUnauthenticated = _ref2.onUnauthenticated;

  var requiredAndNotLoading = required && value.status === "unauthenticated";
  React.useEffect(function () {
    if (requiredAndNotLoading) {
      var url = "/api/auth/signin?".concat(new URLSearchParams({
        error: "SessionRequired",
        callbackUrl: window.location.href
      }));
      if (onUnauthenticated) onUnauthenticated();else window.location.href = url;
    }
  }, [requiredAndNotLoading, onUnauthenticated]);

  if (requiredAndNotLoading) {
    return {
      data: value.data,
      status: "loading"
    };
  }

  return value;
}

function getSession(_x) {
  return _getSession2.apply(this, arguments);
}

function _getSession2() {
  _getSession2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2(params) {
    var _params$broadcast;

    var session;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _utils.fetchData)("session", __NEXTAUTH, logger, params);

          case 2:
            session = _context2.sent;

            if ((_params$broadcast = params === null || params === void 0 ? void 0 : params.broadcast) !== null && _params$broadcast !== void 0 ? _params$broadcast : true) {
              broadcast.post({
                event: "session",
                data: {
                  trigger: "getSession"
                }
              });
            }

            return _context2.abrupt("return", session);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getSession2.apply(this, arguments);
}

function getCsrfToken(_x2) {
  return _getCsrfToken.apply(this, arguments);
}

function _getCsrfToken() {
  _getCsrfToken = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee3(params) {
    var response;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _utils.fetchData)("csrf", __NEXTAUTH, logger, params);

          case 2:
            response = _context3.sent;
            return _context3.abrupt("return", response === null || response === void 0 ? void 0 : response.csrfToken);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getCsrfToken.apply(this, arguments);
}

function getProviders() {
  return _getProviders.apply(this, arguments);
}

function _getProviders() {
  _getProviders = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee4() {
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _utils.fetchData)("providers", __NEXTAUTH, logger);

          case 2:
            return _context4.abrupt("return", _context4.sent);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getProviders.apply(this, arguments);
}

function signIn(_x3, _x4, _x5) {
  return _signIn.apply(this, arguments);
}

function _signIn() {
  _signIn = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee5(provider, options, authorizationParams) {
    var _ref5, _ref5$callbackUrl, callbackUrl, _ref5$redirect, redirect, baseUrl, providers, isCredentials, isEmail, isSupportingReturn, signInUrl, _signInUrl, res, data, _data$url, url, error;

    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _ref5 = options !== null && options !== void 0 ? options : {}, _ref5$callbackUrl = _ref5.callbackUrl, callbackUrl = _ref5$callbackUrl === void 0 ? window.location.href : _ref5$callbackUrl, _ref5$redirect = _ref5.redirect, redirect = _ref5$redirect === void 0 ? true : _ref5$redirect;
            baseUrl = (0, _utils.apiBaseUrl)(__NEXTAUTH);
            _context5.next = 4;
            return getProviders();

          case 4:
            providers = _context5.sent;

            if (providers) {
              _context5.next = 8;
              break;
            }

            window.location.href = "".concat(baseUrl, "/error");
            return _context5.abrupt("return");

          case 8:
            if (!(!provider || !(provider in providers))) {
              _context5.next = 11;
              break;
            }

            window.location.href = "".concat(baseUrl, "/signin?").concat(new URLSearchParams({
              callbackUrl: callbackUrl
            }));
            return _context5.abrupt("return");

          case 11:
            isCredentials = providers[provider].type === "credentials";
            isEmail = providers[provider].type === "email";
            isSupportingReturn = isCredentials || isEmail;
            signInUrl = "".concat(baseUrl, "/").concat(isCredentials ? "callback" : "signin", "/").concat(provider);
            _signInUrl = "".concat(signInUrl, "?").concat(new URLSearchParams(authorizationParams));
            _context5.t0 = fetch;
            _context5.t1 = _signInUrl;
            _context5.t2 = {
              "Content-Type": "application/x-www-form-urlencoded"
            };
            _context5.t3 = URLSearchParams;
            _context5.t4 = _objectSpread;
            _context5.t5 = _objectSpread({}, options);
            _context5.t6 = {};
            _context5.next = 25;
            return getCsrfToken();

          case 25:
            _context5.t7 = _context5.sent;
            _context5.t8 = callbackUrl;
            _context5.t9 = {
              csrfToken: _context5.t7,
              callbackUrl: _context5.t8,
              json: true
            };
            _context5.t10 = (0, _context5.t4)(_context5.t5, _context5.t6, _context5.t9);
            _context5.t11 = new _context5.t3(_context5.t10);
            _context5.t12 = {
              method: "post",
              headers: _context5.t2,
              body: _context5.t11
            };
            _context5.next = 33;
            return (0, _context5.t0)(_context5.t1, _context5.t12);

          case 33:
            res = _context5.sent;
            _context5.next = 36;
            return res.json();

          case 36:
            data = _context5.sent;

            if (!(redirect || !isSupportingReturn)) {
              _context5.next = 42;
              break;
            }

            url = (_data$url = data.url) !== null && _data$url !== void 0 ? _data$url : callbackUrl;
            window.location.href = url;
            if (url.includes("#")) window.location.reload();
            return _context5.abrupt("return");

          case 42:
            error = new URL(data.url).searchParams.get("error");

            if (!res.ok) {
              _context5.next = 46;
              break;
            }

            _context5.next = 46;
            return __NEXTAUTH._getSession({
              event: "storage"
            });

          case 46:
            return _context5.abrupt("return", {
              error: error,
              status: res.status,
              ok: res.ok,
              url: error ? null : data.url
            });

          case 47:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _signIn.apply(this, arguments);
}

function signOut(_x6) {
  return _signOut.apply(this, arguments);
}

function _signOut() {
  _signOut = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee6(options) {
    var _options$redirect;

    var _ref6, _ref6$callbackUrl, callbackUrl, baseUrl, fetchOptions, res, data, _data$url2, url;

    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _ref6 = options !== null && options !== void 0 ? options : {}, _ref6$callbackUrl = _ref6.callbackUrl, callbackUrl = _ref6$callbackUrl === void 0 ? window.location.href : _ref6$callbackUrl;
            baseUrl = (0, _utils.apiBaseUrl)(__NEXTAUTH);
            _context6.t0 = {
              "Content-Type": "application/x-www-form-urlencoded"
            };
            _context6.t1 = URLSearchParams;
            _context6.next = 6;
            return getCsrfToken();

          case 6:
            _context6.t2 = _context6.sent;
            _context6.t3 = callbackUrl;
            _context6.t4 = {
              csrfToken: _context6.t2,
              callbackUrl: _context6.t3,
              json: true
            };
            _context6.t5 = new _context6.t1(_context6.t4);
            fetchOptions = {
              method: "post",
              headers: _context6.t0,
              body: _context6.t5
            };
            _context6.next = 13;
            return fetch("".concat(baseUrl, "/signout"), fetchOptions);

          case 13:
            res = _context6.sent;
            _context6.next = 16;
            return res.json();

          case 16:
            data = _context6.sent;
            broadcast.post({
              event: "session",
              data: {
                trigger: "signout"
              }
            });

            if (!((_options$redirect = options === null || options === void 0 ? void 0 : options.redirect) !== null && _options$redirect !== void 0 ? _options$redirect : true)) {
              _context6.next = 23;
              break;
            }

            url = (_data$url2 = data.url) !== null && _data$url2 !== void 0 ? _data$url2 : callbackUrl;
            window.location.href = url;
            if (url.includes("#")) window.location.reload();
            return _context6.abrupt("return");

          case 23:
            _context6.next = 25;
            return __NEXTAUTH._getSession({
              event: "storage"
            });

          case 25:
            return _context6.abrupt("return", data);

          case 26:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _signOut.apply(this, arguments);
}

function SessionProvider(props) {
  var children = props.children,
      basePath = props.basePath;
  if (basePath) __NEXTAUTH.basePath = basePath;
  var hasInitialSession = props.session !== undefined;
  __NEXTAUTH._lastSync = hasInitialSession ? (0, _utils.now)() : 0;

  var _React$useState = React.useState(function () {
    if (hasInitialSession) __NEXTAUTH._session = props.session;
    return props.session;
  }),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      session = _React$useState2[0],
      setSession = _React$useState2[1];

  var _React$useState3 = React.useState(!hasInitialSession),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
      loading = _React$useState4[0],
      setLoading = _React$useState4[1];

  React.useEffect(function () {
    __NEXTAUTH._getSession = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee() {
      var _ref4,
          event,
          storageEvent,
          _args = arguments;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _ref4 = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, event = _ref4.event;
              _context.prev = 1;
              storageEvent = event === "storage";

              if (!(storageEvent || __NEXTAUTH._session === undefined)) {
                _context.next = 10;
                break;
              }

              __NEXTAUTH._lastSync = (0, _utils.now)();
              _context.next = 7;
              return getSession({
                broadcast: !storageEvent
              });

            case 7:
              __NEXTAUTH._session = _context.sent;
              setSession(__NEXTAUTH._session);
              return _context.abrupt("return");

            case 10:
              if (!(!event || __NEXTAUTH._session === null || (0, _utils.now)() < __NEXTAUTH._lastSync)) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("return");

            case 12:
              __NEXTAUTH._lastSync = (0, _utils.now)();
              _context.next = 15;
              return getSession();

            case 15:
              __NEXTAUTH._session = _context.sent;
              setSession(__NEXTAUTH._session);
              _context.next = 22;
              break;

            case 19:
              _context.prev = 19;
              _context.t0 = _context["catch"](1);
              logger.error("CLIENT_SESSION_ERROR", _context.t0);

            case 22:
              _context.prev = 22;
              setLoading(false);
              return _context.finish(22);

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 19, 22, 25]]);
    }));

    __NEXTAUTH._getSession();

    return function () {
      __NEXTAUTH._lastSync = 0;
      __NEXTAUTH._session = undefined;

      __NEXTAUTH._getSession = function () {};
    };
  }, []);
  React.useEffect(function () {
    var unsubscribe = broadcast.receive(function () {
      return __NEXTAUTH._getSession({
        event: "storage"
      });
    });
    return function () {
      return unsubscribe();
    };
  }, []);
  React.useEffect(function () {
    var _props$refetchOnWindo = props.refetchOnWindowFocus,
        refetchOnWindowFocus = _props$refetchOnWindo === void 0 ? true : _props$refetchOnWindo;

    var visibilityHandler = function visibilityHandler() {
      if (refetchOnWindowFocus && document.visibilityState === "visible") __NEXTAUTH._getSession({
        event: "visibilitychange"
      });
    };

    document.addEventListener("visibilitychange", visibilityHandler, false);
    return function () {
      return document.removeEventListener("visibilitychange", visibilityHandler, false);
    };
  }, [props.refetchOnWindowFocus]);
  React.useEffect(function () {
    var refetchInterval = props.refetchInterval;

    if (refetchInterval) {
      var refetchIntervalTimer = setInterval(function () {
        if (__NEXTAUTH._session) {
          __NEXTAUTH._getSession({
            event: "poll"
          });
        }
      }, refetchInterval * 1000);
      return function () {
        return clearInterval(refetchIntervalTimer);
      };
    }
  }, [props.refetchInterval]);
  var value = React.useMemo(function () {
    return {
      data: session,
      status: loading ? "loading" : session ? "authenticated" : "unauthenticated"
    };
  }, [session, loading]);
  return (0, _jsxRuntime.jsx)(SessionContext.Provider, {
    value: value,
    children: children
  });
}