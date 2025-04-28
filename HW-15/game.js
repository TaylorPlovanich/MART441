$(document).ready(function() {
    let playerPosition = 100; // X position of the player
    let score = 0;
    let triviaActive = false;
    
    const $player = $('#player');
    const $score = $('#score');
    const $platform = $('#platform');
    const $questionContainer = $('#question-container');
    const $answer1 = $('#answer-1');
    const $answer2 = $('#answer-2');
    const $answer3 = $('#answer-3');
    
    // Initial player setup
    $player.css('left', playerPosition + 'px');
    
    // Handle player movement (basic left/right)
    $(document).keydown(function(event) {
      if (event.key === 'ArrowRight') {
        playerPosition += 10;
        $player.css('left', playerPosition + 'px');
      } else if (event.key === 'ArrowLeft') {
        playerPosition -= 10;
        $player.css('left', playerPosition + 'px');
      }
    });
  
    // Trigger trivia question when player reaches platform
    function checkTrivia() {
      if (playerPosition >= 400 && !triviaActive) {
        triviaActive = true;
        $questionContainer.removeClass('hidden').fadeIn();
      }
    }
  
    // Answer options
    $answer1.click(function() { checkAnswer(3); });
    $answer2.click(function() { checkAnswer(4); });
    $answer3.click(function() { checkAnswer(5); });
  
    // Check if the answer is correct
    function checkAnswer(answer) {
      if (answer === 4) {
        score += 10;
        alert('Correct!');
      } else {
        alert('Wrong! Try again.');
      }
      triviaActive = false;
      $questionContainer.fadeOut();
      $score.text('Score: ' + score);
    }
  
    // Game loop
    function gameLoop() {
      checkTrivia();
      requestAnimationFrame(gameLoop);
    }
  
    gameLoop();
  });
  