<?php

##if(!r::is_ajax()) notFound();

// header('Content-type: application/json; charset=utf-8');

$json['data'][] = array(
	'url'   => "oks",
	'q' => $_POST
);

$p = $_POST["parent"];
$z = $_POST["zones"];

try {
	$site
		->find($p["uri"])
		->files()
		->find($p["name"])
		->update(array(
		'zones' => json_encode($z),
	));

	echo 'The meta info has been updated';

	} 
catch(Exception $e) {
		echo 'The meta info could not be updated';
		echo $e->getMessage();
}

?>