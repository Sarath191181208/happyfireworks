class Firework {
  constructor() {
    this.pos = createVector(random(70, width - 70), height);
    this.vel = createVector(0, random(-5, -10));
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
    var shapes = [
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
    var mul = shape[1];
    shape = shape[0];
    for (let a = 0; a < mul * TWO_PI; a += 0.08) {
      var pos = shape(shape_size, a);
      var x = pos[0];
      var y = pos[1];

      // abs shape
      // var target = createVector(this.pos.x + x, this.pos.y + y);

      // noise
      const newX = random(x - 5, x + 5);
      const newY = random(y - 5, y + 5);
      var target = createVector(this.pos.x + newX, this.pos.y + newY);
      maxForce = random(0.1, 1);
      maxSpeed = random(2, 5);
      size = 13;

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
