---
title: supported callout types 
order: 1 
---

see [obsidan callout types](https://help.obsidian.md/Editing+and+formatting/Callouts#Supported+types)

>[!info] if type is undefined, it will be treated as `note`.  

#### note

>[!NOTE] I used  [tailwindcss-typography](https://github.com/tailwindlabs/tailwindcss-typography#readme)
>```html
><article class="prose prose-green prose-blockquote:prose-sm lg:prose-lg dark:prose-invert">
>			<slot /><!-- markdown slot -->
></article>
>```


#### abstract | summary | tldr

> [!abstract]  
> what do you *like*?          
> abc
> - apple
> - banana
> - orange


> [!summary]+ Foldable with `+`, expands by default
> ````md
> > [!summary]+ Foldable with `+`
> > Lorem ipsum dolor sit amet
> ````


> [!tldr]- Foldable with `-`, collapses by default
> ````md
> > [!tldr]- Foldable with `-`
> > Lorem ipsum dolor sit amet
> ````

#### info
> [!info]
> ````md
> > [!info]
> > Lorem ipsum dolor sit amet
> ````

#### todo
> [!todo]
> ````md
> > [!todo]
> > Lorem ipsum dolor sit amet
> ````


#### important
> [!important]
> ````md
> > [!important]
> > Lorem ipsum dolor sit amet
> ````

#### tip | hint
> [!tip]
>  ````md
> > [!tip]
> > Lorem ipsum dolor sit amet
> ````

> [!hint]
> ````md
> > [!hint]
> > Lorem ipsum dolor sit amet
> ````  



#### success | check | done
> [!success]
> ````md
> > [!success]
> > Lorem ipsum dolor sit amet
> ````

> [!check]
> ````md
> > [!check]
> > Lorem ipsum dolor sit amet
> ````

> [!done]
> ````md
> > [!done]
> > Lorem ipsum dolor sit amet
> ````

#### question | help | faq
> [!question]
> ````md
> > [!question]
> > Lorem ipsum dolor sit amet
> ````

> [!help]
> ````md
> > [!help]
> > Lorem ipsum dolor sit amet
> ````

> [!faq]- Are callouts foldable?  
> Yes! In a foldable callout, the contents are hidden when the callout is collapsed. 


#### warning | caution | attention
> [!warning]
> ````md
> > [!warning]
> > Lorem ipsum dolor sit amet
> ````

> [!caution]
> ````md
> > [!caution]
> > Lorem ipsum dolor sit amet
> ````

> [!attention]
> ````md
> > [!attention]
> > Lorem ipsum dolor sit amet
> ````

#### failure | fail | missing
> [!failure]
> ````md
> > [!failure]
> > Lorem ipsum dolor sit amet
> ````

> [!fail]
> ````md
> > [!fail]
> > Lorem ipsum dolor sit amet
> ````

> [!missing]
> ````md
> > [!missing]
> > Lorem ipsum dolor sit amet
> ````

#### danger | error

> [!danger]
> ````md
> > [!danger]
> > Lorem ipsum dolor sit amet
> ````

> [!error]
> ````md
> > [!error]
> > Lorem ipsum dolor sit amet
> ````

#### bug

> [!bug]
> ````md
> > [!bug]
> > Lorem ipsum dolor sit amet
> ````

#### example
> [!example]
> ````md
> > [!example]
> > Lorem ipsum dolor sit amet
> ````

#### quote | cite

> [!quote]
> ````md
> > [!quote]
> > Lorem ipsum dolor sit amet
> ````

> [!cite]
> ````md
> > [!cite]
> > Lorem ipsum dolor sit amet
> ````