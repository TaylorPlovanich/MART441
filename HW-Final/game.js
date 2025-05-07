// Trivia Platformer Game - Advanced Phaser Version

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 500 },
          debug: false
      }
  },
  scene: { preload, create, update }
};

let player, platforms, cursors, triviaText, scoreText;
let score = 0;
let currentQuestion = 0;
let questions = [
  { question: "What is 2 + 2?", answers: ["3", "4", "5"], correct: "4" },
  { question: "What is the capital of France?", answers: ["Berlin", "Paris", "Madrid"], correct: "Paris" }
];

const game = new Phaser.Game(config);

function preload() {
  this.load.image('sky', 'images/sky.png');
  this.load.image('ground', 'images/ground.png');
  this.load.image('star', 'images/star.png');
  this.load.image('spike', 'images/spike.png');
  this.load.image('player', 'images/player.png');
}

function create() {
  this.add.image(400, 300, 'sky');

  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();

  player = this.physics.add.sprite(100, 450, 'player');
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.collider(player, platforms);

  triviaText = this.add.text(16, 16, 'Reach the trivia area!', { fontSize: '24px', fill: '#fff' });
  scoreText = this.add.text(16, 50, 'Score: 0', { fontSize: '24px', fill: '#fff' });
}

function update() {
  player.setVelocityX(0);

  if (cursors.left.isDown) {
      player.setVelocityX(-160);
  } else if (cursors.right.isDown) {
      player.setVelocityX(160);
  }

  if (cursors.up.isDown && player.body.blocked.down) {
      player.setVelocityY(-330);
  }

  if (player.x > 400) {
      showQuestion(this);
  }
}

function showQuestion(scene) {
  if (currentQuestion >= questions.length) return;

  const q = questions[currentQuestion];
  triviaText.setText(q.question);

  scene.input.once('pointerdown', (pointer) => {
      const answer = prompt(q.question + "\n" + q.answers.join(" / "));
      if (answer === q.correct) {
          score += 10;
          scoreText.setText('Score: ' + score);
          triviaText.setText('Correct! Move forward.');
      } else {
          triviaText.setText('Wrong! Try again.');
      }
      currentQuestion++;
  });
}
