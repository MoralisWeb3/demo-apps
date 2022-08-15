"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EVEOnline;

function EVEOnline(options) {
  return {
    id: "eveonline",
    name: "EVE Online",
    type: "oauth",
    wellKnown: "https://login.eveonline.com/.well-known/oauth-authorization-server",
    authorization: {
      params: {
        scope: "publicData"
      }
    },
    idToken: true,

    profile(profile) {
      return {
        id: String(profile.CharacterID),
        name: profile.CharacterName,
        email: null,
        image: `https://image.eveonline.com/Character/${profile.CharacterID}_128.jpg`
      };
    },

    options
  };
}