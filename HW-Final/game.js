// Trivia Platformer Game - Advanced Version

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.velocityY = 0;
    this.gravity = 0.5;
    this.speed = 5;
    this.score = 0;
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.y += this.velocityY;
    this.velocityY += this.gravity;

    if (this.y > 350) { // Ground level
      this.y = 350;
      this.velocityY = 0;
    }
  }

  moveLeft() { this.x -= this.speed; }
  moveRight() { this.x += this.speed; }
  jump() { if (this.y >= 350) this.velocityY = -10; }
}

class TriviaQuestion {
  constructor(question, answers, correctAnswer) {
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
  }

  isCorrect(answer) { return answer === this.correctAnswer; }
}

const questions = [
  new TriviaQuestion("What is 2 + 2?", ["3", "4", "5"], "4"),
  new TriviaQuestion("What is the capital of France?", ["Berlin", "Paris", "Madrid"], "Paris"),
  new TriviaQuestion("Which planet is known as the Red Planet?", ["Earth", "Mars", "Jupiter"], "Mars")
];

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const player = new Player(100, 350);
let currentQuestion = 0;

// Handle player movement
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") player.moveLeft();
  if (e.key === "ArrowRight") player.moveRight();
  if (e.key === "Space") player.jump();
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  player.draw(ctx);

  if (player.x > 400) {
    showQuestion();
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();

function showQuestion() {
  const questionBox = document.getElementById("question-container");
  questionBox.style.display = "block";

  const question = questions[currentQuestion];
  document.getElementById("question").textContent = question.question;

  $(".answer").each(function(index) {
    $(this).text(question.answers[index]);
    $(this).data("answer", question.answers[index]);
  });
}

$(document).ready(function() {
  $(".answer").click(function() {
    const answer = $(this).data("answer");
    if (questions[currentQuestion].isCorrect(answer)) {
      player.score += 10;
      alert("Correct!");
    } else {
      alert("Wrong! Try again.");
    }

    currentQuestion = (currentQuestion + 1) % questions.length;
    document.getElementById("question-container").style.display = "none";
    document.getElementById("score").textContent = "Score: " + player.score;
  });
});
