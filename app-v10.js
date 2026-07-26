// Gated 20-question final exam with three attempts and a 70% passing score.
const examQuestions = [
  {
    type: 'single',
    prompt: 'A recognized agent submits an issuer-approved order for $780, but the customer authorized purchases only up to $300. What should the merchant do?',
    options: [
      'Request fresh customer approval that is bound to the higher transaction amount.',
      'Complete the order because the agent identity and payment approval are valid.',
      'Permanently block the agent because the requested amount exceeded the limit.'
    ],
    correct: 0
  },
  {
    type: 'truefalse',
    prompt: 'A familiar user-agent name is sufficient evidence that an automated request came from a legitimate AI agent.',
    options: ['True', 'False'],
    correct: 1
  },
  {
    type: 'single',
    prompt: 'Which verification approach best establishes that a signed agent request is valid for the current transaction?',
    options: [
      'Verify the signature only, then accept each request associated with the same signing key.',
      'Verify signature coverage, freshness, replay identifiers, audience, and current signing-key status.',
      'Verify the browser header, payment response, traffic volume, and previous purchase frequency.'
    ],
    correct: 1
  },
  {
    type: 'single',
    prompt: 'An identical signed request arrives twice with the same timestamp, nonce, cart identifier, and payment reference. What is the best response?',
    options: [
      'Accept both requests because the signature verifies against an active signing key.',
      'Disable the agent identity and cancel every transaction submitted during the day.',
      'Reject the duplicate as a replay and retain both request records as evidence.'
    ],
    correct: 2
  },
  {
    type: 'single',
    prompt: 'Which delegated authority record gives a merchant the clearest basis for enforcing a customer’s instructions?',
    options: [
      'A broad request allowing the agent to make reasonable purchases when needed.',
      'A structured grant defining actions, limits, validity, exceptions, and revocation.',
      'A payment approval showing that the customer’s funding source remains available.'
    ],
    correct: 1
  },
  {
    type: 'multi',
    prompt: 'Which transaction details can be used to define the scope of an agent’s delegated authority? Select three.',
    options: [
      'The permitted merchant or clearly defined merchant group.',
      'The maximum amount including applicable taxes and fees.',
      'The validity period and customer confirmation requirements.',
      'The agent’s preferred interface color and display layout.',
      'The merchant’s internal staffing schedule for manual reviews.'
    ],
    correct: [0, 1, 2]
  },
  {
    type: 'truefalse',
    prompt: 'A product substitution is automatically authorized whenever its total price remains below the customer’s spending limit.',
    options: ['True', 'False'],
    correct: 1
  },
  {
    type: 'single',
    prompt: 'An agent order fits the approved category and amount, but it adds a delivery address that was not included in the mandate. What should happen next?',
    options: [
      'Complete the order because the category and transaction amount remain within scope.',
      'Cancel all standing authority because every new delivery address indicates compromise.',
      'Require customer step-up that confirms the new address and final order details.'
    ],
    correct: 2
  },
  {
    type: 'single',
    prompt: 'Which information should a transaction-bound step-up approval display to the customer?',
    options: [
      'The merchant and estimated amount without the changed delivery or payment information.',
      'The merchant’s fraud thresholds and the agent provider’s internal software architecture.',
      'The merchant, final cart, amount, payment source, destination, and approval exception.'
    ],
    correct: 2
  },
  {
    type: 'truefalse',
    prompt: 'Passkeys can strengthen customer authentication by using phishing-resistant credentials bound to the legitimate relying party.',
    options: ['True', 'False'],
    correct: 0
  },
  {
    type: 'single',
    prompt: 'Which payment token design best follows least privilege for one authorized purchase?',
    options: [
      'A reusable token accepted by every merchant operating in the same category.',
      'A merchant-bound token limited by amount, use count, and authorization window.',
      'A permanent vault reference that can fund any cart the agent creates later.'
    ],
    correct: 1
  },
  {
    type: 'multi',
    prompt: 'Which operations should be addressed when designing a payment token lifecycle? Select three.',
    options: [
      'Delayed capture, retry, and split-shipment processing.',
      'Reversal, refund, return, and cancellation processing.',
      'Expiration, renewal, and underlying account updates.',
      'Customer advertising preferences across unrelated channels.',
      'Employee scheduling for the merchant’s support organization.'
    ],
    correct: [0, 1, 2]
  },
  {
    type: 'truefalse',
    prompt: 'A valid payment token proves that the agent’s final cart matches the customer’s approved intent and scope.',
    options: ['True', 'False'],
    correct: 1
  },
  {
    type: 'single',
    prompt: 'Which mandate should capture the final items, fees, delivery terms, and selected merchant?',
    options: [
      'The intent mandate describing the customer’s desired outcome and general boundaries.',
      'The cart mandate describing the specific transaction terms selected for purchase.',
      'The payment mandate describing the approved funding source and transaction recipient.'
    ],
    correct: 1
  },
  {
    type: 'multi',
    prompt: 'Which elements make a consent record useful as verifiable authorization evidence? Select three.',
    options: [
      'The customer authentication context and authorized agent identity.',
      'The permitted scope, validity period, and applicable conditions.',
      'The mandate version, status, expiry, and revocation information.',
      'A copy of every unrelated customer interaction with the merchant.',
      'An unlimited retention period without access or deletion controls.'
    ],
    correct: [0, 1, 2]
  },
  {
    type: 'single',
    prompt: 'A verified revocation arrives after payment authorization but before capture and shipment. What should the merchant do?',
    options: [
      'Continue fulfillment because the mandate was valid when the order was first submitted.',
      'Stop fulfillment, void the authorization when feasible, and record the revocation.',
      'Ship the order and prevent the agent from creating additional purchases afterward.'
    ],
    correct: 1
  },
  {
    type: 'truefalse',
    prompt: 'When a newer mandate supersedes an older mandate, the merchant should evaluate the transaction against the current version.',
    options: ['True', 'False'],
    correct: 0
  },
  {
    type: 'single',
    prompt: 'Which evidence set best supports investigation of an agent-initiated transaction?',
    options: [
      'Linked agent verification, consent, cart, payment, decision, and fulfillment records.',
      'Unrelated customer browsing histories, private keys, payment secrets, and support notes.',
      'The final approve or decline outcome without the verified inputs or decision reasoning.'
    ],
    correct: 0
  },
  {
    type: 'single',
    prompt: 'A disputed order has a recognized agent and valid token, but customer authentication and later cart changes cannot be verified. What is the best next step?',
    options: [
      'Defend the transaction because the agent identity and payment token remain valid.',
      'Preserve the evidence and verify the missing consent and cart-change information.',
      'Accept every future dispute involving the agent without reviewing available evidence.'
    ],
    correct: 1
  },
  {
    type: 'single',
    prompt: 'A merchant temporarily cannot retrieve current agent key status from its trusted directory. Which response best supports a risk-based operating model?',
    options: [
      'Accept every signed request until the directory becomes available again.',
      'Use defined cache and outage rules, applying stronger controls to higher-risk actions.',
      'Permanently reject the agent and delete the previous verification records.'
    ],
    correct: 1
  }
];

