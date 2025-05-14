// 'use strict';
console.log('glitchmachine');

let img;
let canvas;

function preload() {
  img = loadImage("/images/glitchmachine.jpeg");
}

function setup() {
  pixelDensity(1);
  
  // fill available canvas space with image
  let window_ratio = windowWidth / windowHeight;
  let img_ratio = img.width / img.height;
  if (window_ratio > img_ratio) {
    img.resize(0, windowHeight-16)
  } else {
    img.resize(windowWidth-16, 0);
  }
  
  myCanvas = createCanvas(img.width,img.height);
  myCanvas.parent("canvas-container");
  
  image(img,0,0);
}

function draw() {

}

var lastX = 0;
var lastY = 0;

function mousePressed() {
  lastX = int(mouseX);
  lastY = int(mouseY);
  print("click started at " + lastX + "," + lastY);
}

function mouseDragged() {

  // which_direction(lastX, lastY, mouseX, mouseY);

  loadPixels();

  var direction = "";

  if (abs(mouseX-lastX) > abs(mouseY-lastY)) {
    var y_start = 0;
    var y_end = height;
    var x_start = min(lastX, int(mouseX));
    var x_end = max(lastX, int(mouseX));
    direction = "horizontal";
  } else {
    var y_start = min(lastY, int(mouseY));
    var y_end = max(lastY, int(mouseY));
    var x_start = 0;
    var x_end = width;
    direction = "vertical";
  }

  for (var y = y_start; y < y_end; y++){
    for (var x = x_start; x < x_end; x++) {
      var index = (x + y * width) * 4;

      var index_source = (direction == "horizontal")
        ? (lastX + y * width) * 4
        : (x + lastY * width) * 4;

      pixels[index+0] = pixels[index_source+0];
      pixels[index+1] = pixels[index_source+1];
      pixels[index+2] = pixels[index_source+2];;
      pixels[index+3] = 255;
    }
  }

  updatePixels();

  // lastX = int(mouseX);
  // lastY = int(mouseY);
}

function which_direction(x_0, y_0, x_1, y_1) {
  if (abs(x_1-x_0) > abs(y_1-y_0)) {
    if (x_1 > x_0) {
      print("RIGHT");
    } else if (x_1 < x_0) {
      print("LEFT");
    }
  } else if (abs(y_1-y_0) > abs(x_1-x_0)) {
    if (y_1 > y_0) {
      print("DOWN");
    } else if (y_1 < y_0) {
      print("UP");
    }
  }
}

function mouseClicked() {
}

function keyPressed() {
  if (key == "s") {
    saveCanvas('canvas', 'jpg');
  }
}