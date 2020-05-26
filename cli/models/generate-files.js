const fs = require('fs');

exports.generateThemeFiles = (themeConfigFile) => {
    generateBasicTemplateFiles();
    generateFunctionsFile(themeConfigFile);
    generateStyleFile(themeConfigFile);
};

function generateStyleFile(themeConfigFile) {
    console.log(themeConfigFile.theme_headers.theme_name);
    fs.writeFile('style.css',
        `/*
    Theme Name: ${themeConfigFile.theme_headers.theme_name}
    Theme URI: ${themeConfigFile.theme_headers.theme_uri}
    Description: ${themeConfigFile.theme_headers.theme_description}
    Author: ${themeConfigFile.theme_headers.theme_author}
    Author URI: ${themeConfigFile.theme_headers.theme_author_uri}
    Version: 1.0.0
    Tags: ${themeConfigFile.theme_headers.theme_tags}
    Text Domain: ${themeConfigFile.theme_headers.theme_text_domain}
    License: GPL-2.0-or-later
    License URI: https://www.gnu.org/licenses/old-licenses/gpl-2.0.html
    */`
        , function (err) {
            if (err) throw err;
            console.log('Archive file: archive.php generated'.green);
        });
}

function generateFunctionsFile(themeConfigFile) {
    fs.writeFile('functions.php',
        `<?php
require_once __DIR__ . '/includes/theme-setup.php';`
        , function (err) {
            if (err) throw err;
            console.log('Archive file: archive.php generated'.green);
        });

    fs.writeFile('includes/theme-setup.php',
        generateThemeSetupFile(themeConfigFile),
        function (err) {
            if (err) throw err;
            console.log('Archive file: archive.php generated'.green);
        });

}

function generateThemeSetupFile(themeConfigFile) {
    let finalString = `<?php

class themePrefix_ThemeSetup {

\tpublic function __construct() {
\t\tadd_action( 'after_setup_theme', [ $this, 'addThemeSupport' ] );
\t}

\tpublic function addThemeSupport() {`;

    for (const support in themeConfigFile.theme_support) {
        if (themeConfigFile.theme_support[support]) {
            finalString += `\t\tadd_theme_support( '${support}' );\n`;
        }
    }

    finalString += `}
}
new themePrefix_ThemeSetup();`;

    return finalString;
}

function generateBasicTemplateFiles() {
    fs.writeFile('archive.php',
        `<?php get_header(); ?>
<?php get_template_part( 'template-parts/get', 'posts' ); ?>
<?php get_footer(); ?>`
        , function (err) {
            if (err) throw err;
            console.log('Archive file: archive.php generated'.green);
        });

    fs.writeFile('index.php',
        `<?php get_header(); ?>
<?php get_template_part( 'template-parts/get', 'posts' ); ?>
<?php get_footer(); ?>`
        , function (err) {
            if (err) throw err;
            console.log('Index file: index.php generated'.green);
        });

    fs.writeFile('category.php',
        `<?php get_header(); ?>
<?php get_template_part( 'template-parts/get', 'posts' ); ?>
<?php get_footer(); ?>`
        , function (err) {
            if (err) throw err;
            console.log('Archive  Posts file: archive.php generated'.green);
        });

    fs.writeFile('page.php',
        `<?php get_header(); ?>
<?php get_template_part( 'template-parts/get', 'posts' ); ?>
<?php get_footer(); ?>`
        , function (err) {
            if (err) throw err;
            console.log('Page file: page.php generated'.green);
        });

    fs.writeFile('single.php',
        `<?php get_header(); ?>
<?php get_template_part( 'template-parts/get', 'post' ); ?>
<?php get_footer(); ?>`
        , function (err) {
            if (err) throw err;
            console.log('Single Post file: single.php generated'.green);
        });

    fs.writeFile('tag.php',
        `<?php get_header(); ?>
<?php get_template_part( 'template-parts/get', 'posts' ); ?>
<?php get_footer(); ?>`
        , function (err) {
            if (err) throw err;
            console.log('Tags file: tag.php generated'.green);
        });

    fs.writeFile('footer.php',
        `<?php wp_footer(); ?>
</body>
</html>`
        , function (err) {
            if (err) throw err;
            console.log('Footer file: footer.php generated'.green);
        });
    fs.writeFile('header.php',
        `<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><?php echo wp_title( '', false ) ? ' |' : ''; bloginfo( 'name' ); ?></title>
\t<?php wp_head(); ?>
</head>
<body <?php body_class(); ?> role="document">`
        , function (err) {
            if (err) throw err;
            console.log('Header file: header.php generated'.green);
        });
    fs.writeFile('comments.php',
        `<div class="comments">
\t<?php if ( post_password_required() ) : ?>
        <p>Use Password</p>
\t<?php endif; ?>
</div>
<?php if ( have_comments() ) : ?>
    <h2><?php comments_number(); ?></h2>
<?php
elseif ( ! comments_open()
         && ! is_page()
         && post_type_supports( get_post_type(),
\t\t'comments' ) ) :
\t?>
    <p>Can not comment</p>
<?php endif; ?>
<?php comment_form(); ?>
</div>
`
        , function (err) {
            if (err) throw err;
            console.log('Comments file: comments.php generated'.green);
        });
}