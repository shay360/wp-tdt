<?php

class themetextdomain_ThemeSetup {
    public function __construct() {
        add_action('after_setup_theme', [$this, 'setupTheme']);
    }

    function setupTheme() {
        $this->addThemeSupport();
    }

    private function addThemeSupport() {
        add_theme_support('automatic-feed-links');
        add_theme_support('post-formats', ['status', 'quote', 'gallery', 'image', 'video', 'audio', 'link', 'aside', 'chat']);
        add_theme_support('post-thumbnails');
        $background_args = [
            'default-color' => '',
            'default-image' => '',
            'default-repeat' => '',
            'default-position-x' => '',
            'wp-head-callback' => '',
            'admin-head-callback' => '',
            'admin-preview-callback' => ''
        ];
	    /**
	     * @link https://codex.wordpress.org/Theme_Logo
	     */
        add_theme_support('custom-logo', [
            'width' => 50,
            'height' => 150
        ]);
        add_theme_support('custom-background', $background_args);
        add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption']);
        add_theme_support('title-tag');
        add_editor_style();
        load_theme_textdomain('themename', get_template_directory() . '/language');

    }
}

if (class_exists('themetextdomain_ThemeSetup')) $themeSetup = new themetextdomain_ThemeSetup();