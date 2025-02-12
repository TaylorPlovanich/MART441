// Create an array of blank images (represented as placeholders)
const blankImages = Array(12).fill("blank.png"); // Replace with actual blank image URL

// Create an array of actual images (each appearing twice, shuffled randomly)
const actualImages = [];
const imageOptions = ["img1.png", "img2.png", "img3.png", "img4.png", "img5.png", "img6.png"];

// Duplicate each image to ensure pairs
imageOptions.forEach(img => {
    actualImages.push(img, img);
});

// Shuffle the actualImages array
actualImages.sort(() => Math.random() - 0.5);

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

// Function to reveal the actual image
function revealImage(index, imgElement) {
    imgElement.src = actualImages[index];
}
