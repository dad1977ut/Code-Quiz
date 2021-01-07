//set of questions
var questions = [
  ["q1", "a1", "a2", "a3", "a4", "a2"],
  ["q2", "b1", "b2", "b3", "b4", "b1"],
  ["q3", "c1", "c2", "c3", "c4", "c4"],
];
var totalCorrect = 0;
var currentQuestion = 0;
var secondsLeft = 100;
var scoreArr = [];
function gameEnd() {
  document.querySelector("#timer").textContent = "";
  console.log("totalCorrect", totalCorrect);
  document.querySelector("#question-container h2").textContent = "game over";
  document.querySelector("#question-container h3").textContent =
    "Total: " + totalCorrect;
  document.querySelector("#answer1").style.display = "none";
  document.querySelector("#answer2").style.display = "none";
  document.querySelector("#answer3").style.display = "none";
  document.querySelector("#answer4").style.display = "none";
  document.querySelector("form").style.display = "inline";
}
//timer
function gameTimer() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    document.querySelector("#timer").textContent = "Timer: " + secondsLeft;
    if (secondsLeft < 0) {
      clearInterval(timerInterval);
      gameEnd();
    }
  }, 1000);
}
//shows the current questions and possible answers
function showQuestion(current) {
  document.querySelector("#question-container h2").textContent = current[0];
  document.querySelector("#answer1").textContent = current[1];
  document.querySelector("#answer2").textContent = current[2];
  document.querySelector("#answer3").textContent = current[3];
  document.querySelector("#answer4").textContent = current[4];
}
//check answer returns 1 if correct and 0 if incorrect
function checkAnswer(current, answerClicked) {
  if (current[answerClicked] === current[5]) {
    return 1;
  } else {
    return 0;
  }
}
function answerClickHandler(buttonNum) {
  totalCorrect += checkAnswer(questions[currentQuestion], buttonNum);
  secondsLeft += (checkAnswer(questions[currentQuestion], buttonNum) - 1) * 10;
  currentQuestion++;
  console.log("currentQuestion", currentQuestion);
  if (currentQuestion < questions.length) {
    showQuestion(questions[currentQuestion]);
  } else {
    secondsLeft = 0;
  }
}
function startPage() {
  document.querySelector("#question-container h2").textContent = "Code Quiz";
  document.querySelector("#question-container P").textContent =
    "Answer the questions to this time quiz by picking the correct answer. Everytime you pick the wrong answer 10 seconds will be subtracted from your time.";
}

// shows the first question
document.querySelector("#start").addEventListener("click", function () {
  gameTimer();
  document.querySelector("#start").style.display = "none";
  document.querySelector("#question-container P").style.display = "none";
  document.querySelector("#answer1").style.display = "block";
  document.querySelector("#answer2").style.display = "block";
  document.querySelector("#answer3").style.display = "block";
  document.querySelector("#answer4").style.display = "block";
  showQuestion(questions[currentQuestion]);
  document
    .querySelector("#answer1")
    .addEventListener("click", answerClickHandler.bind(this, 1));
  document.querySelector("#answer2").addEventListener("click", function () {
    answerClickHandler(2);
  });
  document
    .querySelector("#answer3")
    .addEventListener("click", answerClickHandler.bind(this, 3));
  document.querySelector("#answer4").addEventListener("click", function () {
    answerClickHandler(4);
  });
});
//add curent score to scoreArr
document
  .querySelector("#submit-score")
  .addEventListener("click", function (event) {
    event.preventDefault();
    currentQuestion = 0;
    scoreArr.push([document.querySelector("#initial").value, totalCorrect]);
    console.log(scoreArr);
    localStorage.setItem("scoreArr", JSON.stringify(scoreArr));
  });
//store in local storage
