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
    this.xCut = 0;
  }

  draw() {
    if (!this.img) return;
    myGameArea.ctx.drawImage(this.img, this.x, this.y);
    // myGameArea.ctx.drawImage(
    //   this.img,
    //   this.xCut,
    //   0,
    //   91,
    //   62,
    //   this.x,
    //   this.y,
    //   91,
    //   62
    // );
    if (myGameArea.frames % 25 === 0) this.xCut += 91;
    if (this.xCut > 273) this.xCut = 0;
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
    this.xCut = 0;
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.catchSound = new Audio("./sounds/catch.wav");
  }

  playCatchSound() {
    this.catchSound.volume = 0.4;
    this.catchSound.play();
  }

  draw() {
    if (!this.img) return;
    // myGameArea.ctx.drawImage(this.img, this.x, this.y);
    myGameArea.ctx.drawImage(
      this.img,
      this.xCut,
      0,
      60,
      80,
      this.x,
      this.y,
      60,
      80
    );
    if (myGameArea.frames % 25 === 0) this.xCut += 60;
    if (this.xCut > 180) this.xCut = 0;
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

class Player {
  constructor(width, height, x, y) {
    this.img = new Image();
    this.img.src = "./img/sprite-ufo2.png";
    this.xCut = 0;

    this.img2 = new Image();
    this.img2.src = "./img/sprite-ufo-light.png";
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 55;
    this.targetX = this.x;
    this.targetY = this.y;
    this.light = new Image();
    this.light.src = "./img/ufolight.png";
    this.lightOn = false;
    this.lightReadySound = new Audio("./sounds/test.wav");
    this.lightX = 0;
    this.lightY = 0;
    this.abductionSound = new Audio("./sounds/abduction.wav");
    this.crashSound = new Audio("./sounds/crash.wav");

    // this.speedX = 0;
    // this.speedY = 0;
  }

  playCrashSound() {
    this.crashSound.volume = 0.3;
    this.crashSound.play();
  }

  playLightReadySound() {
    this.lightReadySound.volume = 1;
    this.lightReadySound.play();
  }

  pauseLightReadySound() {
    this.lightReadySound.pause();
  }

  playAbductionSound() {
    this.abductionSound.volume = 0.3;
    this.abductionSound.play();
  }

  draw() {
    // this.img.addEventListener("load", () =>
    // let xCut = 0;

    if (this.y < 210) {
      myGameArea.ctx.drawImage(
        this.img,
        this.xCut,
        0,
        136,
        65,
        this.x,
        this.y,
        136,
        65
      );
      if (myGameArea.frames % 10 === 0) this.xCut += 136;
      if (this.xCut > 680) this.xCut = 0;
    }
    if (this.y >= 210) {
      myGameArea.ctx.drawImage(
        this.img2,
        this.xCut,
        0,
        136,
        65,
        this.x,
        this.y,
        136,
        65
      );
      if (myGameArea.frames % 10 === 0) this.xCut += 136;
      if (this.xCut > 680) this.xCut = 0;
    }
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

      this.playAbductionSound();
      myGameArea.ctx.drawImage(this.light, this.lightX, this.lightY, 113, 168);
    }
  }

  top() {
    return this.y + 30;
  }
  bottom() {
    return this.y + this.height - 20;
  }
  left() {
    return this.x + 50;
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
    return this.lightX + 220; // lado esquerdo da luz + diminui
  }
  rightLight() {
    return this.lightX + this.width - 55; // lado direito da luz - diminui
  }

  crashWithLight(obstacle) {
    return !(
      this.bottomLight() < obstacle.top() ||
      this.topLight() > obstacle.bottom() ||
      this.rightLight() < obstacle.left() ||
      this.leftLight() > obstacle.right()
    );
  }
}

const myGameArea = {
  canvas: document.getElementById("canvas"),
  startScreen: document.getElementById("start-screen"),
  startBtn: document.getElementById("start-btn"),
  gameOverScreen: document.getElementById("game-over"),
  PlayAgainBtn: document.getElementById("play-again-btn"),
  instructionsBtn: document.getElementById("instructions-btn"),
  instructionsScreen: document.getElementById("instructions-screen"),
  startScreenElements: document.getElementById("start-screen-elements"),
  backBtn: document.getElementById("back-btn"),
  ptBtn: document.getElementById("pt-btn"),
  enBtn: document.getElementById("en-btn"),
  ptInstructions: document.getElementsByClassName("portuguese"),
  enIntructions: document.getElementsByClassName("english"),
  ctx: this.canvas.getContext("2d"),
  player: new Player(136, 65, 100, 100),
  stop: false,
  frames: 0,
  lives: 3,
  hearts: new Image(),
  points: 0,
  dificulty: 120,
  map: new Image(),
  backgroundSound: new Audio("./sounds/backgroundMusic.mp3"),
  myObstacles: [],
  myNpc: [],

  drawLives() {
    this.hearts.src = "./img/hearts.png";
    switch (this.lives) {
      case 3:
        this.ctx.drawImage(this.hearts, 0, 0, 335, 93, 30, 10, 119, 35);
        break;
      case 2:
        this.ctx.drawImage(this.hearts, 335, 0, 335, 93, 30, 10, 119, 35);
        break;
      case 1:
        this.ctx.drawImage(this.hearts, 670, 0, 335, 93, 30, 10, 119, 35);
        break;
      case 0:
        this.ctx.drawImage(this.hearts, 1005, 0, 335, 93, 30, 10, 119, 35);
        break;
    }
  },

  drawMap() {
    this.map.src = "./img/map.png";
    this.ctx.drawImage(this.map, 650, 10, 240, 55);
  },

  playBackgroundSound() {
    this.backgroundSound.loop = true;
    this.backgroundSound.volume = 0.3;
    this.backgroundSound.play();
  },

  clear: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  score: function () {
    this.ctx.font = "40px serif";

    if (this.points < 0) this.points = 0;
    this.ctx.fillText(`Score: ${this.points}`, 385, 50);
    this.ctx.setLineDash([15, 7]);
    this.ctx.strokeRect(370, 10, 220, 55);
  },
};

