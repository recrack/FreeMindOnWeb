
function onMenuLoad(){
    var elPopupLoad = document.getElementById("popupLoad");
    if( !elPopupLoad ){
        console.log("load box not exist");
        return false;
    }
    // visibility
    if( elPopupLoad.style.visibility == "visible" || elPopupLoad.style.visibility == "" ){
        elPopupLoad.style.visibility = "hidden";
        return false;
    }
    elPopupLoad.style.visibility = "visible";
    // position
    popupPosisionCenter(elPopupLoad);
    // xml request call
    var mmapi = new MindmapAPI();
    mmapi.maplistRsp = function(xml){
        if( xml == null ){
            // 없음.
        }
        // 있음.

    }
    mmapi.maplist();
    return false;
}