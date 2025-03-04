import { useContext, useState } from "react";
import { Context } from "../context";
import { updateUserProfile } from "@/api/user";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
    LockIcon,
    EyeIcon,
    EyeOffIcon,
    SaveIcon
} from "lucide-react";

export default function Index() {
    const { user } = useContext(Context);
    const [passwordData, setPasswordData] = useState({
        new_password: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handlePasswordChange = (field: string, value: string) => {
        setPasswordData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleUpdatePassword = async () => {
        // 验证新密码和确认密码是否一致
        if (passwordData.new_password !== passwordData.confirmPassword) {
            toast.error("新密码与确认密码不一致");
            return;
        }

        if (passwordData.new_password.length < 8) {
            toast.error("新密码长度不能少于8位");
            return;
        }

        setLoading(true);
        try {
            const res = await updateUserProfile({
                password: passwordData.new_password
            });

            if (res.code === 200) {
                toast.success("密码修改成功");
                setPasswordData({
                    new_password: "",
                    confirmPassword: ""
                });
            } else {
                toast.error("密码修改失败", {
                    description: res.message
                });
            }
        } catch (error) {
            toast.error("密码修改失败", {
                description: "请检查网络连接"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-6">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>修改密码</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className={cn(["flex", "flex-col", "gap-6", "w-full"])}>
                        {/* 新密码 */}
                        <div className="relative w-full">
                            <div className="flex w-full relative">
                                <Input
                                    icon={LockIcon}
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="Enter Your Brand New Password..."
                                    value={passwordData.new_password}
                                    onChange={(e) => handlePasswordChange("new_password", e.target.value)}
                                    disabled={loading}
                                    className="w-full pr-12"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                                >
                                    <span className="sr-only">
                                        {showNewPassword ? "隐藏密码" : "显示密码"}
                                    </span>
                                    {showNewPassword ? (
                                        <EyeOffIcon className="h-4 w-4" />
                                    ) : (
                                        <EyeIcon className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>
                        
                        <div className="relative w-full">
                            <div className="flex w-full relative">
                                <Input
                                    icon={LockIcon}
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Enter Password Again:)"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                                    disabled={loading}
                                    className="w-full pr-12" 
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                                >
                                    <span className="sr-only">
                                        {showConfirmPassword ? "隐藏密码" : "显示密码"}
                                    </span>
                                    {showConfirmPassword ? (
                                        <EyeOffIcon className="h-4 w-4" />
                                    ) : (
                                        <EyeIcon className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>
                        
                        <div className="flex justify-end">
                            <Button
                                variant="solid"
                                level="primary"
                                icon={SaveIcon}
                                onClick={handleUpdatePassword}
                                loading={loading}
                            >
                                更新密码
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}