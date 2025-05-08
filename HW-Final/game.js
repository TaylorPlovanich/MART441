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

let player, cursors, spaceKey, lasers, enemies;
let game = new Phaser.Game(config);

function preload() {
  this.load.image('background', 'images/background.jpg');
  this.load.image('player', 'images/player.png');
  this.load.image('laser', 'images/laser.png');
  this.load.image('enemy', 'images/enemy.png');
}

function create() {
  // Background
  const background = this.add.image(400, 300, 'background');
  background.setDisplaySize(this.scale.width, this.scale.height); // Full-screen background

  // Player
  player = this.physics.add.sprite(400, 500, 'player').setScale(0.5);
  player.setCollideWorldBounds(true);

  // Controls
  cursors = this.input.keyboard.createCursorKeys();
  spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

  // Laser Group
  lasers = this.physics.add.group({
    defaultKey: 'laser',
    maxSize: 10
  });

  // Enemies Group
  enemies = this.physics.add.group();
  spawnEnemies(this);

  // Collisions
  this.physics.add.overlap(lasers, enemies, destroyEnemy, null, this);
}

function update() {
  // Player Movement
  player.setVelocityX(0);

  if (cursors.left.isDown) {
    player.setVelocityX(-300);
  } else if (cursors.right.isDown) {
    player.setVelocityX(300);
  }

  // Fire Laser
  if (Phaser.Input.Keyboard.JustDown(spaceKey)) {
    fireLaser(this);
  }
}

// Fire Laser Function
function fireLaser(scene) {
  const laser = lasers.get(player.x, player.y - 20);
  if (laser) {
    laser.setActive(true);
    laser.setVisible(true);
    laser.body.enable = true;
    laser.setVelocityY(-500);
  }
}

// Spawn Enemies Function
function spawnEnemies(scene) {
  for (let i = 0; i < 5; i++) {
    let enemy = enemies.create(100 + i * 120, 100, 'enemy');
    enemy.setVelocityY(100);
    enemy.setCollideWorldBounds(true);
    enemy.setBounce(1);
  }
}

// Destroy Enemy Function
function destroyEnemy(laser, enemy) {
  laser.disableBody(true, true);
  enemy.disableBody(true, true);
}
