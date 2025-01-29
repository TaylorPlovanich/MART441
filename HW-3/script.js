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
        updateButtons('Wait patiently', 'Start walking to the nearest station');
    } else if (choice === 'walkStation') {
        storyText.innerHTML = "You start walking to the nearest station, hoping you’ll find one soon. The walk is long, and you begin to regret your decision.";
        updateButtons('Keep walking', 'Rest for a while');
    } else if (choice === 'pushLuck') {
        storyText.innerHTML = "You decide to ignore the gas light just a little longer, and somehow you make it to the gas station just in time. It was a close call!";
        updateButtons('Fill up and relax', 'Drive home safely');
    } else if (choice === 'continueDrive') {
        storyText.innerHTML = "You continue your drive, feeling refreshed after the break. The road ahead looks clear, and you’re back on track.";
        updateButtons('Enjoy the scenery', 'Speed up to catch up with time');
    } else if (choice === 'takePhoto') {
        storyText.innerHTML = "You take some beautiful photos of the scenery and decide to relax a bit longer. It’s a great break from the road, but eventually, you’ll have to continue your journey.";
        updateButtons('Pack up and go', 'Relax for a while longer');
    } else if (choice === 'turnBack') {
        storyText.innerHTML = "You decide to turn back. The detour wasn’t worth it, and you head back toward the main road. Eventually, you find your way home.";
        updateButtons('End your trip', 'Take another route');
    } else if (choice === 'askDirections') {
        storyText.innerHTML = "You ask a local for directions, and they help you find your way. You’re back on track and learn a little about the area along the way.";
        updateButtons('Thank them and continue', 'Make a detour again');
    } else if (choice === 'waitPatiently') {
        storyText.innerHTML = "You wait patiently, thinking about what you could’ve done differently. After what feels like forever, help finally arrives, and you’re back on your way.";
        updateButtons('Thank the driver', 'Continue the journey');
    } else if (choice === 'startWalking') {
        storyText.innerHTML = "You start walking in the hopes of reaching the nearest station. The journey is longer than expected, and you start feeling a bit tired.";
        updateButtons('Keep walking', 'Take a rest');
    } else if (choice === 'keepWalking') {
        storyText.innerHTML = "You keep walking, and after what feels like hours, you reach a small town with a station. You’re exhausted, but relieved to have made it.";
        updateButtons('Fill up', 'Walk back to your car');
    } else if (choice === 'rest') {
        storyText.innerHTML = "You decide to rest for a bit before continuing your walk. It helps recharge you for the next part of the journey.";
        updateButtons('Continue walking', 'Relax longer');
    } else if (choice === 'relaxLonger') {
        storyText.innerHTML = "You decide to relax a little longer. The peaceful surroundings make you forget the stress of being stranded.";
        updateButtons('Walk on', 'Call for help again');
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
