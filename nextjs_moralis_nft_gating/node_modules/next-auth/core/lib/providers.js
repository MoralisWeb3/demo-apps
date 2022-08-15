"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseProviders;

var _merge = require("../../utils/merge");

function parseProviders(params) {
  const {
    url,
    providerId
  } = params;
  const providers = params.providers.map(({
    options,
    ...rest
  }) => {
    var _userOptions$id, _userOptions$id2;

    const defaultOptions = normalizeProvider(rest);
    const userOptions = normalizeProvider(options);
    return (0, _merge.merge)(defaultOptions, { ...userOptions,
      signinUrl: `${url}/signin/${(_userOptions$id = userOptions === null || userOptions === void 0 ? void 0 : userOptions.id) !== null && _userOptions$id !== void 0 ? _userOptions$id : rest.id}`,
      callbackUrl: `${url}/callback/${(_userOptions$id2 = userOptions === null || userOptions === void 0 ? void 0 : userOptions.id) !== null && _userOptions$id2 !== void 0 ? _userOptions$id2 : rest.id}`
    });
  });
  const provider = providers.find(({
    id
  }) => id === providerId);
  return {
    providers,
    provider
  };
}

function normalizeProvider(provider) {
  var _normalized$version;

  if (!provider) return;
  const normalized = Object.entries(provider).reduce((acc, [key, value]) => {
    if (["authorization", "token", "userinfo"].includes(key) && typeof value === "string") {
      var _url$searchParams;

      const url = new URL(value);
      acc[key] = {
        url: `${url.origin}${url.pathname}`,
        params: Object.fromEntries((_url$searchParams = url.searchParams) !== null && _url$searchParams !== void 0 ? _url$searchParams : [])
      };
    } else {
      acc[key] = value;
    }

    return acc;
  }, {});

  if (normalized.type === "oauth" && !((_normalized$version = normalized.version) !== null && _normalized$version !== void 0 && _normalized$version.startsWith("1."))) {
    var _ref, _normalized$idToken, _normalized$wellKnown, _normalized$authoriza, _normalized$authoriza2, _normalized$authoriza3;

    normalized.idToken = Boolean((_ref = (_normalized$idToken = normalized.idToken) !== null && _normalized$idToken !== void 0 ? _normalized$idToken : (_normalized$wellKnown = normalized.wellKnown) === null || _normalized$wellKnown === void 0 ? void 0 : _normalized$wellKnown.includes("openid-configuration")) !== null && _ref !== void 0 ? _ref : (_normalized$authoriza = normalized.authorization) === null || _normalized$authoriza === void 0 ? void 0 : (_normalized$authoriza2 = _normalized$authoriza.params) === null || _normalized$authoriza2 === void 0 ? void 0 : (_normalized$authoriza3 = _normalized$authoriza2.scope) === null || _normalized$authoriza3 === void 0 ? void 0 : _normalized$authoriza3.includes("openid"));
    if (!normalized.checks) normalized.checks = ["state"];
  }

  return normalized;
}