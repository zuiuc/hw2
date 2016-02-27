
  //$(document).ready(function()) {

  //});
//count down timmer
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = "Your Quiz End in " + minutes + ":" + seconds + " Minutes";

        if (--timer < 0) {
            display.textContent = "Quiz Time is Over!!!!";
        }
    }, 1000);
}



//set variable for date
var d = new Date();

window.onload = function () {
    var quizTime = 60 * 50,
        display = document.querySelector('#counter');
    startTimer(quizTime, display);
    $("#date").html(d.toDateString());
};

  var questionCounter = 0; 
  var correct_count = 0;
  var wrong_count = 0; 
  var quiz = $('#quiz');
  var question;


function select_question() {
    var n = d.getDay();
    //console.log(n);
    if (n==7){
        question = mathQuestions;
    } else if ( n%2 == 0) {
        question = geoQuestions;
    } else {
        question = wotQuestions;
    }
    console.log(JSON.stringify(shuffle(question)));
};

    select_question();

// The following code is cited from stck-overflow http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}



    