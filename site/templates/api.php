<?php

//if(!r::is_ajax()) notFound();

$op = $_POST["op"];

switch ($op) {
	case 'writeZones':
		if($site->user()){
			$p = $_POST["q"]["parent"];
			$z = $_POST["q"]["zones"];

			try {
				$site->find($p["uri"])->files()->find($p["name"])->update(array(
					'zones' => json_encode($z),
				));
				echo 'The meta info has been updated';

			} catch(Exception $e) {
					echo 'The meta info could not be updated';
					echo $e->getMessage();
			}
		}

	break;

	case 'getZones':
		$p = $_POST["q"]["parent"];

		header('Content-type: application/json; charset=utf-8');
		echo $site->find($p["uri"])->files()->find($p["name"])->zones();

	break;

	default:
		echo "unknown operation";
	break;
}

?>