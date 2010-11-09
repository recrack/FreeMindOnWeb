function resizeCanvas(){
    var canvas = document.getElementById("canvas");
    var mapBody = document.getElementById("body");
    var canvasWidth = mapBody.clientWidth;
    var canvasHeight = mapBody.clientHeight;
    canvas.setAttribute("width", canvasWidth);
    canvas.setAttribute("height", canvasHeight);
}
