// Create the game configuration
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 }, // Set the main gravity for the game world
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var player;
var platforms;
var stars;
var score = 0;
var scoreText;

var game = new Phaser.Game(config);

// Preload assets
function preload() {
  this.load.image('sky', 'images/sky.png'); // Background image
  this.load.image('ground', 'images/ground.jpg'); // Ground image
  this.load.image('star', 'images/star.png'); // Star image
  this.load.image('spike', 'images/spike.png'); // Spike image
  this.load.spritesheet('player', 'images/player.png', { frameWidth: 32, frameHeight: 48 }); // Player sprite
}

// Create the game objects
function create() {
  // Background
  this.add.image(400, 300, 'sky');

  // Platforms group
  platforms = this.physics.add.staticGroup();

  // Create the ground platform
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();

  // Create the player sprite
  player = this.physics.add.sprite(100, 450, 'player');
  player.setBounce(0.2); // Player bounce when hitting platforms
  player.setCollideWorldBounds(true); // Prevent player from leaving the world
  this.physics.add.collider(player, platforms); // Collision with platforms

  // Player controls
  cursors = this.input.keyboard.createCursorKeys();

  // Stars group
  stars = this.physics.add.group({
    key: 'star',
    repeat: 11,  // Creates 12 stars
    setXY: { x: 12, y: 0, stepX: 70 }
  });

  // Apply gravity to the stars
  stars.children.iterate(function(star) {
    star.setGravityY(100); // Gravity pulling stars down
  });

  // Create a score text at the top left
  scoreText = this.add.text(16, 16, 'Score: 0', {
    fontSize: '32px',
    fill: '#fff'
  });

  // Create spikes group
  spikes = this.physics.add.group();

  // Add spikes
  var spike = spikes.create(300, 500, 'spike');
  spike.setGravityY(100);
  this.physics.add.collider(player, spikes, hitSpike, null, this);

  // Check for collisions with stars
  this.physics.add.collider(player, stars, collectStar, null, this);
}

// Update the game each frame
function update() {
  // Player movement with arrow keys
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
  }
  else if (cursors.right.isDown) {
    player.setVelocityX(160);
  }
  else {
    player.setVelocityX(0);
  }

  // Jumping with the spacebar
  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }

  // Handle player jump with spacebar
  if (this.input.keyboard.checkDown(cursors.spacebar, 100) && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}

// Collect star function (with respawning stars)
function collectStar(player, star) {
  // Disable the star when collected
  star.disableBody(true, true);

  // Increase the score by 10 points when a star is collected
  score += 10;
  scoreText.setText('Score: ' + score);

  // Check if all active stars are collected
  if (stars.countActive(true) === 0) {
    // All stars collected, so reset them by respawning at random X positions
    stars.children.iterate(function(star) {
      star.enableBody(true, Phaser.Math.Between(50, 750), 0, true, true);  // Spawn at random X positions at the top
      star.setGravityY(100);  // Reapply gravity to the new stars
    });
  }
}

// Hit spike function (ends the game if the player hits a spike)
function hitSpike(player, spike) {
  // You can add code here to end the game or restart if the player hits the spike
  player.setTint(0xff0000);  // Tint the player red
  player.anims.play('turn');  // Play a turn animation (if you've set one)
  this.physics.pause();  // Stop all physics
}
