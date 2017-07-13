function loadTimeList() {
  var timeList = document.getElementById("timeList");
  var timeListRef = firebase.database().ref("times/" + globalUser.uid);
  
  timeListRef.on('child_added', function(data) {
    addTimeElement(data);
  });
  
  function addTimeElement(timeData) {
    var s = timeData.val().time.toString();
    s = s.substring(0, s.indexOf(".") + 3);
    
    var newHtml = "<div id=\"" + timeData.key + "\" class=\"time-card mdl-cell mdl-cell--top mdl-shadow--2dp animated zoomIn\">";
    if (timeData.val().penalty == 2) {
      newHtml += "DNF";
    } else if (timeData.val().penalty == 1) {
      newHtml += s + "+";
    } else {
      newHtml += s;
    }
    newHtml +="</div>"
    
    timeList.innerHTML = newHtml + timeList.innerHTML;
    
    setTimeout(function() {
      var elements = document.getElementsByClassName("zoomIn");
      for (var i = 0; i < elements.length; i++) {
         elements[i].classList.remove("zoomIn");
      }
    }, 1000)
  }
}

function parseTimeStr(time) {
  var s = time.toString();
    s = s.substring(0, s.indexOf(".") + 3);
    return s;
}