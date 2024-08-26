import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";
import Dialog from "@/components/atoms/Dialog";
import TextInput from "@/components/atoms/TextInput";
import { useToastStore } from "@/stores/toast";
import { useState } from "react";

export default function Page() {
    const [color, setColor] = useState("#1cb0f6");
    const handleChange = (e: any) => {
        setColor(e.target.value);
    };

    const [value, setValue] = useState<string>("");
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    return (
        <>
            <div
                style={{
                    padding: 20,
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
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
                    // label={"用户名"}
                    placeholder="Username"
                    // helperText={"请输入用户名 helperText"}
                    // errorText={"请输入用户名 errorText"}
                />
                <TextInput
                    // clearable
                    password
                    invalid
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    // label={"密码"}
                    placeholder="Password"
                    // helperText={"请输入密码 helperText"}
                    // errorText={"Invalid Password.Please Try again."}
                />
                <Avatar
                    src={"https://e23.dev/Ella_Avatar.png"}
                    fallback={<>E</>}
                    style={{
                        marginTop: "10px",
                    }}
                />
                <Button
                    size="lg"
                    variant="solid"
                    style={{
                        width: "150px",
                    }}
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    打开第一个弹窗
                </Button>
                <Dialog
                    open={open}
                    onClose={() => {
                        setOpen(false);
                    }}
                >
                    ciallo
                    <Button
                        size="lg"
                        variant="solid"
                        onClick={() => {
                            setOpen2(true);
                        }}
                    >
                        打开第二个弹窗
                    </Button>
                    <Dialog
                        open={open2}
                        onClose={() => {
                            setOpen2(false);
                        }}
                    >
                        ciallo~
                    </Dialog>
                </Dialog>
                <Button
                    size="lg"
                    variant="solid"
                    style={{
                        width: "110px",
                    }}
                    onClick={() => {
                        useToastStore.getState().addToast({
                            title: "通知",
                            description: "这是一个通知",
                            type: "success",
                            meta: {
                                icon: "123",
                            },
                            duration: 3000,
                        });
                    }}
                >
                    发送通知
                </Button>
                {/* <div
                    style={{
                        height: "1000px",
                    }}
                >
                    placeholder
                </div> */}
                <div>1111</div>
            </div>
        </>
    );
}
