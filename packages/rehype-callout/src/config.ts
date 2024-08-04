import {
	zapIcon,
	listIcon,
	quoteIcon,
	bugIcon,
	infoIcon,
	xIcon,
	helpCircleIcon,
	alertTriangleIcon,
	pencilIcon,
	clipboardListIcon,
	checkCircleIcon,
	flameIcon,
	checkIcon,
	expandIcon,
} from "./icons.js";

export interface Config {
	/**
	 * Class names with prefix are embedded in the generated HTML,
	 * to avoid css confilict, customize the prefix.
	 * @default "callout"
	 */
	prefix: string;
	/**
	 * an Object that maps callout type to svg icon string.
	 * type must be lowercase.
	 * @example {info: '<svg>...</svg>', ...}
	 * @default see docs website.
	 */
	types: Record<string, string>;
	/**
	 * an svg icon string to indicate expandable
	 */
	expandIcon: string;
	/**
	 *  add more class names to the callout container
	 *  @example Undoing tailwindcss-typography by class "not-prose",
	 * ```js
		//  astro.config.mjs
		import rehypeCallout from 'rehype-callout';
		export default defineConfig({
			markdown:{
				rehypePlugins: [[rehypeCallout,{customClassNames:['not-prose']}]],
			}
		});
	```
	 */
	customClassNames: string[];
}

export const defaultConfig: Config = {
	prefix: "callout",
	expandIcon: expandIcon,
	//types refer to https://help.obsidian.md/Editing+and+formatting/Callouts#Supported+types
	types: {
		note: pencilIcon,
		abstract: clipboardListIcon,
		summary: clipboardListIcon,
		tldr: clipboardListIcon,
		info: infoIcon,
		todo: checkCircleIcon,
		tip: flameIcon,
		hint: flameIcon,
		important: flameIcon,
		success: checkIcon,
		check: checkIcon,
		done: checkIcon,
		question: helpCircleIcon,
		help: helpCircleIcon,
		faq: helpCircleIcon,
		warning: alertTriangleIcon,
		attention: alertTriangleIcon,
		caution: alertTriangleIcon,
		failure: xIcon,
		missing: xIcon,
		fail: xIcon,
		danger: zapIcon,
		error: zapIcon,
		bug: bugIcon,
		example: listIcon,
		quote: quoteIcon,
		cite: quoteIcon,
	},
	customClassNames: [],
};
