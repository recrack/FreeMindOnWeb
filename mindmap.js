var NodePaddingW = 3;
var NodePaddingH = 3;
var NodeMarginW = 15;
var NodeMarginH = 3;
var NodeRadius = 5;
var NodeFontHeight = 20;
var NodeBGColor = "white";
var NodeEdgeColor = "black";
var NodeTextColor = "black";
var NodeUnderLineMargin = 3;
var EdgeBezier = 20;
var FocusNode = 0;
var FocusBGColor = "gray";
var ModeEdit = false;

var RootNode = {"text":"hello html5", "id":0, "child":[{"text":"html5 is gooooooood", "id":1, "child":null, "direct":"left"}
                                           , {"text":"this is true", "id":2, "child":[{"text":"beonit", "id":3, "child":null}
                                                                              , {"text":"enoch", "id":4, "child":[{"text":"beonit", "id":5, "child":null}
                                                                                                          , {"text":"loves2", "id":6, "child":null}]
                                                                                }
                                                                              , {"text":"loves", "id":7, "child":null}], "direct":"right"
                                             }, {"text":"test", "id":8, "child":null, "direct":"left"}]
           };

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke == "undefined" ) {
        stroke = true;
    }
    if (typeof radius === "undefined") {
        radius = 5;
    }
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (stroke) {
        ctx.stroke();
    }
    if (fill) {
        ctx.fill();
    }
}

function measureNode(node){
    node["height"] = 0;
    // no child
    if( node.child == null ){
        node.height = NodeFontHeight + NodePaddingH * 2 + NodeMarginH * 2;
        return node.height;
    }
    // has child
    for( var i in node.child ){
        node.height += measureNode(node.child[i]);
    }
    return node.height;
}

function measureNodeRight(node){
    node["heightRight"] = 0;
    // no child
    if( node.child == null ){
        node.heightRight = NodeFontHeight + NodePaddingH * 2 + NodeMarginH * 2;
        return node.heightRight;
    }
    // has child
    for( var i in node.child ){
        if( node.child[i].direct != "right" )
            continue;
        node.heightRight += measureNode(node.child[i]);
    }
    return node.heightRight;
}

function measureNodeLeft(node){
    node["heightLeft"] = 0;
    // no child
    if( node.child == null ){
        node.heightLeft = NodeFontHeight + NodePaddingH * 2 + NodeMarginH * 2;
        return node.heightLeft;
    }
    // has child
    for( var i in node.child ){
        if( node.child[i].direct != "left" )
            continue;
        node.heightLeft += measureNode(node.child[i]);
    }
    return node.heightLeft;
}

function nodeDrawRight(ctx, x, y, node){
    // calc rect
    var calcRt = ctx.measureText(node.text);
    // focus rect
    node["area"] = [x, y, x+calcRt.width, y+NodeFontHeight];
    if( FocusNode == node.id ){
        ctx.fillStyle = FocusBGColor;
        ctx.fillRect(x, y, calcRt.width, NodeFontHeight);
    }
    // draw underline
    ctx.beginPath();
    ctx.strokeStyle = NodeEdgeColor;
    ctx.moveTo(x, y + NodeFontHeight + NodeUnderLineMargin);
    ctx.lineTo(x + calcRt.width, y + NodeFontHeight + NodeUnderLineMargin);
    ctx.closePath();
    ctx.stroke();
    // draw text
    ctx.fillStyle = NodeTextColor;
    ctx.fillText(node.text, x, y);
    // draw child
    if( node.child == null )
        return;
    var startY = y - node.height/2 + NodeMarginH * 2;
    var childHeight = 0;
    for( var i in node.child ){
        childHeight = node.child[i].height;
        calcChildRt = ctx.measureText(node.child[i].text);
        edgeDrawRight(ctx, x + calcRt.width, y + NodeFontHeight + NodeUnderLineMargin
                 , x + calcRt.width + NodePaddingW * 2 + NodeMarginW * 2
                 , startY + childHeight/2 + NodeFontHeight/2 + NodeUnderLineMargin, node.child[i]);
        nodeDrawRight(ctx, x + calcRt.width + NodePaddingW * 2 + NodeMarginW * 2, startY + childHeight/2 - NodeFontHeight/2, node.child[i]);
        startY += childHeight;
    }
}

