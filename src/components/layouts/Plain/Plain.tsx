import { Base } from "@/components/layouts/Base";

export interface PlainProps {
    children: React.ReactNode;
}

export function Plain(props: PlainProps) {
    return <Base>{props.children}</Base>;
}
