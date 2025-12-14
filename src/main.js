const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let background;
let playerImage;
let player = {}

player.x = 190;
player.y = 160;
player.width = 150;
player.height = 150;

let camera = {
  x: 0,
  y: 0
}

let borders = {
  minx: 0,
  maxx: 1414,
  miny: 0,
  maxy: 2000
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
  ctx.drawImage(background, camera.x, camera.y,500,500,0,0,500,500);
  // Draw player relative to camera (canvas coordinates)
  const pw = player.width || 32;
  const ph = player.height || 32;
  ctx.drawImage(playerImage, player.x - camera.x, player.y - camera.y, pw, ph);
}

function collisions() {
  const playerWidth = player.width || 32;
  const playerHeight = player.height || 32;

  return player.x >= borders.minx &&
         player.x + playerWidth <= borders.maxx &&
         player.y >= borders.miny &&
         player.y + playerHeight <= borders.maxy;
}

function update() {
  const speed = 2;

  let newX = player.x;
  let newY = player.y;
  if (keys["ArrowUp"]) newY -= speed;
  if (keys["ArrowDown"]) newY += speed;
  if (keys["ArrowLeft"]) newX -= speed;
  if (keys["ArrowRight"]) newX += speed;

  const pw = player.width || 32;
  const ph = player.height || 32;
  newX = Math.min(Math.max(newX, borders.minx), borders.maxx - pw);
  newY = Math.min(Math.max(newY, borders.miny), borders.maxy - ph);

  player.x = newX;
  player.y = newY;

  camera.x = player.x - canvas.width / 2 + pw / 2;
  camera.y = player.y - canvas.height / 2 + ph / 2;
  camera.x = Math.min(Math.max(camera.x, borders.minx), borders.maxx - canvas.width);
  camera.y = Math.min(Math.max(camera.y, borders.miny), borders.maxy - canvas.height);
}

main();