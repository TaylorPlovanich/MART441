// Space Invaders Game in Phaser (Enhanced)
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

let player, cursors, bullets, enemies, score = 0, scoreText, gameOver = false;

const game = new Phaser.Game(config);

function preload() {
  this.load.image('player', 'images/player.png');
  this.load.image('bullet', 'images/bullet.png');
  this.load.image('enemy', 'images/enemy.png');
  this.load.image('background', 'images/background.png');
}

function create() {
  // Background
  this.add.tileSprite(400, 300, 800, 600, 'background');

  // Player
  player = this.physics.add.sprite(400, 550, 'player');
  player.setCollideWorldBounds(true);

  // Bullets group
  bullets = this.physics.add.group({
    defaultKey: 'bullet',
    maxSize: 10
  });

  // Enemies group
  enemies = this.physics.add.group();
  spawnEnemies(this);

  // Controls
  cursors = this.input.keyboard.createCursorKeys();

  // Score text
  scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '24px', fill: '#fff' });

  // Bullet collision with enemies
  this.physics.add.overlap(bullets, enemies, destroyEnemy, null, this);
}

function update() {
  if (gameOver) return;

  player.setVelocity(0);

  if (cursors.left.isDown) {
    player.setVelocityX(-300);
  } else if (cursors.right.isDown) {
    player.setVelocityX(300);
  }

  if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
    shootBullet(this);
  }

  // Check if any enemy reached the bottom
  enemies.children.iterate(enemy => {
    if (enemy.y > 600) {
      endGame(this);
    }
  });
}

function shootBullet(scene) {
  if (bullets.getTotalFree() > 0) {
    let bullet = bullets.get(player.x, player.y - 20);
    bullet.setActive(true).setVisible(true).setVelocityY(-400);
  }
}

function spawnEnemies(scene) {
  for (let y = 50; y < 250; y += 60) {
    for (let x = 80; x < 750; x += 80) {
      let enemy = enemies.create(x, y, 'enemy');
      enemy.setVelocityY(Phaser.Math.Between(20, 60));
      enemy.setCollideWorldBounds(true);
      enemy.setBounceX(1);
      enemy.setVelocityX(Phaser.Math.Between(-50, 50));
    }
  }
}

function destroyEnemy(bullet, enemy) {
  bullet.destroy();
  enemy.destroy();
  score += 10;
  scoreText.setText('Score: ' + score);
}

function endGame(scene) {
  gameOver = true;
  this.add.text(300, 300, 'Game Over', { fontSize: '48px', fill: '#ff0000' });
  this.physics.pause();
}
