<?php get_header(); ?>
<?php
if (post_password_required()) {
    return esc_html_e('Oops! That page can&rsquo;t be found.', '<themetextdoomain>');
}
?>
<?php get_footer(); ?>