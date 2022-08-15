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
exports.id = "pages/user";
exports.ids = ["pages/user"];
exports.modules = {

/***/ "./pages/user.jsx":
/*!************************!*\
  !*** ./pages/user.jsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"getServerSideProps\": () => (/* binding */ getServerSideProps)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/react */ \"next-auth/react\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nfunction User({ user  }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h4\", {\n                children: \"User session:\"\n            }, void 0, false, {\n                fileName: \"E:\\\\Work\\\\Moralis\\\\demo-apps\\\\nextjs_moralis_nft\\\\pages\\\\user.jsx\",\n                lineNumber: 6,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"pre\", {\n                children: JSON.stringify(user, null, 2)\n            }, void 0, false, {\n                fileName: \"E:\\\\Work\\\\Moralis\\\\demo-apps\\\\nextjs_moralis_nft\\\\pages\\\\user.jsx\",\n                lineNumber: 7,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                onClick: ()=>(0,next_auth_react__WEBPACK_IMPORTED_MODULE_1__.signOut)({\n                        redirect: \"/signin\"\n                    }),\n                children: \"Sign out\"\n            }, void 0, false, {\n                fileName: \"E:\\\\Work\\\\Moralis\\\\demo-apps\\\\nextjs_moralis_nft\\\\pages\\\\user.jsx\",\n                lineNumber: 8,\n                columnNumber: 13\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"E:\\\\Work\\\\Moralis\\\\demo-apps\\\\nextjs_moralis_nft\\\\pages\\\\user.jsx\",\n        lineNumber: 5,\n        columnNumber: 9\n    }, this);\n}\nasync function getServerSideProps(context) {\n    const session = await (0,next_auth_react__WEBPACK_IMPORTED_MODULE_1__.getSession)(context);\n    if (!session) {\n        return {\n            redirect: {\n                destination: \"/signin\",\n                permanent: false\n            }\n        };\n    }\n    return {\n        props: {\n            user: session.user\n        }\n    };\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy91c2VyLmpzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUFzRDtBQUV0RCxTQUFTRSxJQUFJLENBQUMsRUFBRUMsSUFBSSxHQUFFLEVBQUU7SUFDcEIscUJBQ0ksOERBQUNDLEtBQUc7OzBCQUNBLDhEQUFDQyxJQUFFOzBCQUFDLGVBQWE7Ozs7O29CQUFLOzBCQUN0Qiw4REFBQ0MsS0FBRzswQkFBRUMsSUFBSSxDQUFDQyxTQUFTLENBQUNMLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDOzs7OztvQkFBTzswQkFDMUMsOERBQUNNLFFBQU07Z0JBQUNDLE9BQU8sRUFBRSxJQUFNVCx3REFBTyxDQUFDO3dCQUFFVSxRQUFRLEVBQUUsU0FBUztxQkFBRSxDQUFDOzBCQUFFLFVBQVE7Ozs7O29CQUFTOzs7Ozs7WUFDeEUsQ0FDUjtDQUNMO0FBRU0sZUFBZUMsa0JBQWtCLENBQUNDLE9BQU8sRUFBRTtJQUM5QyxNQUFNQyxPQUFPLEdBQUcsTUFBTWQsMkRBQVUsQ0FBQ2EsT0FBTyxDQUFDO0lBRXpDLElBQUksQ0FBQ0MsT0FBTyxFQUFFO1FBQ1YsT0FBTztZQUNISCxRQUFRLEVBQUU7Z0JBQ05JLFdBQVcsRUFBRSxTQUFTO2dCQUN0QkMsU0FBUyxFQUFFLEtBQUs7YUFDbkI7U0FDSixDQUFDO0tBQ0w7SUFFRCxPQUFPO1FBQ0hDLEtBQUssRUFBRTtZQUFFZCxJQUFJLEVBQUVXLE9BQU8sQ0FBQ1gsSUFBSTtTQUFFO0tBQ2hDLENBQUM7Q0FDTDtBQUVELGlFQUFlRCxJQUFJLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AbW9yYWxpc3dlYjMvbmV4dC1kb2NzLy4vcGFnZXMvdXNlci5qc3g/MjI1OCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRTZXNzaW9uLCBzaWduT3V0IH0gZnJvbSAnbmV4dC1hdXRoL3JlYWN0JztcclxuXHJcbmZ1bmN0aW9uIFVzZXIoeyB1c2VyIH0pIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPGg0PlVzZXIgc2Vzc2lvbjo8L2g0PlxyXG4gICAgICAgICAgICA8cHJlPntKU09OLnN0cmluZ2lmeSh1c2VyLCBudWxsLCAyKX08L3ByZT5cclxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzaWduT3V0KHsgcmVkaXJlY3Q6ICcvc2lnbmluJyB9KX0+U2lnbiBvdXQ8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTZXJ2ZXJTaWRlUHJvcHMoY29udGV4dCkge1xyXG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlc3Npb24oY29udGV4dCk7XHJcblxyXG4gICAgaWYgKCFzZXNzaW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVkaXJlY3Q6IHtcclxuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uOiAnL3NpZ25pbicsXHJcbiAgICAgICAgICAgICAgICBwZXJtYW5lbnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBwcm9wczogeyB1c2VyOiBzZXNzaW9uLnVzZXIgfSxcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVzZXI7XHJcbiJdLCJuYW1lcyI6WyJnZXRTZXNzaW9uIiwic2lnbk91dCIsIlVzZXIiLCJ1c2VyIiwiZGl2IiwiaDQiLCJwcmUiLCJKU09OIiwic3RyaW5naWZ5IiwiYnV0dG9uIiwib25DbGljayIsInJlZGlyZWN0IiwiZ2V0U2VydmVyU2lkZVByb3BzIiwiY29udGV4dCIsInNlc3Npb24iLCJkZXN0aW5hdGlvbiIsInBlcm1hbmVudCIsInByb3BzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/user.jsx\n");

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
var __webpack_exports__ = (__webpack_exec__("./pages/user.jsx"));
module.exports = __webpack_exports__;

})();