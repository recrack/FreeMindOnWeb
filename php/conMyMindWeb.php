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

	function sqlMaplist( $email )
	{
		return "SELECT name FROM `mapName`, `owner` WHERE mapName.mapid = owner.mapid AND owner.owner = '" . $email . "'";
	}

	function sqlMapLoad( $email, $mapName )
	{
		return "SELECT map.mapdata FROM  `mapName`, `map`, `owner` WHERE mapName.mapid = map.mapid AND mapName.name = 'map name 1' AND owner.mapid = map.mapid AND owner = 'beonit@gmail.com'";
	}
	
	

}

class MyMindWeb extends MindWebQuery {
    
	// sql to 
	function sql2json($data_sql) 
	{
		$total = mysql_num_rows($data_sql);
		if($total == 0)
			return ;
		$row_count = 0;    
		$json_str .= "[\n";
		while($data = mysql_fetch_assoc($data_sql)) {
            if(count($data) > 1) $json_str .= "{\n";
            $count = 0;
            foreach($data as $key => $value) {
                //If it is an associative array we want it in the format of "key":"value"
                if(count($data) > 1) $json_str .= "\"$key\":\"$value\"";
                else $json_str .= "\"$value\"";
                //Make sure that the last item don't have a ',' (comma)
                $count++;
                if($count < count($data)) $json_str .= ",\n";
            }
            $row_count++;
            if(count($data) > 1) $json_str .= "}\n";
            //Make sure that the last item don't have a ',' (comma)
            if($row_count < $total) $json_str .= ",\n";
        }
        $json_str .= "]\n";
		print $json_str;
	}

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

	function maplist( $email ){
		$query = $this->sqlMaplist( $email );
        $result = mysql_query( $query ) or print(mysql_error());
		$this->sql2json( $result );
		return true;
	}

	function jsonMapLoad( $email, $mapName )
	{
		$query = $this->sqlMapLoad( $email, $mapName );
        $result = mysql_query( $query ) or print(mysql_error());
        $row = mysql_fetch_array($result);
		return $row[0];
	}
}

?>