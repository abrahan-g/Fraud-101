// Add sequenced scenario and response audio for Lessons 2 through 7.
const additionalScenarioAudio = {
  1: {
    intro: 'assets/lesson-2-scenario-intro.mp3',
    question: 'assets/lesson-2-scenario-question.mp3',
    correct: 'assets/lesson-2-scenario-correct.mp3',
    incorrect: 'assets/lesson-2-scenario-incorrect.mp3'
  },
  2: {
    intro: 'assets/lesson-3-scenario-intro.mp3',
    question: 'assets/lesson-3-scenario-question.mp3',
    correct: 'assets/lesson-3-scenario-correct.mp3',
    incorrect: 'assets/lesson-3-scenario-incorrect.mp3'
  },
  3: {
    intro: 'assets/lesson-4-scenario-intro.mp3',
    question: 'assets/lesson-4-scenario-question.mp3',
    correct: 'assets/lesson-4-scenario-correct.mp3',
    incorrect: 'assets/lesson-4-scenario-incorrect.mp3'
  },
  4: {
    intro: 'assets/lesson-5-scenario-intro.mp3',
    question: 'assets/lesson-5-scenario-question.mp3',
    correct: 'assets/lesson-5-scenario-correct.mp3',
    incorrect: 'assets/lesson-5-scenario-incorrect.mp3'
  },
  5: {
    intro: 'assets/lesson-6-scenario-intro.mp3',
    question: 'assets/lesson-6-scenario-question.mp3',
    correct: 'assets/lesson-6-scenario-correct.mp3',
    incorrect: 'assets/lesson-6-scenario-incorrect.mp3'
  },
  6: {
    intro: 'assets/lesson-7-scenario-intro.mp3',
    question: 'assets/lesson-7-scenario-question.mp3',
    correct: 'assets/lesson-7-scenario-correct.mp3',
    incorrect: 'assets/lesson-7-scenario-incorrect.mp3'
  }
};

function startAdditionalScenarioAudio(lessonIndex) {
  if (state.muted) {
    toast('Turn sound on to hear the scenario audio.');
    return;
  }
  if (activeScenarioAudio) {
    stopScenarioAudio();
    return;
  }

  const clips = additionalScenarioAudio[lessonIndex];
  const button = $('#playScenarioAudioBtn');
  const sequence = ++scenarioAudioSequence;
  button.textContent = '■ Stop Scenario Audio';
  button.setAttribute('aria-pressed', 'true');

  playScenarioClip(clips.intro, () => {
    if (sequence !== scenarioAudioSequence || state.lesson !== lessonIndex || state.screen !== 6) return;
    playScenarioClip(clips.question, () => {
      if (sequence === scenarioAudioSequence) stopScenarioAudio();
    });
  });
}

function playAdditionalScenarioResponse(lessonIndex, isCorrect) {
  stopScenarioAudio();
  if (state.muted) return;
  const clips = additionalScenarioAudio[lessonIndex];
  playScenarioClip(isCorrect ? clips.correct : clips.incorrect);
}

const renderV4WithLessonOneAudio = renderV4;
renderV4 = function renderV8() {
  renderV4WithLessonOneAudio();
  const lessonIndex = state.lesson;
  if (!additionalScenarioAudio[lessonIndex] || state.screen !== 6) return;

  const scenarioCopy = $('.scenario-copy');
  const heading = scenarioCopy && scenarioCopy.querySelector('h3');
  if (!scenarioCopy || !heading || $('#playScenarioAudioBtn')) return;

  const playButton = document.createElement('button');
  playButton.id = 'playScenarioAudioBtn';
  playButton.className = 'scenario-audio-btn';
  playButton.type = 'button';
  playButton.setAttribute('aria-pressed', 'false');
  playButton.textContent = '▶ Play Scenario Audio';
  playButton.onclick = () => startAdditionalScenarioAudio(lessonIndex);
  heading.insertAdjacentElement('afterend', playButton);

  $$('.choice-btn[data-choice]').forEach(button => {
    button.addEventListener('click', () => {
      const isCorrect = +button.dataset.choice === lessons[lessonIndex].scenario.correct;
      playAdditionalScenarioResponse(lessonIndex, isCorrect);
      if (isCorrect) ensureScenarioReplayButton();
    });
  });
};

// Sound off is a global stop, including narration and response audio.
$('#soundBtn').onclick = () => {
  state.muted = !state.muted;
  $('#soundBtn').setAttribute('aria-pressed', state.muted);
  $('.sound-label').textContent = state.muted ? 'Sound off' : 'Sound on';
  $('#soundBtn span:first-child').textContent = state.muted ? '🔇' : '🔊';

  if (state.muted) {
    stopScenarioAudio();
    ['menuAudio', 'clickAudio'].forEach(id => {
      const audio = document.getElementById(id);
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  } else {
    play('click');
  }
  save();
};
