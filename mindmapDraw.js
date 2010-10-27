// node
var NodePaddingW = 3;
var NodePaddingH = 3;
var NodeMarginW = 15;
var NodeMarginH = 3;
var NodeRadius = 5;
var NodeFontHeight = 20;
var NodeBGColor = "white";
var NodeTextColor = "black";
var drawPosX, drawPosY;

// edge
var NodeEdgeColor = "black"; // todo. edge color
var NodeUnderLineMargin = 3;
var EdgeBezier = 20;

// focus
var FocusBGColor = "gray";

// round rect
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

// measure node
function measureNode(node){
    node["height"] = 0;
    // no child
    if( node.child == null || node.child.length == 0 ){
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
    if( node.child == null || node.child.length == 0 ){
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
    if( node.child == null || node.child.length == 0 ){
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

// node draw
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

// edge draw
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

// draw main function
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
    nodeDrawRoot(ctx, DrawPosX, DrawPosY, RootNode);
    ctx.fillRect(0, 0, 10, 10);
}

