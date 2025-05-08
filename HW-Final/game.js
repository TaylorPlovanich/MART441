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
const game = new Phaser.Game(config);

function preload() {
  this.load.image('background', 'images/background.jpg');
  this.load.image('player', 'images/player.png');
  this.load.image('enemy', 'images/enemy.png');
  this.load.image('laser', 'images/laser.png');
}

function create() {
  // Background
  this.add.image(400, 300, 'background');

  // Player
  player = this.physics.add.sprite(400, 550, 'player').setCollideWorldBounds(true);

  // Controls
  cursors = this.input.keyboard.createCursorKeys();

  // Laser Group
  lasers = this.physics.add.group();

  // Enemy Group
  enemies = this.physics.add.group();
  spawnEnemies(this);

  // Score Text
  scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '24px', fill: '#fff' });
}

function update() {
  player.setVelocityX(0);

  if (cursors.left.isDown) player.setVelocityX(-300);
  else if (cursors.right.isDown) player.setVelocityX(300);

  if (Phaser.Input.Keyboard.JustDown(cursors.space)) fireLaser(this);
}

function fireLaser(scene) {
  const laser = lasers.create(player.x, player.y - 20, 'laser');
  laser.setVelocityY(-500);
}

function spawnEnemies(scene) {
  for (let i = 0; i < 5; i++) {
    const enemy = enemies.create(100 + i * 120, 100, 'enemy');
    enemy.setVelocityX(100 * (Math.random() > 0.5 ? 1 : -1));
    enemy.setBounce(1);
    enemy.setCollideWorldBounds(true);
  }
}

function hitEnemy(laser, enemy) {
  laser.destroy();
  enemy.destroy();

  score += 10;
  scoreText.setText('Score: ' + score);
}
