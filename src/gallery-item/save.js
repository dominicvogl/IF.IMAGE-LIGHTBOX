import { useBlockProps, RichText } from "@wordpress/block-editor";

const Save = ({ attributes }) => {
	const { url, alt, id } = attributes;

	return (
		<div {...useBlockProps.save()}>
			{url && (
				<img
					src={url}
					alt={alt}
					className={id ? `wp-image-${id}` : null}
				/>
			)}
		</div>
	);
};

export default Save;
