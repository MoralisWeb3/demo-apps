"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;

var _logger = _interopRequireDefault(require("../utils/logger"));

var _parseUrl = _interopRequireDefault(require("../utils/parse-url"));

var _errors = require("./errors");

var _providers = _interopRequireDefault(require("./lib/providers"));

var _utils = require("./lib/utils");

var cookie = _interopRequireWildcard(require("./lib/cookie"));

var jwt = _interopRequireWildcard(require("../jwt"));

var _defaultCallbacks = require("./lib/default-callbacks");

var _csrfToken = require("./lib/csrf-token");

var _callbackUrl = require("./lib/callback-url");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

async function init({
  userOptions,
  providerId,
  action,
  host,
  cookies: reqCookies,
  callbackUrl: reqCallbackUrl,
  csrfToken: reqCsrfToken,
  isPost
}) {
  var _userOptions$useSecur, _userOptions$events;

  const url = (0, _parseUrl.default)(host);
  const secret = (0, _utils.createSecret)({
    userOptions,
    url
  });
  const {
    providers,
    provider
  } = (0, _providers.default)({
    providers: userOptions.providers,
    url,
    providerId
  });
  const maxAge = 30 * 24 * 60 * 60;
  const options = {
    debug: false,
    pages: {},
    theme: {
      colorScheme: "auto",
      logo: "",
      brandColor: "",
      buttonText: ""
    },
    ...userOptions,
    url,
    action,
    provider,
    cookies: { ...cookie.defaultCookies((_userOptions$useSecur = userOptions.useSecureCookies) !== null && _userOptions$useSecur !== void 0 ? _userOptions$useSecur : url.base.startsWith("https://")),
      ...userOptions.cookies
    },
    secret,
    providers,
    session: {
      strategy: userOptions.adapter ? "database" : "jwt",
      maxAge,
      updateAge: 24 * 60 * 60,
      ...userOptions.session
    },
    jwt: {
      secret,
      maxAge,
      encode: jwt.encode,
      decode: jwt.decode,
      ...userOptions.jwt
    },
    events: (0, _errors.eventsErrorHandler)((_userOptions$events = userOptions.events) !== null && _userOptions$events !== void 0 ? _userOptions$events : {}, _logger.default),
    adapter: (0, _errors.adapterErrorHandler)(userOptions.adapter, _logger.default),
    callbacks: { ..._defaultCallbacks.defaultCallbacks,
      ...userOptions.callbacks
    },
    logger: _logger.default,
    callbackUrl: url.origin
  };
  const cookies = [];
  const {
    csrfToken,
    cookie: csrfCookie,
    csrfTokenVerified
  } = (0, _csrfToken.createCSRFToken)({
    options,
    cookieValue: reqCookies === null || reqCookies === void 0 ? void 0 : reqCookies[options.cookies.csrfToken.name],
    isPost,
    bodyValue: reqCsrfToken
  });
  options.csrfToken = csrfToken;
  options.csrfTokenVerified = csrfTokenVerified;

  if (csrfCookie) {
    cookies.push({
      name: options.cookies.csrfToken.name,
      value: csrfCookie,
      options: options.cookies.csrfToken.options
    });
  }

  const {
    callbackUrl,
    callbackUrlCookie
  } = await (0, _callbackUrl.createCallbackUrl)({
    options,
    cookieValue: reqCookies === null || reqCookies === void 0 ? void 0 : reqCookies[options.cookies.callbackUrl.name],
    paramValue: reqCallbackUrl
  });
  options.callbackUrl = callbackUrl;

  if (callbackUrlCookie) {
    cookies.push({
      name: options.cookies.callbackUrl.name,
      value: callbackUrlCookie,
      options: options.cookies.callbackUrl.options
    });
  }

  return {
    options,
    cookies
  };
}