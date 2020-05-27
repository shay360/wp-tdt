<div class="comments">
	<?php if ( post_password_required() ) : ?>
        <p>Use Password</p>
	<?php endif; ?>
</div>
<?php if ( have_comments() ) : ?>
    <h2><?php comments_number(); ?></h2>
<?php
elseif ( ! comments_open()
         && ! is_page()
         && post_type_supports( get_post_type(),
		'comments' ) ) :
	?>
    <p>Can not comment</p>
<?php endif; ?>
<?php comment_form(); ?>
</div>
