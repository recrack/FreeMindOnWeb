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
    mmapi.maplistRsp = function( strJson ){
        if( strJson == null ){
            console.log("map list fail");
            return;
        }
        var jsMapList = eval( strJson);
        var elListBox = document.getElementById("mmList");
        var htmlMapList = "";
        for( var i in jsMapList ){
            htmlMapList += "<div class=\"mapName\" onClick=\"onMMLoad(this);\">";
            htmlMapList += jsMapList[i];
            htmlMapList += "</div>";
        }
        elListBox.innerHTML = htmlMapList;
    }
    mmapi.maplist();
    return false;
}

function onMMLoad( elMapName ){
    var mapName = elMapName.innerHTML;
    var mmapi = new MindmapAPI();
    mmapi.MMLoadRsp = function( strJson ) {
        console.log( strJson );
        if( strJson == null ){
            console.log("map data fail");
            return;
        }
        var jsMap = eval( strJson );
        console.log(jsMap);
    }
    mmapi.MMLoad( mapName );
}

