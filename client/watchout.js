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




var updateScore = function() {

};

var updateHighScore = function() {

};

var getMousePosition = function() {

};
