var MindmapAPI = function(){
    this.xmlhttp = null;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
	this.xmlhttp = new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
	this.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
}

// id duplicate check
MindmapAPI.prototype.checkEmail = function(email){
    this.xmlhttp.open("POST","./php/idCheck.php",true);
    this.xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charaset=UTF-8");
    this.xmlhttp.onreadystatechange = this.checkEmailCallBack;
    this.xmlhttp.caller = this;
    this.xmlhttp.send("email=" + email);
}

MindmapAPI.prototype.checkEmailCallBack = function( rspObj ){
    if ( this.readyState==4 && this.status==200)
	this.caller.checkEmailRsp( this.responseText == '0' );
}


// join
MindmapAPI.prototype.join = function( email, passwd ){
    console.log(email, passwd);
    this.xmlhttp.open("POST","./php/join.php",true);
    this.xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charaset=UTF-8");
    this.xmlhttp.onreadystatechange = this.joinCallBack;
    this.xmlhttp.caller = this;
    this.xmlhttp.send("email=" + email + "&passwd=" + passwd);
}

MindmapAPI.prototype.joinCallBack = function( rspObj ){
    if ( this.readyState==4 && this.status==200)
	this.caller.joinRsp( this.responseText == '1' );
}

// login
MindmapAPI.prototype.login = function( email, passwd ){
    this.xmlhttp.open("POST","./php/login.php",true);
    this.xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charaset=UTF-8");
    this.xmlhttp.onreadystatechange = this.loginCallBack;
    this.xmlhttp.caller = this;
    this.xmlhttp.send("email=" + email + "&passwd=" + passwd);
}

MindmapAPI.prototype.loginCallBack = function( rspObj ){
    if ( this.readyState==4 && this.status==200)

	this.caller.loginRsp( this.responseText == '1' );
}

// logout
MindmapAPI.prototype.logout = function(){
    this.xmlhttp.open("GET","./php/logout.php", true);
    this.xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charaset=UTF-8");   
    this.xmlhttp.onreadystatechange = this.logoutCallBack;
    this.xmlhttp.caller = this;
    this.xmlhttp.send();
}

MindmapAPI.prototype.logoutCallBack = function( rspObj ){
    if ( this.readyState==4 && this.status==200)
	this.caller.logoutRsp( this.responseText == '1' );
}

// map list
MindmapAPI.prototype.maplist = function(){
    this.xmlhttp.open("GET","./php/maplist.php", true);
    this.xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charaset=UTF-8");   
    this.xmlhttp.onreadystatechange = this.maplistCallBack;
    this.xmlhttp.caller = this;
    this.xmlhttp.send();
}

MindmapAPI.prototype.maplistCallBack = function( rspObj ){
    if ( this.readyState==4 && this.status==200)
	this.caller.maplistRsp( this.responseText );
}

// MM load
MindmapAPI.prototype.MMLoad = function(mapid){
    this.xmlhttp.open("POST","./php/mapLoad.php", true);
    this.xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charaset=UTF-8");   
    this.xmlhttp.onreadystatechange = this.MMLoadCallBack;
    this.xmlhttp.caller = this;
    this.xmlhttp.send("mapid=" + mapid);
}

MindmapAPI.prototype.MMLoadCallBack = function( rspObj ){
    if ( this.readyState==4 && this.status==200){
	this.caller.MMLoadRsp( this.responseText );
    }
}
