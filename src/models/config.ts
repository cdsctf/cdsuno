export interface Config {
    meta?: {
        title?: string;
        description?: string;
        keywords?: string;
    };
    auth?: {
        is_registration_enabled?: boolean;
    };
    email?: {
        is_enabled?: boolean;
        host?: string;
        port?: number;
        tls?: "starttls" | "tls" | "none";
        username?: string;
        password?: string;
        whitelist?: Array<string>;
    };
    captcha?: {
        provider?: "none" | "pow" | "image" | "turnstile" | "hcaptcha";
        difficulty?: number;
        turnstile?: {
            url?: string;
            site_key?: string;
            secret_key?: string;
        };
        hcaptcha?: {
            url?: string;
            site_key?: string;
            secret_key?: string;
            score?: number;
        };
    };
}

export interface Version {
    tag?: string;
    commit?: string;
}
