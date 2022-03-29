class Bird {
  constructor(brain) {
    this.x = 200;
    this.y = height / 2;
    this.r = 12;

    this.gravity = 0.6;
    this.lift = -19;
    this.velocity = 0;

    this.score = 0;
    this.fitness = 0;

    if (brain instanceof NeuralNetwork) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(5, 20, 2);
    }
  }

  copy() {
    return new Bird(this.brain);
  }

  show() {
    fill(255, 50, 100, 100);
    stroke(200);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
    fill(255, 100);
  }

  show2() {
    fill(255);
    stroke(200);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
    fill(255, 100);
  }

  think(pipes) {
    let closest = null;
    let next_closest = null;
    // let nnext_closest = null;
    let record = Infinity;
    for (let i = 0; i < pipes.length; i++) {
      let diff = pipes[i].x + pipes[i].w - this.x;
      if (diff > 0 && diff < record) {
        record = diff;
        next_closest = closest = pipes[i];
        if(pipes.length > i + 1){
          next_closest = pipes[i + 1];
        } 
        // if(pipes.length > 2){
        //   nnext_closest = pipes[i + 2];
        // } 
      } 
    }
    if (closest != null) {
      let inputs = [];
      inputs[0] = map(closest.x, this.x, width, 0, 1);
      inputs[1] = map(closest.bottom, 0, height, 0, 1);
      inputs[2] = map(next_closest.bottom, 0, height, 0, 1);
      inputs[3] = map(this.y, 0, height, 0, 1);
      inputs[4] = map(this.velocity, -5, 5, 0, 1);

      let action = this.brain.predict(inputs);
      // Decide to jump or not!
      if (action[1] > action[0]) {
        this.up();
      }
    }
  }

  up() {
    this.velocity += this.lift;
  }

  bottomTop() {
    return (this.y > height || this.y < 0);
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;
    this.score++;
  }
}

// function mutate(x) {
//   if (random(1) < 0.1) {
//     let offset = randomGaussian() * 0.5;
//     let newx = x + offset;
//     return newx;
//   } else {
//     return x;
//   }
// }
