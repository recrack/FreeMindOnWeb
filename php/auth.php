<?php
	//Start session
	session_start();
	
	//Check whether the session variable SESS_EMAIL is present or not
	if(!isset($_SESSION['SESS_EMAIL']) || (trim($_SESSION['SESS_EMAIL']) == '')) {
		header("location:index.html");
		exit();
	}
?>