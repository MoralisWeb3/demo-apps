"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AzureAD;

function AzureAD(options) {
  var _options$tenantId, _options$profilePhoto;

  const tenant = (_options$tenantId = options.tenantId) !== null && _options$tenantId !== void 0 ? _options$tenantId : "common";
  const profilePhotoSize = (_options$profilePhoto = options.profilePhotoSize) !== null && _options$profilePhoto !== void 0 ? _options$profilePhoto : 48;
  return {
    id: "azure-ad",
    name: "Azure Active Directory",
    type: "oauth",
    wellKnown: `https://login.microsoftonline.com/${tenant}/v2.0/.well-known/openid-configuration`,
    authorization: {
      params: {
        scope: "openid profile email"
      }
    },

    async profile(profile, tokens) {
      const profilePicture = await fetch(`https://graph.microsoft.com/v1.0/me/photos/${profilePhotoSize}x${profilePhotoSize}/$value`, {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`
        }
      });

      if (profilePicture.ok) {
        const pictureBuffer = await profilePicture.arrayBuffer();
        const pictureBase64 = Buffer.from(pictureBuffer).toString("base64");
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: `data:image/jpeg;base64, ${pictureBase64}`
        };
      } else {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email
        };
      }
    },

    options
  };
}