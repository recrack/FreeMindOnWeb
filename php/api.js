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
	this.xmlhttp.open("POST","../php/idCheck.php",true);
	this.xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charaset=UTF-8");
	this.xmlhttp.send("email=" + email);
	this.xmlhttp.onreadystatechange = this.checkEmailCallBack;
	this.xmlhttp.caller = this;
}

MindmapAPI.prototype.checkEmailCallBack = function( rspObj ){
	if ( this.readyState==4 && this.status==200)
		this.caller.checkEmailRsp( this.responseText == '0' );
}


// join
MindmapAPI.prototype.join = function( email, passwd ){
	this.xmlhttp.open("POST","../php/join.php",true);
	this.xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charaset=UTF-8");
	this.xmlhttp.send("email=" + email + "&passwd" + passwd);
	this.xmlhttp.onreadystatechange = this.joinCallBack;
	this.xmlhttp.caller = this;
	
}

MindmapAPI.prototype.joinCallBack = function( rspObj ){
	if ( this.readyState==4 && this.status==200)
		this.caller.joinRsp( this.responseText == '1' );
}
