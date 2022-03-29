let pr_mutate = 0.1;
function mutate(child) {

  for (let i = 0; i < child.brain.weights_ih.rows; i++) {
    for (let j = 0; j < child.brain.weights_ih.cols; j++) {
      if(random(1) < pr_mutate){
        child.brain.weights_ih.data[i][j] += randomGaussian(0, 0.5);
      }
    }
  }

  for (let i = 0; i < child.brain.weights_ho.rows; i++) {
    for (let j = 0; j < child.brain.weights_ho.cols; j++) {
      if(random(1) < pr_mutate){
        child.brain.weights_ho.data[i][j] += randomGaussian(0, 0.5);
      }
    }
  }

  for (let i = 0; i < child.brain.bias_h.rows; i++) {
    for (let j = 0; j < child.brain.bias_h.cols; j++) {
      if(random(1) < pr_mutate){
        child.brain.bias_h.data[i][j] += randomGaussian(0, 0.5);
      }
    }
  }

  for (let i = 0; i < child.brain.bias_o.rows; i++) {
    for (let j = 0; j < child.brain.bias_o.cols; j++) {
      if(random(1) < pr_mutate){
        child.brain.bias_o.data[i][j] += randomGaussian(0, 0.5);
      }
    }
  }
}


function crossover(parent1, parent2){
  for (let i = 0; i < parent1.brain.weights_ih.rows; i++) {
    for (let j = 0; j < parent1.brain.weights_ih.cols; j++) {
      if(random(1) < 0.5){
        parent1.brain.weights_ih.data[i][j] = parent2.brain.weights_ih.data[i][j];
      }
    }
  }

  for (let i = 0; i < parent1.brain.weights_ho.rows; i++) {
    for (let j = 0; j < parent1.brain.weights_ho.cols; j++) {
      if(random(1) < 0.5){
        parent1.brain.weights_ho.data[i][j] =  parent2.brain.weights_ho.data[i][j];
      }
    }
  }

  for (let i = 0; i < parent1.brain.bias_h.rows; i++) {
    for (let j = 0; j < parent1.brain.bias_h.cols; j++) {
      if(random(1) < 0.5){
        parent1.brain.bias_h.data[i][j] =  parent2.brain.bias_h.data[i][j];
      }
    }
  }

  for (let i = 0; i < parent1.brain.bias_o.rows; i++) {
    for (let j = 0; j < parent1.brain.bias_o.cols; j++) {
      if(random(1) < 0.5){
        parent1.brain.bias_o.data[i][j] =  parent2.brain.bias_o.data[i][j];
      }
    }
  }

  return parent1;
}

function poolSelection(population) {
  let index = 0;
  let r = random(0.5);
  while (r > 0) {
    r -= population[index].fitness;
    index += 1;
  }
  index -= 1;
  return population[index].copy();
}

function nextGeneration() {
  resetGame();
  numofAlive = totalPopulation;
  normalizeFitness(allBirds);
  activeBirds = generate(allBirds);
  allBirds = activeBirds.slice();
  activeBirds[0] = bestBird;
}

function generate(old_population) {
  // Sort all
  old_population.sort(function(a, b){return b.fitness - a.fitness});

  let parents = [];
  for (let i = 0; i < totalPopulation; i++) {
    let parent = poolSelection(old_population);
    parents[i] = parent;
  }
  let new_population = [];
  for(let i = 0; i < totalPopulation; i++){
    new_population[i] = crossover(random(parents), random(parents));
    mutate(new_population[i]);
    new_population[i] = new Bird(new_population[i].brain);
  }
  for(let i = 0; i < 0.05 * totalPopulation; i++){
    new_population[i] = old_population[i];
    new_population[i].score = 0;
  }
  return new_population;
}

function normalizeFitness(population) {
  for (let i = 0; i < population.length; i++) {
    population[i].score = pow(population[i].score, 4);
  }

  let sum = 0;
  for (let i = 0; i < population.length; i++) {
    sum += population[i].score;
  }
  for (let i = 0; i < population.length; i++) {
    population[i].fitness = population[i].score / sum;
  }
}


function resetGame() {
  counter = 0;
  score = 0;
  numofAlive = totalPopulation;
  if (bestBird) {
    bestBird.score = 0;
    bestBird.x = 200;
  }
  pipes = [];
  pipes.push(new Pipe());
}
