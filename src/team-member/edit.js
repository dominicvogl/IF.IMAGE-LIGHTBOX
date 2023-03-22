import { __ } from "@wordpress/i18n"; // Internationalisierungsfunktionen
import { useEffect, useState, useRef } from "@wordpress/element"; // React-Hooks
import {
	// Block-Editor-Komponenten und Funktionen
	useBlockProps, // normal block props from wordpress
	RichText, // rich text editor from wordpress
	MediaPlaceholder,
	BlockControls,
	MediaReplaceFlow,
	InspectorControls,
	store as blockEditorStore,
} from "@wordpress/block-editor";
import { isBlobURL, revokeBlobURL } from "@wordpress/blob"; // Blob-URL-Funktionen
import {
	// Weitere Wordpress-Komponenten
	Spinner,
	withNotices,
	ToolbarButton,
	PanelBody,
	TextareaControl,
	SelectControl,
} from "@wordpress/components";
import { useSelect } from "@wordpress/data"; // Datenabfragefunktion

/**
 * Edit function
 * @param attributes
 * @param setAttributes
 * @param noticeOperations
 * @param noticeUI
 * @returns {JSX.Element}
 * @constructor
 */
const Edit = ({ attributes, setAttributes, noticeOperations, noticeUI }) => {
	const { name, bio, url, alt, id } = attributes;
	const [blobURL, setBlobURL] = useState();

	const titleRef = useRef();

	const imageObject = useSelect(
		(select) => {
			const { getMedia } = select("core");
			return id ? getMedia(id) : null;
		},
		[id]
	);

	const imageSizes = useSelect((select) => {
		return select(blockEditorStore).getSettings().imageSizes;
	}, []);

	// write function to merge imageObject and imageSizes by key
	const getImageSizeOptions = () => {
		if (!imageObject) return [];
		const options = [];
		const sizes = imageObject.media_details.sizes;

		for (const key in sizes) {
			const size = sizes[key];
			const imageSize = imageSizes.find((s) => s.slug === key);
			if (imageSize) {
				options.push({
					label: imageSize.name,
					value: size.source_url,
				});
			}
		}

		return options;
	};

	const onChangeName = (newName) => {
		setAttributes({ name: newName });
	};

	const onChangeBio = (newBio) => {
		setAttributes({ bio: newBio });
	};

	const onSelectImage = (image) => {
		if (!image || !image.url) {
			setAttributes({
				id: undefined,
				url: undefined,
				alt: "",
			});
		}

		setAttributes({
			id: image.id,
			alt: image.alt,
			url: image.url,
		});
	};

	const onChangeImageSize = (newURL) => {
		setAttributes({
			url: newURL,
		});
	};

	const onChangeAlt = (newAlt) => {
		setAttributes({ alt: newAlt });
	};

	const onSelectUrl = (newURL) => {
		setAttributes({
			url: newURL,
			id: undefined,
			alt: "",
		});
	};

	const onUploadError = (message) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice(message);
	};

	const removeImage = () => {
		setAttributes({
			id: undefined,
			url: undefined,
			alt: "",
		});
	};

	useEffect(() => {
		if (!id && isBlobURL(url)) {
			setAttributes({
				url: undefined,
				alt: "",
			});
		}
	});

	useEffect(() => {
		if (isBlobURL(url)) {
			setBlobURL(url);
		} else {
			revokeBlobURL(blobURL);
			setBlobURL(undefined);
		}
	}, [url]);

	useEffect(() => {
		titleRef.current.focus();
	}, [url]);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Image Settings", "team-members")}>
					{id && (
						<SelectControl
							label={__("Image size", "team-members")}
							options={getImageSizeOptions()}
							value={url}
							onChange={onChangeImageSize}
						/>
					)}
					{url && !isBlobURL(url) && (
						<TextareaControl
							label={__("Alt Text", "team-members")}
							value={alt}
							onChange={onChangeAlt}
							help={__(
								"Alternative text describes your image to people who can't see it. Add alternative text so search engines can better understand the content of your image.",
								"team-members"
							)}
						/>
					)}
				</PanelBody>
			</InspectorControls>
			{url && (
				<BlockControls group="inline">
					<MediaReplaceFlow
						name={__("Replace member image", "team-members")}
						icon="admin-users"
						onSelect={onSelectImage}
						onSelectURL={onSelectUrl}
						onError={onUploadError}
						accept="image/*"
						allowedTypes={["image"]}
						disableMediaButtons={url}
						notices={noticeUI}
						mediaId={id}
						mediaURL={url}
					/>
					<ToolbarButton onClick={removeImage}>
						{__("Remove Image", "text-member")}
					</ToolbarButton>
				</BlockControls>
			)}
			<article {...useBlockProps()}>
				{url && (
					<div
						className={`wp-block-team-member-image-wrapper-img${
							isBlobURL(url) ? "is-loading" : ""
						}`}
					>
						<img src={url} alt={alt} />
						{isBlobURL(url) && <Spinner />}
					</div>
				)}
				<MediaPlaceholder
					icon="admin-users"
					onSelect={onSelectImage}
					onSelectURL={onSelectUrl}
					onError={onUploadError}
					accept="image/*"
					allowedTypes={["image"]}
					disableMediaButtons={url}
					notices={noticeUI}
				/>
				<RichText
					ref={titleRef}
					placeholder={__("Member Name", "team-member")}
					onChange={onChangeName}
					value={name}
					tagName="h4"
					allowedFormats={[]} // disable formatting
				/>
				<RichText
					placeholder={__("Member Bio", "team-member")}
					value={bio}
					onChange={onChangeBio}
					tagName="p"
					allowedFormats={[]} // disable formatting
				/>
			</article>
		</>
	);
};

export default withNotices(Edit);
