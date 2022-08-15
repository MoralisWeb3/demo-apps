"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/signin";
exports.ids = ["pages/signin"];
exports.modules = {

/***/ "./pages/signin.jsx":
/*!**************************!*\
  !*** ./pages/signin.jsx ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var wagmi_connectors_injected__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wagmi/connectors/injected */ \"wagmi/connectors/injected\");\n/* harmony import */ var wagmi_connectors_injected__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(wagmi_connectors_injected__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/react */ \"next-auth/react\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! wagmi */ \"wagmi\");\n/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(wagmi__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\nfunction SignIn() {\n    const { connectAsync  } = (0,wagmi__WEBPACK_IMPORTED_MODULE_3__.useConnect)();\n    const { disconnectAsync  } = (0,wagmi__WEBPACK_IMPORTED_MODULE_3__.useDisconnect)();\n    const { isConnected  } = (0,wagmi__WEBPACK_IMPORTED_MODULE_3__.useAccount)();\n    const { signMessageAsync  } = (0,wagmi__WEBPACK_IMPORTED_MODULE_3__.useSignMessage)();\n    const { push  } = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();\n    const handleAuth = async ()=>{\n        if (isConnected) {\n            await disconnectAsync();\n        }\n        const { account , chain  } = await connectAsync({\n            connector: new wagmi_connectors_injected__WEBPACK_IMPORTED_MODULE_1__.InjectedConnector()\n        });\n        const userData = {\n            address: account,\n            chain: chain.id,\n            network: \"evm\"\n        };\n        const { data  } = await axios__WEBPACK_IMPORTED_MODULE_5___default().post(\"/api/auth/request-message\", userData, {\n            headers: {\n                \"content-type\": \"application/json\"\n            }\n        });\n        const message = data.message;\n        const signature = await signMessageAsync({\n            message\n        });\n        // redirect user after success authentication to '/user' page\n        const { url  } = await (0,next_auth_react__WEBPACK_IMPORTED_MODULE_2__.signIn)(\"credentials\", {\n            message,\n            signature,\n            redirect: false,\n            callbackUrl: \"/user\"\n        });\n        /**\r\n         * instead of using signIn(..., redirect: \"/user\")\r\n         * we get the url from callback and push it to the router to avoid page refreshing\r\n         */ push(url);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                children: \"Web3 Authentication\"\n            }, void 0, false, {\n                fileName: \"E:\\\\Work\\\\Moralis\\\\demo-apps\\\\nextjs_moralis_nft\\\\pages\\\\signin.jsx\",\n                lineNumber: 44,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                onClick: ()=>handleAuth(),\n                children: \"Authenticate via Metamask\"\n            }, void 0, false, {\n                fileName: \"E:\\\\Work\\\\Moralis\\\\demo-apps\\\\nextjs_moralis_nft\\\\pages\\\\signin.jsx\",\n                lineNumber: 45,\n                columnNumber: 13\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"E:\\\\Work\\\\Moralis\\\\demo-apps\\\\nextjs_moralis_nft\\\\pages\\\\signin.jsx\",\n        lineNumber: 43,\n        columnNumber: 9\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SignIn);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9zaWduaW4uanN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUE4RDtBQUNyQjtBQUNxQztBQUN0QztBQUNkO0FBRTFCLFNBQVNRLE1BQU0sR0FBRztJQUNkLE1BQU0sRUFBRUMsWUFBWSxHQUFFLEdBQUdOLGlEQUFVLEVBQUU7SUFDckMsTUFBTSxFQUFFTyxlQUFlLEdBQUUsR0FBR0wsb0RBQWEsRUFBRTtJQUMzQyxNQUFNLEVBQUVNLFdBQVcsR0FBRSxHQUFHVCxpREFBVSxFQUFFO0lBQ3BDLE1BQU0sRUFBRVUsZ0JBQWdCLEdBQUUsR0FBR1IscURBQWMsRUFBRTtJQUM3QyxNQUFNLEVBQUVTLElBQUksR0FBRSxHQUFHUCxzREFBUyxFQUFFO0lBRTVCLE1BQU1RLFVBQVUsR0FBRyxVQUFZO1FBQzNCLElBQUlILFdBQVcsRUFBRTtZQUNiLE1BQU1ELGVBQWUsRUFBRSxDQUFDO1NBQzNCO1FBRUQsTUFBTSxFQUFFSyxPQUFPLEdBQUVDLEtBQUssR0FBRSxHQUFHLE1BQU1QLFlBQVksQ0FBQztZQUFFUSxTQUFTLEVBQUUsSUFBSWpCLHdFQUFpQixFQUFFO1NBQUUsQ0FBQztRQUVyRixNQUFNa0IsUUFBUSxHQUFHO1lBQUVDLE9BQU8sRUFBRUosT0FBTztZQUFFQyxLQUFLLEVBQUVBLEtBQUssQ0FBQ0ksRUFBRTtZQUFFQyxPQUFPLEVBQUUsS0FBSztTQUFFO1FBRXRFLE1BQU0sRUFBRUMsSUFBSSxHQUFFLEdBQUcsTUFBTWYsaURBQVUsQ0FBQywyQkFBMkIsRUFBRVcsUUFBUSxFQUFFO1lBQ3JFTSxPQUFPLEVBQUU7Z0JBQ0wsY0FBYyxFQUFFLGtCQUFrQjthQUNyQztTQUNKLENBQUM7UUFFRixNQUFNQyxPQUFPLEdBQUdILElBQUksQ0FBQ0csT0FBTztRQUU1QixNQUFNQyxTQUFTLEdBQUcsTUFBTWQsZ0JBQWdCLENBQUM7WUFBRWEsT0FBTztTQUFFLENBQUM7UUFFckQsNkRBQTZEO1FBQzdELE1BQU0sRUFBRUUsR0FBRyxHQUFFLEdBQUcsTUFBTTFCLHVEQUFNLENBQUMsYUFBYSxFQUFFO1lBQUV3QixPQUFPO1lBQUVDLFNBQVM7WUFBRUUsUUFBUSxFQUFFLEtBQUs7WUFBRUMsV0FBVyxFQUFFLE9BQU87U0FBRSxDQUFDO1FBQzFHO0tBS0g7SUFFRCxxQkFDSSxRQUFDQyxLQUFHOzs7c0ZBQ0k7Ozs7O29CQUF3QjswQkFDNUI7Z0JBQVFHLE9BQU8sRUFBRSxJQUFNbkI7Ozs7OztvQkFBZ0Q7Ozs7OztZQUNyRSxDQUNSO0NBQ0w7QUFFRCxlQUFlTixNQUFNLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AbW9yYWxpc3dlYjMvbmV4dC1kb2NzLy4vcGFnZXMvc2lnbmluLmpzeD8wNTNhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGVkQ29ubmVjdG9yIH0gZnJvbSAnd2FnbWkvY29ubmVjdG9ycy9pbmplY3RlZCc7XHJcbmltcG9ydCB7IHNpZ25JbiB9IGZyb20gJ25leHQtYXV0aC9yZWFjdCc7XHJcbmltcG9ydCB7IHVzZUFjY291bnQsIHVzZUNvbm5lY3QsIHVzZVNpZ25NZXNzYWdlLCB1c2VEaXNjb25uZWN0IH0gZnJvbSAnd2FnbWknO1xyXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcic7XHJcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XHJcblxyXG5mdW5jdGlvbiBTaWduSW4oKSB7XHJcbiAgICBjb25zdCB7IGNvbm5lY3RBc3luYyB9ID0gdXNlQ29ubmVjdCgpO1xyXG4gICAgY29uc3QgeyBkaXNjb25uZWN0QXN5bmMgfSA9IHVzZURpc2Nvbm5lY3QoKTtcclxuICAgIGNvbnN0IHsgaXNDb25uZWN0ZWQgfSA9IHVzZUFjY291bnQoKTtcclxuICAgIGNvbnN0IHsgc2lnbk1lc3NhZ2VBc3luYyB9ID0gdXNlU2lnbk1lc3NhZ2UoKTtcclxuICAgIGNvbnN0IHsgcHVzaCB9ID0gdXNlUm91dGVyKCk7XHJcblxyXG4gICAgY29uc3QgaGFuZGxlQXV0aCA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICBpZiAoaXNDb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgYXdhaXQgZGlzY29ubmVjdEFzeW5jKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB7IGFjY291bnQsIGNoYWluIH0gPSBhd2FpdCBjb25uZWN0QXN5bmMoeyBjb25uZWN0b3I6IG5ldyBJbmplY3RlZENvbm5lY3RvcigpIH0pO1xyXG5cclxuICAgICAgICBjb25zdCB1c2VyRGF0YSA9IHsgYWRkcmVzczogYWNjb3VudCwgY2hhaW46IGNoYWluLmlkLCBuZXR3b3JrOiAnZXZtJyB9O1xyXG5cclxuICAgICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IGF4aW9zLnBvc3QoJy9hcGkvYXV0aC9yZXF1ZXN0LW1lc3NhZ2UnLCB1c2VyRGF0YSwge1xyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBtZXNzYWdlID0gZGF0YS5tZXNzYWdlO1xyXG5cclxuICAgICAgICBjb25zdCBzaWduYXR1cmUgPSBhd2FpdCBzaWduTWVzc2FnZUFzeW5jKHsgbWVzc2FnZSB9KTtcclxuXHJcbiAgICAgICAgLy8gcmVkaXJlY3QgdXNlciBhZnRlciBzdWNjZXNzIGF1dGhlbnRpY2F0aW9uIHRvICcvdXNlcicgcGFnZVxyXG4gICAgICAgIGNvbnN0IHsgdXJsIH0gPSBhd2FpdCBzaWduSW4oJ2NyZWRlbnRpYWxzJywgeyBtZXNzYWdlLCBzaWduYXR1cmUsIHJlZGlyZWN0OiBmYWxzZSwgY2FsbGJhY2tVcmw6ICcvdXNlcicgfSk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogaW5zdGVhZCBvZiB1c2luZyBzaWduSW4oLi4uLCByZWRpcmVjdDogXCIvdXNlclwiKVxyXG4gICAgICAgICAqIHdlIGdldCB0aGUgdXJsIGZyb20gY2FsbGJhY2sgYW5kIHB1c2ggaXQgdG8gdGhlIHJvdXRlciB0byBhdm9pZCBwYWdlIHJlZnJlc2hpbmdcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdXNoKHVybCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPGgzPldlYjMgQXV0aGVudGljYXRpb248L2gzPlxyXG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IGhhbmRsZUF1dGgoKX0+QXV0aGVudGljYXRlIHZpYSBNZXRhbWFzazwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2lnbkluO1xyXG4iXSwibmFtZXMiOlsiSW5qZWN0ZWRDb25uZWN0b3IiLCJzaWduSW4iLCJ1c2VBY2NvdW50IiwidXNlQ29ubmVjdCIsInVzZVNpZ25NZXNzYWdlIiwidXNlRGlzY29ubmVjdCIsInVzZVJvdXRlciIsImF4aW9zIiwiU2lnbkluIiwiY29ubmVjdEFzeW5jIiwiZGlzY29ubmVjdEFzeW5jIiwiaXNDb25uZWN0ZWQiLCJzaWduTWVzc2FnZUFzeW5jIiwicHVzaCIsImhhbmRsZUF1dGgiLCJhY2NvdW50IiwiY2hhaW4iLCJjb25uZWN0b3IiLCJ1c2VyRGF0YSIsImFkZHJlc3MiLCJpZCIsIm5ldHdvcmsiLCJkYXRhIiwicG9zdCIsImhlYWRlcnMiLCJtZXNzYWdlIiwic2lnbmF0dXJlIiwidXJsIiwicmVkaXJlY3QiLCJjYWxsYmFja1VybCIsImRpdiIsImgzIiwiYnV0dG9uIiwib25DbGljayJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/signin.jsx\n");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "next-auth/react":
/*!**********************************!*\
  !*** external "next-auth/react" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("next-auth/react");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "wagmi":
/*!************************!*\
  !*** external "wagmi" ***!
  \************************/
/***/ ((module) => {

module.exports = require("wagmi");

/***/ }),

/***/ "wagmi/connectors/injected":
/*!********************************************!*\
  !*** external "wagmi/connectors/injected" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("wagmi/connectors/injected");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/signin.jsx"));
module.exports = __webpack_exports__;

})();