import type { CommonProviderOptions } from ".";
import type { Options as SMTPTransportOptions } from "nodemailer/lib/smtp-transport";
import type { Awaitable } from "..";
import type { Theme } from "../core/types";
export interface SendVerificationRequestParams {
    identifier: string;
    url: string;
    expires: Date;
    provider: EmailConfig;
    token: string;
    theme: Theme;
}
export interface EmailConfig extends CommonProviderOptions {
    type: "email";
    server: string | SMTPTransportOptions;
    /** @default "NextAuth <no-reply@example.com>" */
    from?: string;
    /**
     * How long until the e-mail can be used to log the user in,
     * in seconds. Defaults to 1 day
     * @default 86400
     */
    maxAge?: number;
    /** [Documentation](https://next-auth.js.org/providers/email#customizing-emails) */
    sendVerificationRequest: (params: SendVerificationRequestParams) => Awaitable<void>;
    /**
     * By default, we are generating a random verification token.
     * You can make it predictable or modify it as you like with this method.
     * @example
     * ```js
     *  Providers.Email({
     *    async generateVerificationToken() {
     *      return "ABC123"
     *    }
     *  })
     * ```
     * [Documentation](https://next-auth.js.org/providers/email#customising-the-verification-token)
     */
    generateVerificationToken?: () => Awaitable<string>;
    /** If defined, it is used to hash the verification token when saving to the database . */
    secret?: string;
    /**
     * Normalizes the user input before sending the verification request.
     *
     * ⚠️ Always make sure this method returns a single email address.
     *
     * @note Technically, the part of the email address local mailbox element
     * (everything before the `@` symbol) should be treated as 'case sensitive'
     * according to RFC 2821, but in practice this causes more problems than
     * it solves, e.g.: when looking up users by e-mail from databases.
     * By default, we treat email addresses as all lower case,
     * but you can override this function to change this behavior.
     *
     * [Documentation](https://next-auth.js.org/providers/email#normalizing-the-e-mail-address) | [RFC 2821](https://tools.ietf.org/html/rfc2821) | [Email syntax](https://en.wikipedia.org/wiki/Email_address#Syntax)
     */
    normalizeIdentifier?: (identifier: string) => string;
    options: EmailUserConfig;
}
export declare type EmailUserConfig = Partial<Omit<EmailConfig, "options">>;
export declare type EmailProvider = (options: EmailUserConfig) => EmailConfig;
export declare type EmailProviderType = "Email";
export default function Email(options: EmailUserConfig): EmailConfig;
