const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player;
let factoryObjects = [];
let collectibles = [];
let score = 0;

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

  // Draw and update objects
  factoryObjects.forEach(object => object.draw(ctx));
  collectibles.forEach(collectible => {
    collectible.draw(ctx);
    if (collectible.collect(player)) {
      score++; // Increase score when collectible is collected
      console.log("Score: " + score); // For debugging, check score in console
    }
  });

  player.draw(ctx);

  requestAnimationFrame(gameLoop);
}

gameLoop();
