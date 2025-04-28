HW Final Project (Early Checkpoint)

Project Idea

For my final project, I decided to create a platformer game that incorporates trivia questions.
The player controls a character that can move left and right, and they must answer trivia questions to progress.

The basic mechanics are:

The player moves around on the screen using arrow keys.
When the player reaches a certain point (in this case, a platform), a trivia question appears.
If the player answers the trivia question correctly, they earn points and can continue moving forward.
Right now, I’ve set up the very basic foundation:

Player movement is working (left/right using arrow keys).
A trivia question appears once the player reaches a certain point.
The score updates based on correct answers.
Future Plans

I’m planning to expand the game significantly. Here are some ideas:

Player Jumping & Gravity: Right now, there’s no jumping or gravity. I plan to add these features to make the platformer feel more dynamic.
More Levels & Platforms: I want to add multiple levels, with different trivia questions and increasing difficulty.
Timer: Each question could have a time limit to answer, adding more challenge.
Game Over/Win Screen: I’ll add a start screen and a game over screen when the player finishes or loses.
Saving Progress: The game will track high scores or levels completed, saving that data in localStorage.
Coding Stuff So Far

Right now, the game is using:

State: Tracking the player’s position and score with JavaScript variables.
Storage: I plan to use localStorage later to store high scores.
JavaScript/jQuery:
JavaScript handles the player movement and checks trivia answers.
jQuery is used to handle DOM manipulation (showing and hiding trivia questions).
Event Handling: The player moves using the left and right arrow keys. The trivia question appears once the player reaches a specific platform.
This is just the beginning. Right now, the game is simple, but I plan to add more platforming mechanics and trivia features before the final version.