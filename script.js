console.log("check");
// constants do not change
const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const countdownBoard = document.querySelector(".countdown");
const startButton = document.querySelector(".startButton");
const winnerWords = document.querySelector(".winSauce");
const instructionButton = document.querySelector(".infoModal");
const information = document.querySelector(".instructionsModal");
const closeInfo = document.querySelector(".closeInfo");
const displayedHighScore = document.getElementById("highScore");
const levelSelector = document.getElementById("level")
/// these will change so let them be lets
let lastHole;
let timeUp = false;
let timeLimit = 20000; /// in milliseconds so this is 20 seconds
let score = 0;
let countdown;
let notice = "";
let speed = 1500;
let highScore = 0;
let level = 1;
/// pick a hole randomly and not the one just used ...

function pickRandomHole(holes) {
  const randomHole = Math.floor(Math.random() * holes.length);
  const hole = holes[randomHole];
  if (hole === lastHole) {
    return pickRandomHole(holes);
  }
  lastHole = hole;
  return hole;
}
// animate the 'mole' up and then down by adding css up class to it

function popOut() {
  const time = Math.random() * speed + 400;
  const hole = pickRandomHole(holes);
  hole.classList.add("up");
  setTimeout(function () {
    hole.classList.remove("up");
    if (!timeUp) popOut();
  }, time);
}

// the 'game logic' loop running on boolean condition of timeUp with time limit interval

function startGame() {
  reset();
  countdown = timeLimit / 1000;
  scoreBoard.textContent = 0;
  scoreBoard.style.visibility = "visible";
  countdownBoard.textContent = countdown;
  timeUp = false;
  score = 0;
  popOut();
  setTimeout(function () {
    timeUp = true;
  }, timeLimit);

  let startCountdown = setInterval(() => {
    countdown -= 1;
    countdownBoard.textContent = countdown;
    if (countdown < 0) {
      countdown = 0;
      clearInterval(startCountdown);
      winSauce();
      countdownBoard.style.backgroundColor = "black";
      countdownBoard.textContent = "Times up!!";
    }
  }, 1000);
}

/// add start game function to start button

startButton.addEventListener("click", startGame);

/// let's get some points for whacking!

function whack(e) {
  score++;
  this.style.backgroundImage = 'url("xxqJohn.jpg")';
  this.style.pointerEvents = "none"; /// allows for only one click per appearance of the mole
  setTimeout(() => {
    this.style.backgroundImage = 'url("qJohnDeLancie.jpg")';
    this.style.pointerEvents = "all"; /// when pic resets the mole can 'score' points again when whacked
  }, 900);
  scoreBoard.textContent = score;
}

/// attach the points function to each 'mole'

moles.forEach((mole) => mole.addEventListener("click", whack));

/// 'fun' words depending on score might change to gifs later
/// and current session 'high score'

function winSauce() {
  if (timeUp) {
    if (score <= 5) {
      notice =
        "Good try, but maybe you should book some time on Holodeck three and practice.";
    } else if (score <= 11) {
      notice = "Nice shooting, your Academy instructors should be proud.";
    } else if (score <= 17) {
      notice = "Excellent job Ensign. You belong on the bridge.";
    } else if (score <= 22) {
      notice =
        "Wonderful shooting, I'm recommending you for the Star Cross award. ";
    } else if (score > 22) {
      notice =
        "Amazing ! You have the strength of Kahless, and the wisdom of Surak. ";
    }
    winnerWords.style.visibility = "visible";
    winnerWords.textContent = notice;
    winnerWords.style.backgroundColor = "black";
    scoreBoard.style.backgroundColor = "black";
    scoreBoard.textContent = "You scored: " + score;
    startButton.textContent = "Play Again";
    if(score >= highScore){
      displayedHighScore.innerHTML = "high score : " + score;
      highScore = score;
    }
  }
}

/// change winner words background color back

function reset() {
  countdownBoard.style.backgroundColor = "transparent";
  scoreBoard.style.backgroundColor = "transparent";
  winnerWords.style.backgroundColor = "transparent";
  winnerWords.textContent = "Try to beat 22!";
}

/// modal instructions open

function showInfo() {
  information.style.display = "block";
}
instructionButton.addEventListener("click", showInfo);

/// close modal

function hideInfo() {
  information.style.display = "none";
}
closeInfo.addEventListener("click", hideInfo);


/// change level

/// on click change level display and change speed interval & time?


// 0 default - time = 25000 ... speed = 1800
// 1 default - time = 20000 ... speed = 1300
// 2 default - time = 20000 ... speed = 1300
// 3 default - time = 20000 ... speed = 1300
// 4 default - time = 20000 ... speed = 1300
// 5 default - time = 20000 ... speed = 1300
