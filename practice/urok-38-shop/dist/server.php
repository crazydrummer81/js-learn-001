<?php
	$_POST = json_decode(file_get_contents("php://input"), true);
	sleep(1);
	echo json_encode($_POST);
?>