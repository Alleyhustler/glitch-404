'use strict';
console.log('kaleidoscope');

let input;
let img;
let canvas;
let img_buffer;
let tile_amount = 2;

function preload() {
  img = loadImage('/images/kaleidoscope.jpeg');
}

function setup() {
  pixelDensity(1);

  // input = createFileInput(handleFile);
  // input.position(0, 0);

  // fill available canvas space with image
  let window_ratio = windowWidth / windowHeight;
  let img_ratio = img.width / img.height;
  if (window_ratio > img_ratio) {
    img.resize(0, windowHeight-16)
  } else {
    img.resize(windowWidth-16, 0);
  }


  // draw img to canvas (where we create the effect)
  // canvas = createCanvas(windowWidth, windowHeight);
  canvas = createCanvas(img.width, img.height);
  canvas.parent("canvas-container");
  image(img, 0, 0);

  // also draw img to buffer (where we create the effect)
  img_buffer = createGraphics(img.width, img.height);
  img_buffer.parent("canvas-container");
  img_buffer.image(img, 0, 0);
}

function draw() {
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
//   drawImageToCanvas();
// }

function mouseMoved() {
  let tile_w = img.width / tile_amount;
  let tile_h = img.height / tile_amount;
  let tile = img.get(mouseX-(tile_w/2), mouseY-(tile_h/2), tile_w, tile_h);

  for(let i = 0; i < img.width; i+=tile_w) {
    for(let j = 0; j < img.height; j+=tile_h) {
      // kaleidoscope(i*100, j*100, 100, 100);
      image(tile, i, j);
      img_buffer.image(tile, i, j);
    }
  }
}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img = createImg(file.data, '');
    img.hide();
  } else {
    img = null;
  }
}

function keyPressed() {
  if (key == "s") {
    save(img_buffer, 'jpg');
  }

  if (key == "1") { tile_amount = 1; }
  if (key == "2") { tile_amount = 2; }
  if (key == "3") { tile_amount = 3; }
  if (key == "4") { tile_amount = 4; }
  if (key == "5") { tile_amount = 5; }
  if (key == "6") { tile_amount = 6; }
  if (key == "7") { tile_amount = 7; }
  if (key == "8") { tile_amount = 8; }
  if (key == "p") { tile_amount = 16; }
}