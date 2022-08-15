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
exports.id = "pages/api/auth/[...nextauth]";
exports.ids = ["pages/api/auth/[...nextauth]"];
exports.modules = {

/***/ "moralis":
/*!**************************!*\
  !*** external "moralis" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("moralis");

/***/ }),

/***/ "next-auth":
/*!****************************!*\
  !*** external "next-auth" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("next-auth");

/***/ }),

/***/ "next-auth/providers/credentials":
/*!**************************************************!*\
  !*** external "next-auth/providers/credentials" ***!
  \**************************************************/
/***/ ((module) => {

module.exports = require("next-auth/providers/credentials");

/***/ }),

/***/ "(api)/./pages/api/auth/[...nextauth].js":
/*!*****************************************!*\
  !*** ./pages/api/auth/[...nextauth].js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"next-auth/providers/credentials\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"next-auth\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var moralis__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moralis */ \"moralis\");\n/* harmony import */ var moralis__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moralis__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_1___default()({\n    providers: [\n        next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0___default()({\n            name: \"MoralisAuth\",\n            credentials: {\n                message: {\n                    label: \"Message\",\n                    type: \"text\",\n                    placeholder: \"0x0\"\n                },\n                signature: {\n                    label: \"Signature\",\n                    type: \"text\",\n                    placeholder: \"0x0\"\n                }\n            },\n            async authorize (credentials) {\n                try {\n                    const { message , signature  } = credentials;\n                    await moralis__WEBPACK_IMPORTED_MODULE_2___default().start({\n                        apiKey: process.env.MORALIS_API_KEY\n                    });\n                    const { address , profileId , expirationTime  } = (await moralis__WEBPACK_IMPORTED_MODULE_2___default().Auth.verify({\n                        message,\n                        signature,\n                        network: \"evm\"\n                    })).raw;\n                    const user = {\n                        address,\n                        profileId,\n                        expirationTime,\n                        signature\n                    };\n                    return user;\n                } catch (e) {\n                    // eslint-disable-next-line no-console\n                    console.error(e);\n                    return null;\n                }\n            }\n        }), \n    ],\n    callbacks: {\n        async jwt ({ token , user  }) {\n            user && (token.user = user);\n            return token;\n        },\n        async session ({ session , token  }) {\n            session.expires = token.user.expirationTime;\n            session.user = token.user;\n            return session;\n        }\n    },\n    session: {\n        strategy: \"jwt\"\n    }\n}));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBa0U7QUFDakM7QUFDSDtBQUU5QixpRUFBZUMsZ0RBQVEsQ0FBQztJQUNwQkUsU0FBUyxFQUFFO1FBQ1BILHNFQUFtQixDQUFDO1lBQ2hCSSxJQUFJLEVBQUUsYUFBYTtZQUNuQkMsV0FBVyxFQUFFO2dCQUNUQyxPQUFPLEVBQUU7b0JBQ0xDLEtBQUssRUFBRSxTQUFTO29CQUNoQkMsSUFBSSxFQUFFLE1BQU07b0JBQ1pDLFdBQVcsRUFBRSxLQUFLO2lCQUNyQjtnQkFDREMsU0FBUyxFQUFFO29CQUNQSCxLQUFLLEVBQUUsV0FBVztvQkFDbEJDLElBQUksRUFBRSxNQUFNO29CQUNaQyxXQUFXLEVBQUUsS0FBSztpQkFDckI7YUFDSjtZQUNELE1BQU1FLFNBQVMsRUFBQ04sV0FBVyxFQUFFO2dCQUN6QixJQUFJO29CQUNBLE1BQU0sRUFBRUMsT0FBTyxHQUFFSSxTQUFTLEdBQUUsR0FBR0wsV0FBVztvQkFFMUMsTUFBTUgsb0RBQWEsQ0FBQzt3QkFBRVcsTUFBTSxFQUFFQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0MsZUFBZTtxQkFBRSxDQUFDLENBQUM7b0JBRTdELE1BQU0sRUFBRUMsT0FBTyxHQUFFQyxTQUFTLEdBQUVDLGNBQWMsR0FBRSxHQUFHLENBQUMsTUFBTWpCLDBEQUFtQixDQUFDO3dCQUFFSSxPQUFPO3dCQUFFSSxTQUFTO3dCQUFFWSxPQUFPLEVBQUUsS0FBSztxQkFBRSxDQUFDLENBQUMsQ0FBQ0MsR0FBRztvQkFFdEgsTUFBTUMsSUFBSSxHQUFHO3dCQUFFUCxPQUFPO3dCQUFFQyxTQUFTO3dCQUFFQyxjQUFjO3dCQUFFVCxTQUFTO3FCQUFFO29CQUU5RCxPQUFPYyxJQUFJLENBQUM7aUJBQ2YsQ0FBQyxPQUFPQyxDQUFDLEVBQUU7b0JBQ1Isc0NBQXNDO29CQUN0Q0MsT0FBTyxDQUFDQyxLQUFLLENBQUNGLENBQUMsQ0FBQyxDQUFDO29CQUNqQixPQUFPLElBQUksQ0FBQztpQkFDZjthQUNKO1NBQ0osQ0FBQztLQUNMO0lBQ0RHLFNBQVMsRUFBRTtRQUNQLE1BQU1DLEdBQUcsRUFBQyxFQUFFQyxLQUFLLEdBQUVOLElBQUksR0FBRSxFQUFFO1lBQ3ZCQSxJQUFJLElBQUksQ0FBQ00sS0FBSyxDQUFDTixJQUFJLEdBQUdBLElBQUksQ0FBQyxDQUFDO1lBQzVCLE9BQU9NLEtBQUssQ0FBQztTQUNoQjtRQUNELE1BQU1DLE9BQU8sRUFBQyxFQUFFQSxPQUFPLEdBQUVELEtBQUssR0FBRSxFQUFFO1lBQzlCQyxPQUFPLENBQUNDLE9BQU8sR0FBR0YsS0FBSyxDQUFDTixJQUFJLENBQUNMLGNBQWMsQ0FBQztZQUM1Q1ksT0FBTyxDQUFDUCxJQUFJLEdBQUdNLEtBQUssQ0FBQ04sSUFBSSxDQUFDO1lBQzFCLE9BQU9PLE9BQU8sQ0FBQztTQUNsQjtLQUNKO0lBQ0RBLE9BQU8sRUFBRTtRQUNMRSxRQUFRLEVBQUUsS0FBSztLQUNsQjtDQUNKLENBQUMsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL0Btb3JhbGlzd2ViMy9uZXh0LWRvY3MvLi9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLmpzPzUyN2YiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSAnbmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFscyc7XHJcbmltcG9ydCBOZXh0QXV0aCBmcm9tICduZXh0LWF1dGgnO1xyXG5pbXBvcnQgTW9yYWxpcyBmcm9tICdtb3JhbGlzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE5leHRBdXRoKHtcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xyXG4gICAgICAgICAgICBuYW1lOiAnTW9yYWxpc0F1dGgnLFxyXG4gICAgICAgICAgICBjcmVkZW50aWFsczoge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnTWVzc2FnZScsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnMHgwJyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzaWduYXR1cmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1NpZ25hdHVyZScsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnMHgwJyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscykge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IG1lc3NhZ2UsIHNpZ25hdHVyZSB9ID0gY3JlZGVudGlhbHM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IE1vcmFsaXMuc3RhcnQoeyBhcGlLZXk6IHByb2Nlc3MuZW52Lk1PUkFMSVNfQVBJX0tFWSB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBhZGRyZXNzLCBwcm9maWxlSWQsIGV4cGlyYXRpb25UaW1lIH0gPSAoYXdhaXQgTW9yYWxpcy5BdXRoLnZlcmlmeSh7IG1lc3NhZ2UsIHNpZ25hdHVyZSwgbmV0d29yazogJ2V2bScgfSkpLnJhdztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXNlciA9IHsgYWRkcmVzcywgcHJvZmlsZUlkLCBleHBpcmF0aW9uVGltZSwgc2lnbmF0dXJlIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1c2VyO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KSxcclxuICAgIF0sXHJcbiAgICBjYWxsYmFja3M6IHtcclxuICAgICAgICBhc3luYyBqd3QoeyB0b2tlbiwgdXNlciB9KSB7XHJcbiAgICAgICAgICAgIHVzZXIgJiYgKHRva2VuLnVzZXIgPSB1c2VyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuIH0pIHtcclxuICAgICAgICAgICAgc2Vzc2lvbi5leHBpcmVzID0gdG9rZW4udXNlci5leHBpcmF0aW9uVGltZTtcclxuICAgICAgICAgICAgc2Vzc2lvbi51c2VyID0gdG9rZW4udXNlcjtcclxuICAgICAgICAgICAgcmV0dXJuIHNlc3Npb247XHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBzZXNzaW9uOiB7XHJcbiAgICAgICAgc3RyYXRlZ3k6ICdqd3QnLFxyXG4gICAgfSxcclxufSk7XHJcbiJdLCJuYW1lcyI6WyJDcmVkZW50aWFsc1Byb3ZpZGVyIiwiTmV4dEF1dGgiLCJNb3JhbGlzIiwicHJvdmlkZXJzIiwibmFtZSIsImNyZWRlbnRpYWxzIiwibWVzc2FnZSIsImxhYmVsIiwidHlwZSIsInBsYWNlaG9sZGVyIiwic2lnbmF0dXJlIiwiYXV0aG9yaXplIiwic3RhcnQiLCJhcGlLZXkiLCJwcm9jZXNzIiwiZW52IiwiTU9SQUxJU19BUElfS0VZIiwiYWRkcmVzcyIsInByb2ZpbGVJZCIsImV4cGlyYXRpb25UaW1lIiwiQXV0aCIsInZlcmlmeSIsIm5ldHdvcmsiLCJyYXciLCJ1c2VyIiwiZSIsImNvbnNvbGUiLCJlcnJvciIsImNhbGxiYWNrcyIsImp3dCIsInRva2VuIiwic2Vzc2lvbiIsImV4cGlyZXMiLCJzdHJhdGVneSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/auth/[...nextauth].js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/auth/[...nextauth].js"));
module.exports = __webpack_exports__;

})();