const EXAM_PASS_SCORE = 70;
const EXAM_MAX_ATTEMPTS = 3;

state.examActive = Boolean(state.examActive);
state.examView = state.examView || 'instructions';
state.examQuestion = Number.isInteger(state.examQuestion) ? state.examQuestion : 0;
state.examAnswers = state.examAnswers || {};
state.examAttempts = Number.isInteger(state.examAttempts) ? state.examAttempts : 0;
state.examPassed = Boolean(state.examPassed);
state.examBestScore = Number.isFinite(state.examBestScore) ? state.examBestScore : 0;
state.examLastScore = Number.isFinite(state.examLastScore) ? state.examLastScore : 0;
state.examExhausted = Boolean(state.examExhausted);

const saveBeforeExam = save;
save = function saveWithExamTracking() {
  const data = JSON.stringify(state);
  localStorage.setItem('fraud-101-v1', data);
  if (window.SCORM && SCORM.active()) {
    SCORM.set('cmi.suspend_data', data);
    SCORM.set('cmi.core.lesson_location', state.examActive ? `exam-${state.examQuestion + 1}` : String(state.lesson));
    SCORM.set('cmi.core.score.min', '0');
    SCORM.set('cmi.core.score.max', '100');
    SCORM.set('cmi.core.score.raw', String(state.examBestScore || 0));
    SCORM.set('cmi.core.lesson_status', state.examPassed ? 'passed' : (state.examExhausted ? 'failed' : 'incomplete'));
    SCORM.save();
  }
};

function examAnswerComplete(questionIndex) {
  const question = examQuestions[questionIndex];
  const answer = state.examAnswers[questionIndex];
  return question.type === 'multi'
    ? Array.isArray(answer) && answer.length > 0
    : Number.isInteger(answer);
}

