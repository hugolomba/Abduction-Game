console.log("Js conectado");

const myObstacles = [];
const myNpc = [];
const capturedNpc = [];
const map = new Image();
map.src = "./img/map.png";

// AUDIO

let backgroundSound = new Audio();
backgroundSound.src = "./sounds/backgroundMusic.mp3";

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
  points: 0,
  map: new Image(),
  backgroundSound: new Audio("./sounds/backgroundMusic.mp3"),

  playBackgroundSound() {
    this.backgroundSound.loop = true;
    this.backgroundSound.volume = 0.3;
    this.backgroundSound.play();
  },

  clear: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  score: function () {
    this.ctx.font = "35px serif";
    // this.ctx.font = "35px serif";
    if (this.points < 0) this.points = 0;
    this.ctx.fillText(`Score: ${this.points}`, 400, 40);

    // this.ctx.fillStroke(`Score: ${this.points}`, 400, 60);
  },
};

function updateObstacles() {
  myGameArea.frames += 1;
  // if (myGameArea.frames % 30 === 0) myGameArea.points += 1; // pontuação
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
  }

  myObstacles.forEach((element, i) => {
    element.move();
    element.draw();
    const crash = ufo.crashWith(element);
    if (crash) {
      myGameArea.live -= 1;

      if (myGameArea.live < 1) {
        myGameArea.stop = true;
        myGameArea.gameOverScreen.style.display = "flex";
        myGameArea.backgroundSound.pause();
      }
      myObstacles.splice(i, 1);
    }
    if (element.x < -100) {
      myObstacles.splice(i, 1);
    }
  });
}

function updateNpc() {
  if (myGameArea.frames % 180 === 0) {
    const npcArr = [
      {
        img: "./img/npc/cow4.png",
        name: "cow",
        type: "good",
        value: 100,
      },
      {
        img: "./img/npc/boy2.png",
        name: "boy",
        type: "good",
        value: 100,
      },
      {
        img: "./img/npc/girl.png",
        name: "Girl",
        type: "good",
        value: 100,
      },
      {
        img: "./img/npc/radioactive.png",
        name: "radioactive",
        type: "bad",
        value: -200,
      },

      // {
      //   img: "./img/npc/bomb.png",
      //   name: "bomb",
      //   type: "bad",
      //   value: -150,
      // },

      // {
      //   img: ,
      //   name: ,
      //   type: ,
      //   value: ,
      // },
    ];

    const xArr = [50, 250, 450, 650, 800];
    const randomX = Math.floor(Math.random() * xArr.length);
    const randomIndex = Math.floor(Math.random() * npcArr.length);

    // let npcHeart = false;
    // if (myGameArea.frames % 180 === 0) npcHeart = true;
    // if (myGameArea.frames % 180 !== 0) npcHeart = true;

    if (myNpc.every((npc) => npc.x !== xArr[randomX])) {
      // if (npcHeart) randomIndex = 0;
      myNpc.push(
        new Npc(
          npcArr[randomIndex].name,
          npcArr[randomIndex].type,
          npcArr[randomIndex].img,
          npcArr[randomIndex].value,
          xArr[randomX],
          370
        )
      );
    }
  } // >>>>>>>>>>> O PROBLEMA PODE SER AQUI

  console.log(`myNpc: ${myNpc}`);

  myNpc.forEach((element, i) => {
    element.draw();

    const crash = ufo.crashWithLight(element);
    if (ufo.lightOn) {
      if (crash) {
        myNpc.splice(i, 1);
        myGameArea.points += element.value;
        // let capturedNpc = element;

        console.log(">>>>>>Crash");
      }
    }
  });
}

function drawLives() {
  if (myGameArea.live === 3)
    myGameArea.ctx.drawImage(lifeHearts.full, 30, 10, 119, 35);
  if (myGameArea.live === 2)
    myGameArea.ctx.drawImage(lifeHearts.twoHearts, 30, 10, 117, 35);
  if (myGameArea.live === 1)
    myGameArea.ctx.drawImage(lifeHearts.oneHeart, 30, 10, 117, 35);
  if (myGameArea.live === 0)
    myGameArea.ctx.drawImage(lifeHearts.empty, 30, 10, 117, 35);
}

