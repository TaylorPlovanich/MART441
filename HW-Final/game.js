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

let player;
let cursors;
let spaceKey;
let platforms;
let triviaArea;
let score = 0;
let scoreText;
let triviaText;
let questions = [
  { question: "What is 2 + 2?", answers: ["3", "4", "5"], correct: "4" },
  { question: "What is the capital of France?", answers: ["Berlin", "Paris", "Madrid"], correct: "Paris" }
];
let currentQuestion = 0;
let gameOver = false;

const game = new Phaser.Game(config);

function preload() {
  this.load.image('sky', 'images/sky.png');
  this.load.image('ground', 'images/ground.png');
  this.load.image('player', 'images/player.png');
  this.load.image('triviaArea', 'images/triviaArea.png'); // Add an image for the trivia area
}

function create() {
  // Add background
  this.add.image(400, 300, 'sky');

  // Create static platforms
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  // Create player
  player = this.physics.add.sprite(100, 450, 'player');
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  // Create player controls
  cursors = this.input.keyboard.createCursorKeys();
  spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

  // Create score display
  scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '24px', fill: '#fff' });

  // Create trivia area (where the player needs to answer a question)
  triviaArea = this.physics.add.staticGroup();
  triviaArea.create(500, 300, 'triviaArea'); // Position it somewhere

  // Add collision detection
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(triviaArea, platforms);

  // Check for overlap between player and trivia area
  this.physics.add.overlap(player, triviaArea, showTrivia, null, this);
}

function update() {
  if (gameOver) return;

  player.setVelocityX(0);

  // Movement logic for left and right
  if (cursors.left.isDown) {
      player.setVelocityX(-160);
  } else if (cursors.right.isDown) {
      player.setVelocityX(160);
  }

  // Jumping logic using spacebar (only when player is on the ground)
  if (Phaser.Input.Keyboard.JustDown(spaceKey) && player.body.blocked.down) {
      player.setVelocityY(-330); // Adjust the jump strength
  }
}

function showTrivia(player, trivia) {
  if (currentQuestion < questions.length) {
      const q = questions[currentQuestion];

      triviaText = this.add.text(200, 150, `${q.question}\n\n${q.answers.join("\n")}`, {
          fontSize: '24px',
          fill: '#fff',
          wordWrap: { width: 400 }
      });

      this.input.once('pointerdown', () => {
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
  } else {
      triviaText.setText('No more questions, you win!');
  }
}
