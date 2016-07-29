function fakeDataAreaChart() {
  var result = []

  var nextTodoValue = Math.random() * 5
  var nextDoneValue = Math.random() * 5

  for (var i = 1; i <= 180; i++) {
    result.push({
      date: new Date(2007, 3, i * 1),
      todo: Math.floor(nextTodoValue),
      done: Math.floor(nextDoneValue)
    })

    var incrementValue = Math.random() > 0.3 ? Math.random() * 10 + 3 : 0

    if (nextTodoValue > 300) {
      Math.random() > 0.5 ? nextTodoValue += incrementValue : nextTodoValue -= incrementValue
    } else {
      nextTodoValue += incrementValue
    }

    if (nextDoneValue > 300) {
      Math.random() > 0.5 ? nextDoneValue += incrementValue : nextDoneValue -= incrementValue
    } else {
      nextDoneValue += incrementValue
    }
  }
  return result
}

module.exports = fakeDataAreaChart
