var highScore = JSON.parse(localStorage.getItem("scoreArr"));
var displayScore = document.querySelector("#high-score");
console.log(highScore);
for (let i = 0; i < highScore.length; i++) {
  var score = highScore[i];
  var li = document.createElement("li");
  li.textContent = score;
  displayScore.appendChild(li);
}
