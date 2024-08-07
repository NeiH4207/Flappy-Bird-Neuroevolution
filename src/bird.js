class Bird {
  constructor(brain) {
    this.x = 200;
    this.y = height / 2;
    this.r = 12;

    this.gravity = 0.6;
    this.lift = -19;
    this.velocity = 0;

    this.wingAngle = 0;
    this.wingSpeed = 0.2;

    this.score = 0;
    this.fitness = 0;

    this.brain = brain instanceof NeuralNetwork ? brain.copy() : new NeuralNetwork(5, 20, 2);
  }

  reset() {
    this.x = 200;
    this.y = height / 2;
    this.velocity = 0;
    this.score = 0;
  }
  
  copy() {
    return new Bird(this.brain);
  }

  show(isLeader = false) {
    push();
    translate(this.x, this.y);
    rotate(this.velocity * 0.05); // Tilt bird based on velocity

    if (isLeader) {
      this.drawLeaderBird();
    } else {
      this.drawRegularBird();
    }

    pop();
  }
  
  drawLeaderBird() {
    // Body
    stroke(200);
    fill(255, 255, 0); // Yellow for leader
    ellipse(0, 0, this.r * 2);
  
    // Wings
    this.drawWings(color(220, 220, 0)); // Darker yellow for wings
  
    // Eye
    fill(0);
    ellipse(this.r / 2, -this.r / 4, this.r / 3);
  
    // Beak
    fill(255, 200, 0);
    triangle(
      this.r, 0,
      this.r * 1.5, -this.r / 4,
      this.r * 1.5, this.r / 4
    );
  }
  
  drawRegularBird() {
    // Body
    stroke(200);
    fill(255, 50, 100, 200);
    ellipse(0, 0, this.r * 2);
  
    // Wings
    this.drawWings(color(200, 0, 50, 200)); // Darker pink for wings
  
    // Eye
    fill(0);
    ellipse(this.r / 2, -this.r / 4, this.r / 3);
  
    // Beak
    fill(255, 200, 0);
    triangle(
      this.r, 0,
      this.r * 1.5, -this.r / 4,
      this.r * 1.5, this.r / 4
    );
  }

  drawWings(wingColor) {
    fill(wingColor);
    push();
    translate(-this.r / 2, 0);
    rotate(sin(this.wingAngle) * PI / 6);
    ellipse(0, 0, this.r * 1.5, this.r / 2);
    pop();

    push();
    translate(-this.r / 2, 0);
    rotate(-sin(this.wingAngle) * PI / 6);
    ellipse(0, 0, this.r * 1.5, this.r / 2);
    pop();
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;
    this.score++;

    // Update wing angle for flapping animation
    this.wingAngle += this.wingSpeed;
  }

  think(pipes) {
    const closest = this.findClosestPipe(pipes);
    if (closest) {
      const inputs = this.getInputs(closest, pipes[pipes.indexOf(closest) + 1]);
      const action = this.brain.predict(inputs);
      if (action[1] > action[0]) {
        this.up();
      }
    }
  }

  findClosestPipe(pipes) {
    return pipes.reduce((closest, pipe) => {
      const diff = pipe.x + pipe.w - this.x;
      return (diff > 0 && diff < (closest ? closest.x + closest.w - this.x : Infinity)) ? pipe : closest;
    }, null);
  }

  getInputs(closest, nextClosest) {
    return [
      map(closest.x, this.x, width, 0, 1),
      map(closest.bottom, 0, height, 0, 1),
      map(nextClosest ? nextClosest.bottom : height, 0, height, 0, 1),
      map(this.y, 0, height, 0, 1),
      map(this.velocity, -5, 5, 0, 1)
    ];
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