<?php
require('db.inc');
require('connectivity.php');
require('conMyMindWeb.php');

$email = $_POST['email'];
$passwd = $_POST['passwd'];

print $email;

$con = new MyMindWeb(USER, PASSWD, DB);
if( $con->boolLogin($email, $passwd) )
    echo 'true';
else
    echo 'false';
?>