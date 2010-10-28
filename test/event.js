function onKeyPress(){
    // get key
    var evtobj=window.event? event : e //distinguish between IE's explicit event object (window.event) and Firefox's implicit.
    var unicode=evtobj.charCode? evtobj.charCode : evtobj.keyCode
    var actualkey=String.fromCharCode(unicode)
    if (actualkey=="a")
        console.log("a", actualkey);
    if (actualkey=="z")
        console.log("z", actualkey);
    else
        console.log("actual key", actualkey);

    if (evtobj.altKey || evtobj.ctrlKey || evtobj.shiftKey )
        console.log("you pressed one of the 'Alt', 'Ctrl', or 'Shift' keys");
}

function onMouseMove(){
    // get position
    var posx = 0;
    var posy = 0;
    if (!e) var e = window.event;
}