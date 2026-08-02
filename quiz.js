const form = document.getElementById("form");
const resultBox = document.getElementById("result");
const timerDisplay = document.getElementById("time");
const submitBtn = document.getElementById("btn");

let totalSeconds = 1200;
let timerId = null;
let isSubmitted = false;

function startTimer() {
  if (totalSeconds <= 0) {
    timerDisplay.innerHTML = "00:00";
    alert("Time is up! Your quiz will now be submitted automatically.");
    calculateScore();
    return;
  }

  totalSeconds--;

  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  timerDisplay.innerHTML = minutes + ":" + seconds;

  timerId = setTimeout(startTimer, 1000);
}

function calculateScore() {
  if (isSubmitted) return;
  isSubmitted = true;

  clearTimeout(timerId);

  let score = 0;
  const correctAnswers = document.getElementsByClassName("correctanswer");

  for (let i = 0; i < correctAnswers.length; i++) {
    if (correctAnswers[i].checked) {
      score++;
    }
  }

  resultBox.innerHTML = "Your score is: " + score + " / 10";
  resultBox.className = "result-container show";

  const allInputs = document.getElementsByTagName("input");
  for (let j = 0; j < allInputs.length; j++) {
    if (allInputs[j].type === "radio") {
      allInputs[j].disabled = true;
    }
  }

  submitBtn.disabled = true;
  submitBtn.style.opacity = "0.5";
  submitBtn.style.cursor = "not-allowed";

  resultBox.scrollIntoView({ behavior: "smooth" });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  calculateScore();
});

timerId = setTimeout(startTimer, 1000);