function nodeDrawLeft(ctx, x, y, node){
    // calc rect
    var calcRt = ctx.measureText(node.text);
    // focus rect
    node["area"] = [x - calcRt.width, y, x, y+NodeFontHeight];
    if( FocusNode == node.id ){
        ctx.fillStyle = FocusBGColor;
        ctx.fillRect(x - calcRt.width, y, calcRt.width, NodeFontHeight);
    }
    // draw underline
    ctx.beginPath();
    ctx.strokeStyle = NodeEdgeColor;
    ctx.moveTo(x, y + NodeFontHeight + NodeUnderLineMargin);
    ctx.lineTo(x - calcRt.width, y + NodeFontHeight + NodeUnderLineMargin);
    ctx.closePath();
    ctx.stroke();
    // draw text
    ctx.fillStyle = NodeTextColor;
    ctx.fillText(node.text, x - calcRt.width, y);
    // draw child
    if( node.child == null )
       return;
    var startY = y - node.height/2 + NodeMarginH * 2;
    var childHeight = 0;
    for( var i in node.child ){
        calcChildRt = ctx.measureText(node.child[i].text);
        childHeight = node.child[i].height;
        edgeDrawLeft(ctx, x - calcRt.width, y + NodeFontHeight + NodeUnderLineMargin
                 , x - calcRt.width - NodePaddingW * 2 - NodeMarginW * 2
                 , startY + childHeight/2 + NodeFontHeight/2 + NodeUnderLineMargin, node.child[i]);
        nodeDrawLeft(ctx, x - calcRt.width - NodePaddingW * 2 - NodeMarginW * 2, startY + childHeight/2 - NodeFontHeight/2, node.child[i]);
        startY += childHeight;
    }
}

function nodeDrawRoot(ctx, x, y, node){
    // calc rect
    var calcRt = ctx.measureText(node.text);
    // focus rect
    node["area"] = [x - NodePaddingW, y-NodePaddingH, x - NodePaddingW + calcRt.width + NodePaddingW*2, y - NodePaddingH + NodeFontHeight + NodePaddingH*2];
    if( FocusNode == node.id ){
        ctx.fillStyle = FocusBGColor;
        ctx.fillRect(node.area[0], node.area[1], calcRt.width, NodeFontHeight);
    }else{
        // draw rect
        ctx.fillStyle = NodeBGColor;
    }
    roundRect(ctx, x - NodePaddingW, y-NodePaddingH, calcRt.width + NodePaddingW*2, NodeFontHeight + NodePaddingH*2, NodeRadius, true, true);
    // draw text
    ctx.fillStyle = NodeTextColor;
    ctx.fillText(node.text, x, y);
    // draw child
    if( node.child == null )
        return;
    var calcRt = ctx.measureText(node.text);
    var startYLeft  = y - node.heightLeft/2 + NodeMarginH * 2;
    var startYRight = y - node.heightRight/2 + NodeMarginH * 2;
    for( var i in node.child ){
        calcChildRt = ctx.measureText(node.child[i].text);
        if( node.child[i].direct == "right" ){
            childHeight = node.child[i].height;
            // draw edge
            edgeDrawRight(ctx, x + calcRt.width + NodePaddingW, y + (NodeFontHeight + NodePaddingH*2)/2
                     , x + calcRt.width + NodePaddingW * 2 + NodeMarginW * 2
                     , startYRight + childHeight/2 + NodeUnderLineMargin + NodeFontHeight/2);
            // draw node
            nodeDrawRight(ctx, x + calcRt.width + NodePaddingW * 2 + NodeMarginW * 2, startYRight + childHeight/2 - NodeFontHeight/2, node.child[i]);
            startYRight += childHeight;
        }else if( node.child[i].direct == "left" ){
            childHeight = node.child[i].height;
            // draw edge
            edgeDrawLeft(ctx, x - NodePaddingW, y + (NodeFontHeight + NodePaddingH*2)/2
                     , x - NodePaddingW * 2 - NodeMarginW * 2
                     , startYLeft + childHeight/2 + NodeUnderLineMargin + NodeFontHeight/2);
            // draw node
            nodeDrawLeft(ctx, x - NodePaddingW * 2 - NodeMarginW * 2, startYLeft + childHeight/2 - NodeFontHeight/2, node.child[i]);
            startYLeft += childHeight;
        }else{
            console.log("there is no direct");
        }
    }
}

