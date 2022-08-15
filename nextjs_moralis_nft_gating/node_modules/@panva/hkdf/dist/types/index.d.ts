declare function hkdf(digest: 'sha256' | 'sha384' | 'sha512' | 'sha1' | string, ikm: Uint8Array | string, salt: Uint8Array | string, info: Uint8Array | string, keylen: number): Promise<Uint8Array>;
export { hkdf, hkdf as default };
