// Game configuration
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

let player, cursors, triviaArea, score = 0, scoreText;
let game = new Phaser.Game(config);
let triviaAnswered = false;

function preload() {
  this.load.image('sky', 'images/sky.png');
  this.load.image('ground', 'images/ground.png');
  this.load.image('player', 'images/player.png');
  this.load.image('triviaArea', 'images/triviaArea.png');
}

function create() {
  // Background
  this.add.image(400, 300, 'sky');

  // Platforms
  const platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();

  // Player
  player = this.physics.add.sprite(100, 450, 'player');
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  // Controls
  cursors = this.input.keyboard.createCursorKeys();

  // Trivia Area
  triviaArea = this.physics.add.staticSprite(600, 400, 'triviaArea');

  // Collision
  this.physics.add.collider(player, platforms);
  this.physics.add.overlap(player, triviaArea, askTrivia, null, this);

  // Score Text
  scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '24px', fill: '#fff' });
}

function update() {
  player.setVelocityX(0);

  if (cursors.left.isDown) {
    player.setVelocityX(-160);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
  }

  if (cursors.space.isDown && player.body.blocked.down) {
    player.setVelocityY(-330);
  }
}

function askTrivia() {
  if (!triviaAnswered) {
    let answer = prompt('What is 2 + 2?');
    if (answer === '4') {
      score += 10;
      scoreText.setText('Score: ' + score);
      triviaAnswered = true; // Prevents the question from repeating
      triviaArea.setVisible(false); // Makes the trivia area disappear
    } else {
      alert('Incorrect! Try again.');
    }
  }
}
