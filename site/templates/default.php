<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title><?=$site->title()->html() ?> | <?=$page->title()->html() ?></title>
  <?=css('/assets/js/jquery-ui-1.10.4.custom/css/ui-lightness/jquery-ui-1.10.4.custom.min.css ') ?>
  <?=css('/assets/css/screen.css') ?>
</head>
<body class="<?php if($site->user()) echo "user" ?>">
	<div id="slideshow"></div>
	<?php if($site->user()): ?>
		<div id="menu">
			<h3> <a href="/"><?=$site->title() ?></a> </h3>
			<hr>
			<h4><?=$page->title() ?></h4>
			<hr>
			
			<p>on zone hover press SPACE <br>to go to the image </p>
			<?php foreach($page->images() as $img): ?>
				<?php $id++; ?>
				<img 
					hash	= "<?=$img->hash()?>" 
					name	= "<?=$img->filename() ?>" 
					src 	= "<?=thumb($img, array('width' => 150), false); ?>" 
					srcHD = "<?=thumb($img, array('height' => 650, 'upscale'   => true), false); ?>"
					url   = "<?=$img->url() ?>"
					uri 	= "<?=$page->uri() ?>"
					width = "50">
			<?php endforeach ?>
			<hr>
		</div>
		<?php else: ?>
			<?php  $img = $page->images()->shuffle()->first() ?>
					<div>
						<img 
						class = "parent"
						hash	= "<?=$img->hash()?>" 
						name	= "<?=$img->filename() ?>" 
						src = "<?=thumb($img, array('height' => 650, 'upscale'   => true), false); ?>"
						url   = "<?=$img->url() ?>"
						uri 	= "<?=$page->uri() ?>">

					</div>
		<?php endif ?>

	<?=js('/assets/js/jquery-2.1.0.min.js'); ?>
	<?=js('/assets/js/jquery-ui-1.10.4.custom/js/jquery-ui-1.10.4.custom.min.js'); ?>
	<?=js('/assets/js/zonorama.js'); ?>
 </body>
</html>