const quizContainer = document.getElementById('quiz-container');

let totalQuestions = 5;  // Set the total number of questions in a session
let currentQuestionCount = 0;
let score = 0;  // Score tracker
let isAnswered = false;

// Function to generate a random arithmetic question
function generateRandomQuestion() {
  const num1 = Math.floor(Math.random() * 10) + 1;  // Random number between 1 and 10
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operators = ['+', '-', '*', '/'];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  let question, correctAnswer;
  switch (operator) {
    case '+':
      question = `${num1} + ${num2}`;
      correctAnswer = (num1 + num2).toFixed(2);  // Fixed to 2 decimal places for division
      break;
    case '-':
      question = `${num1} - ${num2}`;
      correctAnswer = (num1 - num2).toFixed(2);
      break;
    case '*':
      question = `${num1} * ${num2}`;
      correctAnswer = (num1 * num2).toFixed(2);
      break;
    case '/':
      question = `${num1} / ${num2}`;
      correctAnswer = (num1 / num2).toFixed(2);  // Ensure fixed precision for division
      break;
  }

  // Generate incorrect choices
  const choices = generateChoices(correctAnswer);

  return {
    question: `What is ${question}?`,
    choices,
    correctAnswer
  };
}

// Function to generate choices for the question
function generateChoices(correctAnswer) {
  const choices = new Set();
  choices.add(correctAnswer);  // Include the correct answer

  // Generate 3 incorrect answers close to the correct answer
  while (choices.size < 4) {
    const randomOffset = (Math.random() * 10 - 5).toFixed(2);  // Random offset between -5 and 5
    choices.add((parseFloat(correctAnswer) + parseFloat(randomOffset)).toFixed(2));
  }

  // Shuffle choices
  return Array.from(choices).sort(() => Math.random() - 0.5);
}

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

  // Generate a new question
  const questionData = generateRandomQuestion();
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

  // Automatically move to the next question after 3 seconds
  setTimeout(loadNextQuestion, 3000);
}

// Function to restart the quiz
function restartQuiz() {
  currentQuestionCount = 0;
  score = 0;  // Reset score
  loadNextQuestion();
}

// Initial load
loadNextQuestion();
