import cvImg from "/src/imgs/cv.png";
import derecha from "/src/imgs/derecha.png"; 
import fotomia from "/src/imgs/centro.png";
import izquierda from "/src/imgs/izquierda.png";
import arriba from "/src/imgs/arriba.png";
import abajo from "/src/imgs/abajo.png";
import diagonalArribaDerecha from "/src/imgs/arriba-derecha.png";
import diagonalArribaIzquierda from "/src/imgs/arriba-izquierda.png";
import diagonalAbajoDerecha from "/src/imgs/abajo-derecha.png";
import diagonalAbajoIzquierda from "/src/imgs/abajo-izquierda.png";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const modolebronjames = document.getElementById("modolebronjames");
const botones = document.getElementById("botones");
let interval;

let images = {
  centro : await loadImage(fotomia),
  derecha : await loadImage(derecha),
  izquierda : await loadImage(izquierda),
  arriba : await loadImage(arriba),
  abajo : await loadImage(abajo),
  diagonalArribaDerecha : await loadImage(diagonalArribaDerecha),
  diagonalArribaIzquierda : await loadImage(diagonalArribaIzquierda),
  diagonalAbajoDerecha : await loadImage(diagonalAbajoDerecha),
  diagonalAbajoIzquierda : await loadImage(diagonalAbajoIzquierda)
}

botones.addEventListener("pointerdown", (event) => {
  interval = setInterval(() => {
    let key;
    switch(event.target.id) {
      case "arriba":
        key = "ArrowUp";
        break;
      case "abajo":
        key = "ArrowDown";
        break;
      case "izquierda":
        key = "ArrowLeft";
        break;
      case "derecha":
        key = "ArrowRight";
        break;
    }
    keys[key] = true;
    console.log(event.target.id);
  }, 100);
}); 

botones.addEventListener("pointerup", () => {
  ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].forEach(key => {
  keys[key] = false;
});
  console.log(keys);
  clearInterval(interval);
});

botones.addEventListener("pointerleave", () => {
  ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].forEach(key => {
  keys[key] = false;
});
  clearInterval(interval);
});


let background;
let playerImage;
let player = {}

player.x = 190;
player.y = 160;
player.width = 150;
player.height = 150;

playerImage = images.centro;

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
  background = await loadImage(cvImg);

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
  const pw = player.width || 32;
  const ph = player.height || 32;
  ctx.drawImage(playerImage, player.x - camera.x, player.y - camera.y, pw, ph);
}

function update() {
  const speed = 2;

  let newX = player.x;
  let newY = player.y;

  let swift = keys["Shift"];
  let isMoving = false;


  if (keys["ArrowUp"] && keys["ArrowRight"]) {
    newY -= swift ? speed * 2 : speed;
    newX += swift ? speed * 2 : speed;
    playerImage = images.diagonalArribaDerecha;
    isMoving = true;
  }
  else if (keys["ArrowUp"] && keys["ArrowLeft"]) {
    newY -= swift ? speed * 2 : speed;
    newX -= swift ? speed * 2 : speed;
    playerImage = images.diagonalArribaIzquierda;
    isMoving = true;
  }
  else if (keys["ArrowDown"] && keys["ArrowRight"]) {
    newY += swift ? speed * 2 : speed;
    newX += swift ? speed * 2 : speed;
    playerImage = images.diagonalAbajoDerecha;
    isMoving = true;
  }
  else if (keys["ArrowDown"] && keys["ArrowLeft"]) {
    newY += swift ? speed * 2 : speed;
    newX -= swift ? speed * 2 : speed;
    playerImage = images.diagonalAbajoIzquierda;
    isMoving = true;
  }

  else if (keys["ArrowUp"]) {
    newY -= swift ? speed * 2 : speed;
    playerImage = images.arriba;
    isMoving = true;
  }
  else if (keys["ArrowDown"]) {
    newY += swift ? speed * 2 : speed;
    playerImage = images.abajo;
    isMoving = true;
  }
  else if (keys["ArrowLeft"]) {
    newX -= swift ? speed * 2 : speed;
    playerImage = images.izquierda;
    isMoving = true;
  }
  else if (keys["ArrowRight"]) {
    newX += swift ? speed * 2 : speed;
    playerImage = images.derecha;
    isMoving = true;
  }

  if (!isMoving) {
    playerImage = images.centro;
  }

  const pw = player.width;
  const ph = player.height;

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