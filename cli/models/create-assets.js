const fs = require('fs');
const colors = require('colors');

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
                
class ${cptSingular}PostType {

    public function __construct() {
        add_action('init', [$this, 'create${cptSingular}CPT'], 0);
    }
    
     public function create${cptSingular}CPT() {
        $labels = ${labels};
        $args = ${cptArgs};
        register_post_type('${cptSingular}', $args);
    }
}
new ${cptSingular}PostType();`;

            fs.writeFile(`post-types/${fileName}`,
                cptClassContent
                , function (err) {
                    if (err) throw err;
                    fs.appendFile('./post-types/theme-post-types.php', `\nrequire_once __DIR__ . '/${fileName}';`, (err) => {
                        if (err) throw err;
                        console.log('theme-post-types.php updated successfully'.green);
                    });
                    console.log(`${fileName} generated`.green);
                });
        });
    });

}