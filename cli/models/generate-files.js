const fs = require("fs");
const { Write } = require("./Write");
const { convertToFileName } = require("./file-tools");

exports.generateThemeFiles = (themeConfigFile) => {
  generateBasicTemplateFiles();
  generateFunctionsFile(themeConfigFile);
  generateStyleFile(themeConfigFile);
  generateSrcFiles();
  generatePostTypeImporter();
  generateTaxonomiesImporter();
};

function generateTaxonomiesImporter() {
  fs.mkdir("taxonomies/", { recursive: true }, (err) => {
    if (err) throw err;
    Write.infoln("post-types folder generated");
    fs.writeFile("taxonomies/theme-taxonomies.php", `<?php`, function (err) {
      if (err) throw err;
      Write.infoln("theme-taxonomies.php generated");
    });
  });
}

function generateSrcFiles() {
  fs.mkdir("src/scss", { recursive: true }, (err) => {
    if (err) throw err;
    fs.writeFile(
      "src/scss/theme.scss",
      `@import "imports/normalize";`,
      function (err) {
        if (err) throw err;
        Write.infoln("theme.scss generated");
      }
    );
  });
  fs.mkdir("src/scss/imports", { recursive: true }, (err) => {
    if (err) throw err;
    fs.writeFile(
      "src/scss/imports/normalize.scss",
      `/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */

/* Document
   ========================================================================== */

/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 */

html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
}

/* Sections
   ========================================================================== */

/**
 * Remove the margin in all browsers.
 */

body {
  margin: 0;
}

/**
 * Render the \`main\` element consistently in IE.
 */

main {
  display: block;
}

/**
 * Correct the font size and margin on \`h1\` elements within \`section\` and
 * \`article\` contexts in Chrome, Firefox, and Safari.
 */

h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

/* Grouping content
   ========================================================================== */

/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */

hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */

pre {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/* Text-level semantics
   ========================================================================== */

/**
 * Remove the gray background on active links in IE 10.
 */

a {
  background-color: transparent;
}

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */

abbr[title] {
  border-bottom: none; /* 1 */
  text-decoration: underline; /* 2 */
  text-decoration: underline dotted; /* 2 */
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */

b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */

code,
kbd,
samp {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/**
 * Add the correct font size in all browsers.
 */

small {
  font-size: 80%;
}

/**
 * Prevent \`sub\` and \`sup\` elements from affecting the line height in
 * all browsers.
 */

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Embedded content
   ========================================================================== */

/**
 * Remove the border on images inside links in IE 10.
 */

img {
  border-style: none;
}

/* Forms
   ========================================================================== */

/**
 * 1. Change the font styles in all browsers.
 * 2. Remove the margin in Firefox and Safari.
 */

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  line-height: 1.15; /* 1 */
  margin: 0; /* 2 */
}

/**
 * Show the overflow in IE.
 * 1. Show the overflow in Edge.
 */

button,
input { /* 1 */
  overflow: visible;
}

/**
 * Remove the inheritance of text transform in Edge, Firefox, and IE.
 * 1. Remove the inheritance of text transform in Firefox.
 */

button,
select { /* 1 */
  text-transform: none;
}

/**
 * Correct the inability to style clickable types in iOS and Safari.
 */

button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
}

/**
 * Remove the inner border and padding in Firefox.
 */

button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

/**
 * Restore the focus styles unset by the previous rule.
 */

button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
  outline: 1px dotted ButtonText;
}

/**
 * Correct the padding in Firefox.
 */

fieldset {
  padding: 0.35em 0.75em 0.625em;
}

/**
 * 1. Correct the text wrapping in Edge and IE.
 * 2. Correct the color inheritance from \`fieldset\` elements in IE.
 * 3. Remove the padding so developers are not caught out when they zero out
 *    \`fieldset\` elements in all browsers.
 */

legend {
  box-sizing: border-box; /* 1 */
  color: inherit; /* 2 */
  display: table; /* 1 */
  max-width: 100%; /* 1 */
  padding: 0; /* 3 */
  white-space: normal; /* 1 */
}

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */

progress {
  vertical-align: baseline;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */

textarea {
  overflow: auto;
}

/**
 * 1. Add the correct box sizing in IE 10.
 * 2. Remove the padding in IE 10.
 */

[type="checkbox"],
[type="radio"] {
  box-sizing: border-box; /* 1 */
  padding: 0; /* 2 */
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */

[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * 1. Correct the odd appearance in Chrome and Safari.
 * 2. Correct the outline style in Safari.
 */

[type="search"] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */

[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Change font properties to \`inherit\` in Safari.
 */

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/* Interactive
   ========================================================================== */

/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */

details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */

summary {
  display: list-item;
}

/* Misc
   ========================================================================== */

/**
 * Add the correct display in IE 10+.
 */

template {
  display: none;
}

/**
 * Add the correct display in IE 10.
 */

[hidden] {
  display: none;
}`,
      function (err) {
        if (err) throw err;
        Write.infoln("normalize.scss generated");
      }
    );
  });

  fs.mkdir("src/js", { recursive: true }, (err) => {
    if (err) throw err;
    fs.writeFile("src/js/theme.js", ``, function (err) {
      if (err) throw err;
      Write.infoln("theme.js generated");
    });
  });
}

