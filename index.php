<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<link rel="stylesheet" type="text/css" href="/lib/jquery-ui-1.10.4.custom/css/ui-lightness/jquery-ui-1.10.4.custom.min.css ">
		<link rel="stylesheet" type="text/css" href="/assets/css/screen.css">
	</head>
	<body>
		<div id="container"></div>
		<div id="menu">
			<?php foreach (glob("content/thumbs/*.*") as $id => $file) echo '<img id="img'.$id.'" img src="'.$file.'" width="50">'; ?>
		</div>
		<script src="/lib/jquery-2.1.0.min.js"></script>
		<script src="/lib/jquery-ui-1.10.4.custom/js/jquery-ui-1.10.4.custom.min.js "></script>
		<script src="/assets/js/zonorama.js"></script>	
	</body>
</html>