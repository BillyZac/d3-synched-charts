function fakeData() {
  var result = []
  var nextValue = Math.random() * 5
  for (var i = 1; i <= 180; i++) {
    result.push({
      date: new Date(2007, 3, i * 1),
      value: Math.floor(nextValue)
    })

    var incrementValue = Math.random() > 0.3 ? Math.random() * 10 + 3 : 0

    if (nextValue > 300) {
      Math.random() > 0.5 ? nextValue += incrementValue : nextValue -= incrementValue
    } else {
      nextValue += incrementValue
    }
  }
  return result
}

module.exports = fakeData
