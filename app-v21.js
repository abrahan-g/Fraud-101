// Companion guide download and completed-course navigation from the final exam.
(function () {
  const companionGuide = 'assets/Fraud-101-Companion-Guide.pdf';

  const renderReviewBeforeCompanionGuide = renderReviewScreen;
  renderReviewScreen = function renderReviewWithCompanionGuide() {
    const html = renderReviewBeforeCompanionGuide();
    if (state.lesson !== lessons.length - 1 || state.screen !== 2) return html;
    return html.replace(
      '<div class="resource-list">',
      `<p class="section-lead">Download the course job aid, then use the primary resources for continued learning.</p>
       <div class="resource-list">
         <a href="${companionGuide}" download="Fraud-101-Companion-Guide.pdf" class="companion-guide-link">
           <strong>Course Companion Guide</strong>
           <span>Download the advanced fraud reference, checklists, and worksheets (PDF)</span>
         </a>`
    );
  };

  renderExamNav = function renderAccessibleExamNav() {
    els.nav.innerHTML = lessons.map((lesson, index) => `
      <button class="lesson-link complete" data-i="${index}">
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

    $$('.lesson-link[data-i]').forEach(button => {
      button.onclick = () => {
        play('click');
        stopScenarioAudio();
        state.examActive = false;
        state.onOverview = false;
        state.lesson = Number(button.dataset.i);
        state.screen = 0;
        renderV4();
        save();
        if (innerWidth < 900) els.side.classList.remove('mobile-open');
      };
    });
  };

  const updateExamChromeBeforeCourseNavigation = updateExamChrome;
  updateExamChrome = function updateExamChromeWithCourseNavigation() {
    updateExamChromeBeforeCourseNavigation();
    addCourseNavigationNotice();
  };

  function addCourseNavigationNotice() {
    const screen = els.main.querySelector('.exam-instructions,.exam-question-screen,.exam-results');
    if (!screen || screen.querySelector('.exam-course-navigation-note')) return;
    const note = document.createElement('p');
    note.className = 'exam-course-navigation-note';
    note.textContent = 'Need to review a lesson? Select any completed lesson in the menu. Your exam progress will be saved.';
    screen.insertBefore(note, screen.children[screen.classList.contains('exam-question-screen') ? 2 : 3] || null);
  }
})();
