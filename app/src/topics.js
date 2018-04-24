var w=800; // farlo dipendente dal max numero di tweet in un argomento
var h=800;

d3.json("../../data/output/topic_squares.json", function(data) {


        var arrayWidth = new Array(data.length);

        for (var i = 0; i < arrayWidth.length; i++){
            arrayWidth[i] = data.number_tweets
        };


        var arrayX = new Array(data.length)
        var arrayY = new Array(data.length)
        var indexRow = new Array(data.length)
        var topicArray = new Array(data.length)
        var listHashtag = new Array(data.length)
        var widthX = new Array(data.length)
        var widthY = new Array(data.length)
        var heightY = new Array(data.length)

        for (i=0; i<data.length; i++){
            listHashtag_ = data[i].hashtags
            listHashtag[i] = new Array(listHashtag_.length)
            for (j=0; j< listHashtag[i].length; j++){

                listHashtag[i][j] = '#' + data[i].hashtags[j][0]

            ;};}



        for (i=0; i<data.length; i++){
        topicArray[i] = data[i].topic;}


        var svg = d3.select('.flex-container')
                        .append("svg")
                        .attr("width", w)
                        .attr("height", h);



        var boxes = svg.selectAll('rect')
                        .data(data)
                        .enter()
                        .append("svg")
                        //.append('a')
                        //.attr("xlink:href", function (d,i){return "http://en.wikipedia.org/wiki/"+topicArray[i];})
                        .append('rect');



        var rect = boxes.attr('height', '180')
                           .attr('x', function (d,i) {

                                if (i==0){

                                    arrayX[i] = 10
                                    indexRow[i] = 0
                                    widthX[i] = data[i].number_tweets
                                    return 10;}

                                else {
                                     // creare coordinata x del rettangolo
                                     var coordinata = data[i-1].number_tweets + arrayX[i-1] + 10
                                     widthX[i] = data[i].number_tweets

                                     // se il valore della coordinata + la lunghezza è > w porta x a 10
                                     if (coordinata + data[i-1].number_tweets < w-10){

                                            arrayX[i] =  coordinata
                                            indexRow[i] = indexRow[i-1]

                                            return coordinata;}



                                     else {arrayX[i] =  10
                                            indexRow[i] = indexRow[i-1] + 1

                                           return arrayX[i];};};})
                           .attr('y', function (d,i) {

                                if (i==0){

                                    arrayY[i] = 10
                                    widthY[i] = 180
                                    return 10;}

                                else if (indexRow[i] == indexRow[i-1]){

                                        arrayY[i] = arrayY[i-1]
                                        widthY[i] = 180
                                        return arrayY[i];}

                                else if (indexRow[i] != indexRow[i-1]){

                                        arrayY[i] = arrayY[i-1] + 200
                                        widthY[i] = 180
                                        return arrayY[i];}

                            })
                           .attr('width', function (d,i) {
                                                if (i==0){
                                                    return d.number_tweets;}
                                                else {
                                                     // creare coordinata x del rettangolo
                                                     var coordinata = data[i-1].number_tweets + arrayX[i-1] + 10

                                                     // se il valore della coordinata + la lunghezza è > w porta x a 10
                                                     if (coordinata + data[i-1].number_tweets < w-10){

                                                            if (data[i].number_tweets + arrayX[i] + 10 + data[i].number_tweets > w-10) {

                                                            return w-10-arrayX[i];}

                                                            else {return d.number_tweets;};}



                                                     else {return d.number_tweets;};};
                                                })
                           .attr('fill', "#b3d9ff")
                           .attr("rx", 10)
                           .attr("ry", 10);


        // create array
var arrayTopicHash = new Array();
for (k = 0; k < data.length; k++){arrayTopicHash[k] = data[k].hashtags.slice(0,5) };
console.log (arrayTopicHash);

// per i nella lunghezza dell'array
for (var l = 0; l < data.length; l++){
var previousY = new Array(arrayTopicHash[l].length)
var hashText =  svg.selectAll('text-hash')
           .data(arrayTopicHash[l])
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
                                         //console.log(rectangle.width)


                                         if (0 + lunghezzaPixel > widthX[l]){
                                             //var newX = ;
                                             //var newY = ;
                                            if (lunghezzaPixel + 0 > 180)
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
             .attr('font-size', function(d,i){return Math.sqrt(d[1])*3})
;};});






