"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SignoutPage;

var _preact = require("preact");

function SignoutPage(props) {
  const {
    url,
    csrfToken,
    theme
  } = props;
  return (0, _preact.h)("div", {
    className: "signout"
  }, theme.brandColor && (0, _preact.h)("style", {
    dangerouslySetInnerHTML: {
      __html: `
        :root {
          --brand-color: ${theme.brandColor}
        }
      `
    }
  }), theme.logo && (0, _preact.h)("img", {
    src: theme.logo,
    alt: "Logo",
    className: "logo"
  }), (0, _preact.h)("div", {
    className: "card"
  }, (0, _preact.h)("h1", null, "Signout"), (0, _preact.h)("p", null, "Are you sure you want to sign out?"), (0, _preact.h)("form", {
    action: `${url}/signout`,
    method: "POST"
  }, (0, _preact.h)("input", {
    type: "hidden",
    name: "csrfToken",
    value: csrfToken
  }), (0, _preact.h)("button", {
    type: "submit"
  }, "Sign out"))));
}