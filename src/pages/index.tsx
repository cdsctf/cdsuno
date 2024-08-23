import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { useState } from "react";

export default function Page() {
    const [color, setColor] = useState("#1cb0f6");
    const handleChange = (e: any) => {
        setColor(e.target.value);
    };

    return (
        <>
            <input type="color" value={color} onChange={handleChange} />
            <Button color={color} size="lg" variant="solid">
                123
            </Button>
            <Button color={"#1cb0f6"} size="lg" variant="outline">
                123
            </Button>
            <Input color="#1cb0f6" />
        </>
    );
}
