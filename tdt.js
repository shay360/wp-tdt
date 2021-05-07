#! /usr/bin/env node
// ###run npm link to activate cli###
const commander = require('commander');
const program = new commander.Command();
const inquirer = require('inquirer');
const { Write } = require('./cli/models/Write');
const {
    createCustomPostType,
    createThemeWidget,
    createArchivePage,
    createSinglePage,
    createSidebar,
    createDashboardWidget,
    createTaxonomy,
} = require('./cli/models/create-assets');
const {
    createNewConfigFileWithThemeHeadersOnly,
    setNewThemeSupportSectionInConfigurationFile,
    generateThemeBasicFiles,
} = require('./cli/models/init-file');
const { generateTemplateFile } = require('./cli/models/generate-files');

program.version('0.0.1').description('Wordpress Theme Developer Tools cli');

program
    .command('init')
    .description('Set new theme headers for configuration file')
    .action(() => {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'theme_name',
                    message: 'What is your theme name?',
                },
                {
                    type: 'input',
                    name: 'theme_uri',
                    message: 'What is your theme URI?',
                },
                {
                    type: 'input',
                    name: 'theme_description',
                    message: 'What is your theme description?',
                },
                {
                    type: 'input',
                    name: 'theme_author',
                    message: 'What is the name of theme author?',
                },
                {
                    type: 'input',
                    name: 'theme_author_uri',
                    message: 'What is the theme author URI?',
                },
                {
                    type: 'input',
                    name: 'theme_tags',
                    message: 'What are the theme tags',
                },
                {
                    type: 'input',
                    name: 'theme_text_domain',
                    message:
                        'Please set text domain for the theme (will be used for translations)',
                },
            ])
            .then((answers) => {
                createNewConfigFileWithThemeHeadersOnly(answers);
            });
    });

program
    .command('support')
    .description('Set new theme support')
    .action(() => {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'automatic-feed-links',
                    message: 'automatic-feed-links',
                    choices: ['true', 'false'],
                },
                {
                    type: 'list',
                    name: 'post-formats',
                    message: 'post-formats',
                    choices: ['true', 'false'],
                },
                {
                    type: 'list',
                    name: 'post-thumbnails',
                    message: 'post-thumbnails',
                    choices: ['true', 'false'],
                },
                {
                    type: 'list',
                    name: 'custom-header',
                    message: 'custom-header',
                    choices: ['true', 'false'],
                },
                {
                    type: 'list',
                    name: 'custom-background',
                    message: 'custom-background',
                    choices: ['true', 'false'],
                },
                {
                    type: 'list',
                    name: 'html-5',
                    message: 'html-5',
                    choices: ['true', 'false'],
                },
                {
                    type: 'list',
                    name: 'title-tag',
                    message: 'title-tag',
                    choices: ['true', 'false'],
                },
                {
                    type: 'list',
                    name: 'custom-logo',
                    message: 'custom-logo',
                    choices: ['true', 'false'],
                },
            ])
            .then((answers) => {
                setNewThemeSupportSectionInConfigurationFile(answers);
            });
    });

program
    .command('generate')
    .description(
        'Generate the basic new theme files include core template files, functions and styles'
    )
    .action(() => {
        Write.infoln('Basic file generation started');
        generateThemeBasicFiles();
    });

