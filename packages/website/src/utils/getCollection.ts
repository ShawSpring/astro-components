/**
 * 有几个地方用到，所有需要提出来。 sidebar.astro, 和[...slug].astro中。
 */
import { getCollection } from "astro:content";

import { PROD } from "@/utils/metaEnv";

const calloutEntries = await getCollection("callout", ({ data }) => {
	return PROD ? data.draft !== true : true;
});

const componentsEntries = await getCollection("components", ({ data }) => {
    return PROD ? data.draft !== true : true;
});

const remarkEntries = await getCollection("remarkPlugin", ({ data }) => {
    return PROD ? data.draft !== true : true;
})

// 排序， 数字越小越在前面，没有order排后面。
calloutEntries.sort((a, b) => {
    return (a.data.order ?? 2 ** 32) - (b.data.order ?? 2 ** 32);
});
componentsEntries.sort((a, b) => {
	return (a.data.order ?? 2 ** 32) - (b.data.order ?? 2 ** 32);
});
remarkEntries.sort((a, b) => {
    return (a.data.order ?? 2 ** 32) - (b.data.order ?? 2 ** 32);
})
export { calloutEntries, componentsEntries ,remarkEntries}; 



