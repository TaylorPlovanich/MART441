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

let player, cursors, lasers, enemies, score = 0, scoreText, gameOverText;
let game = new Phaser.Game(config);

function preload() {
  this.load.image('background', 'images/background.jpg');
  this.load.image('player', 'images/player2.png');
  this.load.image('enemy', 'images/enemy.png');
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

  // Enemies
  enemies = this.physics.add.group();
  for (let i = 0; i < 5; i++) {
    spawnEnemy();
  }

  // Score
  scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '24px', fill: '#fff' });

  // Game Over Text (hidden by default)
  gameOverText = this.add.text(400, 300, 'Game Over\nClick to Restart', {
    fontSize: '32px', fill: '#ff0000', align: 'center'
  }).setOrigin(0.5).setVisible(false);

  // Controls
  cursors = this.input.keyboard.createCursorKeys();

  // Check for stored highscore and display it
  const savedScore = localStorage.getItem('highscore');
  if (savedScore) {
    scoreText.setText('Highscore: ' + savedScore);
  }
}

function update() {
  // Check if game is over
  if (gameOverText.visible) {
    return; // Stop updating if game over
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
  
  // Check if enemy collides with player
  this.physics.world.collide(player, enemies, gameOver, null, this);
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
  let enemy = enemies.create(x, 0, 'enemy').setScale(0.2);
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

function gameOver(player, enemy) {
  // Store the high score
  const highscore = Math.max(score, localStorage.getItem('highscore') || 0);
  localStorage.setItem('highscore', highscore);

  // Display game over text
  gameOverText.setVisible(true);

  // Stop all physics and set velocity to zero
  player.setVelocity(0);
  enemies.setVelocityY(0);

  // Restart game when clicked
  this.input.once('pointerdown', restartGame, this);
}

function restartGame() {
  // Reset score
  score = 0;
  scoreText.setText('Score: ' + score);
  
  // Reset the enemies
  enemies.clear(true, true);
  for (let i = 0; i < 5; i++) {
    spawnEnemy();
  }

  // Reset the player position and restart the game
  player.setPosition(400, 500);
  gameOverText.setVisible(false);

  // Restart the game physics
  enemies.setVelocityY(100);
}
