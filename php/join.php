<?
require('db.inc');
require('connectivity.php');
require('conMyMindWeb.php');

$email = $_POST['email'];
$passwd = $_POST['passwd'];

$con = new MyMindWeb(USER, PASSWD, DB);

if( $con->boolInsertId($email, $passwd) )
    echo 1;
else
    echo 0;

?>