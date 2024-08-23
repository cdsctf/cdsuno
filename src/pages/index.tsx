import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
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
            <Button color={color} size="lg" variant="solid" >
                123
            </Button>
            <Card color={color}/>
            <Button color={color} size="lg" variant="outline">
                123
            </Button>
            <Input color="#ffffff" clearable />
        </>
    );
}
