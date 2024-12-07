import { RefObject, useEffect, useState } from "react";

export default function useHover(ref: RefObject<HTMLElement | null>) {
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const handleMouseOver = () => setIsHovered(true);
        const handleMouseOut = () => setIsHovered(false);

        const element = ref.current;
        if (element) {
            element.addEventListener("mouseover", handleMouseOver);
            element.addEventListener("mouseout", handleMouseOut);
        }

        return () => {
            if (element) {
                element.removeEventListener("mouseover", handleMouseOver);
                element.removeEventListener("mouseout", handleMouseOut);
            }
        };
    }, [ref]);

    return isHovered;
}
