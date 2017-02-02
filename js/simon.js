var powerOn = false;
var switchSlot = document.querySelector(".slot");
var powerSwitch = document.querySelector(".switch");
var strictModeButton = document.querySelector(".strict");
var startButton = document.querySelector(".start");
var display = document.querySelector(".display");
var computerMoves = [];
var playerMoves = [];


powerSwitch.addEventListener("click", function() {
  if (!powerOn) {
    display.style.color = "#DC0D29";
    switchSlot.style.justifyContent = "flex-end";
    powerOn = true;
  } else {
    display.style.color = "#32050C";
    switchSlot.style.justifyContent = "flex-start";
    powerOn = false;
  }
});
