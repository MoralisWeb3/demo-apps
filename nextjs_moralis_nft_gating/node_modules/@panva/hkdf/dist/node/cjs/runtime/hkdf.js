"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const fallback_js_1 = require("./fallback.js");
let hkdf;
if (typeof crypto.hkdf === 'function' && !process.versions.electron) {
    hkdf = async (...args) => new Promise((resolve, reject) => {
        crypto.hkdf(...args, (err, arrayBuffer) => {
            if (err)
                reject(err);
            else
                resolve(new Uint8Array(arrayBuffer));
        });
    });
}
exports.default = async (digest, ikm, salt, info, keylen) => (hkdf || fallback_js_1.default)(digest, ikm, salt, info, keylen);
