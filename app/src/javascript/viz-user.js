// Set up SVG
var w = 900;
var h = 500;


var svg = d3.select('.viz-user')
                        .append("svg")
                        .attr("width", w)
                        .attr("height", h);

var yTrans = 10;
var xTrans = 0;
var g = svg.append("g").attr("transform", "translate(" + 100 + "," + yTrans +")");


// Use indexOf to fade in one by one
var utenti = ['User1','User2','User3','User4','User5','User6','User7','User8','User9','User10'];
var info = ['num_tweet','num_foll','num_frien','num_pos','num_neg']


// Load data
d3.csv("../../../data/output/data_user.csv", function(error, data) {
      if (error) throw error;

      var parsedData = [];
      data.forEach((d) => {
        var dObj = {utente: d.utente, ranks: []};
        for (var information in d) {
          if (information != "utente") {
            if (d[information] != 0) {
            	dObj.ranks.push({information: information, rank: +d[information], utente: dObj});
            }
          }
        }
        parsedData.push(dObj);
      });

console.log(parsedData)

var xScale = d3.scalePoint()
          .domain(info)
          .range([0, w-150]);

var xAxis = d3.axisBottom(xScale)
             .scale(xScale)
             .tickSize(0);

g.append("g")
 .attr("class", "x axis")
 .attr("transform", "translate(0,850)")
 .call(xAxis)
 .selectAll("text")
 .attr("y", 10)
 .attr("x", 0)
 .attr('font-size','15px');



var yScale = d3.scalePoint()
                .domain(utenti)
                // Definisci il valore dell'altezza in cui è definito svg
                .range([0,h-50]);

var yAxis = d3.axisLeft(yScale)
             .scale(yScale)
             .tickSize(0);

g.append("g")
 .attr("class", "y axis")
 .attr("transform", "translate(0,0)")
 .call(yAxis)
 .selectAll("text")
 .attr("y", 0)
 .attr("x", -20)
 .attr('font-size','15px');


var lineFunction = d3.line()
                         .x(function(d) { return d.x; })
                         .y(function(d) { return d.y; })
                         .curve(d3.curveLinear);

var circles = g.selectAll("path-lines")
                  .data(parsedData)
                  .enter()
                  .append("path")
                  .attr('d', function (d) {toReturn = [];
                                                        for (var j=0; j<d.ranks.length; j++){
                                                                 toPush = {'y':yScale('User' + d.ranks[j].rank),
                                                                           'x': xScale(d.ranks[j].information)}
                                                                 toReturn.push(toPush);}

                                                        return lineFunction(toReturn);})
                  .attr('stroke','grey')
                  .attr("stroke-opacity", .1)
                  .attr("stroke-width", 5)
                  .attr("fill", "none")
                  .on('mouseover', function (d) {d3.select(this)
                                                   .transition()           // apply a transition
                                                   .duration(0)
                                                   .attr('class','active')
                                                   .attr('stroke','blue')
                                                   .attr('stroke-opacity',.8)})

                  .on('mouseout', function (d) {d3.select(this)
                                                  .attr('stroke', 'grey')
                                                  .attr('stroke-opacity', .1)
                                                  .classed('active', false)})

                  .on('click', function (d) {d3.select(this)
                                                .attr('class', 'clicked')
                                                .attr('stroke','green')
                                                .attr('stroke-opacity',.8)
                                                });


});