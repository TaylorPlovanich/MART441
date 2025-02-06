function playGame(choice) {
    let storyText = "";
    let imagePath = "";

    
    if (choice === "look around") {
        storyText = "You see a dusty lantern and some broken crates. What do you do next?";
        imagePath = "images/crates.jpg";
        
        document.getElementById("story").innerText = storyText;
        document.getElementById("image").src = imagePath;

        
        document.body.innerHTML += `
            <button onclick="playGame('pick up the lantern')">Pick up the lantern</button>
            <button onclick="playGame('inspect the crates')">Inspect the crates</button>
        `;
    } else if (choice === "open door") {
        storyText = "You open the door and see a foggy field. What do you do next?";
        imagePath = "images/foggyfield.jpg";
        document.getElementById("story").innerText = storyText;
        document.getElementById("image").src = imagePath;

        document.body.innerHTML += `
            <button onclick="playGame('walk towards the field')">Walk towards the field</button>
            <button onclick="playGame('return inside')">Return inside</button>
        `;
    } else if (choice === "pick up the lantern") {
        storyText = "The lantern is broken. It does nothing. What do you do next?";
        imagePath = "images/lantern.jpg";
        document.getElementById("story").innerText = storyText;
        document.getElementById("image").src = imagePath;

        document.body.innerHTML += `
            <button onclick="playGame('look around')">Look around</button>
            <button onclick="playGame('inspect the crates')">Inspect the crates</button>
        `;
    } else if (choice === "inspect the crates") {
        storyText = "You find an old book. What do you do next?";
        imagePath = "images/book.jpg";
        document.getElementById("story").innerText = storyText;
        document.getElementById("image").src = imagePath;

        document.body.innerHTML += `
            <button onclick="playGame('pick up the book')">Pick up the book</button>
            <button onclick="playGame('look around')">Look around</button>
        `;
    } else if (choice === "pick up the book") {
        storyText = "Inside the book, you find a small radio. You call for help and are saved! You win!";
        imagePath = "images/radio.jpg";
        document.getElementById("story").innerText = storyText;
        document.getElementById("image").src = imagePath;

        
    } else if (choice === "walk towards the field") {
        storyText = "You walk into the field and fall into a trap. Game over.";
        imagePath = "images/trap.jpg";
        document.getElementById("story").innerText = storyText;
        document.getElementById("image").src = imagePath;

        
    } else if (choice === "return inside") {
        storyText = "You return inside, but a demon gets in and attacks you. Game over.";
        imagePath = "images/demon.jpg";
        document.getElementById("story").innerText = storyText;
        document.getElementById("image").src = imagePath;
    }
}
