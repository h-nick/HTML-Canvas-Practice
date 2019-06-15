/* LECTURE 3 */

let dpi = window.devicePixelRatio;
let canvas = document.querySelector('canvas');
canvas.height = window.innerHeight * dpi;
canvas.width = window.innerWidth * dpi;
let ctx = canvas.getContext('2d');

let colors = ['red', 'green', 'blue', 'yellow', 'gray', 'purple', 'black'];
// We're going to create multiple circles.
// This is pretty much is a Circle object constructor.
// We don't use ES6 arrow functions so we can have the "this" operator.
function Circle(r) {
	this.r = r;

	// We do (window.innerWidth/Height - this.r * 2) to take into consideration the diameter of the circle.
	// This will avoid circles getting stuck in the corners of the canvas.
	this.x = Math.random() * (window.innerWidth - this.r * 2) + this.r;
	this.y = Math.random() * (window.innerHeight - this.r * 2) + this.r;
	this.dx = (Math.random() - 0.5) * 15;
	this.dy = (Math.random() - 0.5) * 15;
	
	this.draw = () => {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
		ctx.fillStyle = "red";
		ctx.strokeStyle = "blue";
		ctx.stroke();
		ctx.fill();
		ctx.closePath();
	}

	this.init = () => {
		if(this.x + this.r > window.innerWidth || this.x - this.r < 0) {
			this.dx = -(this.dx);
		}
	
		if(this.y + this.r > window.innerHeight || this.y - this.r < 0) {
			this.dy = -(this.dy);
		}

		this.x += this.dx;
		this.y += this.dy;

		this.draw();
	}
}

let circles = [];
for(let i = 0; i <= 50; i++) {
	circles.push(new Circle(30));
}

// Animation function
function animate() {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

	for(let circle of circles) {
		circle.init();
	}
}

animate();