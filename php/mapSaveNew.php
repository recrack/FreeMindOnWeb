<?php
session_start();

//Check whether the session variable SESS_EMAIL is present or not
if(!isset($_SESSION['SESS_EMAIL']) || (trim($_SESSION['SESS_EMAIL']) == '')){
	exit();
}

require('db.inc');
require('connectivity.php');
require('conMyMindWeb.php');

// http://localhost/mindmap/php/mapSaveNew.php?mapData=beonit&mapName=test
$mapData = $_POST['mapData'];
$mapName = $_POST['mapName'];

$con = new MyMindWeb(USER, PASSWD, DB);

echo $con->boolMapSaveNew($_SESSION['SESS_EMAIL'], $mapData, $mapName);

?>