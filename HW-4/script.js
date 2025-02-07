let currentStory = "start"; // Keeps track of where we are in the story

// Function to handle user input
function makeChoice() {
    let choice = document.getElementById("choice").value.toLowerCase(); // Get the user's input
    let storyText = "";
    let choicesText = "";
    let imageSrc = "images/barn.jpg"; // Default image for the start

    // Story choices
    let storyData = {
        "look around": { 
            story: "You find a dusty lantern, and a few broken crates. It's eerily quiet.",
            image: "tools.jpg", 
            options: ["Pick up the lantern", "Inspect the crates"] 
        },
        "open door": { 
            story: "You push open the door and step outside into the foggy, cold air. The field ahead seems endless.",
            image: "field.jpg", 
            options: ["Walk towards the field", "Return inside"]
        },
        "pick up the lantern": {
            story: "You pick up the lantern. It’s cold and heavy, but broken. It does nothing.",
            image: "lantern.jpg",
            options: ["Inspect the crates", "Return to the barn"]
        },
        "inspect the crates": {
            story: "You open one of the crates and find an old book.",
            image: "crates.jpg",
            options: ["Pick up the book", "Return to the barn"]
        },
        "pick up the book": {
            story: "You open the book and find a small radio to call for help. You are saved.",
            image: "crates.jpg",
            options: []
        },
        "walk towards the field": {
            story: "You walk towards the field. You fall into a trap hole and die.",
            image: "field_fog.jpg",
            options: []
        },
        "return inside": {
            story: "You return inside the barn. Unfortunately, when you opened the door, a demon got inside and proceeds to kill you.",
            image: "barn_inside.jpg",
            options: []
        }
    };

    // Update story based on user choice
    if (storyData[choice]) {
        storyText = storyData[choice].story;
        imageSrc = "images/" + storyData[choice].image;
        choicesText = storyData[choice].options.length > 0 ? "Type: " + storyData[choice].options.join(" or ") : "Game Over. Type 'restart' to play again.";
        currentStory = choice;
    } else {
        storyText = "Invalid choice. Try again.";
        choicesText = "Type: 'look around' or 'open door'.";
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
    currentStory = "start";
    document.getElementById("story").innerText = "You wake up in an abandoned barn. What do you do?";
    document.getElementById("choice").value = "";
    document.getElementById("restart").style.display = "none";
    document.getElementById("choices-text").innerText = "Type: 'look around' or 'open door'.";
    document.getElementById("image").src = "images/barn.jpg";
}
