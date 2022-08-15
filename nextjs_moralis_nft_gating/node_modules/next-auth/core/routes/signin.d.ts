import type { RequestInternal, OutgoingResponse } from "..";
import type { InternalOptions } from "../types";
/** Handle requests to /api/auth/signin */
export default function signin(params: {
    options: InternalOptions<"oauth" | "email">;
    query: RequestInternal["query"];
    body: RequestInternal["body"];
}): Promise<OutgoingResponse>;
