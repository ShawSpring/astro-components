import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import plugin from "../src/index";
import type { Config } from "../src/config";
import { readFile, writeFile } from "node:fs/promises";

import { fileURLToPath } from "node:url";
function resolvePath(path: string) {
	return fileURLToPath(new URL(path, import.meta.url));
}

function normalizeHtml(html: string): string {
	return html.replace(/[\n\s]*(<)|>([\n\s]*)/g, (match, p1, p2) =>
		p1 ? "<" : ">",
	);
}
  
export const runPluginFromMarkdown = async (
	input: string,
	config: Partial<Config> = {},
) => {
	const processor = unified()
		.use(remarkParse)
		.use(remarkRehype,{ allowDangerousHtml: true })  
		.use(plugin, config)
		.use(rehypeFormat)
		.use(rehypeStringify,{allowDangerousHtml:true});
	return String(await processor.process(input));
};

const templateOutput = (output: string) =>
	`<html><head><link rel="stylesheet" href="../callout.css" />
	<style>
    * {
      margin: 0;
      padding: 0;
    }
    body{
      max-width: 1000px;
      margin:2rem auto;
    }
  </style>
	</head><body>
	${output}
</body></html>`;

const outputMD = async (file = "input.md") => {
	const content = await readFile(resolvePath(file), "utf-8");
	const output = await runPluginFromMarkdown(content);  
	await writeFile(resolvePath("output.html"), templateOutput(output), "utf-8");
};

outputMD();
