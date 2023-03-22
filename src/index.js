import { name } from "../block.json";
import { registerBlockType } from "@wordpress/blocks";
import "./team-member";
import "./style.scss";
import Edit from "./edit";
import save from "./save";

registerBlockType("if-digital/image-lightbox", {
	edit: Edit,
	save,
});
