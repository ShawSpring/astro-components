import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import rehypeCallout from 'rehype-callout';

// /** @type {import('rehype-callout').Config} */
// const calloutOptions = {
// }

//  expressive-code bug, build产物css文件路径不对。弃用 
// https://github.com/expressive-code/expressive-code/issues/221 
import expressiveCode from "astro-expressive-code";

import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
// import { h } from "hastscript";
const AnchorLinkIcon = {
  type: 'element',
  tagName: 'span',
  properties: { ariaHidden: 'true'},
}    

// https://astro.build/config
export default defineConfig({
  site: "https://shawspring.github.io",
  base: "/astro-components",  /* ==> import.meta.env.BASE_URL */  
  trailingSlash: 'never',     
  output: "static",         
  integrations: [tailwind({     
    nesting: true   
  }), expressiveCode(), mdx()],  
  markdown: {      
    rehypePlugins: [     
      rehypeCallout, 
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: {
            className: "_heading-anchor  not-prose",
            ariaHidden: true,
            tabIndex: -1,
          },
          content: AnchorLinkIcon,
        },
      ],
    ],
    // shikiConfig: {
    //   themes: {
    //     light: 'solarized-light',
    //     dark: 'dracula'
    //   },
    //   // 启用自动换行，以防止水平滚动
    //   wrap: true
    // }
  }
});