function updateGameArea() {
  myGameArea.clear();
  updateNpc();
  ufo.move();
  ufo.draw();
  ufo.drawLight();

  updateObstacles();
  // console.log(myNpc);
  drawLives();
  myGameArea.ctx.drawImage(map, 750, 0);
  myGameArea.score();

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

    this.x = x;
    this.y = y;
    this.speed = 5;
    this.targetX = this.x;
    this.targetY = this.y;
  }

  draw() {
    if (!this.img) return;
    myGameArea.ctx.drawImage(this.img, this.x, this.y);
  }

  move() {
    this.x = this.x - this.speed;
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

class Npc {
  constructor(name, type, img, value, x, y) {
    const image = new Image();
    image.src = img;
    image.onload = () => {
      this.img = image;
      this.width = image.width;
      this.height = image.height;
    };
    this.name = name;
    this.type = type;
    this.value = value;
    this.x = x;
    this.y = y;
    this.speed = 5;
  }

  draw() {
    if (!this.img) return;
    myGameArea.ctx.drawImage(this.img, this.x, this.y);
  }

  clear() {
    myGameArea.ctx.clearRect(this.x, this.y, this.width, this.height);
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

  crashWithLight(obstacle) {
    return !(
      // this.bottom() < obstacle.top() ||
      (
        this.top() > obstacle.bottom() ||
        this.right() < obstacle.left() ||
        this.left() > obstacle.right()
      )
    );
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
    this.lightX = 0;
    this.lightY = 0;
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
      this.lightX = this.x + 12;
      this.lightY = this.y + 60;
      // let lightX = this.x + 12;
      // let lightY = this.y + 60;
      myGameArea.ctx.drawImage(this.light, this.lightX, this.lightY, 113, 168);

      // console.log(`lightX: ${this.lightX} LightY: ${this.lightY}`);
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

  topLight() {
    return this.lightY;
  }
  bottomLight() {
    return this.lightY + this.height + 200;
  }
  leftLight() {
    return this.lightX + 55; // lado esquerdo da luz + diminui
  }
  rightLight() {
    return this.lightX + this.width - 55; // lado direito da luz - diminui
  }

  // topLight() {
  //   return this.lightY;
  // }
  // bottomLight() {
  //   return this.lightY + this.height - 20;
  // }
  // leftLight() {
  //   return this.lightX + 10;
  // }
  // rightLight() {
  //   return this.lightX + this.width - 10;
  // }

  crashWithLight(obstacle) {
    return !(
      this.bottomLight() < obstacle.top() ||
      this.topLight() > obstacle.bottom() ||
      this.rightLight() < obstacle.left() ||
      this.leftLight() > obstacle.right()
    );
  }
}

// objetos

const ufo = new Component(136, 65, 100, 100);

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
  myGameArea.playBackgroundSound();
});

myGameArea.PlayAgainBtn.addEventListener("click", () => {
  location.reload();
});

// movimento ao pressionar

document.addEventListener("keydown", (e) => {
  const key = e.code;
  if (key === "ArrowUp") {
    if (ufo.y > 10) {
      ufo.moveUp();
    }
  }
  if (key === "ArrowDown") {
    if (ufo.y < 220) {
      ufo.moveDown();
    }
  }
  if (key === "ArrowLeft") {
    if (ufo.x > 7) {
      ufo.moveLeft();
    }
  }
  if (key === "ArrowRight") {
    if (ufo.x < 757) {
      ufo.moveRight();
    }
  }

  if (key === "Space") {
    ufo.lightOn = true;
  }
});

document.addEventListener("keyup", (e) => {
  const key = e.code;
  if (key === "Space") {
    ufo.lightOn = false;
  }
});
