var api = 'https://api.github.com/repos/PyGithub/PyGithub/stats/participation';
document.addEventListener("DOMContentLoaded", function(event) {
  fetch(api)
  .then(function(response) { return response.json(); })
  .then(function(data) {

    var parsedData = parseData(data);
    drawChart(parsedData);
  })
});
// var json = new Array();
// loadData();
// console.log(json);
// var parsedData = parseData(values);
// drawChart(parsedData);
//
// function loadData() {
//   $.getJSON('https://api.github.com/repos/PyGithub/PyGithub/stats/participation', function (data) {
//     json = data.all;
//   }).error(function(){
//     console.log('error: json not loaded');
//   }).done(function() {
//     console.log(json);
//     var parsedData = parseData(values);
//     drawChart(parsedData);
//   });
// }


//usage:

function parseData(data) {
  console.log(data);
  var arr = [];
  var x = 0;
  for (var i in data.all)
  {
    arr.push(
      {
        week: x,
        value: +data.all[i]
      });
      x += 1;
    }
    return arr;

    // for (var i in data.bpi) {
    //   arr.push(
    //     {
    //       date: new Date(i), //date
    //       value: +data.bpi[i] //convert string to number
    //     });
    //   }
    //   return arr;
  }

  function drawChart(data) {
    console.log(data);
    var svgWidth = 1200, svgHeight = 600;
    var margin = { top: 20, right: 20, bottom: 30, left: 50 };
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;
    var svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight);

    var g = svg.append("g")
    .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")"
  );
  var x = d3.scaleLinear().rangeRound([0, width]);
  var y = d3.scaleLinear().rangeRound([height, 0]);
  var line = d3.line()
  .x(function(d) { return x(d.week)})
  .y(function(d) { return y(d.value)})
  x.domain(d3.extent(data, function(d) { return d.week }));
  y.domain(d3.extent(data, function(d) { return d.value }));
  g.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .select(".domain")
  .remove();
  g.append("g")
  .call(d3.axisLeft(y))
  .append("text")
  .attr("fill", "#000")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", "0.71em")
  .attr("text-anchor", "end")
  .text("Num of Commits");
  g.append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "red")
  .attr("stroke-linejoin", "round")
  .attr("stroke-linecap", "round")
  .attr("stroke-width", 1.5)
  .attr("d", line);
}
