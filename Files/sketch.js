let cats = [];
let mice = [];
const nCats = 3;
let nMice;

let counter, inputValue, showTime, interval;
let button,question;

let catPng, mousePng;
var emptyField = "( >=3 && <= 100 )";
let e;

function preload() {
  catPng = loadImage("cat.png");
  mousePng = loadImage("mouse.png");
}

function setup() {
  createCanvas(640, 360);
  e = new Exception();
  restartSketch();
}

function draw() {
  background(51);
  frameRate(40);

  for (let i = 0; i < mice.length; i++) {
    imageMode(CENTER);
    image(mousePng, mice[i].x, mice[i].y, 25, 25);
  }

  for (let i = 0; i < nCats; i++) {
    cats[i].eat(mice);
    cats[i].update();
    cats[i].display();
    cats[i].boundaries();
    cats[i].findClosest(mice);
  }

  if (mice.length < 1) {
    timeStop();
    noLoop();
    button = createButton("restart");
    button.mousePressed(resetPage);
  }
}

function resetPage() {
  location.reload();
}

function restartSketch() {
  question = askQuestion();

  if (question === "") {
    // empty field
    e.showMessage("You did not enter anything.");
    return restartSketch();
  } else if (question === null) {
    // pressed cancel
    e.showMessage(
      "You have pressed 'Cancel'\nClick 'OK' to enter a proper value."
    );
    return restartSketch();
  } else if (question < 3 || question > 100) {
    // exceeded bounds
    e.showMessage("Out of bounds.\nEnter again.");
    return restartSketch();
  } else if (isNaN(question)) {
    // not a number
    e.showMessage("You did not enter a proper number!");
    return restartSketch();
  } else if (question >= 3 && question <= 100 && !isNaN(question)) {
    nMice = question; // proper number
  }

  for (let i = 0; i < nCats; i++) {
    //NO. of cats
    let x = random(width);
    let y = random(height);
    cats[i] = new Cat(x, y);
  }

  for (let i = 0; i < nMice; i++) {
    //NO. of mice
    let x = random(width);
    let y = random(height);
    mice.push(createVector(x, y));
  }

  if (mice.length < 1) {
    timeStop();
    noLoop();
  }

  showTime = 0.0;
  counter = createP(" ");
  interval = setInterval(counting, 40);
}

function askQuestion() {
  var message;
  message = window.prompt("Enter the number of mice", emptyField);
  loop();
  return message;
}

function removeButton() {
  button.remove();
  restartSketch();
}

function timeStop() {
  clearInterval(interval);
}

function counting() {
  counter.html(round(showTime, 1));
  showTime += 0.1;
}
