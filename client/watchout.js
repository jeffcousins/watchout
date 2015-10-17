var height = 450;
var width = 700;
var numEnemies = 30;
var highScore = 0;
var currentScore = 0;
var collisions = 0;

var svg = d3.select('body').append('svg').attr('width', width)
  .attr('height', height).style('background-color', '#aaa');

var createEnemies = function(numberOfEnemies) {
  var enemyArray = _.range(numberOfEnemies);
  // enemyArray should be [0,1,2,3,4,5,6,7,8,9,10...29]
  var enemyData = _.map(enemyArray, function(val, index, collection) {
    return {"cx": Math.floor(Math.random()*(width-50))+25,
            "cy": Math.floor(Math.random()*(height-50))+25,
            "r": 10,
            "fill": 'black'};
  });
  return enemyData;
};

var enemyData = createEnemies(numEnemies);

var enemies = svg.selectAll('circle').data(enemyData).enter().append('circle');

var enemyAttrs = enemies
                   .attr("cx", function (d) { return d.cx; })
                   .attr("cy", function (d) { return d.cy; })
                   .attr("r", function (d) { return d.r; })
                   .style("fill", function (d) { return d.fill; });

var relocate = function() {
  d3.selectAll('circle').transition()
    .duration(1000)
    .delay(function(d, i) {return i * 10})
    .attr('cx', function(d) { return Math.floor(Math.random()*600)+50; })
    .attr('cy', function(d) { return Math.floor(Math.random()*400)+25; })
    setTimeout(relocate, 1000);
};
setTimeout(relocate, 2000);

var updateScore = function() {

};

var updateHighScore = function() {

};

var getMousePosition = function() {

};
