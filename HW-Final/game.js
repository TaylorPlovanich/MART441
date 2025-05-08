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

let player, cursors, triviaAreas = [], score = 0, scoreText;
let game = new Phaser.Game(config);
let triviaAnswered = [false, false, false, false, false];

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
  platforms.create(600, 400, 'ground');
  platforms.create(200, 300, 'ground');
  platforms.create(400, 200, 'ground');
  platforms.create(700, 150, 'ground');
  platforms.create(100, 100, 'ground');

  // Player
  player = this.physics.add.sprite(100, 450, 'player');
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  // Controls
  cursors = this.input.keyboard.createCursorKeys();

  // Trivia Areas
  triviaAreas.push(this.physics.add.staticSprite(600, 380, 'triviaArea'));
  triviaAreas.push(this.physics.add.staticSprite(200, 280, 'triviaArea'));
  triviaAreas.push(this.physics.add.staticSprite(400, 180, 'triviaArea'));
  triviaAreas.push(this.physics.add.staticSprite(700, 130, 'triviaArea'));
  triviaAreas.push(this.physics.add.staticSprite(100, 80, 'triviaArea'));

  // Collision
  this.physics.add.collider(player, platforms);

  triviaAreas.forEach((area, index) => {
    this.physics.add.overlap(player, area, () => askTrivia(index, area), null, this);
  });

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

function askTrivia(index, area) {
  if (!triviaAnswered[index]) {
    let questions = [
      'What is 2 + 2?',
      'What is the capital of France?',
      'What color is the sky on a clear day?',
      'What is the square root of 64?',
      'Who wrote "To Kill a Mockingbird"?'
    ];

    let answers = ['4', 'Paris', 'Blue', '8', 'Harper Lee'];

    let answer = prompt(questions[index]);
    if (answer.toLowerCase() === answers[index].toLowerCase()) {
      score += 10;
      scoreText.setText('Score: ' + score);
      triviaAnswered[index] = true;
      area.destroy();
    } else {
      alert('Incorrect! Try again.');
    }
  }
}
