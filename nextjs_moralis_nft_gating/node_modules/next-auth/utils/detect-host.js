"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detectHost = detectHost;

function detectHost(forwardedHost) {
  if (process.env.VERCEL) return forwardedHost;
  return process.env.NEXTAUTH_URL;
}