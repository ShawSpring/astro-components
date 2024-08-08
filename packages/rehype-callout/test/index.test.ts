import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeFormat from "rehype-format";

import plugin from "../src/index";
import { defaultConfig, type Config } from "../src/config";

import { it, expect, describe } from "vitest";
import fixtures from "./fixtures";

function normalizeHtml(html: string): string {
	return html.replace(/[\n\s]*(<)|>([\n\s]*)/g, (match, p1, p2) =>
		p1 ? "<" : ">",
	);
}

const parseMD = async (input: string, config: Partial<Config> = {}) => {
	const processor = unified()
		.use(remarkParse)
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(plugin, config)
		.use(rehypeFormat)
		.use(rehypeStringify, { allowDangerousHtml: true });
	return String(await processor.process(input));
};

// todo: test
describe("test default behavior", () => {
	for (const fixture of fixtures) {
		const { title, input, output, config = {}, debug = false } = fixture;
		it(title, async () => {
			const result = await parseMD(input, config);
			if (debug) console.log(result);
			expect(normalizeHtml(result)).toBe(normalizeHtml(output));
		});
	}
});
