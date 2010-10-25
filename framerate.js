var ctx;
var width;
var height;
var delta;
var lastTime;
var frames;
var totalTime;
var updateTime;
var updateFrames;
var creats = new Array();

function init() {
    var canvas =document.getElementById('main');
    width = canvas.width;
    height = canvas.height; 
    ctx = canvas.getContext('2d');
    for(var i=0; i < 100; ++i) {
        addCreature();
    }
    lastTime = (new Date()).getTime();
    frames = 0;
    totalTime = 0;
    updateTime = 0;
    updateFrames =0;
    setInterval(update, 10);
}


function addCreature() {
    var c = new Creature(Math.random()*100,Math.random()*200);
    creats.push(c);
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

    for(var i=0; i < creats.length; ++i) {
        creats[i].move();
    }

    draw();
}

function draw() {
    ctx.clearRect(0,0,width,height);
    creats.forEach(drawCreat);
}

function drawCreat(c,i,a) {
    if (!onScreen(c)) {
        return;
    }
    ctx.fillStyle = "#00A308";
    ctx.beginPath();
    ctx.arc(c.x, c.y, 10, 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.fill();
}

function onScreen(o) {
    return o.x >= 0 && o.y >= 0 && o.x <= width && o.y <=height;
}

function Creature(x1,y) {
    this.x = x1;
    this.y = y;

    this.dx = Math.random()*2;
    this.dy = Math.random()*2;

    this.move = function() {
        this.x+=this.dx;
        this.y+=this.dy;
        if(this.x < 0 || this.x > width) {
            this.dx*=-1;
        }
        if(this.y < 0 || this.y > height) {
            this.dy*=-1;
        }
    }

}
