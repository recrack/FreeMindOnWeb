function onKeyUp(){
    console.log("beonit");
    var evtobj = window.event ? event : e //distinguish between IE's explicit event object (window.event) and Firefox's implicit.
    var unicode = evtobj.charCode ? evtobj.charCode : evtobj.keyCode
    var actualkey = String.fromCharCode(unicode)

    if (evtobj.altKey || evtobj.ctrlKey || evtobj.shiftKey )
        console.log("you pressed one of the 'Alt', 'Ctrl', or 'Shift' keys");
    if( evtobj.insertKey )
        console.log("insert key");
    console.log(unicode, actualkey, evtobj.keyCode);
}