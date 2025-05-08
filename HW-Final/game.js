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

let player, cursors, lasers, enemies, score = 0, level = 1, scoreText, gameOverText;
let game = new Phaser.Game(config);

function preload() {
  this.load.image('background', 'images/background.jpg');
  this.load.image('player', 'images/player2.png');
  this.load.image('enemy', 'images/enemy.png');
  this.load.image('laser', 'images/laser2.png');
  this.load.image('enemy2', 'images/enemy2.png'); // Additional enemy for level 2
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

  // Enemies
  enemies = this.physics.add.group();
  spawnEnemies();

  // Score and Level
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

  // Level progression
  if (score >= 500 && level === 1) {
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

function spawnEnemies() {
  for (let i = 0; i < 5; i++) {
    spawnEnemy();
  }
}

function spawnEnemy() {
  let x = Phaser.Math.Between(50, 750);
  let enemyType = level === 2 ? 'enemy2' : 'enemy'; // Different enemy for level 2
  let enemy = enemies.create(x, 0, enemyType).setScale(0.2);
  enemy.setVelocityY(100); // Falling speed
}

function resetEnemy(enemy) {
  enemy.y = 0;
  enemy.x = Phaser.Math.Between(50, 750);
  enemy.setVelocityY(100);
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
  level = 1;
  scoreText.setText('Score: ' + score);

  // Hide game over text and restart the physics
  gameOverText.setVisible(false);

  // Reset the player position
  player.setPosition(400, 500);

  // Reset enemies and spawn new ones
  enemies.clear(true, true);
  spawnEnemies();

  // Resume the game and restart the physics
  enemies.setVelocityY(100);
  player.setVelocity(0);
}

// Level up when the score reaches 500
function levelUp() {
  level = 2;
  scoreText.setText('Score: ' + score + ' | Level 2!');
  
  // Spawn more difficult enemies
  enemies.clear(true, true);
  spawnEnemies();
}
