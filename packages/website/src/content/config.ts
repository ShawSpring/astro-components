import { defineCollection, z } from "astro:content";
import { describe } from "node:test";

const calloutCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		/**
		 * pages with draft:true will not be included in production builds
		 */
		draft: z.boolean().optional(),
		/**
		 * the order of this page when sorting the link group.
		 * Lower numbers are displayed higher up in the link group.
		 */
		order: z.number().optional(),
	}),
});

const componentsCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		/**
		 * pages with draft:true will not be included in production builds
		 */
		draft: z.boolean().optional(),
		/**
		 * the order of this page when sorting the link group.
		 * Lower numbers are displayed higher up in the link group.
		 */
		order: z.number().optional(),
		/**
		 * keywords for html meta
		 */
		keywords: z.string().optional(),
	}),
});

const remarkCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		/**
		 * pages with draft:true will not be included in production builds
		 */
		draft: z.boolean().optional(),
		/**
		 * the order of this page when sorting the link group.
		 * Lower numbers are displayed higher up in the link group.
		 */
		order: z.number().optional(),
		/**
		 * keywords for html meta
		 */
		keywords: z.string().optional(),
	}),
});

export const collections = {
	callout: calloutCollection,
	components: componentsCollection,
	remarkPlugin: remarkCollection,
};
