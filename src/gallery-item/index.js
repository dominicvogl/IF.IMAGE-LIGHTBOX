import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";

import Edit from "./edit";
import Save from "./save";

registerBlockType("if-digital/image-lightbox", {
	title: __("Image Lightbox", "if-image-lightboxes"),
	description: __("A Image Gallery Block", "if-image-lightboxes"),
	icon: "format-image",
	parent: ["if-digital/image-lightboxes"],
	attributes: {
		name: {
			type: "string",
			source: "html",
			selector: "h3",
		},
		bio: {
			type: "string",
			source: "html",
			selector: "p",
		},
		id: {
			type: "number",
		},
		alt: {
			type: "string",
			source: "attribute",
			selector: "img",
			attribute: "alt",
			default: "",
		},
		url: {
			type: "string",
			source: "attribute",
			selector: "img",
			attribute: "src",
		},
	},
	supports: {
		reusable: false,
		html: false,
	},
	edit: Edit,
	save: Save,
});
