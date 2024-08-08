import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import plugin from "../src/index";
import { defaultConfig, type Config } from "../src/config";

function normalizeHtml(html: string): string {
	return html.replace(/[\n\s]*(<)|>([\n\s]*)/g, (match, p1, p2) =>
		p1 ? "<" : ">",
	);
}

const runPluginFromMarkdown = async (
	input: string,
	config: Partial<Config> = {},
) => {
	const processor = unified()
	.use(remarkParse, { fragment: true })
		.use(remarkRehype)
		.use(plugin, config)
		.use(rehypeFormat)
		.use(rehypeStringify);
	// return normalizeHtml(String(await processor.process(input)));
	return String(await processor.process(input)).trim();  
};

const log = async (input: string,config: Partial<Config> = {},) => {
	await runPluginFromMarkdown(input,config).then(console.log);
	console.log("\n");
};

const templateOutput = (output: string) =>
	`<html><head></head><body>${output}</body></html>`;

const basic = `>[!note] This is a **note** callout.  
> 你好!
> ## inner title
> This is the content!`;

const defaultTitle1 = `>[!info]  
> This is a info callout  
> This is a **info** callout.`;

const defaultTitle2 = `>[!info]  
>*This is a info callout*  
> This is a **info** callout.`;

const defaultTitle3 = `>[!info] *em* abc`;

const defaultTitle4 = `>[!info] **em**  
> This is a **info** callout.`;


const typeDontExist = `>[!dontexist] This is a **note** callout.  
> This is the content!`;

const expandable = `>[!faq] This is a **note** callout.
> this is content`;

const singleLine = `>[!info] This is a singleLine callout.`;

const nestedCallout = `> [!question] Can callouts be nested?  
> > [!todo] Yes!, they can.  
> > > [!example]  You can even use multiple layers of nesting.`;

const formattedTitle = `>[!note] *abc*`;

//bug: no <br> behind title, outer content is missing
const nested2 = `>[!note] outer title
> outer content
>>[!success] nested callout
> > nested content`;

const nested3 = `
> [!note] outer callout
> outer content
>>[!success] nested callout
> > \`\`\`\`md
> > >[!note] outer callout  
> > >  outer content     
> > >>[!success] nested callout  
> > \`\`\`\`
`;

const foldable = `> [!faq]- Are callouts foldable?  
> Yes! In a foldable callout, the contents are hidden when the callout is collapsed.`;

const foldable2 = `> [!faq]+ Are callouts foldable?   
> Yes! In a foldable callout, the contents are hidden when the callout is collapsed.`;


// await log(basic);
// await log(defaultTitle1);
// await log(defaultTitle2);
// await log(defaultTitle3);
// await log(defaultTitle4);

// await log(expandable);
// await log(typeDontExist);
await log(singleLine);
// await log(nestedCallout);
// await log(formattedTitle);
// await log(nested2)
// await log(nested3)


// const md = `>[!note] This is a **note** callout.  
// > 你好!
// > ## inner title
// > This is the content!`;

// await log(md);