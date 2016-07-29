var d3 = require('d3')
var moment = require('moment')
var getXPosition = require('./getXPosition')
var getY = require('./getY')
var data = require('./fake-data-area-chart')()

var CONTAINER_WIDTH = 800
var CONTAINER_HEIGHT = 900
var CHART_HEIGHT = 200
var CHART_SPACING = 100 // Spacing b/t charts
var margin = {top: 20, right: 20, bottom: 60, left: 40}
var width = CONTAINER_WIDTH - margin.left - margin.right
var height = CONTAINER_HEIGHT - margin.top - margin.bottom

// Set up container for the charts
var chartContainer =
  d3.select('#chart-container')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')

// Produce the "stack", which will be used to generate the area shape
var stack = d3.stack()
  .keys(['todo', 'done'])
  .order(d3.stackOrderNone)
  .offset(d3.stackOffsetNone)

// Describe how we map from dataset to pixel positions
var dates = data.map(datapoint => (
  datapoint.date
))
var xScale = d3.scaleTime()
  .domain(d3.extent(dates))
  .range([margin.left, width])

var values = [0, 1000] // Calculate based on data, not like this.
var yScale = d3.scaleLinear()
  .domain([0, d3.max(values)])
  .range([CHART_HEIGHT, 0])

// Describe how area is drawn
var area = d3.area()
  .x(function(d, i) { return xScale(d.data.date); })
  .y0(function(d) { return yScale(d[0]); })
  .y1(function(d) { return yScale(d[1]); });

/*** Create charts ***/
// CHART 1
// Draw line
var chart1Offset = (CHART_HEIGHT + CHART_SPACING) * 0
var layer = chartContainer.selectAll(".layer")
  .data(stack(data))
  .enter().append("g")
    .attr("class", "layer")

layer.append("path")
  .attr("class", "area")
  .style("fill", function(d) {
    if (d.key === 'todo') {
      return 'darkorange'
    }
    if (d.key === 'done') {
      return 'cadetblue'
    }
    return '#555'
  })
  .attr("d", area)

/* x axis */
chartContainer.append('g')
  .attr("class", "axis axis--x")
  .attr("transform", 'translate(0, ' + (CHART_HEIGHT + 25) + ')')
  .call(d3.axisBottom(xScale));

/* y axis */
chartContainer.append("g")
  .attr("class", "axis axis--y")
  .attr("transform", 'translate(30, ' + chart1Offset + ')')
  .call(d3.axisLeft(yScale));


// Add scrubber
var scrubbers = chartContainer.append('g').attr('class', 'scrubbers')
scrubbers.append('line')
  .attr('x1', 0)
  .attr('x2', 0)
  .attr('y1', chart1Offset - 10)
  .attr('y2', chart1Offset + CHART_HEIGHT + 10)
  .attr('class', 'scrubber scrubber1')

// Add info-box
var infoBoxDate = d3.select('.info-box .date')
var infoBoxY1 = d3.select('.info-box .y1')
var infoBoxY2 = d3.select('.info-box .y2')

function updateInfo(info) {
  var formattedDate = moment(info.date).format("MMMM Do YYYY");
  infoBoxDate.html(formattedDate)
  infoBoxY1.html(info.y1)
  infoBoxY2.html(info.y2)
}

// Event handlers
d3.select('#chart-container')
  .on('mousemove', function() {
    var xPosition = getXPosition(this)
    d3.selectAll('.scrubber')
      .style('visibility', 'visible')
      .style('opacity', '0.5')
      .attr('x1', xPosition - margin.left)
      .attr('x2', xPosition - margin.left)

      // Given mouseX position, find x value in our dataset
      var currentDate = xScale.invert(xPosition)

      // Given x value in dataset, find y value in dataset
      var currentY1 = getY(currentDate, data, 'todo')
      var currentY2 = getY(currentDate, data, 'done')

      // Update this stuff in our info box
      d3.select('.info-box')
        .style('visibility', 'visible')
        .style('opacity', '1')

      d3.select('.info-box .y1-label')
        .style('background-color', 'darkorange')

      d3.select('.info-box .y2-label')
        .style('background-color', 'cadetblue')

      updateInfo({
        date: currentDate,
        y1: currentY1,
        y2: currentY2
      })
  })

d3.select('#chart-container')
  .on('mouseout', function() {
    d3.selectAll('.scrubber')
      .style('visibility', 'hidden')
      .style('opacity', '0')
  })
