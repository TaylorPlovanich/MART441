let currentStory = "start"; // Keeps track of where we are in the story

// Function to handle user input
function makeChoice() {
    let choice = document.getElementById("choice").value.toLowerCase(); // Get the user's input
    let storyText = "";
    let choicesText = "";
    let imageSrc = "images/barn.jpg"; // Default image for the start

    // Handle the choices based on the current story
    if (currentStory === "start") {
        if (choice === "look around") {
            storyText = "You see a dusty lantern and some broken crates.";
            choicesText = "Type 'pick up lantern' or 'inspect crates'.";
            imageSrc = "images/barn_interior.jpg"; // Change the image when user looks around
            currentStory = "barn";
        } else if (choice === "open door") {
            storyText = "You open the door and see a foggy field.";
            choicesText = "Type 'walk into field' or 'return to barn'.";
            imageSrc = "images/field.jpg"; // Change the image when user opens the door
            currentStory = "field";
        } else {
            storyText = "Invalid choice. Try 'look around' or 'open door'.";
            choicesText = "Type 'look around' or 'open door'.";
        }
    } else if (currentStory === "barn") {
        if (choice === "pick up lantern") {
            storyText = "The lantern is broken and does nothing.";
            choicesText = "Type 'inspect crates' or 'leave barn'.";
            currentStory = "barn_end";
        } else if (choice === "inspect crates") {
            storyText = "You find an old book inside the crates.";
            choicesText = "Type 'read book' or 'leave barn'.";
            currentStory = "barn_end";
        } else {
            storyText = "Invalid choice. Try 'pick up lantern' or 'inspect crates'.";
            choicesText = "Type 'pick up lantern' or 'inspect crates'.";
        }
    } else if (currentStory === "field") {
        if (choice === "walk into field") {
            storyText = "You walk into the field but fall into a trap. Game over.";
            choicesText = "Type 'restart' to try again.";
            imageSrc = "images/trap.jpg"; // Game over image for the trap
            currentStory = "end";
        } else if (choice === "return to barn") {
            storyText = "You return to the barn, where the story started.";
            choicesText = "Type 'look around' or 'open door'.";
            imageSrc = "images/barn.jpg"; // Return to the barn image
            currentStory = "start";
        } else {
            storyText = "Invalid choice. Try 'walk into field' or 'return to barn'.";
            choicesText = "Type 'walk into field' or 'return to barn'.";
        }
    } else if (currentStory === "barn_end") {
        if (choice === "read book") {
            storyText = "Inside the book, you find a key to escape the barn. You win!";
            choicesText = "Type 'restart' to try again.";
            imageSrc = "images/escape.jpg"; // Winning image for escaping the barn
            currentStory = "end";
        } else if (choice === "leave barn") {
            storyText = "You leave the barn and get lost in the fog. Game over.";
            choicesText = "Type 'restart' to try again.";
            imageSrc = "images/fog.jpg"; // Game over image for the fog
            currentStory = "end";
        } else {
            storyText = "Invalid choice. Try 'read book' or 'leave barn'.";
            choicesText = "Type 'read book' or 'leave barn'.";
        }
    } else {
        storyText = "Game over.";
        choicesText = "Type 'restart' to try again.";
        document.getElementById("restart").style.display = "inline"; // Show restart button
    }

    // Update the story, choices, and image
    document.getElementById("story").innerText = storyText;
    document.getElementById("choices-text").innerText = choicesText;
    document.getElementById("image").src = imageSrc;

    // Clear the input field
    document.getElementById("choice").value = "";
}

// Function to restart the game
function restartGame() {
    currentStory = "start"; // Reset the story
    document.getElementById("story").innerText = "You wake up in an abandoned barn. What do you do?";
    document.getElementById("choice").value = "";
    document.getElementById("restart").style.display = "none"; // Hide the restart button
    document.getElementById("choices-text").innerText = "Type 'look around' or 'open door'.";
    document.getElementById("image").src = "images/barn.jpg"; // Reset to the starting image
}
