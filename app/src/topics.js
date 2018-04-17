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


        //var Links = svg.append("a")
        //               .attr("xlink:href", "http://en.wikipedia.org/wiki/Matteo_Renzi");


        

        var boxes = svg.selectAll('rect')
                        .data(data)
                        .enter()
                        .append("a")
                        .attr("xlink:href", "http://en.wikipedia.org/wiki/prova")
                        .append('rect');



        var rect = boxes.attr('width', function (d) {return d.number_tweets;})

                           .attr('height', '180')
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

                                            //if (dataset[i].number_tweets + arrayX[i] + dataset[i].number_tweets > w-10){
                                            //       arrayX[i] = w - (coordinata + dataset[i-1].number_tweets)
                                            //       return arrayX[i];

                                            //}

                                            //else {arrayX[i] = coordinata
                                            //        return coordinata;};}

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
                           .attr('fill', "yellow")
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
                           .attr('x', function (d,i){return (arrayX[i] + widthX[i])/2;})
                           .attr('y', function (d,i){return (arrayY[i] + widthY[i])/2;})
                           .style('font-size', '30px')
                           .attr("font-family", "sans-serif")
						   .attr("fill", "blue")
						   .attr("transform", "translate(150,150) rotate(30)");});


