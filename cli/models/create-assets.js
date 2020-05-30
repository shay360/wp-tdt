const fs = require('fs');
const colors = require('colors');
const {isImportExists} = require('./file-tools');
const {toCamelCase, pascalCase} = require('./generic-tools');

exports.createCustomPostType = (data) => {
    const customPostTypeData = data;
    fs.readFile('functions.php', function read(err, data) {
        if (err) throw err;
        fs.readFile('./post-types/theme-post-types.php', function read(err, data) {
            if (err) throw err;
            let fileContent = data.toString();
            const cptSingular = customPostTypeData.post_type_singular;
            const cptPlural = customPostTypeData.post_type_plural;
            const cptDescription = customPostTypeData.post_type_description;
            const cptTextDomain = customPostTypeData.post_type_text_domain;
            const classPrefix = pascalCase(toCamelCase(cptSingular));
            let cptSupports = `[`;
            customPostTypeData.supports.forEach(support => {
                cptSupports += `'${support}'`;
            })
            cptSupports += `]`;
            cptSupports = cptSupports.replace(/''/g, '\', \'');
            const fileName = cptSingular + '-post-type.php';
            const cptArgs = `[
                \t\t'label' => __( '${cptSingular}', '${cptTextDomain}' ),
                \t\t'description' => __( '${cptDescription}', '${cptTextDomain}' ),
                \t\t'labels' => $labels,
                \t\t'menu_icon' => '',
                \t\t'supports' => ${cptSupports},
                \t\t'public' => ${customPostTypeData.public},
                \t\t'show_ui' => ${customPostTypeData.show_ui},
                \t\t'show_in_menu' => ${customPostTypeData.show_in_menu},
                \t\t'menu_position' => 5,
                \t\t'show_in_admin_bar' => ${customPostTypeData.show_in_admin_bar},
                \t\t'show_in_nav_menus' => ${customPostTypeData.show_in_nav_menus},
                \t\t'can_export' => ${customPostTypeData.can_export},
                \t\t'has_archive' => ${customPostTypeData.has_archive},
                \t\t'hierarchical' => ${customPostTypeData.hierarchical},
                \t\t'exclude_from_search' => ${customPostTypeData.exclude_from_search},
                \t\t'show_in_rest' => ${customPostTypeData.show_in_rest},
                \t\t'publicly_queryable' => ${customPostTypeData.publicly_queryable},
                \t\t'capability_type' => 'post',
                ]`;
            const labels = `[
                \t\t'name' => _x( '${cptSingular}', 'Post Type General Name', '${cptTextDomain}' ),
                \t\t'singular_name' => _x( '${cptSingular}', 'Post Type Singular Name', '${cptTextDomain}' ),
                \t\t'menu_name' => _x( '${cptPlural}', 'Admin Menu text', '${cptTextDomain}' ),
                \t\t'name_admin_bar' => _x( '${cptSingular}', 'Add New on Toolbar', '${cptTextDomain}' ),
                \t\t'archives' => __( '${cptSingular} Archives', '${cptTextDomain}' ),
                \t\t'attributes' => __( '${cptSingular} Attributes', '${cptTextDomain}' ),
                \t\t'parent_item_colon' => __( 'Parent ${cptSingular}:', '${cptTextDomain}' ),
                \t\t'all_items' => __( 'All ${cptPlural}', '${cptTextDomain}' ),
                \t\t'add_new_item' => __( 'Add New ${cptSingular}', '${cptTextDomain}' ),
                \t\t'add_new' => __( 'Add New', '${cptTextDomain}' ),
                \t\t'new_item' => __( 'New ${cptSingular}', '${cptTextDomain}' ),
                \t\t'edit_item' => __( 'Edit ${cptSingular}', '${cptTextDomain}' ),
                \t\t'update_item' => __( 'Update ${cptSingular}', '${cptTextDomain}' ),
                \t\t'view_item' => __( 'View ${cptSingular}', '${cptTextDomain}' ),
                \t\t'view_items' => __( 'View ${cptPlural}', '${cptTextDomain}' ),
                \t\t'search_items' => __( 'Search ${cptSingular}', '${cptTextDomain}' ),
                \t\t'not_found' => __( 'Not found', '${cptTextDomain}' ),
                \t\t'not_found_in_trash' => __( 'Not found in Trash', '${cptTextDomain}' ),
                \t\t'featured_image' => __( 'Featured Image', '${cptTextDomain}' ),
                \t\t'set_featured_image' => __( 'Set featured image', '${cptTextDomain}' ),
                \t\t'remove_featured_image' => __( 'Remove featured image', '${cptTextDomain}' ),
                \t\t'use_featured_image' => __( 'Use as featured image', '${cptTextDomain}' ),
                \t\t'insert_into_item' => __( 'Insert into ${cptSingular}', '${cptTextDomain}' ),
                \t\t'uploaded_to_this_item' => __( 'Uploaded to this ${cptSingular}', '${cptTextDomain}' ),
                \t\t'items_list' => __( '${cptPlural} list', '${cptTextDomain}' ),
                \t\t'items_list_navigation' => __( '${cptPlural} list navigation', '${cptTextDomain}' ),
                \t\t'filter_items_list' => __( 'Filter ${cptPlural} list', '${cptTextDomain}' ),
                ]`;
            const cptClassContent = `<?php
                
class ${classPrefix}PostType {

    public function __construct() {
        add_action('init', [$this, 'create${classPrefix}CPT'], 0);
    }
    
     public function create${classPrefix}CPT() {
        $labels = ${labels};
        $args = ${cptArgs};
        register_post_type('${cptSingular}', $args);
    }
}
new ${classPrefix}PostType();`;

            fs.writeFile(`post-types/${fileName}`,
                cptClassContent
                , function (err) {
                    if (err) throw err;

                    if (!isImportExists(fileContent, `require_once __DIR__ . '/${fileName}';`)) {
                        fs.appendFile('./post-types/theme-post-types.php', `\nrequire_once __DIR__ . '/${fileName}';`, (err) => {
                            if (err) throw err;
                            console.log('theme-post-types.php updated successfully'.green);
                        });
                    }
                    console.log(`${fileName} generated`.green);


                });
        });
    });
};

