class Firework {
  constructor() {
    this.pos = createVector(random(40, width - 40), height);
    // v^2 - u^2 = 2as
    // => u = sqrt(2*g*windowHeight)
    // windowHeight = s
    let u = Math.sqrt(2 * gravity.y * (windowHeight * 0.8));
    // this.vel = createVector(0, -u);
    this.vel = createVector(0, random(-5, -u));
    this.acc = createVector();
    this.size = 10;
    this.particles = [];
    this.exploded = false;
    this.lifespan = 255;
    this.h = random(200, 480);
    this.s = random(30, 80);
  }
  explose() {
    let maxForce,
      maxSpeed,
      size = 10;
    // const shape_size = random(7, size);
    const shape_size = 10;
    let shapes = [
      //[function            |   itr]
      [(s, a) => heart(s, a), 1],
      [(s, a) => clover(s, a), 1],
      [(s, a) => clover_4(s, a), 1],
      [(s, a) => flower(s, a), 4],
      [(s, a) => star(s, a), 1],
      [(s, a) => star_4(s, a), 1],
      [(s, a) => splash(s, a), 1],
    ];
    let shape = random(shapes);
    let mul = shape[1];
    shape = shape[0];
    let itr = 0;
    for (let a = 0; a < mul * TWO_PI; a += 0.08) {
      itr++;
      if (mul == 4 && itr % 2 == 0) { continue }
      let pos = shape(shape_size, a);
      let x = pos[0];
      let y = pos[1];

      // abs shape
      let target = createVector(this.pos.x + x, this.pos.y + y);

      // noise
      // const newX = random(x - 5, x + 5);
      // const newY = random(y - 5, y + 5);
      // target = createVector(this.pos.x + newX, this.pos.y + newY);
      // maxForce = random(0.1, 1);
      // maxSpeed = random(2, 5);
      // size = 13;

      this.particles.push(
        new Particle(this.pos, target, this.h, maxForce, maxSpeed, size)
      );
    }
  }
  draw() {
    noStroke();
    fill(this.h, this.s, this.s);
    ellipse(this.pos.x, this.pos.y, this.size);
  }
  isDead() {
    return this.exploded && this.particles.length === 0;
  }
  applyForce(force) {
    this.acc.add(force);
  }
  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);

    if (this.exploded) {
      this.particles.forEach((p) => p.update());
      this.particles = this.particles.filter((p) => !p.isDead());
    } else {
      this.draw();
    }
    if (this.vel.y > 0 && !this.exploded) {
      this.exploded = true;
      this.explose();
    }

    this.applyForce(gravity);
  }
}
