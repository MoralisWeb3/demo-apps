import type { InternalOptions } from "../types";
import type { RequestInternal, OutgoingResponse } from "..";
import type { SessionStore } from "../lib/cookie";
/** Handle callbacks from login services */
export default function callback(params: {
    options: InternalOptions<"oauth" | "credentials" | "email">;
    query: RequestInternal["query"];
    method: Required<RequestInternal>["method"];
    body: RequestInternal["body"];
    headers: RequestInternal["headers"];
    cookies: RequestInternal["cookies"];
    sessionStore: SessionStore;
}): Promise<OutgoingResponse>;
