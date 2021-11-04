let fireworks, gravity;
let no_per_step = 3;
function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight - 10);
  fireworks = [];
  gravity = createVector(0, 0.1);
  colorMode(HSL);
}

setInterval(() => {
  for (var i = 0; i < random(1, no_per_step); i++) {
    fireworks.push(new Firework());
  }
}, Math.random() * 1000 + 5000);

function draw() {
  // background(180, 20, 20, 0.1);
  background(0, 0, 0);
  fireworks.forEach((f) => f.update());
  fireworks = fireworks.filter((f) => !f.isDead());
}
