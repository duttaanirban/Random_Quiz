const quizContainer = document.getElementById('quiz-container');

let totalQuestions = 5;  // Set the total number of questions in a session
let currentQuestionCount = 0;
let score = 0;  // Score tracker
let isAnswered = false;

// Pool of fun fact/trivia questions
const questionsPool = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    choices: ["William Shakespeare", "Charles Dickens", "Leo Tolstoy", "Mark Twain"],
    correctAnswer: "William Shakespeare"
  },
  {
    question: "What is the tallest mountain in the world?",
    choices: ["K2", "Mount Everest", "Kangchenjunga", "Makalu"],
    correctAnswer: "Mount Everest"
  },
  {
    question: "Which ocean is the largest?",
    choices: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
    correctAnswer: "Pacific Ocean"
  },
  {
    question: "What is the chemical symbol for water?",
    choices: ["H2O", "CO2", "O2", "NaCl"],
    correctAnswer: "H2O"
  },
  // Add more trivia questions as needed
];

// Function to load the next question
function loadNextQuestion() {
  if (currentQuestionCount >= totalQuestions) {
    quizContainer.innerHTML = `
      <h2 class="text-xl font-semibold">Quiz Completed! 🎉</h2>
      <p class="mt-4">Your final score is: ${score}/${totalQuestions}</p>
      <button class="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
        onclick="restartQuiz()">
        Restart Quiz
      </button>
    `;
    return;
  }

  // Randomly select a question from the pool
  const questionIndex = Math.floor(Math.random() * questionsPool.length);
  const questionData = questionsPool.splice(questionIndex, 1)[0];  // Remove the selected question to avoid repetition
  currentQuestionCount++;

  // Render the question and choices
  quizContainer.innerHTML = `
    <h2 class="text-xl font-semibold">${questionData.question}</h2>
    <ul class="mt-4">
      ${questionData.choices.map(choice => `
        <li class="mt-2">
          <button 
            class="choice-button bg-gray-200 text-gray-800 px-4 py-2 rounded w-full hover:bg-gray-300"
            onclick="checkAnswer('${choice}', '${questionData.correctAnswer}')"
          >
            ${choice}
          </button>
        </li>
      `).join('')}
    </ul>
  `;

  isAnswered = false;
}

// Function to check the answer and show the result
function checkAnswer(selectedAnswer, correctAnswer) {
  if (isAnswered) return;  // Prevent multiple answers
  
  if (selectedAnswer === correctAnswer) {
    score++;  // Increment score for correct answer
    quizContainer.innerHTML += `<p class="mt-4 text-lg text-green-500">Correct! 🎉</p>`;
  } else {
    quizContainer.innerHTML += `<p class="mt-4 text-lg text-red-500">Wrong! 😞 The correct answer is ${correctAnswer}.</p>`;
  }
  
  isAnswered = true;

  // Automatically move to the next question after 1 seconds
  setTimeout(loadNextQuestion, 1000);
}

// Function to restart the quiz
function restartQuiz() {
  currentQuestionCount = 0;
  score = 0;  // Reset score
  loadNextQuestion();
}

// Initial load
loadNextQuestion();
