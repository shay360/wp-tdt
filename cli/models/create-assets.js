const fs = require("fs");
const { Write } = require("./Write");
const { isImportExists } = require("./file-tools");
const { toCamelCase, pascalCase, properCase } = require("./generic-tools");

exports.createTaxonomy = (data) => {
  const taxonomyData = data;
  fs.readFile("./taxonomies/theme-taxonomies.php", function read(err, data) {
    if (err) throw err;
    Write.infoln(taxonomyData);
    let fileContent = data.toString();
    const className = pascalCase(
      toCamelCase(taxonomyData.taxonomy_single_name)
    );
    const postTypes = taxonomyData.taxonomy_for_post_types.split(",");
    let taxPostTypes = `[`;
    postTypes.forEach((post) => {
      taxPostTypes += `'${post}'`;
    });
    taxPostTypes += `]`;
    taxPostTypes = taxPostTypes.replace(/''/g, "', '");

    const taxClass = `<?php

class   ${className}Taxonomy {
    public function __construct() {
        add_action('init', [$this, 'create${className}']);
    }

    function create${className}() {

        $labels = [
            'name' => _x('${properCase(
              taxonomyData.taxonomy_plural_name.replace("-", " ")
            )}', 'taxonomy general name', '${
      taxonomyData.taxonomy_text_domain
    }'),
            'singular_name' => _x('${properCase(
              taxonomyData.taxonomy_single_name.replace("-", " ")
            )}', 'taxonomy singular name', '${
      taxonomyData.taxonomy_text_domain
    }'),
            'search_items' => __('Search ${properCase(
              taxonomyData.taxonomy_plural_name.replace("-", " ")
            )}', '${taxonomyData.taxonomy_text_domain}'),
            'all_items' => __('All ${properCase(
              taxonomyData.taxonomy_plural_name.replace("-", " ")
            )}', '${taxonomyData.taxonomy_text_domain}'),
            'parent_item' => __('Parent ${properCase(
              taxonomyData.taxonomy_single_name.replace("-", " ")
            )}', '${taxonomyData.taxonomy_text_domain}'),
            'parent_item_colon' => __('Parent ${properCase(
              taxonomyData.taxonomy_single_name.replace("-", " ")
            )}:', '${taxonomyData.taxonomy_text_domain}'),
            'edit_item' => __('Edit ${properCase(
              taxonomyData.taxonomy_single_name.replace("-", " ")
            )}', '${taxonomyData.taxonomy_text_domain}'),
            'update_item' => __('Update ${properCase(
              taxonomyData.taxonomy_single_name.replace("-", " ")
            )}', '${taxonomyData.taxonomy_text_domain}'),
            'add_new_item' => __('Add New ${properCase(
              taxonomyData.taxonomy_single_name.replace("-", " ")
            )}', '${taxonomyData.taxonomy_text_domain}'),
            'new_item_name' => __('New ${properCase(
              taxonomyData.taxonomy_single_name.replace("-", " ")
            )} Name', '${taxonomyData.taxonomy_text_domain}'),
            'menu_name' => __('${properCase(
              taxonomyData.taxonomy_single_name.replace("-", " ")
            )}', '${taxonomyData.taxonomy_text_domain}'),
        ];

        $args = [
            'labels' => $labels,
            'description' => __('${taxonomyData.taxonomy_description}', '${
      taxonomyData.taxonomy_text_domain
    }'),
            'hierarchical' => ${taxonomyData.taxonomy_is_hierarchical},
            'public' => ${taxonomyData.taxonomy_is_public},
            'publicly_queryable' => ${
              taxonomyData.taxonomy_is_publicly_queryable
            },
            'show_ui' => ${taxonomyData.taxonomy_show_in_ui},
            'show_in_menu' => ${taxonomyData.taxonomy_show_in_menu},
            'show_in_nav_menus' => ${taxonomyData.taxonomy_show_in_nav_menus},
            'show_tagcloud' => ${taxonomyData.taxonomy_show_in_tag_cloud},
            'show_in_quick_edit' => ${taxonomyData.taxonomy_show_in_quick_edit},
            'show_admin_column' => ${
              taxonomyData.taxonomy_show_in_admin_column
            },
            'show_in_rest' => ${taxonomyData.taxonomy_show_in_rest},
        ];
        register_taxonomy('taxonomy', ${taxPostTypes}, $args);

    }
}

new ${className}Taxonomy();`;

    fs.writeFile(
      `taxonomies/${className}Taxonomy.php`,
      taxClass,
      function (err) {
        if (err) throw err;

        if (
          !isImportExists(
            fileContent,
            `require_once __DIR__ . '/${className}Taxonomy.php';`
          )
        ) {
          fs.appendFile(
            "./taxonomies/theme-taxonomies.php",
            `\nrequire_once __DIR__ . '/${className}Taxonomy.php';`,
            (err) => {
              if (err) throw err;
              Write.successln(`theme-taxonomies.php updated successfully`);
            }
          );
        }
        Write.infoln(`${className}Taxonomy.php generated`);
      }
    );
  });
};

