var clipBoard;

// important!
// before call this function, you must call findMaxId
function makeCopyNode(node){
    var newNode = makeNewNode(++MaxId);
    newNode.text = node.text;
    for( var i in node.child ){
        newNode.child.push( makeCopyNode( node.child[i] ) );
    }
    return newNode;
}
