/* INICIAL DATA */
let currentQuestion = 0;
let correctAnswer = 0;

/* QUERY'S */
const query = element => document.querySelector(element);
const queryAll = element => document.querySelectorAll(element);

/* FUNCTIONS */
const showQuestion = () => {
  if (questions[currentQuestion]) {
    let q = questions[currentQuestion];
    let optionsHtml = '';
    let percent = Math.floor((currentQuestion / questions.length) * 100);

    query('.progress--bar').style.width = `${percent}%`;

    query('.scoreArea').style.display = 'none';
    query('.questionArea').style.display = 'block';

    query('.question').innerHTML = q.question;

    q.options.map((element, index) => {
      optionsHtml += `<div data-op="${index}" class="option"><span>${
        index + 1
      }</span>${element}</div>`;
    });

    query('.options').innerHTML = optionsHtml;

    queryAll('.options .option').forEach(element => {
      element.addEventListener('click', optionClickEvent);
    });
  } else {
    finishQuiz();
  }
};

const optionClickEvent = e => {
  let clickedOption = parseInt(e.target.getAttribute('data-op'));

  if (questions[currentQuestion].answer === clickedOption) {
    correctAnswer++;
  }
  currentQuestion++;
  showQuestion();
};

const finishQuiz = () => {
  let points = Math.floor((correctAnswer / questions.length) * 100);

  if (points < 30) {
    query('.scoreText1').innerHTML = 'Tá ruim em!!';
    query('.scorePct').style.color = '#f00';
  } else if (points < 70) {
    query('.scoreText1').innerHTML = 'Muito bom!!';
    query('.scorePct').style.color = 'yellow';
  } else {
    query('.scoreText1').innerHTML = 'Parabéns!!';
    query('.scorePct').style.color = '#00ff00';
  }

  query('.scorePct').innerHTML = `Acertos: ${points}%`;
  query(
    '.scoreText2'
  ).innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswer}.`;

  query('.scoreArea').style.display = 'block';
  query('.questionArea').style.display = 'none';
  query('.progress--bar').style.width = '100%';
};

const resetEvent = () => {
  correctAnswer = 0;
  currentQuestion = 0;
  showQuestion();
};

/* EVENTS */
query('#btnScore').addEventListener('click', resetEvent);

showQuestion();
