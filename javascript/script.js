console.log("Js conectado");

const canvas = document.getElementById("canvas");
const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");

startBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  canvas.style.display = "inline";
});
