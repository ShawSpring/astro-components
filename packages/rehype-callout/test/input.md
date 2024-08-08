
## normal callout
>[!note] this is a note         
> note content     
> bac929

  
> [!abstract]   
> what do you *like*?          
> - apple  
> - banana
> - orange

## Single line

>[!info] This is a singleLine callout.

>[!info]+ singleLine callout with `+`.

>[!note] *abc*   
  

## format

>[!example] ~~del~~ *em*  <span style="color: red">red</span> 
> ````md
> >[!example] ~~del~~ *em*  <span style="color: red">red</span> 
> ````


## default title
>[!info]
> first line is empty.  
> content of  the **info** callout.


> [!abstract]  
> first line is empty but two whitespace
> - apple
> - banana
> - orange
 

## nested callouts

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
>>[!success] nested callout
> > nested content


## foldable 
> [!faq]- Are callouts foldable?  
> Yes! In a foldable callout, the contents are hidden when the callout is collapsed.  

> [!faq]+ Are callouts foldable?   
> Yes! In a foldable callout, the contents are hidden when the callout is collapsed.


> [!summary]+
> what do you *like*?
> - apple
> - banana
> - orange


## type dont exist

>[!dontexist] This is a **note** callout.  
> This is the content!  
  