exports.generateTemplateFile = (templateName) => {
  const fileName = convertToFileName(templateName) + "-template.php";
  fs.writeFile(
    fileName,
    `<?php
/*
 * Template Name: ${templateName}
 */
get_header();
if ( have_posts() ):
\twhile ( have_posts() ) : the_post();
\t\tthe_post_thumbnail();
\t\tthe_title();
\t\tthe_content();
\tendwhile;
endif;
get_footer();`,
    function (err) {
      if (err) throw err;
      Write.infoln("Template File " + templateName + " generated");
    }
  );
  Write.infoln(fileName);
};

function generatePostTypeImporter() {
  fs.mkdir("post-types/", { recursive: true }, (err) => {
    if (err) throw err;
    Write.infoln("post-types folder generated");
    fs.writeFile("post-types/theme-post-types.php", `<?php`, function (err) {
      if (err) throw err;
      Write.infoln("theme-post-types.php generated");
    });
  });
}

function generateStyleFile(themeConfigFile) {
  fs.writeFile(
    "style.css",
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
    */`,
    function (err) {
      if (err) throw err;
      Write.infoln("style.css generated");
    }
  );
}

function generateFunctionsFile(themeConfigFile) {
  fs.writeFile(
    "functions.php",
    `<?php
// Include basic theme setup
require_once __DIR__ . '/includes/theme-setup.php';
// Include importer for custom post types
require_once __DIR__ . '/post-types/theme-post-types.php';
// Include importer for custom post types
require_once __DIR__ . '/taxonomies/theme-taxonomies.php';
// Include importer for widgets
require_once __DIR__ . '/classes/widgets/theme-widgets.php';
// Include importer for sidebars
require_once __DIR__ . '/classes/sidebars/theme-sidebars.php';
// Include importer for dashboard widgets
require_once __DIR__ . '/classes/dashboard-widgets/theme-dashboard-widgets.php';`,
    function (err) {
      if (err) throw err;
      Write.infoln("functions.php generated");
    }
  );

  fs.writeFile(
    "sidebar.php",
    `<?php if(!dynamic_sidebar('sidebar-page')): ?>
    <h4 role="heading">This sidebar needs widgets</h4>
    <p>Drug and drop widgets from Appearance->widgets</p>
<?php endif; ?>`,
    function (err) {
      if (err) throw err;
      Write.infoln("sidebar.php generated");
      Write.infoln("You use main sidebar get_sidebar('main-sidebar')");
    }
  );

  fs.mkdir("includes/", { recursive: true }, (err) => {
    if (err) throw err;
    fs.writeFile(
      "includes/theme-setup.php",
      generateThemeSetupFile(themeConfigFile),
      function (err) {
        if (err) throw err;
        Write.infoln("theme-setup.php generated");
      }
    );
  });

  fs.mkdir("classes/widgets/", { recursive: true }, (err) => {
    if (err) throw err;
    fs.writeFile("classes/widgets/theme-widgets.php", `<?php`, function (err) {
      if (err) throw err;
      Write.infoln("theme-widgets.php generated");
    });
  });

  fs.mkdir("classes/sidebars/", { recursive: true }, (err) => {
    if (err) throw err;
    fs.writeFile(
      "classes/sidebars/theme-sidebars.php",
      `<?php
require_once __DIR__ . '/ThemeSidebar.php';`,
      function (err) {
        if (err) throw err;
        Write.infoln("theme-sidebars.php generated");
        fs.writeFile(
          "classes/sidebars/ThemeSidebar.php",
          `<?php

class ThemeSidebars {
    public function __construct() {
        add_action('widgets_init', [$this, 'generateMainSidebar']);
    }

    function generateMainSidebar() {

        register_sidebar([
            'name' => 'Main sidebar {id: main-sidebar}',
            'id' => 'main-sidebar',
            'before_widget' => '<div class="sidebar">',
            'after_widget' => '</div>',
            'before_title' => '',
            'after_title' => '',
        ]);

    }
}

new ThemeSidebars();`,
          function (err) {
            if (err) throw err;
            Write.infoln("ThemeSidebar.php generated");
          }
        );
      }
    );
  });

  fs.mkdir("classes/dashboard-widgets/", { recursive: true }, (err) => {
    if (err) throw err;
    fs.writeFile(
      "classes/dashboard-widgets/theme-dashboard-widgets.php",
      `<?php`,
      function (err) {
        if (err) throw err;
        Write.infoln("theme-dashboard-widgets.php generated");
      }
    );
  });
}

function generateThemeSetupFile(themeConfigFile) {
  let finalString = `<?php

class ThemeSetup {

\tpublic function __construct() {
\t\tadd_action( 'after_setup_theme', [ $this, 'addThemeSupport' ] );
\t}

\tpublic function addThemeSupport() {`;

  for (const support in themeConfigFile.theme_support) {
    Write.infoln(support);
    if (themeConfigFile.theme_support[support]) {
      if (support === "html-5") {
        finalString += `\t\tadd_theme_support( '${support}', ['comment-list', 'comment-form', 'search-form', 'gallery', 'caption', 'style', 'script'] );\n`;
      } else if (support === "custom-logo") {
        finalString += `\t\tadd_theme_support( '${support}', ['height' => 20, 'width' => 100, 'flex-height' => true, 'flex-width'  => true, 'header-text' => ['site-title', 'site-description']] );\n`;
      } else if (support === "custom-background") {
        finalString += `\t\tadd_theme_support( '${support}', ['default-image' => '', 'default-preset' => 'default', 'default-position-x' => 'left', 'default-position-y' => 'top', 'default-size' => 'auto', 'default-repeat' => 'repeat', 'default-attachment' => 'scroll', 'default-color' => '', 'wp-head-callback' => '_custom_background_cb', 'admin-head-callback' => '', 'admin-preview-callback' => ''] );\n`;
      } else if (support === "custom-header") {
        finalString += `\t\tadd_theme_support( '${support}', ['default-image' => '', 'random-default' => false, 'width' => 0, 'height' => 0, 'flex-height' => false, 'flex-width' => false, 'default-text-color' => '', 'header-text' => true, 'uploads' => true, 'wp-head-callback' => '', 'admin-head-callback' => '', 'admin-preview-callback' => '', 'video' => false, 'video-active-callback' => 'is_front_page'] );\n`;
      } else if (support === "post-formats") {
        finalString += `\t\tadd_theme_support( '${support}', ['aside', 'gallery', 'link', 'image', 'quote', 'status', 'video', 'audio', 'chat'] );\n`;
      } else {
        finalString += `\t\tadd_theme_support( '${support}' );\n`;
      }
    }
  }

  finalString += `\t}
}
new ThemeSetup();`;

  return finalString;
}

function generateBasicTemplateFiles() {
  fs.mkdir("languages", { recursive: true }, (err) => {
    if (err) throw err;
    fs.writeFile(
      "languages/README.txt",
      `This directory should contain translation files for your theme`,
      function (err) {
        if (err) throw err;
        Write.infoln("README.txt file in languages generated");
      }
    );
  });

  fs.mkdir("template-parts", { recursive: true }, (err) => {
    if (err) throw err;
    fs.writeFile(
      "template-parts/get-post.php",
      `<?php
if ( have_posts() ):
\twhile ( have_posts() ) : the_post();
\t\tthe_post_thumbnail();
\t\tthe_title();
\t\tthe_content();
\tendwhile;
endif;
?>`,
      function (err) {
        if (err) throw err;
        Write.infoln("Template Part get-post.php generated");
      }
    );

    fs.writeFile(
      "template-parts/get-posts.php",
      `<?php
if ( have_posts() ):
\twhile ( have_posts() ) : the_post();
\t\tget_the_tag_list();
\t\tthe_post_thumbnail();
\t\tthe_title();
\t\tthe_content();
\tendwhile;
endif;
?>`,
      function (err) {
        if (err) throw err;
        Write.infoln("Template Part get-posts.php generated");
      }
    );
  });

  fs.writeFile(
    "home.php",
    `<?php get_header(); ?>
<?php get_template_part( 'template-parts/get', 'posts' ); ?>
<?php get_footer(); ?>`,
    function (err) {
      if (err) throw err;
      Write.infoln("Home file: home.php generated");
    }
  );

  fs.writeFile(
    "archive.php",
    `<?php get_header(); ?>
<?php get_template_part( 'template-parts/get', 'posts' ); ?>
<?php get_footer(); ?>`,
    function (err) {
      if (err) throw err;
      Write.infoln("Archive file: archive.php generated");
    }
  );

  fs.writeFile(
    "index.php",
    `<?php get_header(); ?>
<?php get_template_part( 'template-parts/get', 'posts' ); ?>
<?php get_footer(); ?>`,
    function (err) {
      if (err) throw err;
      Write.infoln("Index file: index.php generated");
    }
  );

  fs.writeFile(
    "category.php",
    `<?php get_header(); ?>
<?php get_template_part( 'template-parts/get', 'posts' ); ?>
<?php get_footer(); ?>`,
    function (err) {
      if (err) throw err;
      Write.infoln("Category Posts file: category.php generated");
    }
  );

  fs.writeFile(
    "page.php",
    `<?php get_header(); ?>
<?php get_template_part( 'template-parts/get', 'posts' ); ?>
<?php get_footer(); ?>`,
    function (err) {
      if (err) throw err;
      Write.infoln("Page file: page.php generated");
    }
  );

  fs.writeFile(
    "single.php",
    `<?php get_header(); ?>
<?php get_template_part( 'template-parts/get', 'post' ); ?>
<?php get_footer(); ?>`,
    function (err) {
      if (err) throw err;
      Write.infoln("Single Post file: single.php generated");
    }
  );

  fs.writeFile(
    "tag.php",
    `<?php get_header(); ?>
<?php get_template_part( 'template-parts/get', 'posts' ); ?>
<?php get_footer(); ?>`,
    function (err) {
      if (err) throw err;
      Write.infoln("Tags file: tag.php generated");
    }
  );

  fs.writeFile(
    "footer.php",
    `<?php wp_footer(); ?>
</body>
</html>`,
    function (err) {
      if (err) throw err;
      Write.infoln("Footer file: footer.php generated");
    }
  );
  fs.writeFile(
    'header.php',
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
<body <?php body_class(); ?> role="document">`,
    function (err) {
      if (err) throw err;
      Write.infoln("Header file: header.php generated");
    }
  );
  fs.writeFile(
    "comments.php",
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
`,
    function (err) {
      if (err) throw err;
      Write.infoln("Comments file: comments.php generated");
    }
  );
}
