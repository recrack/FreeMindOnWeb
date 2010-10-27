// calc frame rate
var delta;
var lastTime;
var frames;
var totalTime;
var updateTime;
var updateFrames;

function updateFrameRate() {
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


function initFrameRate(){
    var canvas =document.getElementById('canvas');
    lastTime = (new Date()).getTime();
    frames = 0;
    totalTime = 0;
    updateTime = 0;
    updateFrames =0;
    Mode = ModeNone;
    DrawPosX = 0;
    DrawPosY = 0;
    draw();
    DrawPosX = canvas.width/2 - (RootNode.area[2] - RootNode.area[0]);
    DrawPosY = canvas.height/2;
}