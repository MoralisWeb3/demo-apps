"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createState = createState;
exports.useState = useState;

var _openidClient = require("openid-client");

const STATE_MAX_AGE = 60 * 15;

async function createState(options) {
  var _provider$checks;

  const {
    logger,
    provider,
    jwt,
    cookies
  } = options;

  if (!((_provider$checks = provider.checks) !== null && _provider$checks !== void 0 && _provider$checks.includes("state"))) {
    return;
  }

  const state = _openidClient.generators.state();

  const encodedState = await jwt.encode({ ...jwt,
    maxAge: STATE_MAX_AGE,
    token: {
      state
    }
  });
  logger.debug("CREATE_STATE", {
    state,
    maxAge: STATE_MAX_AGE
  });
  const expires = new Date();
  expires.setTime(expires.getTime() + STATE_MAX_AGE * 1000);
  return {
    value: state,
    cookie: {
      name: cookies.state.name,
      value: encodedState,
      options: { ...cookies.state.options,
        expires
      }
    }
  };
}

async function useState(state, options) {
  var _provider$checks2, _value$state;

  const {
    cookies,
    provider,
    jwt
  } = options;
  if (!((_provider$checks2 = provider.checks) !== null && _provider$checks2 !== void 0 && _provider$checks2.includes("state")) || !state) return;
  const value = await jwt.decode({ ...options.jwt,
    token: state
  });
  return {
    value: (_value$state = value === null || value === void 0 ? void 0 : value.state) !== null && _value$state !== void 0 ? _value$state : undefined,
    cookie: {
      name: cookies.state.name,
      value: "",
      options: { ...cookies.pkceCodeVerifier.options,
        maxAge: 0
      }
    }
  };
}