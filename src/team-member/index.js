import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";

import Edit from "./edit";
import Save from "./save";

registerBlockType("dominicvogl/team-member", {
	title: __("Team Member", "team-members"),
	description: __("A team member block", "team-members"),
	icon: "admin-users",
	parent: ["dominicvogl/team-members"],
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
