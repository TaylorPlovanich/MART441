## HW 4

I chose a random story where you wake up in an abandoned barn and then have to make choices. Nothing too crazy.

## AI Reflection

Alright, so when i first started on this assignment, I was having difficulty. It just seemed like there was too many steps/pieces that I was missing. I did eventually have ChatGPT make the code for my game idea. However, it gave me some js code that was way too advanced. I didn't know what was happening there either. I implemneted some of the code, just to see what it did, or how it worked. Couldnt use it, though.

I did eventually get most of the requirements done on my own. I'd say 90%, but there was something I just couldn't get. This part of the code wasnt mine. I simply could not figure out how to get the choices to update:

 if (storyData[choice]) {
        storyText = storyData[choice].story;
        imageSrc = storyData[choice].image; 
    
        if (storyData[choice].options.length > 0) {
            choicesText = "Type: " + storyData[choice].options.join(" or ");
        } else {
            choicesText = "Game Over. Type 'restart' to play again.";
        }
    
        currentStory = choice;
    } else {
        storyText = "Invalid choice. Try again.";
        choicesText = "Type: 'look around' or 'open door'.";

        