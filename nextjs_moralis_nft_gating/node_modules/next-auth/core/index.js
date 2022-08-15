"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NextAuthHandler = NextAuthHandler;

var _logger = _interopRequireWildcard(require("../utils/logger"));

var _detectHost = require("../utils/detect-host");

var routes = _interopRequireWildcard(require("./routes"));

var _pages = _interopRequireDefault(require("./pages"));

var _init = require("./init");

var _assert = require("./lib/assert");

var _cookie = require("./lib/cookie");

var _cookie2 = require("cookie");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

async function getBody(req) {
  try {
    return await req.json();
  } catch (_unused) {}
}

async function toInternalRequest(req) {
  if (req instanceof Request) {
    var _req$headers$get, _url$searchParams$get, _headers$xForwarded;

    const url = new URL(req.url);
    const nextauth = url.pathname.split("/").slice(3);
    const headers = Object.fromEntries(req.headers.entries());
    const query = Object.fromEntries(url.searchParams.entries());
    query.nextauth = nextauth;
    return {
      action: nextauth[0],
      method: req.method,
      headers,
      body: await getBody(req),
      cookies: (0, _cookie2.parse)((_req$headers$get = req.headers.get("cookie")) !== null && _req$headers$get !== void 0 ? _req$headers$get : ""),
      providerId: nextauth[1],
      error: (_url$searchParams$get = url.searchParams.get("error")) !== null && _url$searchParams$get !== void 0 ? _url$searchParams$get : nextauth[1],
      host: (0, _detectHost.detectHost)((_headers$xForwarded = headers["x-forwarded-host"]) !== null && _headers$xForwarded !== void 0 ? _headers$xForwarded : headers.host),
      query
    };
  }

  return req;
}

