import { Typography } from "@/components/core/Typography";
import { ComponentProps } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import "katex/dist/katex.min.css";
import "highlight.js/styles/atom-one-dark.min.css";
import styles from "./MarkdownRender.module.scss";
import clsx from "clsx";

export interface MarkdownRenderProps extends ComponentProps<"div"> {
    src?: string;
}

export function MarkdownRender(props: MarkdownRenderProps) {
    const { src, ...rest } = props;

    return (
        <Typography>
            <Markdown
                remarkPlugins={[
                    remarkGfm,
                    remarkParse,
                    remarkMath,
                    remarkRehype,
                ]}
                rehypePlugins={[
                    rehypeKatex,
                    rehypeAutolinkHeadings,
                    rehypeStringify,
                    rehypeHighlight,
                ]}
                components={{
                    pre: ({ children }) => {
                        return (
                            <pre className={clsx(styles.pre)}>{children}</pre>
                        );
                    },
                }}
                className={clsx(styles["root"])}
            >
                {src}
            </Markdown>
        </Typography>
    );
}
