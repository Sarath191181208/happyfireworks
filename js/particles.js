
class Particle {
  constructor(pos, target, h, mforce, mspeed, r, anim) {
    this.pos = pos.copy()
    this.vel = createVector()
    this.acc = createVector()
    this.target = target.copy()
    this.h = h
    this.s = random(40, 70)
    this.r = r
    this.maxForce = mforce || 0.3
    this.maxSpeed = mspeed || 4
    this.lifespan = 255

    this.anim = anim ? anim : (v, n) => v;
  }

  lerp2D(v, n) {
    return this.anim(v, n);
    // return random(anims)(v, n);
    // slow pop
    // return createVector(
    //   lerp(v.x, 0, n),
    //   lerp(v.y, 0, n)
    // )
    // spread blast
    // return createVector(
    //   lerp(v.x, -v.x, n),
    //   lerp(v.y, -v.y, n)
    // )

    // line to open
    // return createVector(
    //   lerp(v.x, lerp(v.x, 0, n), n),
    //   lerp(v.y, -0.1 * lerp(v.y, 0, n), n)
    // )

    // circle to shape
    // return createVector(
    //   lerp(v.x, -0.2 * v.x, n),
    //   lerp(v.y, -0.2 * v.y, n)
    // )

    // Asteroid 
    // return createVector(
    //   lerp(v.y, 0, n),
    //   lerp(v.x, 0, n)
    // )

    // spread
    // return createVector(
    //   lerp(v.x * random([1, -1]) * v.x, 0, n),
    //   lerp(v.y * random([1, -1]) * v.x, 0, n)
    // )
  }
  behaviours() {
    let seek = this.seek(this.target);
    this.applyForce(seek);
  }
  seek(target) {
    const desired = p5.Vector.sub(target, this.pos)
    const dist = desired.mag()
    let speed = this.maxSpeed
    if (dist < 50) {
      speed = map(dist, 0, 50, 0, this.maxSpeed)
    }
    // speed = this.lerp2D(this.vel, speed, this.lifespan / 255);
    desired.setMag(speed)
    let steer = p5.Vector.sub(desired, this.vel)
    steer.limit(this.maxForce)
    steer = this.lerp2D(steer, this.lifespan / 255);
    return steer
  }
  applyForce(force) {

    this.acc.add(force)
  }
  isDead() {
    return (this.lifespan < 0)
  }
  draw() {
    push()
    noStroke()
    fill(this.h, this.s, this.s, this.lifespan / 255)
    ellipse(this.pos.x, this.pos.y, this.r)
    pop()
  }
  update() {
    this.draw();
    this.behaviours();
    this.target.add(gravity);

    this.lifespan--;
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }
}
