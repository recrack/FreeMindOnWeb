var clipBoard;

// 중요!!
// 호출하기 전에 반드시 findMaxId를 불러줘야 한다.
function makeCopyNode(node){
    var newNode = makeNewNode(++MaxId);
    newNode.text = node.text;
    for( var i in node.child ){
        newNode.child.push( makeCopyNode( node.child[i] ) );
    }
    return newNode;
}