function examAnswerCorrect(question, answer) {
  if (question.type === 'multi') {
    if (!Array.isArray(answer) || answer.length !== question.correct.length) return false;
    const selected = [...answer].sort((a, b) => a - b);
    const correct = [...question.correct].sort((a, b) => a - b);
    return selected.every((value, index) => value === correct[index]);
  }
  return answer === question.correct;
}

function renderExamNav() {
  els.nav.innerHTML = lessons.map((lesson, index) => `
    <button class="lesson-link complete" disabled>
      <span class="lesson-num">✓</span>
      <span class="lesson-copy">${esc(lesson.title)}</span>
      <span class="lock"></span>
    </button>
  `).join('') + `
    <button class="lesson-link active exam-nav-item" disabled aria-current="page">
      <span class="lesson-num">${state.examPassed ? '✓' : 'E'}</span>
      <span class="lesson-copy">Final Exam</span>
      <span class="lock"></span>
    </button>
  `;
}

function updateExamChrome() {
  $('.progress-copy span').textContent = 'Exam progress';
  renderExamNav();
  els.status.textContent = state.examPassed ? 'Passed' : `Attempt ${Math.max(1, state.examAttempts)} of ${EXAM_MAX_ATTEMPTS}`;
  if (state.examView === 'question') {
    const progress = Math.round(((state.examQuestion + 1) / examQuestions.length) * 100);
    els.bar.style.width = progress + '%';
    els.pct.textContent = progress + '%';
    els.indicator.textContent = `Question ${state.examQuestion + 1} of ${examQuestions.length}`;
  } else if (state.examView === 'results') {
    els.bar.style.width = '100%';
    els.pct.textContent = '100%';
    els.indicator.textContent = 'Exam Results';
  } else {
    els.bar.style.width = '0%';
    els.pct.textContent = '0%';
    els.indicator.textContent = 'Final Exam';
  }
}

function renderExamInstructions() {
  els.kicker.textContent = 'Final Exam';
  els.title.textContent = 'Course Final Exam';
  els.main.innerHTML = `
    <section class="screen-panel exam-instructions">
      <span class="screen-eyebrow">Final Exam</span>
      <h3>Demonstrate Your Course Readiness</h3>
      <p class="section-lead">The final exam contains 20 questions based on the concepts and merchant decisions covered throughout the course.</p>
      <div class="exam-rule-grid">
        <article><strong>20</strong><span>Questions</span></article>
        <article><strong>70%</strong><span>Passing score</span></article>
        <article><strong>3</strong><span>Maximum attempts</span></article>
      </div>
      <div class="exam-guidance">
        <h4>Before You Begin</h4>
        <ul>
          <li>Questions include single choice, multiple choice, and true or false.</li>
          <li>Multiple-choice questions identify how many responses to select.</li>
          <li>You may move backward and review answers before submitting the exam.</li>
          <li>Your attempt is scored after you submit Question 20.</li>
        </ul>
      </div>
      <button id="beginExamBtn" class="primary-btn">Begin Attempt ${state.examAttempts + 1} →</button>
    </section>
  `;
  els.back.hidden = true;
  els.next.hidden = true;
  $('#beginExamBtn').onclick = beginExamAttempt;
  updateExamChrome();
  els.main.focus();
  window.scrollTo(0, 0);
}

function beginExamAttempt() {
  if (state.examAttempts >= EXAM_MAX_ATTEMPTS) {
    state.examExhausted = true;
    state.examView = 'results';
    renderExamResults();
    save();
    return;
  }
  play('click');
  state.examAttempts += 1;
  state.examQuestion = 0;
  state.examAnswers = {};
  state.examView = 'question';
  renderExamQuestion();
  save();
}

