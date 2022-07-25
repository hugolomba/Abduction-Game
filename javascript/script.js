console.log("Js conectado");

const myObstacles = [];

const myGameArea = {
  canvas: document.getElementById("canvas"),
  startScreen: document.getElementById("start-screen"),
  startBtn: document.getElementById("start-btn"),
  gameOverScreen: document.getElementById("game-over"),
  PlayAgainBtn: document.getElementById("play-again-btn"),
  ctx: this.canvas.getContext("2d"),
  stop: false,
  frames: 0,
  live: 3,

  clear: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  score: function () {
    const points = Math.floor(this.frames / 5);
    this.ctx.font = "30px serif";
    this.ctx.fillText(`Score: ${points}`, 750, 60);
  },
};

function updateObstacles() {
  myGameArea.frames += 1;
  if (myGameArea.frames % 120 === 0) {
    const obstacleArr = [
      "./img/obstacles/comet.png",
      "./img/obstacles/asteroid.png",
      "./img/obstacles/missile.png",
    ];

    const yArr = [250, 170, 90];
    const randomY = Math.floor(Math.random() * yArr.length);
    const randomIndex = Math.floor(Math.random() * obstacleArr.length);

    // myObstacles.push(new Obstacle("./img/obstacles/comet.png", 900, 70));
    myObstacles.push(
      new Obstacle(obstacleArr[randomIndex], 900, yArr[randomY])
    );
    // myObstacles.push(new Obstacle("./img/obstacles/asteroid.png", 250));
    // console.log(myObstacles);
  }

  // for (let i = 0; i < myObstacles.length; i++) {
  //   // myObstacles[i].x -= 0.1;
  // }
  // myObstacles.forEach((element) => {
  //   myObstacles[element].x -= 1;
  // });

  myObstacles.forEach((element, i) => {
    element.move();
    element.draw();
    const crash = ufo.crashWith(element);
    if (crash) {
      myGameArea.live -= 1;
      if (myGameArea.live < 1) {
        myGameArea.stop = true;
        myGameArea.gameOverScreen.style.display = "flex";
      }
      myObstacles.splice(i, 1);
    }
    if (element.x < -100) {
      myObstacles.splice(i, 1);
    }

    // console.log("aqui");
  });

  // for (let i = 0; i < myObstacles.length; i++) {
  //   myObstacles[i].move();
  //   myObstacles[i].draw();
  // }
}

// function checkCrash() {
//   if (ufo.x === comet.x) {
//     myGameArea.stop = true;
//     console.log("Comet Crash");
//   }
//   if (ufo.x === asteroid.x) {
//     myGameArea.stop = true;
//     console.log("Asteroid Crash");
//   }
// }

function drawLives() {
  if (myGameArea.live === 3)
    myGameArea.ctx.drawImage(lifeHearts.full, 30, 30, 95, 26);
  if (myGameArea.live === 2)
    myGameArea.ctx.drawImage(lifeHearts.twoHearts, 30, 30, 95, 26);
  if (myGameArea.live === 1)
    myGameArea.ctx.drawImage(lifeHearts.oneHeart, 30, 30, 95, 26);
  if (myGameArea.live === 0)
    myGameArea.ctx.drawImage(lifeHearts.empty, 30, 30, 95, 26);
}

function updateGameArea() {
  // checkCrash();
  myGameArea.clear();
  // ufo.newPos();
  ufo.move();
  ufo.draw();
  ufo.drawLight();

  updateObstacles();

  drawLives();
  myGameArea.score();
  // myGameArea.ctx.fillText("Score: 999", 750, 60);
  // myGameArea.ctx.font = "30px serif";

  // console.log("x: ", ufo.x, "Y: ", ufo.y);

  if (!myGameArea.stop) {
    requestAnimationFrame(updateGameArea);
  }
}

// setInterval(updateGameArea, 50000);

// Classes

class Obstacle {
  constructor(img, x, y) {
    const image = new Image();
    image.src = img;
    image.onload = () => {
      this.img = image;
      this.width = image.width;
      this.height = image.height;
    };
    // this.img = new Image();
    // this.img.src = img;
    // this.width = 91;
    // this.height = 62;
    this.x = x;
    this.y = y;
    this.speed = 5;
    // this.targetX = this.x;
  }

  draw() {
    if (!this.img) return;
    myGameArea.ctx.drawImage(this.img, this.x, this.y);
  }

  move() {
    this.x = this.x - this.speed;
    // this.x += (this.x - this.x) * 0.1;
    // if (this.x <= 0) this.x = 800;
  }

  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }
  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
}

class Component {
  constructor(width, height, x, y) {
    this.img = new Image();
    this.img.src = "./img/ufo2.png";
    this.img2 = new Image();
    this.img2.src = "./img/ufo2-esp.png";
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
    if (this.y < 210) myGameArea.ctx.drawImage(this.img, this.x, this.y);
    if (this.y >= 210) myGameArea.ctx.drawImage(this.img2, this.x, this.y);
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

  top() {
    return this.y + 20;
  }
  bottom() {
    return this.y + this.height - 20;
  }
  left() {
    return this.x + 10;
  }
  right() {
    return this.x + this.width - 10;
  }

  crashWith(obstacle) {
    return !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right() < obstacle.left() ||
      this.left() > obstacle.right()
    );
  }
}

// objetos

// const light = new Component("./img/ufolight.png");
const ufo = new Component(136, 65, 100, 100);

// const comet = new Obstacle("./img/obstacles/comet.png", 800, 90);
// const asteroid = new Obstacle("./img/obstacles/asteroid.png", 900, 170);
// const missile = new Obstacle("./img/obstacles/missile.png", 1000, 250);

const lifeHearts = new Object();

lifeHearts.full = new Image();
lifeHearts.full.src = "./img/life-full.png";
lifeHearts.twoHearts = new Image();
lifeHearts.twoHearts.src = "./img/life-2.png";
lifeHearts.oneHeart = new Image();
lifeHearts.oneHeart.src = "./img/life-1.png";
lifeHearts.empty = new Image();
lifeHearts.empty.src = "./img/life-empty.png";

// Troca da tela de início para o canvas ao apaertar o botão Start

myGameArea.startBtn.addEventListener("click", () => {
  myGameArea.startScreen.style.display = "none";
  myGameArea.canvas.style.display = "inline";
  updateGameArea();
});

myGameArea.PlayAgainBtn.addEventListener("click", () => {
  location.reload();
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
    if (ufo.y < 220) {
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
  if (key === "Space") {
    ufo.lightOn = false;
  }
});
