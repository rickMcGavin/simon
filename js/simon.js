(function() {

  // declare selectors
  const switchSlot = document.querySelector(".slot");
  const powerSwitch = document.querySelector(".switch");
  const strictButton = document.querySelector(".strict");
  const strictLight = document.querySelector(".led-light");
  const startButton = document.querySelector(".start");
  const display = document.querySelector(".display");


  // game buttons
  const gameButtons = document.querySelectorAll(".game-btn");

  // green button
  const greenLightOn = "#13FF7C";
  const greenLightOff = "#00A74A";

  // red button
  const redButtonOn = "#FF4C4C";
  const redButtonOff = "#9F0F17";

  // yellow button
  const yellowButtonOn = "#FED938";
  const yellowButtonOff = "#CCA707";

  // blue button
  const blueButtonOn = "#1C8CFF";
  const blueButtonOff = "#094A8F";

  // move arrays
  var computerMoves = [];
  var playerMoves = [];

  // Booleans
  var powerOn = false;
  var computerTurn = true;
  var match = true;


  function getRandomNumber() {
    return Math.floor(Math.random() * 4);
  }

  function updateDisplay(count) {
    count <= 9 ? display.textContent = "0" + count : display.textContent = count;
  }

  function setDelay(round) {
     if (round < 5) {
      return 1000;
    } else if ((round >= 5) && (round < 9)) {
      return 750;
    } else if ((round >= 9) && (round < 13)) {
      return 500;
    } else if ((round >= 13) && (round <=20)) {
      return 400;
    }
  }

  function moveLooper(count) {
    count = count || 0;
    // determine delay based on round
    var delay = setDelay(computerMoves.length);

    setTimeout(function() {
      if (count <= computerMoves.length) {
        lightUpButton(computerMoves[count]);
        count++;
        moveLooper(count);
      }
    }, delay);
    if (count === computerMoves.length) {
      toggleClickable();
    }
  }


  function playSound(sound) {
    let audio = document.querySelector("."+sound);
    audio.currentTime = 0;
    audio.play();
  }

  function lightUpButton(color) {
    switch(color) {
      case "green":
          gameButtons[0].style.background = greenLightOn;
          playSound("green");
          setTimeout(() => { gameButtons[0].style.background = greenLightOff }, 150);
        break;
      case "red":
          gameButtons[1].style.background = redButtonOn;
          playSound("red");
          setTimeout(() => { gameButtons[1].style.background = redButtonOff }, 150);
        break;
      case "yellow":
          gameButtons[2].style.background = yellowButtonOn;
          playSound("yellow");
          setTimeout(() => { gameButtons[2].style.background = yellowButtonOff }, 150);
        break;
      case "blue":
          gameButtons[3].style.background = blueButtonOn;
          playSound("blue");
          setTimeout(() => { gameButtons[3].style.background = blueButtonOff}, 150);
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


  function toggleClickable() {
    gameButtons.forEach(button => button.classList.toggle("unclickable"));
  }


  function computerMove() {
    toggleClickable();
    let randomNum = getRandomNumber();
    updateDisplay(computerMoves.length + 1);
    pushComputerMoveToArray(randomNum);
    moveLooper(0);
    computerTurn = false;
    console.log(computerMoves);
  }



  function checkIfMoveMatches() {
    let index = playerMoves.length - 1;
    if (playerMoves[index] !== computerMoves[index]) {
      match = false;
      playSound("wrong");
      toggleClickable();
      if (!strictLight.classList.contains("led-on")) {
        playerMoves = [];
        setTimeout(moveLooper, 1500);
      } 
      if (strictLight.classList.contains("led-on")) {
        playerMoves = [];
        computerMoves = [];
        setTimeout(computerMove, 1500);
      }
    } else { 
      match = true;
    }
  }


  function playerMoveHandler() {
    if (!computerTurn) {
      lightUpButton(this.id);
      playerMoves.push(this.id);
      checkIfMoveMatches();
      if ((playerMoves.length === computerMoves.length) && (match)) {
        if (playerMoves.length === 20) {
          alert("You Win!");
          reset();
        } else {
          playerMoves = [];
          computerTurn = true;
         setTimeout(computerMove, 1000)
        }
      }
    }
  }

  function reset() {
    playerMoves = [];
    computerMoves = [];
    toggleClickable();
    strictLight.classList.remove("led-on");
  }

  /////////////////////////////
  // BUTTON EVENT LISTENERS //
  ////////////////////////////


  // POWER SWITCH

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
      reset();
    }
  });

  // START BUTTON

  startButton.addEventListener("mousedown", function() {
    startButton.style.boxShadow = "0px 0px 0px #222";
  });

  startButton.addEventListener("mouseup", function() {
    startButton.style.boxShadow = "0px 2px 3px #222";
    powerOn ? computerMove() : console.log("Turn on the game");
  })

  // STRICT BUTTON

  strictButton.addEventListener("mousedown", function() {
    strictButton.style.boxShadow = "0px 0px 0px #222";
  });

  strictButton.addEventListener("mouseup", function() {
    strictButton.style.boxShadow = "0px 2px 3px #222";
    if (powerOn) {
        strictLight.classList.toggle("led-on");;
      }
  });



  // loop through 4 color buttons to set event handlers
    gameButtons.forEach(button => button.addEventListener("click", playerMoveHandler));

    })();