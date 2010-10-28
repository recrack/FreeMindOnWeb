function resizeCanvas(){
    var canvas = document.getElementById("canvas");
    var menu = document.getElementById("menu");
    var canvasWidth = window.innerWidth;
    var canvasHeight = window.innerHeight - menu.clientHeight;
    canvas.setAttribute("width", canvasWidth);
    canvas.setAttribute("height", canvasHeight);
}
