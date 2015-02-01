<?php if(!isset($subpages)) $subpages = $site->pages() ?>
<?php foreach($subpages->visible() AS $p): ?>
  <?php if($p->hasImages()): ?>
    <?php foreach($p->images() as $image): ?>

    	<div class="col-sm-1">
	    	<a href="<?php echo thumb($image, array('height' => 1200), false); ?>">
	    		<img class="page" src="<?php echo thumb($image, array('width' => 130, 'quality'=> 60), false); ?>">
	  		</a>
    	</div>

  	<?php endforeach ?>
  <?php endif ?>
  <?php if($p->hasChildren()): ?>
    <?php snippet('image-menu', array('subpages' => $p->children())) ?>
  <?php endif ?>
<?php endforeach ?>