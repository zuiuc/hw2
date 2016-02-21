
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




    