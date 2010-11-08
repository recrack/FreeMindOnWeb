
function onMenuLoad(){
    var elPopupLoad = document.getElementById("load");
    if( !elPopupLoad ){
        // visibility
        if( elPopupLoad.style.visibility == "visible" ){
            elPopupLoad.style.visibility = "hidden";
            return false;
        }
        elPopupLoad.style.visibility = "visible";
        // position
        popupLoadPosision(elPopupLoad);
        return false;
    }
}