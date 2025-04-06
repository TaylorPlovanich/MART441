const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let factoryObjects = [];
let collectibles = [];
let score = 0;

// Player class
class Player {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 5;
  }

  move(dx, dy) {
    const newX = this.x + dx;
    const newY = this.y + dy;

    // Check collision with factory objects
    const willCollide = factoryObjects.some(obj =>
      isColliding({ x: newX, y: newY, width: this.width, height: this.height }, obj)
    );

    if (!willCollide) {
      this.x = newX;
      this.y = newY;
    }
  }

  draw() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

// Obstacle class
class FactoryObject {
  constructor(name, x, y, width, height) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    ctx.fillStyle = "gray";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

// Collectible class
class Collectible {
  constructor(name, x, y, width, height) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.collected = false;
  }

  draw() {
    if (!this.collected) {
      ctx.fillStyle = "gold";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  checkCollection(player) {
    if (!this.collected && isColliding(this, player)) {
      this.collected = true;
      score++;
      console.log("Score: " + score);
    }
  }
}

// Collision detection
function isColliding(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

const player = new Player(50, 50, 40, 40);

// Load JSON files
fetch("factoryObjects.json")
  .then(res => res.json())
  .then(data => {
    data.forEach(item => {
      factoryObjects.push(new FactoryObject(item.name, item.x, item.y, item.width, item.height));
    });
  });

fetch("collectibles.json")
  .then(res => res.json())
  .then(data => {
    data.forEach(item => {
      collectibles.push(new Collectible(item.name, item.x, item.y, item.width, item.height));
    });
  });

// Keyboard controls
document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") player.move(0, -player.speed);
  if (e.key === "ArrowDown") player.move(0, player.speed);
  if (e.key === "ArrowLeft") player.move(-player.speed, 0);
  if (e.key === "ArrowRight") player.move(player.speed, 0);
});

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw factory objects
  factoryObjects.forEach(obj => obj.draw());

  // Draw and check collectibles
  collectibles.forEach(item => {
    item.draw();
    item.checkCollection(player);
  });

  // Draw player
  player.draw();

  // Draw score
  ctx.fillStyle = "black"; // Text color
  ctx.font = "20px Arial"; // Font size and style
  ctx.fillText("Score: " + score, 10, 30); // Position of the score on canvas

  requestAnimationFrame(gameLoop);
}

gameLoop();
