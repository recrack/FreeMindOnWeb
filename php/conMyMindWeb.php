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
		return "SELECT name, mapName.mapid FROM `mapName`, `owner` WHERE mapName.mapid = owner.mapid AND owner.owner = '" . $email . "'";
	}

	function sqlMapLoad( $email, $mapid )
	{
		return "SELECT map.mapdata FROM  `mapName`, `map`, `owner` WHERE mapName.mapid = map.mapid AND mapName.mapid = " . $mapid . " AND owner.mapid = map.mapid AND owner = '" . $email . "'";
	}

	function sqlUpdateMapName( $email, $mapid, $mapName )
	{
		// UPDATE  `myMindWeb`.`mapName` SET  `name` =  'map name 15' WHERE  `mapName`.`mapid` =1 AND ( SELECT mapid FROM owner WHERE owner = 'beonit@gmail.com' AND mapid = 1 )
		return "UPDATE `mapName` SET  `name` =  '".$mapName."' WHERE  `mapName`.`mapid` = " . $mapid . " AND ( SELECT mapid FROM owner WHERE owner = '".$email."' AND mapid = ".$mapid." )";
	}
	
	function sqlUpdateMapData( $email, $mapid, $mapData)
	{
		return "UPDATE `map` SET  `mapdata` =  '".$mapData."' WHERE  `map`.`mapid` = " . $mapid . " AND ( SELECT mapid FROM owner WHERE owner = '".$email."' AND mapid = ".$mapid." )";
	}

	function sqlGetMaxId()
	{
		return "SELECT MAX(mapid) FROM `mapName`";
	}
	
	function sqlInsData( $mapid, $mapData )
	{
		return "INSERT INTO `map` (`mapid`, `mapData`) VALUES ('".$mapid."', '".$mapData."');";
	}
	
	function sqlInsOwner( $mapid, $email )
	{
		return "INSERT INTO `owner` (`mapid`, `owner`) VALUES ('".$mapid."', '".$email."');";
	}
	
	function sqlInsName( $mapid, $mapName )
	{
		return "INSERT INTO `mapName` (`mapid`, `name`) VALUES ('".$mapid."', '".$mapName."');";
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

	function jsonMapLoad( $email, $mapid )
	{
		$query = $this->sqlMapLoad( $email, $mapid );
        $result = mysql_query( $query ) or print(mysql_error());
        $row = mysql_fetch_array($result);
		return $row[0];
	}

	function boolMapSave( $email, $mapData, $mapid, $mapName )
	{
		// transaction need but...
		$queryUpName = $this->sqlUpdateMapName( $email, $mapid, $mapName );
		$queryUpData = $this->sqlUpdateMapData( $email, $mapid, $mapData );
        $result = mysql_query( $queryUpName ) or print(mysql_error());
		if( !$result )
			return $result;
		$result = mysql_query( $queryUpData ) or print(mysql_error());
		return $result;
	}
	
	function boolMapSaveNew( $email, $mapData, $mapName )
	{
		// transaction need but...
		// get max id
		$queryGetMaxId = $this->sqlGetMaxId();
		$result = mysql_query( $queryGetMaxId ) or print(mysql_error());
        $row = mysql_fetch_array($result);
		$mapid = $row[0] + 1;
		// insert data
		$queryInsData = $this->sqlInsData( $mapid, $mapData );
		$result = mysql_query( $queryInsData ) or print(mysql_error());
		if( !$result )
			return $result;
		// insert owner
		$queryInsOwner = $this->sqlInsOwner( $mapid, $email );
		$result = mysql_query( $queryInsOwner ) or print(mysql_error());
		if( !$result )
			return $result;
		// insert name
		$queryInsName = $this->sqlInsName( $mapid, $mapName );
		$result = mysql_query( $queryInsName ) or print(mysql_error());
		return $result;
	}
}

?>

