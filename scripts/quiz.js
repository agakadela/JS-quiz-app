'use strict';

let TIME_OVER_SYM = Symbol('TO');
let TIMER_INTERVAL_SYM = Symbol('TI');

class Quiz {
  constructor(title, description, time, questions = [], image, questionsCount) {
    if (!title) throw new Error('Title of quiz is required.');

    if (!description) throw new Error('Description of quiz is required.');

    if (!time || time < 10)
      throw new Error('Time is required and must be more than 10 sec.');

    this.title = title;
    this.description = description;
    this._time = time;
    this[TIME_OVER_SYM] = null;
    this[TIMER_INTERVAL_SYM] = null;
    this._questions = questions;
    this._image = image;
    this._questionsCount = questionsCount;
  }

  addQuestion(answer, question, options) {
    if (this._startTime) {
      alert('Question can not added on a started quiz.');
      return;
    }
    this._questions.push({ answer, question, options });
  }

  // Start the quiz
  start() {
    if (!this._questions.length) {
      alert('There is not any question');
      return;
    }
    if (this._startTime) {
      alert('Already started.');
      return;
    }

    this._startTime = new Date().getTime();

    this._setTicker();
    return this.currentQuestion;
  }

  // Stop the running quiz
  stop() {
    this._endTime = new Date().getTime();
    clearInterval(this[TIMER_INTERVAL_SYM]);
    this[TIMER_INTERVAL_SYM] = null;
  }

  // This will return the head question of running quiz
  get currentQuestion() {
    if (!this._startTime) {
      alert('Quiz not started');
      return;
    }

    return this._questions[this._currentQuestionIndex];
  }

  // Get the result of running quiz
  result() {
    if (!this._startTime) {
      alert('Quiz not started.');
      return;
    }

    let skipped = 0;
    let correct = 0;
    this._questions.map((q) => {
      if (q.result) correct++;
      else if (q.skip) skipped++;
    });

    let score = (100 * correct) / this._questions.length;

    return {
      questionsCount: this._questions.length,
      skipped,
      correct,
      score,
      timeOver: this[TIME_OVER_SYM],
      finished: this.isOnLastQuestion() || this[TIME_OVER_SYM] || this._endTime,
    };
  }

  // Reset the running quiz status and make it ready to start again
  reset() {
    if (this._startTime && !this._endTime) {
      alert('Can not reset the running quiz.');
      return;
    }

    this._startTime = null;
    this._endTime = null;
    this._remainingTime = this._time;
    this._currentQuestionIndex = 0;
    this[TIME_OVER_SYM] = false;
    clearInterval(this[TIMER_INTERVAL_SYM]);
  }

  prepareQuestions() {
    this._questions = this._questions
      .sort(() => 0.5 - Math.random())
      .slice(0, this._questionsCount)
      .map((q) => ({
        answerId: q.answerId,
        question: q.question,
        options: q.options,
      }));
  }

  // Answer the head question of the running quiz with a selected option
  answerCurrentQuestion(option) {
    if (!this._startTime) {
      alert('Start the quiz first');
      return;
    }

    let response = {
      timeOver: this[TIME_OVER_SYM],
      finished: this.isOnLastQuestion() || this._endTime || this[TIME_OVER_SYM],
    };

    if (!this[TIME_OVER_SYM]) {
      const currentQ = this.currentQuestion;
      if (currentQ.skip !== void 0) {
        alert('You already skipped this question');
        return;
      }
      if (currentQ.answer !== void 0) {
        alert('You already answered this question');
        return;
      }
      currentQ.answer = option;
      const answerResult = checkAnswerValidity(currentQ.answerId, option);
      currentQ.result = answerResult;
      response.answerResult = answerResult;

      if (!response.finished) {
        const nextQ = askNextQuestion.call(this);
        if (nextQ) {
          response.nextQ = nextQ;
        }
      }
    }

    if (response.finished) {
      response.result = this.result();
      this.stop();
    }

    return response;
  }

  // Skip the head question and pick next question if exist
  skipCurrentQuestion() {
    if (!this._startTime) {
      alert('Start the quiz first');
      return;
    }

    let response = {
      timeOver: this[TIME_OVER_SYM],
      finished: this.isOnLastQuestion() || this._endTime || this[TIME_OVER_SYM],
    };

    if (!this[TIME_OVER_SYM]) {
      const currentQ = this.currentQuestion;
      if (currentQ.skip !== void 0) {
        alert('You already skipped this question');
        return;
      }
      if (currentQ.answer !== void 0) {
        alert('You already answered this question');
        return;
      }
      currentQ.skip = true;

      if (!response.finished) {
        const nextQ = askNextQuestion.call(this);
        if (nextQ) {
          response.nextQ = nextQ;
        }
      }
    }

    if (response.finished) {
      response.result = this.result();
      this.stop();
    }

    return response;
  }

  // Check if the head question is the last question of running quiz
  isOnLastQuestion() {
    return this._currentQuestionIndex + 1 >= this._questions.length;
  }

  secToTimeStr(seconds) {
    let timeInHour = Math.floor(seconds / 3600);
    let timeInMin = Math.floor((seconds % 3600) / 60);
    let timeInSec = Math.floor(seconds % 60);

    if (timeInHour < 10) timeInHour = `0${timeInHour}`;

    if (timeInMin < 10) timeInMin = `0${timeInMin}`;

    if (timeInSec < 10) timeInSec = `0${timeInSec}`;

    let timeStr = `${timeInMin}:${timeInSec}`;
    if (parseInt(timeInHour)) timeStr = `${timeInHour}:${timeStr}`;

    return timeStr;
  }

  // Get the details of the timing of the quiz
  get timeDetails() {
    let now = new Date().getTime();
    return {
      quizTime: this._time,
      start: this._startTime,
      end: this._endTime,
      elapsedTime: ((this._endTime || now) - this._startTime) / 1000, // ms to sec
      remainingTime: this.secToTimeStr(this._remainingTime),
      timeOver: this[TIME_OVER_SYM],
    };
  }

  // Control the ticker of the time of the running quiz
  _setTicker() {
    if (!this._startTime) {
      alert('Quiz not started yet.');
      return;
    }

    if (this[TIMER_INTERVAL_SYM]) {
      alert('The ticker has been set before');
      return;
    }

    let privateRemainingTimeInSec = this._time;
    this[TIME_OVER_SYM] = false;
    this[TIMER_INTERVAL_SYM] = setInterval(() => {
      --privateRemainingTimeInSec;
      this._remainingTime = privateRemainingTimeInSec;
      if (privateRemainingTimeInSec <= 0) {
        this[TIME_OVER_SYM] = true;
        this.stop();
      }
    }, 1000);
  }
}

// Private function to ask next question
function askNextQuestion() {
  if (!this._startTime) {
    alert('Quiz not started');
    return;
  }

  const currentQ = this.currentQuestion;
  if (currentQ.answer === void 0 && currentQ.skip === void 0) {
    alert('Current question answered or skipped.');
    return;
  }

  if (this.isOnLastQuestion()) {
    alert('No more question.');
    return;
  }

  return this._questions[++this._currentQuestionIndex];
}

// Check the validity of the selected option
function checkAnswerValidity(questionID, option) {
  return parseInt(questionID) === parseInt(option);
}
