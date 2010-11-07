function mainTheme() {
    window.localStorage['lastConnect'] = new Date().getTime();
    initMap();
    initHelp();
    window.onresize = initMap;
}

function mainUser(){
    window.localStorage['lastConnect'] = new Date().getTime();
    initMap();
    initHelp();
    window.onresize = initMap;
}

function initMap() {
    // body postion
    var menu = document.getElementById("menu");
    var body = document.getElementById("body");
    body.style.height = window.innerHeight - menu.clientHeight - 14;
    
}

function initHelp(){
    // help position
    var help = document.getElementById("help");
    help.style.left = window.innerWidth - help.clientWidth - 30;
    help.style.top = menu.clientHeight + 20;
    if( window.localStorage['helpOpen'] != "true" )
        helpToggle();
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