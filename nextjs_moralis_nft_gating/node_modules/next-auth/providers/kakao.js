"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Kakao;

function Kakao(options) {
  return {
    id: "kakao",
    name: "Kakao",
    type: "oauth",
    authorization: "https://kauth.kakao.com/oauth/authorize?scope",
    token: "https://kauth.kakao.com/oauth/token",
    userinfo: "https://kapi.kakao.com/v2/user/me",
    client: {
      token_endpoint_auth_method: "client_secret_post"
    },

    profile(profile) {
      var _profile$kakao_accoun, _profile$kakao_accoun2, _profile$kakao_accoun3, _profile$kakao_accoun4, _profile$kakao_accoun5;

      return {
        id: String(profile.id),
        name: (_profile$kakao_accoun = profile.kakao_account) === null || _profile$kakao_accoun === void 0 ? void 0 : (_profile$kakao_accoun2 = _profile$kakao_accoun.profile) === null || _profile$kakao_accoun2 === void 0 ? void 0 : _profile$kakao_accoun2.nickname,
        email: (_profile$kakao_accoun3 = profile.kakao_account) === null || _profile$kakao_accoun3 === void 0 ? void 0 : _profile$kakao_accoun3.email,
        image: (_profile$kakao_accoun4 = profile.kakao_account) === null || _profile$kakao_accoun4 === void 0 ? void 0 : (_profile$kakao_accoun5 = _profile$kakao_accoun4.profile) === null || _profile$kakao_accoun5 === void 0 ? void 0 : _profile$kakao_accoun5.profile_image_url
      };
    },

    options
  };
}