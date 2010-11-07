<?php
//Start session
session_start();
	

//Check whether the session variable SESS_EMAIL is present or not
if(!isset($_SESSION['SESS_EMAIL']) || (trim($_SESSION['SESS_EMAIL']) == '')){
	echo 0;
	exit();
}
else{
	//Unset the variables stored in session
	unset($_SESSION['SESS_EMAIL']);
	echo 1;
}

?>