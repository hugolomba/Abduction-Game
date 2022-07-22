console.log("Js conectado");

const canvas = document.getElementById("canvas");
const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");

const ctx = canvas.getContext("2d");

// Classes
class Component {
  constructor(img, width, height, x, y) {
    this.img = new Image();
    this.img.src = img;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
  }

  draw() {
    // this.img.addEventListener("load", () =>
    ctx.drawImage(this.img, this.x, this.y);
    // );
  }

  clear() {
    ctx.clearRect(this.x, this.y, this.width, this.height);
  }

  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
}

// objetos

const ufo = new Component("./img/ufo2.png", 136, 65, 100, 100);

// Troca da tela de início para o canvas ao apaertar o botão Start

startBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  canvas.style.display = "inline";
  ufo.draw();
});

// manipulação do Canvas

// ufo.draw();

// englobar tudo no add event listener em todas as imagens

// movimento ao pressionar

document.addEventListener("keydown", (e) => {
  const key = e.code;
  if (key === "ArrowUp") {
    ufo.speedY -= 1;
    console.log("Up");
    ufo.clear();
    ufo.newPos();
    ufo.draw();
  }
  if (key === "ArrowDown") {
    ufo.speedY += 1;
    console.log("down");
    ufo.clear();
    ufo.newPos();
    ufo.draw();
  }
  if (key === "ArrowLeft") {
    ufo.speedX -= 1;
    console.log("left");
    ufo.clear();
    ufo.newPos();
    ufo.draw();
  }
  if (key === "ArrowRight") {
    ufo.speedX += 1;
    console.log("right");
    ufo.clear();
    ufo.newPos();
    ufo.draw();
  }
});

document.addEventListener("keyup", () => {
  ufo.speedX = 0;
  ufo.speedY = 0;
});
