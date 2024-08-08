---
title: rehype-callout
order: 0
---
## introduction 

This is a rehype plugin that parses Obsidian's callout syntax

[github repo](https://github.com/ShawSpring/astro-components/tree/main/packages/rehype-callout)

[npm package](https://www.npmjs.com/package/rehype-callout)  

> [!info] ES Module only


**Table of Contents** 
- [introduction](#introduction)
	- [features](#features)
		- [title and content can be formatted as normal markdown](#title-and-content-can-be-formatted-as-normal-markdown)
		- [support all obsidan callout types](#support-all-obsidan-callout-types)
		- [nested callouts](#nested-callouts)
		- [foldable with `+` or `-`](#foldable-with--or--)
	- [usage](#usage)
	- [Configuration](#configuration)
	- [style callouts](#style-callouts)
		- [prefix](#prefix)
		- [dark mode](#dark-mode)


### features 


#### title and content can be formatted as normal markdown
>[!example] ~~del~~ *em*  **strong** <span style="color: red">red</span> 
> ````md 
> >[!example] ~~del~~ *em* **strong** <span style="color: red">red</span> 
> ````

#### support all [obsidan callout types](/astro-components/callout/supported-types/)


#### nested callouts

> [!note] **outer** callout    
> outer content  
>>[!success] **nested** callout
> > ````md
> > >[!note] outer callout  
> > >  outer content     
> > >>[!success] nested callout  
> > ````

>[!note] outer title  
> outer content
> >[!success] nested callout  
> > nested content

#### foldable with `+` or `-`
A plus sign expands the callout by default, and a minus sign collapses it instead.

> [!faq]- Are callouts foldable?  
> Yes! In a foldable callout, the contents are hidden when the callout is collapsed.  

> [!faq]+ Are callouts foldable?   
> Yes! In a foldable callout, the contents are hidden when the callout is collapsed.



### usage
```sh title="install"  
npm install rehype-callout
```

```js {16}
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

import callout from "rehype-callout";

const md = `>[!note] This is a **note** callout.  
> 你好!
> ## inner title
> This is the content!`;

const output = unified()
.use(remarkParse)
.use(remarkRehype)
.use(callout, {}) /* second param is custom config options */
.use(rehypeStringify)
.processSync(md);
console.log(String(output))
```
The generated HTML of the above code would be:
```html
       <blockquote data-callout="note">
        <div class="callout-title">
            <div class="callout-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="2" x2="22" y2="6"></line>
                    <path d="M7.5 20.5 19 9l-4-4L3.5 16.5 2 22z"></path>
                </svg></div>
            <div class="callout-title-inner">This is a<strong>note</strong>callout.</div>
        </div>
        <div class="callout-content">
            <p>你好!</p>
            <h2>inner title</h2>
            <p>This is the content!</p>
        </div>
    </blockquote>
```

in Astro:
```js
//  astro.config.mjs
import rehypeCallout from 'rehype-callout';
// https://astro.build/config
export default defineConfig({
  // ...
  markdown:{
    rehypePlugins:[rehypeCallout],
  }
});
```


### Configuration

```js 
/** @type {import('rehype-callout').Config} */
const calloutOptions = {
	...
}
```

```ts
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
```

default config:

```ts
const defaultConfig: Config = {
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
```


### style callouts 

Class names are embedded in the generated HTML, so you can style them in your CSS. 

a preset css file is provided in: `node_modules/rehype-callout/callout.css`, you can import it or just copy it.
```js
import  'rehype-callout/css'; 
@import 'rehype-callout/css';  /* in css file @import */

```


#### prefix

>[!NOTE] to avoid css confilict  
> customize the prefix config option.       
> by default, {prefix:"callout"}.  

<details>
<summary>output with config {prefix:"custom-prefix"} will like this</summary>

```html 
 <blockquote data-custom-prefix="note">
        <div class="custom-prefix-title">
            <div class="custom-prefix-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <line x1="18" y1="2" x2="22" y2="6"></line>
                    <path d="M7.5 20.5 19 9l-4-4L3.5 16.5 2 22z"></path>
                </svg></div>
            <div class="custom-prefix-title-inner">This is a<strong>note</strong>callout.</div>
        </div>
        <div class="custom-prefix-content">
            <p>你好!</p>
            <h2>inner title</h2>
            <p>This is the content!</p>
        </div>
    </blockquote>
```

</details>

<br/>

#### dark mode

> [!info] dark mode   
> surpport dark mode by css variables 
> ```css
> [date-theme="dark"] [data-callout] {
> ...
> }
> ```

