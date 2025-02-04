let optionsState = { // Track the state of the game choices
    lookAround: false,
};

function playGame() {
    let choice = document.getElementById("choice").value.toLowerCase();
    let result = handleChoice(choice);
    document.getElementById("story").innerText = result.story;
    document.getElementById("image").src = result.image; // Change image
    document.body.style.backgroundColor = result.bgColor; // Change background color
    updateOptions(result.options); // Update options based on the choice
}

function handleChoice(choice) {
    let options = {
        "look around": { 
            story: "You find old farming tools, a dusty lantern, and a few broken crates. It's eerily quiet.",
            image: "tools.jpg", 
            bgColor: "#444",
            options: ["Pick up the lantern", "Inspect the crates"] // New options after looking around
        },
        "open door": { 
            story: "You push open the door and step outside into the foggy, cold air. The field ahead seems endless.",
            image: "field.jpg", 
            bgColor: "#555",
            options: ["Walk towards the field", "Return inside"]
        }
    };

    // Check if the user's choice matches the options
    for (let key in options) {
        if (choice === key) {
            optionsState.lookAround = true; // Track that the user has looked around
            return options[key]; // Return the corresponding result
        }
    }

    // Default result if the input doesn't match any option
    return { 
        story: "Invalid choice. Please type 'Look around' or 'Open door'.", 
        image: "error.jpg", 
        bgColor: "#222",
        options: ["Look around", "Open door"] // Show the basic options if input is invalid
    };
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
    document.body.style.backgroundColor = "#222";
    
    // Reset options to the start
    optionsState.lookAround = false;
    updateOptions(["Look around", "Open door"]);
}
