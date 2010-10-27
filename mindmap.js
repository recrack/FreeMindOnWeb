var FocusNode = 0;
const ModeNone = 0, ModeEdit = 1, ModeDrag = 2;
var Mode;
var ptDragStart = {"x":0, "y":0};

function findFocus(node, x, y){
    if( node.area[0] <= x && node.area[1] <= y && node.area[2] >= x && node.area[3] >= y ){
        return node;
    }
    var retObj;
    for( var i in node.child ){
        retObj = findFocus(node.child[i], x, y);
        if( retObj != null )
            return retObj;
    }
    return null;
}

// mouse move event
function onMouseMoveCanvas(canvas){
    if( Mode == ModeEdit )
        return;
    if( Mode == ModeNone ){
        var evt = window.event || e;
        draw();
        var node = findFocus(RootNode, evt.clientX - canvas.offsetLeft, evt.clientY - canvas.offsetTop);
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
        var node = findFocus(RootNode, evt.clientX - canvas.offsetLeft, evt.clientY - canvas.offsetTop);
        if( node == null )
            return;
        FocusNode = node.id;
        draw();
        Mode = ModeEdit;
        NodeEdit();
        showMode("editStart");
    }
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
    initFrameRate(isFrameRateMode);
    if( isFrameRateMode )
        setInterval(updateFrameRate, 100);
    else
        draw();
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

function findParentsNode(node){
    for( var i in node.child ){
        if( node.child[i].id == FocusNode )
            return this;
    }
    var retObj;
    for( var i in node.child ){
        retObj = findParentsNode( node.child[i] );
        if( retObj != null )
            return retObjt;
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

function FocusToRoot(){
    FocusNode = RootNode.id;
    draw();
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
        else
            NodeAddSibling();
        break;
    case 27:
        // ESC
        console.log("ESC Key");
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
        console.log("insert Key");
        break;
    case 46:
        // delete key
        console.log("delete Key");
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
