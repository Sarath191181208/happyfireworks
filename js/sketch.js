let fireworks, gravity;
let no_per_step = 5;
function setup() {
  console.log(
    "Author: Vangipuram Srinivasa Sarath Chandra, Email: vssarathc04@gmail.com"
  );
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  fireworks = [];
  gravity = createVector(0, 0.1);
  colorMode(HSL);
}

setInterval(() => {
  if (fireworks.length < no_per_step / 2) {
    for (var i = 0; i < random(1, no_per_step); i++) {
      fireworks.push(new Firework());
    }
  }
}, Math.random() * 1000 + 5000);

function draw() {
  background(180, 0, 0, 0.1);
  // background(0, 0, 0);
  fireworks.forEach((f) => f.update());
  fireworks = fireworks.filter((f) => !f.isDead());
}
