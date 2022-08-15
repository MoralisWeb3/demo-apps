"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = signin;

var _authorizationUrl = _interopRequireDefault(require("../lib/oauth/authorization-url"));

var _signin = _interopRequireDefault(require("../lib/email/signin"));

async function signin(params) {
  const {
    options,
    query,
    body
  } = params;
  const {
    url,
    adapter,
    callbacks,
    logger,
    provider
  } = options;

  if (!provider.type) {
    return {
      status: 500,
      text: `Error: Type not specified for ${provider.name}`
    };
  }

  if (provider.type === "oauth") {
    try {
      const response = await (0, _authorizationUrl.default)({
        options,
        query
      });
      return response;
    } catch (error) {
      logger.error("SIGNIN_OAUTH_ERROR", {
        error: error,
        providerId: provider.id
      });
      return {
        redirect: `${url}/error?error=OAuthSignin`
      };
    }
  } else if (provider.type === "email") {
    var _provider$normalizeId, _ref;

    let email = body === null || body === void 0 ? void 0 : body.email;
    if (!email) return {
      redirect: `${url}/error?error=EmailSignin`
    };
    const normalizer = (_provider$normalizeId = provider.normalizeIdentifier) !== null && _provider$normalizeId !== void 0 ? _provider$normalizeId : identifier => {
      let [local, domain] = identifier.toLowerCase().trim().split("@");
      domain = domain.split(",")[0];
      return `${local}@${domain}`;
    };

    try {
      email = normalizer(body === null || body === void 0 ? void 0 : body.email);
    } catch (error) {
      logger.error("SIGNIN_EMAIL_ERROR", {
        error,
        providerId: provider.id
      });
      return {
        redirect: `${url}/error?error=EmailSignin`
      };
    }

    const {
      getUserByEmail
    } = adapter;
    const user = (_ref = email ? await getUserByEmail(email) : null) !== null && _ref !== void 0 ? _ref : {
      email,
      id: email
    };
    const account = {
      providerAccountId: email,
      userId: email,
      type: "email",
      provider: provider.id
    };

    try {
      const signInCallbackResponse = await callbacks.signIn({
        user,
        account,
        email: {
          verificationRequest: true
        }
      });

      if (!signInCallbackResponse) {
        return {
          redirect: `${url}/error?error=AccessDenied`
        };
      } else if (typeof signInCallbackResponse === "string") {
        return {
          redirect: signInCallbackResponse
        };
      }
    } catch (error) {
      return {
        redirect: `${url}/error?${new URLSearchParams({
          error: error
        })}`
      };
    }

    try {
      const redirect = await (0, _signin.default)(email, options);
      return {
        redirect
      };
    } catch (error) {
      logger.error("SIGNIN_EMAIL_ERROR", {
        error,
        providerId: provider.id
      });
      return {
        redirect: `${url}/error?error=EmailSignin`
      };
    }
  }

  return {
    redirect: `${url}/signin`
  };
}