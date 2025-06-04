const questions = [
  {
    question: "Qual tag HTML é usada para criar um parágrafo?",
    options: ["<div>", "<p>", "<h1>", "<br>"],
    answer: 1,
    explanation: "A tag <p> é usada para parágrafos em HTML."
  },
  {
    question: "Qual propriedade CSS muda a cor do texto?",
    options: ["background-color", "font-style", "color", "text-align"],
    answer: 2,
    explanation: "A propriedade 'color' define a cor do texto."
  },
  {
    question: "Qual comando imprime no console em JavaScript?",
    options: ["echo", "print", "console.log()", "printf"],
    answer: 2,
    explanation: "Em JavaScript usamos console.log()."
  },
  {
    question: "Em Python, qual operador é usado para potenciação?",
    options: ["^", "**", "pow", "//"],
    answer: 1,
    explanation: "** é o operador de potenciação em Python."
  },
  {
    question: "O que significa CSS?",
    options: [
      "Colorful Style Sheets",
      "Cascading Style Sheets",
      "Creative Style Syntax",
      "Cascading Syntax System"
    ],
    answer: 1,
    explanation: "CSS significa Cascading Style Sheets."
  },
  {
    question: "Qual destes não é tipo primitivo em JavaScript?",
    options: ["String", "Boolean", "Number", "Character"],
    answer: 3,
    explanation: "JavaScript não possui 'Character' como tipo primitivo."
  },
  {
    question: "Para que serve a tag <a> em HTML?",
    options: [
      "Adicionar imagem",
      "Criar link",
      "Adicionar áudio",
      "Criar botão"
    ],
    answer: 1,
    explanation: "A tag <a> cria um link."
  },
  {
    question: "Qual função converte uma string em número em Python?",
    options: ["parseInt()", "toNumber()", "int()", "string()"],
    answer: 2,
    explanation: "A função int() converte strings em inteiros."
  },
  {
    question: "Qual dos seguintes é um framework front-end?",
    options: ["Django", "Flask", "React", "Node.js"],
    answer: 2,
    explanation: "React é um framework/biblioteca front-end."
  },
  {
    question: "Como declarar variável em JavaScript?",
    options: ["let x = 5;", "x := 5;", "var x := 5;", "int x = 5;"],
    answer: 0,
    explanation: "JavaScript usa 'let', 'const' ou 'var'."
  }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];
let timer;
let timeLeft = 300; // 5 minutos por pergunta

function startQuiz() {
  const name = document.getElementById("username").value.trim();
  if (!name) {
    alert("Por favor, digite seu nome.");
    return;
  }

  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("quiz-screen").classList.remove("hidden");
  showQuestion();
  startTimer();
}

function startTimer() {
  timeLeft = 300;
  updateTimer();
  timer = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      userAnswers.push(null); // Não respondeu
      currentQuestion++;
      clearInterval(timer);
      if (currentQuestion < questions.length) {
        showQuestion();
        startTimer();
      } else {
        endQuiz();
      }
    }
  }, 1000);
}

function updateTimer() {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");
  document.getElementById("timer").textContent = `Tempo: ${minutes}:${seconds}`;
  document.getElementById("question-counter").textContent =
    `Pergunta ${currentQuestion + 1} de ${questions.length}`;
}

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question-title").textContent = q.question;
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => {
      clearInterval(timer);
      userAnswers.push(index);
      if (index === q.answer) score++;
      currentQuestion++;
      if (currentQuestion < questions.length) {
        showQuestion();
        startTimer();
      } else {
        endQuiz();
      }
    };
    answersDiv.appendChild(btn);
  });
}

function endQuiz() {
  clearInterval(timer);
  document.getElementById("quiz-screen").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");

  let message = "";
  if (score < 6) {
    message = "Você está precisando estudar mais.";
  } else if (score < 10) {
    message = "Muito bom, você está indo muito bem!";
  } else {
    message = "Parabéns! Você está muito bem.";
  }

  document.getElementById("result-message").textContent = message;
  document.getElementById("score").textContent = `Acertos: ${score} de 10`;

  let explanationHTML = "<h3>Explicações:</h3>";
  questions.forEach((q, i) => {
    if (userAnswers[i] !== q.answer) {
      explanationHTML += `<p><strong>${q.question}</strong><br>
        Correto: ${q.options[q.answer]}<br>
        Explicação: ${q.explanation}</p>`;
    }
  });

  document.getElementById("explanations").innerHTML = explanationHTML;
}
