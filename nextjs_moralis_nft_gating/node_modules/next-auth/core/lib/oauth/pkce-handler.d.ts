import type { InternalOptions } from "../../types";
import type { Cookie } from "../cookie";
/**
 * Returns `code_challenge` and `code_challenge_method`
 * and saves them in a cookie.
 */
export declare function createPKCE(options: InternalOptions<"oauth">): Promise<undefined | {
    code_challenge: string;
    code_challenge_method: "S256";
    cookie: Cookie;
}>;
/**
 * Returns code_verifier if provider uses PKCE,
 * and clears the container cookie afterwards.
 */
export declare function usePKCECodeVerifier(codeVerifier: string | undefined, options: InternalOptions<"oauth">): Promise<{
    codeVerifier: string;
    cookie: Cookie;
} | undefined>;
