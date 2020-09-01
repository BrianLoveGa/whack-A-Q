console.log("check");
// consts do not change
const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const countdownBoard = document.querySelector(".countdown");
const startButton = document.querySelector(".startButton");
const winnerWords = document.querySelector(".winSauce");
/// these will change so let them be lets
let lastHole;
let timeUp = false;
let timeLimit = 20000; /// in milliseconds so this is 20 seconds
let score = 0;
let countdown;
let notice = "";

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
  const time = Math.random() * 1300 + 400;
  const hole = pickRandomHole(holes);
  hole.classList.add("up");
  setTimeout(function () {
    hole.classList.remove("up");
    if (!timeUp) popOut();
  }, time);
}

// the 'game logic' loop running on boolean condition of timeUp with time limit interval
function startGame() {
  countdown = timeLimit / 1000;
  scoreBoard.textContent = 0;
  scoreBoard.style.display = "block";
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
      countdownBoard.textContent =
        "Times up!! Thanks for whacking that rat fiend Q! You scored: " + score;
    }
  }, 1000);
}

// add start game function to start button
startButton.addEventListener("click", startGame);

/// let's get some points for whacking!
function whack(e) {
  score++;
  this.style.backgroundImage = 'url("xxqJohn.jpg")';
  this.style.pointerEvents = "none"; /// allows for only one click per appearance of the mole
  setTimeout(() => {
    this.style.backgroundImage = 'url("qJohnDeLancie.jpg")';
    this.style.pointerEvents = "all"; /// when pic resets the mole can 'score' points again when whacked
  }, 800);
  scoreBoard.textContent = score;
}

/// attach the points function to each 'mole'
moles.forEach((mole) => mole.addEventListener("click", whack));

function winSauce() {
  if (timeUp) {
    if (score <= 5) {
      notice = "Good try, maybe you book some holodeck time and practice.";
    } else if (score <= 11) {
      notice = "Nice shooting, your Academy instructors should be proud.";
    } else if (score <= 17) {
      notice = "Excellent job ensign. You belong on the Bridge.";
    } else if (score <= 22) {
      notice =
        "Wonderful shooting, I'm reccomending you for the Star Cross award. ";
    } else if (score > 22) {
      notice =
        "Amazing you have the strength of Kahless, and the wisdom of Surak. ";
    }
    winnerWords.style.display = 'block';
    winnerWords.textContent = notice;
  }
}

