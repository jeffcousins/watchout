var height = 600;
var width = 800;
var numEnemies = prompt('hooman. how many emenys do u want?', 20);
var operationSpark = prompt('do u want to stop by Operation Spark? y or n');

if (operationSpark === 'y') {
  operationSpark = true;
} else if (operationSpark === 'n') {
  operationSpark = false;
}

var highScore = 0;
var currentScore = 0;
var collisionState = 'don\'t get hit, hooman';
var states = ['I CAME IN LIKE A WRECKINGBALL', 'everyone who ever loved u was wrong',
              'it\'s a good thing ur pretty', 'LOLOL', 'omg how did u not see that',
              'ur failurez shood be on the youtube', 'this is why people talk about u',
              'meow meow meow meow meow meow meow meow meow meow',
              'that\'s it. we r no longer friends.', '/giphy incompetence'];
var stateChange = true;
var playerLocation = { x: width/2, y: height/2 };
var numUpdates = 0;
var bgColor = '#FFF';
var wallColors = ['rgb(51,111,173)', 'rgb(91,66,119)', 'rgb(168,46,57)', 'rgb(200,200,125)',
                  'rgb(220,180,65)', 'rgb(94,159,64)', 'rgb(144,169,190)'];

if (operationSpark) {
  
  var randomRGB = function() {
    return wallColors[Math.floor(Math.random() * wallColors.length)];
  };

  // $('body').css('background-color', '#000');
  $('body').css('background-image', 
                'url("http://www.desktopas.com/files/2013/08/twilight-in-New-Orleans-painting-wallpaper-1600-x-1074.jpg")');
  $('.high').css('color', '#FFF');
  $('.current').css('color', '#FFF');
  $('.message span').css(
    {'background-color': 'white',
     'border-top-right-radius': '10px',
     'border-top-left-radius': '10px'
    });

} else {

  bgColor = '#000'
  
  var randomRGB = function() {
    var result = [];
    for (var i = 0; i < 3; i++) {
      result.push(Math.floor(Math.random() * 255));
    }

    return 'rgb(' + result.join(',') + ')';
  };

}

var updateScore = function() {
  d3.select('.current span').text(currentScore);
  d3.select('.high span').text(highScore);
  d3.select('.message span').text(collisionState);
};

var scoreCounter = function() {
  currentScore += 1;
  highScore = Math.max(currentScore, highScore);
  updateScore();
  setTimeout(scoreCounter, 100);
};

setTimeout(scoreCounter, 3000);

var dragmove = function(d) {
  var currentX = Math.max(1, Math.min(width - 17, d3.event.x));
  var currentY = Math.max(1, Math.min(height - 17, d3.event.y));

  d3.select(this)
    .attr('x', d.x = currentX)
    .attr('y', d.y = currentY);

  playerLocation.x = currentX;
  playerLocation.y = currentY;
};

var detectCollisions = function(enemy) {
  var enemyCx = parseFloat(enemy.attr('cx'));
  var enemyCy = parseFloat(enemy.attr('cy'));
  var playerCx = parseFloat(playerLocation.x);
  var playerCy = parseFloat(playerLocation.y);
  var enemyR = parseInt(enemy.attr('r'));
  var stateColor = enemy.style('fill');

  if (Math.hypot(enemyCx - playerCx, enemyCy - playerCy) < enemyR + 8) {
    enemy.style('stroke', ' white');
    currentScore = 0;
    if (stateChange) {
      stateChange = false;
      $('.message').css('color', stateColor);
      collisionState = states[Math.floor(Math.random() * states.length)];
      setTimeout(function() {
        stateChange = true;
        collisionState = 'don\'t get hit, hooman';
      }, 2400);
    }
  }
};

var tweenWithCollisionDetection = function() {
  var enemy = d3.select(this);

  return function() {
    detectCollisions(enemy);
  };
};

var svg = d3.select('body').append('svg').attr('width', width)
  .attr('height', height).style('background-color', bgColor).style('border-radius', '10px');

var drag = d3.behavior.drag()
    .origin(function(d) { return d; })
    .on("drag", dragmove);

var createEnemies = function(numberOfEnemies) {
  return _.range(numberOfEnemies);
};

var enemies = svg.selectAll('circle').data(createEnemies(numEnemies)).enter().append('circle')
  .attr('cx', function() { return Math.floor(Math.random()*width); })
  .attr('cy', function() { return Math.floor(Math.random()*height); })
  .attr('r',  function() { return Math.floor(Math.max(8, Math.random()*60)); })
  .attr('class', 'enemy')
  .style('fill', function () { return randomRGB(); });

var player = svg.selectAll('rect')
  .data([{x: width/2, y: height/2, width: 16, height: 16}])
  .enter().append('rect').call(drag);

player.attr('x', function(d) { return d.x; })
  .attr('y', function(d) { return d.y; })
  .attr('width', function(d) { return d.width; })
  .attr('height', function(d) { return d.height; })
  .style('fill', '#0077BB')
  .style('stroke', 'white');

var changeColor = function() {
  player.transition().duration(300)
      .style('fill', '#0077BB')
    .transition()
      .style('fill', '#00DDDD')
    .each('end', changeColor);
}

changeColor();

var relocate = function() {
  enemies.transition()
    .duration(2500)
    .delay(function(d, i) {return i * 10})
    .attr('cx', function(d) {
      return Math.floor(Math.random()*width); })
    .attr('cy', function(d) {
      return Math.floor(Math.random()*height); })
    .attr('r', function(d) {
      return Math.floor(Math.max(15, Math.random()*70)); })
    .style('fill', function(d) { return randomRGB(); })
    .tween('custom', tweenWithCollisionDetection)
    .each('end', function() {
      relocate();
    });
};

setTimeout(relocate, 3000);
