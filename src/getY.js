module.exports = function getY(targetDate, data, key) {
  if (!key) { key = 'value'}
  var closestIndex = 0

  data.forEach((datapoint, i) => {
    var currentDiff = dateDifference(targetDate, datapoint.date)
    var closestDiff = dateDifference(targetDate, data[closestIndex].date)
    if (currentDiff < closestDiff) {
      closestIndex = i
    }
  })

  return data[closestIndex][key]
}

function dateDifference(date1, date2) {
  return Math.abs(date2 - date1)
}
