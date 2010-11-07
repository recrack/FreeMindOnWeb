<?php

class MindWebQuery extends Connectivity {
    
    function __construct($id, $passwd, $db){
        parent::__construct($id, $passwd, $db);
    }

    function sqlCheckId( $email ){
        return "SELECT COUNT(email) FROM `member` WHERE `email`='" . $email . "'";
    }

    function sqlInsertId( $email, $passwd ){
        return "insert into member(`email`, `passwd`) values('" . $email . "', '" . $passwd . "')";
    }

    function sqlLogin( $email, $passwd ){
        return "SELECT COUNT(email) FROM `member` WHERE `email`='" . $email . "' AND `passwd` = '" . $passwd . "'";
   }
}

class MyMindWeb extends MindWebQuery {
    
    function boolCheckId( $email ){
        $query = $this->sqlCheckId($email);
        $result = mysql_query( $query ) or print(mysql_error());
        $row = mysql_fetch_array($result);
        return $row[0];
    }
    
    function boolInsertId($email, $passwd){
        $query = $this->sqlInsertId($email, md5($passwd) );
        return mysql_query( $query ) or print(mysql_error());
    }

    function boolLogin( $email, $passwd ){
        $query = $this->sqlLogin($email, md5($passwd) );
        $result = mysql_query( $query ) or print(mysql_error());
        $row = mysql_fetch_array($result);
        return $row[0];
    }
}
?>