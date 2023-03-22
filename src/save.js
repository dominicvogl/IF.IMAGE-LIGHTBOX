import { __ } from "@wordpress/i18n";
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

export default function save({ attributes }) {
	return (
		<p {...useBlockProps.save()}>
			<InnerBlocks.Content />
		</p>
	);
}
