function onMenuJoinus(){
    var elJoinus = document.getElementById("popupJoinus");
    elJoinus.style.visibility = "visible";
}

function onMenuNew(){
    RootNode = {"text":" html5", "id":0, "fold":false, "child":[] }
    return false;
}

function onMenuLoad(){
    var elPopupLoad = document.getElementById("popupLoad");
    if( !elPopupLoad ){
        console.log("load box not exist");
        return false;
    }
    // visibility
    if( elPopupLoad.style.visibility == "visible" ){
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
            htmlMapList += "<div class=\"mapName\" onClick=\"onMMLoad(" + jsMapList[i].mapid + ");\">";
            htmlMapList += jsMapList[i].name;
            htmlMapList += "</div>";
        }
        elListBox.innerHTML = htmlMapList;
    }
    mmapi.maplist();
    return false;
}

function onMMLoad( mapid ){
    var mmapi = new MindmapAPI();
    mmapi.MMLoadRsp = function( strJson, mapid ) {
        if( strJson == null ){
            console.log("map data fail");
            return;
        }
        MapId = mapid;
        RootNode = eval( "(" + strJson + ")" );
        Mapid = mapid;
        // close popup
        var elPopupLoad = document.getElementById("popupLoad");
        elPopupLoad.style.visibility = "hidden";
        // go to center
        DrawPosX = canvas.width/2 - (RootNode.area[2] - RootNode.area[0]);
        DrawPosY = canvas.height/2;
        draw();
    }
    mmapi.MMLoad( mapid );
}

function onMMLoadCancel(){
    document.getElementById("popupLoad").style.visibility = "hidden";
}

function onMenuSave(){
//    if( Mapid == -1 )
//        saveAsNewMap();
    onMMSave();
    return false;
}

function onMMSave(){
    var mmaip = new MindmapAPI();
    mmaip.MMSaveRsp = function( state ){
        if( !state ){
            console.log("fail");
        }
        else 
            console.log("success");
    }
    mmaip.MMSave( JSON.stringify( RootNode), Mapid, RootNode.text );
}

function saveAsNewMap(){
}

