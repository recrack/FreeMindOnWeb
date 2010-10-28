var isCtrl = false;

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

function onKeyDown(e){
    if(e.which == 17) isCtrl=true;
    if( isCtrl == false )
        return;
    if( Mode == ModeEdit )
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
            if( FocusNode == RootNode.id )
                return;
            var cNode = findFocusNode(RootNode);
            var pNode = findFocusNodeParents(RootNode);
            var i=0;
            var len = pNode.child.length;
            for( ; i< len; i++){
                if( cNode == pNode.child[i] ) break;
            }
            if( i == len-1 || i == len )
                return;
            var t = pNode.child[i];
            pNode.child[i] = pNode.child[i+1];
            pNode.child[i+1] = t;
            draw();
            return;
            return;
        }
    case 38:
        {
            // up key
            if( FocusNode == RootNode.id )
                return;
            var cNode = findFocusNode(RootNode);
            var pNode = findFocusNodeParents(RootNode);
            var i=0;
            var len = pNode.child.length;
            for( ; i< len; i++){
                if( cNode == pNode.child[i] ) break;
            }
            if( i == 0 || i == len )
                return;
            var t = pNode.child[i];
            pNode.child[i] = pNode.child[i-1];
            pNode.child[i-1] = t;
            draw();
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
