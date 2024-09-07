import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";
import Checkbox from "@/components/atoms/Checkbox";
import DatetimePicker from "@/components/atoms/DatetimePicker";
import Dialog from "@/components/atoms/Dialog";
import TextInput from "@/components/atoms/TextInput";
import Tooltip from "@/components/atoms/Tooltip";
import UserBold from "~icons/solar/user-bold";
import { useToastStore } from "@/stores/toast";
import { DateTime } from "luxon";
import { useState } from "react";
import Dropdown from "@/components/atoms/Dropdown";
import ChallengeCard from "@/components/widgets/ChallengeCard";

export default function Page() {
    const [color, setColor] = useState("#1cb0f6");
    const handleChange = (e: any) => {
        setColor(e.target.value);
    };

    const [value, setValue] = useState<string>("");
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false);

    const [datetime, setDatetime] = useState<DateTime>(DateTime.now());

    const [checked, setChecked] = useState<boolean>(false);

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
                <p>
                    在现代社会中，technology
                    已经成为生活中不可或缺的一部分。无论是使用 smartphones 还是
                    laptops，我们都能感受到 innovation 带来的便利。同时，
                    <span
                        style={{
                            fontStyle: "italic",
                        }}
                    >
                        communication
                    </span>
                    方式也因为 Internet 而发生了巨大的变化，人们可以通过
                    <span
                        style={{
                            fontWeight: 800,
                        }}
                    >
                        email
                    </span>
                    、social media
                    与世界各地的朋友保持联系。这种中英文的混合使用，不仅方便了表达，也让我们的生活充满了
                    globalization 的色彩。
                </p>
                <TextInput
                    clearable
                    // passwd
                    invalid
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    label={"用户名"}
                    placeholder="Username"
                    helperText={"请输入用户名 helperText"}
                    errorText={"请输入用户名 errorText"}
                    icon={<UserBold />}
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
                <div
                    style={{
                        display: "flex",
                        gap: 20,
                    }}
                >
                    <DatetimePicker
                        value={datetime}
                        onChange={(datetime) => {
                            setDatetime(datetime);
                        }}
                    />
                    <p style={{ alignItems: "center" }}>To</p>
                    <DatetimePicker
                        value={datetime}
                        onChange={(datetime) => {
                            setDatetime(datetime);
                        }}
                    />
                </div>
                <Button
                    size="lg"
                    variant="solid"
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

                <div
                    style={{
                        width: "fit-content",
                        position: "relative",
                    }}
                >
                    <Button
                        size="lg"
                        variant="solid"
                        onClick={() => {
                            setDropdownMenuOpen(true);
                        }}
                    >
                        打开 Dropdown Menu
                    </Button>
                    <Dropdown
                        open={dropdownMenuOpen}
                        onClose={() => setDropdownMenuOpen(false)}
                    >
                        <div
                            style={{
                                width: "10rem",
                                height: "100px",
                                borderRadius: "8px",
                                backgroundColor: "white",
                            }}
                        >
                            1
                        </div>
                    </Dropdown>
                </div>

                <ChallengeCard
                    challenge={{
                        title: "Hello CdsCTF",
                        category: 2,
                    }}
                    status={{
                        solved_times: 0,
                        is_solved: false,
                    }}
                />

                <Button
                    size="lg"
                    variant="solid"
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
                    发送通知114514
                </Button>
                {/* <div
                    style={{
                        height: "1000px",
                    }}
                >
                    placeholder
                </div>
                <div>1111</div> */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        margin: "64px",
                        gap: "20px",
                        width: "fit-content",
                    }}
                >
                    <div
                        style={{
                            margin: "0 50px",
                            width: "fit-content",
                        }}
                    >
                        <Tooltip content={"sweet~"} position={"top"} offset={8}>
                            <Button size="lg" variant="solid">
                                top
                            </Button>
                        </Tooltip>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            gap: "20px",
                            width: "fit-content",
                        }}
                    >
                        <Tooltip
                            content={"sweet~"}
                            position={"left"}
                            offset={8}
                        >
                            <Button size="lg" variant="solid">
                                left
                            </Button>
                        </Tooltip>
                        <Tooltip
                            content={"sweet~"}
                            position={"right"}
                            offset={8}
                        >
                            <Button size="lg" variant="solid">
                                right
                            </Button>
                        </Tooltip>
                    </div>
                    <div
                        style={{
                            margin: "0 40px",
                            width: "fit-content",
                        }}
                    >
                        <Tooltip
                            content={"sweet~"}
                            position={"bottom"}
                            offset={8}
                        >
                            <Button size="lg" variant="solid">
                                bottom
                            </Button>
                        </Tooltip>
                    </div>
                </div>
                <Checkbox
                    checked={checked}
                    onChange={(checked) => {
                        setChecked(checked);
                    }}
                    label={"I am a checkbox"}
                />
            </div>
        </>
    );
}
