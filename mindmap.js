var FocusNode = 0;
const ModeNone = 0, ModeEdit = 1, ModeDrag = 2;
const ModeEsc = 99; // ECS키 이벤트가 2번 발생하는 이상한 현상 때문에 만들어 놓은 녀석. 
const ModeAfterSibling = 99; // enter 키 이벤트가 2번 발생하는 이상한 현상 때문에 만들어 놓은 녀석. 
var Mode;
var ptDragStart = {"x":0, "y":0};
var MaxId;
var isCtrl = false;

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
function onKeyDown(e){
    if(e.which == 17) isCtrl=true;
    if( isCtrl == false )
        return;
    switch( e.which ){
    case 83:
        // do save, "ctrl + S"
        break;
    case 86:
        {
            // do paste, "ctrl + V"
            var cNode = findFocusNode(RootNode);
            if( cNode == RootNode ){
                // paste to root node                
                if( isMoreRootRight(RootNode) ){
                    console.log("left");
                    clipBoard['direct'] = "left";
                }
                else{
                    console.log("right");
                    clipBoard['direct'] = "right";
                }
            }
            // paste
            cNode.child.push( clipBoard );
            draw();
            // refresh clipboard
            findMaxId( RootNode );
            clipBoard = makeCopyNode( clipBoard );
            return;
	}
    case 67:
        {
            // do copy, "ctrl + C"
            findMaxId( RootNode );
            var node = findFocusNode( RootNode );
            clipBoard = makeCopyNode( node );
            return;
        }
    case 88:
        {
            // do cut, "ctrl + X"
            findMaxId( RootNode );
            var node = findFocusNode( RootNode );
            clipBoard = makeCopyNode( node );
            focusNodeDelete();
            return;
        }
    case 40:
        {
            // down key
            console.log("C-down");
            return;
        }
    case 38:
        {
            // up key
            console.log("C-up");
            return;
        }
    case 39:
        {
            // right key
            console.log("C-right");
            return;
        }
    case 37:
        {
            // left key
            console.log("C-left");
            return;
        }
    }
}
function initCtrlKey(){
    document.onkeyup=function(e){
	if(e.which == 17) isCtrl=false;
    }
    document.onkeydown = onKeyDown;
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

// mouse move event
function onMouseMoveCanvas(canvas){
    if( Mode == ModeEdit )
        return;
    if( Mode == ModeNone ){
        var evt = window.event || e;
        draw();
        var node = findNodeByPos(RootNode, evt.clientX - canvas.offsetLeft, evt.clientY - canvas.offsetTop);
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
        var node = findNodeByPos(RootNode, evt.clientX - canvas.offsetLeft, evt.clientY - canvas.offsetTop);
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

function findNodeByPos(node, x, y){
    if( node.area[0] <= x && node.area[1] <= y && node.area[2] >= x && node.area[3] >= y ){
        return node;
    }
    var retObj;
    for( var i in node.child ){
        retObj = findNodeByPos(node.child[i], x, y);
        if( retObj != null )
            return retObj;
    }
    return null;
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

// keyboard event
function onKeyUp(){
    var evtobj = window.event ? event : e;
    if( isCtrl == true )
        return;
    switch( evtobj.keyCode ){
    case 13:
        // enter key
        console.log("enter key");
        if( Mode == ModeEdit ){
            NodeEditDone();
            Mode = ModeAfterSibling;
        }
        else if( Mode == ModeAfterSibling ){
            Mode = ModeNone;
        }
        else if( Mode == ModeNone ){
            if( FocusNode == RootNode.id )
                break;
            findMaxId(RootNode);
            MaxId++;
            var cNode = findFocusNode(RootNode);
            var pNode = findFocusNodeParents(RootNode);
            var newNode;
            // check direction
            if( pNode == RootNode ){
                newNode = makeNewRootChild( MaxId, RootNode );
                newNode.direct = cNode.direct;
            }else{
                newNode = makeNewNode(MaxId);
            }
            // insert specific pos
            for( var i=0; i < pNode.child.length; i++ ){
                if( pNode.child[i].id == FocusNode ){
                    pNode.child.splice( i+1, 0, newNode );
                    break;
                }
            }
            // focus and edit
            FocusNode = newNode.id;
            draw();
            Mode = ModeEdit;
            NodeEdit();
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
        if( Mode == ModeEdit )
            return;
        // left key
        // for root
        if( FocusNode == RootNode.id ){
            for( var i in RootNode.child ){
                if( RootNode.child[i].direct == "left"){
                    FocusNode = RootNode.child[i].id;
                    draw();
                    return;
                }
            }
        }
        // for child
        var node = findFocusNode(RootNode);
        if( RootNode.area[0] < node.area[0] ){
            // go parents
            FocusNode = findFocusNodeParents(RootNode).id;
        }else{
            // go child
            if( node.child.length == 0 )
                break;
            FocusNode = node.child[0].id;
        }
        draw();
        break;
    case 39:
        if( Mode == ModeEdit )
            return;
        // right key
        // for root
        if( FocusNode == RootNode.id ){
            for( var i in RootNode.child ){
                if( RootNode.child[i].direct == "right"){
                    FocusNode = RootNode.child[i].id;
                    draw();
                    return;
                }
            }
        }
        // for child
        var node = findFocusNode(RootNode);
        if( RootNode.area[0] > node.area[0] ){
            // go parents
            FocusNode = findFocusNodeParents(RootNode).id;
        }else{
            // go child
            if( node.child.length == 0 )
                break;
            FocusNode = node.child[0].id;
        }
        draw();
        break;
    case 38:
        {
            if( Mode == ModeEdit )
                return;
            // up key
            if( FocusNode == RootNode.id )
                break;
            var node = findFocusNode(RootNode);
            var posX;
            if( RootNode.area[0] < node.area[0] ){
                // right node
                posX = node.area[0] + 10;
            }else{
                // left node
                posX = node.area[2] - 10;
            }
            var posY = ( node.area[1] + node.area[3] ) / 2;
            var newFocus = null;
            for( ; posY >= 0; posY -= NodeFontHeight ){
                newFocus = findNodeByPos( RootNode, posX, posY );
                if( newFocus != null && node != newFocus ){
                    FocusNode = newFocus.id;
                    draw();
                    break;
                }
            }
            break;
        }
    case 40:
        {
            if( Mode == ModeEdit )
                return;
            // down key
            if( FocusNode == RootNode.id )
                break;
            var node = findFocusNode(RootNode);
            var node = findFocusNode(RootNode);
            var posX;
            if( RootNode.area[0] < node.area[0] ){
                // right node
                posX = node.area[0] + 10;
            }else{
                // left node
                posX = node.area[2] - 10;
            }
            var posY = ( node.area[1] + node.area[3] ) / 2;
            var newFocus = null;
            var maxHeight = window.innerHeight;
            for( ; posY >= 0 && posY <= maxHeight; posY += NodeFontHeight ){
                newFocus = findNodeByPos( RootNode, posX, posY );
                if( newFocus != null && node != newFocus ){
                    FocusNode = newFocus.id;
                    draw();
                    break;
                }
            }
        }
        break;
    case 45:
        // insert key
        {
            if( Mode == ModeEdit )
                return;
            console.log("insert Key");
            findMaxId(RootNode);
            MaxId++;
            var node = findFocusNode(RootNode);
            // check root child or normal child
            var newNode;
            if( node == RootNode ){
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
        if( Mode == ModeEdit )
            return;
        // backspace(8), delete key(46)
        focusNodeDelete();
        break;
    case 113:
        if( Mode == ModeEdit )
            return;
        // F2 key
        NodeEdit();
        Mode = ModeEdit;
        break;
    default:
        console.log("key unkown");
        break;
    }
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