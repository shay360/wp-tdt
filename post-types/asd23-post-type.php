<?php
                
class asd23PostType {

    public function __construct() {
        add_action('init', [$this, 'createasd23CPT'], 0);
    }
    
     public function createasd23CPT() {
        $labels = [
                		'name' => _x( 'asd23', 'Post Type General Name', 'f34ft542rtf' ),
                		'singular_name' => _x( 'asd23', 'Post Type Singular Name', 'f34ft542rtf' ),
                		'menu_name' => _x( '234rfedsa', 'Admin Menu text', 'f34ft542rtf' ),
                		'name_admin_bar' => _x( 'asd23', 'Add New on Toolbar', 'f34ft542rtf' ),
                		'archives' => __( 'asd23 Archives', 'f34ft542rtf' ),
                		'attributes' => __( 'asd23 Attributes', 'f34ft542rtf' ),
                		'parent_item_colon' => __( 'Parent asd23:', 'f34ft542rtf' ),
                		'all_items' => __( 'All 234rfedsa', 'f34ft542rtf' ),
                		'add_new_item' => __( 'Add New asd23', 'f34ft542rtf' ),
                		'add_new' => __( 'Add New', 'f34ft542rtf' ),
                		'new_item' => __( 'New asd23', 'f34ft542rtf' ),
                		'edit_item' => __( 'Edit asd23', 'f34ft542rtf' ),
                		'update_item' => __( 'Update asd23', 'f34ft542rtf' ),
                		'view_item' => __( 'View asd23', 'f34ft542rtf' ),
                		'view_items' => __( 'View 234rfedsa', 'f34ft542rtf' ),
                		'search_items' => __( 'Search asd23', 'f34ft542rtf' ),
                		'not_found' => __( 'Not found', 'f34ft542rtf' ),
                		'not_found_in_trash' => __( 'Not found in Trash', 'f34ft542rtf' ),
                		'featured_image' => __( 'Featured Image', 'f34ft542rtf' ),
                		'set_featured_image' => __( 'Set featured image', 'f34ft542rtf' ),
                		'remove_featured_image' => __( 'Remove featured image', 'f34ft542rtf' ),
                		'use_featured_image' => __( 'Use as featured image', 'f34ft542rtf' ),
                		'insert_into_item' => __( 'Insert into asd23', 'f34ft542rtf' ),
                		'uploaded_to_this_item' => __( 'Uploaded to this asd23', 'f34ft542rtf' ),
                		'items_list' => __( '234rfedsa list', 'f34ft542rtf' ),
                		'items_list_navigation' => __( '234rfedsa list navigation', 'f34ft542rtf' ),
                		'filter_items_list' => __( 'Filter 234rfedsa list', 'f34ft542rtf' ),
                ];
        $args = [
                		'label' => __( 'asd23', 'f34ft542rtf' ),
                		'description' => __( '2vsdfswdewrh', 'f34ft542rtf' ),
                		'labels' => $labels,
                		'menu_icon' => '',
                		'supports' => [title,Featured Image,Comments],
                		'public' => true,
                		'show_ui' => false,
                		'show_in_menu' => true,
                		'menu_position' => 5,
                		'show_in_admin_bar' => false,
                		'show_in_nav_menus' => false,
                		'can_export' => true,
                		'has_archive' => true,
                		'hierarchical' => true,
                		'exclude_from_search' => true,
                		'show_in_rest' => false,
                		'publicly_queryable' => true,
                		'capability_type' => 'post',
                ];
        register_post_type('asd23', $args);
    }
}