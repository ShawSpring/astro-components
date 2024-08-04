import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import plugin from "../src/index";
import { defaultConfig,type Config } from "../src/config";

import { it, expect, describe } from "vitest";

function normalizeHtml(html: string): string {
  return html.replace(/[\n\s]*(<)|>([\n\s]*)/g, (match, p1, p2) =>
    p1 ? "<" : ">"
  );
}


const runPluginFromMarkdown = async (
  input: string,
  config: Partial<Config> = { }
) => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(plugin,{})
    .use(rehypeStringify);
  return normalizeHtml(String(await processor.process(input)));
};


// todo: test    