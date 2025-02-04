function playGame() {
    let choice = document.getElementById("choice").value.toLowerCase();
    let result = handleChoice(choice);
    document.getElementById("story").innerText = result.story;
    document.getElementById("image").src = result.image; // Change image
    document.body.style.backgroundColor = result.bgColor; // Change background color
}

function handleChoice(choice) {
    let options = {
        "look around": { 
            story: "You find old farming tools and a dusty lantern.", 
            image: "tools.jpg", 
            bgColor: "#444" 
        },
        "open door": { 
            story: "The door creaks open, revealing a foggy field outside.", 
            image: "field.jpg", 
            bgColor: "#555" 
        },
        "climb ladder": { 
            story: "You climb to the loft and see an old trunk covered in cobwebs.", 
            image: "loft.jpg", 
            bgColor: "#666" 
        },
        "check stalls": { 
            story: "You check the stalls and hear rustling... something is hiding.", 
            image: "stalls.jpg", 
            bgColor: "#777" 
        },
        "call out": { 
            story: "Your voice echoes. Suddenly, you hear footsteps outside!", 
            image: "footsteps.jpg", 
            bgColor: "#888" 
        }
    };

    // Loop through valid choices to check if user input is valid
    for (let key in options) {
        if (choice === key) {
            return options[key]; // Return matching result
        }
    }

    return { 
        story: "Invalid choice. Please type one of the listed options.", 
        image: "error.jpg", 
        bgColor: "#222" 
    };
}

function restartGame() {
    document.getElementById("story").innerText = "You wake up in an abandoned barn. What do you do?";
    document.getElementById("choice").value = "";
    document.getElementById("image").src = "barn.jpg";
    document.body.style.backgroundColor = "#222";
}
