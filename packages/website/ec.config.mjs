import { defineEcConfig } from "astro-expressive-code";

export default defineEcConfig({
	// Example: Using a custom plugin (which makes this `ec.config.mjs` file necessary)
	// ... any other options you want to configure

	themes: ["dracula", "solarized-light"],
	frames: true,

	// toggle darkmode with <html data-theme="light/dark">  
	themeCssSelector: (theme) => {
        return `[data-theme='${theme.type}']`},
});


