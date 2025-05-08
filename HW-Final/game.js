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

let player, cursors, lasers, enemies, score = 0, level = 1, scoreText, gameOverText, gameOverClicked = false, winText;
let game = new Phaser.Game(config);

function preload() {
  this.load.image('background', 'images/background.jpg');
  this.load.image('player', 'images/player2.png');
  this.load.image('enemy', 'images/enemy.png');
  this.load.image('laser', 'images/laser2.png');
  this.load.image('enemy2', 'images/enemy2.png'); // Additional enemy for level 2
}

function create() {
  // Add instructions above the game
  const instructions = this.add.text(400, 20, 'Use arrow keys to move. Press spacebar to shoot.', {
    fontSize: '18px',
    fill: '#fff',
    wordWrap: { width: 780 }
  }).setOrigin(0.5);

  // Background
  const background = this.add.image(400, 300, 'background');
  background.setDisplaySize(this.scale.width, this.scale.height);

  // Player
  player = this.physics.add.sprite(400, 500, 'player').setScale(0.5);
  player.setCollideWorldBounds(true);

  // Lasers
  lasers = this.physics.add.group({
    classType: Phaser.Physics.Arcade.Image,
    defaultKey: 'laser'
  });

  // Enemies
  enemies = this.physics.add.group();
  spawnEnemies();

  // Score and Level
  scoreText = this.add.text(16, 40, 'Score: 0', { fontSize: '24px', fill: '#fff' });

  // Game Over and Win Texts (hidden initially)
  gameOverText = this.add.text(400, 300, 'Game Over! Click to Restart', { 
    fontSize: '48px', 
    fill: '#ff0000' 
  }).setOrigin(0.5).setVisible(false);

  winText = this.add.text(400, 300, 'You Win! Click to Restart', { 
    fontSize: '48px', 
    fill: '#00ff00' 
  }).setOrigin(0.5).setVisible(false);

  // Controls
  cursors = this.input.keyboard.createCursorKeys();

  // Click to restart after game over or win
  this.input.on('pointerdown', function() {
    if (gameOverClicked) {
      restartGame();
      gameOverClicked = false;
    }
  });
}

function update() {
  if (score >= 1000) {
    playerWin();
    return;
  }

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
    laser.setScale(0.05);
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
  const highscore = Math.max(score, localStorage.getItem('highscore') || 0);
  localStorage.setItem('highscore', highscore);

  gameOverText.setVisible(true);
  gameOverClicked = true;

  player.setVelocity(0);
  enemies.setVelocityY(0);
}

// Player win scenario
function playerWin() {
  winText.setVisible(true);
  gameOverClicked = true;
  player.setVelocity(0);
  enemies.setVelocityY(0);
}

// Restart the game
function restartGame() {
  score = 0;
  level = 1;
  scoreText.setText('Score: ' + score);

  gameOverText.setVisible(false);
  winText.setVisible(false);

  player.setPosition(400, 500);

  enemies.clear(true, true);
  spawnEnemies();

  enemies.setVelocityY(100);
  player.setVelocity(0);
}

// Level up when the score reaches 500
function levelUp() {
  level = 2;
  scoreText.setText('Score: ' + score + ' | Level 2!');
  
  enemies.clear(true, true);
  spawnEnemies();
}
