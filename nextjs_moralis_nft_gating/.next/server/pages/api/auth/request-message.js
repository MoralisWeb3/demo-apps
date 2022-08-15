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
exports.id = "pages/api/auth/request-message";
exports.ids = ["pages/api/auth/request-message"];
exports.modules = {

/***/ "moralis":
/*!**************************!*\
  !*** external "moralis" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("moralis");

/***/ }),

/***/ "(api)/./pages/api/auth/request-message.js":
/*!*******************************************!*\
  !*** ./pages/api/auth/request-message.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var moralis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moralis */ \"moralis\");\n/* harmony import */ var moralis__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moralis__WEBPACK_IMPORTED_MODULE_0__);\n\nconst config = {\n    domain: process.env.APP_DOMAIN,\n    statement: \"Please sign this message to confirm your identity.\",\n    uri: process.env.NEXTAUTH_URL,\n    timeout: 60\n};\nasync function handler(req, res) {\n    const { address , chain , network  } = req.body;\n    await moralis__WEBPACK_IMPORTED_MODULE_0___default().start({\n        apiKey: process.env.MORALIS_API_KEY\n    });\n    try {\n        const message = await moralis__WEBPACK_IMPORTED_MODULE_0___default().Auth.requestMessage({\n            address,\n            chain,\n            network,\n            ...config\n        });\n        res.status(200).json(message);\n    } catch (error) {\n        res.status(400).json({\n            error\n        });\n        console.error(error);\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvYXV0aC9yZXF1ZXN0LW1lc3NhZ2UuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQThCO0FBRTlCLE1BQU1DLE1BQU0sR0FBRztJQUNYQyxNQUFNLEVBQUVDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxVQUFVO0lBQzlCQyxTQUFTLEVBQUUsb0RBQW9EO0lBQy9EQyxHQUFHLEVBQUVKLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDSSxZQUFZO0lBQzdCQyxPQUFPLEVBQUUsRUFBRTtDQUNkO0FBRWMsZUFBZUMsT0FBTyxDQUFDQyxHQUFHLEVBQUVDLEdBQUcsRUFBRTtJQUM1QyxNQUFNLEVBQUVDLE9BQU8sR0FBRUMsS0FBSyxHQUFFQyxPQUFPLEdBQUUsR0FBR0osR0FBRyxDQUFDSyxJQUFJO0lBRTVDLE1BQU1oQixvREFBYSxDQUFDO1FBQUVrQixNQUFNLEVBQUVmLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDZSxlQUFlO0tBQUUsQ0FBQyxDQUFDO0lBRTdELElBQUk7UUFDQSxNQUFNQyxPQUFPLEdBQUcsTUFBTXBCLGtFQUEyQixDQUFDO1lBQzlDYSxPQUFPO1lBQ1BDLEtBQUs7WUFDTEMsT0FBTztZQUNQLEdBQUdkLE1BQU07U0FDWixDQUFDO1FBRUZXLEdBQUcsQ0FBQ1csTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUNKLE9BQU8sQ0FBQyxDQUFDO0tBQ2pDLENBQUMsT0FBT0ssS0FBSyxFQUFFO1FBQ1piLEdBQUcsQ0FBQ1csTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7WUFBRUMsS0FBSztTQUFFLENBQUMsQ0FBQztRQUNoQ0MsT0FBTyxDQUFDRCxLQUFLLENBQUNBLEtBQUssQ0FBQyxDQUFDO0tBQ3hCO0NBQ0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AbW9yYWxpc3dlYjMvbmV4dC1kb2NzLy4vcGFnZXMvYXBpL2F1dGgvcmVxdWVzdC1tZXNzYWdlLmpzPzJlZWIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vcmFsaXMgZnJvbSAnbW9yYWxpcyc7XHJcblxyXG5jb25zdCBjb25maWcgPSB7XHJcbiAgICBkb21haW46IHByb2Nlc3MuZW52LkFQUF9ET01BSU4sXHJcbiAgICBzdGF0ZW1lbnQ6ICdQbGVhc2Ugc2lnbiB0aGlzIG1lc3NhZ2UgdG8gY29uZmlybSB5b3VyIGlkZW50aXR5LicsXHJcbiAgICB1cmk6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1VSTCxcclxuICAgIHRpbWVvdXQ6IDYwLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihyZXEsIHJlcykge1xyXG4gICAgY29uc3QgeyBhZGRyZXNzLCBjaGFpbiwgbmV0d29yayB9ID0gcmVxLmJvZHk7XHJcblxyXG4gICAgYXdhaXQgTW9yYWxpcy5zdGFydCh7IGFwaUtleTogcHJvY2Vzcy5lbnYuTU9SQUxJU19BUElfS0VZIH0pO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGF3YWl0IE1vcmFsaXMuQXV0aC5yZXF1ZXN0TWVzc2FnZSh7XHJcbiAgICAgICAgICAgIGFkZHJlc3MsXHJcbiAgICAgICAgICAgIGNoYWluLFxyXG4gICAgICAgICAgICBuZXR3b3JrLFxyXG4gICAgICAgICAgICAuLi5jb25maWcsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKG1lc3NhZ2UpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yIH0pO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJNb3JhbGlzIiwiY29uZmlnIiwiZG9tYWluIiwicHJvY2VzcyIsImVudiIsIkFQUF9ET01BSU4iLCJzdGF0ZW1lbnQiLCJ1cmkiLCJORVhUQVVUSF9VUkwiLCJ0aW1lb3V0IiwiaGFuZGxlciIsInJlcSIsInJlcyIsImFkZHJlc3MiLCJjaGFpbiIsIm5ldHdvcmsiLCJib2R5Iiwic3RhcnQiLCJhcGlLZXkiLCJNT1JBTElTX0FQSV9LRVkiLCJtZXNzYWdlIiwiQXV0aCIsInJlcXVlc3RNZXNzYWdlIiwic3RhdHVzIiwianNvbiIsImVycm9yIiwiY29uc29sZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/auth/request-message.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/auth/request-message.js"));
module.exports = __webpack_exports__;

})();