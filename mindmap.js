var FocusNode = 0;
const ModeNone = 0, ModeEdit = 1, ModeDrag = 2;
const ModeEsc = 99; // ECS키 이벤트가 2번 발생하는 이상한 현상 때문에 만들어 놓은 녀석. 
var Mode;
var ptDragStart = {"x":0, "y":0};
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

function init( isFrameRateMode ) {
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

function makeNewRootChild(newId, rootNode ){
    var newObj = makeNewNode(newId);
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
    if( numOfLeft > numOfRight )
        newObj['direct'] = "right";
    else
        newObj['direct'] = "left";
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

// mouse move event
function onMouseMoveCanvas(canvas){
    if( Mode == ModeEdit )
        return;
    if( Mode == ModeNone ){
        var evt = window.event || e;
        draw();
        var node = findFocusNodeByPos(RootNode, evt.clientX - canvas.offsetLeft, evt.clientY - canvas.offsetTop);
        if( node != null )
            FocusNode = node.id;
    }
    if( Mode == ModeDrag ){
        var evt = window.event || e;
        var dx = ptDragStart.x - evt.clientX - canvas.offsetLeft;
        var dy = ptDragStart.y - evt.clientY - canvas.offsetTop;
        DrawPosX -= dx;
        DrawPosY -= dy;
        ptDragStart.x = evt.clientX - canvas.offsetLeft;
        ptDragStart.y = evt.clientY - canvas.offsetTop;
        draw();
    }
}

function onMouseDownCanvas(){
    if( Mode == ModeEdit ){
        NodeEditDone();
        Mode = ModeNone;
   }
    Mode = ModeDrag;
    var evt = window.event || e;
    ptDragStart.x = evt.clientX - canvas.offsetLeft;
    ptDragStart.y = evt.clientY - canvas.offsetTop;
}


function onMouseUpCanvas(){
    showMode();
    if( Mode == ModeEdit ){
        NodeEditDone();
        Mode = ModeNone;
    }
    if( Mode == ModeDrag ){
        Mode = ModeNone;
    }
    if( Mode != ModeEdit ){
        var evt = window.event || e;
        var node = findFocusNodeByPos(RootNode, evt.clientX - canvas.offsetLeft, evt.clientY - canvas.offsetTop);
        if( node == null )
            return;
        FocusNode = node.id;
        draw();
        Mode = ModeEdit;
        NodeEdit();
        showMode("editStart");
    }
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

function findFocusNodeByPos(node, x, y){
    if( node.area[0] <= x && node.area[1] <= y && node.area[2] >= x && node.area[3] >= y ){
        return node;
    }
    var retObj;
    for( var i in node.child ){
        retObj = findFocusNodeByPos(node.child[i], x, y);
        if( retObj != null )
            return retObj;
    }
    return null;
}

function NodeAddSibling(){
}

function NodeInsertChild(){
}

function NodeDelete(){
    node = findFocusNode(RootNode);
}

function FocusToLeft(){
    node = findFocusNode(RootNode);
}

function FocusToUp(){
    node = findFocusNode(RootNode);
}

function FocusToRight(){
    node = findFocusNode(RootNode);
}

function FocusToDown(){
    node = findFocusNode(RootNode);
}

function NodeEdit(){
    var input = document.getElementById('input');
    var node = findFocusNode(RootNode);
    input.style.display = "block";
    input.style.left = node.area[0];
    input.style.top = node.area[1];
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

function cancelInput(){
}

// keyboard event
function onKeyUp(){
    var evtobj = window.event ? event : e;
    switch( evtobj.keyCode ){
    case 13:
        // enter key
        console.log("enter key");
        if( Mode == ModeEdit ){
            NodeEditDone();
            Mode = ModeNone;
        }
        if( Mode == ModeNone ){
            NodeAddSibling();
        }
        break;
    case 27:
        // ESC
        console.log("ESC Key");
        if( Mode == ModeEdit ){
            NodeEditCancel();
            Mode = ModeEsc;
        }else if( Mode == ModeEsc ){
            Mode = ModeNone;
        }else if( Mode == ModeNone ){
            DrawPosX = canvas.width/2 - (RootNode.area[2] - RootNode.area[0]);
            DrawPosY = canvas.height/2;
            draw();
        }
        break;
    case 37:
        // left key
        console.log("left key");
        break;
    case 38:
        // up key
        console.log("up key");
        break;
    case 39:
        // right key
        console.log("right key");
        break;
    case 40:
        // down key
        console.log("down key");
        break;
    case 45:
        // insert key
        {
            console.log("insert Key");
            // TODO. list
            findMaxId(RootNode);
            MaxId++;
            var node = findFocusNode(RootNode);
            // check root child or normal child
            var newNode;
            if( node == RootNode ){
                console.log("is root node");
                newNode = makeNewRootChild( MaxId, RootNode );
            }else{
                newNode = makeNewNode(MaxId);
            }
            node.child.push( newNode );
            FocusNode = newNode.id;
            draw();
            Mode = ModeEdit;
            NodeEdit();
        }
        break;
//    case 8:
    case 46:
        // backspace(8), delete key(46)
        {
            console.log("delete Key");
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
        break;
    case 113:
        console.log("F2 key");
        NodeEdit();
        break;
    default:
        console.log("key unkown");
        break;
    }
}


// window resize
