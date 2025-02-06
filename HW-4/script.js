function playGame() {
    let choice = document.getElementById("choice").value.toLowerCase();
    let storyText = "";
    let imagePath = "";

    if (choice === "look around") {
        storyText = "You see a dusty lantern and some broken crates.";
        imagePath = "images/crates.jpg";
    } else if (choice === "open door") {
        storyText = "You open the door and see a foggy field.";
        imagePath = "images/foggyfield.jpg";
    } else if (choice === "pick up the lantern") {
        storyText = "The lantern is broken. It does nothing.";
        imagePath = "images/lantern.jpg";
    } else if (choice === "inspect the crates") {
        storyText = "You find an old book.";
        imagePath = "images/book.jpg";
    } else if (choice === "pick up the book") {
        storyText = "Inside the book, you find a small radio. You call for help and are saved!";
        imagePath = "images/radio.jpg";
    } else if (choice === "walk towards the field") {
        storyText = "You walk into the field and fall into a trap. Game over.";
        imagePath = "images/trap.jpg";
    } else if (choice === "return inside") {
        storyText = "You return inside, but a demon gets in and attacks you. Game over.";
        imagePath = "images/demon.jpg";
    } else {
        storyText = "Invalid choice. Try again.";
        imagePath = "images/error.jpg";
    }

    document.getElementById("story").innerText = storyText;
    document.getElementById("image").src = imagePath;
}

function restartGame() {
    document.getElementById("story").innerText = "You wake up in an abandoned barn. What do you do?";
    document.getElementById("choice").value = "";
    document.getElementById("image").src = "images/barn.jpg";
}
