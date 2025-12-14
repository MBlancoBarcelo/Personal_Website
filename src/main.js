const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let background;
let playerImage;
let player = {}

let camera = {
  x: 0,
  y: 0
}

function getKeys() {
  let keys = {}
  window.onkeydown = function (e) {
      console.log(e.key);

    keys[e.key] = true;
  }
  window.onkeyup = function (e) {
    keys[e.key] = false;
  }
  
  return keys;
}

let keys = getKeys();

async function main() {
  background = await loadImage("./img/cv.png");
  playerImage = await loadImage("./img/placeholder.PNG");

  requestAnimationFrame(mainLoop);

}

function loadImage(src) {
    let img = new Image();
    img.src = src;
    return new Promise((resolve, reject) => {
      img.onload = () => resolve(img);
      img.onerror = reject;
    })
  }


function mainLoop() {
  update();
  ctx.save();
  draw();
  ctx.restore()

  requestAnimationFrame(mainLoop);
}

function draw() {
  ctx.drawImage(playerImage, 0, 0);
}

function update() {
  if (keys["ArrowUp"]) {
    console.log("Lalelu");
  }
  if (keys["ArrowDown"]) {
    console.log("Lalelu");
  }
  if (keys["ArrowLeft"]) {
    console.log("Lalelu");
  }
  if (keys["ArrowRight"]) {
    console.log("Lalelu");
  }
}

main();