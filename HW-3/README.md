# Gas Tank Dilemma - Choose Your Adventure Game

## Overview
This project is a simple choose game where the player is presented with choices to make as they drive on a road trip. The choices affect the outcome of the story, with each decision leading to a different scenario. The game includes sound effects for button clicks and utilizes basic JavaScript for interactivity.

## Successes

### Storyline and Button Functionality
The main goal of this project was to create an interactive narrative where the player chooses what to do next in the story. I was able to implement a straightforward structure for the storyline using innerHTML in JavaScript. Each choice the player makes updates the story text and displays new buttons for further decisions. This was a great success, as it allowed me to create an engaging narrative with multiple branches.

### Sound Effect Implementation
I (somehow) successfully added a sound effect to play when a button is clicked. Using the HTML audio tag and JavaScript’s play function, I was able to trigger the sound each time the user interacted with the buttons. The sound is a small touch that makes the game feel more interactive, adding to the overall experience. I did look stuff up on how to do it, though.

## Challenges

### Struggles with Button Functionality
One of the major challenges I faced was getting the buttons to function as expected. I wanted the button choices to dynamically update as the story progressed, but at first, I struggled with making the buttons work properly. Initially, I had trouble making the buttons display the correct labels and trigger the right JavaScript functions when clicked.

After a lot of debugging, I realized that I needed to ensure the onclick event for each button correctly called the choosepath function with the proper argument (the path the player chose). I also had to make sure the updatebuttons function was correctly updating the button labels and actions after each decision.

### Sound Effect Issues
Integrating the sound effect also posed some problems. Initially, the sound wouldn't play at all, and it took me a while to figure out that I needed to ensure the audio file was properly linked, and the JavaScript play method was correctly invoked. Once I figured that out, the sound effect played correctly with each button click, which was a rewarding solution to implement.

## How I Overcame the Challenges

To overcome the issues with the buttons, I spent some time experimenting with JavaScript functions. I had to refactor the code a couple of times to get the choosepath function to work dynamically, depending on the user’s choices. I also learned that the key to the button functionality was making sure the correct actions and text were being passed and updated at every step of the game.

For the sound effect, I reviewed the documentation for the HTML audio element and made sure I properly linked the audio file to my code. I also ensured the play method was invoked at the right time in my JavaScript to trigger the sound when the button was clicked.

## ChatGPT Assistance

While working through these challenges, I turned to ChatGPT for guidance. The assistant helped me understand some of the more advanced features I could add, like adding more dynamic features for the choices and using the play function for sound effects. However, I didnt' want to just copy and paste the asnwers given. Partly becasue I didn't know what was happening. Instead, I used the advice to improve my understanding of how things should be structured and how I could approach the problem. This gave me a better grasp of JavaScript and allowed me to build on the suggestions to make the project my own.

I also had it recreate the assignment, but told it to do it its own way. It ended up making it 10x more complicated. There were so many thing that were added that I didn't understand. Also, It didn't even work that well. That was most surprising. Only two buttons worked, and that was it. 

## Conclusion

In the end, I was able to create a working interactive story with dynamic choices, button updates, and sound effects. While I faced some challenges with button functionality and sound implementation, I was able to work through them by debugging and researching. I still had to use a lot of resources, and it might take me quite awhile to truly understand how this all works. I got the meat of the assignment done, though.

