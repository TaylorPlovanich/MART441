// Game configuration
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

let player, cursors, lasers, enemies, score = 0, scoreText;
let gameOverText, currentLevel = 1;
let game = new Phaser.Game(config);

function preload() {
  this.load.image('background', 'images/background.jpg');
  this.load.image('player', 'images/player2.png');
  this.load.image('enemy', 'images/enemy.png'); // Level 1 enemy
  this.load.image('enemy2', 'images/enemy2.png'); // Level 2 enemy
  this.load.image('laser', 'images/laser2.png');
}

function create() {
  // Background
  const background = this.add.image(400, 300, 'background');
  background.setDisplaySize(this.scale.width, this.scale.height);

  // Player
  player = this.physics.add.sprite(400, 500, 'player').setScale(0.5);
  player.setCollideWorldBounds(true);

  // Lasers (no maxSize to allow unlimited firing)
  lasers = this.physics.add.group({
    classType: Phaser.Physics.Arcade.Image,
    defaultKey: 'laser'
  });

  // Enemies group initialization
  enemies = this.physics.add.group();
  for (let i = 0; i < 5; i++) {
    spawnEnemy();
  }

  // Score
  scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '24px', fill: '#fff' });

  // Game Over Text (hidden initially)
  gameOverText = this.add.text(400, 300, 'Game Over!', { fontSize: '48px', fill: '#ff0000' }).setOrigin(0.5).setVisible(false);

  // Controls
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  // Player movement
  player.setVelocityX(0);

  if (cursors.left.isDown) {
    player.setVelocityX(-200);
  } else if (cursors.right.isDown) {
    player.setVelocityX(200);
  }

  if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
    fireLaser();
  }

  // Enemies falling and respawning
  enemies.children.iterate((enemy) => {
    if (enemy.y > 600) {
      resetEnemy(enemy);
    }
  });

  // Laser and enemy collision
  this.physics.world.collide(lasers, enemies, destroyEnemy, null, this);

  // Check for collision between player and enemies
  this.physics.world.collide(player, enemies, gameOver, null, this);

  // Check if the player reaches level 2
  if (score >= 500 && currentLevel === 1) {
    currentLevel = 2;
    levelUp();
  }
}

function fireLaser() {
  let laser = lasers.get(player.x, player.y - 20);

  if (!laser) {
    laser = lasers.create(player.x, player.y - 20, 'laser');
    laser.setScale(0.1);
    laser.setActive(true);
    laser.setVisible(true);
    laser.body.velocity.y = -300;
  } else {
    laser.setActive(true);
    laser.setVisible(true);
    laser.body.velocity.y = -300;
  }
}

function spawnEnemy() {
  let x = Phaser.Math.Between(50, 750);
  let enemy;

  if (currentLevel === 1) {
    enemy = enemies.create(x, 0, 'enemy').setScale(0.2);
    enemy.setVelocityY(100); // Falling speed for level 1 enemies
  } else if (currentLevel === 2) {
    enemy = enemies.create(x, 0, 'enemy2').setScale(0.2);
    enemy.setVelocityY(150); // Faster falling speed for level 2 enemies
  }
}

function resetEnemy(enemy) {
  enemy.y = 0;
  enemy.x = Phaser.Math.Between(50, 750);

  if (currentLevel === 1) {
    enemy.setVelocityY(100); // Falling speed for level 1 enemies
  } else if (currentLevel === 2) {
    enemy.setVelocityY(150); // Faster falling speed for level 2 enemies
  }
}

function destroyEnemy(laser, enemy) {
  laser.destroy();
  enemy.destroy();
  score += 10;
  scoreText.setText('Score: ' + score);
  
  // Spawn a new enemy when one is destroyed
  spawnEnemy();
}

// Handle game over scenario
function gameOver(player, enemy) {
  // Store the high score
  const highscore = Math.max(score, localStorage.getItem('highscore') || 0);
  localStorage.setItem('highscore', highscore);

  // Display game over text
  gameOverText.setVisible(true);

  // Stop all physics and set velocity to zero
  player.setVelocity(0);
  enemies.setVelocityY(0);

  // Show the restart button using jQuery
  $('#restart-button').show();

  // Use jQuery to handle restart button click
  $('#restart-button').on('click', function() {
    restartGame();
    $(this).hide(); // Hide restart button after click
  });
}

// Restart the game
function restartGame() {
  // Reset score and enemies
  score = 0;
  scoreText.setText('Score: ' + score);

  // Hide game over text and restart the physics
  gameOverText.setVisible(false);

  // Reset the player position
  player.setPosition(400, 500);

  // Reset enemies and spawn new ones
  enemies.clear(true, true);
  for (let i = 0; i < 5; i++) {
    spawnEnemy();
  }

  // Resume the game and restart the physics
  enemies.setVelocityY(100);
  player.setVelocity(0);
}

// Level up when the player reaches score 500
function levelUp() {
  // Change background, enemy speed, etc., to make the level feel different
  // For now, we change the enemy type and speed.

  // Optionally, add more enemies or increase their speed here
  scoreText.setText('Level 2! Score: ' + score); // Change score text to show level 2
  enemies.clear(true, true); // Clear existing enemies and respawn
  for (let i = 0; i < 5; i++) {
    spawnEnemy();
  }
}
