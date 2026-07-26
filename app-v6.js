// Add a reusable replay control to every completed lesson scenario.
const renderV4Base = renderV4;
renderV4 = function renderV6() {
  renderV4Base();
  if (state.lesson >= 6 || state.screen !== 6 || !state.scenarioComplete[state.lesson]) return;

  const scenarioCopy = $('.scenario-copy');
  if (!scenarioCopy || $('#replayScenarioBtn')) return;

  const replay = document.createElement('button');
  replay.id = 'replayScenarioBtn';
  replay.className = 'secondary-btn replay-scenario-btn';
  replay.type = 'button';
  replay.textContent = '↻ Replay Scenario';
  replay.onclick = () => {
    play('click');
    state.scenarioComplete[state.lesson] = false;
    save();
    renderV4();
    toast('Scenario reset. Choose the best response.');
  };
  scenarioCopy.appendChild(replay);
};
