"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSecret = createSecret;
exports.fromDate = fromDate;
exports.hashToken = hashToken;

var _crypto = require("crypto");

function fromDate(time, date = Date.now()) {
  return new Date(date + time * 1000);
}

function hashToken(token, options) {
  var _provider$secret;

  const {
    provider,
    secret
  } = options;
  return (0, _crypto.createHash)("sha256").update(`${token}${(_provider$secret = provider.secret) !== null && _provider$secret !== void 0 ? _provider$secret : secret}`).digest("hex");
}

function createSecret(params) {
  var _userOptions$secret;

  const {
    userOptions,
    url
  } = params;
  return (_userOptions$secret = userOptions.secret) !== null && _userOptions$secret !== void 0 ? _userOptions$secret : (0, _crypto.createHash)("sha256").update(JSON.stringify({ ...url,
    ...userOptions
  })).digest("hex");
}