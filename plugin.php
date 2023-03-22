<?php
/**
 * Plugin Name:       IF Image lightbox
 * Description:       A image gallery with lightbox
 * Requires at least: 5.7
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Dominic Vogl
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       boilerplate
 *
 * @package           if-image-lightbox
 */

defined('ABSPATH') || exit;

class IF_IMAGE_LIGHTBOX {

	public function __construct() {
		add_action('init', array($this, 'block_init'));
	}

	public function block_init() {
		register_block_type_from_metadata(__DIR__);
	}
}

// Self-initialization
new IF_IMAGE_LIGHTBOX();
