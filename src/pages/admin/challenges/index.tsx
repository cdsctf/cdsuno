import { Challenge } from "@/models/challenge";
import { columns } from "./columns";
import { DataTable } from "../data-table";
import { TableFilter } from "../ui/table-filter";
import { TableFilters } from "../ui/table-filters";
import { TableColumnToggle } from "../ui/table-column-toggle";
import { Button } from "@/components/ui/button";
import { Library, PlusCircle } from "lucide-react";

async function getData(): Promise<Challenge[]> {
    // 获取挑战数据的示例，包含完整的 Env 数据
    return [
        {
            id: "1",
            title: "Web 安全入门",
            tags: ["web", "beginner", "injection"],
            description:
                "一个简单的 SQL 注入挑战，需要通过注入获取管理员权限。适合初学者练习基本的注入技术。",
            category: 0,
            has_attachment: false,
            is_public: true,
            is_dynamic: true,
            env: {
                image: "ctfd/web-sql-injection:latest",
                cpu_limit: 1,
                memory_limit: 512,
                duration: 3600,
                envs: {
                    FLAG: "flag{sql_injection_basic_123}",
                    ADMIN_PASSWORD: "s3cur3_p4ssw0rd!",
                },
                ports: [80, 443],
            },
            checker:
                '#!/bin/bash\nflag=$(curl -s http://$IP:$PORT/get_flag)\nif [[ $flag == *"flag{"* ]]; then\n  exit 0\nelse\n  exit 1\nfi',
            updated_at: 1675854453,
            created_at: 1675754453,
        },
        {
            id: "2",
            title: "Buffer Overflow 基础",
            tags: ["pwn", "buffer-overflow", "stack"],
            description:
                "学习基本的缓冲区溢出攻击技术，通过覆盖返回地址获取shell。需要具备基本的汇编和C语言知识。",
            category: 1,
            has_attachment: true,
            is_public: true,
            is_dynamic: true,
            env: {
                image: "ctfd/pwn-buffer-overflow:v1.2",
                cpu_limit: 2,
                memory_limit: 1024,
                duration: 7200,
                envs: {
                    FLAG: "flag{stack_smash_detected_456}",
                    ASLR: "0",
                },
                ports: [8080],
            },
            checker:
                '#!/bin/bash\nexpect -c \'spawn nc $IP $PORT; send "cat /flag.txt\\n"; expect "flag{*}" { exit 0 } timeout 5 { exit 1 }\'',
            updated_at: 1678854453,
            created_at: 1678754453,
        },
        {
            id: "3",
            title: "隐写术挑战",
            tags: ["misc", "steganography", "image-analysis"],
            description:
                "在图片中发现隐藏信息，需要使用多种隐写工具和分析技术。挑战者需要分析像素数据和文件元数据。",
            category: 4,
            has_attachment: true,
            is_public: false,
            is_dynamic: false,
            checker:
                '#!/bin/bash\nif [[ "$FLAG" == "flag{hidden_in_plain_sight_789}" ]]; then\n  exit 0\nelse\n  exit 1\nfi',
            updated_at: 1682854453,
            created_at: 1682754453,
        },
        // 更多数据...
    ];
}

export default async function ChallengesPage() {
    const data = await getData();

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">题库管理</h1>
                <Button icon={PlusCircle} variant={"tonal"}>
                    添加题目
                </Button>
            </div>

            <div className="flex justify-end mb-4">
                <TableColumnToggle title="显示/隐藏列" />
            </div>

            <DataTable columns={columns} data={data}>
                <TableFilters>
                    <TableFilter
                        columnId="title"
                        label="标题"
                        placeholder="搜索标题..."
                    />
                    <TableFilter
                        icon={Library}
                        columnId="category"
                        label="分类"
                        placeholder="筛选分类..."
                    />
                    <TableFilter
                        columnId="is_public"
                        label="公开性"
                        placeholder="筛选公开性..."
                    />
                    <TableFilter
                        columnId="tags"
                        label="标签"
                        placeholder="筛选标签..."
                    />
                </TableFilters>
            </DataTable>
        </div>
    );
}
