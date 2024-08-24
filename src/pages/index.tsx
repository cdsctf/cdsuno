import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { useState } from "react";

export default function Page() {
    const [color, setColor] = useState("#1cb0f6");
    const handleChange = (e: any) => {
        setColor(e.target.value);
    };

    const [value, setValue] = useState<string>("");

    return (
        <>
            <div
                style={{
                    padding: 20,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        gap: 20,
                    }}
                >
                    <input type="color" value={color} onChange={handleChange} />
                    <Button color={color} size="lg" variant="solid">
                        123
                    </Button>
                    {/* <Card color={color}/> */}
                    <Button color={color} size="lg" variant="outline">
                        123
                    </Button>
                </div>
                <Input
                    clearable
                    invalid
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    label={"用户名"}
                    helperText={"请输入用户名 helperText"}
                    errorText={"请输入用户名 errorText"}
                />
            </div>
        </>
    );
}
