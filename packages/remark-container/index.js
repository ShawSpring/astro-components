// Register `hName`, `hProperties` types, used when turning markdown to HTML:
/// <reference types="mdast-util-to-hast" />
// Register directive nodes in mdast:
/// <reference types="mdast-util-directive" />

import { h } from "hastscript";
import { visit } from "unist-util-visit";

const defaultConfig = {
	name: "container",
	attributes: {},
};

/**
 *
 * @param {Object} config - optional,The configuration object.
 * @param {string} config.name -optional, The container identifier behind `:::`.
 * @param {Object} config.attributes -optional, default attributes applied to all containers.
 */
export default function remarkContainer(config = {}) {
	const cfg = {
		...defaultConfig,
		...config,
	};
	/**
	 * @param {import('mdast').Root} tree
	 *   Tree.
	 * @returns {undefined}
	 *   Nothing.
	 */
	return (tree) => {
		visit(tree, (node) => {
			if (node.type === "containerDirective") {
				if (node.name !== cfg.name) return;
				// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
				const data = node.data || (node.data = {});
				const tagName = "div";

				data.hName = tagName;
				//将cfg.attributes 合并 node.attributes 
				node.attributes = {
					...cfg.attributes,
					...node.attributes,
					class: `${cfg.attributes.class||""} ${node.attributes.class || ""}`.trim(),
					style: `${cfg.attributes.style||""} ${node.attributes.style || ""}`.trim(),
				};
				// console.log(node.attributes);
				data.hProperties = h(tagName, node.attributes || {}).properties;
			}
		});
	};
}
