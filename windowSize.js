function resizeCanvas(){
    var el = document.getElementById("canvas");
    var canvasWidth = window.innerWidth;
    var canvasHeight = window.innerHeight;
    el.style.position = "fixed";
    el.setAttribute("width", canvasWidth);
    el.setAttribute("height", canvasHeight);
    el.style.top = 0;
    el.style.left = 0;
}
