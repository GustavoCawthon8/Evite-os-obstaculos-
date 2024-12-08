const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const gameOverText = document.getElementById("gameOver");
const restartButton = document.getElementById("restartButton");
const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");

let isGameOver = false;
let playerPosition = 180;

const moveLeft = () => {
  if (!isGameOver && playerPosition > 0) {
    playerPosition -= 20;
    player.style.left = playerPosition + "px";
  }
};

const moveRight = () => {
  if (!isGameOver && playerPosition < 360) {
    playerPosition += 20;
    player.style.left = playerPosition + "px";
  }
};

leftButton.addEventListener("click", moveLeft);
rightButton.addEventListener("click", moveRight);


const moveObstacle = () => {
  if (isGameOver) return;

  let obstacleLeft = Math.floor(Math.random() * 350);
  obstacle.style.left = obstacleLeft + "px";
  let obstacleTop = -50; 

  const fallInterval = setInterval(() => {
    if (isGameOver) {
      clearInterval(fallInterval);
      return;
    }

    obstacleTop += 5;
    obstacle.style.top = obstacleTop + "px";

    if (
      obstacleTop > 550 &&
      obstacleLeft < playerPosition + 40 &&
      obstacleLeft + 50 > playerPosition
    ) {
      gameOver();
      clearInterval(fallInterval);
    }

    if (obstacleTop > 600) {
      obstacleTop = -50;
      obstacleLeft = Math.floor(Math.random() * 350);
      obstacle.style.left = obstacleLeft + "px";
    }
  }, 20);
};

const gameOver = () => {
  isGameOver = true;
  gameOverText.style.display = "block";
  restartButton.style.display = "inline-block";
};


restartButton.addEventListener("click", () => {
  isGameOver = false;
  gameOverText.style.display = "none";
  restartButton.style.display = "none";
  playerPosition = 180;
  player.style.left = playerPosition + "px";
  obstacle.style.top = "-50px";
  moveObstacle();
});


moveObstacle();

