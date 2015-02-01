<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title><?php echo $site->title()->html() ?></title>
  <?php echo css('/assets/css/screen.css') ?>
</head>
<body id="home">
	<div class="container-fluid">
		<div class="row">
			<h2 class="col-sm-9"><?php echo $page->title() ?></h2>

		</div>
		<hr>
		
		<div class="row">
			
			<div class="col-sm-9">
				<?php echo kirbytext($page->text()) ?>
			</div>

			<div class="col-sm-3">
				<?php $items = $pages->visible();
					if($items->count() > 0):
				?>

				  <div class="list-group">
				    <?php foreach($pages->visible() as $item): ?>
				    <a<?php ecco($item->isOpen(), ' class="active"') ?> href="<?php echo $item->url() ?>" class="list-group-item">
				    	<?php ecco($item->hasImages(), '<span class="badge">'.$item->images()->count().'</span>'); ?>
				    	<?php echo html($item->title()) ?>
				    </a>
				    <?php endforeach ?>
				  </ul>
				<?php endif ?>
			</div>
		
		</div>

	</div>
 </body>
</html>