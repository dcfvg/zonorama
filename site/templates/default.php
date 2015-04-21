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
			<?php foreach($page->images() as $img): ?>
								<hr>

					<img 
					hash	= "<?=$img->hash()?>" 
					name	= "<?=$img->filename() ?>" 
					src = "<?=thumb($img, array('height' => 150, 'upscale'   => true), false); ?>"
					url   = "<?=$img->url() ?>"
					uri 	= "<?=$page->uri() ?>">

					<?php foreach(json_decode($img->zones()) as $zone): ?>
						<?php 
							$background= $page->files()->find($zone->name)
						?>
						<?=thumb($background, array('height' => 60, 'upscale'   => true)); ?>
					<?php endforeach ?>
			<?php endforeach ?>
		<?php endif ?>

	<?=js('/assets/js/jquery-2.1.0.min.js'); ?>
	<?=js('/assets/js/jquery-ui-1.10.4.custom/js/jquery-ui-1.10.4.custom.min.js'); ?>
	<?=js('/assets/js/zonorama.js'); ?>
 </body>
</html>