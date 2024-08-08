## What is this?
This is a remark plugin to wrap something in custom containers, based on [remark-directive](https://www.npmjs.com/package/remark-directive).
you can passing arbitrary attributes to container, see [remark-attr](https://www.npmjs.com/package/remark-attr) for more details.

for example: `:::container{class="grid grid-cols-2"}` will easily implement a grid layout.     
the render result [preview](https://shawspring.github.io/astro-components/remarkPlugin/remarkcontainer/)

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


