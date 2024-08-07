class Pipe {
  constructor() {
    const spacing = random(150, 250);
    const centerY = random(spacing, height - spacing);
    this.top = centerY - spacing / 2;
    this.bottom = height - (centerY + spacing / 2);
    this.x = width;
    this.w = 60;
    this.speed = 8;
  }

  hits(bird) {
    const birdTop = bird.y - bird.r;
    const birdBottom = bird.y + bird.r;
    const birdLeftEdge = bird.x;
    const birdRightEdge = bird.x + bird.r;

    const pipeLeftEdge = this.x;
    const pipeRightEdge = this.x + this.w;

    return (
      (birdTop < this.top || birdBottom > height - this.bottom) &&
      birdRightEdge > pipeLeftEdge &&
      birdLeftEdge < pipeRightEdge
    );
  }

  show() {
    stroke(250);
    fill(160);
    strokeWeight(4);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
    strokeWeight(1);
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    return this.x < -this.w;
  }
}