import { createHmac } from 'crypto';
export default (digest, ikm, salt, info, keylen) => {
    const hashlen = parseInt(digest.substr(3), 10) >> 3 || 20;
    const prk = createHmac(digest, salt.byteLength ? salt : new Uint8Array(hashlen))
        .update(ikm)
        .digest();
    const N = Math.ceil(keylen / hashlen);
    const T = new Uint8Array(hashlen * N + info.byteLength + 1);
    let prev = 0;
    let start = 0;
    for (let c = 1; c <= N; c++) {
        T.set(info, start);
        T[start + info.byteLength] = c;
        T.set(createHmac(digest, prk)
            .update(T.subarray(prev, start + info.byteLength + 1))
            .digest(), start);
        prev = start;
        start += hashlen;
    }
    return T.slice(0, keylen);
};
