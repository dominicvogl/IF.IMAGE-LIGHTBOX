import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, RangeControl } from "@wordpress/components";
import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
	return (
		<section {...useBlockProps()}>
			<InnerBlocks
				allowedBlocks={["if-digital/image-lightbox"]}
				template={[
					["if-digital/image-lightbox"],
					["if-digital/image-lightbox"],
					["if-digital/image-lightbox"],
				]}
				// templateLock="all"
			/>
		</section>
	);
}
