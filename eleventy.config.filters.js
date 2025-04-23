import { DateTime } from "luxon";
import dataMetadata from "./_data/metadata.js";

export default function(eleventyConfig) {
	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
	});

	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('yyyy-LL-dd');
	});

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if(!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if( n < 0 ) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// Return the keys used in an object
	eleventyConfig.addFilter("getKeys", target => {
		return Object.keys(target);
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "posts"].indexOf(tag) === -1);
	});

	eleventyConfig.addFilter("sortAlphabetically", strings =>
		(strings || []).sort((b, a) => b.localeCompare(a))
	);
	eleventyConfig.addFilter("absoluteUrl", function(path) {
		if (this.eleventy.env.runMode === 'build') {
			return dataMetadata.url + path
		} else {
			return path
		}
	});

	eleventyConfig.addFilter("isCurrent", function (url) {
		if (!url) {
			throw new Error(`isCurrent requires an url to work with`);
		}
		if (this.page.url == false) { // Draft post whoes not rendered
			return false
		}
		return this.page.url === url
	});

	eleventyConfig.addFilter("isCurrentOrParent", function (url) {
		if (!url) {
			throw new Error(`isCurrentOrParent requires an url to work with`);
		}
		if (this.page.url == false) { // Draft post whoes not rendered
			return false
		}
		if (url === '/') { // strict check if homepage
			return this.page.url === url
		} else {
			return this.page.url.startsWith(url);
		}
	});
};
