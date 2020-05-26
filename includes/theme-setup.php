<?php

class themePrefix_ThemeSetup {

	public function __construct() {
		add_action( 'after_setup_theme', [ $this, 'addThemeSupport' ] );
	}

	public function addThemeSupport() {
		add_editor_style();
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'automatic-feed-links' );
		add_theme_support( 'post-formats', [ 'aside', 'gallery' ] );
		add_theme_support( 'custom-background' );
		add_theme_support( 'custom-header' );
	}


}

if ( class_exists( 'themePrefix_ThemeSetup' ) ) {
	$themeSetup = new themePrefix_ThemeSetup();
}