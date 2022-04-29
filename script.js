'use strict';

const library = {
  eyeOpening: [
    {
      desc: 'eyes open spontaneously',
      equivalents: [
        'patient opens his/her eyes spontaneously',
        'when we approach the patient his/her eyes are already open',
      ],
      score: 4,
    },
    {
      desc: 'eye-opening to sound',
      equivalents: ['patient opens his/her eyes when he/she hears us'],
      score: 3,
    },
    {
      desc: 'eye-opening to pain',
      equivalents: ['patient only opens his/her eyes to pain'],
      score: 2,
    },
    {
      desc: 'no eye-opening',
      equivalents: [
        'patient does not open his/her eyes even when pain is applied',
      ],
      score: 1,
    },
  ],
  bestVerbalResponse: [
    {
      desc: 'oriented',
      equivalents: [
        "patient responds coherently and appropriately to questions such as the person's name and age, where they are and why, the year, month, etc.",
      ],
      score: 5,
    },
    {
      desc: 'confused',
      equivalents: [
        'the patient responds to questions coherently but there is some disorientation and confusion',
      ],
      score: 4,
    },
    {
      desc: 'inappropriate words',
      equivalents: [
        'the patient has random or exclamatory articulated speech, but no conversational exchange',
      ],
      score: 3,
    },
    {
      desc: 'incomprehensible sounds',
      equivalents: ['patient does not say any words and only moans'],
      score: 2,
    },
    {
      desc: 'no verbal response',
      equivalents: [
        'there is no verbal response but moans when pain is applied',
        'patient does not speak at all when spoken to',
      ],
      score: 1,
    },
  ],
  bestMotorResponse: [
    {
      desc: 'obeys commands',
      equivalents: [
        'when we ask the patient to raise his/her arms he/she does it without any problem',
      ],
      score: 6,
    },
    {
      desc: 'localizing response to pain',
      equivalents: [
        'patient does not obey commands and only has movements towards painful stimuli',
      ],
      score: 5,
    },
    {
      desc: 'withdrawal response to pain',
      equivalents: [
        'patient does not obey commands and has withdrawal response to painful stimuli',
      ],
      score: 4,
    },
    {
      desc: 'abnormal flexion to pain',
      equivalents: [
        'patient does not obey commands and has abnormal flexion when pain is applied',
      ],
      score: 3,
    },
    {
      desc: 'abnormal extension to pain',
      equivalents: [
        'patient does not obey commands and has abnormal extension when pain is applied',
      ],
      score: 2,
    },
    {
      desc: 'no motor response to pain',
      equivalents: ['patient does not move at all even when pain is applied'],
      score: 1,
    },
  ],
};

const Labelquestion = document.querySelector('.question');
const inputAnswer = document.querySelector('.answer');
const btnSubmitAnswer = document.querySelector('.submit-answer');

const random = (min, max) => {
  return Math.trunc(Math.random() * (max - min + 1) + min);
};

const strFixer = function (str) {
  const strUppercase = str.replace(str[0], str[0].toUpperCase());
  if (!str.endsWith('.')) return `${strUppercase}.`;
  else return strUppercase;
};

const shuffleArray = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const eyePart = function () {
  const scoreCategory = random(0, 3);
  const selectedCategory = library.eyeOpening[scoreCategory];
  const questionIndex = random(0, selectedCategory.equivalents.length - 1);
  const eyePart = selectedCategory.equivalents[questionIndex];
  const score = selectedCategory.score;
  return [strFixer(eyePart), score];
};

const verbalPart = function () {
  const scoreCategory = random(0, 4);
  const selectedCategory = library.bestVerbalResponse[scoreCategory];
  const questionIndex = random(0, selectedCategory.equivalents.length - 1);
  const verbalPart = selectedCategory.equivalents[questionIndex];
  const score = selectedCategory.score;
  return [strFixer(verbalPart), score];
};

const motorPart = function () {
  const scoreCategory = random(0, 5);
  const selectedCategory = library.bestMotorResponse[scoreCategory];
  const questionIndex = random(0, selectedCategory.equivalents.length - 1);
  const motorPart = selectedCategory.equivalents[questionIndex];
  const score = selectedCategory.score;
  return [strFixer(motorPart), score];
};

let score;

const questionGenerator = function () {
  const [[eq, es], [vq, vs], [mq, ms]] = [eyePart(), verbalPart(), motorPart()];
  const question = [eq, vq, mq];
  score = es + vs + ms;
  const randomizedQuestion = shuffleArray(question.slice());
  Labelquestion.textContent = randomizedQuestion.join(' ');
  console.log(score);
};
questionGenerator();

btnSubmitAnswer.addEventListener('click', function (e) {
  e.preventDefault();
  if (+inputAnswer.value === score) {
    window.alert('Right Answer ✅');
    inputAnswer.value = '';
    questionGenerator();
  } else if (3 > +inputAnswer.value || +inputAnswer.value > 15) {
    window.alert(`
    GCS score can only be a number from 3 to 15.
    Try again
    `);
    inputAnswer.value = '';
  } else {
    window.alert(`
    Wrong Answer ⛔
    The Right Answer is ${score}
    
  `);
    inputAnswer.value = '';
    questionGenerator();
  }
});
