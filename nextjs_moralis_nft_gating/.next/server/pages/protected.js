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
exports.id = "pages/protected";
exports.ids = ["pages/protected"];
exports.modules = {

/***/ "./pages/protected.jsx":
/*!*****************************!*\
  !*** ./pages/protected.jsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"getServerSideProps\": () => (/* binding */ getServerSideProps)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/react */ \"next-auth/react\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var moralis__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moralis */ \"moralis\");\n/* harmony import */ var moralis__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moralis__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nfunction Protected({ message , nftList  }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                children: \"Protected content\"\n            }, void 0, false, {\n                fileName: \"E:\\\\Work\\\\Moralis\\\\demo-apps\\\\nextjs_moralis_nft\\\\pages\\\\protected.jsx\",\n                lineNumber: 7,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: message\n            }, void 0, false, {\n                fileName: \"E:\\\\Work\\\\Moralis\\\\demo-apps\\\\nextjs_moralis_nft\\\\pages\\\\protected.jsx\",\n                lineNumber: 8,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"pre\", {\n                children: JSON.stringify(nftList, null, 2)\n            }, void 0, false, {\n                fileName: \"E:\\\\Work\\\\Moralis\\\\demo-apps\\\\nextjs_moralis_nft\\\\pages\\\\protected.jsx\",\n                lineNumber: 9,\n                columnNumber: 13\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"E:\\\\Work\\\\Moralis\\\\demo-apps\\\\nextjs_moralis_nft\\\\pages\\\\protected.jsx\",\n        lineNumber: 6,\n        columnNumber: 9\n    }, this);\n}\nasync function getServerSideProps(context) {\n    const session = await (0,next_auth_react__WEBPACK_IMPORTED_MODULE_1__.getSession)(context);\n    if (!session) {\n        return {\n            redirect: {\n                destination: \"/signin\",\n                permanent: false\n            }\n        };\n    }\n    await moralis__WEBPACK_IMPORTED_MODULE_2___default().start({\n        apiKey: process.env.MORALIS_API_KEY\n    });\n    const nftList = await moralis__WEBPACK_IMPORTED_MODULE_2___default().EvmApi.account.getNFTsForContract({\n        address: session.user.address,\n        tokenAddress: \"0x...\"\n    });\n    return {\n        props: {\n            message: // if user has at least one NFT he will get protected content\n            nftList.raw.total > 0 ? \"Nice! You have our NFT\" : \"Sorry, you don't have our NFT\",\n            nftList: nftList.raw.result\n        }\n    };\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Protected);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9wcm90ZWN0ZWQuanN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFBNkM7QUFDZjtBQUU5QixTQUFTRSxTQUFTLENBQUMsRUFBRUMsT0FBTyxHQUFFQyxPQUFPLEdBQUUsRUFBRTtJQUNyQyxxQkFDSSw4REFBQ0MsS0FBRzs7MEJBQ0EsOERBQUNDLElBQUU7MEJBQUMsbUJBQWlCOzs7OztvQkFBSzswQkFDMUIsOERBQUNDLEdBQUM7MEJBQUVKLE9BQU87Ozs7O29CQUFLOzBCQUNoQiw4REFBQ0ssS0FBRzswQkFBRUMsSUFBSSxDQUFDQyxTQUFTLENBQUNOLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDOzs7OztvQkFBTzs7Ozs7O1lBQzNDLENBQ1I7Q0FDTDtBQUVNLGVBQWVPLGtCQUFrQixDQUFDQyxPQUFPLEVBQUU7SUFDOUMsTUFBTUMsT0FBTyxHQUFHLE1BQU1iLDJEQUFVLENBQUNZLE9BQU8sQ0FBQztJQUV6QyxJQUFJLENBQUNDLE9BQU8sRUFBRTtRQUNWLE9BQU87WUFDSEMsUUFBUSxFQUFFO2dCQUNOQyxXQUFXLEVBQUUsU0FBUztnQkFDdEJDLFNBQVMsRUFBRSxLQUFLO2FBQ25CO1NBQ0osQ0FBQztLQUNMO0lBRUQsTUFBTWYsb0RBQWEsQ0FBQztRQUFFaUIsTUFBTSxFQUFFQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0MsZUFBZTtLQUFFLENBQUMsQ0FBQztJQUU3RCxNQUFNakIsT0FBTyxHQUFHLE1BQU1ILGdGQUF5QyxDQUFDO1FBQzVEd0IsT0FBTyxFQUFFWixPQUFPLENBQUNhLElBQUksQ0FBQ0QsT0FBTztRQUM3QkUsWUFBWSxFQUFFLE9BQU87S0FDeEIsQ0FBQztJQUVGLE9BQU87UUFDSEMsS0FBSyxFQUFFO1lBQ0h6QixPQUFPLEVBQ0gsNkRBQTZEO1lBQzdEQyxPQUFPLENBQUN5QixHQUFHLENBQUNDLEtBQUssR0FBRyxDQUFDLEdBQUcsd0JBQXdCLEdBQUcsK0JBQStCO1lBQ3RGMUIsT0FBTyxFQUFFQSxPQUFPLENBQUN5QixHQUFHLENBQUNFLE1BQU07U0FDOUI7S0FDSixDQUFDO0NBQ0w7QUFDRCxpRUFBZTdCLFNBQVMsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL0Btb3JhbGlzd2ViMy9uZXh0LWRvY3MvLi9wYWdlcy9wcm90ZWN0ZWQuanN4PzBjZDQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0U2Vzc2lvbiB9IGZyb20gJ25leHQtYXV0aC9yZWFjdCc7XHJcbmltcG9ydCBNb3JhbGlzIGZyb20gJ21vcmFsaXMnO1xyXG5cclxuZnVuY3Rpb24gUHJvdGVjdGVkKHsgbWVzc2FnZSwgbmZ0TGlzdCB9KSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxoMz5Qcm90ZWN0ZWQgY29udGVudDwvaDM+XHJcbiAgICAgICAgICAgIDxwPnttZXNzYWdlfTwvcD5cclxuICAgICAgICAgICAgPHByZT57SlNPTi5zdHJpbmdpZnkobmZ0TGlzdCwgbnVsbCwgMil9PC9wcmU+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2VydmVyU2lkZVByb3BzKGNvbnRleHQpIHtcclxuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXNzaW9uKGNvbnRleHQpO1xyXG5cclxuICAgIGlmICghc2Vzc2lvbikge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlZGlyZWN0OiB7XHJcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbjogJy9zaWduaW4nLFxyXG4gICAgICAgICAgICAgICAgcGVybWFuZW50OiBmYWxzZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGF3YWl0IE1vcmFsaXMuc3RhcnQoeyBhcGlLZXk6IHByb2Nlc3MuZW52Lk1PUkFMSVNfQVBJX0tFWSB9KTtcclxuXHJcbiAgICBjb25zdCBuZnRMaXN0ID0gYXdhaXQgTW9yYWxpcy5Fdm1BcGkuYWNjb3VudC5nZXRORlRzRm9yQ29udHJhY3Qoe1xyXG4gICAgICAgIGFkZHJlc3M6IHNlc3Npb24udXNlci5hZGRyZXNzLFxyXG4gICAgICAgIHRva2VuQWRkcmVzczogJzB4Li4uJyxcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgbWVzc2FnZTpcclxuICAgICAgICAgICAgICAgIC8vIGlmIHVzZXIgaGFzIGF0IGxlYXN0IG9uZSBORlQgaGUgd2lsbCBnZXQgcHJvdGVjdGVkIGNvbnRlbnRcclxuICAgICAgICAgICAgICAgIG5mdExpc3QucmF3LnRvdGFsID4gMCA/ICdOaWNlISBZb3UgaGF2ZSBvdXIgTkZUJyA6IFwiU29ycnksIHlvdSBkb24ndCBoYXZlIG91ciBORlRcIixcclxuICAgICAgICAgICAgbmZ0TGlzdDogbmZ0TGlzdC5yYXcucmVzdWx0LFxyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IFByb3RlY3RlZDtcclxuIl0sIm5hbWVzIjpbImdldFNlc3Npb24iLCJNb3JhbGlzIiwiUHJvdGVjdGVkIiwibWVzc2FnZSIsIm5mdExpc3QiLCJkaXYiLCJoMyIsInAiLCJwcmUiLCJKU09OIiwic3RyaW5naWZ5IiwiZ2V0U2VydmVyU2lkZVByb3BzIiwiY29udGV4dCIsInNlc3Npb24iLCJyZWRpcmVjdCIsImRlc3RpbmF0aW9uIiwicGVybWFuZW50Iiwic3RhcnQiLCJhcGlLZXkiLCJwcm9jZXNzIiwiZW52IiwiTU9SQUxJU19BUElfS0VZIiwiRXZtQXBpIiwiYWNjb3VudCIsImdldE5GVHNGb3JDb250cmFjdCIsImFkZHJlc3MiLCJ1c2VyIiwidG9rZW5BZGRyZXNzIiwicHJvcHMiLCJyYXciLCJ0b3RhbCIsInJlc3VsdCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/protected.jsx\n");

/***/ }),

/***/ "moralis":
/*!**************************!*\
  !*** external "moralis" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("moralis");

/***/ }),

/***/ "next-auth/react":
/*!**********************************!*\
  !*** external "next-auth/react" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("next-auth/react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/protected.jsx"));
module.exports = __webpack_exports__;

})();