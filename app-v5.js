// Vary scenario answer placement so learners must evaluate each situation.
[
  [0, [1, 0, 2], 0],
  [1, [0, 2, 1], 2],
  [2, [0, 1, 2], 1],
  [3, [1, 0, 2], 0],
  [4, [0, 2, 1], 2],
  [5, [0, 1, 2], 1],
  [6, [1, 0, 2], 0]
].forEach(([lessonIndex, order, correctIndex]) => {
  const scenario = lessons[lessonIndex].scenario;
  scenario.choices = order.map(index => scenario.choices[index]);
  scenario.correct = correctIndex;
});
