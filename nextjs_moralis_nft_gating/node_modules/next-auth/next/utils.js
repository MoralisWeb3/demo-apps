"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCookie = setCookie;

var _cookie = require("cookie");

function setCookie(res, cookie) {
  var _res$getHeader;

  let setCookieHeader = (_res$getHeader = res.getHeader("Set-Cookie")) !== null && _res$getHeader !== void 0 ? _res$getHeader : [];

  if (!Array.isArray(setCookieHeader)) {
    setCookieHeader = [setCookieHeader];
  }

  const {
    name,
    value,
    options
  } = cookie;
  const cookieHeader = (0, _cookie.serialize)(name, value, options);
  setCookieHeader.push(cookieHeader);
  res.setHeader("Set-Cookie", setCookieHeader);
}