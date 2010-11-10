function onMenuJoinus(){
    var elJoinus = document.getElementById("popupJoinus");
    elJoinus.style.visibility = "visible";
}

function onMenuNew(){
    return false;
}

function onMenuLoad(){
    if( MapModified ){
        var elPopup = document.getElementById("popupLoadConfirm");
        elPopup.style.visibility = "visible";
        popupPosisionCenter(elPopup);
        return;
    }
    else
        onLoadListPopup();
}

function onLoadConfirmYes(){
    document.getElementById("popupLoadConfirm").style.visibility = "hidden";
    onMMSave();
    // TODO. save의 결과를 보고 load를 해야 하는데. 방법이 없다.
    onLoadListPopup();
}

function onLoadConfirmNo(){
    document.getElementById("popupLoadConfirm").style.visibility = "hidden";
    onLoadListPopup();
}

function onLoadConfirmCancel(){
    document.getElementById("popupLoadConfirm").style.visibility = "hidden";
}

function onLoadListPopup(){
    var elPopupLoad = document.getElementById("popupLoad");
    elPopupLoad.style.visibility = "visible";
    // position to center
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
        popupOkOpen("load", "");
    }
    mmapi.MMLoad( mapid );
}

function onMMLoadCancel(){
    document.getElementById("popupLoad").style.visibility = "hidden";
}

function onMenuSave(){
    if( !MapModified )
        return false;
    if( Mapid == -1 ){
        var elPopup = document.getElementById("popupSaveNewConfirm");
        elPopup.style.visibility = "visible";
        popupPosisionCenter(elPopup);
    }
    else{
        onMMSave();
        popupOkOpen("Save", "complete");
    }
    return false;
}

function onSaveNewYes() {
    document.getElementById("popupSaveNewConfirm").style.visibility = "hidden";
    onMMSaveNew();
}

function onSaveNewNo() {
    document.getElementById("popupSaveNewConfirm").style.visibility = "hidden";
}

function popupOkOpen(title, text){
    var elPopup = document.getElementById("popupOk");
    elPopup.style.visibility = "visible";    
    var elTitle = document.getElementById("popupOkTitle");
    elTitle.innerHTML = title;
    var elContent = document.getElementById("popupOkContent");
    elContent.innerHTML = text;
    popupPosisionCenter(elPopup);
}

function popupOkClose(){
    document.getElementById("popupOk").style.visibility = "hidden";    
}


function onMMSave(){
    var mmaip = new MindmapAPI();
    mmaip.MMSaveRsp = function( state ){
        if( !state ){
            Alert("save new fail");
        }
        else {
            MapModified = false;
            popupOkOpen("save", "");
        }

    }
    mmaip.MMSave( JSON.stringify(RootNode), Mapid, RootNode.text );
}

function onMMSaveNew(){
    var mmaip = new MindmapAPI();
    mmaip.MMSaveNewRsp = function( state ){
        if( !state ){
            Alert("save new fail");
        }
        else {
            MapModified = false;
            popupOkOpen("save", "");
        }
    }
    mmaip.MMSaveNew( JSON.stringify(RootNode), RootNode.text );

}

function saveAsNewMap(){
}

