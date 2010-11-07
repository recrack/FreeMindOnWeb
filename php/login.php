<?php
require('db.inc');
require('connectivity.php');
require('conMyMindWeb.php');

$email =  $_POST['email'];
$passwd = $_POST['passwd'];

$con = new MyMindWeb(USER, PASSWD, DB);
if( $con->boolLogin($email, $passwd ) ){
	session_start();
	session_regenerate_id();
	$_SESSION['SESS_EMAIL'] = $email;
	session_write_close();
	echo 1;
}
else
	echo 0;

?>