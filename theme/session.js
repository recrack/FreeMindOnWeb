function emailCheck(){
    var elEmail = document.getElementById("email");
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test(elEmail.value);
}

function mmlogin(){
    console.log("login");
    var elEmail = document.getElementById("email");
    if( !emailCheck() ){
        var elError = document.getElementById("errorMsg");
        elError.innerHTML = "email validation fail";
        elEmail.focus();
        return false;
    }
        
    // xml request call
    var mmapi = new MindmapAPI();
    mmapi.loginRsp = function(boolResult){
	if( boolResult ){
            window.location = "./mindmap.html";
            return false;
	}
	else{
            var elEmail = document.getElementById("email");
            var elPasswd = document.getElementById("passwd");
            elEmail.focus();
            elPasswd.value = "";
            var elError = document.getElementById("errorMsg");
            elError.innerHTML = "check id or passwd";
            return false;
	}
    }
    var elPasswd = document.getElementById("passwd");
    mmapi.login( elEmail.value, elPasswd.value );
    return false;
}