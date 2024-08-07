let totalPopulation = 200;
let activeBirds = [];
let allBirds = [];
let pipes = [];
let counter = 0;
let score = 0;
let speedSlider;
let speedSpan;
let highScoreSpan;
let allTimeHighScoreSpan;
let numofGeneration = 0;
let numofAlive = 0;
let highScore = 0;
let runBest = false;
let runBestButton;

function setup() {
  initializeCanvas();
  initializeUIElements();
  initializeBirds();
  initializePipes();
}

function initializeCanvas() {
  const canvas = createCanvas(1200, 500);
  canvas.parent('canvascontainer');
}

function initializeUIElements() {
  speedSlider = selectElement('#speedSlider');
  speedSpan = selectElement('#speed');
  highScoreSpan = selectElement('#hs');
  allTimeHighScoreSpan = selectElement('#ahs');
  numofGen = selectElement('#numgen');
  numAlive = selectElement('#numalive');
  runBestButton = selectElement('#best');
  
  if (runBestButton) {
    runBestButton.mousePressed(toggleState);
  } else {
    console.error("Run Best button not found");
  }
}

function initializeBirds() {
  numofAlive = totalPopulation;
  activeBirds = [];
  allBirds = [];

  for (let i = 0; i < totalPopulation; i++) {
    const bird = new Bird();
    activeBirds.push(bird);
    allBirds.push(bird);
  }
}

function initializePipes() {
  pipes = [new Pipe()];
}

function selectElement(selector) {
  const element = select(selector);
  if (!element) {
    console.error(`Element not found: ${selector}`);
  }
  return element;
}

function toggleState() {
  runBest = !runBest;
  resetGame();
}

function showScores() {
  textSize(32);
  text('score: ' + score, 1500, 50);
}

function draw() {
  background(0, 80, 60);
  let cycles = speedSlider.value();
  speedSpan.html(cycles);

  for (let n = 0; n < cycles; n++) {
    updatePipes();
    if (runBest) {
      updateBestBird();
    } else {
      updateActiveBirds();
    }
    if (pipes.length && shouldAddNewPipe()) {
      pipes.push(new Pipe());
    }
    counter++;
  }

  updateScores();
  drawElements();
  showScores();
}

function updatePipes() {
  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update();
    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
      score++;
    }
  }
}

function updateBestBird() {
  bestBird.think(pipes);
  bestBird.update();
  for (let j = 0; j < pipes.length; j++) {
    if (pipes[j].hits(bestBird)) {
      resetGame();
      break;
    }
  }
  if (bestBird.bottomTop()) {
    resetGame();
  }
}

function updateActiveBirds() {
  for (let i = activeBirds.length - 1; i >= 0; i--) {
    let bird = activeBirds[i];
    bird.think(pipes);
    bird.update();

    for (let j = 0; j < pipes.length; j++) {
      if (pipes[j].hits(bird)) {
        activeBirds.splice(i, 1);
        numAlive.html(--numofAlive);
        break;
      }
    }

    if (bird.bottomTop()) {
      activeBirds.splice(i, 1);
      numAlive.html(numofAlive = activeBirds.length);
    }
  }
}

function shouldAddNewPipe() {
  return Math.abs(pipes[pipes.length - 1].x - 0.7 * width) <= 2 * pipes[pipes.length - 1].speed;
}

function updateScores() {
  let tempHighScore = runBest ? bestBird.score : Math.max(...activeBirds.map(bird => bird.score));
  
  if (tempHighScore > highScore) {
    highScore = tempHighScore;
    if (!runBest) {
      bestBird = activeBirds.find(bird => bird.score === tempHighScore);
    }
  }

  highScoreSpan.html(tempHighScore);
  allTimeHighScoreSpan.html(highScore);
}

function drawElements() {
  pipes.forEach(pipe => pipe.show());
  
  if (runBest) {
    bestBird.show(isLeader = true);
  } else {
    activeBirds.slice(1).forEach(bird => bird.show());
    if (activeBirds.length > 0) {
      activeBirds[0].show(true);
    } else {
      numofGen.html(++numofGeneration);
      nextGeneration();
    }
  }
}