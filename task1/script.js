let computerNumber = Math.floor(Math.random() * 100) + 1;
let playerAttempts = 5;

document.getElementById("submit").addEventListener("click", checkGuess);

function checkGuess() {
  let playerGuess = parseInt(document.getElementById("guess").value);

  if (playerGuess === computerNumber) {
    document.getElementById("result").innerHTML = " Congratulations! You guessed the number!";
    document.getElementById("attempts").innerHTML = "";
  } else if (playerGuess > computerNumber) {
    document.getElementById("result").innerHTML = "Too high! Try again.";
    playerAttempts--;
    document.getElementById("attempts").innerHTML = `You have ${playerAttempts} attempts left.`;
  } else {
    document.getElementById("result").innerHTML = "Too low! Try again.";
    playerAttempts--;
    document.getElementById("attempts").innerHTML = `You have ${playerAttempts} attempts left.`;
  }

  if (playerAttempts === 0) {
    document.getElementById("result").innerHTML = `Sorry, you ran out of attempts. The number was ${computerNumber}.`;
    document.getElementById("attempts").innerHTML = "";
  }}