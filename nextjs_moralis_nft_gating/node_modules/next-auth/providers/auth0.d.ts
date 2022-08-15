import type { OAuthConfig, OAuthUserConfig } from ".";
export interface Auth0Profile extends Record<string, any> {
    sub: string;
    nickname: string;
    email: string;
    picture: string;
}
export default function Auth0<P extends Auth0Profile>(options: OAuthUserConfig<P>): OAuthConfig<P>;
