// Create an array of blank images (placeholders)
const blankImages = Array(12).fill("blank.png"); // Replace with actual blank image URL

// Create an array of actual images (each appearing twice, shuffled randomly)
const actualImages = [];
const imageOptions = ["images/img1.png", "img2.png", "img3.png", "img4.png", "img5.png", "img6.png"];

// Duplicate each image to ensure pairs
imageOptions.forEach(img => {
    actualImages.push(img, img);
});

// Shuffle the actualImages array
actualImages.sort(() => Math.random() - 0.5);

// Track selected images and attempts
let selectedImages = [];
let selectedIndexes = [];
let attempts = 0;
let matches = 0; // Track matched pairs

// Function to display the grid of blank images
document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("game-board");
    
    blankImages.forEach((image, index) => {
        const imgElement = document.createElement("img");
        imgElement.src = image; // Initially display blank image
        imgElement.dataset.index = index; // Store index for reference
        imgElement.addEventListener("click", () => revealImage(index, imgElement));
        gameBoard.appendChild(imgElement);
    });
});

// Function to reveal an image
function revealImage(index, imgElement) {
    // If already selected or two images are flipped, do nothing
    if (selectedIndexes.includes(index) || selectedImages.length === 2) {
        return;
    }

    // Show actual image
    imgElement.src = actualImages[index];

    // Store selected image info
    selectedImages.push(actualImages[index]);
    selectedIndexes.push(index);

    // If two images are selected, check for a match
    if (selectedImages.length === 2) {
        attempts++; // Increase attempt count
        setTimeout(checkMatch, 1000); // Wait 1 second before checking
    }
}

// Function to check if the selected images match
function checkMatch() {
    const images = document.querySelectorAll("#game-board img");

    if (selectedImages[0] === selectedImages[1]) {
        // If they match, leave them visible
        matches++; // Increase match count
        console.log("Match found!");

        // If all matches are found, show Game Over message
        if (matches === actualImages.length / 2) {
            setTimeout(() => {
                alert(`Game Over! You found all matches in ${attempts} attempts.`);
            }, 500);
        }
    } else {
        // If not, hide them again
        images[selectedIndexes[0]].src = "blank.png";
        images[selectedIndexes[1]].src = "blank.png";
    }

    // Reset selection
    selectedImages = [];
    selectedIndexes = [];
}
