/*var w = '90%';
var h = 600;*/

var margin = {top: 50, right: 200, bottom: 100, left: 25};

var width = 1560 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


var svg = d3.select('.viz-user')
                        .append("svg")
                        .attr("width", width)
                        .attr("height", height);

var yTrans = 10;
var xTrans = 30;
var g = svg.append("g").attr("transform", "translate(" + 50 + "," + yTrans +")");


var cfg = {
      strokeWidth: 10
    };
var colour = d3.scaleOrdinal(d3.schemeCategory20c);

// Use indexOf to fade in one by one
var highlight = ['acaso','bcaso','ccaso','dcaso','ecaso','fcaso','gcaso','hcaso','icaso','lcasomanica']
//var data = ['Num Tweet', 'Num follower', 'Num friends', 'Num positive', 'Num negative']

// Map point to ticks



g.append("defs").append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width - 10)
    .attr("height", height + cfg.strokeWidth);

var x = d3.scaleLinear()
    	.range([0, width]);

var y = d3.scaleLinear()
    	.range([0, height]);


var voronoi = d3.voronoi()
    	.x(d => x(d.year))
    	.y(d => y(d.rank))
    	.extent([[-margin.left / 2, -margin.top / 2], [width + margin.right / 2, height + margin.bottom / 2]]);

var line = d3.line()
    .x(d => x(d.year))
    .y(d => y(d.rank))

