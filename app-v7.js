// Lesson 1 scenario narration and answer-response audio.
const lessonOneScenarioAudio = {
  intro: 'assets/lesson-1-scenario-intro.mp3',
  question: 'assets/lesson-1-scenario-question.mp3',
  correct: 'assets/lesson-1-scenario-correct.mp3',
  incorrect: 'assets/lesson-1-scenario-incorrect.mp3'
};

let activeScenarioAudio = null;
let scenarioAudioSequence = 0;

function stopScenarioAudio(resetButton = true) {
  scenarioAudioSequence += 1;
  if (activeScenarioAudio) {
    activeScenarioAudio.pause();
    activeScenarioAudio.currentTime = 0;
    activeScenarioAudio = null;
  }
  if (resetButton) {
    const button = $('#playScenarioAudioBtn');
    if (button) {
      button.textContent = '▶ Play Scenario Audio';
      button.setAttribute('aria-pressed', 'false');
    }
  }
}

function playScenarioClip(source, onEnded) {
  activeScenarioAudio = new Audio(source);
  activeScenarioAudio.onended = () => {
    activeScenarioAudio = null;
    if (onEnded) onEnded();
  };
  activeScenarioAudio.play().catch(() => {
    activeScenarioAudio = null;
    stopScenarioAudio();
    toast('Audio could not be played. Select the play button to try again.');
  });
}

function startLessonOneScenarioAudio() {
  if (state.muted) {
    toast('Turn sound on to hear the scenario audio.');
    return;
  }
  if (activeScenarioAudio) {
    stopScenarioAudio();
    return;
  }

  const button = $('#playScenarioAudioBtn');
  const sequence = ++scenarioAudioSequence;
  button.textContent = '■ Stop Scenario Audio';
  button.setAttribute('aria-pressed', 'true');

  playScenarioClip(lessonOneScenarioAudio.intro, () => {
    if (sequence !== scenarioAudioSequence || state.lesson !== 0 || state.screen !== 6) return;
    playScenarioClip(lessonOneScenarioAudio.question, () => {
      if (sequence === scenarioAudioSequence) stopScenarioAudio();
    });
  });
}

function playLessonOneResponse(isCorrect) {
  stopScenarioAudio();
  if (state.muted) return;
  playScenarioClip(
    isCorrect ? lessonOneScenarioAudio.correct : lessonOneScenarioAudio.incorrect
  );
}

function ensureScenarioReplayButton() {
  if ($('#replayScenarioBtn')) return;
  const scenarioCopy = $('.scenario-copy');
  if (!scenarioCopy) return;
  const replay = document.createElement('button');
  replay.id = 'replayScenarioBtn';
  replay.className = 'secondary-btn replay-scenario-btn';
  replay.type = 'button';
  replay.textContent = '↻ Replay Scenario';
  replay.onclick = () => {
    play('click');
    stopScenarioAudio();
    state.scenarioComplete[state.lesson] = false;
    save();
    renderV4();
    toast('Scenario reset. Choose the best response.');
  };
  scenarioCopy.appendChild(replay);
}

const renderV4WithScenarioReplay = renderV4;
renderV4 = function renderV7() {
  stopScenarioAudio(false);
  renderV4WithScenarioReplay();
  if (state.lesson !== 0 || state.screen !== 6) return;

  const scenarioCopy = $('.scenario-copy');
  const heading = scenarioCopy && scenarioCopy.querySelector('h3');
  if (!scenarioCopy || !heading || $('#playScenarioAudioBtn')) return;

  const playButton = document.createElement('button');
  playButton.id = 'playScenarioAudioBtn';
  playButton.className = 'scenario-audio-btn';
  playButton.type = 'button';
  playButton.setAttribute('aria-pressed', 'false');
  playButton.textContent = '▶ Play Scenario Audio';
  playButton.onclick = startLessonOneScenarioAudio;
  heading.insertAdjacentElement('afterend', playButton);

  $$('.choice-btn[data-choice]').forEach(button => {
    button.addEventListener('click', () => {
      const isCorrect = +button.dataset.choice === lessons[0].scenario.correct;
      playLessonOneResponse(isCorrect);
      if (isCorrect) ensureScenarioReplayButton();
    });
  });
};