function edgeDrawRight(ctx, startX, startY, endX, endY){
    ctx.strokeStyle = NodeEdgeColor;
    ctx.moveTo(startX, startY);
    ctx.bezierCurveTo(startX + EdgeBezier, startY, endX - EdgeBezier, endY, endX, endY)
    ctx.stroke();
}

function edgeDrawLeft(ctx, startX, startY, endX, endY){
    ctx.strokeStyle = NodeEdgeColor;
    ctx.moveTo(startX, startY);
    ctx.bezierCurveTo(startX - EdgeBezier, startY, endX + EdgeBezier, endY, endX, endY)
    ctx.stroke();
}

// draw event
function draw(){
    var canvas = document.getElementById('canvas');
    if (!canvas.getContext){  
        return;
    }
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "" + NodeFontHeight + "px sans-serif";
    ctx.textDecoration = "underline";
    ctx.textBaseline = "top";
    ctx.fillStyle = "yellow";
    measureNodeRight(RootNode);
    measureNodeLeft(RootNode);
    nodeDrawRoot(ctx, 300, 100, RootNode);
    ctx.fillRect(0, 0, 10, 10);
}

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
    if( ModeEdit )
        return;
    var evt = window.event || e;
    draw();
    var node = findFocus(RootNode, evt.clientX - canvas.offsetLeft, evt.clientY - canvas.offsetTop);
    if( node != null )
        FocusNode = node.id;
}

function onMouseUpCanvas(){
    if( ModeEdit ){
        NodeEditDone();
    }
    if( !ModeEdit ){
        var evt = window.event || e;
        var node = findFocus(RootNode, evt.clientX - canvas.offsetLeft, evt.clientY - canvas.offsetTop);
        if( node == null )
            return;
        FocusNode = node.id;
        draw();
        NodeEdit();
    }
}

// calc frame rate
var width;
var height;
var delta;
var lastTime;
var frames;
var totalTime;
var updateTime;
var updateFrames;

function init( isFrameRateMode ) {
    var canvas =document.getElementById('canvas');
    width = canvas.width;
    height = canvas.height; 
    lastTime = (new Date()).getTime();
    frames = 0;
    totalTime = 0;
    updateTime = 0;
    updateFrames =0;
    if( isFrameRateMode )
        setInterval(update, 100);
    else
        draw();
}


function update() {
    var now = (new Date()).getTime();
    delta = now-lastTime;
    lastTime = now;
    totalTime+=delta;
    frames++;
    updateTime+=delta;
    updateFrames++;
    if(updateTime > 1000) {
        document.getElementById('fps').innerHTML = "FPS AVG: " + (1000*frames/totalTime) + " CUR: " + (1000*updateFrames/updateTime);
        updateTime = 0;
        updateFrames =0;
    }

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
    ModeEdit = true;
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
    var input = document.getElementById('input');
    var node = findFocusNode(RootNode);
    node.text = input.value;
    input.style.display = "None";
    ModeEdit = false;
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
        if( ModeEdit )
            NodeEditDone();
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
        console.log("default");
        break;
    }
}
