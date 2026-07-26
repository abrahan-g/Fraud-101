// Synchronized instructional videos for Lessons 2, 4, and 6.
(function () {
  const videoLessons = new Set([1, 3, 5]);
  const videoTitles = {
    1: 'A Coordinated Fraud Operation: From Reconnaissance to Adaptation',
    3: 'Connecting the Investigation',
    5: 'The First Minutes of a Fraud Incident'
  };
  const videoDescriptions = {
    1: 'Follow a coordinated operation from research and resource gathering through testing, monetization, and adaptation. Watch for the merchant signals that connect activity across stages.',
    3: 'Build an investigation outward from one event. See how accounts, devices, payments, destinations, and behavior support a tested hypothesis and a proportionate decision.',
    5: 'Move through the first minutes of an active incident: declare, contain, escalate, preserve evidence, assess impact, recover, and document the response.'
  };

  const priorCount = countV4;
  const priorRender = renderV4;

  function hasVideo(i) { return videoLessons.has(i); }
  function lessonCount(i) { return i === 6 ? 4 : (hasVideo(i) ? 11 : 10); }
  function screensBefore(i) {
    let total = 0;
    for (let n = 0; n < i; n++) total += lessonCount(n);
    return total;
  }

  function renderVideoScreen() {
    const lessonNumber = state.lesson + 1;
    const title = videoTitles[state.lesson];
    els.kicker.textContent = `Lesson ${String(lessonNumber).padStart(2, '0')} of 07 · Video`;
    els.title.textContent = lessons[state.lesson].title;
    els.main.innerHTML = `<section class="screen-panel lesson-video-screen">
      <span class="screen-eyebrow">Instructional Video</span>
      <h3>${esc(title)}</h3>
      <p class="video-introduction">${esc(videoDescriptions[state.lesson])}</p>
      <div class="lesson-video-frame">
        <video class="lesson-video" controls controlsList="nodownload" preload="metadata" poster="assets/lesson-${lessonNumber}-video-poster.png" ${state.muted ? 'muted' : ''}>
          <source src="assets/lesson-${lessonNumber}-video.mp4" type="video/mp4">
          <track kind="captions" srclang="en" label="English" src="assets/lesson-${lessonNumber}-video.vtt">
          Your browser does not support embedded video. <a href="assets/lesson-${lessonNumber}-video.vtt">Read the transcript</a>.
        </video>
      </div>
      <div class="video-accessibility-controls"><button type="button" class="caption-toggle" aria-pressed="false"><span aria-hidden="true">CC</span> Captions off</button></div>
      <details class="video-transcript"><summary>Read the video transcript</summary><div class="video-transcript-copy" data-video-transcript="${lessonNumber}"></div></details>
    </section>`;
    const video = els.main.querySelector('.lesson-video');
    const captionButton = els.main.querySelector('.caption-toggle');
    captionButton.addEventListener('click', () => {
      play('click');
      const track = video.textTracks && video.textTracks[0];
      if (!track) return;
      const show = track.mode !== 'showing';
      track.mode = show ? 'showing' : 'disabled';
      captionButton.setAttribute('aria-pressed', String(show));
      captionButton.innerHTML = `<span aria-hidden="true">CC</span> Captions ${show ? 'on' : 'off'}`;
    });
    const track = els.main.querySelector('track');
    const transcript = els.main.querySelector('.video-transcript-copy');
    fetch(track.src).then(r => r.text()).then(text => {
      const lines = text.split(/\r?\n/).filter(line => line && !/^WEBVTT/.test(line) && !/-->/.test(line) && !/^\d+$/.test(line));
      transcript.innerHTML = lines.map(line => `<p>${esc(line)}</p>`).join('');
    }).catch(() => { transcript.innerHTML = '<p>The synchronized captions are available from the video controls.</p>'; });
    updateV4();
    els.main.focus();
    window.scrollTo(0, 0);
  }

  countV4 = function (i = state.lesson) { return lessonCount(i); };
  labelV4 = function () {
    if (state.lesson === 6) return ['Course Review', 'Key Takeaways', 'Resources', 'Course Completion'][state.screen];
    const labels = ['Lesson Introduction', 'Why It Matters', 'Core Concepts', 'Merchant Application', 'Deep Dive', 'Interactive Activity', 'Scenario', 'Knowledge Check'];
    if (state.screen < 8) return labels[state.screen];
    if (hasVideo(state.lesson)) return ['Video', 'Current Landscape', 'Lesson Review'][state.screen - 8];
    return ['Current Landscape', 'Lesson Review'][state.screen - 8];
  };

  renderV4 = function () {
    if (state.examActive || state.onOverview || state.lesson === 6 || state.screen < 8 || !hasVideo(state.lesson)) {
      priorRender();
      updateV4();
      return;
    }
    if (state.screen === 8) { renderVideoScreen(); return; }
    const actual = state.screen;
    state.screen = actual - 1;
    priorRender();
    state.screen = actual;
    updateV4();
  };

  updateV4 = function () {
    const review = state.lesson === 6;
    const activity = state.screen === 5 && !review;
    const scenario = state.screen === 6 && !review;
    const kc = state.screen === 7 && !review;
    els.back.disabled = state.lesson === 0 && state.screen === 0;
    els.next.disabled = (activity && !allCardsSeen(state.lesson)) || (scenario && !state.scenarioComplete[state.lesson]) || (kc && !state.kcComplete[state.lesson]);
    els.next.textContent = state.screen === countV4() - 1 ? (review ? 'Course Complete' : 'Next Lesson →') : 'Next →';
    els.indicator.textContent = `Screen ${state.screen + 1} of ${countV4()}`;
    const progress = Math.round((1 + screensBefore(state.lesson) + state.screen + (state.completed.includes(6) ? 1 : 0)) / 68 * 100);
    els.bar.style.width = Math.min(100, progress) + '%';
    els.pct.textContent = Math.min(100, progress) + '%';
    els.status.textContent = state.completed.includes(state.lesson) ? 'Completed' : labelV4();
    renderNavV3();
  };

  document.getElementById('soundBtn').addEventListener('click', () => {
    document.querySelectorAll('video').forEach(video => {
      video.muted = state.muted;
      if (state.muted) video.pause();
    });
  });

  if (state.courseVersion !== 19) {
    state.courseVersion = 19;
    state.lesson = 0;
    state.screen = 0;
    state.completed = [];
    state.visitedCards = {};
    state.scenarioComplete = {};
    state.kcComplete = {};
    state.reviewSeen = {};
    state.hotspotSelections = [];
    state.overviewSeen = false;
    state.onOverview = false;
    state.examActive = false;
    state.examView = 'instructions';
    save();
  }
})();
