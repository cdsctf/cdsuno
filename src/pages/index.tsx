import Button from "@/components/atoms/Button";
import { useState } from "react";

export default function Page() {
    const [color, setColor] = useState("#50d3ff");
    const handleChange = (e: any) => {
        setColor(e.target.value);
    };

    return (
        <>
            <input type="color" value={color} onChange={handleChange} />
            <Button color={color} size="lg" variant="solid">
                123
            </Button>
            <Button color={color} size="lg" variant="outline">
                123
            </Button>
        </>
    );
}
