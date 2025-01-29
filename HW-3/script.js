let storyText = document.getElementById('story-text');

function choosePath(choice) {
    if (choice === 'left') {
        storyText.innerHTML = "You take the left path and encounter a wild animal. Do you fight or run?";
        updateButtons('fight', 'run');
    } else if (choice === 'right') {
        storyText.innerHTML = "You take the right path and find a hidden treasure. Do you open it or leave it?";
        updateButtons('open', 'leave');
    } else if (choice === 'forward') {
        storyText.innerHTML = "You walk forward and fall into a trap! Do you try to escape or wait for help?";
        updateButtons('escape', 'wait');
    }
}

function updateButtons(choice1, choice2) {
    // Update button texts and functionality
    const buttons = document.querySelectorAll('button');
    buttons[0].innerHTML = `Choose to ${choice1}`;
    buttons[0].setAttribute('onclick', `choosePath('${choice1}')`);
    buttons[1].innerHTML = `Choose to ${choice2}`;
    buttons[1].setAttribute('onclick', `choosePath('${choice2}')`);
}
