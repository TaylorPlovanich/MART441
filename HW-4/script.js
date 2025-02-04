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
            story: "You find old farming tools, a dusty lantern, and a few broken crates. It's eerily quiet.",
            image: "tools.jpg", 
            options: ["Pick up the lantern", "Inspect the crates"] // New options after looking around
        },
        "open door": { 
            story: "You push open the door and step outside into the foggy, cold air. The field ahead seems endless.",
            image: "field.jpg", 
            options: ["Walk towards the field", "Return inside"]
        },
        "pick up the lantern": {
            story: "You pick up the lantern. It’s cold and heavy, but there’s something calming about it.",
            image: "lantern.jpg",
            options: ["Inspect the crates", "Return to the barn"]
        },
        "inspect the crates": {
            story: "You open one of the crates and find some old books and a rusted tool.",
            image: "crates.jpg",
            options: ["Pick up the lantern", "Return to the barn"]
        },
        "walk towards the field": {
            story: "You walk towards the field. You fall into a trap hole and die.",
            image: "field_fog.jpg"
        },
        "return inside": {
            story: "You return inside the barn. Unfortunately, when you opened the door, a demon got inside and kills you.",
            image: "barn_inside.jpg",
            options: ["Look around", "Open door"]
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
