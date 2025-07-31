let allQuestions = [];
let questions = [];
let currentQuestion = 0;


fetch("ai_questions.json")
  .then((res) => res.json())
  .then((data) => {
    allQuestions = data;
    questions = getRandomQuestions(allQuestions, 10);
    showQuestion();
  });

const questionEl = document.getElementById("question");
const levelEl = document.getElementById("level");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  levelEl.textContent = `Level ${currentQuestion + 1} of ${questions.length}`;
  optionsEl.innerHTML = "";
  q.options.forEach((opt) => {
    const li = document.createElement("li");
    li.textContent = opt;
    li.onclick = () => checkAnswer(opt);
    optionsEl.appendChild(li);
  });
  resultEl.classList.add("hidden");
  nextBtn.classList.add("hidden");
  restartBtn.classList.add("hidden");
}

function checkAnswer(answer) {
  const correct = questions[currentQuestion].answer;
  if (answer === correct) {
    resultEl.textContent = "✅ Correct!";
    resultEl.style.color = "#00ff88";
    resultEl.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
  } else {
    resultEl.textContent = "❌ Wrong! The correct answer was: " + correct;
    resultEl.style.color = "#ff0044";
    resultEl.classList.remove("hidden");
    restartBtn.classList.remove("hidden");
  }
  Array.from(optionsEl.children).forEach((li) => {
    li.onclick = null;
  });
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    questionEl.textContent = "🎉 You've completed the AI Ascension!";
    levelEl.textContent = "";
    optionsEl.innerHTML = "";
    resultEl.textContent = "Final Score: " + questions.length + " / " + questions.length;
    resultEl.style.color = "#00ff88";
    resultEl.classList.remove("hidden");
    restartBtn.classList.remove("hidden");
    nextBtn.classList.add("hidden");
  }
};

restartBtn.onclick = () => {
  currentQuestion = 0;
  questions = getRandomQuestions(allQuestions, 10);
  showQuestion();
};

function getRandomQuestions(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
