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
const btnModalClose = document.querySelector('.modal__close');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const modalSection1 = document.querySelector('.modal__section-1');
const modalSection2 = document.querySelector('.modal__section-2');
const modalHeading = document.querySelector('.modal__heading');
// const btnModalClose2 = document.querySelector('.modal__btn-close');
const body = document.body;
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
let segments;

const questionGenerator = function () {
  const [[eq, es], [vq, vs], [mq, ms]] = [eyePart(), verbalPart(), motorPart()];
  segments = [
    [eq, es],
    [vq, vs],
    [mq, ms],
  ];
  const question = [eq, vq, mq];
  score = es + vs + ms;
  const randomizedQuestion = shuffleArray(question.slice());
  Labelquestion.textContent = randomizedQuestion.join(' ');
  console.log(score);
  console.log(segments);
};
questionGenerator();

btnSubmitAnswer.addEventListener('click', function (e) {
  e.preventDefault();
  if (inputAnswer.value === '') {
    window.alert('Enter GCS Score');
  } else if (3 > +inputAnswer.value || +inputAnswer.value > 15) {
    window.alert('GCS score can only be a number from 3 to 15');
  } else {
    const answerType =
      +inputAnswer.value === score ? 'Correct ????' : 'Try Again ????';
    inputAnswer.value = '';
    inputAnswer.blur();
    const [[eq, es], [vq, vs], [mq, ms]] = segments;
    modalHeading.textContent = answerType;
    modalSection1.innerHTML = `
  <div>
    <label class='modal__text-label'>Eye Opening</label>
    <p class='modal__text'>${eq}&nbsp;&rarr;&nbsp;${es}</p>
    <label class='modal__text-label'>Best Verbal Response</label>
    <p class='modal__text'>${vq}&nbsp;&rarr;&nbsp;${vs}</p>
    <label class='modal__text-label'>Best Motor Response</label>
    <p class='modal__text'>${mq}&nbsp;&rarr;&nbsp;${ms}</p>
  </div>
  `;

    modalSection2.innerHTML = `
  <div>
    <h2 class='section__2__heading'>GCS Score&nbsp;=&nbsp;${score}</h2>
    <p class='modal__answer-exp'>
    <span class="span__title1">Categorization:</span>
    <br><br>
    <span class="span__title2">Coma:</span> No eye opening, no ability to follow commands, no word verbalizations&nbsp;<span class="nowrap">(3-8)</span>
    <br><br>
    <span class="span__title2">Head Injury Classification:</span>
    <br>
    <span class="span__title3">Severe Head Injury:</span> GCS score of&nbsp;8&nbsp;or&nbsp;less<br>
    <span class="span__title3">Moderate Head Injury:</span> GCS score of&nbsp;9&nbsp;to&nbsp;12<br>
    <span class="span__title3">Mild Head Injury:</span> GCS score of&nbsp;13&nbsp;to&nbsp;15
    </p>
  </div>

  `;
    overlay.style.zIndex = '5';
    modal.style.zIndex = '10';
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    overlay.style.height = getComputedStyle(body).height;
    modal.style.top =
      parseFloat(getComputedStyle(body).height) / 2 + window.scrollY + 'px';
    // btnModalClose2.style.width = getComputedStyle(modal).width;
  }
});

overlay.addEventListener('click', function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  overlay.style.zIndex = '-1';
  modal.style.zIndex = '-1';
  inputAnswer.value = '';
  modalSection1.innerHTML = '';
  questionGenerator();
});

btnModalClose.addEventListener('click', function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  overlay.style.zIndex = '-1';
  modal.style.zIndex = '-1';
  inputAnswer.value = '';
  modalSection1.innerHTML = '';
  questionGenerator();
});

// btnModalClose2.addEventListener('click', function () {
//   modal.classList.add('hidden');
//   overlay.classList.add('hidden');
//   inputAnswer.value = '';
//   modalSection1.innerHTML = '';
//   questionGenerator();
// });

// Fixing Keyboadr Layout Change In Andoid:

// Global boolean variable that holds the current orientation
var pageInPortraitMode;

// Listen for window resizes to detect orientation changes
window.addEventListener('resize', windowSizeChanged);

// Set the global orientation variable as soon as the page loads
addEventListener('load', function () {
  pageInPortraitMode = window.innerHeight > window.innerWidth;
  document
    .getElementById('viewport')
    .setAttribute(
      'content',
      'width=' +
        window.innerWidth +
        ', height=' +
        window.innerHeight +
        ', initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
    );
});

// Adjust viewport values only if orientation has changed (not on every window resize)
function windowSizeChanged() {
  if (
    (pageInPortraitMode === true && window.innerHeight < window.innerWidth) ||
    (pageInPortraitMode === false && window.innerHeight > window.innerWidth)
  ) {
    pageInPortraitMode = window.innerHeight > window.innerWidth;
    document
      .getElementById('viewport')
      .setAttribute(
        'content',
        'width=' +
          window.innerWidth +
          ', height=' +
          window.innerHeight +
          ', initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
      );
  }
}
