var powerOn = false;
var switchSlot = document.querySelector(".slot");
var powerSwitch = document.querySelector(".switch");
var strictButton = document.querySelector(".strict");
var strictLight = document.querySelector(".led-light");
var startButton = document.querySelector(".start");
var display = document.querySelector(".display");

// green button
var greenButton = document.querySelector("[id='0']");
var greenLightOn = "#13FF7C";
var greenLightOff = "#00A74A";

// red button
var redButton = document.querySelector("[id='1']");
var redButtonOn = "#FF4C4C";
var redButtonOff = "#9F0F17";

// yellow button
var yellowButton = document.querySelector("[id='2']");
var yellowButtonOn = "#FED938";
var yellowButtonOff = "#CCA707";

// blue button
var blueButton = document.querySelector("[id='3']");
var blueButtonOn = "#1C8CFF";
var blueButtonOff = "#094A8F";

// move arrays
var computerMoves = [];
var playerMoves = [];

function getRandomNumber() {
  return Math.floor(Math.random() * 4);
}

function updateDisplay(count) {
  count <= 9 ? display.textContent = "0" + count : display.textContent = count;
}

function moveLooper(count) {
  setTimeout(function() {
    if (count <= computerMoves.length) {
      lightUpButton(computerMoves[count]);
      count++;
      moveLooper(count);
    }
  }, 750);
}

function lightUpButton(color) {
  switch(color) {
    case "green":
        greenButton.style.background = greenLightOn;
        setTimeout(function() {
          greenButton.style.background = greenLightOff;
        }, 500);
      break;
    case "red":
        redButton.style.background = redButtonOn;
        setTimeout(function() {
          redButton.style.background = redButtonOff;
        }, 500);
      break;
    case "yellow":
        yellowButton.style.background = yellowButtonOn;
        setTimeout(function() {
          yellowButton.style.background = yellowButtonOff;
        }, 500);
      break;
    case "blue":
        blueButton.style.background = blueButtonOn;
        setTimeout(function() {
        blueButton.style.background = blueButtonOff;
      }, 500);
      break;
  }
}

function pushComputerMoveToArray(buttonId) {
  switch(buttonId) {
    case 0:
      computerMoves.push("green");
      break;
    case 1:
      computerMoves.push("red");
      break;
    case 2:
      computerMoves.push("yellow");
      break;
    case 3:
      computerMoves.push("blue");
      break;
  }
}

function computerMove() {
  var randomNum = getRandomNumber();
  updateDisplay(computerMoves.length + 1);
  pushComputerMoveToArray(randomNum);
  moveLooper(0);
  playerMove();
  console.log(computerMoves);
}

function makeButtonsClickable() {
  greenButton.classList.add("clickable");
  redButton.classList.add("clickable");
  yellowButton.classList.add("clickable");
  blueButton.classList.add("clickable");
}

function playerMove() {
  makeButtonsClickable();
  greenButton.addEventListener("click", function() {
    playerMoves.push("green");
  });
  redButton.addEventListener("click", function() {
    playerMoves.push("red");
  });
  yellowButton.addEventListener("click", function() {
    playerMoves.push("yellow");
  });
  blueButton.addEventListener("mousedown", function() {
    playerMoves.push("blue");
  });
  console.log(playerMoves);
}

powerSwitch.addEventListener("click", function() {
  if (!powerOn) {
    display.style.color = "#DC0D29";
    switchSlot.style.justifyContent = "flex-end";
    powerOn = true;
  } else {
    display.style.color = "#430710";
    switchSlot.style.justifyContent = "flex-start";
    display.innerText = "--"
    powerOn = false;
  }
});

startButton.addEventListener("mousedown", function() {
  startButton.style.boxShadow = "0px 0px 0px #222";
});

startButton.addEventListener("mouseup", function() {
  startButton.style.boxShadow = "0px 2px 3px #222";
  powerOn ? computerMove() : console.log("Turn on the game");
})

strictButton.addEventListener("mousedown", function() {
  strictButton.style.boxShadow = "0px 0px 0px #222";
});

strictButton.addEventListener("mouseup", function() {
  strictButton.style.boxShadow = "0px 2px 3px #222";
  if (powerOn) {
    if (strictLight.classList.contains("led-off")) {
      strictLight.classList.remove("led-off");
      strictLight.classList.add("led-on");
    } else {
      strictLight.classList.remove("led-on");
      strictLight.classList.add("led-off");
    }
  }
});
