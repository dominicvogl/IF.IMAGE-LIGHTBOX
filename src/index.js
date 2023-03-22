import { name } from "../block.json";
import { registerBlockType } from "@wordpress/blocks";
import "./gallery-item";
import "./style.scss";
import Edit from "./edit";
import save from "./save";

registerBlockType("if-digital/image-lightboxes", {
	icon: {
		src: "images-alt",
		background: "#f00",
		foreground: "#fff",
	},
	edit: Edit,
	save,
});
