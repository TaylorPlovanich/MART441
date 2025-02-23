const blankImages = Array(12).fill("images/blank.png");
const actualImages = [];
const imageOptions = ["images/img1.jpg", "images/img2.jpg", "images/img3.jpg", "images/img4.jpg", "images/img5.jpg", "images/img6.jpg"];

imageOptions.forEach(img => {
    actualImages.push(img, img);
});

actualImages.sort(() => Math.random() - 0.5);

let selectedImages = [];
let selectedIndexes = [];
let attempts = 0;
let matches = 0;

// Handle Form Submission
document.getElementById("playerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Collect and store user data
    const playerData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        age: document.getElementById("age").value,
        attempts: 0
    };
    
    localStorage.setItem("playerData", JSON.stringify(playerData));
    
    // Hide form, show game board
    document.getElementById("user-form").style.display = "none";
    document.getElementById("game-container").style.display = "block";
    
    startGame();
});

// Start the Game
function startGame() {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = ""; // Clear board before starting

    blankImages.forEach((image, index) => {
        const imgElement = document.createElement("img");
        imgElement.src = image; 
        imgElement.dataset.index = index; 
        imgElement.addEventListener("click", () => revealImage(index, imgElement));
        gameBoard.appendChild(imgElement);
    });
}

// Reveal Selected Images
function revealImage(index, imgElement) {
    if (selectedIndexes.includes(index) || selectedImages.length === 2) return;

    imgElement.src = actualImages[index];
    selectedImages.push(actualImages[index]);
    selectedIndexes.push(index);

    if (selectedImages.length === 2) {
        attempts++;
        setTimeout(checkMatch, 1000);
    }
}

// Check for Matching Pairs
function checkMatch() {
    const images = document.querySelectorAll("#game-board img");

    if (selectedImages[0] === selectedImages[1]) {
        matches++;
        if (matches === actualImages.length / 2) {
            endGame();
        }
    } else {
        images[selectedIndexes[0]].src = "images/blank.png";
        images[selectedIndexes[1]].src = "images/blank.png";
    }

    selectedImages = [];
    selectedIndexes = [];
}

// End Game and Show Final Page
function endGame() {
    let playerData = JSON.parse(localStorage.getItem("playerData"));
    playerData.attempts = attempts;
    localStorage.setItem("playerData", JSON.stringify(playerData));

    document.getElementById("game-container").style.display = "none";
    document.getElementById("results").style.display = "block";
    document.getElementById("finalMessage").textContent = 
        `Great job, ${playerData.firstName} ${playerData.lastName}! 
        You completed the game in ${playerData.attempts} attempts.`;
}

// Restart Game
function restartGame() {
    localStorage.removeItem("playerData");
    document.getElementById("results").style.display = "none";
    document.getElementById("user-form").style.display = "block";
}
