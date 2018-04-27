var data = [{"salesperson":"Positive","sales":33},{"salesperson":"Negative","sales":67}];

// set the dimensions and margins of the graph
var margin = {top: 20, right: 10, bottom: 30, left: 500},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var y = d3.scaleBand()
          .range([height/3, 0])
          .padding(0.1);

var x = d3.scaleLinear()
          .range([0, width]);

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select(".viz-sentiment").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

  // format the data
  data.forEach(function(d) {
    d.sales = +d.sales;
  });

  // Scale the range of the data in the domains
  x.domain([0, d3.max(data, function(d){ return d.sales; })])
  y.domain(data.map(function(d) { return d.salesperson; }));
  //y.domain([0, d3.max(data, function(d) { return d.sales; })]);

  // append the rectangles for the bar chart
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      //.attr("x", function(d) { return x(d.sales); })
      .attr("width", function(d) {return x(d.sales); } )
      .attr("y", function(d) { return y(d.salesperson); })
      .attr("height", y.bandwidth())
      .attr('fill', function (d){ if (d.salesperson == 'Positive'){return 'green';}
                                  else {return 'red';}});

  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height/3 + ")")
      .call(d3.axisBottom(x));

  // add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

