import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";
import TextInput from "@/components/atoms/TextInput";
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
                    <Button color={"violet"} size="lg" variant="outline">
                        123
                    </Button>
                </div>
                <TextInput
                    clearable
                    // passwd
                    invalid
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    label={"用户名"}
                    helperText={"请输入用户名 helperText"}
                    errorText={"请输入用户名 errorText"}
                />
                <TextInput
                    // clearable
                    password
                    invalid
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    label={"密码"}
                    helperText={"请输入密码 helperText"}
                    errorText={"Invalid Password.Please Try again."}
                />
                <Avatar
                    src={"https://e23.dev/Ella_Avatar.png"}
                    fallback={<>E</>}
                />
            </div>
        </>
    );
}
