class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.velocityY = 0;
    this.gravity = 0.5;
    this.speed = 5;
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.y += this.velocityY;
    this.velocityY += this.gravity;

    if (this.y > 350) { // Ground level
      this.y = 350;
      this.velocityY = 0;
    }
  }

  moveLeft() { this.x -= this.speed; }
  moveRight() { this.x += this.speed; }
  jump() { if (this.y >= 350) this.velocityY = -10; }
}

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const player = new Player(100, 350);

let score = 0;

// Handle player movement
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") player.moveLeft();
  if (e.key === "ArrowRight") player.moveRight();
  if (e.key === "Space") player.jump();
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  player.draw(ctx);
  checkTriviaTrigger();
  requestAnimationFrame(gameLoop);
}

gameLoop();

function checkTriviaTrigger() {
  if (player.x > 400) {
    document.getElementById("question-container").style.display = "block";
  }
}

$(document).ready(function() {
  $(".answer").click(function() {
    const answer = $(this).data("answer");
    if (answer == 4) {
      score += 10;
      alert("Correct!");
    } else {
      alert("Wrong! Try again.");
    }

    document.getElementById("question-container").style.display = "none";
    document.getElementById("score").textContent = "Score: " + score;
  });
});
