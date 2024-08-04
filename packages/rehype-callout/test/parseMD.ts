import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeFormat from 'rehype-format'
import rehypeStringify from "rehype-stringify";
import plugin from "../src/index";
import { defaultConfig, type Config } from "../src/config";
import {readFile, writeFile} from "node:fs/promises";

import {fileURLToPath} from "node:url"
function resolvePath(path: string) {
	return fileURLToPath(new URL(path, import.meta.url));
}


export const runPluginFromMarkdown = async (
	input: string,
	config: Partial<Config> = {},
) => {
	const processor = unified()
		.use(remarkParse,{fragment: true})
		.use(remarkRehype)
		.use(plugin, config)
		.use(rehypeFormat)
		.use(rehypeStringify);
	return String(await processor.process(input));
};



const templateOutput = (output: string) =>
	`<html><head></head><body>${output}</body></html>`;

const outputMD = async (file = 'input.md')=>{
	const content = await readFile(resolvePath(file), 'utf-8');
	const output =await runPluginFromMarkdown(content,{customClassNames:['no-prose']});
	await writeFile(resolvePath('output.html'), templateOutput(output), 'utf-8');
}

outputMD();
