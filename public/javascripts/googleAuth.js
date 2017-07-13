var globalUser = null;

function signIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.email');

    firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    });
}

function signOut() {
    firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log("signedOut well");
    }).catch(function(error) {
    console.log("signedOut bad");
    });
}

firebase.auth().onAuthStateChanged(function(user) {
    console.log("authStateChanged function ...")
    globalUser = user;
    if (user) {
        console.log("user is signed in")
        document.getElementById("uname").innerHTML = "Signed in as:" + "<br>" + user.displayName;
        document.getElementById("btn-signIn").style.display = "none";
        document.getElementById("btn-signOut").style.display = "";
    
        var userCheckRef = firebase.database().ref("users/" + user.uid)
        
        if (userCheckRef.email == undefined) {
          createUser(user)
        }
    
        globalUser = user;
        
        loadTimeList();
    } else {
        console.log("no user logged in")
        document.getElementById("uname").innerHTML = "Sign in to save your times between sessions!";
        document.getElementById("btn-signIn").style.display = "";
        document.getElementById("btn-signOut").style.display = "none";
    }
});