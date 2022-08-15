"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPKCE = createPKCE;
exports.usePKCECodeVerifier = usePKCECodeVerifier;

var jwt = _interopRequireWildcard(require("../../../jwt"));

var _openidClient = require("openid-client");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const PKCE_CODE_CHALLENGE_METHOD = "S256";
const PKCE_MAX_AGE = 60 * 15;

async function createPKCE(options) {
  var _provider$checks;

  const {
    cookies,
    logger,
    provider
  } = options;

  if (!((_provider$checks = provider.checks) !== null && _provider$checks !== void 0 && _provider$checks.includes("pkce"))) {
    return;
  }

  const code_verifier = _openidClient.generators.codeVerifier();

  const code_challenge = _openidClient.generators.codeChallenge(code_verifier);

  const expires = new Date();
  expires.setTime(expires.getTime() + PKCE_MAX_AGE * 1000);
  const encryptedCodeVerifier = await jwt.encode({ ...options.jwt,
    maxAge: PKCE_MAX_AGE,
    token: {
      code_verifier
    }
  });
  logger.debug("CREATE_PKCE_CHALLENGE_VERIFIER", {
    code_challenge,
    code_challenge_method: PKCE_CODE_CHALLENGE_METHOD,
    code_verifier,
    PKCE_MAX_AGE
  });
  return {
    code_challenge,
    code_challenge_method: PKCE_CODE_CHALLENGE_METHOD,
    cookie: {
      name: cookies.pkceCodeVerifier.name,
      value: encryptedCodeVerifier,
      options: { ...cookies.pkceCodeVerifier.options,
        expires
      }
    }
  };
}

async function usePKCECodeVerifier(codeVerifier, options) {
  var _provider$checks2, _pkce$code_verifier;

  const {
    cookies,
    provider
  } = options;

  if (!(provider !== null && provider !== void 0 && (_provider$checks2 = provider.checks) !== null && _provider$checks2 !== void 0 && _provider$checks2.includes("pkce")) || !codeVerifier) {
    return;
  }

  const pkce = await jwt.decode({ ...options.jwt,
    token: codeVerifier
  });
  return {
    codeVerifier: (_pkce$code_verifier = pkce === null || pkce === void 0 ? void 0 : pkce.code_verifier) !== null && _pkce$code_verifier !== void 0 ? _pkce$code_verifier : undefined,
    cookie: {
      name: cookies.pkceCodeVerifier.name,
      value: "",
      options: { ...cookies.pkceCodeVerifier.options,
        maxAge: 0
      }
    }
  };
}