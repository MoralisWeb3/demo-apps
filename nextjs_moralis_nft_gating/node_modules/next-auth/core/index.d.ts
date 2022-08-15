import type { NextAuthAction, NextAuthOptions } from "./types";
import type { Cookie } from "./lib/cookie";
export interface RequestInternal {
    /** @default "http://localhost:3000" */
    host?: string;
    method?: string;
    cookies?: Partial<Record<string, string>>;
    headers?: Record<string, any>;
    query?: Record<string, any>;
    body?: Record<string, any>;
    action: NextAuthAction;
    providerId?: string;
    error?: string;
}
export interface NextAuthHeader {
    key: string;
    value: string;
}
export interface OutgoingResponse<Body extends string | Record<string, any> | any[] = any> {
    status?: number;
    headers?: NextAuthHeader[];
    body?: Body;
    redirect?: string;
    cookies?: Cookie[];
}
export interface NextAuthHandlerParams {
    req: Request | RequestInternal;
    options: NextAuthOptions;
}
export declare function NextAuthHandler<Body extends string | Record<string, any> | any[]>(params: NextAuthHandlerParams): Promise<OutgoingResponse<Body>>;
