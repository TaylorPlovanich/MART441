const blankImages = Array(12).fill("images/blank.png"); 

const actualImages = [];
const imageOptions = ["images/img1.jpg", "images/img2.jpg", "images/img3.jpg", "images/img4.jpg", "images/img5.jpg", "images/img6.jpg"];
const blankImage = "images/blank.png"; 

imageOptions.forEach(img => {
    actualImages.push(img, img);
});

actualImages.sort(() => Math.random() - 0.5);

let selectedImages = [];
let selectedIndexes = [];
let attempts = 0;
let matches = 0; 

document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("game-board");
    
    blankImages.forEach((image, index) => {
        const imgElement = document.createElement("img");
        imgElement.src = image; 
        imgElement.dataset.index = index; 
        imgElement.addEventListener("click", () => revealImage(index, imgElement));
        gameBoard.appendChild(imgElement);
    });
});

function revealImage(index, imgElement) {
    if (selectedIndexes.includes(index) || selectedImages.length === 2) {
        return;
    }

    imgElement.src = actualImages[index];

    selectedImages.push(actualImages[index]);
    selectedIndexes.push(index);

    if (selectedImages.length === 2) {
        attempts++; 
        setTimeout(checkMatch, 1000); 
    }
}

function checkMatch() {
    const images = document.querySelectorAll("#game-board img");

    if (selectedImages[0] === selectedImages[1]) {
        matches++; 
        console.log("Match found!");

        if (matches === actualImages.length / 2) {
            setTimeout(() => {
                alert(`Game Over! You found all matches in ${attempts} attempts.`);
            }, 500);
        }
    } else {
        images[selectedIndexes[0]].src = "blank.png";
        images[selectedIndexes[1]].src = "blank.png";
    }

    selectedImages = [];
    selectedIndexes = [];
}
