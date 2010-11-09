
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
        var jsMapList = eval("("+strJson+")");  
        console.log(jsMapList);
        var elListBox = document.getElementById("mmList");
        var htmlMapList = "";
        for( var i in jsMapList ){
            htmlMapList += "<div class=\"mapName\" onClick=\"onMMLoad(\"" + jsMapList[i] + "\");\">";
            htmlMapList += jsMapList[i];
            htmlMapList += "</div>";
        }
        elListBox.innerHTML = htmlMapList;
    }
    mmapi.maplist();
    return false;
}

function onMMLoad( mapName ){
    console.log( mapName );
}