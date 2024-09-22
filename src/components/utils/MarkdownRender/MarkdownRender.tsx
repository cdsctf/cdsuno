import { Typography } from "@/components/core/Typography";
import { ComponentProps } from "react";
import KatexExtension from "@/utils/katex";
import Prism from "prismjs";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import styles from "./MarkdownRender.module.scss";

export interface MarkdownRenderProps extends ComponentProps<"div"> {
    src: string;
}

export function MarkdownRender(props: MarkdownRenderProps) {
    const { src, ...rest } = props;

    Prism.manual = true;

    const marked = new Marked(
        markedHighlight({
            highlight(code, lang) {
                if (lang && Prism.languages[lang]) {
                    return Prism.highlight(code, Prism.languages[lang], lang);
                } else {
                    return code;
                }
            },
        })
    );

    marked.use(KatexExtension({}));
    const renderer = new marked.Renderer();
    marked.setOptions({
        renderer,
        silent: true,
    });

    return (
        <Typography>
            <div
                className={styles["root"]}
                dangerouslySetInnerHTML={{
                    __html: marked.parse(src),
                }}
            />
        </Typography>
    );
}