function updateObstacles() {
  myGameArea.frames += 1;
  console.log(myGameArea.dificulty);
  if (myGameArea.frames % 1200 === 0) myGameArea.dificulty -= 20;
  if (myGameArea.dificulty < 60) myGameArea.dificulty = 60;

  if (myGameArea.frames % myGameArea.dificulty === 0) {
    const obstacleArr = [
      "./img/obstacles/comet.png",
      "./img/obstacles/asteroid.png",
      "./img/obstacles/missile.png",
    ];

    const yArr = [250, 170, 90];
    const randomY = Math.floor(Math.random() * yArr.length);
    const randomIndex = Math.floor(Math.random() * obstacleArr.length);

    myGameArea.myObstacles.push(
      new Obstacle(obstacleArr[randomIndex], 900, yArr[randomY])
    );
  }

  myGameArea.myObstacles.forEach((element, i) => {
    element.move();
    element.draw();
    const crash = myGameArea.player.crashWith(element);
    if (crash) {
      myGameArea.player.playCrashSound();
      myGameArea.lives -= 1;

      if (myGameArea.lives < 1) {
        myGameArea.stop = true;
        myGameArea.gameOverScreen.style.display = "flex";
        myGameArea.backgroundSound.pause();
      }
      myGameArea.myObstacles.splice(i, 1);
    }
    if (element.x < -100) {
      myGameArea.myObstacles.splice(i, 1);
    }
  });
}

function updateNpc() {
  if (myGameArea.frames % 180 === 0) {
    const npcArr = [
      {
        img: "./img/npc/cow-sprite.png",
        name: "cow",
        type: "good",
        value: 50,
      },
      {
        img: "./img/npc/boy-sprite.png",
        name: "boy",
        type: "good",
        value: 100,
      },
      {
        img: "./img/npc/girl-sprite2.png",
        name: "Girl",
        type: "good",
        value: 100,
      },
      {
        img: "./img/npc/radioactive-sprite.png",
        name: "radioactive",
        type: "bad",
        value: -200,
      },

      {
        img: "./img/npc/radioactive-sprite.png",
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

    if (myGameArea.myNpc.every((npc) => npc.x !== xArr[randomX])) {
      myGameArea.myNpc.push(
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
  }

  if (myGameArea.frames % 1200 === 0) {
    let randomIndex = Math.floor(Math.random() * myGameArea.myNpc.length);
    myGameArea.myNpc.splice(randomIndex, myGameArea.myNpc.length - 2);
  }

  myGameArea.myNpc.forEach((element, i) => {
    element.draw();

    const crash = myGameArea.player.crashWithLight(element);
    if (myGameArea.player.lightOn) {
      if (crash) {
        myGameArea.myNpc.splice(i, 1);
        element.playCatchSound();
        myGameArea.points += element.value;
      }
    }
  });
}

function updateGameArea() {
  myGameArea.clear();
  updateNpc();
  myGameArea.player.move();
  myGameArea.player.draw();
  myGameArea.player.drawLight();
  updateObstacles();
  myGameArea.drawLives();
  myGameArea.drawMap();
  myGameArea.score();

  if (!myGameArea.stop) {
    requestAnimationFrame(updateGameArea);
  }
}

// Troca da tela de início para o canvas ao apaertar o botão Start

myGameArea.startBtn.addEventListener("click", () => {
  myGameArea.startScreen.style.display = "none";
  myGameArea.canvas.style.display = "inline";
  updateGameArea();
  myGameArea.playBackgroundSound();
});

myGameArea.instructionsBtn.addEventListener("click", () => {
  myGameArea.instructionsScreen.style.display = "flex";
  myGameArea.backBtn.addEventListener("click", () => {
    myGameArea.instructionsScreen.style.display = "none";
  });
});

myGameArea.PlayAgainBtn.addEventListener("click", () => {
  location.reload();
});

// Movimentação

document.addEventListener("keydown", (e) => {
  const key = e.code;
  if (key === "ArrowUp") {
    if (myGameArea.player.y > 10) {
      myGameArea.player.moveUp();
    }
  }
  if (key === "ArrowDown") {
    if (myGameArea.player.y < 220) {
      myGameArea.player.moveDown();
    }
  }
  if (key === "ArrowLeft") {
    if (myGameArea.player.x > 7) {
      myGameArea.player.moveLeft();
    }
  }
  if (key === "ArrowRight") {
    if (myGameArea.player.x < 757) {
      myGameArea.player.moveRight();
    }
  }

  if (key === "Space") {
    myGameArea.player.lightOn = true;
  }
});

document.addEventListener("keyup", (e) => {
  const key = e.code;
  if (key === "Space") {
    myGameArea.player.lightOn = false;
  }
});
