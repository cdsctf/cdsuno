import { Avatar } from "@/components/core/Avatar";
import { Button } from "@/components/core/Button";
import { Checkbox } from "@/components/core/Checkbox";
import { DatetimePicker } from "@/components/core/DatetimePicker";
import { Dialog } from "@/components/core/Dialog";
import { TextInput } from "@/components/core/TextInput";
import { Tooltip } from "@/components/core/Tooltip";
import UserBold from "~icons/solar/user-bold";
import { useToastStore } from "@/stores/toast";
import { DateTime } from "luxon";
import { useRef, useState } from "react";
import { ChallengeCard } from "@/components/widgets/ChallengeCard";
import { Switch } from "@/components/core/Switch/Switch";
import { ChallengeModal } from "@/components/modals/ChallengeModal";
import { DatetimeInput } from "@/components/core/DatetimeInput";
import { Textarea } from "@/components/core/Textarea";
import { MarkdownRender } from "@/components/utils/MarkdownRender/MarkdownRender";
import globalRouter from "@/utils/globalRouter";
import { Popover } from "@/components/core/Popover/Popover";

export function Page() {
    const [color, setColor] = useState("#1cb0f6");
    const handleChange = (e: any) => {
        setColor(e.target.value);
    };

    const [value, setValue] = useState<string>("");
    const [open, setOpen] = useState(false);
    const [popoverOpen, setPopoverOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const [datetime, setDatetime] = useState<DateTime>(DateTime.now());

    const [isSolveds, setIsSolveds] = useState<boolean[]>(
        new Array(16).fill(false)
    );

    const [checked, setChecked] = useState<boolean>(false);

    // throw new Error("123");

    const markdownText = `
# welcome Heading1
## welcome Heading2
### welcome Heading3
#### welcome Heading4
##### welcome Heading5
###### welcome Heading6

*italic*

**bold**

***bold italic***

~~strikethrough~~

\`code\`

\`code line\`

\`\`\`python
print("hello world")
\`\`\`

\`\`\`js
import React from 'react'
import ReactDOM from 'react-dom'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

const markdown = \`
# Your markdown here
\`

ReactDOM.render(
  <Markdown rehypePlugins={[rehypeHighlight]}>{markdown}</Markdown>,
  document.querySelector('#content')
)
\`\`\`

[link](https://github.com)

> blockquote

- list
`;

    return (
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
                <Button color={color} variant="solid">
                    123
                </Button>
                {/* <Card color={color}/> */}
                <Button color={color} variant="outlined">
                    123
                </Button>
                <Button color={"violet"} variant="outlined">
                    123
                </Button>
            </div>
            <TextInput
                clearable
                // passwd
                invalid
                value={value}
                onChange={(value) => setValue(value)}
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
                onChange={(value) => setValue(value)}
                variant={"solid"}
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
            <Textarea />
            <Button
                loading={loading}
                icon={<UserBold />}
                onClick={() => {
                    setLoading(true);
                    setTimeout(() => {
                        setLoading(false);
                    }, 3000);
                }}
            >
                加载
            </Button>
            <DatetimeInput />
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
                variant="solid"
                onClick={() => {
                    setOpen(true);
                }}
            >
                打开第一个弹窗
            </Button>

            <Button
                variant="solid"
                onClick={() => {
                    globalRouter.navigate?.("/login");
                }}
            >
                Global Router
            </Button>

            <Popover
                opened={popoverOpen}
                onChange={setPopoverOpen}
                content={
                    <div
                        style={{
                            width: "100px",
                            height: "100px",
                            backgroundColor: "green",
                        }}
                    >
                        Popover Controlled
                    </div>
                }
            >
                <Button onClick={() => setPopoverOpen((r) => !r)}>
                    Popover Controlled
                </Button>
            </Popover>

            <Dialog
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
            >
                <ChallengeModal
                    challenge={{
                        title: "Hello CdsCTF",
                        category: 1,
                        description: "This is a description",
                    }}
                    status={{
                        solved_times: 2,
                        is_solved: true,
                    }}
                />
            </Dialog>

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                }}
            >
                {" "}
                {[
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                ].map((i) => (
                    <div
                        key={i}
                        style={{
                            display: "flex",
                            gap: "20px",
                        }}
                    >
                        <ChallengeCard
                            challenge={{
                                title: "Hello CdsCTF",
                                category: i,
                            }}
                            status={{
                                solved_times: 2,
                                is_solved: true,
                            }}
                        />
                        <ChallengeCard
                            challenge={{
                                title: "Hello CdsCTF",
                                category: i,
                            }}
                            status={{
                                solved_times: 2,
                                is_solved: isSolveds[i - 1],
                            }}
                            onClick={() => {
                                const newSolveds = [...isSolveds];
                                newSolveds[i - 1] = !newSolveds[i - 1];
                                setIsSolveds(newSolveds);
                            }}
                        />
                    </div>
                ))}
            </div>

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                }}
            >
                <Button
                    variant="solid"
                    onClick={() => {
                        useToastStore.getState().add({
                            title: "Info Message",
                            description: "这是一个通知",
                            type: "info",
                            duration: 3000,
                        });
                    }}
                    color={"info"}
                >
                    info
                </Button>
                <Button
                    variant="solid"
                    onClick={() => {
                        useToastStore.getState().add({
                            title: "Success Message",
                            description: "这是一个通知",
                            type: "success",
                            duration: 3000,
                        });
                    }}
                    color={"success"}
                >
                    success
                </Button>
                <Button
                    variant="solid"
                    onClick={() => {
                        useToastStore.getState().add({
                            title: "Warning Message",
                            description: "这是一个通知",
                            type: "warning",
                            duration: 3000,
                        });
                    }}
                    color={"warning"}
                >
                    warning
                </Button>
                <Button
                    variant="solid"
                    onClick={() => {
                        useToastStore.getState().add({
                            title: "Error Message",
                            description: "这是一个通知",
                            type: "error",
                            duration: 3000,
                        });
                    }}
                    color={"error"}
                >
                    error
                </Button>
            </div>

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
                        <Button variant="solid">top</Button>
                    </Tooltip>
                </div>
                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        width: "fit-content",
                    }}
                >
                    <Tooltip content={"sweet~"} position={"left"} offset={8}>
                        <Button variant="solid">left</Button>
                    </Tooltip>
                    <Tooltip content={"sweet~"} position={"right"} offset={8}>
                        <Button variant="solid">right</Button>
                    </Tooltip>
                </div>
                <div
                    style={{
                        margin: "0 40px",
                        width: "fit-content",
                    }}
                >
                    <Tooltip content={"sweet~"} position={"bottom"} offset={8}>
                        <Button variant="solid">bottom</Button>
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

            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(
                (i) => (
                    <div key={i}>
                        <ChallengeModal
                            challenge={{
                                title: "Hello CdsCTFxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                                category: i,
                                description: "This is a description",
                            }}
                            status={{
                                solved_times: 2,
                                is_solved: true,
                            }}
                        />
                    </div>
                )
            )}

            <Switch
                checked={checked}
                onChange={(checked) => setChecked(checked)}
                label={"I am a switch"}
            />
            <MarkdownRender src={"# Hello World"} />

            <MarkdownRender src={markdownText} />
        </div>
    );
}
