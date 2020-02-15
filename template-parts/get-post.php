<?php
while ( have_posts() ) : the_post();
	?>
	<?php
	// If comments are enabled or there are comments
	if ( comments_open() || get_comments_number() ) :
		comments_template();
	endif;
endwhile;