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
import { useEffect, useState } from "react";
import { ChallengeCard } from "@/components/widgets/ChallengeCard";
import { Switch } from "@/components/core/Switch/Switch";
import { ChallengeModal } from "@/components/modals/ChallengeModal";
import { DatetimeInput } from "@/components/core/DatetimeInput";
import { Textarea } from "@/components/core/Textarea";
import { MarkdownRender } from "@/components/utils/MarkdownRender/MarkdownRender";
import globalRouter from "@/utils/globalRouter";
import { Popover } from "@/components/core/Popover/Popover";
import { Pagination } from "@/components/core/Pagination";
import { Table } from "@/components/core/Table";
import { TableHead } from "@/components/core/TableHead";
import { TableRow } from "@/components/core/TableRow";
import { TableCell } from "@/components/core/TableCell/TableCell";
import { TableBody } from "@/components/core/TableBody/TableBody";
import { useSharedStore } from "@/stores/shared";
import { Box, Flex, Select } from "@/components/core";
import { useCategoryStore } from "@/stores/category";

export function Index() {
    const sharedStore = useSharedStore();
    const categoryStore = useCategoryStore();

    const [color, setColor] = useState("#0d47a1");
    const handleChange = (e: any) => {
        setColor(e.target.value);
    };

    function gen_colors(color: string) {
        return `light-dark(${color}, color-mix(in srgb, ${color} 80%, gray 20%))`;
    }

    useEffect(() => {
        document.body.style.setProperty("--color-primary", gen_colors(color));
    }, [color]);

    const [paginationPage, setPaginationPage] = useState(1);

    const [value, setValue] = useState<string>("");
    const [open, setOpen] = useState(false);
    const [popoverOpen, setPopoverOpen] = useState(false);

    const [category, setCategory] = useState<number>(1);

    const [loading, setLoading] = useState(false);

    const [datetime, setDatetime] = useState<DateTime>(DateTime.now());

    const [isSolveds, setIsSolveds] = useState<boolean[]>(
        new Array(16).fill(false)
    );

    const [checked, setChecked] = useState<boolean>(false);

    const [inputInvalid, setInputInvalid] = useState(false);

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

    useEffect(() => {
        document.title = sharedStore?.config?.site?.title || "";
    }, [sharedStore?.config?.site?.title]);

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
                <Button color={color} variant="outlined">
                    123
                </Button>
                <Button color={"violet"} variant="outlined">
                    123
                </Button>
                <Button color={"violet"} variant={"subtle"} onClick={() => {}}>
                    触发 Error Boundary
                </Button>
                <Button
                    color={"violet"}
                    variant={"ghost"}
                    onClick={() => setInputInvalid(true)}
                >
                    123
                </Button>
            </div>
            <TextInput
                clearable
                invalid={inputInvalid}
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
                <Button>Popover Controlled</Button>
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
                    margin: "128px",
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
                    <Tooltip content={"sweet~"} placement={"top"}>
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
                    <Tooltip content={"sweet~"} placement={"left"}>
                        <Button variant="solid">left</Button>
                    </Tooltip>
                    <Tooltip content={"sweet~"} placement={"right"}>
                        <Button variant="solid">right</Button>
                    </Tooltip>
                </div>
                <div
                    style={{
                        margin: "0 40px",
                        width: "fit-content",
                    }}
                >
                    <Tooltip content={"sweet~"} placement={"bottom"}>
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

            <Switch
                checked={checked}
                onChange={(checked) => setChecked(checked)}
                label={"I am a switch"}
            />
            <MarkdownRender src={"# Hello World"} />

            <MarkdownRender src={markdownText} />

            <Pagination
                total={10}
                value={paginationPage}
                onChange={setPaginationPage}
            />

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>公开</TableCell>
                        <TableCell sortDirection={"asc"} onClick={() => {}}>
                            ID
                        </TableCell>
                        <TableCell>标题</TableCell>
                        <TableCell>描述</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>是</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>1321312</TableCell>
                        <TableCell>12321321312312321</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>否</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>123123</TableCell>
                        <TableCell>12312312321312</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>是</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>123</TableCell>
                        <TableCell>2132132132</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <Select
                label={"分类"}
                helperText={"请为题目选择合适的分类"}
                value={String(category)}
                onChange={(value) => setCategory(Number(value))}
                options={categoryStore?.categories.map((category) => ({
                    label: (
                        <Flex
                            align={"center"}
                            gap={10}
                            style={{
                                color: category?.color,
                            }}
                        >
                            <Box>{category?.icon}</Box>
                            {category.name}
                        </Flex>
                    ),
                    value: String(category.id),
                }))}
            />
        </div>
    );
}
