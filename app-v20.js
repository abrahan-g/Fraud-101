// Course-wide usability, accessibility, and responsive-layout refinement layer.
(function () {
  const SESSION_SCROLL_PREF = 'fraud-advanced-scroll-reminder';
  const SESSION_VIEWED_PREF = 'fraud-advanced-viewed-toast';
  let scrollRequired = false;
  let activeScreenKey = '';
  let resizeTimer = 0;
  let toastTimer = 0;

  state.viewedScreens = state.viewedScreens || {};
  if (typeof state.muted !== 'boolean') state.muted = false;

  function sessionGet(key) { try { return sessionStorage.getItem(key); } catch (error) { return null; } }
  function sessionSet(key, value) { try { sessionStorage.setItem(key, value); } catch (error) {} }

  function screenKey() {
    if (state.examActive) return '';
    if (state.onOverview) return 'course-overview';
    return `lesson-${state.lesson + 1}-screen-${state.screen + 1}`;
  }

  function isExcludedFromScrollGate() {
    if (state.examActive) return true;
    const label = typeof labelV4 === 'function' ? String(labelV4()) : '';
    if (/Scenario|Knowledge Check|Interactive Activity|Video/i.test(label)) return true;
    return Boolean(els.main.querySelector('.scenario-stage,.kc-screen,.exam-instructions,.exam-question-screen,.exam-results,.lesson-video-screen,.hotspot-board,.toggle-grid,.concept-reveal-grid,.takeaway-card'));
  }

  function contentNeedsScroll() {
    if (isExcludedFromScrollGate()) return false;
    const topbar = document.querySelector('.topbar');
    const footer = document.querySelector('.course-footer');
    const available = window.innerHeight - (topbar ? topbar.offsetHeight : 0) - (footer ? footer.offsetHeight : 0);
    return els.main.scrollHeight > available + 32;
  }

  function atDocumentBottom() { return window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 28; }

  function ensureScrollUi() {
    if (!document.getElementById('scrollReminder')) {
      const reminder = document.createElement('aside');
      reminder.id = 'scrollReminder';
      reminder.className = 'scroll-reminder hidden';
      reminder.setAttribute('aria-label', 'Scroll instructions');
      reminder.innerHTML = `<span aria-hidden="true" class="scroll-arrow">↓</span><span class="scroll-copy">Scroll to view all content</span><button type="button" class="scroll-hide">Hide</button><button type="button" class="scroll-never">Don’t show again</button>`;
      document.body.appendChild(reminder);
      reminder.querySelector('.scroll-hide').addEventListener('click', () => { reminder.classList.add('collapsed'); updateTooltips(); });
      reminder.querySelector('.scroll-never').addEventListener('click', () => { sessionSet(SESSION_SCROLL_PREF, 'hidden'); reminder.classList.add('hidden'); });
      reminder.addEventListener('click', event => {
        if (reminder.classList.contains('collapsed') && !event.target.closest('button')) { reminder.classList.remove('collapsed'); updateTooltips(); }
      });
      reminder.tabIndex = 0;
      reminder.addEventListener('keydown', event => {
        if ((event.key === 'Enter' || event.key === ' ') && reminder.classList.contains('collapsed')) { event.preventDefault(); reminder.classList.remove('collapsed'); updateTooltips(); }
      });
    }
    if (!document.getElementById('viewedConfirmation')) {
      const viewed = document.createElement('aside');
      viewed.id = 'viewedConfirmation';
      viewed.className = 'viewed-confirmation hidden';
      viewed.setAttribute('role', 'status');
      viewed.setAttribute('aria-live', 'polite');
      viewed.innerHTML = `<span aria-hidden="true" class="viewed-check">✓</span><span>Screen viewed</span><button type="button">Hide</button>`;
      document.body.appendChild(viewed);
      viewed.querySelector('button').addEventListener('click', () => { sessionSet(SESSION_VIEWED_PREF, 'hidden'); viewed.classList.add('hidden'); });
    }
  }

  function showViewedConfirmation() {
    if (sessionGet(SESSION_VIEWED_PREF) === 'hidden') return;
    const viewed = document.getElementById('viewedConfirmation');
    clearTimeout(toastTimer);
    viewed.classList.remove('hidden');
    toastTimer = setTimeout(() => viewed.classList.add('hidden'), 3600);
  }

  function showScrollReminder(show) {
    const reminder = document.getElementById('scrollReminder');
    if (!reminder) return;
    reminder.classList.toggle('hidden', !show || sessionGet(SESSION_SCROLL_PREF) === 'hidden');
  }

  function refreshNavigationAfterScroll() {
    if (state.onOverview) {
      els.next.disabled = false;
      updateTooltips();
      return;
    }
    if (typeof updateV4 === 'function') updateV4();
  }

  function applyScrollGate() {
    ensureScrollUi();
    activeScreenKey = screenKey();
    scrollRequired = Boolean(activeScreenKey) && contentNeedsScroll();
    const alreadyViewed = Boolean(state.viewedScreens[activeScreenKey]);
    if (!scrollRequired) { showScrollReminder(false); refreshNavigationAfterScroll(); return; }
    if (alreadyViewed || atDocumentBottom()) {
      if (!alreadyViewed) { state.viewedScreens[activeScreenKey] = true; save(); }
      showScrollReminder(false);
      refreshNavigationAfterScroll();
      return;
    }
    els.next.disabled = true;
    showScrollReminder(true);
    updateTooltips();
  }

  function handleScrollCompletion() {
    if (!scrollRequired || !activeScreenKey || state.viewedScreens[activeScreenKey] || !atDocumentBottom()) return;
    state.viewedScreens[activeScreenKey] = true;
    save();
    showScrollReminder(false);
    refreshNavigationAfterScroll();
    showViewedConfirmation();
    updateTooltips();
  }

  function tooltipFor(element) {
    if (element.id === 'homeBtn') return 'Return to the course start screen.';
    if (element.id === 'collapseBtn') return els.side.classList.contains('collapsed') ? 'Expand the lesson menu.' : 'Collapse the lesson menu.';
    if (element.id === 'mobileMenuBtn') return 'Open the lesson menu.';
    if (element.id === 'soundBtn') return state.muted ? 'Turn course sound on.' : 'Turn course sound off.';
    if (element.id === 'backBtn') return 'Return to the previous screen.';
    if (element.id === 'nextBtn') return element.disabled ? 'Complete this screen requirement to continue.' : 'Continue to the next screen.';
    if (element.id === 'playScenarioAudioBtn') return 'Play the scenario introduction and question.';
    if (element.id === 'replayScenarioBtn') return 'Reset this scenario and review it again.';
    if (element.matches('.caption-toggle')) return element.getAttribute('aria-pressed') === 'true' ? 'Turn closed captions off.' : 'Turn closed captions on.';
    if (element.matches('.toggle-card,.concept-reveal-card,.takeaway-card')) return element.classList.contains('open') ? 'Close this card.' : 'Open this card to review the details.';
    if (element.matches('.resource-list a,[download]')) return element.hasAttribute('download') ? 'Download the course companion guide.' : 'Open this resource in a new browser tab.';
    if (element.matches('.lesson-link')) return element.disabled ? 'Complete the previous lesson to unlock this lesson.' : 'Open this lesson.';
    if (element.id === 'scrollReminder' && element.classList.contains('collapsed')) return 'Show the scroll instructions.';
    return element.dataset.tooltip || '';
  }

  function updateTooltips() {
    const controls = document.querySelectorAll('#homeBtn,#collapseBtn,#mobileMenuBtn,#soundBtn,#backBtn,#nextBtn,#playScenarioAudioBtn,#replayScenarioBtn,.caption-toggle,.toggle-card,.concept-reveal-card,.takeaway-card,.resource-list a,[download],.lesson-link,#scrollReminder.collapsed');
    controls.forEach(control => {
      const message = tooltipFor(control);
      if (!message) return;
      control.dataset.tooltip = message;
      if (control.matches('#homeBtn,#collapseBtn,#mobileMenuBtn,#soundBtn,#backBtn,#nextBtn,#playScenarioAudioBtn,#replayScenarioBtn,.caption-toggle')) control.setAttribute('aria-label', message);
      else if (!control.getAttribute('aria-label') && (control.matches('button') || control.matches('a'))) control.setAttribute('aria-label', message);
    });
  }

  function ensureTooltipSystem() {
    if (document.getElementById('courseTooltip')) return;
    const tooltip = document.createElement('div');
    tooltip.id = 'courseTooltip';
    tooltip.className = 'course-tooltip hidden';
    tooltip.setAttribute('role', 'tooltip');
    document.body.appendChild(tooltip);
    let anchor = null;
    function hide() { tooltip.classList.add('hidden'); if (anchor) anchor.removeAttribute('aria-describedby'); anchor = null; }
    function show(target) {
      const candidate = target.closest && target.closest('[data-tooltip]');
      if (!candidate || !candidate.dataset.tooltip) return;
      anchor = candidate;
      const currentMessage = tooltipFor(candidate);
      candidate.dataset.tooltip = currentMessage;
      tooltip.textContent = currentMessage;
      tooltip.classList.remove('hidden');
      candidate.setAttribute('aria-describedby', 'courseTooltip');
      const rect = candidate.getBoundingClientRect();
      const tipRect = tooltip.getBoundingClientRect();
      let left = rect.left + rect.width / 2 - tipRect.width / 2;
      left = Math.max(12, Math.min(window.innerWidth - tipRect.width - 12, left));
      let top = rect.top - tipRect.height - 10;
      if (top < 8) top = rect.bottom + 10;
      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
    }
    document.addEventListener('pointerover', event => show(event.target));
    document.addEventListener('pointerout', event => { if (anchor && !anchor.contains(event.relatedTarget)) hide(); });
    document.addEventListener('focusin', event => show(event.target));
    document.addEventListener('focusout', hide);
    document.addEventListener('keydown', event => { if (event.key === 'Escape') hide(); });
    window.addEventListener('scroll', hide, {passive:true});
  }

  function normalizeRenderedContent() {
    document.querySelectorAll('.lesson-copy').forEach(label => { label.textContent = label.textContent.replace(/^\s*\d+[.)-]?\s+/, ''); });
    document.querySelectorAll('.toggle-card,.concept-reveal-card,.takeaway-card').forEach(card => { card.setAttribute('aria-expanded', String(card.classList.contains('open'))); });
    document.querySelectorAll('.resource-list a[target="_blank"]').forEach(link => { if (!link.rel.includes('noopener')) link.rel = `${link.rel} noopener`.trim(); });
    updateTooltips();
  }

  const priorRender = renderV4;
  renderV4 = function renderV20() {
    priorRender();
    requestAnimationFrame(() => { normalizeRenderedContent(); applyScrollGate(); });
  };

  const priorOverview = renderCourseOverview;
  renderCourseOverview = function renderOverviewV20() {
    priorOverview();
    requestAnimationFrame(() => { normalizeRenderedContent(); applyScrollGate(); });
  };

  const priorUpdate = updateV4;
  updateV4 = function updateV20() {
    priorUpdate();
    if (scrollRequired && activeScreenKey && !state.viewedScreens[activeScreenKey] && !isExcludedFromScrollGate()) els.next.disabled = true;
    updateTooltips();
  };

  window.addEventListener('scroll', handleScrollCompletion, {passive:true});
  window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(applyScrollGate, 180); });
  ensureScrollUi();
  ensureTooltipSystem();
  normalizeRenderedContent();
})();