async function NextAuthHandler(params) {
  var _req$body$callbackUrl, _req$body, _req$query2, _req$body2;

  const {
    options: userOptions,
    req: incomingRequest
  } = params;
  const req = await toInternalRequest(incomingRequest);
  (0, _logger.setLogger)(userOptions.logger, userOptions.debug);
  const assertionResult = (0, _assert.assertConfig)({
    options: userOptions,
    req
  });

  if (Array.isArray(assertionResult)) {
    assertionResult.forEach(_logger.default.warn);
  } else if (assertionResult instanceof Error) {
    var _req$query;

    const {
      pages,
      theme
    } = userOptions;

    _logger.default.error(assertionResult.code, assertionResult);

    const authOnErrorPage = (pages === null || pages === void 0 ? void 0 : pages.error) && req.action === "signin" && ((_req$query = req.query) === null || _req$query === void 0 ? void 0 : _req$query.callbackUrl.startsWith(pages.error));

    if (!(pages !== null && pages !== void 0 && pages.error) || authOnErrorPage) {
      if (authOnErrorPage) {
        _logger.default.error("AUTH_ON_ERROR_PAGE_ERROR", new Error(`The error page ${pages === null || pages === void 0 ? void 0 : pages.error} should not require authentication`));
      }

      const render = (0, _pages.default)({
        theme
      });
      return render.error({
        error: "configuration"
      });
    }

    return {
      redirect: `${pages.error}?error=Configuration`
    };
  }

  const {
    action,
    providerId,
    error,
    method = "GET"
  } = req;
  const {
    options,
    cookies
  } = await (0, _init.init)({
    userOptions,
    action,
    providerId,
    host: req.host,
    callbackUrl: (_req$body$callbackUrl = (_req$body = req.body) === null || _req$body === void 0 ? void 0 : _req$body.callbackUrl) !== null && _req$body$callbackUrl !== void 0 ? _req$body$callbackUrl : (_req$query2 = req.query) === null || _req$query2 === void 0 ? void 0 : _req$query2.callbackUrl,
    csrfToken: (_req$body2 = req.body) === null || _req$body2 === void 0 ? void 0 : _req$body2.csrfToken,
    cookies: req.cookies,
    isPost: method === "POST"
  });
  const sessionStore = new _cookie.SessionStore(options.cookies.sessionToken, req, options.logger);

  if (method === "GET") {
    const render = (0, _pages.default)({ ...options,
      query: req.query,
      cookies
    });
    const {
      pages
    } = options;

    switch (action) {
      case "providers":
        return await routes.providers(options.providers);

      case "session":
        {
          const session = await routes.session({
            options,
            sessionStore
          });
          if (session.cookies) cookies.push(...session.cookies);
          return { ...session,
            cookies
          };
        }

      case "csrf":
        return {
          headers: [{
            key: "Content-Type",
            value: "application/json"
          }],
          body: {
            csrfToken: options.csrfToken
          },
          cookies
        };

      case "signin":
        if (pages.signIn) {
          let signinUrl = `${pages.signIn}${pages.signIn.includes("?") ? "&" : "?"}callbackUrl=${encodeURIComponent(options.callbackUrl)}`;
          if (error) signinUrl = `${signinUrl}&error=${encodeURIComponent(error)}`;
          return {
            redirect: signinUrl,
            cookies
          };
        }

        return render.signin();

      case "signout":
        if (pages.signOut) return {
          redirect: pages.signOut,
          cookies
        };
        return render.signout();

      case "callback":
        if (options.provider) {
          const callback = await routes.callback({
            body: req.body,
            query: req.query,
            headers: req.headers,
            cookies: req.cookies,
            method,
            options,
            sessionStore
          });
          if (callback.cookies) cookies.push(...callback.cookies);
          return { ...callback,
            cookies
          };
        }

        break;

      case "verify-request":
        if (pages.verifyRequest) {
          return {
            redirect: pages.verifyRequest,
            cookies
          };
        }

        return render.verifyRequest();

      case "error":
        if (["Signin", "OAuthSignin", "OAuthCallback", "OAuthCreateAccount", "EmailCreateAccount", "Callback", "OAuthAccountNotLinked", "EmailSignin", "CredentialsSignin", "SessionRequired"].includes(error)) {
          return {
            redirect: `${options.url}/signin?error=${error}`,
            cookies
          };
        }

        if (pages.error) {
          return {
            redirect: `${pages.error}${pages.error.includes("?") ? "&" : "?"}error=${error}`,
            cookies
          };
        }

        return render.error({
          error: error
        });

      default:
    }
  } else if (method === "POST") {
    switch (action) {
      case "signin":
        if (options.csrfTokenVerified && options.provider) {
          const signin = await routes.signin({
            query: req.query,
            body: req.body,
            options
          });
          if (signin.cookies) cookies.push(...signin.cookies);
          return { ...signin,
            cookies
          };
        }

        return {
          redirect: `${options.url}/signin?csrf=true`,
          cookies
        };

      case "signout":
        if (options.csrfTokenVerified) {
          const signout = await routes.signout({
            options,
            sessionStore
          });
          if (signout.cookies) cookies.push(...signout.cookies);
          return { ...signout,
            cookies
          };
        }

        return {
          redirect: `${options.url}/signout?csrf=true`,
          cookies
        };

      case "callback":
        if (options.provider) {
          if (options.provider.type === "credentials" && !options.csrfTokenVerified) {
            return {
              redirect: `${options.url}/signin?csrf=true`,
              cookies
            };
          }

          const callback = await routes.callback({
            body: req.body,
            query: req.query,
            headers: req.headers,
            cookies: req.cookies,
            method,
            options,
            sessionStore
          });
          if (callback.cookies) cookies.push(...callback.cookies);
          return { ...callback,
            cookies
          };
        }

        break;

      case "_log":
        if (userOptions.logger) {
          try {
            var _req$body3;

            const {
              code,
              level,
              ...metadata
            } = (_req$body3 = req.body) !== null && _req$body3 !== void 0 ? _req$body3 : {};

            _logger.default[level](code, metadata);
          } catch (error) {
            _logger.default.error("LOGGER_ERROR", error);
          }
        }

        return {};

      default:
    }
  }

  return {
    status: 400,
    body: `Error: This action with HTTP ${method} is not supported by NextAuth.js`
  };
}