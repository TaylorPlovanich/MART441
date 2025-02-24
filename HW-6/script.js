// Array to hold blank images for the initial game board
const blankImages = Array(12).fill("images/blank.png");

// Array to hold actual images used in the game
const actualImages = [];
const imageOptions = ["images/img1.jpg", "images/img2.jpg", "images/img3.jpg", "images/img4.jpg", "images/img5.jpg", "images/img6.jpg"];

// Duplicate each image to create pairs and shuffle them
imageOptions.forEach(img => {
    actualImages.push(img, img);
});
actualImages.sort(() => Math.random() - 0.5);

// Variables to track selected images, attempts, and matches
let selectedImages = [];
let selectedIndexes = [];
let attempts = 0;
let matches = 0;

// Event listener for when the form is submitted
document.getElementById("playerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevents page reload
    
    // Collect user input data
    const playerData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        age: document.getElementById("age").value,
        attempts: 0 // Initial attempt count
    };
    
    // Store player data in localStorage
    localStorage.setItem("playerData", JSON.stringify(playerData));
    
    // Hide form and display the game board
    document.getElementById("user-form").style.display = "none";
    document.getElementById("game-container").style.display = "block";
    
    // Start the game
    startGame();
});

// Function to set up the game board
function startGame() {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = ""; // Clear the board before starting

    // Create blank image placeholders for the game board
    blankImages.forEach((image, index) => {
        const imgElement = document.createElement("img");
        imgElement.src = image; 
        imgElement.dataset.index = index; // Store index for tracking
        imgElement.addEventListener("click", () => revealImage(index, imgElement)); // Click event for flipping cards
        gameBoard.appendChild(imgElement);
    });
}

// Function to reveal an image when clicked
function revealImage(index, imgElement) {
    // Prevent selecting the same image twice or more than two at a time
    if (selectedIndexes.includes(index) || selectedImages.length === 2) return;

    // Change image to the actual image
    imgElement.src = actualImages[index];

    // Store selected image data
    selectedImages.push(actualImages[index]);
    selectedIndexes.push(index);

    // If two images are selected, check for a match
    if (selectedImages.length === 2) {
        attempts++; // Increase attempt count
        setTimeout(checkMatch, 1000); // Delay to show the second image before checking
    }
}

// Function to check if the two selected images match
function checkMatch() {
    const images = document.querySelectorAll("#game-board img");

    // If the two selected images are the same, it's a match
    if (selectedImages[0] === selectedImages[1]) {
        matches++; // Increase match count

        // If all pairs are matched, end the game
        if (matches === actualImages.length / 2) {
            endGame();
        }
    } else {
        // If not a match, flip the images back to blank
        images[selectedIndexes[0]].src = "images/blank.png";
        images[selectedIndexes[1]].src = "images/blank.png";
    }

    // Reset selections for the next turn
    selectedImages = [];
    selectedIndexes = [];
}

// Function to handle the end of the game
function endGame() {
    // Retrieve player data from localStorage
    let playerData = JSON.parse(localStorage.getItem("playerData"));
    playerData.attempts = attempts; // Update attempt count
    localStorage.setItem("playerData", JSON.stringify(playerData)); // Save updated data

    // Hide the game board and show the results screen
    document.getElementById("game-container").style.display = "none";
    document.getElementById("results").style.display = "block";

    // Display the final message with player details and attempt count
    document.getElementById("finalMessage").textContent = 
        `Great job, ${playerData.firstName} ${playerData.lastName}! 
        You completed the game in ${playerData.attempts} attempts.`;
}

// Function to restart the game
function restartGame() {
    // Clear stored player data
    localStorage.removeItem("playerData");

    // Show the form again and hide the results screen
    document.getElementById("results").style.display = "none";
    document.getElementById("user-form").style.display = "block";
}
