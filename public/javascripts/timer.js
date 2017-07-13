var timer = document.getElementById("timerClock");
var time = 0.00
var timing = false;
var timingInterval = null;

var lastScramble = "";

function prepTimer() {
    time = -0.01;
    refreshTime(); //RESET TIME
    timer.style.color = "#76FF03";
}

function goTimer() {
    timingInterval = setInterval(refreshTime, 10);
    timing = true;
}

function stopTimer() {
    clearInterval(timingInterval);
    timer.style.color = "#F44336";
}

function finishTimer() {
    timer.style.color = "#000000";
    timing = false;
    lastScramble = document.getElementById("scrambleText").innerHTML;
    
    addTime(globalUser, "3x3x3", "speedsolve", time, Date(), lastScramble, 0, "", false)
    
    generateScramble();
}

function refreshTime() {
    time += 0.01;
    updateTime();
}

function updateTime() {
    var s = time.toString();
    if (time == 0) {
        s = "0.00";
    } else {
        s = s.substring(0, s.indexOf(".") + 3);
    }

    timer.innerHTML = s;
}

function onKeyDown(e) {
    e = e || window.event;
    var key = e.which || e.keyCode;

    if (key == 32) { //THE SPACEBAR
         if (timing) {
             stopTimer();
         } else {
             prepTimer();
         }
    }
}

function onKeyUp(e) {
    e = e || window.event;
    var key = e.which || e.keyCode;

    if (key == 32) { //THE SPACEBAR
        if (timing) {
            finishTimer();
        } else {
            goTimer();
        }
    }
}

document.onkeydown = onKeyDown
document.onkeyup = onKeyUp