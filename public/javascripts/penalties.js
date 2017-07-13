function plusTwoSolve(id) {
    var solveRef = firebase.database().ref("times/" + globalUser.uid + "/" + id);
    var currentTime = 0;
    var newTime = 2;
    solveRef.once("value").then(function(snap) {
        if (snap.val().penalty == 0) {
            currentTime += snap.val().time;
            newTime += snap.val().time;
            solveRef.update({
                "penalty" : 1,
                "time" : newTime
            });
            
            document.getElementById(id).innerHTML = parseTimeStr(newTime) + "+";
        } else {
            if (snap.val().penalty == 2) {
            currentTime += snap.val().time;
            solveRef.update({
                "penalty" : 1,
                "time" : currentTime
            });
            
            document.getElementById(id).innerHTML = parseTimeStr(currentTime) + "+";
        }
    });
}

function plusTwoMostRecent() {
    var mostRecentId = document.getElementById("timeList").childNodes[0].id;
    plusTwoSolve(mostRecentId);
}

function dnfSolve(id) {
    var solveRef = firebase.database().ref("times/" + globalUser.uid + "/" + id);
    solveRef.once("value").then(function(snap) {
        if (snap.val().penalty != 2) {
            solveRef.update({
               "penalty" : 2 
            });
            
            document.getElementById(id).innerHTML = "DNF";
        }
    });
}

function dnfMostRecent() {
    var mostRecentId = document.getElementById("timeList").childNodes[0].id;
    dnfSolve(mostRecentId);
}

function clearSolve(id) {
    var solveRef = firebase.database().ref("times/" + globalUser.uid + "/" + id);
    solveRef.once("value").then(function(snap) {
        if (snap.val().penalty == 2) {
            solveRef.update({
               "penalty" : 0
            });
            
            document.getElementById(id).innerHTML = parseTimeStr(snap.val().time);
        } else if (snap.val().penalty == 1) {
            var newTime = -2;
            newTime += snap.val().time;
            
            solveRef.update({
                "penalty" : 0,
                time : newTime
            });
            
            document.getElementById(id).innerHTML = parseTimeStr(newTime);
        }
    });
}

function clearMostRecent() {
    var mostRecentId = document.getElementById("timeList").childNodes[0].id;
    clearSolve(mostRecentId);
}