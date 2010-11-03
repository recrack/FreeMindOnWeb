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
    var elEmail = document.getElementById("email");
    var elEmailConfirm = document.getElementById("emailConfirm");
    var elError = document.getElementById("errorMsg");
    if( elEmailConfirm.value != elEmail.value ){
        elEmailConfirm.style.backgroundColor = "red";
        elError.style.display = "block";
        elError.innerHTML = "confirm fail";
        return false;
    }
    else{
        elEmailConfirm.style.backgroundColor = "white";
        elError.style.display = "none";
        return true;
    }
}

function emailCheck(){
    console.log("email check");
    var el = document.getElementById("email");
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var address = el.value;
    var elError = document.getElementById("errorMsg");
    if(reg.test(address) == false){
        el.style.backgroundColor = "red";
        elError.style.display = "block";
        elError.innerHTML = "invalidate email";
        return false;
    }
    else{
        el.style.backgroundColor = "white";
        elError.style.display = "none";
        reqCheckId( address );
        return true;
    }
}

function passwdConfirm(){
    console.log("passwd confirm");
    var elPasswd = document.getElementById("passwd");
    var elPasswdConfirm = document.getElementById("passwdConfirm");
    var elError = document.getElementById("errorMsg");
    if( elPasswdConfirm.value != elPasswd.value ){
        elPasswdConfirm.style.backgroundColor = "red";
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

function test(){
    console.log("test out");
    return false;
}

function formConfirm(){
    console.log("form confirm");
    if( !emailCheck() )
        return false;
   if( !emailConfirm() )
        return false;
    if( !passwdConfirm() )
        return false;
    console.log("confirm true");
    return true;

}

function reqCheckId( address ){
    var url = "../php/idCheck.php";
    var params = "email=" + address;
    xmlhttp = new XMLHttpRequest();

    xmlhttp.open("POST", url, true);
    
    xmlhttp.onreadystatechange = function() {
	if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	    var rst = eval(xmlhttp.responseText);
	}
    }
    console.log("request send");
    xmlhttp.send(params);
}

// function rspCheckId( )