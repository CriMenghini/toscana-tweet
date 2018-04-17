var w=800; // farlo dipendente dal max numero di tweet in un argomento
var h=800;

d3.json("../../data/output/topic_squares.json", function(data) {

//var dataset = [{"topic": 8, "hashtags": [["news", 142], ["5marzo", 18], ["italia", 18], ["elezionipolitiche", 9],
//                ["pistoia", 7], ["senato", 7]], "number_tweets": 129}, {"topic": 15, "hashtags": [["toscana", 148]],
  //               "number_tweets": 96}, {"topic": 17, "hashtags": [["elezioni2018", 881]], "number_tweets": 418},
    //              {"topic": 19, "hashtags": [["firenze", 988]], "number_tweets": 289}, {"topic": 0, "hashtags": [["nardella", 153],
      //            ["idydiene", 70], ["risorse", 62], ["papediaw", 48], ["fiorentina", 30], ["razzismo", 27], ["africa", 24],
        //           ["ordine", 22], ["caos", 22], ["senegalesi", 19], ["ultimora", 18], ["palermo", 17], ["senegalese", 17],
          //          ["senegal", 17], ["5febbraio", 13], ["somalia", 13], ["iosonoantifascista", 13], ["immigrazion", 13],
            //         ["astori", 12], ["fioriere", 11], ["omicidio", 9], ["presidio", 9], ["pirrone", 9], ["polizia", 7],
              //       ["davideastori", 6], ["solidali", 6], ["sindaco", 6], ["id", 6]], "number_tweets": 114},
                //      {"topic": 16, "hashtags": [["lucca", 91]], "number_tweets": 70}, {"topic": 11,
                  //    "hashtags": [["livorno", 964]], "number_tweets": 271}, {"topic": 2, "hashtags": [["arezzo", 143],
                    //   ["pisa", 119], ["siena", 96]], "number_tweets": 154}];

var arrayWidth = new Array(data.length);

for (var i = 0; i < arrayWidth.length; i++){
    arrayWidth[i] = data.number_tweets
};


var arrayX = new Array(data.length)
var arrayY = new Array(data.length)
var indexRow = new Array(data.length)


var svg = d3.select('.flex-container')
                .append("svg")
                .attr("width", w)
                .attr("height", h);




var boxes = svg.selectAll('rect')
                .data(data)
                .enter()
                .append('rect');

var rect = boxes.attr('width', function (d) {return d.number_tweets;})

                   .attr('height', '180')
                   .attr('x', function (d,i) {

                        if (i==0){

                            arrayX[i] = 10
                            indexRow[i] = 0
                            return 10;}

                        else {
                             // creare coordinata x del rettangolo
                             var coordinata = data[i-1].number_tweets + arrayX[i-1] + 10

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

                            return 10;}

                        else if (indexRow[i] == indexRow[i-1]){

                                arrayY[i] = arrayY[i-1]
                                return arrayY[i];}

                        else if (indexRow[i] != indexRow[i-1]){

                                arrayY[i] = arrayY[i-1] + 200
                                return arrayY[i];}

                    })
                   .attr('fill', "yellow")
                   .append("a")
                    .attr("xlink:href", "http://en.wikipedia.org/wiki/Matteo_Renzi");


                    });


