import { defaultConfig, type Config } from "../src/config";
type Fixture = {
	title: string;
	input: string;
	output: string;
	debug?: boolean;
	config?: Partial<Config>;
};
const types = defaultConfig.types;

export default [
	{
		title: "normal callout",
		input: `>[!note] this is a note         
> note content     
> bac929`,
		output: `<blockquote data-callout="note">
                <div class="callout-title">
                    <div class="callout-icon">
                    ${types.note}
                    </div>
                    <div class="callout-title-inner">this is a note</div>
                </div>
                <div class="callout-content">
                    <p>note content<br>bac929</p>
                </div>
                </blockquote>`,
	},
	{
		title: "empty title",
		input: `> [!abstract]   
> what do you *like*?          
> - apple  
> - banana
> - orange`,
		output: `<blockquote data-callout="abstract">
            <div class="callout-title">
                <div class="callout-icon">
                ${types.abstract}
                </div>
                <div class="callout-title-inner">Abstract</div>
            </div>
            <div class="callout-content">
                <p>what do you <em>like</em>?</p>
                <ul>
                <li>apple</li>
                <li>banana</li>
                <li>orange</li>
                </ul>
            </div>
            </blockquote>`,
	},
	// single line
	{
		title: "singleLine",
		input: `>[!info] This is a singleLine callout.`,
		output: `<blockquote data-callout="info">
                <div class="callout-title">
                    <div class="callout-icon">
                    ${types.info}
                    </div>
                    <div class="callout-title-inner">This is a singleLine callout.</div>
                </div>
                </blockquote>`,
	},
	{
		title: "formatted title",
		input: `>[!note] *abc*`,
		output: `<blockquote data-callout="note"><div class="callout-title"><div class="callout-icon">${types.note}</div><div class="callout-title-inner"><em>abc</em></div></div></blockquote>`,
	},
	{
		title: "singleLine callout with `+`",
		input: ">[!info]+ singleLine callout with `+`.",
		output: `<details open data-callout="info">
                <summary class="callout-title">
                    <div class="callout-icon">
                    ${types.info}
                    </div>
                    <div class="callout-title-inner">singleLine callout with <code>+</code>.</div>
                    <div class="callout-expand">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right">
                        <path d="m9 18 6-6-6-6"></path>
                    </svg>
                    </div>
                </summary>
                </details>`,
	},
	// format
	{
		title: "format callout",
		input: `>[!example] ~~del~~ *em*  <span style="color: red">red</span> 
> \`\`\`\`md
> >[!example] ~~del~~ *em*  <span style="color: red">red</span> 
> \`\`\`\``,
		output: `<blockquote data-callout="example">
        <div class="callout-title">
            <div class="callout-icon">
            ${types.example}
            </div>
            <div class="callout-title-inner">~~del~~ <em>em</em> <span style="color: red">red</span></div>
        </div>
        <div class="callout-content">
            <pre><code class="language-md">>[!example] ~~del~~ *em*  &#x3C;span style="color: red">red&#x3C;/span> 
        </code></pre>
        </div>
        </blockquote>`,
	},
	// default title
	{
		title: "first line is empty",
		input: `>[!info]
> first line is empty.  
> content of  the **info** callout.`,
		output: `<blockquote data-callout="info">
                <div class="callout-title">
                    <div class="callout-icon">
                    ${types.info}
                    </div>
                    <div class="callout-title-inner">first line is empty.</div>
                </div>
                <div class="callout-content">
                    <p>content of the <strong>info</strong> callout.</p>
                </div>
                </blockquote>`,
	},
	{
		title: "first line is empty but two whitespace",
		input: `> [!abstract]  
> first line is empty but two whitespace
> - apple
> - banana
> - orange`,
		output: `<blockquote data-callout="abstract">
                <div class="callout-title">
                    <div class="callout-icon">
                    ${types.abstract}
                    </div>
                    <div class="callout-title-inner">Abstract</div>
                </div>
                <div class="callout-content">
                    <p>first line is empty but two whitespace</p>
                    <ul>
                    <li>apple</li>
                    <li>banana</li>
                    <li>orange</li>
                    </ul>
                </div>
                </blockquote>`,
	},
	// nested callouts
	{
		title: "nested callouts 1",
		input: `> [!note] **outer** callout       
> outer content
>>[!success] **nested** callout
> > \`\`\`\`md
> > >[!note] outer callout  
> > >  outer content     
> > >>[!success] nested callout  
> > \`\`\`\``,
		output: `<blockquote data-callout="note">
  <div class="callout-title">
    <div class="callout-icon">
      ${types.note}
    </div>
    <div class="callout-title-inner"><strong>outer</strong> callout</div>
  </div>
  <div class="callout-content">
    <p>outer content</p>
    <blockquote data-callout="success">
      <div class="callout-title">
        <div class="callout-icon">
          ${types.success}
        </div>
        <div class="callout-title-inner"><strong>nested</strong> callout</div>
      </div>
      <div class="callout-content">
        <pre><code class="language-md">>[!note] outer callout  
>  outer content     
>>[!success] nested callout  
</code></pre>
      </div>
    </blockquote>
  </div>
</blockquote>`,
	},
	{
		title: "nested callouts 2",
		input: `>[!note] outer title
> outer content
>>[!success] nested callout
> > nested content`,
		output: `<blockquote data-callout="note">
  <div class="callout-title">
    <div class="callout-icon">
      ${types.note}
    </div>
    <div class="callout-title-inner">
      outer title
      outer content
    </div>
  </div>
  <div class="callout-content">
    <blockquote data-callout="success">
      <div class="callout-title">
        <div class="callout-icon">
          ${types.success}
        </div>
        <div class="callout-title-inner">
          nested callout
          nested content
        </div>
      </div>
    </blockquote>
  </div>
</blockquote>`,
	},
	// foldable callout
	{
		titile: "foldable callout with -",
		input: `> [!faq]- Are callouts foldable?  
> Yes! In a foldable callout, the contents are hidden when the callout is collapsed.  `,
		output: `<details data-callout="faq">
  <summary class="callout-title">
    <div class="callout-icon">
        ${types.faq}
    </div>
    <div class="callout-title-inner">Are callouts foldable?</div>
    <div class="callout-expand">
        ${defaultConfig.expandIcon}
    </div>
  </summary>
  <div class="callout-content">
    <p>Yes! In a foldable callout, the contents are hidden when the callout is collapsed.</p>
  </div>
</details>`,
	},
	{
		title: "foldable callout with +",
		input: `> [!faq]+ Are callouts foldable?   
> Yes! In a foldable callout, the contents are hidden when the callout is collapsed.`,
		output: `<details open data-callout="faq">
  <summary class="callout-title">
    <div class="callout-icon">
      ${types.faq}
    </div>
    <div class="callout-title-inner">Are callouts foldable?</div>
    <div class="callout-expand">
     ${defaultConfig.expandIcon}
    </div>
  </summary>
  <div class="callout-content">
    <p>Yes! In a foldable callout, the contents are hidden when the callout is collapsed.</p>
  </div>
</details>`,
	},
    {
        title:`first line is empty with +`,
        input:`> [!summary]+
> what do you *like*?
> - apple
> - banana
> - orange
`,
       output:`<details open data-callout="summary">
  <summary class="callout-title">
    <div class="callout-icon">
        ${types.summary}
    </div>
    <div class="callout-title-inner">what do you <em>like</em>?</div>
    <div class="callout-expand">
        ${defaultConfig.expandIcon}
    </div>
  </summary>
  <div class="callout-content">
    <ul>
      <li>apple</li>
      <li>banana</li>
      <li>orange</li>
    </ul>
  </div>
</details>`
    },
    // type dont exist
    {
        title: "type dont exist",
        input:`>[!dontexist] This is a **note** callout.  
> This is the content!  `,
        output:`<blockquote data-callout="dontexist">
  <div class="callout-title">
    <div class="callout-icon">
      ${types.note}
    </div>
    <div class="callout-title-inner">This is a <strong>note</strong> callout.</div>
  </div>
  <div class="callout-content">
    <p>This is the content!</p>
  </div>
</blockquote>`
    }
] as Fixture[];
