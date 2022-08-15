const getGlobal = () => {
    if (typeof globalThis !== 'undefined')
        return globalThis;
    if (typeof self !== 'undefined')
        return self;
    if (typeof window !== 'undefined')
        return window;
    throw new Error('unable to locate global object');
};
export default async (digest, ikm, salt, info, keylen) => {
    const { crypto: { subtle }, } = getGlobal();
    return new Uint8Array(await subtle.deriveBits({
        name: 'HKDF',
        hash: `SHA-${digest.substr(3)}`,
        salt,
        info,
    }, await subtle.importKey('raw', ikm, 'HKDF', false, ['deriveBits']), keylen << 3));
};
