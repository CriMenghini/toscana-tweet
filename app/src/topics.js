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
                        .append("a")
                        .attr("xlink:href", function (d,i){return "http://en.wikipedia.org/wiki/"+topicArray[i];})
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

        var hashText =  svg.selectAll('text')
                           .data(data)
                           .enter()
                           .append('text')
                           .text(function (d,i){
                                    for (j=0; j<listHashtag[i].length; j++){

                                   return listHashtag[i][j]; }

                           ;})
                           .attr('x', function (d,i){
                                    if (i==0 ){return (arrayX[i] + widthX[i])/2; }

                                    else if (data[i-1].number_tweets + arrayX[i-1] + 10 + data[i-1].number_tweets < w-10)
                                        {return (arrayX[i-1] + widthX[i-1] + 10 + arrayX[i] + widthX[i])/2;}

                                     else {return (arrayX[i] + widthX[i])/2}
                           ;})
                           .attr('y', function (d,i){
                                    if (i==0){
                                    heightY[i] = (arrayY[i] + widthY[i])/2
                                    return heightY[i] ;}

                                    else if (indexRow[i] == indexRow[i-1])
                                    {heightY[i] = heightY[i-1]
                                    return heightY[i];}

                                     else if (indexRow[i] != indexRow[i-1]) {
                                         heightY[i] = heightY[i-1] + 200
                                         return (heightY[i-1] + 200);};})
                           .style('font-size', '12px')
                           .attr("font-family", "sans-serif")
						   .attr("fill", "white")
						   .attr("transform", "rotate(0)");});




