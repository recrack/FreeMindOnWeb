<?php
class Connectivity {
    
    var $dbuser;
    var $dbpasswd;
    var $db;
    
    function __construct($user, $passwd, $db){
        $this->dbuser = $user;
        $this->dbpasswd = $passwd;
        $this->db = $db;
        $this->connect();
        print "<!-- Connectivity construct -->\n";
    }
    
    function connect(){
        mysql_connect(localhost, $this->dbuser, $this->dbpasswd);
        @mysql_select_db($this->db) or die( "<!-- db connect fail -->\n");
        print "<!-- db connect -->\n";
    }
    
    function close(){
        mysql_close();
        print "<!-- db close -->\n";
    }
    
    function __destruct(){
        $this->close();
        print "<!-- Connectivity destruct -->\n";
    }
}
?>