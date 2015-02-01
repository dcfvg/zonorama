<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title><?php echo $site->title()->html() ?> | <?php echo $page->title()->html() ?></title>
  <?php echo css('/assets/js/jquery-ui-1.10.4.custom/css/ui-lightness/jquery-ui-1.10.4.custom.min.css ') ?>
  <?php echo css('/assets/css/screen.css') ?>
</head>
<body>
	<div id="slideshow"></div>
	<div id="menu">
		<h3> <a href="/"><?php echo $site->title() ?></a> </h3>
		<hr>
		<h4><?php echo $page->title() ?></h4>
		<hr>
		<?php foreach($page->images() as $image): ?>
			<?php $id++; ?>
			<img id="img<?php echo $id ?>" src="<?php echo thumb($image, array('height' => 650), false); ?>" width="50">
			<?php endforeach ?>
		<hr>
	</div>
	<?php echo js('/assets/js/jquery-2.1.0.min.js'); ?>
	<?php echo js('/assets/js/jquery-ui-1.10.4.custom/js/jquery-ui-1.10.4.custom.min.js'); ?>
	<?php echo js('/assets/js/zonorama.js'); ?>	
 </body>
</html>