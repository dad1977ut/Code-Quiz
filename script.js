//set of questions
var questions = [
  ["What do <p> stand for", "paragraph", "pop", "period", "piece", "paragraph"],
  ["How do create an ordered list", "<ul>", "<ol>", "<li>", "<list>", "<ol>"],
  [
    "What is the alt attribute in img tag",
    "It shows a different image",
    "It creates a slideshow",
    "It changes the shape of the image",
    "It’s an alternate text for the image",
    "It’s an alternate text for the image",
  ],
  ["What the class selector", "*", "#", "/", ".", "."],
  ["What the id selector", "#", "*", "/", ".", "#"],
  [
    "body {font-size: 14px; background-color: black; color : red;} What color is the background",
    "red",
    "white",
    "blue",
    "black",
    "black",
  ],
  [
    "body {font-size: 14px; background-color: black; color : red;} What color is the text",
    "red",
    "white",
    "blue",
    "black",
    "red",
  ],
  ["What do you use to make a string", "..", "//", "+", '""', '""'],
  [
    "What is the conditional statement for this for loop for (let index = 0; index < array.length; index++)",
    "for",
    "index = 0",
    "index < array.length",
    "index++",
    "index < array.length",
  ],
  ["begin() What is begin", "string", "function", "number", "variable"],
];
var totalCorrect = 0;
var currentQuestion = 0;
var secondsLeft = 100;
if (localStorage.getItem("scoreArr") == null) {
  var scoreArr = [];
} else {
  var scoreArr = JSON.parse(localStorage.getItem("scoreArr"));
}
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
    window.location.assign("highscore.html");
  });
//store in local storage
