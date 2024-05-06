// /**
//  * @type HTMLCanvasElement
//  */
//   const canvas = document.getElementById("canvas");
//   const c = canvas.getContext("2d");

var canvas = document.querySelector('canvas');
//var canvas = document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');


//Simple form of text rendering
// c.font = 'bold 10pt Calibri';
// c.fillText('Hello World!', 150, 100);
// c.font = 'italic 40pt Times Roman';
// c.fillStyle = 'blue';
// c.fillText('Hello World!', 200, 150);
// c.font = '60pt Calibri';
// c.lineWidth = 4;
// c.strokeStyle = 'blue';
// c.strokeText('Hello World!', 70, 70);







//Rectangle
// c.fillStyle = 'rgba(255,0,0,1)';
// c.fillRect(100, 100, 100, 100);

// c.fillStyle = 'rgba(0,255,0,1)';
// c.fillRect(250, 100, 100, 100);

// c.fillStyle = 'rgba(255,0,0,0.8)';
// c.fillRect(450, 400, 100, 100);
// c.fillStyle = 'rgba(0,255,0,0.8)';
// c.fillRect(400, 425, 100, 100);
// c.fillStyle = 'rgba(0,0,255,0.8)';
// c.fillRect(350, 375, 100, 100);

//Random Rectangle 
// for (var i = 0; i < 30; i++) {
//   var x = Math.random() * window.innerWidth;
//   var y = Math.random() * window.innerHeight;

//   c.fillStyle = 'rgba(0,0,0,0.8)';
//   c.fillRect(x, y, 100, 100);
// }

//Console
//console.log(canvas);


//Line
// c.beginPath();
// c.moveTo(200, 100);
// c.lineTo(400, 100);
// c.lineTo(400, 200);
// c.strokeStyle = "rgba(255,0,0,1)"
// c.stroke();

//Arc / circle
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = 'blue';
// c.stroke();
//Arc / circle Randome generated
// for (var i = 0; i < 3; i++) {
//   var x = Math.random() * window.innerWidth;
//   var y = Math.random() * window.innerHeight;
//   var r = Math.random() * 100;
//   c.beginPath();
//   c.arc(x, y, r, 0, Math.PI * 2, false);
//   c.strokeStyle = 'blue';
//   c.stroke();
// }
var mouse = {
  x: undefined,
  y: undefined
}

function writeText() {
  c.textAlign = "center";

  c.font = ' 30px Anton';
  c.fillStyle = 'white';
  c.fillText('Created on', canvas.width/2, canvas.height/3);

  c.font = '150px Anton';
  c.lineWidth = 4;
  c.strokeStyle = 'white';
  c.strokeText('01 April 2024', canvas.width/2, canvas.height/2);

  c.font = ' 70px Anton';
  c.fillStyle = 'white';
  c.fillText('Ansh Kumar Triapthi', canvas.width/2, (canvas.height/20)*13);
}

var maxRadius = 40;
//var minRadius = ra;

var colorArray = [
  '#034159',
  '#025951',
  '#02735E',
  '#038C3E',
  '#731702'
];

window.addEventListener('mousemove', function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
})

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  // draws a circle
  this.draw = function () {
    //cirlce declare
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  //make the circle move
  this.update = function () {
    // x direction  moment
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    // y direction moment
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    //circle movement
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;

    //interactivity
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if (this.radius < maxRadius) {
        this.radius += 2;
      }
    }
    else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  }
}

var circleArray = [];
function init() {
  circleArray = [];
  for (var i = 0; i < 1000; i++) {
    var radius = Math.random() * 3 + 1;

    //distance 
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;

    //velocity
    var dx = (Math.random() - 0.5) * 1;
    var dy = (Math.random() - 0.5) * 1;

    circleArray.push(new Circle(x, y, dx, dy, radius));
  }

}
function animate() {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, innerWidth, innerHeight);

  writeText();

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}
init();
animate();

