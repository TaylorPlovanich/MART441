let storyText = document.getElementById('story-text');

function choosePath(choice) {
    if (choice === 'fillUp') {
        storyText.innerHTML = "You decide to stop and fill up your gas tank. The station is just around the corner, and you make it there with no problems. You feel relieved, knowing you can continue your journey safely.";
        updateButtons('Take a scenic route', 'Take a detour', 'scenicRoute', 'detour');
    }
    
    if (choice === 'ignore') {
        storyText.innerHTML = "You decide to ignore the gas light and keep driving. As the miles pass, the car starts to sputter, and you realize you might be in trouble. You pull over to the side of the road, stranded without fuel.";
        updateButtons('Call for help', 'Try walking to the nearest station', 'callHelp', 'walkStation');
    }

    if (choice === 'scenicRoute') {
        storyText.innerHTML = "You take the scenic route and find a beautiful viewpoint. You stop to enjoy the peaceful surroundings, taking a break before continuing your journey.";
        updateButtons('Continue the drive', 'Stay and relax longer', 'continueDrive', 'relaxLonger');
    }

    if (choice === 'detour') {
        storyText.innerHTML = "You take a wrong turn and end up on an unfamiliar road. You’re completely lost, but it’s an adventure! You try to find your way back to the main road.";
        updateButtons('Turn back', 'Ask someone for directions', 'turnBack', 'askDirections');
    }

    if (choice === 'callHelp') {
        storyText.innerHTML = "You call for help, but it’ll take a while before anyone arrives. You sit and wait, wishing you had stopped earlier for gas.";
        updateButtons('Wait patiently', 'Start walking to the nearest station', 'waitPatiently', 'startWalking');
    }

    if (choice === 'walkStation') {
        storyText.innerHTML = "You start walking to the nearest station, hoping you’ll find one soon. The walk is long, and you begin to regret your decision.";
        updateButtons('Keep walking', 'Rest for a while', 'keepWalking', 'rest');
    }

    if (choice === 'continueDrive') {
        storyText.innerHTML = "You continue your drive after enjoying the scenic route. You’re glad you made that choice, as it made the journey more memorable.";
        updateButtons('Complete the journey', 'Take a break', 'completeJourney', 'takeBreak');
    }

    if (choice === 'relaxLonger') {
        storyText.innerHTML = "You decide to stay and relax longer, watching the sunset. Eventually, you head back to the road, feeling at peace.";
        updateButtons('Drive home', 'Explore the area further', 'driveHome', 'exploreArea');
    }

    if (choice === 'turnBack') {
        storyText.innerHTML = "You decide to turn back and try to find your way. The detour was a mistake, but at least you learned from it.";
        updateButtons('Get back on the main road', 'Look for another route', 'getBackOnRoad', 'lookForRoute');
    }

    if (choice === 'askDirections') {
        storyText.innerHTML = "You ask a local for directions and get back on track. You realize that sometimes it’s okay to ask for help.";
        updateButtons('Continue the drive', 'Take another detour', 'continueDrive', 'takeAnotherDetour');
    }

    if (choice === 'waitPatiently') {
        storyText.innerHTML = "You wait patiently and finally receive help. You learn to be more mindful of your gas level next time.";
        updateButtons('Head home', 'Take a break before leaving', 'headHome', 'takeBreak');
    }

    if (choice === 'startWalking') {
        storyText.innerHTML = "You start walking to the station. It’s a tough journey, but you eventually make it, and fill up your tank.";
        updateButtons('Return to your car', 'Continue your walk', 'returnToCar', 'continueWalk');
    }
}

