let questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "Berlin", "Madrid", "Rome"],
      correctAnswer: "Paris"
    },
    {
      question: "What color are bananas when ripe?",
      choices: ["Red", "Blue", "Yellow", "Green"],
      correctAnswer: "Yellow"
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  
  $(document).ready(function() {
    $('#startBtn').click(function() {
      score = 0;
      currentQuestion = 0;
      localStorage.setItem('lastScore', score);
      showQuestion();
    });
  });
  
  function showQuestion() {
    if (currentQuestion >= questions.length) {
      $('#quizArea').html(`<h2>Quiz Over! Your score: ${score}</h2>`);
      localStorage.setItem('lastScore', score);
      return;
    }
  
    let q = questions[currentQuestion];
    let html = `<h2>${q.question}</h2>`;
    q.choices.forEach(choice => {
      html += `<button class="choiceBtn">${choice}</button><br>`;
    });
    $('#quizArea').html(html);
  
    $('.choiceBtn').click(function() {
      let selected = $(this).text();
      if (selected === q.correctAnswer) {
        score++;
      }
      currentQuestion++;
      showQuestion();
    });
  }
  