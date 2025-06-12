import { type CollectionEntry, getCollection } from "astro:content";

/** filter out draft demos based on the environment */
export async function getAllDemos(): Promise<CollectionEntry<"demo">[]> {
	return await getCollection("demo", ({ data }) => {
		return import.meta.env.PROD ? !data.draft : true;
	});
}

/** Get tag metadata by tag name */
export async function getTagMeta(tag: string): Promise<CollectionEntry<"tag"> | undefined> {
	const tagEntries = await getCollection("tag", (entry) => {
		return entry.id === tag;
	});
	return tagEntries[0];
}

/** groups demos by year (based on option siteConfig.sortDemosByUpdatedDate), using the year as the key
 *  Note: This function doesn't filter draft demos, pass it the result of getAllDemos above to do so.
 */
export function groupDemosByYear(demos: CollectionEntry<"demo">[]) {
	return demos.reduce<Record<string, CollectionEntry<"demo">[]>>((acc, demo) => {
		const year = demo.data.publishDate.getFullYear();
		if (!acc[year]) {
			acc[year] = [];
		}
		acc[year]?.push(demo);
		return acc;
	}, {});
}

/** returns all tags created from demos (inc duplicate tags)
 *  Note: This function doesn't filter draft demos, pass it the result of getAllDemos above to do so.
 *  */
export function getAllTags(demos: CollectionEntry<"demo">[]) {
	return demos.flatMap((demo) => [...demo.data.tags]);
}

/** returns all unique tags created from demos
 *  Note: This function doesn't filter draft demos, pass it the result of getAllDemos above to do so.
 *  */
export function getUniqueTags(demos: CollectionEntry<"demo">[]) {
	return [...new Set(getAllTags(demos))];
}

/** returns a count of each unique tag - [[tagName, count], ...]
 *  Note: This function doesn't filter draft demos, pass it the result of getAllDemos above to do so.
 *  */
export function getUniqueTagsWithCount(demos: CollectionEntry<"demo">[]): [string, number][] {
	return [
		...getAllTags(demos).reduce(
			(acc, t) => acc.set(t, (acc.get(t) ?? 0) + 1),
			new Map<string, number>(),
		),
	].sort((a, b) => b[1] - a[1]);
}