d3.csv("data_user.csv", function(error, data) {
  if (error) throw error;

  var parsedData = [];
  data.forEach((d) => {
    var dObj = {department: d.utente, ranks: []};
    for (var year in d) {
      if (year != "department") {
        if (d[year] != 0) {
            dObj.ranks.push({year: +year, rank: +d[year], department: dObj});
        }
      }
    }
    parsedData.push(dObj);
  });



var xTickNo = parsedData[0].ranks.length;
x.domain(d3.extent(parsedData[0].ranks, d => d.year));

colour.domain(data.map(d => d.department));

// Ranks
var ranks = 11;
y.domain([0.5, ranks]);

var axisMargin = 20;

var xAxis = d3.axisBottom(x)
                .tickFormat(d3.format("d"))
                .ticks(xTickNo)
                .tickSize(0);

var yAxis = d3.axisLeft(y)
      	.ticks(ranks)
      	.tickSize(0);

var xGroup = g.append("g");
var xAxisElem = xGroup.append("g")
                        .attr("transform", "translate(" + [0, height + axisMargin * 1.2] + ")")
                        .attr("class", "x-axis")
                        .call(xAxis);


xGroup.append("g").selectAll("line")
      	.data(x.ticks(xTickNo))
      	.enter().append("line")
      		.attr("class", "grid-line")
      		.attr("y1", 0)
      		.attr("y2", height + 10)
      		.attr("x1", d => x(d))
      		.attr("x2", d => x(d));




var yGroup = g.append("g");
var yAxisElem = yGroup.append("g")
      	.attr("transform", "translate(" + [-axisMargin, 0] + ")")
      	.attr("class", "y-axis")
      	.call(yAxis);


yAxisElem.append("text")
      	.attr("class", "y-label")
      	.attr("text-anchor", "middle")
      	.attr("transform", "rotate(-90) translate(" + [-height / 2, -margin.left / 3] + ")")
      	.text("User ranking");

yGroup.append("g").selectAll("line")
      	.data(y.ticks(ranks))
      	.enter().append("line")
      		.attr("class", "grid-line")
      		.attr("x1", 0)
      		.attr("x2", width)
      		.attr("y1", d => y(d))
      		.attr("y2", d => y(d));


var lines = g.append("g")
      	.selectAll("path")
      	.data(parsedData)
      	.enter().append("path")
        .attr("class", "rank-line")
        .attr("d", function(d) { d.line = this; return line(d.ranks)})
        .attr("clip-path", "url(#clip)")
        .style("stroke", d => colour(d.department))
        .style("stroke-width", cfg.strokeWidth)
        .style("opacity", 0.1)
        .transition()
            .duration(500)
            .delay(d => (highlight.indexOf(d.department) + 1) * 500)
        .style("opacity", d => highlight.includes(d.department) ? 1 : 0.1);

var endLabels = g.append("g")
      	.attr("class", "end-labels")
      	.selectAll("text")
      	.data(parsedData.filter(d => highlight.includes(d.department)))
      	.enter().append("text")
      		.attr("class", "end-label")
      		.attr("x", d => x(d.ranks[d.ranks.length - 1].year))
      		.attr("y", d => y(d.ranks[d.ranks.length - 1].rank))
      		.attr("dx", 20)
      		.attr("dy", cfg.strokeWidth / 2)
      		.text(d => d.department)
      		.style("opacity", 0)
          .transition()
      			.duration(500)
      			.delay(d => (highlight.indexOf(d.department) + 1) * 500)
      		.style("opacity", 1);


var endDots = g.append("g")
      	.selectAll("circle")
      	.data(parsedData.filter(d => highlight.includes(d.department)))
      	.enter().append("circle")
      		.attr("class", "end-circle")
      		.attr("cx", d => x(d.ranks[d.ranks.length - 1].year))
      		.attr("cy", d => y(d.ranks[d.ranks.length - 1].rank))
      		.attr("r", cfg.strokeWidth)
      		.style("fill", d => colour(d.department))
      		.style("opacity", 0)
          .transition()
      			.duration(500)
      			.delay(d => (highlight.indexOf(d.department) + 1) * 500)
      		.style("opacity", 1);


var tooltip = g.append("g")
      	.attr("transform", "translate(-100, -100);")
      	.attr("class", "tooltip_bis");
      tooltip.append("circle")
      	.attr("r", cfg.strokeWidth);
      tooltip.append("text")
      	.attr("class", "name")
      	.attr("y", -10);

var voronoiGroup = g.append("g")
      	            .attr("class", "voronoi");

voronoiGroup.selectAll("path")
      	.data(voronoi.polygons(d3.merge(parsedData.map(d => d.ranks))))
      	.enter().append("path")
      		.attr("d", function(d) { return d ? "M" + d.join("L") + "Z" : null; })
      		.on("mouseover", mouseover)
      		.on("mouseout", mouseout);

g.selectAll(".rank-line")
      	.each(d => highlight.includes(d.department) ? d.line.parentNode.appendChild(d.line) : 0);

g.select("g.end-labels").raise();

function mouseover(d) {
        // Hide labels and dots from initial animation
        g.selectAll(".end-label").style("opacity", 0);
        g.selectAll(".end-circle").style("opacity", 0);

        g.selectAll(".rank-line").style("opacity", 0.1);
        d3.select(d.data.department.line).style("opacity", 1);
        d.data.department.line.parentNode.appendChild(d.data.department.line);
        tooltip.attr("transform", "translate(" + x(d.data.year) + "," + y(d.data.rank) + ")")
        	.style("fill", colour(d.data.department.department))
        tooltip.select("text").text(d.data.department.department)
        	.attr("text-anchor", d.data.year == x.domain()[0] ? "start" : "middle")
        	.attr("dx", d.data.year == x.domain()[0] ? -10 : 0)
      }

function mouseout(d) {
      	g.selectAll(".rank-line").style("opacity", d => highlight.includes(d.department) ? 1 : 0.1);

        g.selectAll(".end-label").style("opacity", 1);
        g.selectAll(".end-circle").style("opacity", 1);
        tooltip.attr("transform", "translate(-100,-100)");
      }
    });
/*g.append("g")
 .attr("class", "axis")
 .attr("transform", "translate(" + xTrans + ",10)")
 .call(d3.axisLeft(y0).tickSize(0))
 .selectAll("text")
 .attr("y", -3)
 .attr("x", -15)
 .attr('font-size','15px');*/


