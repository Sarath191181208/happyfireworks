// 1. heart
function heart(shape_size, a) {
  const x = shape_size * 16 * pow(sin(a), 3) - 10;
  const y =
    -shape_size * (13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a));
  return [x, y];
}

function clover(shape_size, a) {
  //2. clover
  var part_a = sin((3 * a) / 2);
  var part_b = sin((9 * a) / 2) / 5;
  var r = pow(shape_size * (part_a + part_b), 2);
  var x = r * cos(a);
  var y = r * sin(a);
  return [x, y];
}

function clover_4(shape_size, a) {
  //3. four leaf clover
  var A = 10;
  var k = 2;
  var r = shape_size * A * cos(k * a);
  var x = r * cos(a);
  var y = r * sin(a);
  return [x, y];
}

function flower(shape_size, a) {
  //4. flower
  var A = 10;
  var k = 3 / 4;
  var r = shape_size * A * cos(k * a);
  var x = r * cos(a);
  var y = r * sin(a);

  return [x, y];
}

function star(shape_size, a) {
  //5. 5 pointed star
  shape_size += 2;
  var x = 4 * cos(a) + cos(4 * a);
  x *= shape_size;
  var y = 4 * sin(a) - sin(4 * a);
  y *= shape_size;
  return [x, y];
}

function star_4(shape_size, a) {
  //6. 4 Pointed star
  var x = pow(pow(shape_size, 0.8) * cos(a), 3);
  var y = pow(pow(shape_size, 0.8) * sin(a), 3);
  return [x, y];
}

function splash(shape_size, a) {
  //7. circle
  var x = shape_size * shape_size * cos(a);
  var y = shape_size * shape_size * sin(a);
  return [x, y];
}
