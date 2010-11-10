var ptDragStart = {"x":0, "y":0};

// mouse move event
function onMouseMoveCanvas(canvas){
    if( Mode == ModeEdit )
        return;
    if( Mode == ModeNone ){
        var evt = window.event || e;
        draw();
        var node = findNodeByPos(RootNode, evt.clientX - canvas.offsetParent.offsetLeft, evt.clientY - canvas.offsetParent.offsetTop);
        if( node != null )
            FocusNode = node.id;
    }
    if( Mode == ModeDrag ){
        var evt = window.event || e;
        var dx = ptDragStart.x - evt.clientX;
        var dy = ptDragStart.y - evt.clientY;
        DrawPosX -= dx;
        DrawPosY -= dy;
        ptDragStart.x = evt.clientX;
        ptDragStart.y = evt.clientY;
        draw();
    }
}

function onMouseDownCanvas(canvas){
    if( Mode == ModeEdit)
        return;
    Mode = ModeDrag;
    var evt = window.event || e;
    ptDragStart.x = evt.clientX - canvas.offsetParent.offsetLeft;
    ptDragStart.y = evt.clientY - canvas.offsetParent.offsetTop;
}

function onMouseUpCanvas(){
    if( Mode == ModeEdit ){
        NodeEditDone();
        Mode = ModeNone;
    }
    if( Mode == ModeDrag ){
        Mode = ModeNone;
   }
 }

function onMouseDbClickCanvas(canvas){
    if( Mode == ModeEdit ){
        NodeEditDone();
    }
    var evt = window.event || e;
    var node = findNodeByPos(RootNode, evt.clientX - canvas.offsetParent.offsetLeft, evt.clientY - canvas.offsetParent.offsetTop);
    if( node == null )
        return;
    FocusNode = node.id;
    draw();
    Mode = ModeEdit;
    NodeEdit();
}

function onMouseClickCanvas(canvas){
    // node folding    
    if( Mode == ModeEdit ){
        NodeEditDone();
        Mode = ModeNone;
    }
    else if( Mode != ModeEdit ){
        // update focus
        var evt = window.event || e;
        draw();
        var node = findNodeByPos(RootNode, evt.clientX - canvas.offsetParent.offsetLeft, evt.clientY - canvas.offsetParent.offsetTop);
        if( node == null )
            return;
        FocusNode = node.id;
        // fold
        if( FocusNode == RootNode.id )
            return;
        if( node.child.length == 0 )
            return;
        node.fold = node.fold ? false : true;
        draw();
    }
}