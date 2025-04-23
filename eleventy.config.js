import { IdAttributePlugin, InputPathToUrlTransformPlugin, HtmlBasePlugin } from "@11ty/eleventy";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import {feedPlugin } from "@11ty/eleventy-plugin-rss";


import postcss from "postcss";
import postcssImport from "postcss-import";
import postcssCustomMedia from "postcss-custom-media";
import cleanCSS from "clean-css";

import pluginFilters from "./eleventy.config.filters.js";
import pluginDrafts from "./eleventy.config.drafts.js";

import dataMetadata from "./_data/metadata.js";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy({
		"./static/": "/",
	})
	eleventyConfig.addPassthroughCopy("./content/feed/pretty-atom-feed.xsl")

	// Per-page bundles, see https://github.com/11ty/eleventy-plugin-bundle
	// Bundle <style> content and adds a {% css %} paired shortcode
	eleventyConfig.addBundle("css", {
		// Add all <style> content to `css` bundle (use eleventy:ignore to opt-out)
		// supported selectors: https://www.npmjs.com/package/posthtml-match-helper
		bundleHtmlContentFromSelector: "style",
		// Process sources
		transforms: [
			// PostCSS plugins
			async function(content) {
				let result = await postcss([postcssImport, postcssCustomMedia]).process(content, { from: undefined });
				return result.css;
			},
			// Minify
			async function(content) {
				return new cleanCSS().minify(content).styles
			}
		]
	});
	// Watch content images for the image pipeline.
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg}");
	eleventyConfig.addWatchTarget("style/**/*.css");
	// Official plugins
	eleventyConfig.addPlugin(HtmlBasePlugin);
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom", // or "rss", "json"
		outputPath: "/feed/feed.xml",
		stylesheet: "pretty-atom-feed.xsl",
		collection: {
			name: "posts",
		},
		metadata: {
			language: "en",
			title: dataMetadata.title,
			subtitle: dataMetadata.description,
			base: dataMetadata.url,
			author: {
				name: `${dataMetadata.author.name} (${dataMetadata.founders })`,
				url: dataMetadata.url
			}
		}
	});
	eleventyConfig.addPlugin(pluginSyntaxHighlight, {
		preAttributes: { tabindex: 0 }
	});
	// Image optimization: https://www.11ty.dev/docs/plugins/image/#eleventy-transform
	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// Output formats for each image.
		formats: ["avif", "webp", "auto"],

		widths: [560, 1120, "auto"],

		failOnError: false,
		htmlOptions: {
			imgAttributes: {
				// e.g. <img loading decoding> assigned on the HTML tag will override these values.
				loading: "lazy",
				decoding: "async",
			}
		},

		sharpOptions: {
			animated: true,
		},

		urlPath: "/img/"
	});
	// Filters
	eleventyConfig.addPlugin(pluginFilters);
	// Draft posts
	eleventyConfig.addPlugin(pluginDrafts);
}

export const config = {
	// Pre-process *.md files with: (default: `liquid`)
	markdownTemplateEngine: "njk",

	// Pre-process *.html files with: (default: `liquid`)
	htmlTemplateEngine: "njk",

	dir: {
		input: "content", // default: "."
		includes: "../_includes", // default: "_includes" (`input` relative)
		data: "../_data", // default: "_data" (`input` relative)
		output: "_site"
	},
}
