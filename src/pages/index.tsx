import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";
import Checkbox from "@/components/atoms/Checkbox";
import DatetimePicker from "@/components/atoms/DatetimePicker";
import Dialog from "@/components/atoms/Dialog";
import TextInput from "@/components/atoms/TextInput";
import Tooltip from "@/components/atoms/Tooltip";
import { useToastStore } from "@/stores/toast";
import { DateTime } from "luxon";
import { useState } from "react";

export default function Page() {
    const [color, setColor] = useState("#1cb0f6");
    const handleChange = (e: any) => {
        setColor(e.target.value);
    };

    const [value, setValue] = useState<string>("");
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer nec odio. Praesent libero. Sed cursus ante dapibus
                    diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
                    Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed
                    augue semper porta. Mauris massa. Vestibulum lacinia arcu
                    eget nulla. Class aptent taciti sociosqu ad litora torquent
                    per conubia nostra, per inceptos himenaeos. Curabitur
                    sodales ligula in libero. Sed dignissim lacinia nunc.
                    Curabitur tortor. Pellentesque nibh. Aenean quam. In
                    scelerisque sem at dolor. Maecenas mattis. Sed convallis
                    tristique sem. Proin ut ligula vel nunc egestas porttitor.
                    Morbi lectus risus, iaculis vel, suscipit quis, luctus non,
                    massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris
                    ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed,
                    euismod in, nibh. Quisque volutpat condimentum velit. Class
                    aptent taciti sociosqu ad litora torquent per conubia
                    nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia,
                    urna non tincidunt mattis, tortor neque adipiscing diam, a
                    cursus ipsum ante quis turpis.
                </p>
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
                </div>
                <div>1111</div> */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        margin: "64px",
                        gap: "20px",
                    }}
                >
                    <div
                        style={{
                            margin: "0 50px",
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