function renderExamQuestion() {
  const question = examQuestions[state.examQuestion];
  els.kicker.textContent = `Final Exam · Question ${state.examQuestion + 1} of ${examQuestions.length}`;
  els.title.textContent = 'Course Final Exam';
  const selected = state.examAnswers[state.examQuestion];
  const isMulti = question.type === 'multi';
  const instruction = isMulti ? 'Select all applicable responses.' : 'Select the best response.';
  els.main.innerHTML = `
    <section class="screen-panel exam-question-screen">
      <div class="exam-question-meta">
        <span>Attempt ${state.examAttempts} of ${EXAM_MAX_ATTEMPTS}</span>
        <span>${question.type === 'truefalse' ? 'True or False' : (isMulti ? 'Multiple Choice' : 'Single Choice')}</span>
      </div>
      <h3>${esc(question.prompt)}</h3>
      <p class="exam-instruction">${instruction}</p>
      <div class="exam-options" role="${isMulti ? 'group' : 'radiogroup'}" aria-label="Answer choices">
        ${question.options.map((option, index) => {
          const checked = isMulti ? Array.isArray(selected) && selected.includes(index) : selected === index;
          return `<label class="exam-option ${checked ? 'selected' : ''}">
            <input type="${isMulti ? 'checkbox' : 'radio'}" name="exam-answer" value="${index}" ${checked ? 'checked' : ''}>
            <span class="exam-option-marker">${isMulti ? (checked ? '✓' : '') : String.fromCharCode(65 + index)}</span>
            <span class="exam-option-copy">${esc(option)}</span>
          </label>`;
        }).join('')}
      </div>
      <p class="exam-answer-note" role="status">${examAnswerComplete(state.examQuestion) ? 'Answer recorded. You may continue.' : 'Select an answer to continue.'}</p>
    </section>
  `;
  els.back.hidden = false;
  els.next.hidden = false;
  els.back.disabled = state.examQuestion === 0;
  els.next.disabled = !examAnswerComplete(state.examQuestion);
  els.next.textContent = state.examQuestion === examQuestions.length - 1 ? 'Submit Exam →' : 'Next Question →';

  $$('.exam-option input').forEach(input => {
    input.onchange = () => {
      play('click');
      const value = +input.value;
      if (isMulti) {
        const answers = Array.isArray(state.examAnswers[state.examQuestion]) ? [...state.examAnswers[state.examQuestion]] : [];
        state.examAnswers[state.examQuestion] = input.checked
          ? [...new Set([...answers, value])].sort((a, b) => a - b)
          : answers.filter(answer => answer !== value);
      } else {
        state.examAnswers[state.examQuestion] = value;
      }
      save();
      renderExamQuestion();
    };
  });
  updateExamChrome();
  els.main.focus();
  window.scrollTo(0, 0);
}

function submitExam() {
  const correct = examQuestions.reduce((total, question, index) => (
    total + (examAnswerCorrect(question, state.examAnswers[index]) ? 1 : 0)
  ), 0);
  const score = Math.round((correct / examQuestions.length) * 100);
  const attemptPassed = score >= EXAM_PASS_SCORE;
  state.examLastScore = score;
  state.examBestScore = Math.max(state.examBestScore, score);
  state.examPassed = state.examPassed || attemptPassed;
  state.examExhausted = !state.examPassed && state.examAttempts >= EXAM_MAX_ATTEMPTS;
  state.examView = 'results';
  renderExamResults();
  save();
}

function renderExamResults() {
  const attemptPassed = state.examLastScore >= EXAM_PASS_SCORE;
  const attemptsRemain = state.examAttempts < EXAM_MAX_ATTEMPTS;
  const priorPassRetained = state.examPassed && !attemptPassed;
  els.kicker.textContent = 'Final Exam · Results';
  els.title.textContent = 'Course Final Exam';
  els.main.innerHTML = `
    <section class="screen-panel exam-results ${attemptPassed ? 'passed' : 'not-passed'}">
      <div class="exam-result-mark">${attemptPassed ? '✓' : state.examLastScore + '%'}</div>
      <span class="screen-eyebrow">Final Exam Results</span>
      <h3>${attemptPassed ? 'Congratulations, You Passed' : (priorPassRetained ? 'Your Earlier Passing Result Is Retained' : (attemptsRemain ? 'Another Attempt Is Available' : 'Maximum Attempts Reached'))}</h3>
      <p class="exam-score-line">Your score: <strong>${state.examLastScore}%</strong> · Passing score: <strong>${EXAM_PASS_SCORE}%</strong></p>
      <p>${attemptPassed
        ? 'You have successfully completed the course and final exam.'
        : (priorPassRetained
          ? 'This retake did not reach 70%, but your earlier passing result remains recorded.'
          : (attemptsRemain
          ? `Review the course concepts and try again. You have ${EXAM_MAX_ATTEMPTS - state.examAttempts} attempt${EXAM_MAX_ATTEMPTS - state.examAttempts === 1 ? '' : 's'} remaining.`
          : 'You have used all three exam attempts. Your final result has been recorded.'))}</p>
      <div class="exam-result-actions">
        ${attemptsRemain ? `<button id="retakeExamBtn" class="secondary-btn">${attemptPassed || priorPassRetained ? 'Retake Exam' : 'Retry Final Exam →'}</button>` : ''}
        <button id="backToLessonBtn" class="secondary-btn">Back to Lesson</button>
        ${state.examPassed || state.examExhausted ? '<button id="finalExitBtn" class="primary-btn">Exit Course</button>' : ''}
      </div>
    </section>
  `;
  els.back.hidden = true;
  els.next.hidden = true;
  const retake = $('#retakeExamBtn');
  if (retake) retake.onclick = () => {
    play('click');
    state.examView = 'instructions';
    renderExamInstructions();
    save();
  };
  const backToLesson = $('#backToLessonBtn');
  if (backToLesson) backToLesson.onclick = returnToReviewLesson;
  const exit = $('#finalExitBtn');
  if (exit) exit.onclick = exitCourseAfterExam;
  updateExamChrome();
  els.main.focus();
  window.scrollTo(0, 0);
}

