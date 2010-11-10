function onMenuJoinus(){
    var elJoin = document.getElementById("popupJoinus");
    elJoin.style.visibility = "visible";
}

function mainJoin(){
    initMap();
    var elEmail = document.getElementById("joinEmail");
    var elEmailConfirm = document.getElementById("joinEmailConfirm");
    var elPasswdConfirm = document.getElementById("joinPasswdConfirm");
    elEmail.onblur = emailCheck;
    elEmailConfirm.onblur = emailConfirm;
    elPasswdConfirm.onblur = passwdConfirm;
    initPopup();
}

function emailConfirm(){
    console.log("email confirm");
    if( !emailCheck() )
	return false;
    var elEmail = document.getElementById("joinEmail");
    var elEmailConfirm = document.getElementById("joinEmailConfirm");
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
    var elEmail = document.getElementById("joinEmail");
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
    var elPasswd = document.getElementById("joinPasswd");
    var elPasswdConfirm = document.getElementById("joinPasswdConfirm");
    var elError = document.getElementById("joinusError");
    var elEmail = document.getElementById("joinEmail");
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
    var elEmail = document.getElementById("joinEmail");
    var elPasswd = document.getElementById("joinPasswd");
    var elError = document.getElementById("joinusError");
    var mmapi = new MindmapAPI();
    mmapi.joinRsp = function(boolResult){
	if(boolResult){
	    var divPopupFail = document.getElementById("popupJoinFail");
	    divPopupFail.style.display = "none";
	    var divPopupOk = document.getElementById("popupJoinOk");
	    divPopupOk.style.display = "block";
	    var divPopupJoin = document.getElementById("popupJoinus");
	    divPopupJoin.style.display = "none";
            popupPosisionCenter(divPopupOk);
	}else{
	    var divPopupFail = document.getElementById("popupJoinFail");
	    divPopupFail.style.display = "block";
	    var divPopupOk = document.getElementById("popupJoinOk");
	    divPopupOk.style.display = "none";
	    var divPopupJoin = document.getElementById("popupJoinus");
	    divPopupJoin.style.display = "none";
            popupPosisionCenter(divPopupFail);
	}
    }
    mmapi.join( elEmail.value, elPasswd.value );
    return false;
    
}

function joinComplete(){
}

function joinCancel(){
    var elJoin = document.getElementById("popupJoinus");
    elJoin.style.visibility = "hidden";
}

function joinRetry(){
    var elEmail = document.getElementById("joinEmail");
    var elPasswd = document.getElementById("joinPasswd");
    var elEmailConfirm = document.getElementById("joinEmailConfirm");	
    var elPasswdConfirm = document.getElementById("joinPasswdConfirm");
    elEmail.value = "";
    elEmailConfirm.value = "";
    elPasswd.value = "";
    elPasswdConfirm.value = "";
    
    var divPopupFail = document.getElementById("popupJoinFail");
    divPopupFail.style.display = "none";
    var divPopupOk = document.getElementById("popupJoinOk");
    divPopupFail.style.display = "none";
	var divPopupJoin = document.getElementById("popupJoinus");
    divPopupJoin.style.display = "block";
    
}