import {
    Dropzone,
    DropZoneArea,
    DropzoneTrigger,
    useDropzone,
} from "@/components/ui/dropzone";
import { User, Group } from "@/models/user";
import { 
    KeyIcon, 
    UserIcon, 
    MailIcon,
    SaveIcon,
    UserCheckIcon,
    ShieldIcon,
    UserXIcon
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import {
    updateUserProfile,
    getUserAvatarMetadata
} from "@/api/user";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Editor } from "@/components/ui/editor";

export default function ProfileEdit() {
    const { user } = useContext(Context);
    const [profile, setProfile] = useState<User>();
    const [loading, setLoading] = useState<boolean>(false);
    const [avatarUrl, setAvatarUrl] = useState<string>();
    const [refresh, setRefresh] = useState<number>(0);
    
    const groupOptions = [
        { id: Group.Guest.toString(), name: "访客", icon: UserIcon },
        { id: Group.Banned.toString(), name: "封禁", icon: UserXIcon },
        { id: Group.User.toString(), name: "用户", icon: UserCheckIcon },
        { id: Group.Admin.toString(), name: "管理员", icon: ShieldIcon },
    ];

    useEffect(() => {
        if (!user?.id) return;
        setLoading(true);
        setProfile(user);
        if (user.id) {
            getUserAvatarMetadata(user.id)
                .then((res) => {
                    if (res.data) {
                        setAvatarUrl(`/api/users/${user.id}/avatar`);
                    }
                })
                .catch((error) => {
                    console.error("获取头像信息失败", error);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [user?.id, refresh]);

    const handleInputChange = (field: string, value: string) => {
        setProfile((prev) => {
            if (!prev) return prev;
            return { ...prev, [field]: value };
        });
    };

    const handleGroupChange = (groupId: string) => {
        const selectedGroup = groupOptions.find(g => g.id === groupId);
        
        if (selectedGroup) {
            setProfile((prev) => {
                if (!prev) return prev;
                return { 
                    ...prev, 
                    group: parseInt(selectedGroup.id) as Group
                };
            });
        }
    };

    const handleDescriptionChange = (value: string) => {
        handleInputChange("description", value);
    };

    const handleSaveProfile = async () => {
        if (!profile) return;
        
        // 准备请求数据，根据API的UpdateUserProfileRequest
        const requestData = {
            nickname: profile.nickname,
            email: profile.email, 
            description: profile.description,
            group: profile.group
        };
        
        setLoading(true);
        try {
            const res = await updateUserProfile(requestData);
            if (res.code === 200) {
                toast.success("个人资料更新成功");
            } else {
                toast.error("个人资料更新失败", {
                    description: typeof res.data === 'object' && res.data ? String(res.data.error || "未知错误") : "未知错误"
                });
            }
        } catch (error) {
            toast.error("个人资料更新失败", {
                description: "请检查网络连接"
            });
        } finally {
            setLoading(false);
        }
    };

    const avatarDropzone = useDropzone({
        onDropFile: async (file) => {
            if (!user?.id) return { status: "error", error: "用户ID不存在" };
            
            const formData = new FormData();
            formData.append("file", file);
            
            const xhr = new XMLHttpRequest();
            xhr.open("POST", `/api/users/${user.id}/avatar`, true);
            
            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const percentComplete = (event.loaded / event.total) * 100;
                    toast.loading(`上传进度 ${percentComplete.toFixed(0)}%`, {
                        id: "avatar-upload",
                    });
                }
            };
            
            xhr.onload = () => {
                if (xhr.status === 200) {
                    setAvatarUrl(`/api/users/${user.id}/avatar?t=${new Date().getTime()}`);
                    toast.success("头像上传成功", {
                        id: "avatar-upload",
                    });
                    setRefresh((prev) => prev + 1);
                } else {
                    toast.error("头像上传失败", {
                        id: "avatar-upload",
                        description: xhr.responseText,
                    });
                }
            };
            
            xhr.onerror = () => {
                toast.error("头像上传失败", {
                    id: "avatar-upload",
                    description: "网络错误",
                });
                return {
                    status: "error",
                };
            };

            xhr.send(formData);

            return {
                status: "pending",
                result: "",
            };
        },
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif']
        },
        maxSize: 5 * 1024 * 1024, // 5MB
    });

    return (
        <div className="container mx-auto py-6">
            <Card>
                <CardHeader>
                    <CardTitle>个人资料修改</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className={cn(["flex", "flex-col", "gap-6"])}>
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative">
                                {avatarUrl ? (
                                    <div className="relative w-32 h-32 rounded-full overflow-hidden">
                                        <img
                                            src={avatarUrl}
                                            alt="用户头像"
                                            className="w-full h-full object-cover"
                                        />
                                        <Dropzone {...avatarDropzone}>
                                            <DropzoneTrigger className="w-full h-full absolute inset-0 opacity-0 cursor-pointer" />
                                        </Dropzone>
                                    </div>
                                ) : (
                                    <Dropzone {...avatarDropzone}>
                                        <DropZoneArea>
                                            <DropzoneTrigger className="w-full h-full rounded-full flex flex-col items-center justify-center bg-muted p-4 text-center text-sm">
                                            </DropzoneTrigger>
                                        </DropZoneArea>
                                    </Dropzone>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Input
                                icon={KeyIcon}
                                placeholder="请输入用户名"
                                value={profile?.username || ""}
                                onChange={(e) => handleInputChange("username", e.target.value)}
                                disabled={true} 
                            />
                            
                            <Input
                                icon={UserIcon}
                                placeholder="请输入昵称"
                                value={profile?.nickname || ""}
                                onChange={(e) => handleInputChange("nickname", e.target.value)}
                                disabled={loading}
                            />

                                <Select
                                    size={"md"}
                                    icon={ShieldIcon}
                                    className={cn(["w-full"])}
                                    options={groupOptions.map(group => ({
                                        value: group.id,
                                        content: (
                                            <div
                                                className={cn([
                                                    "flex",
                                                    "gap-2",
                                                    "items-center",
                                                ])}
                                            >
                                                <group.icon className="size-4" />
                                                {group.name}
                                            </div>
                                        ),
                                    }))}
                                    onValueChange={handleGroupChange}
                                    value={profile?.group?.toString() || ""}
                                    disabled={loading}
                                />
                        </div>

                        <Input
                            icon={MailIcon}
                            type="email"
                            placeholder="请输入邮箱"
                            value={profile?.email || ""}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            disabled={loading}
                        />

                        <Editor
                            value={profile?.description || ""}
                            onChange={handleDescriptionChange}
                            placeholder="Enter Decription Here...(Markdown Supported)"
                            className="min-h-32"
                            lang="markdown"
                            tabSize={2}
                            showLineNumbers={true}
                        />
                          
                        <div className="flex justify-end">
                            <Button
                                variant="solid"
                                level="primary"
                                icon={SaveIcon}
                                onClick={handleSaveProfile}
                                loading={loading}
                            >
                                保存修改
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}