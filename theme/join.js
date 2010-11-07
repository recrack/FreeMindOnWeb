
function mainJoin(){
    initMap();
    var elEmail = document.getElementById("email");
    var elEmailConfirm = document.getElementById("emailConfirm");
    var elPasswdConfirm = document.getElementById("passwdConfirm");
    elEmail.onblur = emailCheck;
    elEmailConfirm.onblur = emailConfirm;
    elPasswdConfirm.onblur = passwdConfirm;

}

function emailConfirm(){
    console.log("email confirm");
	if( !emailCheck() )
		return false;
    var elEmail = document.getElementById("email");
    var elEmailConfirm = document.getElementById("emailConfirm");
    var elError = document.getElementById("joinusError");
    if( elEmailConfirm.value != elEmail.value ){
        elEmailConfirm.style.backgroundColor = "red";
        elError.style.display = "block";
        elError.innerHTML = "confirm fail";
        return false;
    }
    else{
        elEmailConfirm.style.backgroundColor = "green";
        elError.style.display = "none";
        return true;
    }
}

function emailCheck(){
    var elEmail = document.getElementById("email");
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var elError = document.getElementById("joinusError");
    if(reg.test(elEmail.value) == false){
        elEmail.style.backgroundColor = "red";
        elError.style.display = "block";
        elError.innerHTML = "invalidate email";
        return false;
    }
    else{
        elEmail.style.backgroundColor = "white";
        elError.style.display = "none";
		// xml request call
		var mmapi = new MindmapAPI();
		mmapi.checkEmailRsp = function(boolResult){
			if( boolResult ){
				elEmail.style.backgroundColor = "green";
			}
			else{
				elEmail.style.backgroundColor = "red";
				elError.style.display = "block";
				elError.innerHTML = "email address exist";
			}
		}
		mmapi.checkEmail( elEmail.value );
        return true;
    }
}

function passwdConfirm(){
    var elPasswd = document.getElementById("passwd");
    var elPasswdConfirm = document.getElementById("passwdConfirm");
    var elError = document.getElementById("joinusError");
    var elEmail = document.getElementById("email");
    if( elPasswdConfirm.value != elPasswd.value ){
        elPasswdConfirm.style.backgroundColor = "red";
        elEmail.style.backgroundColor = "red";
        elError.style.display = "block";
        elError.innerHTML = "passwd confirm fail";
        return false;
    }
    else{
        elPasswdConfirm.style.backgroundColor = "white";
        elError.style.display = "none";
        return true;
    }
}

function formConfirm(){
    if( !emailCheck() )
        return false;
   if( !emailConfirm() )
        return false;
    if( !passwdConfirm() )
        return false;
    console.log("confirm true");
	var elEmail = document.getElementById("email");
    var elPasswd = document.getElementById("passwd");
    var elError = document.getElementById("joinusError");
	var mmapi = new MindmapAPI();
	mmapi.joinRsp = function(boolResult){
		if(boolResult){
			var divPopupFail = document.getElementById("popupFail");
			divPopupFail.style.display = "none";
			var divPopupOk = document.getElementById("popupOk");
			divPopupOk.style.display = "block";
			var divPopupJoin = document.getElementById("popupJoinus");
			divPopupJoin.style.display = "none";
		}else{
			var divPopupFail = document.getElementById("popupFail");
			divPopupFail.style.display = "block";
			var divPopupOk = document.getElementById("popupOk");
			divPopupOk.style.display = "none";
			var divPopupJoin = document.getElementById("popupJoinus");
			divPopupJoin.style.display = "none";
		}
	}
	mmapi.join( elEmail.value, elPasswd.value );
    return false;

}

function joinOk(){
	window.location = "./"
}

function joinRetry(){
	var elEmail = document.getElementById("email");
    var elPasswd = document.getElementById("passwd");
    var elEmailConfirm = document.getElementById("emailConfirm");	
    var elPasswdConfirm = document.getElementById("passwdConfirm");
	elEmail.value = "";
	elEmailConfirm.value = "";
	elPasswd.value = "";
	elPasswdConfirm.value = "";

	var divPopupFail = document.getElementById("popupFail");
	divPopupFail.style.display = "none";
	var divPopupOk = document.getElementById("popupOk");
	divPopupFail.style.display = "none";
	var divPopupJoin = document.getElementById("popupJoinus");
	divPopupJoin.style.display = "block";

}