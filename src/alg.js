const MUTATION_RATE = 0.1;

function mutate(child) {
  const mutateLayer = (layer) => {
    for (let i = 0; i < layer.rows; i++) {
      for (let j = 0; j < layer.cols; j++) {
        if (random(1) < MUTATION_RATE) {
          layer.data[i][j] += randomGaussian(0, 0.5);
        }
      }
    }
  };

  mutateLayer(child.brain.weights_ih);
  mutateLayer(child.brain.weights_ho);
  mutateLayer(child.brain.bias_h);
  mutateLayer(child.brain.bias_o);
}

function crossover(parent1, parent2) {
  const crossoverLayer = (layer1, layer2) => {
    for (let i = 0; i < layer1.rows; i++) {
      for (let j = 0; j < layer1.cols; j++) {
        if (random(1) < 0.5) {
          layer1.data[i][j] = layer2.data[i][j];
        }
      }
    }
  };

  crossoverLayer(parent1.brain.weights_ih, parent2.brain.weights_ih);
  crossoverLayer(parent1.brain.weights_ho, parent2.brain.weights_ho);
  crossoverLayer(parent1.brain.bias_h, parent2.brain.bias_h);
  crossoverLayer(parent1.brain.bias_o, parent2.brain.bias_o);

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

function generate(oldPopulation) {
  oldPopulation.sort((a, b) => b.fitness - a.fitness);

  const parents = Array.from({length: totalPopulation}, () => poolSelection(oldPopulation));
  const newPopulation = parents.map(() => {
    const child = crossover(random(parents), random(parents));
    mutate(child);
    return new Bird(child.brain);
  });

  // Elitism: Keep top 5% of old population
  const eliteCount = Math.floor(0.05 * totalPopulation);
  for (let i = 0; i < eliteCount; i++) {
    newPopulation[i] = oldPopulation[i];
    newPopulation[i].score = 0;
  }

  return newPopulation;
}

function normalizeFitness(population) {
  population.forEach(bird => bird.score = Math.pow(bird.score, 4));
  const sum = population.reduce((acc, bird) => acc + bird.score, 0);
  population.forEach(bird => bird.fitness = bird.score / sum);
}

function resetGame() {
  counter = 0;
  score = 0;
  numofAlive = totalPopulation;
  if (bestBird) {
    bestBird.score = 0;
    bestBird.x = 200;
  }
  pipes = [new Pipe()];
}