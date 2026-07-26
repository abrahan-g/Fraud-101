// Add a first-launch course overview and make Start Course resume automatically.
state.overviewSeen = Boolean(state.overviewSeen);
state.onOverview = Boolean(state.onOverview);

function hasMeaningfulCourseProgress() {
  return Boolean(
    state.lesson > 0 ||
    state.screen > 0 ||
    state.completed.length ||
    Object.values(state.visitedCards || {}).some(cards => cards && cards.length) ||
    Object.values(state.scenarioComplete || {}).some(Boolean) ||
    Object.values(state.kcComplete || {}).some(Boolean)
  );
}

function renderOverviewNav() {
  els.nav.innerHTML = `
    <button class="lesson-link active" disabled aria-current="page">
      <span class="lesson-num">•</span>
      <span class="lesson-copy">Course Overview</span>
      <span class="lock"></span>
    </button>
  ` + lessons.map((lesson, index) => `
    <button class="lesson-link" disabled>
      <span class="lesson-num">${index + 1}</span>
      <span class="lesson-copy">${esc(lesson.title)}</span>
      <span class="lock">${index === 0 ? '' : '🔒'}</span>
    </button>
  `).join('');
}

function renderCourseOverview() {
  stopScenarioAudio();
  state.onOverview = true;
  els.kicker.textContent = 'Course Overview';
  els.title.textContent = 'AI Agents, Identity, and Authorization in Digital Commerce';
  els.status.textContent = 'Getting started';
  els.main.innerHTML = `
    <section class="screen-panel course-overview-screen">
      <span class="screen-eyebrow">Course Overview</span>
      <h3>Building Trust in Agentic Commerce</h3>
      <p class="overview-lead">AI agents can search, select, and purchase on a customer’s behalf. For merchants, the central challenge is establishing whether the agent is legitimate, whether the customer granted authority, and whether the transaction remains within the customer’s approved scope.</p>

      <div class="overview-section">
        <h4>What This Course Covers</h4>
        <div class="overview-topic-grid">
          <article><span>01</span><h5>Agent Identity</h5><p>Verify agent identity, request integrity, freshness, audience, key status, and replay protection.</p></article>
          <article><span>02</span><h5>Delegated Authority</h5><p>Translate customer instructions into structured limits for actions, merchants, products, amounts, timing, and exceptions.</p></article>
          <article><span>03</span><h5>Authentication and Step-Up</h5><p>Use passkeys and targeted confirmation when risk or material transaction details change.</p></article>
          <article><span>04</span><h5>Payment Protection</h5><p>Align network and merchant token controls with the purchase the customer authorized.</p></article>
          <article><span>05</span><h5>Consent and Control</h5><p>Link intent, cart, and payment mandates while enforcing expiry, revocation, and supersession.</p></article>
          <article><span>06</span><h5>Verifiable Evidence</h5><p>Connect identity, consent, cart, payment, decision, and fulfillment records into a useful audit trail.</p></article>
        </div>
      </div>

      <div class="overview-outcomes">
        <h4>By the End of This Course, You Will Be Able To:</h4>
        <ul>
          <li>Separate agent identity, customer authorization, and scope compliance as distinct trust decisions.</li>
          <li>Evaluate the evidence used to recognize an agent and protect requests from alteration or replay.</li>
          <li>Apply delegated authority, passkeys, step-up verification, and token controls to realistic merchant decisions.</li>
          <li>Enforce consent changes in real time and preserve linked evidence for operations, service, and disputes.</li>
        </ul>
      </div>
    </section>
  `;
  els.back.disabled = true;
  els.next.disabled = false;
  els.next.textContent = hasMeaningfulCourseProgress() ? 'Continue Course →' : 'Begin Lesson 1 →';
  els.indicator.textContent = 'Course Overview';
  els.bar.style.width = '0%';
  els.pct.textContent = '0%';
  renderOverviewNav();
  els.main.focus();
  window.scrollTo(0, 0);
  save();
}

function continueFromOverview() {
  play('click');
  state.overviewSeen = true;
  state.onOverview = false;
  renderV4();
  save();
}

const renderV4WithOverviewProgress = renderV4;
renderV4 = function renderV9() {
  renderV4WithOverviewProgress();
  if (state.onOverview) return;
  const prior = state.lesson < 6 ? state.lesson * 9 : 54;
  const progress = Math.round((1 + prior + state.screen + (state.completed.includes(6) ? 1 : 0)) / 59 * 100);
  els.bar.style.width = progress + '%';
  els.pct.textContent = progress + '%';
};

$('#startBtn').onclick = () => {
  state.started = true;
  els.start.classList.add('hidden');
  els.shell.classList.remove('hidden');
  play('menu');

  if (!state.overviewSeen || state.onOverview) {
    renderCourseOverview();
  } else {
    state.onOverview = false;
    renderV4();
    save();
  }
};

$('#resumeBtn').hidden = true;
$('#resumeBtn').setAttribute('aria-hidden', 'true');
$('#resumeBtn').tabIndex = -1;

$('#homeBtn').onclick = () => {
  play('click');
  stopScenarioAudio();
  els.shell.classList.add('hidden');
  els.start.classList.remove('hidden');
};

const nextWithOverview = els.next.onclick;
els.next.onclick = () => {
  if (state.onOverview) {
    continueFromOverview();
    return;
  }
  nextWithOverview();
};
