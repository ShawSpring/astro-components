// Register `hName`, `hProperties` types, used when turning markdown to HTML:
/// <reference types="mdast-util-to-hast" />
// Register directive nodes in mdast:
/// <reference types="mdast-util-directive" />

import {h} from 'hastscript'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import remarkDirective from 'remark-directive'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import {read} from 'to-vfile'  
import {unified} from 'unified'

import myRemarkPlugin from './index.js'


async function parse(markdown, options = {}) {
	const file = await unified()
		.use(remarkParse)
		.use(remarkDirective)
        .use(myRemarkPlugin,{attributes:{class:"container",style:"display:grid;grid-template-columns: 1fr 1fr;grid-gap: 1em;"}})
		.use(remarkRehype)
        .use(rehypeFormat)
		.use(rehypeStringify)
		.process(markdown);
	return String(file);
}



import {readFile, writeFile} from "node:fs/promises";

import {fileURLToPath} from "node:url"
function resolvePath(path) {
	return fileURLToPath(new URL(path, import.meta.url));
}


const templateOutput = (output) =>
	`<html><head></head><body>${output}</body></html>`;
const outputMD = async (file = 'example.md')=>{
	const md = await readFile(resolvePath(file), 'utf-8');
	const output =await parse(md);
	console.log(output)
	await writeFile(resolvePath('output.html'), templateOutput(output), 'utf-8');
}

outputMD();
