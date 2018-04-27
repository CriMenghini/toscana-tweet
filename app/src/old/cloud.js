var w=500; // farlo dipendente dal max numero di tweet in un argomento
var h=500;
var rectW = 100;
var rectH = 150;


dataset = [["news", 142], ["5marzo", 18], ["italia", 18], ["elezionipolitiche", 9], ["pistoia", 7], ["senato", 7]]
var previousY = new Array(dataset.length)



var svg = d3.select('.viz-cloud')
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);


var rectangle = svg.append("rect")
                   .attr('x', 0)
                   .attr('y', 0)
                   .attr('width', 100)
                   .attr('height',150)
                   .attr('fill', 'grey');

var words = svg.selectAll('text-hash')
                     .data(dataset)
                     .enter()
                     .append('text')
                     .text(function (d) {return d[0]})
                     .attr('id', function (d,i){return i})
                     .style('fill','blue')
                     .attr('x', function (d,i) {return 0})

                     .attr("transform", function (d,i) {
                                                        var el = document.getElementsByTagName('text');
                                                 var found;
                                                 for (var i = 0; i < el.length; i++) {if (el[i].textContent == d[0]) {
                                                                found =  el[i];
                                                                break;
                                                              }
                                                            }
                                                 var lunghezzaPixel = found.getComputedTextLength()
                                                 console.log(rectangle.width)


                                                 if (0 + lunghezzaPixel > rectW){
                                                     //var newX = ;
                                                     //var newY = ;
                                                    if (lunghezzaPixel + 0 >rectH)
                                                        {previousY[i] = lunghezzaPixel+0;

                                                            return "translate(50,"+(lunghezzaPixel+0)+") rotate(-90)"}

                                                    else {previousY[i] = lunghezzaPixel+0;

                                                          return "translate(50,"+(lunghezzaPixel)+") rotate(-90)"}}


                                                 else {
                                                         if (i == 10){previousY[i] = 20;
                                                                     return "translate(0,20) rotate(0)"}

                                                         else {
                                                             previousY[i] = previousY[i-1]+2*5;
                                                            // privous plus previous font
                                                            return "translate(0,"+(previousY[i-1]+2*8)+") rotate(0)"}
                                                         }
                                                        })
                     .attr('y', 0)
                     .attr('font-size', function(d,i){return Math.sqrt(d[1])*3});//function (d,i) {return i*d[1]/2});

console.log(previousY)