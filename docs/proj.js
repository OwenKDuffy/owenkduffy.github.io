// var api = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2017-12-31&end=2018-04-01';
// document.addEventListener("DOMContentLoaded", function(event) {
//   fetch(api)
//   .then(function(response) { return response.json(); })
//   .then(function(data) {
//     var parsedData = parseData(data)
//     drawChart(parsedData);
//   })
// });
var json = readTextFile("/Users/Documents/workspace/test.json", function(text){
    var data = JSON.parse(text);
    console.log(data);
});
console.log(json);
var parsedData = parseData(values);
drawChart(parsedData);

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

//usage:

function parseData(data) {
  var arr = [];
  var x = 0;
  for (var i in data)
  {
    arr.push(
      {
        week: x,
        value: i
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
    var svgWidth = 600, svgHeight = 400;
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
  var x = d3.scaleTime().rangeRound([0, width]);
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
  .attr("stroke", "steelblue")
  .attr("stroke-linejoin", "round")
  .attr("stroke-linecap", "round")
  .attr("stroke-width", 1.5)
  .attr("d", line);
}
