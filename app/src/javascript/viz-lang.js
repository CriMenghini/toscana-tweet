var svg1 = d3.select('.viz-lang')
            .append("svg")
            .attr("width", 900)
            .attr("height", 500);

var margin_ = {top: 20, right: 20, bottom: 110, left: 40},
    margin2_ = {top: 430, right: 20, bottom: 30, left: 40},
    width_ = +svg1.attr("width") - margin_.left - margin_.right,
    height_ = +svg1.attr("height") - margin_.top - margin_.bottom,
    height2_ = +svg1.attr("height") - margin2_.top - margin2_.bottom;

var parseDate_ = d3.timeParse("%m/%d/%Y %H:%M");

var x_ = d3.scaleTime().range([0, width_]),
    x2_ = d3.scaleTime().range([0, width_]),
    y_ = d3.scaleLinear().range([0, height_]),
    y2_ = d3.scaleLinear().range([0, height2_]);

var xAxis_ = d3.axisBottom(x_),
    xAxis2_ = d3.axisBottom(x2_),
    yAxis_ = d3.axisLeft(y_);

var brush2 = d3.brushX()
    .extent([[0, 0], [width_, height2_]])
    .on("brush end", brushed_);

var zoom2 = d3.zoom()
    .scaleExtent([1, Infinity])
    .translateExtent([[0, 0], [width_, height_]])
    .extent([[0, 0], [width_, height_]])
    .on("zoom", zoomed_);



    var clip2 = svg1.append("defs").append("svg:clipPath")
        .attr("id", "clipRect")
        .append("svg:rect")
        .attr("width", width_)
        .attr("height", height_)
        .attr("x", 0)
        .attr("y", 0);


    var Line_chart2 = svg1.append("g")
        .attr("class", "focusRect")
        .attr("transform", "translate(" + margin_.left + "," + margin_.top + ")")
        .attr("clip-path", "url(#clipRect)");


    var focus2 = svg1.append("g")
                    .attr("class", "focusRect")
                    .attr("transform", "translate(" + margin_.left + "," + margin_.top + ")");

    var context2 = svg1.append("g")
        .attr("class", "contextRect")
        .attr("transform", "translate(" + margin2_.left + "," + margin2_.top + ")");

d3.csv("../../../data/output/CIMIS_Station_125.csv", type, function (error, data) {
  if (error) throw error;

  x_.domain(d3.extent(data, function(d) { return d.Date; }));
  y_.domain([d3.max(data, function (d) { return d.Air_Temp; }),0]);
  x2_.domain(x_.domain());
  y2_.domain(y_.domain());


    focus2.append("g")
        .attr("class", "axis axis--x-rect")
        .attr("transform", "translate(0," + height_ + ")")
        .call(xAxis_);

    focus2.append("g")
        .attr("class", "axis axis--y-rect")
        .call(yAxis_);

    Line_chart2.selectAll(".bars")
              .data(data)
              .enter()
              .append("rect")
              .attr('x', function (d) {return x_(d.Date)})
              .attr('y', function (d) {return height_ - d.Air_Temp})
              .attr('height', function (d) {return d.Air_Temp})
              .attr('width', 20)
              .attr('class', 'bar-big')
              .style('fill','red');

    context2.selectAll(".bars")
              .data(data)
              .enter()
              .append("rect")
              .attr('x', function (d) {return x2_(d.Date)})
              .attr('y',  function (d) {return height2_ - d.Air_Temp})
              .attr('height', function (d) {return d.Air_Temp})
              .attr('width', 20)
              .attr('class', 'bar-small')
              .style('fill','red');

    context2.append("g")
          .attr("class", "axis axis--x-rect")
          .attr("transform", "translate(0," + height2_ + ")")
          .call(xAxis2_);

      context2.append("g")
          .attr("class", "brush-rect")
          .call(brush2)
          .call(brush2.move, x_.range());

  svg1.append("rect")
      .attr("class", "zoom-rect")
      .attr("width", width_)
      .attr("height", height_)
      .attr("transform", "translate(" + margin_.left + "," + margin_.top + ")")
      .call(zoom2);


  console.log(data);
});

function brushed_() {
  if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom-rect") return; // ignore brush-by-zoom
  var s = d3.event.selection || x2_.range();
  x_.domain(s.map(x2_.invert, x2_));
  Line_chart2.select("bar-big");
  focus2.select(".axis--x-rect").call(xAxis_);
  svg1.select(".zoom-rect").call(zoom2.transform, d3.zoomIdentity
      .scale(width_ / (s[1] - s[0]))
      .translate(-s[0], 0));
}

function zoomed_() {
  if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush-rect") return; // ignore zoom-by-brush
  var t = d3.event.transform;
  x_.domain(t.rescaleX(x2_).domain());
  Line_chart2.select("bar-big");
  focus2.select(".axis--x-rect").call(xAxis_);
  context2.select(".brush-rect").call(brush2.move, x_.range().map(t.invertX, t));
}

function type(d) {
  d.Date = parseDate_(d.Date);
  d.Air_Temp = +d.Air_Temp;
  d.Wind_Speed = +d.Wind_Speed;
  return d;
}
