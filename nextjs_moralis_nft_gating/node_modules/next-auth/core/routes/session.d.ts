import type { InternalOptions } from "../types";
import type { OutgoingResponse } from "..";
import type { Session } from "../..";
import type { SessionStore } from "../lib/cookie";
interface SessionParams {
    options: InternalOptions;
    sessionStore: SessionStore;
}
/**
 * Return a session object (without any private fields)
 * for Single Page App clients
 */
export default function session(params: SessionParams): Promise<OutgoingResponse<Session | {}>>;
export {};
