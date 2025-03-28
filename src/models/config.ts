export interface Config {
    meta?: {
        title?: string;
        description?: string;
        keywords?: string;
    };
    auth?: {
        is_registration_enabled?: boolean;
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
