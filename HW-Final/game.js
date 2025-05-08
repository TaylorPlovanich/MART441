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

  // Lasers
  lasers = this.physics.add.group({
    classType: Phaser.Physics.Arcade.Image,
    defaultKey: 'laser',
    maxSize: 10
  });

  // Enemies
  enemies = this.physics.add.group();
  for (let i = 0; i < 5; i++) {
    let enemy = enemies.create(100 + i * 120, 100, 'enemy').setScale(0.2);
    enemy.setVelocityX(100);
  }

  // Score
  scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '24px', fill: '#fff' });

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

  // Enemies bouncing
  enemies.children.iterate((enemy) => {
    if (enemy.x > 780 || enemy.x < 20) {
      enemy.setVelocityX(enemy.body.velocity.x * -1);
    }
  });

  // Laser and enemy collision
  this.physics.world.collide(lasers, enemies, destroyEnemy, null, this);
}

function fireLaser() {
  let laser = lasers.get(player.x, player.y - 20);

  if (laser) {
    laser.setActive(true);
    laser.setVisible(true);
    laser.body.velocity.y = -300;
    laser.setScale(0.1);
  }
}

function destroyEnemy(laser, enemy) {
  laser.destroy();
  enemy.destroy();
  score += 10;
  scoreText.setText('Score: ' + score);
}
