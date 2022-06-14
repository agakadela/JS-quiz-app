'use strict';

const app = document.getElementById('quiz-app');
const quizCard = document.getElementById('quiz-details');
const questionsCard = document.getElementById('questions-card');
const resultCard = document.getElementById('result-card');

let quiz;

function initApp() {
  fetch('data/data.json')
    .then((response) => response.json())
    .then(({ title, description, time, questions, image }) => {
      quiz = new Quiz(title, description, time, questions, image);

      new QuizElementsHelper(app, quizCard, questionsCard, resultCard, quiz);
    });
}

initApp();
