<?php
                
class ArticlePostType {

    public function __construct() {
        add_action('init', [$this, 'createarticleCPT'], 0);
    }
    
     public function createArticleCPT() {
        $labels = [
                		'name' => _x( 'article', 'Post Type General Name', 'tdt' ),
                		'singular_name' => _x( 'article', 'Post Type Singular Name', 'tdt' ),
                		'menu_name' => _x( 'articles', 'Admin Menu text', 'tdt' ),
                		'name_admin_bar' => _x( 'article', 'Add New on Toolbar', 'tdt' ),
                		'archives' => __( 'article Archives', 'tdt' ),
                		'attributes' => __( 'article Attributes', 'tdt' ),
                		'parent_item_colon' => __( 'Parent article:', 'tdt' ),
                		'all_items' => __( 'All articles', 'tdt' ),
                		'add_new_item' => __( 'Add New article', 'tdt' ),
                		'add_new' => __( 'Add New', 'tdt' ),
                		'new_item' => __( 'New article', 'tdt' ),
                		'edit_item' => __( 'Edit article', 'tdt' ),
                		'update_item' => __( 'Update article', 'tdt' ),
                		'view_item' => __( 'View article', 'tdt' ),
                		'view_items' => __( 'View articles', 'tdt' ),
                		'search_items' => __( 'Search article', 'tdt' ),
                		'not_found' => __( 'Not found', 'tdt' ),
                		'not_found_in_trash' => __( 'Not found in Trash', 'tdt' ),
                		'featured_image' => __( 'Featured Image', 'tdt' ),
                		'set_featured_image' => __( 'Set featured image', 'tdt' ),
                		'remove_featured_image' => __( 'Remove featured image', 'tdt' ),
                		'use_featured_image' => __( 'Use as featured image', 'tdt' ),
                		'insert_into_item' => __( 'Insert into article', 'tdt' ),
                		'uploaded_to_this_item' => __( 'Uploaded to this article', 'tdt' ),
                		'items_list' => __( 'articles list', 'tdt' ),
                		'items_list_navigation' => __( 'articles list navigation', 'tdt' ),
                		'filter_items_list' => __( 'Filter articles list', 'tdt' ),
                ];
        $args = [
                		'label' => __( 'article', 'tdt' ),
                		'description' => __( 'post type article', 'tdt' ),
                		'labels' => $labels,
                		'menu_icon' => '',
                		'supports' => ['title', 'editor', 'comments', 'thumbnail', 'author', 'post-formats', 'custom-fields'],
                		'public' => true,
                		'show_ui' => true,
                		'show_in_menu' => true,
                		'menu_position' => 5,
                		'show_in_admin_bar' => true,
                		'show_in_nav_menus' => true,
                		'can_export' => false,
                		'has_archive' => true,
                		'hierarchical' => true,
                		'exclude_from_search' => false,
                		'show_in_rest' => true,
                		'publicly_queryable' => true,
                		'capability_type' => 'post',
                ];
        register_post_type('article', $args);
    }
}
new ArticlePostType();