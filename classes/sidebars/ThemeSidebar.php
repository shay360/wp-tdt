<?php

class ThemeSidebars {
    public function __construct() {
        add_action('widgets_init', [$this, 'generateMainSidebar']);
    }

    function generateMainSidebar() {

        register_sidebar(array(
            'name' => 'Main sidebar {id: main-sidebar}',
            'id' => 'main-sidebar',
            'before_widget' => '<div class="sidebar">',
            'after_widget' => '</div>',
            'before_title' => '',
            'after_title' => '',
        ));

    }
}

new ThemeSidebars();