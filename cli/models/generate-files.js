const fs = require('fs');

exports.generateThemeFiles = (themeConfigFile) => {
    generateBasicTemplateFiles();
};

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

    fs.writeFile('tags.php',
        `<?php get_header(); ?>
<?php get_template_part( 'template-parts/get', 'posts' ); ?>
<?php get_footer(); ?>`
        , function (err) {
            if (err) throw err;
            console.log('Tags file: tags.php generated'.green);
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