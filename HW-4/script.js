function playGame() {
    let choice = document.getElementById("choice").value.toLowerCase();
    let result = handleChoice(choice);
    document.getElementById("story").innerText = result.story;
    document.getElementById("image").src = result.image; // Change image
    updateOptions(result.options); // Update options based on the choice
}

function handleChoice(choice) {
    let options = {
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

    // Check if the user's choice matches the options
    if (options[choice]) {
        return options[choice]; // Return the corresponding result
    } else {
        return { 
            story: "Invalid choice. Please type 'Look around' or 'Open door'.", 
            image: "error.jpg", 
            options: ["Look around", "Open door"] // Show the basic options if input is invalid
        };
    }
}

function updateOptions(newOptions) {
    // Clear previous options
    const optionsList = document.getElementById("options");
    optionsList.innerHTML = "";

    // Add new options
    newOptions.forEach(option => {
        let li = document.createElement("li");
        li.innerText = option;
        optionsList.appendChild(li);
    });
}

function restartGame() {
    document.getElementById("story").innerText = "You wake up in an abandoned barn. What do you do?";
    document.getElementById("choice").value = "";
    document.getElementById("image").src = "barn.jpg";
    
    // Reset options to the start
    updateOptions(["Look around", "Open door"]);
}
