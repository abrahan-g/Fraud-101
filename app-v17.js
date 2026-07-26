// Reversible concept reveals and an input-driven Lesson 2 network hotspot investigation.
(function () {
  conceptGrid = function (items) {
    return `<div class="concept-grid concept-reveal-grid">${items.map((item, index) => `
      <button class="concept-reveal-card" type="button" data-concept="${index}" aria-expanded="false">
        <span class="concept-front"><strong>${esc(item[0])}</strong><small>Select to reveal</small></span>
        <span class="concept-back"><strong>${esc(item[0])}</strong><span>${esc(item[1])}</span><small>Select to return</small></span>
      </button>`).join('')}</div>`;
  };

  function wireConceptReveals() {
    $$('.concept-reveal-card').forEach(card => {
      card.onclick = () => {
        play('click');
        const open = card.classList.toggle('open');
        card.setAttribute('aria-expanded', String(open));
      };
    });
  }

  const hotspots = [
    {title:'Shared recovery number',detail:'Eight accounts recover to the same newly created telephone number.',risk:true,x:17,y:23},
    {title:'Common payout destination',detail:'Refund value from separate accounts flows to one beneficiary.',risk:true,x:72,y:20},
    {title:'Rotating IP addresses',detail:'Requests use varied networks, but this alone does not prove coordination.',risk:false,x:47,y:39},
    {title:'Corporate network',detail:'Many legitimate employees share this infrastructure during work hours.',risk:false,x:22,y:71},
    {title:'Matching device traits',detail:'Accounts present the same uncommon device configuration and automation pattern.',risk:true,x:75,y:68},
    {title:'Coordinated timing',detail:'Recovery, purchase, address change, and refund actions occur in the same sequence within minutes.',risk:true,x:48,y:84}
  ];

  function renderHotspotActivity() {
    state.hotspotSelections = state.hotspotSelections || [];
    const complete = allCardsSeen(1);
    els.main.innerHTML = `<section class="screen-panel hotspot-activity">
      <span class="screen-eyebrow">Interactive Investigation</span>
      <h3>Find the Strongest Network Signals</h3>
      <p class="section-lead">A recovery cluster contains both suspicious and potentially legitimate connections. Select the four hotspots that most strongly support coordinated fraud, then submit your assessment.</p>
      <div class="hotspot-board" aria-label="Fraud network investigation">
        <div class="network-core"><span>Recovery cluster</span><small>18 linked accounts</small></div>
        ${hotspots.map((h,i)=>`<button class="network-hotspot ${state.hotspotSelections.includes(i)?'selected':''}" data-hotspot="${i}" style="--x:${h.x}%;--y:${h.y}%" aria-pressed="${state.hotspotSelections.includes(i)}"><span>${i+1}</span><strong>${esc(h.title)}</strong></button>`).join('')}
      </div>
      <div class="hotspot-detail" id="hotspotDetail" role="status">Select a hotspot to inspect the signal.</div>
      <div class="hotspot-actions"><button id="checkHotspots" class="primary-btn small">Submit Assessment</button><button id="resetHotspots" class="secondary-btn">Reset</button></div>
      <div class="incorrect-box hotspot-error" role="alert">Review the strength and business plausibility of each link, then try again.</div>
      <div class="feedback hotspot-success ${complete?'show':''}" role="status"><strong>Investigation complete</strong><br>The shared recovery number, common beneficiary, matching device traits, and coordinated sequence form the strongest combined evidence. Rotating IPs and a shared corporate network need more context.</div>
    </section>`;

    $$('.network-hotspot').forEach(button => button.onclick = () => {
      play('click');
      const index = +button.dataset.hotspot;
      const selected = state.hotspotSelections.includes(index);
      state.hotspotSelections = selected ? state.hotspotSelections.filter(v=>v!==index) : [...state.hotspotSelections,index];
      button.classList.toggle('selected', !selected);
      button.setAttribute('aria-pressed', String(!selected));
      $('#hotspotDetail').innerHTML = `<strong>${esc(hotspots[index].title)}</strong><span>${esc(hotspots[index].detail)}</span>`;
      save();
    });
    $('#checkHotspots').onclick = () => {
      play('click');
      const correct=[0,1,4,5];
      const chosen=[...state.hotspotSelections].sort((a,b)=>a-b);
      const right=chosen.length===correct.length && correct.every((v,i)=>chosen[i]===v);
      if(right){state.visitedCards[1]=lessons[1].cards.map((_,i)=>i);$('.hotspot-error').classList.remove('show');$('.hotspot-success').classList.add('show');updateV4();save()}
      else{$('.hotspot-error').classList.add('show');$('.hotspot-success').classList.remove('show')}
    };
    $('#resetHotspots').onclick = () => {play('click');state.hotspotSelections=[];renderHotspotActivity();save()};
    updateV4();
  }

  const priorRender = renderV4;
  renderV4 = function () {
    priorRender();
    if (state.onOverview || state.examActive) return;
    if (state.lesson === 1 && state.screen === 5) renderHotspotActivity();
    else wireConceptReveals();
  };

  if (false) {
    state.courseVersion=17; state.lesson=0; state.screen=0; state.completed=[];
    state.visitedCards={}; state.scenarioComplete={}; state.kcComplete={}; state.reviewSeen={};
    state.hotspotSelections=[]; state.overviewSeen=false; state.onOverview=false; state.examActive=false;
    state.examView='instructions'; state.examQuestion=0; state.examAnswers={}; state.examAttempts=0;
    state.examPassed=false; state.examBestScore=0; state.examLastScore=0; state.examExhausted=false; save();
  }
})();
