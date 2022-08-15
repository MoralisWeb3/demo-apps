import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import type { NextAuthOptions, Session } from "..";
declare function NextAuth(options: NextAuthOptions): any;
declare function NextAuth(req: NextApiRequest, res: NextApiResponse, options: NextAuthOptions): any;
export default NextAuth;
export declare function unstable_getServerSession(...args: [
    GetServerSidePropsContext["req"],
    GetServerSidePropsContext["res"],
    NextAuthOptions
] | [NextApiRequest, NextApiResponse, NextAuthOptions]): Promise<Session | null>;
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXTAUTH_URL?: string;
            VERCEL?: "1";
        }
    }
}
