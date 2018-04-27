// Set up SVG
var w = '90%';
var h = 600;

// Define the SVG
var svg = d3.select('.viz-retweet')
            .append("svg")
            .attr("width", w)
            .attr("height", h);


// Declare fake data (2 top tweets)
var dataset = [
                {'tweet':'RT @GianniCuperIoPD: Dopo il discorso di #Renzi abbiamo perso un altro 5%.#elezioni2018',
                'num_RT': 21,
                'user': 'Gianni Kuperlo',
                'user_followers': 36159,
                'user_friends': 1695,
                'user_id': 1566553698},
                {'tweet':'RT @GiorgiaMeloni: A #Livorno i centri sociali ci impediscono persino di passeggiare nella piazza. Ecco la DEMOCRAZIA di cui parlano tanto…',
                 'num_RT': 15,
                 'user': 'Giorgia Meloni ن',
                 'user_followers': 646804,
                 'user_friends': 689,
                 'user_id': 130537001},
                 {'tweet':'RT @GianniCuperIoPD: Dopo il discorso di #Renzi abbiamo perso un altro 5%.#elezioni2018',
                'num_RT': 21,
                'user': 'Gianni Kuperlo',
                'user_followers': 36159,
                'user_friends': 1695,
                'user_id': 1566553698},
                {'tweet':'RT @GiorgiaMeloni: A #Livorno i centri sociali ci impediscono persino di passeggiare nella piazza. Ecco la DEMOCRAZIA di cui parlano tanto…',
                 'num_RT': 15,
                 'user': 'Giorgia Meloni ن',
                 'user_followers': 646804,
                 'user_friends': 689,
                 'user_id': 130537001},
                 {'tweet':'RT @GianniCuperIoPD: Dopo il discorso di #Renzi abbiamo perso un altro 5%.#elezioni2018',
                'num_RT': 21,
                'user': 'Gianni Kuperlo',
                'user_followers': 36159,
                'user_friends': 1695,
                'user_id': 1566553698},
                {'tweet':'RT @GiorgiaMeloni: A #Livorno i centri sociali ci impediscono persino di passeggiare nella piazza. Ecco la DEMOCRAZIA di cui parlano tanto…',
                 'num_RT': 15,
                 'user': 'Giorgia Meloni ن',
                 'user_followers': 646804,
                 'user_friends': 689,
                 'user_id': 130537001},
                 {'tweet':'RT @GianniCuperIoPD: Dopo il discorso di #Renzi abbiamo perso un altro 5%.#elezioni2018',
                'num_RT': 21,
                'user': 'Gianni Kuperlo',
                'user_followers': 36159,
                'user_friends': 1695,
                'user_id': 1566553698},
                {'tweet':'RT @GiorgiaMeloni: A #Livorno i centri sociali ci impediscono persino di passeggiare nella piazza. Ecco la DEMOCRAZIA di cui parlano tanto…',
                 'num_RT': 15,
                 'user': 'Giorgia Meloni ن',
                 'user_followers': 646804,
                 'user_friends': 689,
                 'user_id': 130537001},
                 {'tweet':'RT @GianniCuperIoPD: Dopo il discorso di #Renzi abbiamo perso un altro 5%.#elezioni2018',
                'num_RT': 21,
                'user': 'Gianni Kuperlo',
                'user_followers': 36159,
                'user_friends': 1695,
                'user_id': 1566553698},
                {'tweet':'RT @GiorgiaMeloni: A #Livorno i centri sociali ci impediscono persino di passeggiare nella piazza. Ecco la DEMOCRAZIA di cui parlano tanto…',
                 'num_RT': 15,
                 'user': 'Giorgia Meloni ن',
                 'user_followers': 646804,
                 'user_friends': 689,
                 'user_id': 130537001}];


// Declare ranking (yAxis)
var data = [0,1,2,3,4,5,6,7,8,9]
var data2 = [1,2,3,4,5,6,7,8,9,10]
var dataAltezza = [3,4,5,6,7,8,9,10,11,12]

// Define the group for the plot and the point to translate it on the xaxis
var xTran = 430;
var g = svg.append("g").attr("transform", "translate(" + 30 + ",40)");


// Scale yAxis
var y0 = d3.scalePoint()
            .domain(data)
            .range([0, h - 400]);


// Declare the tooltip div
var tipTool = d3.select("body")
	            .append("div")  // declare the tooltip div
	            .attr("class", "tooltip") // apply the 'tooltip' class
	            .style("opacity", 0);


// Append labels to ticks
g.append("g")
 .attr("class", "axis")
 .attr("transform", "translate(" + xTran + ",10)")
 .call(d3.axisLeft(y0).tickSize(0))
 .selectAll("text")
 .attr("y", -3)
 .attr("x", -15)
 .attr('font-size','15px')
 .data(dataset) // Declare data to make the plot interactive
 .on('mouseover', function(d,i) {
                            // Let the tooltip appear
                            tipTool.transition()
				                   .duration(200)
				                   .style("opacity", 14)
				                   .style("display", "block") ;
			                // Fill in the tooltip with html
			                tipTool.html('<br>' + d.tweet + '<br>Numero di retweet:' + d.num_RT +
			                             '<br> Autore:' + d.user + '<br> Nr. follower '+d.user_followers +
			                             '<br>Nr. amici' + d.user_friends)
				                    .style("right", '600px') // make it appear always in the same place (need to check it again -not in svg)
				                    .style("top", "900px");

                            // Color the label when the mouse hovers
                            d3.select(this).style('fill','red');

                            // Define function to select and color the row of squares that corresponds to the label
                            function myfunction(d,i) {return 'rect.class'+i};

                            // Run the function
			                var classNameProva = myfunction(d,i);

                            // Color the row of squares
			                d3.selectAll(classNameProva)
			                  .style('fill','green').attr('height',16)
                              .attr('width',16)
                              .attr("transform", "translate(" + 0 + ",-1)");
                              })
   .on("mouseout", function(d,i){
                             tipTool.transition()  //Opacity transition when the tooltip disappears
                                    .duration(500)
                                    .style("opacity", "0")
                                    .style("display", "none");

                             // Get the origin color back
                             d3.select(this).style('fill','black');

                             function myfunction(d,i) {return 'rect.class'+i};

			                 var classNameProva = myfunction(d,i);

                             d3.selectAll(classNameProva)
                               .style('fill','blue')
                               .attr('height',12)
                               .attr('width',12)
                               .attr("transform", "translate(" + 0 + ",+1)");
                               });


var w1 = '98%';
var h1 = (h - 20)/data.length*10;
var indicator = 0

g.selectAll('.bar')
 .data(dataset)
 .enter()
 .append("svg")      // Append one svg per object in dataset
 .attr("width", w1)
 .attr("height", h1)
 .attr('id', function (d,i){return i})
 .selectAll("rect")
 .data(function(d,i) {       // Inherit data from svg by mapping of objects
                 // Create an array of number of required rects
                 var rangeArray = d3.range(d.num_RT).map(function(d,i) {return d*10;})
                 var c = [];
                 var trialLL = new Array(rangeArray.length+1).join(i).split('');
                 for (var j = 0; j < rangeArray.length; j++){
                          c.push([rangeArray[j], trialLL[j]]);}
                 return c;})

 .enter().append("rect")
 .attr('class',function (d){return 'class'+d[1];})
 .attr('height',12)
 .attr('width',12)
 .attr('x',  function(d) {return xTran + 20 + d[0]*2;})
 .attr('y', function (d,i) {return y0(d[1]);})
 .attr('fill','blue');










