"use strict";
  //$(document).ready(function()) {

  //});
//count down timmer
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
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
    $("#date").html(d.toDateString());
};




  var selection=[];
  var questionCounter = 0;
  var total_score = 0;
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
}

    select_question();

$(document).ready(function(){
      if(question == mathQuestions){
        $('#cat').append("Math");
      } else if (question == geoQuestions){
        $('#cat').append("Geography");
      } else {
        $('#cat').append("World of Tanks");
      }
});


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

question = shuffle(question);

//create_question, user choice and create_choices was modified from http://codepen.io/gcarino/pen/LDgtn/
function create_question(number){
  var qElement = $('<div>', {
      id: 'problem'
    });

    var head = $('<h2>Question ' + (number + 1) + ':</h2>');
    qElement.append(head);

    var questions = $('<p>').append(question[number].question);
    qElement.append(questions);

    return qElement;

}

function create_choices(number){
    var choices = $('<ul>');
    var each;
    var input = '';
    for (var i = 0; i < question[number].choices.length; i++) {
      each = $('<li class = "choices">');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += question[number].choices[i];
      each.append(input);
      choices.append(each);
    }
    return choices;

}

function create_inputbox(){

  var input = $('<div>');
  input.append('<input name="question" type="text"/>');
  return input;
}

function user_choose() {
  selection[questionCounter] = +$('input[name="answer"]:checked').val();
}

function user_input() {

  selection[questionCounter] = $('input[name="question"]').val();
}

function displayFirst() {
    if(question[0].questionType == 1){
      var firstQuestion = create_question(0);
      $("#quiz").append(firstQuestion);
      var first_choices = create_choices(0);
      $("#quiz").append(first_choices);

    } else {
      var firstQuestion = create_question(0);
      $("#quiz").append(firstQuestion);
      var first_choices = create_inputbox;
      $("#quiz").append(first_choices);
    }
}

function displayNext() {
      $('#quiz').empty();
      if(questionCounter < question.length){
        if(question[questionCounter].questionType == 1){
          var nextQuestion = create_question(questionCounter);
          $("#quiz").append(nextQuestion);
          var next_choices = create_choices(questionCounter);
          $("#quiz").append(next_choices);

        } else {
          var nextQuestion = create_question(questionCounter);
          $("#quiz").append(nextQuestion);
          var next_choices = create_inputbox;
          $("#quiz").append(next_choices);
        }
      } else {
        $('#quiz').append('<h3>Thank you for taking this quiz with us!</h3>');
        displayFinalScore();
        $('#next').hide();
        $('.timer').empty();
        $('.timer').append("<h2>Congratulations!!</h2>");
      }
}

function displayFinalScore() {
      $('#score').empty();
      $('#correct').empty();
      $('#wrong').empty();
      $('#score').append(total_score);
      $('#correct').append(correct_count);
      $('#wrong').append(wrong_count);

}

function updateScore() {

        if(question[questionCounter].questionType == 1){
          //console.log(selection[questionCounter]);
          //console.log(question[questionCounter].correctChoice);
          if(selection[questionCounter] === question[questionCounter].choices.indexOf(question[questionCounter].correctChoice)){
          total_score += question[questionCounter]. score;
          correct_count ++;
          } else {
           wrong_count ++;
          }
        } else {
          //console.log(selection[questionCounter]);
          //console.log(questionCounter);
          //console.log(question[questionCounter].correctChoice);
          //console.log(question[10].correctChoice);
          if(selection[questionCounter] === question[questionCounter].correctAnswer){
          total_score += question[questionCounter]. score;
          correct_count ++;
          } else {
           wrong_count ++;
          }
        }





      $('#score').empty();
      $('#correct').empty();
      $('#wrong').empty();
      $('#score').append(total_score);
      $('#correct').append(correct_count);
      $('#wrong').append(wrong_count);
}


$(document).ready(function(){
      $('#start').on('click', function (event) {
        $("html, body").animate({ scrollTop: $(document).height() });
        var quizTime = 60 * 10,
        display = document.querySelector('#counter');
        startTimer(quizTime, display);
        $('#start').hide();
        $('#press_start').hide();
        $('#score_section').show();
        $('#next').show();
        displayFirst();
        });
});

$(document).ready(function(){
      $('#next').on('click', function (event) {
        $("html, body").animate({ scrollTop: $(document).height() });
        if(question[questionCounter].questionType == 1){
          user_choose();
        } else {
          user_input();
        }
        if(question[questionCounter].questionType == 1){
              if (isNaN(selection[questionCounter])) {
              alert('Please choose an answer!');
            } else {
              updateScore();
              questionCounter++;
              displayNext();
            }
        } else {
           if (!selection[questionCounter] || selection[questionCounter].length == 0 ) {
              alert('Please answer the question!');
            } else {
              updateScore();
              questionCounter++;
              displayNext();
            }
        }


        });
});

$(document).ready(function(){
      $('#quit').on('click', function (event) {
          location.reload();
        });
});