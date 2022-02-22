$(document).ready(function(){
    var currentQuestion;
    var interval;
    var timeLeft = 10;
    var score = 0;
    var highScore = 0;

    var updateTimeLeft = function (amount) {
      timeLeft += amount;
      $('#time-left').text(timeLeft);
    };

    var resetTimeLeft = function () {
      timeLeft = 10;
      $('#time-left').text(timeLeft);
    };
    
    var updateScore = function (amount) {
      score += amount;
      $('#score').text(score);
    };
    
    var resetScore = function (score){
      score = 0;
      $('#score').text(score);
    }

    var updateHighScore = function (score){
      highScore = score
      $('#high-score').text(score);
    }

    var resetHighScore = function (score){
      highScore = 0;
      $('#high-score').text(score);
    }

    var startGame = function () {
      if (!interval) {
        if (timeLeft === 0) {
          updateTimeLeft(10);
          updateScore(-score);
        }
        interval = setInterval(function () {
          updateTimeLeft(-1);
          if (timeLeft === 0) {
            clearInterval(interval);
            interval = undefined;
          }
        }, 1000);  
      }
    };
    
    var randomNumberGenerator = function (value) {
    var number = Math.ceil(Math.random() * value);
      return number 
    };
    
    var questionGenerator = function () {
      var question = {};
      var num1 = randomNumberGenerator(10);
      var num2 = randomNumberGenerator(10);
      question.answer = num1 + num2;
      question.equation = String(num1)  + "+" +  String(num2);
      return question;
    };
    
    var renderNewQuestion = function () {
      currentQuestion = questionGenerator();
      $('#equation').text(currentQuestion.equation);  
    };
    
    var checkAnswer = function (userInput, answer) {
      if (userInput === answer) {
        renderNewQuestion();
        $('#user-input').val('');
        updateTimeLeft(+1);
        updateScore(+1);
      }
      if (score >= highScore){
          updateHighScore(score)
      }
    };

    $('#user-input').on('keyup', function () {
      startGame();
      checkAnswer(Number($(this).val()), currentQuestion.answer);
    });

    $("#reset").click("click", function () {
      resetTimeLeft(10)
      resetScore(0);
      resetHighScore(0)
      renderNewQuestion();
    });
  
    renderNewQuestion();
  });