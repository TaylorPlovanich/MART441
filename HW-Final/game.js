// Space Invaders Game Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

// Player settings
const player = {
  x: canvas.width / 2 - 25,
  y: canvas.height - 50,
  width: 50,
  height: 20,
  speed: 7,
  bullets: []
};

// Enemy settings
const enemies = [];
const enemyRows = 3;
const enemyCols = 8;
const enemyWidth = 40;
const enemyHeight = 30;
const enemyPadding = 10;
const enemyOffsetTop = 50;
const enemyOffsetLeft = 70;

// Generate enemies
for (let row = 0; row < enemyRows; row++) {
  for (let col = 0; col < enemyCols; col++) {
    enemies.push({
      x: col * (enemyWidth + enemyPadding) + enemyOffsetLeft,
      y: row * (enemyHeight + enemyPadding) + enemyOffsetTop,
      width: enemyWidth,
      height: enemyHeight,
      isAlive: true
    });
  }
}

// Player movement
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') player.x -= player.speed;
  if (e.key === 'ArrowRight') player.x += player.speed;
  if (e.key === ' ') player.bullets.push({ x: player.x + 22, y: player.y, speed: 5 });
});

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw player
  ctx.fillStyle = 'green';
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Draw bullets
  player.bullets.forEach((bullet, index) => {
    bullet.y -= bullet.speed;
    ctx.fillRect(bullet.x, bullet.y, 5, 10);

    // Remove bullet if off-screen
    if (bullet.y < 0) player.bullets.splice(index, 1);
  });

  // Draw enemies
  enemies.forEach((enemy, index) => {
    if (enemy.isAlive) {
      ctx.fillStyle = 'red';
      ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

      // Bullet collision with enemy
      player.bullets.forEach((bullet, bulletIndex) => {
        if (
          bullet.x < enemy.x + enemy.width &&
          bullet.x + 5 > enemy.x &&
          bullet.y < enemy.y + enemy.height &&
          bullet.y + 10 > enemy.y
        ) {
          enemy.isAlive = false;
          player.bullets.splice(bulletIndex, 1);
        }
      });
    }
  });

  requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();
