console.log("Js conectado");

const canvas = document.getElementById("canvas");
const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");

// Troca da tela de início para o canvas ao apaertar o botão Start
startBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  canvas.style.display = "inline";
  ufo.draw(ufo.img, ufo.x, ufo.y);
});

// Classes
class Component {
  constructor(img, width, height, x, y) {
    this.img = new Image();
    this.img.src = img;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }

  draw() {
    this.img.addEventListener("load", () =>
      ctx.drawImage(this.img, this.width, this.height, this.x, this.y)
    );
    console.log("funcionou");
  }
}
// objetos

const ufo = new Component("./img/ufo2.png", 100, 100, 136, 65);

// manipulação do Canvas

const ctx = canvas.getContext("2d");
ufo.draw(ufo.img, ufo.x, ufo.y);

// englobar tudo no add event listener em todas as imagens
