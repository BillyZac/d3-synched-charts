module.exports = function lineChart(data) {
  var dates = data.map(item => (item.date))
  var values = data.map(item => (item.value))

  var margin = {top: 20, right: 20, bottom: 40, left: 50}
  var width = 600 - margin.left - margin.right
  var height = 400 - margin.top - margin.bottom

  var xScale = d3.scaleTime()
    .domain(d3.extent(dates))
    .range([0, width]);

  var yScale = d3.scaleLinear()
    .domain(d3.extent(values))
    .range([height, 0])

  var svg =
    d3.select('#chart-container')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')

  /* x axis */
  var chart1 = svg.append('g')
    .attr("class", "axis axis--x")
    .attr("transform", 'translate(0, ' + (height + 10) + ')')
    .call(d3.axisBottom(xScale));

  /* y axis */
  svg.append("g")
    .attr("class", "axis axis--y")
    .attr("transform", "translate(20, 0)")
    .call(d3.axisLeft(yScale));

  var line = d3.line()
    .curve(d3.curveCardinal.tension(0.1))
    .x(function(d) {
      return xScale(d.date)
    })
    .y(function(d) {
      return yScale(d.value)
    })

  svg.append("path")
   .datum(data)
   .attr("class", "line")
   .attr("d", line);
}
