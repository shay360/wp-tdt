<?php

class ThemeSetup {

	public function __construct() {
		add_action( 'after_setup_theme', [ $this, 'addThemeSupport' ] );
	}

	public function addThemeSupport() {		add_theme_support( 'automatic-feed-links' );
		add_theme_support( 'post-formats' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'custom-background' );
		add_theme_support( 'html-5' );
		add_theme_support( 'title-tag' );
		add_theme_support( 'custom-logo' );
}
}
new ThemeSetup();