---
title: remark-container
keywords: remark-plugin,remark-container,grid layout,remark-directive
---

## What is this?
This is a remark plugin to wrap something in custom containers, based on [remark-directive](https://www.npmjs.com/package/remark-directive).
you can passing arbitrary attributes to container, see [remark-attr](https://www.npmjs.com/package/remark-attr) for more details.

for example: `:::container{class="grid grid-cols-2"}` will easily implement a grid layout.    

## install

:::container{class="grid grid-cols-2"}
```bash 
npm install @shawspring/remark-container
```
```bash
yarn add @shawspring/remark-container 
```
:::


## usage
>[!NOTE]
> remark-directive is required before remark-container.

Say our document example.md contains:
````md
# How to use remark-container

:::container{.cls1 .cls2 style="color: red"}
some **content**

>[!note] 
> this is a note
:::

````
…and our module example.js contains:
```js
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import remarkDirective from 'remark-directive'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import {read} from 'to-vfile'  
import {unified} from 'unified'

import remarkContainer from '@shawspring/remark-container'

const file = await unified()
    .use(remarkParse)
    .use(remarkDirective) 
    .use(remarkContainer,{attributes:{class:"container",style:"display:grid;grid-template-columns: 1fr 1fr;grid-gap: 1em;"}})
    .use(remarkRehype)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(await read('example.md'));
console.log(String(file))
```

…then running node example.js yields:
```html 
<h1>How to use remark-container</h1>
<div class="container cls1 cls2" style="display:grid;grid-template-columns: 1fr 1fr;grid-gap: 1em; color: red">
  <p>some <strong>content</strong></p>
  <blockquote>
    <p>
      [!note]
      this is a note
    </p>
  </blockquote>
</div>
```


## config

 * @param {Object} config - optional,The configuration object.
 * @param {string} config.name -optional, The container identifier behind `:::`.
 * @param {Object} config.attributes -optional, default attributes applied to all containers.



## Examples
implement steps:

:::container{.steps-container .not-prose} 
1. install remark-container
```bash
npm install @shawspring/remark-container
```

2. import remark-container
```ts
import remarkContainer from '@shawspring/remark-container'
```

3. use remark-container
```ts
 markdown: {      
    remarkPlugins: [remarkContainer]
 }
```
::: 

the source code is as follows: 

````md title="example.md"
:::container{.steps-container .not-prose} 
1. install remark-container
```bash
npm install @shawspring/remark-container
```

2. import remark-container
```ts
import remarkContainer from '@shawspring/remark-container'
```

3. use remark-container
```ts
  ...
```
::: 
````
and css file as follows:
```html title="steps.astro"
<style is:global>
    .steps-container {
        counter-reset: steps-counter;
        --bullet-size: 1.5em;
        --w-left: calc(var(--bullet-size) + 1em);
        --margin-bottom: 1em;
    }
    .steps-container > :not(ol) {
        padding-inline-start: var(--w-left);
        margin-bottom: var(--margin-bottom);
        position: relative;
    }
    .steps-container > ol {
        list-style: none;
        counter-increment: steps-counter;
        padding-inline-start: var(--w-left);
        position: relative;
    }
    .steps-container > ol::before {
        content: counter(steps-counter);
        position: absolute;
        inset-inline-start: 0;
        bottom: 0;
        box-sizing: content-box;
        width: var(--bullet-size);
        height: var(--bullet-size);
        line-height: var(--bullet-size);
        text-align: center;
        border-radius: 50%;
        border: 2px solid steelblue;
    }
    .steps-container > ol:hover::before {
        background-color: steelblue;
    }
    .steps-container > :not(ol):not(:last-of-type)::before {
        content: '';
        position: absolute;
        inset-inline-start: calc(var(--bullet-size) / 2 + 2px); 
        top: 0;
        bottom:calc(var(--margin-bottom) * -1); 
        box-sizing: border-box;
        border: 1px solid grey; 
    }
</style>

```

