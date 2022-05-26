function lerp(x0, x1, t) {
  return x0 + (x1 - x0) * t;
}


class Particle {
  constructor(pos, target, h, mforce, mspeed, r) {
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
  }

  lerp2D(v, n) {
    return createVector(
      lerp(3 * v.x, lerp(v.x, this.target.x, n), n),
      lerp(3 * v.y, lerp(v.y, this.target.y, n), n)
    )
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
    steer = this.lerp2D(steer, 0, this.lifespan / 255);
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
