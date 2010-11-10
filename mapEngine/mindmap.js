var FocusNode = 0;

var Mode;
const ModeNone = 0, ModeEdit = 1, ModeDrag = 2;
const ModeEsc = 99; // ECS키 이벤트가 2번 발생하는 이상한 현상 때문에 만들어 놓은 녀석. 
const ModeAfterSibling = 99; // enter 키 이벤트가 2번 발생하는 이상한 현상 때문에 만들어 놓은 녀석. 

var MaxId;

function arrayRemoveByIndex(arrayName, arrayIndex){ 
    arrayName.splice(arrayIndex,1);
}

function showMode(msg){
    switch(Mode){
    case ModeNone:
        console.log(msg, "mode none"); break;
    case ModeDrag:
        console.log(msg, "mode drag"); break;
    case ModeEdit:
        console.log(msg, "mode edit"); break;
    default:
        console.log(msg, "unknown mode"); break;
    }
}

function initCanvas( isFrameRateMode ) {
    initCtrlKey();
    resizeCanvas();
    Mode = ModeNone;
    DrawPosX = 0;
    DrawPosY = 0;
    MaxId = 0;
    draw();
    DrawPosX = canvas.width/2 - (RootNode.area[2] - RootNode.area[0]);
    DrawPosY = canvas.height/2;
    initFrameRate(isFrameRateMode);
    if( isFrameRateMode )
        setInterval(updateFrameRate, 100);
    else
        draw();
}

function initCtrlKey(){
    document.onkeydown = onKeyDown;
    document.onkeyup = onKeyUp;
}

function isMoreRootRight( rootNode ){
    var numOfRight = 0;
    var numOfLeft = 0;
    for( var i in rootNode.child ){
        if( rootNode.child[i].direct == "right" )
            numOfRight++;
        else if( rootNode.child[i].direct == "left" )
            numOfLeft++;
        else
            console.log("root child counting error");
    }
    if( numOfRight > numOfLeft ){
        console.log("right > left");
        return true;
    }
    else{
        console.log("right < left");
        return false;
    }
}

function makeNewRootChild(newId, rootNode ){
    var newObj = makeNewNode(newId);
    if( isMoreRootRight(rootNode) )
        newObj['direct'] = "left";
    else
        newObj['direct'] = "right";
    return newObj;
}

function makeNewNode(newId){
    var newObj = new Object;
    newObj['text'] = "new node";
    newObj['id'] = newId;
    newObj['child'] = new Array();
    newObj['height'] = 0;
    newObj['area'] = [0, 0, 0, 0];
    return newObj;
}


function findMaxId(node){
    if( node.id > MaxId ){
        MaxId = node.id;
    }
    for( var i in node.child ){
        findMaxId( node.child[i] );
    }
}

function findFocusNode(node){
    if( node.id == FocusNode )
        return node;
    var retObj;
    for( var i in node.child ){
        retObj = findFocusNode(node.child[i]);
        if( retObj != null )
            return retObj;
    }
    return null;
}

// findFocusParents
function findFocusNodeParents(node){
    for( var i in node.child ){
        if( node.child[i].id == FocusNode )
            return node;
    }
    var retObj;
    for( var i in node.child ){
        retObj = findFocusNodeParents( node.child[i] );
        if( retObj != null )
            return retObj;
    }
    return null;
}

function findNodeByPos(node, x, y){
    if( node.area[0] <= x && node.area[1] <= y && node.area[2] >= x && node.area[3] >= y ){
        return node;
    }
    if( node.fold )
        return null;
    var retObj;
    for( var i in node.child ){
        retObj = findNodeByPos(node.child[i], x, y);
        if( retObj != null )
            return retObj;
    }
    return null;
}

function NodeEdit(){
    var canvas = document.getElementById("canvas");
    var input = document.getElementById('input');
    var node = findFocusNode(RootNode);
    input.style.display = "block";
    input.style.left = node.area[0];
    input.style.top = node.area[1] + canvas.style.top;
    input.style.width = node.area[2] - node.area[0];
    input.style.height = node.area[3] - node.area[1];
    input.value = node.text;
    input.focus();
}

function NodeEditDone(){
    console.log("NodeEditDone");
    var input = document.getElementById('input');
    var node = findFocusNode(RootNode);
    node.text = input.value;
    input.style.display = "None";
    draw();
}

function NodeEditCancel(){
    console.log("NodeEditCancel");
    var input = document.getElementById('input');
    input.style.display = "None";
    draw();
}

function focusNodeDelete(){
    if( RootNode.id == FocusNode ){
        alert("can not delete root node");
        break;
    }
    var pNode = findFocusNodeParents(RootNode);
    var i = 0;
    for( i=0; i < pNode.child.length; i++ ){
        if( pNode.child[i].id == FocusNode ){
            arrayRemoveByIndex(pNode.child, i);
            break;
        }
    }
    FocusNode = pNode.id;
    draw();
}

