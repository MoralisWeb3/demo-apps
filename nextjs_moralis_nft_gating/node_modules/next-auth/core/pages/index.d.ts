import type { InternalOptions } from "../types";
import type { RequestInternal, OutgoingResponse } from "..";
import type { Cookie } from "../lib/cookie";
import type { ErrorType } from "./error";
declare type RenderPageParams = {
    query?: RequestInternal["query"];
    cookies?: Cookie[];
} & Partial<Pick<InternalOptions, "url" | "callbackUrl" | "csrfToken" | "providers" | "theme">>;
/**
 * Unless the user defines their [own pages](https://next-auth.js.org/configuration/pages),
 * we render a set of default ones, using Preact SSR.
 */
export default function renderPage(params: RenderPageParams): {
    signin(props?: any): OutgoingResponse<any>;
    signout(props?: any): OutgoingResponse<any>;
    verifyRequest(props?: any): OutgoingResponse<any>;
    error(props?: {
        error?: ErrorType;
    }): OutgoingResponse<any>;
};
export {};
