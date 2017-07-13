var globalMostRecentId = "";

function createUser(userObject) {
  firebase.database().ref('users/' + userObject.uid).set({
    username: userObject.displayName,
    email: userObject.email
  });

  firebase.database().ref('prefs/' + userObject.uid).set({
    "default": "3x3x3"
  });
}

function addTime(user, type, subtype, time, date, scramble, penalty, comment, history) {
  var timeRef = firebase.database().ref('times/' + user.uid).push();
  timeRef.set({
    "type" : type,
    "subtype" : subtype,
    "time" : time,
    "date" : date,
    "scramble" : scramble,
    "penalty" : penalty,
    "comment" : comment,
    "history" : history
  });
  
  globalMostRecentId = timeRef.key;
}