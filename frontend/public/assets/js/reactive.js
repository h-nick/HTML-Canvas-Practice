/* LECTURE 4 */

/* If we want our animations to interact with the user, we'll have to use event listeners.
Event listeners execute a function repeatedly as long as an specific event is happening on the screen.
For example: Mouse movement, click events, touch events, etc.
*/

// CANVAS INIT
let dpi = window.devicePixelRatio;
let canvas = document.querySelector('canvas');
canvas.height = window.innerHeight * dpi;
canvas.width = window.innerWidth * dpi;
let ctx = canvas.getContext('2d');

let circles = [];

// Resize canvas in a responsive way.
window.addEventListener('resize', () => {
	canvas.height = window.innerHeight * dpi;
	canvas.width = window.innerWidth * dpi;

	circles = [];
	start();
});


let mouseCoords = {
	x: undefined,
	y: undefined
}

window.addEventListener('mousemove', (event) => {
	mouseCoords.x = event.x; // Get cursor X pos.
	mouseCoords.y = event.y; // Get cursor Y pos.
});

// CANVAS
let colors = [
	'#123638', '#FF625E', '#FFA08B', '#FFCDAC', '#FCE9CC',
	'#801B14', '#F2E4A4', '#A19D77', '#2A2B24', '#E0493F',
	'#FF8A47', '#FC6170', '#8CEEEE', '#26BFBF', '#FFD747'
];

function Circle() {
	this.dx = (Math.random() * 6) - 3;
	this.dy = (Math.random() * 6) - 3;
	this.r = Math.floor(Math.random() * (10 - 3)) + 3;
	this.maxRadi = this.r * 10; // Ensure the max radius in 10 times the original one.
	this.minRadi = this.r; // Ensure the min radius is the original one.
	this.x = Math.random() * (window.innerWidth - this.r * 2) + this.r;
	this.y = Math.random() * (window.innerHeight - this.r * 2) + this.r;
	this.color = colors[Math.floor(Math.random() * colors.length)]; // Pick a random color!
	
	this.draw = () => {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.strokeStyle = this.color;
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

		// Interactivity
		// This alone would cause all circles to the right of the cursor to grow unstoppably.
		//if(mouseCoords.x - this.x < 50) 
		
		// Only grow circles within 50px of our cursor (x axis).
		if(
			mouseCoords.x - this.x < 50 &&
			mouseCoords.x - this.x > -50 &&
			mouseCoords.y - this.y < 50 &&
			mouseCoords.y - this.y > -50
		) {
			if(this.r < this.maxRadi) this.r += 5;
		} else if(this.r > this.minRadi) {
			this.r -= 5;
		}

		this.draw();
	}
}

const start = () => {
	for(let i = 0; i <= 500; i++) {
		circles.push(new Circle());
	}
}

const animate = () => {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

	for(let circle of circles) {
		circle.init();
	}
}

start();
animate();