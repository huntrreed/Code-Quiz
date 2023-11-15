document.addEventListener('DOMContentLoaded', function () {
  // Quiz Questions
  const quizQuestions = [
      {
          question: "What does API stand for?",
          options: ["Application Programming Interface", "A Pig Inablanket", "Analytics Per Index", "Artificial Programming Intelligence"],
          answer: "Application Programming Interface"
      },
      {
          question: "What are cookies",
          options: ["Text files with pieces of data", "Tiny men who work inside your computer", "A type of style sheet", "Common slang for a 'button' in the coding world"],
          answer: "Text files with pieces of data"
      },
      {
          question: "What is a DOM'?",
          options: ["It's an HTML Document", "A tree of objects that we can use to manipulate elements on a page", "A way to restart a computer", "A type of URL"],
          answer: "A tree of objects that we can use to manipulate elements on a page"
      },
      {
          question: "In order to make something happen when you click, what do you need to add in JavaScript",
          options: ["A style sheet", "An Event Listener", "A blue background", "An unordered list"],
          answer: "An Event Listener"
      },
      {
          question: "What will 'console.log(document.documentElement)' log?",
          options: ["The whole window object", "Nothing", "A header tag", "Root Element of a document"],
          answer: "Root Element of a document"
      },
      {
          question: "True or False: You can change the font style of headers through Javascript.",
          options: ["True", "False"],
          answer: "True"
      },
      {
          question: "What do you need to add in Java for a form in order to get the inputs to save?",
          options: ["PreventDefault", "RepeatAction", "Console.Log", "Font-Weight: Bold"],
          answer: "PreventDefault"
      }
  ];

  // Get elements by their IDs
  const preQuizBox = document.getElementById('preQuizBox');
  const startButton = document.getElementById('start-button');
  const timerElement = document.querySelector('.timer');
  const gotItButton = document.querySelector('.continue');
  const quizQuestionDiv = document.getElementById('quizQuestion');

  let currentQuestionIndex = 0;
  let timerCount = 80; // Starting time for the timer
  let timer; // Timer variable


  function addScore() {
    let initialsInput = document.getElementById('initialsInput');
    let initials = initialsInput.value;
    if (initials) {
        saveScore(initials, timerCount);
        displayFinalScore(); // Refresh and display updated high scores
    } else {
        alert("Please enter your initials!");
    }
}

  // Initially hide the start button and timer until the rules are gone
  startButton.style.display = 'none';
  timerElement.style.display = 'none';

  // Show the rules box
  preQuizBox.style.display = 'block';

  // Function to start the timer
  function startTimer() {
      timer = setInterval(function () {
          document.getElementById('count').textContent = timerCount--;
          if (timerCount < 0) {
              clearInterval(timer);
              displayFinalScore(); // Show final score when time is up
          }
      }, 1000);
  }

  // Function to display a question
  function displayQuestion() {
    const questionObj = quizQuestions[currentQuestionIndex];
    quizQuestionDiv.innerHTML = `<h2>${questionObj.question}</h2>`;
    questionObj.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = function () { checkAnswer(option, button); };
        quizQuestionDiv.appendChild(button);
    });
    quizQuestionDiv.style.display = 'block'; // Make sure to add this line
}

  // Function to check the answer
  function checkAnswer(selectedOption, button) {
      if (selectedOption === quizQuestions[currentQuestionIndex].answer) {
          button.style.backgroundColor = 'green';
      } else {
          button.style.backgroundColor = 'red';
          timerCount -= 5; // Reduce timer by 5 seconds for wrong answer
          document.getElementById('count').textContent = timerCount;
      }
      // Move to the next question or display final score at the end
      currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            displayQuestion();
        } else {
            displayFinalScore();
        }
    }

    // Function to display the final score
    function displayFinalScore() {
        clearInterval(timer);

        // Display final score
        quizQuestionDiv.innerHTML = `<h2>Your score is: ${timerCount}</h2>`;

        // Display past high scores
        displayPastScores();

        // Input for initials and submit button
        const inputHTML = '<input type="text" id="initialsInput" placeholder="Your Initials">';
        const buttonHTML = '<button onclick="addScore()">Add my Score</button>';

        // Append these to the quizQuestionDiv
        quizQuestionDiv.innerHTML += inputHTML + buttonHTML;
    }

  

    // Function to display past scores
    function displayPastScores() {
        let scores = JSON.parse(localStorage.getItem("quizScores")) || [];
        scores.sort((a, b) => b.score - a.score);
        let scoreList = "<h3>High Scores:</h3><ul>";

        scores.forEach(score => {
            scoreList += `<li>${score.initials}: ${score.score}</li>`;
        });

        scoreList += "</ul>";
        quizQuestionDiv.innerHTML += scoreList;
    }

    // Function to save score in localStorage
    function saveScore(initials, score) {
        let scores = JSON.parse(localStorage.getItem("quizScores")) || [];
        scores.push({ initials: initials, score: score });
        localStorage.setItem("quizScores", JSON.stringify(scores));
    }

    // Event listeners for pre-quiz and start button
    gotItButton.addEventListener('click', function () {
        preQuizBox.style.display = 'none';
        startButton.style.display = 'block';
        timerElement.style.display = 'block';
    });

    startButton.addEventListener('click', function () {
        startTimer();
        displayQuestion();
        startButton.style.display = 'none';
    });
});