exports.createSettingsPage = (data) => {
  const className = pascalCase(toCamelCase(data.settings_page_menu_title));
  const fileName = data.settings_page_menu_title
    .toLowerCase()
    .replace(/ /g, "-");
  fs.readFile(
    "./classes/settings-pages/theme-settings-pages.php",
    function read(err, importerData) {
      if (err) throw err;
      let fileContent = importerData.toString();
      const settingsPageContent = `<?php
    
class ${className}_SettingsPage {

    public function __construct() {
        add_action('admin_menu', [$this, 'tdt_create_settings']);
        add_action('admin_init', [$this, 'tdt_setup_sections']);
        add_action('admin_init', [$this, 'tdt_setup_fields']);
    }

    public function tdt_create_settings() {
        $page_title = '${properCase(data.settings_page_menu_title)}';
        $menu_title = '${properCase(data.settings_page_menu_title)}';
        $capability = 'manage_options';
        $slug = '${fileName}';
        $callback = [$this, '${toCamelCase(data.settings_page_title)}'];
        $icon = 'dashicons-admin-settings';
        $position = 2;
        add_menu_page($page_title, $menu_title, $capability, $slug, $callback, $icon, $position);
    }

    public function ${toCamelCase(data.settings_page_title)}() { ?>
        <div class="wrap">
            <h1>${properCase(data.settings_page_menu_title)}</h1>
            <?php settings_errors(); ?>
            <form method="POST" action="options.php">
                <?php
                settings_fields('${fileName}-settings');
                do_settings_sections('${fileName}-settings');
                submit_button();
                ?>
            </form>
        </div> <?php
    }

    public function tdt_setup_sections() {
        add_settings_section('${fileName}_section', '${
        data.settings_page_description
      }', [], '${fileName}-settings');
    }

    public function tdt_setup_fields() {
        $fields = [];
    }

    public function tdt_field_callback($field) {
    }
}

new ${className}_SettingsPage();`;

      fs.writeFile(
        `classes/settings-pages/${fileName}-settings-page.php`,
        settingsPageContent,
        function (err) {
          if (err) throw err;
          Write.successln(`${fileName}-settings-page.php created successfully`);
          if (
            !isImportExists(
              fileContent,
              `require_once __DIR__ . '/${fileName}-settings-page.php';`
            )
          ) {
            fs.appendFile(
              "./classes/settings-pages/theme-settings-pages.php",
              `\nrequire_once __DIR__ . '/${fileName}-settings-page.php';`,
              (err) => {
                if (err) throw err;
                Write.successln(
                  "theme-settings-pages.php updated successfully"
                );
              }
            );
          }
          Write.infoln(`${fileName} generated`);
        }
      );
    }
  );
};

