import { getCaptcha } from "@/api/config";
import { useConfigStore } from "@/storages/config";
import { useThemeStore } from "@/storages/theme";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { Turnstile } from "@marsidev/react-turnstile";
import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { useSharedStore } from "@/storages/shared";
import { Bot, RefreshCcw } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export interface CaptchaProps {
    onChange: (captcha?: { id?: string; content?: string }) => void;
}

export function Captcha(props: CaptchaProps) {
    const { onChange } = props;
    const configStore = useConfigStore();
    const themeStore = useThemeStore();

    switch (configStore?.config?.captcha?.provider) {
        case "none":
            return <></>;
        case "turnstile":
            return (
                <Turnstile
                    siteKey={String(
                        configStore?.config?.captcha?.turnstile?.site_key
                    )}
                    onSuccess={(token) => onChange({ content: token })}
                    options={{
                        size: "flexible",
                        theme: themeStore?.theme === "dark" ? "dark" : "light",
                    }}
                />
            );
        case "hcaptcha":
            return (
                <HCaptcha
                    sitekey={String(
                        configStore?.config?.captcha?.hcaptcha?.site_key
                    )}
                    onVerify={(token) => onChange({ content: token })}
                />
            );
        case "pow":
            return <PowCaptcha onChange={onChange} />;
        case "image":
            return <ImageCaptcha onChange={onChange} />;
    }
}

function PowCaptcha(props: CaptchaProps) {
    const { onChange } = props;

    const [refresh, setRefresh] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const sharedStore = useSharedStore();

    const [result, setResult] = useState<string>();
    const [id, setId] = useState<string>();

    useEffect(() => {
        const calculateWorker = new Worker(
            new URL("@/workers/pow.ts", import.meta.url),
            { type: "module" }
        );

        calculateWorker.onmessage = (e) => {
            const result = e.data;
            setResult(result);
            setLoading(false);
        };

        async function fetchCaptchaData() {
            setLoading(true);
            const res = await getCaptcha();
            const d = Number(res.data?.challenge?.split("#")[0]);
            const c = res.data?.challenge?.split("#")[1];
            setId(res.data?.id);

            calculateWorker.postMessage({ c, d });
        }

        fetchCaptchaData();

        return () => {
            calculateWorker.terminate();
        };
    }, [refresh, sharedStore.refresh]);

    useEffect(() => {
        onChange({
            id,
            content: result,
        });
    }, [id, result]);

    return (
        <Input
            readOnly
            disabled
            value={result}
            icon={<Bot className="size-4" />}
            extraBtn={
                <Button
                    disabled={loading}
                    onClick={() => setRefresh((prev) => prev + 1)}
                    loading={loading}
                    icon={<RefreshCcw />}
                />
            }
        />
    );
}

function ImageCaptcha(props: CaptchaProps) {
    const { onChange } = props;
    const sharedStore = useSharedStore();

    const [refresh, setRefresh] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    const [result, setResult] = useState<string>();
    const [id, setId] = useState<string>();
    const [challenge, setChallenge] = useState<string>();

    async function fetchCaptchaData() {
        setLoading(true);
        const res = await getCaptcha();
        setId(res.data?.id);
        setChallenge(res.data?.challenge);
    }

    useEffect(() => {
        fetchCaptchaData();
    }, [refresh, sharedStore.refresh]);

    useEffect(() => {
        onChange({
            id,
            content: result,
        });
    }, [id, result]);

    return (
        <div>
            <Input
                value={result}
                onChange={(e) => setResult(e.target.value)}
                placeholder={"验证码"}
            />
            <img
                src={`data:image/svg+xml;base64,${CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(String(challenge)))}`}
                onClick={() => setRefresh((prev) => prev + 1)}
                draggable={false}
                style={{
                    height: 40,
                    width: 60,
                }}
            />
        </div>
    );
}
