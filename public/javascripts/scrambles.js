var scrambleText = document.getElementById("scrambleText");
scrambleText.innerHTML = "<div class=\"mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active\"></div>"

//initialize
Cube.asyncInit("javascripts/cubejs/lib/worker.js", generateScramble);

function generateScramble() {
    var s = "";
    Cube.asyncScramble(function(alg) {
        s = alg.replace("/\s+/g", "")
        scrambleText.innerHTML = s
    });
}