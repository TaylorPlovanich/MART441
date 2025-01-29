let storyText = document.getElementById('story-text');

function choosePath(choice) {
    if (choice === 'fillUp') {
        storyText.innerHTML = "You decide to stop and fill up your gas tank. The station is just around the corner, and you make it there with no problems. You feel relieved, knowing you can continue your journey safely.";
        updateButtons('Take a scenic route', 'Get lost on a detour');
    } else if (choice === 'ignore') {
        storyText.innerHTML = "You decide to ignore the gas light and keep driving. As the miles pass, the car starts to sputter, and you realize you might be in trouble. You pull over to the side of the road, stranded without fuel.";
        updateButtons('Call for help', 'Try walking to the nearest station');
    } else if (choice === 'scenicRoute') {
        storyText.innerHTML = "You take the scenic route and find a beautiful viewpoint. You stop to enjoy the peaceful surroundings, taking a break before continuing your journey.";
        updateButtons('Continue the drive', 'Take a photo and relax longer');
    } else if (choice === 'detour') {
        storyText.innerHTML = "You take a wrong turn and end up on an unfamiliar road. You’re completely lost, but it’s an adventure! You try to find your way back to the main road.";
        updateButtons('Turn back', 'Ask someone for directions');
    } else if (choice === 'callHelp') {
        storyText.innerHTML = "You call for help, but it’ll take a while before anyone arrives. You sit and wait, wishing you had stopped earlier for gas.";
        updateButtons('Wait patiently', 'Walk to the nearest station');
    } else if (choice === 'walkStation') {
        storyText.innerHTML = "You start walking to the nearest station, hoping you’ll find one soon. The walk is long, and you begin to regret your decision.";
        updateButtons('Keep walking', 'Rest for a while');
    } else if (choice === 'pushLuck') {
        storyText.innerHTML = "You decide to ignore the gas light just a little longer, and somehow you make it to the gas station just in time. It was a close call!";
        updateButtons('Fill up and relax', 'Drive home safely');
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
