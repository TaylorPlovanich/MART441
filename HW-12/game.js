const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player;
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

  draw(ctx) {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  moveUp() {
    if (!this.collides(0, -this.speed)) this.y -= this.speed;
  }

  moveDown() {
    if (!this.collides(0, this.speed)) this.y += this.speed;
  }

  moveLeft() {
    if (!this.collides(-this.speed, 0)) this.x -= this.speed;
  }

  moveRight() {
    if (!this.collides(this.speed, 0)) this.x += this.speed;
  }

  collides(dx, dy) {
    return factoryObjects.some(obj =>
      this.x + dx < obj.x + obj.width &&
      this.x + dx + this.width > obj.x &&
      this.y + dy < obj.y + obj.height &&
      this.y + dy + this.height > obj.y
    );
  }
}

// Factory object class
class FactoryObject {
  constructor(name, x, y, width, height) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(ctx) {
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

  draw(ctx) {
    if (!this.collected) {
      ctx.fillStyle = "gold";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  collect(player) {
    if (!this.collected &&
      player.x < this.x + this.width &&
      player.x + player.width > this.x &&
      player.y < this.y + this.height &&
      player.y + player.height > this.y) {
      this.collected = true;
      return true;
    }
    return false;
  }
}

// Load JSON files for objects and collectibles
fetch('factoryObjects.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      factoryObjects.push(new FactoryObject(item.name, item.x, item.y, item.width, item.height));
    });
  });

fetch('collectibles.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      collectibles.push(new Collectible(item.name, item.x, item.y, item.width, item.height));
    });
  });

// Initialize player
player = new Player(100, 100, 40, 40);

// Handle player movement with arrow keys
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") player.moveUp();
  if (e.key === "ArrowDown") player.moveDown();
  if (e.key === "ArrowLeft") player.moveLeft();
  if (e.key === "ArrowRight") player.moveRight();
});

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw factory objects
  factoryObjects.forEach(object => object.draw(ctx));

  // Draw and check collectibles
  collectibles.forEach(collectible => {
    collectible.draw(ctx);
    if (collectible.collect(player)) {
      score++;
      console.log("Score: " + score);
    }
  });

  // Draw player
  player.draw(ctx);

  requestAnimationFrame(gameLoop);
}

gameLoop();
