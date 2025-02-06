function playGame() {
    let choice = document.getElementById("choice").value.toLowerCase();
    let storyText = "";
    let imageSrc = "";

    if (choice === "look around") {
        storyText = "You find a dusty lantern, and a few broken crates. It's eerily quiet.";
        imageSrc = "images/crates.jpg";
        updateOptions(["Pick up the lantern", "Inspect the crates"]);
    } else if (choice === "open door") {
        storyText = "You push open the door and step outside into the foggy, cold air. The field ahead seems endless.";
        imageSrc = "images/foggyfield.jpg";
        updateOptions(["Walk towards the field", "Return inside"]);
    } else if (choice === "pick up the lantern") {
        storyText = "You pick up the lantern. It’s cold and heavy, but broken. It does nothing.";
        imageSrc = "images/lantern.jpg";
        updateOptions(["Inspect the crates", "Return to the barn"]);
    } else if (choice === "inspect the crates") {
        storyText = "You open one of the crates and find an old book.";
        imageSrc = "images/book.jpg";
        updateOptions(["Pick up the book", "Return to the barn"]);
    } else if (choice === "pick up the book") {
        storyText = "You open the book and find a small radio to call for help. You are saved.";
        imageSrc = "images/radio.jpg";
        updateOptions([]);
    } else if (choice === "walk towards the field") {
        storyText = "You walk towards the field. You fall into a trap hole and die.";
        imageSrc = "images/trap.jpg";
        updateOptions([]);
    } else if (choice === "return inside") {
        storyText = "You return inside the barn. Unfortunately, when you opened the door, a demon got inside and proceeds to kill you.";
        imageSrc = "images/demon.jpg";
        updateOptions([]);
    } else {
        storyText = "Invalid choice. Please type or select an option.";
        imageSrc = "images/error.jpg";
        updateOptions(["Look around", "Open door"]);
    }

    document.getElementById("story").innerText = storyText;
    document.getElementById("image").src = imageSrc;
}

function updateOptions(options) {
    let optionsList = document.getElementById("options");
    optionsList.innerHTML = "";
    
    for (let i = 0; i < options.length; i++) {
        let li = document.createElement("li");
        li.innerText = options[i];
        li.style.cursor = "pointer";
        li.onclick = function() {
            document.getElementById("choice").value = options[i];
            playGame();
        };
        optionsList.appendChild(li);
    }
}

function restartGame() {
    document.getElementById("story").innerText = "You wake up in an abandoned barn. What do you do?";
    document.getElementById("choice").value = "";
    document.getElementById("image").src = "images/barn.jpg";
    updateOptions(["Look around", "Open door"]);
}

window.onload = function() {
    restartGame();
};
