import type {
	Root,
	Literal,
	Element,
	// ElementContent,
	// Parent,
	Nodes,
} from "hast";
import type { Plugin } from "unified";

import { toHtml } from "hast-util-to-html";
import { toString as hastToString } from "hast-util-to-string";
// import { escape } from 'html-escaper'

import { fromHtml } from "hast-util-from-html";

import { h} from "hastscript";
import { CONTINUE, SKIP, visit } from "unist-util-visit";

import { defaultConfig, type Config } from "./config.js";

export type {Config} from "./config.js";

const REGEX = /\[!(?<type>[\w]+)\](?<expandable>[-+]?)\s*(?<title>(?:.|\n)*)/;

type TitleParts = {
	type: string;
	expandable: string;
	title: string;
};

const rehypeCallout: Plugin<[Partial<Config>], Root> = (config = {}) => {
	const cfg = {
		...defaultConfig,
		...config,
		types: {
			...defaultConfig.types,
			...config.types,
		},
	};
	return function transformer(tree) {
		visit(tree, "element", (node, index, parent) => {
			if (!(node.tagName === "blockquote" && "children" in node))
				return CONTINUE;
			//console.log(toHtml(node)); // original html

			// nested or other formated content is in rest, just keep it as is
			const [header, ...rest] = node.children.filter(
				(child) => child.type === "element",
			);
			if (header?.tagName !== "p") return CONTINUE;
			const titleSection = [];
			const headerRest = [];
			let separator = false;
			const titleParts: TitleParts = {
				type: "",
				expandable: "",
				title: "",
			};
			for (let i = 0; i < header.children.length; i++) {
				const cur = header.children[i];
				// console.log(i, cur);
				if (i === 0) {
					if (cur.type === "text") {
						const value = (cur as Literal).value;
						REGEX.lastIndex = 0;
						const match = REGEX.exec(value);
						if (match?.groups) {
							Object.assign(titleParts, match.groups); // named catch groups in REGEX
							titleParts.type = titleParts.type.trim().toLowerCase();
							//  case insensitive, default to note
							(cur as Literal).value = titleParts.title; // remove "[!type]"
						} else {
							return CONTINUE;
						}
					} else {
						return CONTINUE;
					}
				}
				if (!separator) {
					// separator for title
					//! {type:"text",value:"\n"} don't work in mdx. so use {type:"element",tagName:"br"}
					if (
						(cur.type === "element" && (cur as Element).tagName === "br") ||
						(cur.type === "text" && (cur as Literal).value === "\n")
					) {
						separator = true;
					}
					titleSection.push(cur);
				} else {
					headerRest.push(cur);
				}
			}
			const detailsSection =
				headerRest.length > 0 ? [h("p", headerRest), ...rest] : rest;

			//  remove last <br>，it's no need. titleSection will be wrapper by a div.callout-title-inner.
			if (
				titleSection[titleSection.length - 1].type === "element" &&
				(titleSection[titleSection.length - 1] as Element).tagName === "br"
			) {
				titleSection.pop();
			}
			// defult title :  when first line is empty,set it to type
			// [!note] **em** => [{type:"text",value:''},{type:"element",tagName:"em"}], so length === 1
			//? how to judge it is empty? use hastToString get plain text
			if (hastToString(h(null, titleSection)).length <= 0) {
				titleSection[0] = h(null,titleParts.type.charAt(0).toUpperCase() + titleParts.type.slice(1));
			}
			if (titleParts.expandable) {
				node.tagName = "details";
				if (titleParts.expandable === "+") {
					node.properties.open = true;
				}
			}

			// assemble output hast.
			node.properties[`data-${cfg.prefix}`] = titleParts.type;
			if (cfg.customClassNames.length > 0) {
				node.properties.class = cfg.customClassNames.join(" ");
			}
			node.children = [
				h(
					titleParts.expandable ? "summary" : "div",
					{ class: `${cfg.prefix}-title` },
					h(
						"div",
						{ class: `${cfg.prefix}-icon` },
						fromHtml(cfg.types[titleParts.type] || cfg.types.note, {
							space: "svg",
							fragment: true,
						}),
					),
					h("div", { class: `${cfg.prefix}-title-inner` }, titleSection),
					titleParts.expandable
						? h(
								"div",
								{ class: `${cfg.prefix}-expand` },
								fromHtml(cfg.expandIcon, { space: "svg", fragment: true }),
							)
						: null,
				),
			];
			if (detailsSection.length > 0) {
				node.children.push(
					h("div", { class: `${cfg.prefix}-content` }, detailsSection),
				);
			}
		});
	};
};

export default rehypeCallout;
