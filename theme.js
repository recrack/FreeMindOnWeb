function mainTheme() {
    window.localStorage['lastConnect'] = new Date().getTime();
    initMap();
    initHelp();
    initPopup();
    initJoinus();
    window.onresize = resizeAll;
}

function resizeAll(){
    initMap();
    initHelp();
}

function initJoinus(){
    var elJoin = document.getElementById("popupJoinus");
    var elEmail = document.getElementById("joinEmail");
    var elEmailConfirm = document.getElementById("joinEmailConfirm");
    var elPasswdConfirm = document.getElementById("joinPasswdConfirm");
    elEmail.onblur = joinEmailCheck;
    elEmailConfirm.onblur = joinEmailConfirm;
    elPasswdConfirm.onblur = joinPasswdConfirm;
}

function mainUser(){
    window.localStorage['lastConnect'] = new Date().getTime();
    initMap();
    initHelp();
    initPopup();
    window.onresize = initMap;
}

function resizeCanvas(){
    var canvas = document.getElementById("canvas");
    var mapBody = document.getElementById("body");
    var canvasWidth = mapBody.clientWidth;
    var canvasHeight = mapBody.clientHeight;
    canvas.setAttribute("width", canvasWidth);
    canvas.setAttribute("height", canvasHeight);
}

function initMap() {
    // body postion
    var menu = document.getElementById("menu");
    var body = document.getElementById("body");
    body.style.height = window.innerHeight - menu.clientHeight - 14;
    initCanvas(0);
}

function initHelp(){
    // help position
    var help = document.getElementById("help");
    help.style.left = window.innerWidth - help.clientWidth - 30;
    help.style.top = menu.clientHeight + 20;
    if( window.localStorage['helpOpen'] != "true" )
        helpToggle();
}

function initPopup(){
    var elPopupLoad = document.getElementById("popupLoad");
    if( elPopupLoad ){
        console.log("load box exist");
        popupPosisionCenter(elPopupLoad);
    }
    var elJoinus = document.getElementById("popupJoinus");
    if( elJoinus ){
        console.log("joinus box exist");
        popupPosisionCenter(elJoinus);
    }
}

function helpToggle(){
    var help = document.getElementById("help");
    if( help.style.display == "block" || help.style.display == "" ){
        help.style.display = "none";
        window.localStorage['helpOpen'] = false;
    }
    else{
        help.style.display = "block";
        window.localStorage['helpOpen'] = true;
    }
}

function popupPosisionCenter(elPopup){
    elPopup.style.left = (document.body.clientWidth - elPopup.clientWidth)/2;    
}