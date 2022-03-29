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
  let canvas = createCanvas(1200, 700);
  canvas.parent('canvascontainer');

  speedSlider = select('#speedSlider');
  speedSpan = select('#speed');
  highScoreSpan = select('#hs');
  allTimeHighScoreSpan = select('#ahs');
  numofGen = select('#numgen');
  numAlive = select('#numalive');
  runBestButton = select('#best');
  runBestButton.mousePressed(toggleState);
  numofAlive = totalPopulation;

  for (let i = 0; i < totalPopulation; i++) {
    let bird = new Bird();
    activeBirds[i] = bird;
    allBirds[i] = bird;
  }
  pipes.push(new Pipe());
}

function toggleState() {
  runBest = !runBest;
  if (runBest) {
    resetGame();
    runBestButton.html('continue training');
  } else {
    nextGeneration();
    runBestButton.html('run best');
  }
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
    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
        score++;
      }
    }
    if (runBest) {
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
    } else {
      for (let i = activeBirds.length - 1; i >= 0; i--) {
        let bird = activeBirds[i];
        bird.think(pipes);
        bird.update();

        for (let j = 0; j < pipes.length; j++) {
          if (pipes[j].hits(activeBirds[i])) {
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
    if(pipes.length){
      if (abs(pipes[pipes.length - 1].x - 0.7 * width) <= 2 * pipes[pipes.length - 1].speed) {
        pipes.push(new Pipe());
      }

    }
    counter++;
  }

  let tempHighScore = 0;
  if (!runBest) {
    let tempBestBird = null;
    for (let i = 0; i < activeBirds.length; i++) {
      let s = activeBirds[i].score;
      if (s > tempHighScore) {
        tempHighScore = s;
        tempBestBird = activeBirds[i];
      }
    }

    if (tempHighScore > highScore) {
      highScore = tempHighScore;
      bestBird = tempBestBird;
    }
  } else {
    tempHighScore = bestBird.score;
    if (tempHighScore > highScore) {
      highScore = tempHighScore;
    }
  }

  highScoreSpan.html(tempHighScore);
  allTimeHighScoreSpan.html(highScore);

  for (let i = 0; i < pipes.length; i++) {
    pipes[i].show();
  }

  if (runBest) {
    bestBird.show();
  } else {
    for (let i = 1; i < activeBirds.length; i++) {
      activeBirds[i].show();
    }
    if (activeBirds.length == 0) {
      numofGen.html(++numofGeneration);
      nextGeneration();
      for(let i = 0; i < totalPopulation; i++){
      }
    } else{
      activeBirds[0].show2();
    }
  }
  showScores();
}