<?
require('db.inc');
require('connectivity.php');
require('conMyMindWeb.php');

$email = $_POST['email'];

$con = new MyMindWeb(USER, PASSWD, DB);
echo $con->boolCheckId($email);


?>