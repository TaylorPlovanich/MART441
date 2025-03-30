// Get the canvas and set up context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Paddle setup
const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    width: 80,
    height: 10,
    speed: 5,
    dx: 0
};

// Ball setup
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    dx: 2,
    dy: -2
};

// Handle keyboard input
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(e) {
    if (e.key === "ArrowRight") {
        paddle.dx = paddle.speed;
    } else if (e.key === "ArrowLeft") {
        paddle.dx = -paddle.speed;
    }
}

function keyUp(e) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        paddle.dx = 0;
    }
}

// Draw paddle
function drawPaddle() {
    ctx.fillStyle = "blue";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// Draw ball
function drawBall() {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}

// Move paddle
function movePaddle() {
    paddle.x += paddle.dx;
    if (paddle.x < 0) {
        paddle.x = 0;
    } else if (paddle.x + paddle.width > canvas.width) {
        paddle.x = canvas.width - paddle.width;
    }
}

// Move ball
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Bounce off walls
    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        ball.dx *= -1;
    }
    if (ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    // Detect paddle collision
    if (
        ball.y + ball.radius >= paddle.y &&
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.width
    ) {
        ball.dy *= -1;
        document.body.style.backgroundColor = "yellow"; // Change background on collision
        ball.radius = Math.random() * 10 + 10; // Change size randomly
    }

    // Prevent ball from falling off bottom
    if (ball.y + ball.radius > canvas.height) {
        ball.y = canvas.height / 2;
        ball.x = canvas.width / 2;
        ball.dx = 2;
        ball.dy = -2;
        document.body.style.backgroundColor = "lightgray"; // Reset background
    }
}

// Clear canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Update game
function update() {
    clearCanvas();
    drawPaddle();
    drawBall();
    movePaddle();
    moveBall();
    requestAnimationFrame(update);
}

// Start game loop
update();

window.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("bgMusic");
    audio.play().catch(error => {
        console.log("Autoplay blocked. User interaction required.");
    });
});
