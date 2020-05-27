<?php
                
class articlePostType {

    public function __construct() {
        add_action('init', [$this, 'createarticleCPT'], 0);
    }
    
     public function createarticleCPT() {
        $labels = [
                		'name' => _x( 'article', 'Post Type General Name', 'tst' ),
                		'singular_name' => _x( 'article', 'Post Type Singular Name', 'tst' ),
                		'menu_name' => _x( 'articles', 'Admin Menu text', 'tst' ),
                		'name_admin_bar' => _x( 'article', 'Add New on Toolbar', 'tst' ),
                		'archives' => __( 'article Archives', 'tst' ),
                		'attributes' => __( 'article Attributes', 'tst' ),
                		'parent_item_colon' => __( 'Parent article:', 'tst' ),
                		'all_items' => __( 'All articles', 'tst' ),
                		'add_new_item' => __( 'Add New article', 'tst' ),
                		'add_new' => __( 'Add New', 'tst' ),
                		'new_item' => __( 'New article', 'tst' ),
                		'edit_item' => __( 'Edit article', 'tst' ),
                		'update_item' => __( 'Update article', 'tst' ),
                		'view_item' => __( 'View article', 'tst' ),
                		'view_items' => __( 'View articles', 'tst' ),
                		'search_items' => __( 'Search article', 'tst' ),
                		'not_found' => __( 'Not found', 'tst' ),
                		'not_found_in_trash' => __( 'Not found in Trash', 'tst' ),
                		'featured_image' => __( 'Featured Image', 'tst' ),
                		'set_featured_image' => __( 'Set featured image', 'tst' ),
                		'remove_featured_image' => __( 'Remove featured image', 'tst' ),
                		'use_featured_image' => __( 'Use as featured image', 'tst' ),
                		'insert_into_item' => __( 'Insert into article', 'tst' ),
                		'uploaded_to_this_item' => __( 'Uploaded to this article', 'tst' ),
                		'items_list' => __( 'articles list', 'tst' ),
                		'items_list_navigation' => __( 'articles list navigation', 'tst' ),
                		'filter_items_list' => __( 'Filter articles list', 'tst' ),
                ];
        $args = [
                		'label' => __( 'article', 'tst' ),
                		'description' => __( 'post type articles', 'tst' ),
                		'labels' => $labels,
                		'menu_icon' => '',
                		'supports' => [
                
                ],
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
new articlePostType();