program
    .command('create')
    .description(
        'Use this command to create new template files, widgets etc...'
    )
    .action(() => {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'new_asset',
                    message: 'Create New Asset',
                    choices: [
                        'Template File',
                        'Archive',
                        'Single',
                        'Widget',
                        'CPT',
                        'Taxonomy',
                        'Sidebar',
                        'Dashboard Widget',
                    ],
                },
            ])
            .then((answers) => {
                switch (answers.new_asset) {
                    case 'Template File':
                        inquirer
                            .prompt([
                                {
                                    type: 'input',
                                    name: 'template_name',
                                    message: 'What is template name?',
                                },
                            ])
                            .then((answers) => {
                                generateTemplateFile(answers.template_name);
                            });
                        break;
                    case 'Widget':
                        inquirer
                            .prompt([
                                {
                                    type: 'input',
                                    name: 'widget_title',
                                    message: 'Widget Title',
                                },
                                {
                                    type: 'input',
                                    name: 'widget_description',
                                    message: 'Widget Description',
                                },
                                {
                                    type: 'input',
                                    name: 'widget_text_domain',
                                    message: 'Widget Text Domain',
                                },
                            ])
                            .then((answers) => {
                                createThemeWidget(answers);
                            });
                        break;
                    case 'Archive':
                        Write.infoln(`For Example: article / team-member`);
                        inquirer
                            .prompt([
                                {
                                    type: 'input',
                                    name: 'post_type',
                                    message: 'Create archive page to post type',
                                },
                            ])
                            .then((answers) => {
                                createArchivePage(answers);
                            });
                        break;
                    case 'Single':
                        Write.infoln(`For Example: article / team-member`);
                        inquirer
                            .prompt([
                                {
                                    type: 'input',
                                    name: 'post_type',
                                    message: 'Create single page to post type',
                                },
                            ])
                            .then((answers) => {
                                createSinglePage(answers);
                            });
                        break;
                    case 'CPT':
                        inquirer
                            .prompt([
                                {
                                    type: 'input',
                                    name: 'post_type_singular',
                                    message: 'Singular post type name',
                                },
                                {
                                    type: 'input',
                                    name: 'post_type_plural',
                                    message: 'Plural post type name',
                                },
                                {
                                    type: 'input',
                                    name: 'post_type_description',
                                    message: 'Post type description',
                                },
                                {
                                    type: 'input',
                                    name: 'post_type_text_domain',
                                    message: 'Post type Text Domain',
                                },
                                {
                                    type: 'checkbox',
                                    name: 'supports',
                                    message: 'Post type supports',
                                    choices: [
                                        'title',
                                        'editor',
                                        'comments',
                                        'thumbnail',
                                        'revisions',
                                        'author',
                                        'excerpt',
                                        'trackbacks',
                                        'page-attributes',
                                        'post-formats',
                                        'custom-fields',
                                    ],
                                },
                                {
                                    type: 'list',
                                    name: 'public',
                                    message: 'Post type is public',
                                    choices: ['true', 'false'],
                                },
                                {
                                    type: 'list',
                                    name: 'hierarchical',
                                    message: 'Post type is Hierarchical',
                                    choices: ['true', 'false'],
                                },
                                {
                                    type: 'list',
                                    name: 'has_archive',
                                    message: 'Post type has archive?',
                                    choices: ['true', 'false'],
                                },
                                {
                                    type: 'list',
                                    name: 'exclude_from_search',
                                    message: 'Exclude post type from search?',
                                    choices: ['true', 'false'],
                                },
                                {
                                    type: 'list',
                                    name: 'publicly_queryable',
                                    message: 'Allow query post publicly?',
                                    choices: ['true', 'false'],
                                },
                                {
                                    type: 'list',
                                    name: 'show_ui',
                                    message: 'Show post type ui?',
                                    choices: ['true', 'false'],
                                },
                                {
                                    type: 'list',
                                    name: 'show_in_menu',
                                    message: 'Show post type in menu?',
                                    choices: ['true', 'false'],
                                },
                                {
                                    type: 'list',
                                    name: 'show_in_nav_menus',
                                    message: 'Show post type in nav menu?',
                                    choices: ['true', 'false'],
                                },
                                {
                                    type: 'list',
                                    name: 'show_in_admin_bar',
                                    message: 'Show post type in admin bar?',
                                    choices: ['true', 'false'],
                                },
                                {
                                    type: 'list',
                                    name: 'can_export',
                                    message: 'Post type can export?',
                                    choices: ['true', 'false'],
                                },
                                {
                                    type: 'list',
                                    name: 'show_in_rest',
                                    message: 'Post type available for REST',
                                    choices: ['true', 'false'],
                                },
                            ])
                            .then((answers) => {
                                createCustomPostType(answers);
                            });
                        break;
                    case 'Taxonomy':
                        inquirer
                            .prompt([
                                {
                                    type: 'input',
                                    name: 'taxonomy_for_post_types',
                                    message:
                                        "Taxonomy for post types [separated with comma's without spaces]",
                                },
                                {
                                    type: 'input',
                                    name: 'taxonomy_single_name',
                                    message: 'Taxonomy single name',
                                },
                                {
                                    type: 'input',
                                    name: 'taxonomy_plural_name',
                                    message: 'Taxonomy plural name',
                                },
                                {
                                    type: 'input',
                                    name: 'taxonomy_description',
                                    message: 'Taxonomy description',
                                },
                                {
                                    type: 'input',
                                    name: 'taxonomy_key',
                                    message: 'Taxonomy key',
                                },
                                {
                                    type: 'input',
                                    name: 'taxonomy_text_domain',
                                    message: 'Taxonomy text domain',
                                },
                                {
                                    type: 'list',
                                    name: 'taxonomy_is_hierarchical',
                                    message: 'Taxonomy is hierarchical?',
                                    choices: ['true', 'false'],
                                },
                                {
                                    type: 'list',
                                    name: 'taxonomy_is_public',
                                    message: 'Taxonomy is public?',
                                    choices: ['true', 'false'],
                                },
                                {
                                    type: 'list',
                                    name: 'taxonomy_is_publicly_queryable',
                                    message: 'Taxonomy is publicly queryable?',
                                    choices: ['true', 'false'],
                                },
                                {
                                    type: 'list',
                                    name: 'taxonomy_show_in_ui',
                                    message: 'Taxonomy show in ui?',
                                    choices: ['true', 'false'],
                                },
                                {
                                    type: 'list',
                                    name: 'taxonomy_show_in_menu',
                                    message: 'Taxonomy show in menu?',
                                    choices: ['true', 'false'],
                                },
                                {
                                    type: 'list',
                                    name: 'taxonomy_show_in_nav_menus',
                                    message: 'Taxonomy show in nav menus?',
                                    choices: ['true', 'false'],
                                },
                                {
                                    type: 'list',
                                    name: 'taxonomy_show_in_rest',
                                    message: 'Taxonomy show in REST?',
                                    choices: ['true', 'false'],
                                },
                                {
                                    type: 'list',
                                    name: 'taxonomy_show_in_tag_cloud',
                                    message: 'Taxonomy show in tag cloud?',
                                    choices: ['true', 'false'],
                                },
                                {
                                    type: 'list',
                                    name: 'taxonomy_show_in_quick_edit',
                                    message: 'Taxonomy show in quick edit?',
                                    choices: ['true', 'false'],
                                },
                                {
                                    type: 'list',
                                    name: 'taxonomy_show_in_admin_column',
                                    message: 'Taxonomy show in admin column?',
                                    choices: ['true', 'false'],
                                },
                            ])
                            .then((answers) => {
                                createTaxonomy(answers);
                            });
                        break;
                    case 'Dashboard Widget':
                        inquirer
                            .prompt([
                                {
                                    type: 'input',
                                    name: 'dashboard_widget_name',
                                    message: 'Dashboard Widget Name',
                                },
                            ])
                            .then((answers) => {
                                createDashboardWidget(answers);
                            });
                        break;
                    case 'Sidebar':
                        inquirer
                            .prompt([
                                {
                                    type: 'input',
                                    name: 'sidebar_name',
                                    message: 'Sidebar name (Back-end Title)',
                                },
                                {
                                    type: 'input',
                                    name: 'sidebar_id',
                                    message: 'Sidebar id',
                                },
                            ])
                            .then((answers) => {
                                createSidebar(answers);
                            });
                        break;
                }
            });
    });
program.parse(process.argv);
