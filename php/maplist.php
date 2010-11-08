<?php
session_start();

//Check whether the session variable SESS_EMAIL is present or not
if(!isset($_SESSION['SESS_EMAIL']) || (trim($_SESSION['SESS_EMAIL']) == '')){
	exit();
}

require('db.inc');
require('connectivity.php');
require('conMyMindWeb.php');

$con = new MyMindWeb(USER, PASSWD, DB);

if( $con->rstMaplist($_SESSION['SESS_EMAIL']) ){
	print "error";
}

?>