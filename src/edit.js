import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, RangeControl } from "@wordpress/components";
import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
	const { columns } = attributes;
	const onChangeColumns = (newColumns) => {
		setAttributes({ columns: newColumns });
	};

	return (
		<div
			{...useBlockProps({
				className: `has-${columns}-columns`,
			})}
		>
			<InspectorControls>
				<PanelBody>
					<RangeControl
						label={__("Number of columns", "team-members")}
						min={1}
						max={6}
						value={columns}
						onChange={onChangeColumns}
					/>
				</PanelBody>
			</InspectorControls>
			<InnerBlocks
				allowedBlocks={["dominicvogl/team-member"]}
				template={[
					["dominicvogl/team-member"],
					["dominicvogl/team-member"],
					["dominicvogl/team-member"],
				]}
				// templateLock="all"
			/>
		</div>
	);
}