exports.createCustomPostType = (data) => {
  const customPostTypeData = data;
  fs.readFile("./post-types/theme-post-types.php", function read(err, data) {
    if (err) throw err;
    let fileContent = data.toString();
    const cptSingular = customPostTypeData.post_type_singular;
    const cptPlural = customPostTypeData.post_type_plural;
    const cptDescription = customPostTypeData.post_type_description;
    const cptTextDomain = customPostTypeData.post_type_text_domain;
    const classPrefix = pascalCase(toCamelCase(cptSingular));
    let cptSupports = `[`;
    customPostTypeData.supports.forEach((support) => {
      cptSupports += `'${support}'`;
    });
    cptSupports += `]`;
    cptSupports = cptSupports.replace(/''/g, "', '");
    const fileName = cptSingular + "-post-type.php";
    const cptArgs = `[
                \t\t'label' => __( '${properCase(
                  cptSingular.replace("-", " ")
                )}', '${cptTextDomain}' ),
                \t\t'description' => __( '${cptDescription}', '${cptTextDomain}' ),
                \t\t'labels' => $labels,
                \t\t'menu_icon' => '',
                \t\t'supports' => ${cptSupports},
                \t\t'public' => ${customPostTypeData.public},
                \t\t'show_ui' => ${customPostTypeData.show_ui},
                \t\t'show_in_menu' => ${customPostTypeData.show_in_menu},
                \t\t'menu_position' => 5,
                \t\t'show_in_admin_bar' => ${
                  customPostTypeData.show_in_admin_bar
                },
                \t\t'show_in_nav_menus' => ${
                  customPostTypeData.show_in_nav_menus
                },
                \t\t'can_export' => ${customPostTypeData.can_export},
                \t\t'has_archive' => ${customPostTypeData.has_archive},
                \t\t'hierarchical' => ${customPostTypeData.hierarchical},
                \t\t'exclude_from_search' => ${
                  customPostTypeData.exclude_from_search
                },
                \t\t'show_in_rest' => ${customPostTypeData.show_in_rest},
                \t\t'publicly_queryable' => ${
                  customPostTypeData.publicly_queryable
                },
                \t\t'capability_type' => 'post',
                ]`;
    const labels = `[
                \t\t'name' => _x( '${properCase(
                  cptSingular.replace("-", " ")
                )}', 'Post Type General Name', '${cptTextDomain}' ),
                \t\t'singular_name' => _x( '${properCase(
                  cptSingular.replace("-", " ")
                )}', 'Post Type Singular Name', '${cptTextDomain}' ),
                \t\t'menu_name' => _x( '${properCase(
                  cptPlural.replace("-", " ")
                )}', 'Admin Menu text', '${cptTextDomain}' ),
                \t\t'name_admin_bar' => _x( '${properCase(
                  cptSingular.replace("-", " ")
                )}', 'Add New on Toolbar', '${cptTextDomain}' ),
                \t\t'archives' => __( '${properCase(
                  cptSingular.replace("-", " ")
                )} Archives', '${cptTextDomain}' ),
                \t\t'attributes' => __( '${properCase(
                  cptSingular.replace("-", " ")
                )} Attributes', '${cptTextDomain}' ),
                \t\t'parent_item_colon' => __( 'Parent ${properCase(
                  cptSingular.replace("-", " ")
                )}:', '${cptTextDomain}' ),
                \t\t'all_items' => __( 'All ${properCase(
                  cptPlural.replace("-", " ")
                )}', '${cptTextDomain}' ),
                \t\t'add_new_item' => __( 'Add New ${properCase(
                  cptSingular.replace("-", " ")
                )}', '${cptTextDomain}' ),
                \t\t'add_new' => __( 'Add New', '${cptTextDomain}' ),
                \t\t'new_item' => __( 'New ${properCase(
                  cptSingular.replace("-", " ")
                )}', '${cptTextDomain}' ),
                \t\t'edit_item' => __( 'Edit ${properCase(
                  cptSingular.replace("-", " ")
                )}', '${cptTextDomain}' ),
                \t\t'update_item' => __( 'Update ${properCase(
                  cptSingular.replace("-", " ")
                )}', '${cptTextDomain}' ),
                \t\t'view_item' => __( 'View ${properCase(
                  cptSingular.replace("-", " ")
                )}', '${cptTextDomain}' ),
                \t\t'view_items' => __( 'View ${properCase(
                  cptPlural.replace("-", " ")
                )}', '${cptTextDomain}' ),
                \t\t'search_items' => __( 'Search ${properCase(
                  cptSingular.replace("-", " ")
                )}', '${cptTextDomain}' ),
                \t\t'not_found' => __( 'Not found', '${cptTextDomain}' ),
                \t\t'not_found_in_trash' => __( 'Not found in Trash', '${cptTextDomain}' ),
                \t\t'featured_image' => __( 'Featured Image', '${cptTextDomain}' ),
                \t\t'set_featured_image' => __( 'Set featured image', '${cptTextDomain}' ),
                \t\t'remove_featured_image' => __( 'Remove featured image', '${cptTextDomain}' ),
                \t\t'use_featured_image' => __( 'Use as featured image', '${cptTextDomain}' ),
                \t\t'insert_into_item' => __( 'Insert into ${properCase(
                  cptSingular.replace("-", " ")
                )}', '${cptTextDomain}' ),
                \t\t'uploaded_to_this_item' => __( 'Uploaded to this ${properCase(
                  cptSingular.replace("-", " ")
                )}', '${cptTextDomain}' ),
                \t\t'items_list' => __( '${properCase(
                  cptPlural.replace("-", " ")
                )} list', '${cptTextDomain}' ),
                \t\t'items_list_navigation' => __( '${properCase(
                  cptPlural.replace("-", " ")
                )} list navigation', '${cptTextDomain}' ),
                \t\t'filter_items_list' => __( 'Filter ${properCase(
                  cptPlural.replace("-", " ")
                )} list', '${cptTextDomain}' ),
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

    fs.writeFile(`post-types/${fileName}`, cptClassContent, function (err) {
      if (err) throw err;

      if (
        !isImportExists(fileContent, `require_once __DIR__ . '/${fileName}';`)
      ) {
        fs.appendFile(
          "./post-types/theme-post-types.php",
          `\nrequire_once __DIR__ . '/${fileName}';`,
          (err) => {
            if (err) throw err;
            Write.successln("theme-post-types.php updated successfully");
          }
        );
      }
      Write.infoln(`${fileName} generated`);
    });
  });
};

exports.createSidebar = (data) => {
  let fileName = data.sidebar_name;
  fileName = properCase(fileName).replace(/ /g, "");
  fs.writeFile(
    `classes/sidebars/${fileName}.php`,
    `<?php

class ${fileName} {
    public function __construct() {
        add_action('widgets_init', [$this, 'generate${fileName}']);
    }

    function generate${fileName}() {

        register_sidebar([
            'name' => '${properCase(data.sidebar_name)}',
            'id' => '${data.sidebar_id}',
            'before_widget' => '<div class="sidebar">',
            'after_widget' => '</div>',
            'before_title' => '',
            'after_title' => '',
        ]);

    }
}

new ${fileName}();`,
    function (err) {
      if (err) throw err;
      Write.infoln(`${fileName}.php generated`);

      fs.readFile(
        "./classes/sidebars/theme-sidebars.php",
        function read(err, data) {
          if (err) throw err;
          let fileContent = data.toString();
          let className = fileName;
          if (
            !isImportExists(
              fileContent,
              `require_once __DIR__ . '/${className}.php';`
            )
          ) {
            fs.appendFile(
              "./classes/sidebars/theme-sidebars.php",
              `\nrequire_once __DIR__ . '/${className}.php';`,
              (err) => {
                if (err) throw err;
                Write.successln("theme-sidebars.php updated successfully");
              }
            );
          }
          Write.infoln(`${className} generated`);
        }
      );
    }
  );
};

exports.createSinglePage = (data) => {
  const filename = data.post_type;
  fs.writeFile(
    `single-${filename}.php`,
    `<?php get_header(); ?>
<?php get_template_part( 'template-parts/get', 'post' ); ?>
<?php get_footer(); ?>`,
    function (err) {
      if (err) throw err;
      Write.infoln(`single-${filename}.php generated`);
    }
  );
};

exports.createDashboardWidget = (data) => {
  const widgetTitle = properCase(data.dashboard_widget_name);
  const widgetID = data.dashboard_widget_name.toLowerCase().replace(/ /g, "-");
  const widgetClassName = widgetTitle.replace(/ /g, "") + "DashboardWidget";
  fs.writeFile(
    `./classes/dashboard-widgets/${widgetClassName}.php`,
    `<?php

class ${widgetClassName} {
    public function __construct() {
        add_action('wp_dashboard_setup', [$this, 'add${widgetClassName}']);

    }

    function add${widgetClassName}() {
        wp_add_dashboard_widget(
            '${widgetID}',
            '${widgetTitle}',
            [$this, 'generateDashboardContent']
        );
    }

    function generateDashboardContent() {
        echo "Place Your Widget Code";
    }
}

new ${widgetClassName}();`,
    function (err) {
      if (err) throw err;
      Write.infoln(`${widgetClassName}.php generated`);
      fs.readFile(
        "./classes/dashboard-widgets/theme-dashboard-widgets.php",
        function read(err, data) {
          if (err) throw err;
          let fileContent = data.toString();
          if (
            !isImportExists(
              fileContent,
              `require_once __DIR__ . '/${widgetClassName}.php';`
            )
          ) {
            fs.appendFile(
              "./classes/dashboard-widgets/theme-dashboard-widgets.php",
              `\nrequire_once __DIR__ . '/${widgetClassName}.php';`,
              (err) => {
                if (err) throw err;
                Write.successln(
                  "theme-dashboard-widgets.php updated successfully"
                );
              }
            );
          }
        }
      );
    }
  );
};

exports.createArchivePage = (data) => {
  const filename = data.post_type;
  fs.writeFile(
    `archive-${filename}.php`,
    `<?php get_header(); ?>
<?php get_template_part( 'template-parts/get', 'posts' ); ?>
<?php get_footer(); ?>`,
    function (err) {
      if (err) throw err;
      Write.infoln(`archive-${filename}.php generated`);
    }
  );
};

exports.createThemeWidget = (data) => {
  const widgetData = data;
  fs.readFile("functions.php", function read(err, data) {
    if (err) throw err;
    fs.readFile(
      "./classes/widgets/theme-widgets.php",
      function read(err, data) {
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
            [ 'description' => esc_html__( '${widgetData.widget_description}', '${widgetData.widget_text_domain}' ), ] // Args
        );
    }

    private $widget_fields = [];

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
        $instance = [];
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

        fs.writeFile(
          `classes/widgets/${className}.php`,
          widgetClassContent,
          function (err) {
            if (err) throw err;

            if (
              !isImportExists(
                fileContent,
                `require_once __DIR__ . '/${className}.php';`
              )
            ) {
              fs.appendFile(
                "./classes/widgets/theme-widgets.php",
                `\nrequire_once __DIR__ . '/${className}.php';`,
                (err) => {
                  if (err) throw err;
                  Write.successln("theme-widgets.php updated successfully");
                }
              );
            }
            Write.infoln(`${className} generated`);
          }
        );
      }
    );
  });
};
