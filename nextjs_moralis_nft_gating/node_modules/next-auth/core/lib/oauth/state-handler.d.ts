import type { InternalOptions } from "../../types";
import type { Cookie } from "../cookie";
/** Returns state if the provider supports it */
export declare function createState(options: InternalOptions<"oauth">): Promise<{
    cookie: Cookie;
    value: string;
} | undefined>;
/**
 * Returns state from if the provider supports states,
 * and clears the container cookie afterwards.
 */
export declare function useState(state: string | undefined, options: InternalOptions<"oauth">): Promise<{
    value: string;
    cookie: Cookie;
} | undefined>;
