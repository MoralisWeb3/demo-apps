import * as crypto from 'crypto';
import fallback from './fallback.js';
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
export default async (digest, ikm, salt, info, keylen) => (hkdf || fallback)(digest, ikm, salt, info, keylen);
