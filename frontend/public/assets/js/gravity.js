/* LECTURE 5: Gravity */

/* The effect of gravity is attained by adding acceleration to the object. Instead of falling at a constant
speed, it falls faster and faster until it hits the ground.

When an object hits the ground, two things happen:
1. The object loses energy due to friction.
2. It's y-axis velocity reverses.
*/

let dpi = window.devicePixelRatio;
let canvas = document.querySelector('canvas');
canvas.height = window.innerHeight * dpi;
canvas.width = window.innerWidth * dpi;
let ctx = canvas.getContext('2d');

function randomIntFromRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
  
function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}
  
function distance(x1, y1, x2, y2) {
	const xDist = x2 - x1;
	const yDist = y2 - y1;
  
	return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

addEventListener('click', () => {
	init();
})

// Objects
function Ball(x, y, radius, color, dy) {
    this.x = x;
	this.y = y;
	this.dy = dy;
	this.dx = randomIntFromRange(-3, 3);
    this.radius = radius;
	this.color = color;
	this.gravity = 1;
	this.friction = 0.90; // Must always be a fraction. The higher it is, the less friction applied.
	
	this.draw = () => {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}

	this.update = () => {
		// We take into account dy velocity to avoid stickiness to the walls.
		if(this.y + this.radius + this.dy > window.innerHeight) {
			// We need to add friction to make it more realistic.
			// We have to make sure dy decreases everytime the ball hits the ground.
			
			this.dy = -this.dy * this.friction; // Bounce + friction.
		} else {
			/* Give the illusion of gravity. As long as it's not on on the bottom of the screen
			we'll add 1 to the dy velocity, causing the ball to go down faster and faster.
			As soon as it hits the bottom, dy will reverse and become a negative number.
			This causes the ball to go upward and, since we are adding possitive 1, slow down over time.
			It will eventually reach 0, stop going upward and then dy will become possitive and it will
			start falling again. This simple if() gives both the illusion of gravity and a bouncing effect.

			Protip: It's peak will always be the spawn point.
			*/
			this.dy += this.gravity;
		}

		// We take into account dx velocity to avoid stickiness to the walls.
		if(
			this.x + this.radius + this.dx > window.innerWidth ||
			this.x - this.radius + this.dx < 0
		) {
			this.dx = -this.dx;
		}

		this.y += this.dy;
		this.x += this.dx; // We also have dx.
		this.draw();
	}
}

// Implementation
let objects = [];
function init() {
	objects = [];

	for(let i = 0; i < 250; i++) {
		objects.push(new Ball(
			randomIntFromRange(30, window.innerWidth - 30),
			randomIntFromRange(30, window.innerHeight - 30),
			randomIntFromRange(10, 25),
			randomColor(['red', 'blue', 'yellow', 'cyan', 'black', 'green', 'orange']), 5
		));
	}
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	for(let ball of objects) {
		ball.update();
	}
}

init()
animate()