exports.createSinglePage = (data) => {
    const filename = data.post_type;
    fs.writeFile(`single-${filename}.php`,
        `<?php get_header(); ?>
<?php get_template_part( 'template-parts/get', 'post' ); ?>
<?php get_footer(); ?>`
        , function (err) {
            if (err) throw err;
            console.log(`single-${filename}.php generated`.green);
        });
};

exports.createArchivePage = (data) => {
    const filename = data.post_type;
    fs.writeFile(`archive-${filename}.php`,
        `<?php get_header(); ?>
<?php get_template_part( 'template-parts/get', 'posts' ); ?>
<?php get_footer(); ?>`
        , function (err) {
            if (err) throw err;
            console.log(`archive-${filename}.php generated`.green);
        });
};

exports.createThemeWidget = (data) => {
    const widgetData = data;
    fs.readFile('functions.php', function read(err, data) {
        if (err) throw err;
        fs.readFile('./classes/widgets/theme-widgets.php', function read(err, data) {
            if (err) throw err;
            let fileContent = data.toString();
            let className = widgetData.widget_title;
            className = toCamelCase(className);
            className = pascalCase(className);

            const widgetClassContent = `<?php
class ${className}_Widget extends WP_Widget {

    function __construct() {
        parent::__construct(
            '${className}_widget',
            esc_html__( '${widgetData.widget_title}', '${widgetData.widget_text_domain}' ),
            array( 'description' => esc_html__( '${widgetData.widget_description}', '${widgetData.widget_text_domain}' ), ) // Args
        );
    }

    private $widget_fields = array(
    );

    public function widget( $args, $instance ) {
        echo $args['before_widget'];

        if ( ! empty( $instance['title'] ) ) {
            echo $args['before_title'] . apply_filters( 'widget_title', $instance['title'] ) . $args['after_title'];
        }

        // Output generated fields

        echo $args['after_widget'];
    }

    public function field_generator( $instance ) {
        $output = '';
        foreach ( $this->widget_fields as $widget_field ) {
            $default = '';
            if ( isset($widget_field['default']) ) {
                $default = $widget_field['default'];
            }
            $widget_value = ! empty( $instance[$widget_field['id']] ) ? $instance[$widget_field['id']] : esc_html__( $default, 'wdgtxt' );
            switch ( $widget_field['type'] ) {
                default:
                    $output .= '<p>';
                    $output .= '<label for="'.esc_attr( $this->get_field_id( $widget_field['id'] ) ).'">'.esc_attr( $widget_field['label'], 'wdgtxt' ).':</label> ';
                    $output .= '<input class="widefat" id="'.esc_attr( $this->get_field_id( $widget_field['id'] ) ).'" name="'.esc_attr( $this->get_field_name( $widget_field['id'] ) ).'" type="'.$widget_field['type'].'" value="'.esc_attr( $widget_value ).'">';
                    $output .= '</p>';
            }
        }
        echo $output;
    }

    public function form( $instance ) {
        $title = ! empty( $instance['title'] ) ? $instance['title'] : esc_html__( '', 'wdgtxt' );
        ?>
        <p>
            <label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"><?php esc_attr_e( 'Title:', 'wdgtxt' ); ?></label>
            <input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>">
        </p>
        <?php
        $this->field_generator( $instance );
    }

    public function update( $new_instance, $old_instance ) {
        $instance = array();
        $instance['title'] = ( ! empty( $new_instance['title'] ) ) ? strip_tags( $new_instance['title'] ) : '';
        foreach ( $this->widget_fields as $widget_field ) {
            switch ( $widget_field['type'] ) {
                default:
                    $instance[$widget_field['id']] = ( ! empty( $new_instance[$widget_field['id']] ) ) ? strip_tags( $new_instance[$widget_field['id']] ) : '';
            }
        }
        return $instance;
    }
}

function register_${className}_widget() {
    register_widget( '${className}_Widget' );
}
add_action( 'widgets_init', 'register_${className}_widget' );`;


            fs.writeFile(`classes/widgets/${className}.php`,
                widgetClassContent
                , function (err) {
                    if (err) throw err;

                    if (!isImportExists(fileContent, `require_once __DIR__ . '/${className}.php';`)) {
                        fs.appendFile('./classes/widgets/theme-widgets.php', `\nrequire_once __DIR__ . '/${className}.php';`, (err) => {
                            if (err) throw err;
                            console.log('theme-widgets.php updated successfully'.green);
                        });
                    }
                    console.log(`${className} generated`.green);
                });
        });
    });
};