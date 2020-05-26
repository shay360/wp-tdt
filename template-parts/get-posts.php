<?php
if ( have_posts() ):
	while ( have_posts() ) : the_post();
		get_the_tag_list();
		the_post_thumbnail();
		the_title();
		the_content();
	endwhile;
endif;
?>