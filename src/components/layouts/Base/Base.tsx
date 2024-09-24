import { Toaster } from "@/components/widgets/Toaster";

export interface BaseProps {
    children: React.ReactNode;
}

export function Base(props: BaseProps) {
    const { children } = props;

    return (
        <>
            {children}
            <Toaster />
        </>
    );
}
