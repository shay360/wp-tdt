<?php

class ThemeSetup {

	public function __construct() {
		add_action( 'after_setup_theme', [ $this, 'addThemeSupport' ] );
	}

	public function addThemeSupport() {		add_theme_support( 'automatic-feed-links' );
		add_theme_support( 'post-formats', ['aside', 'gallery', 'link', 'image', 'quote', 'status', 'video', 'audio', 'chat'] );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'custom-header', ['default-image' => '', 'random-default' => false, 'width' => 0, 'height' => 0, 'flex-height' => false, 'flex-width' => false, 'default-text-color' => '', 'header-text' => true, 'uploads' => true, 'wp-head-callback' => '', 'admin-head-callback' => '', 'admin-preview-callback' => '', 'video' => false, 'video-active-callback' => 'is_front_page'] );
		add_theme_support( 'custom-background', ['default-image' => '', 'default-preset' => 'default', 'default-position-x' => 'left', 'default-position-y' => 'top', 'default-size' => 'auto', 'default-repeat' => 'repeat', 'default-attachment' => 'scroll', 'default-color' => '', 'wp-head-callback' => '_custom_background_cb', 'admin-head-callback' => '', 'admin-preview-callback' => ''] );
		add_theme_support( 'html-5', ['comment-list', 'comment-form', 'search-form', 'gallery', 'caption', 'style', 'script'] );
		add_theme_support( 'title-tag' );
		add_theme_support( 'custom-logo', ['height' => 20, 'width' => 100, 'flex-height' => true, 'flex-width'  => true, 'header-text' => ['site-title', 'site-description']] );
	}
}
new ThemeSetup();