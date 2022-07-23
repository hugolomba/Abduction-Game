console.log("Js conectado");

const myGameArea = {
  canvas: document.getElementById("canvas"),
  startScreen: document.getElementById("start-screen"),
  startBtn: document.getElementById("start-btn"),
  ctx: this.canvas.getContext("2d"),
  stop: false,

  clear: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

function updateGameArea() {
  myGameArea.clear();
  // ufo.newPos();
  ufo.move();
  ufo.draw();
  ufo.drawLight();

  console.log(ufo.x, ufo.y);

  if (!myGameArea.stop) {
    requestAnimationFrame(updateGameArea);
  }
}

function teste() {
  console.log("teste");
}

// setInterval(updateGameArea, 50000);

// Classes
class Component {
  constructor(width, height, x, y) {
    this.img = new Image();
    this.img.src = "./img/ufo2.png";
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 50;
    this.targetX = this.x;
    this.targetY = this.y;
    this.light = new Image();
    this.light.src = "./img/ufolight.png";
    this.lightOn = false;
    // this.speedX = 0;
    // this.speedY = 0;
  }

  draw() {
    // this.img.addEventListener("load", () =>

    myGameArea.ctx.drawImage(this.img, this.x, this.y);
    // );
  }

  clear() {
    myGameArea.ctx.clearRect(this.x, this.y, this.width, this.height);
  }

  move() {
    this.x += (this.targetX - this.x) * 0.1;
    this.y += (this.targetY - this.y) * 0.1;
  }

  moveUp() {
    this.targetY = this.y - this.speed;
    // this.y -= this.speed;
  }

  moveDown() {
    this.targetY = this.y + this.speed;
    // this.y += this.speed;
  }

  moveLeft() {
    this.targetX = this.x - this.speed;
    // this.x -= this.speed;
  }

  moveRight() {
    this.targetX = this.x + this.speed;
    // this.x += this.speed;
  }

  drawLight() {
    if (this.y > 225 && this.lightOn) {
      console.log("luz");
      let lightX = this.x + 12;
      let lightY = this.y + 60;
      myGameArea.ctx.drawImage(this.light, lightX, lightY, 113, 168);
    }
  }

  // newPos() {
  //   this.x += this.speedX;
  //   this.y += this.speedY;
  // }
}

// objetos

// const light = new Component("./img/ufolight.png");
const ufo = new Component(136, 65, 100, 100);

// Troca da tela de início para o canvas ao apaertar o botão Start

myGameArea.startBtn.addEventListener("click", () => {
  myGameArea.startScreen.style.display = "none";
  myGameArea.canvas.style.display = "inline";
  updateGameArea();
});

// manipulação do Canvas

// ufo.draw();

// movimento ao pressionar

document.addEventListener("keydown", (e) => {
  const key = e.code;
  if (key === "ArrowUp") {
    if (ufo.y > 10) {
      ufo.moveUp();
      console.log("pra cima");
      // ufo.clear();
      // ufo.newPos();
      // ufo.draw();
    }
  }
  if (key === "ArrowDown") {
    if (ufo.y < 195) {
      ufo.moveDown();
      // ufo.clear();
      // ufo.newPos();
      // ufo.draw();
    }
  }
  if (key === "ArrowLeft") {
    if (ufo.x > 7) {
      ufo.moveLeft();
      // ufo.clear();
      // ufo.newPos();
      // ufo.draw();
    }
  }
  if (key === "ArrowRight") {
    if (ufo.x < 757) {
      ufo.moveRight();
      // ufo.clear();
      // ufo.newPos();
      // ufo.draw();
    }
  }

  if (key === "Space") {
    // ufo.draw();
    ufo.lightOn = true;
  }
});

document.addEventListener("keyup", (e) => {
  const key = e.code;
  if (key === "Space") ufo.lightOn = false;
});

// const light = new Image();
// light.src = "./img/ufolight.png";

// document.addEventListener("keyup", (e) => {
//   const key = e.code;
//   if (key === "Space") {
//     let lightX = ufo.x + 12;
//     let lightY = ufo.y + 65;
//     myGameArea.ctx.clearRect(lightX, lightY, 113, 168);
//   }
// });
