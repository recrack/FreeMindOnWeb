<?php
session_start();

//Check whether the session variable SESS_EMAIL is present or not
if(!isset($_SESSION['SESS_EMAIL']) || (trim($_SESSION['SESS_EMAIL']) == '')){
	exit();
}

require('db.inc');
require('connectivity.php');
require('conMyMindWeb.php');

$mapData = $_POST['mapData'];
$mapid = $_POST['mapid'];
$mapName = $_POST['mapName'];

$con = new MyMindWeb(USER, PASSWD, DB);

echo $con->boolMapSave($_SESSION['SESS_EMAIL'], $mapData, $mapid, $mapName);

?>