function returnToReviewLesson() {
  play('click');
  state.examActive = false;
  state.onOverview = false;
  state.lesson = 6;
  state.screen = 0;
  renderV4();
  save();
}

function resetCourseAfterCompletedExam() {
  state.examActive = false;
  state.onOverview = false;
  state.overviewSeen = false;
  state.lesson = 0;
  state.screen = 0;
}

function renderExam() {
  stopScenarioAudio();
  state.onOverview = false;
  state.examActive = true;
  if (state.examView === 'results') renderExamResults();
  else if (state.examView === 'question' && state.examAttempts > 0) renderExamQuestion();
  else renderExamInstructions();
}

function startFinalExam() {
  play('click');
  state.examActive = true;
  state.examView = state.examPassed || state.examExhausted ? 'results' : 'instructions';
  renderExam();
  save();
}

function exitCourseAfterExam() {
  play('click');
  save();
  if (window.SCORM && SCORM.active()) SCORM.finish();
  toast('Course result recorded. You may close this window.');
  setTimeout(() => {
    try { window.close(); } catch (error) {}
  }, 400);
}

const renderV4BeforeExam = renderV4;
renderV4 = function renderV10() {
  renderV4BeforeExam();
  $('.progress-copy span').textContent = 'Course progress';
  if (state.lesson === 6 && state.screen === 3 && !state.examActive) {
    const completion = $('.completion-screen');
    const button = $('#exitBtn');
    if (completion) {
      const paragraph = completion.querySelector('p');
      if (paragraph) paragraph.textContent = 'You have reviewed the course key learnings and resources. Continue to the final exam to complete the course.';
    }
    if (button) {
      button.textContent = 'Start Final Exam →';
      button.onclick = startFinalExam;
    }
  }
};

const startBeforeExam = $('#startBtn').onclick;
$('#startBtn').onclick = () => {
  if (state.examPassed || state.examExhausted) {
    resetCourseAfterCompletedExam();
    save();
    startBeforeExam();
    return;
  }
  if (state.examActive) {
    state.started = true;
    els.start.classList.add('hidden');
    els.shell.classList.remove('hidden');
    play('menu');
    renderExam();
    save();
    return;
  }
  startBeforeExam();
};

const backBeforeExam = els.back.onclick;
els.back.onclick = () => {
  if (!state.examActive) {
    backBeforeExam();
    return;
  }
  if (state.examView === 'question' && state.examQuestion > 0) {
    play('click');
    state.examQuestion -= 1;
    renderExamQuestion();
    save();
  }
};

const nextBeforeExam = els.next.onclick;
els.next.onclick = () => {
  if (!state.examActive) {
    nextBeforeExam();
    return;
  }
  if (state.examView !== 'question' || !examAnswerComplete(state.examQuestion)) return;
  play('click');
  if (state.examQuestion < examQuestions.length - 1) {
    state.examQuestion += 1;
    renderExamQuestion();
    save();
  } else {
    submitExam();
  }
};

const homeBeforeExam = $('#homeBtn').onclick;
$('#homeBtn').onclick = () => {
  if (state.examPassed || state.examExhausted) {
    play('click');
    resetCourseAfterCompletedExam();
    save();
    els.shell.classList.add('hidden');
    els.start.classList.remove('hidden');
    return;
  }
  if (state.examActive) {
    play('click');
    save();
    els.shell.classList.add('hidden');
    els.start.classList.remove('hidden');
    return;
  }
  homeBeforeExam();
};

save();
