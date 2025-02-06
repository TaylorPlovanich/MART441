function playGame() {
    let choice = document.getElementById("choice").value.toLowerCase(); // Get the choice and make it lowercase
    let storyText = "";
    let imagePath = "";

    // Handle the choices with if/else statements
    if (choice === "look around") {
        storyText = "You see a dusty lantern and some broken crates.";
        imagePath = "images/crates.jpg";
    } else if (choice === "open door") {
        storyText = "You open the door and see a foggy field.";
        imagePath = "images/foggyfield.jpg";
    } else if (choice === "pick up lantern") {
        storyText = "The lantern is broken. It does nothing.";
        imagePath = "images/lantern.jpg";
    } else if (choice === "inspect crates") {
        storyText = "You find an old book.";
        imagePath = "images/book.jpg";
    } else if (choice === "pick up book") {
        storyText = "Inside the book, you find a small radio. You call for help and are saved!";
        imagePath = "images/radio.jpg";
    } else if (choice === "walk towards field") {
        storyText = "You walk into the field and fall into a trap. Game over.";
        imagePath = "images/trap.jpg";
    } else if (choice === "return inside") {
        storyText = "You return inside, but a demon gets in and attacks you. Game over.";
        imagePath = "images/demon.jpg";
    } else {
        storyText = "Invalid choice. Try again.";
        imagePath = "images/error.jpg";
    }

    // Update the text and image based on the choice
    document.getElementById("story").innerText = storyText;
    document.getElementById("image").src = imagePath;

    // Show the restart button after the user makes a choice
    document.getElementById("restart").style.display = "inline";
}

function restartGame() {
    // Reset the game to the beginning
    document.getElementById("story").innerText = "You wake up in an abandoned barn. What do you do?";
    document.getElementById("choice").value = "";  // Clear the input field
    document.getElementById("image").src = "images/barn.jpg";  // Reset the image
    document.getElementById("restart").style.display = "none";  // Hide the restart button
}
