<?php
                
class asdPostType {

    public function __construct() {
        add_action('init', [$this, 'createasdCPT'], 0);
    }
    
     public function createasdCPT() {
        $labels = [
                		'name' => _x( 'asd', 'Post Type General Name', 'as' ),
                		'singular_name' => _x( 'asd', 'Post Type Singular Name', 'as' ),
                		'menu_name' => _x( 'asd', 'Admin Menu text', 'as' ),
                		'name_admin_bar' => _x( 'asd', 'Add New on Toolbar', 'as' ),
                		'archives' => __( 'asd Archives', 'as' ),
                		'attributes' => __( 'asd Attributes', 'as' ),
                		'parent_item_colon' => __( 'Parent asd:', 'as' ),
                		'all_items' => __( 'All asd', 'as' ),
                		'add_new_item' => __( 'Add New asd', 'as' ),
                		'add_new' => __( 'Add New', 'as' ),
                		'new_item' => __( 'New asd', 'as' ),
                		'edit_item' => __( 'Edit asd', 'as' ),
                		'update_item' => __( 'Update asd', 'as' ),
                		'view_item' => __( 'View asd', 'as' ),
                		'view_items' => __( 'View asd', 'as' ),
                		'search_items' => __( 'Search asd', 'as' ),
                		'not_found' => __( 'Not found', 'as' ),
                		'not_found_in_trash' => __( 'Not found in Trash', 'as' ),
                		'featured_image' => __( 'Featured Image', 'as' ),
                		'set_featured_image' => __( 'Set featured image', 'as' ),
                		'remove_featured_image' => __( 'Remove featured image', 'as' ),
                		'use_featured_image' => __( 'Use as featured image', 'as' ),
                		'insert_into_item' => __( 'Insert into asd', 'as' ),
                		'uploaded_to_this_item' => __( 'Uploaded to this asd', 'as' ),
                		'items_list' => __( 'asd list', 'as' ),
                		'items_list_navigation' => __( 'asd list navigation', 'as' ),
                		'filter_items_list' => __( 'Filter asd list', 'as' ),
                ];
        $args = [
                		'label' => __( 'asd', 'as' ),
                		'description' => __( 'asd', 'as' ),
                		'labels' => $labels,
                		'menu_icon' => '',
                		'supports' => [title,Excerpt,Revisions],
                		'public' => true,
                		'show_ui' => true,
                		'show_in_menu' => true,
                		'menu_position' => 5,
                		'show_in_admin_bar' => true,
                		'show_in_nav_menus' => true,
                		'can_export' => true,
                		'has_archive' => true,
                		'hierarchical' => true,
                		'exclude_from_search' => true,
                		'show_in_rest' => true,
                		'publicly_queryable' => true,
                		'capability_type' => 'post',
                ];
        register_post_type('asd', $args);
    }
}