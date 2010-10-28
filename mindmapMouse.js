var ptDragStart = {"x":0, "y":0};

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
    if( Mode == ModeEdit)
        return;
    Mode = ModeDrag;
    var evt = window.event || e;
    ptDragStart.x = evt.clientX - canvas.offsetLeft;
    ptDragStart.y = evt.clientY - canvas.offsetTop;
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

function onMouseDbClickCanvas(){
    if( Mode == ModeEdit ){
        NodeEditDone();
    }
    var evt = window.event || e;
    var node = findNodeByPos(RootNode, evt.clientX - canvas.offsetLeft, evt.clientY - canvas.offsetTop);
    if( node == null )
        return;
    FocusNode = node.id;
    draw();
    Mode = ModeEdit;
    NodeEdit();
}

function onMouseClickCanvas(){
    // node folding    
    if( Mode == ModeEdit ){
        NodeEditDone();
        Mode = ModeNone;
    }
    else if( Mode != ModeEdit ){
        // update focus
        var evt = window.event || e;
        draw();
        var node = findNodeByPos(RootNode, evt.clientX - canvas.offsetLeft, evt.clientY - canvas.offsetTop);
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