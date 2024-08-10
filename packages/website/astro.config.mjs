import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import rehypeCallout from 'rehype-callout';

// /** @type {import('rehype-callout').Config} */
// const calloutOptions = {
// }


import expressiveCode from "astro-expressive-code";

import rehypeExternalLinks from 'rehype-external-links'
import { fromHtml } from "hast-util-from-html";
const exteranlLink = fromHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32">
	<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 9H3v20h20V18M18 4h10v10m0-10L14 18" />
</svg>`,{space:'svg',fragment:true})

import { remarkModifiedTime } from './src/utils/remark-modified-time.mjs';

import remarkDirective from 'remark-directive'
import remarkContainer from '@shawspring/remark-container'

import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
// import { h } from "hastscript";
//  set icon in  css background-image
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
    remarkPlugins: [
    remarkModifiedTime,
    remarkDirective,
    remarkContainer], 
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
      [rehypeExternalLinks,
      { rel:['noopener'], 
        content:exteranlLink,   
        contentProperties:{style:"display:inline-block;vertical-align:text-bottom;aria-hidden:true;margin-left:0.25em;"},
        target: '_blank'
      }], 
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