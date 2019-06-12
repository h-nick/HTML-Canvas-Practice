/* LECTURE 2 */

// Canvas init.
let dpi = window.devicePixelRatio;
let canvas = document.querySelector('canvas');
canvas.height = window.innerHeight * dpi;
canvas.width = window.innerWidth * dpi;
let ctx = canvas.getContext('2d');

/* Animation works by refreshing the canvas over and over and changing the position (x and y values) of an
object by small amounts each time. */

let x = Math.random() * window.innerWidth;
let y = Math.random() * window.innerHeight;

// dx and dy stand for x velocity variation and y velocity variation
// Needless to say, the higher the rate of change is for (x, y), the faster the animation will be.
let dx = (Math.random() - 0.5) * 15;
let dy = (Math.random() - 0.5) * 15;
let r = 30;

// Animation function
function animate() {
	/* This is a metafunction. requestAnimationFrame() is called inside animate() and receives animate() itself
	as a callback. This will effectively create a loop that we will use for animation purposes. */
	requestAnimationFrame(animate);

	/* clearRect() is like a paint eraser. It will start at an (x, y) position and erase all canvas elements
	within a certain height and width. We make sure to erase the whole canvas every time before drawing a
	circle. This way, we'll create a moving circle instead of a circle that becomes a long 3D tunnel.
	(You may delete clearRect() to watch that effect instead). */
	ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

	// Draw a circle with changing (x, y) position.
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI * 2, false);
	ctx.fillStyle = 'blue';
	ctx.fill();
	ctx.closePath(); // Since we used fill() instead of stroke(), we have to use closePath();

	// Change the x and y position.
	x += dx;
	y += dy;

	/* Of course, if we simply animate it like this, our circle will eventually go off the screen.
	To avoid this, we use a conditional. If X pos is higher that the canvas width (in this case, the window
	inner width), we'll change it to a negative value (x + (-dx) will cause the circle to go the other way
	around). With this addition, the circle with effectively bounce off of the right side of the screen. */

	// We take into account the circle radius. Otherwise the circle will bounce only when its center hits
	// the edge of the screen.

	// (x -r < 0) does the same thing but for the left edge.

	// Sometimes our circle will get stuck at the edges.
	// This is because of these conditions interfering with our spawn position.
	// We'll fix it later.
	if(x + r > window.innerWidth || x - r < 0) {
		dx = -dx;
	}

	// Bouncing for y axis.
	if(y + r > window.innerHeight || y - r < 0) {
		dy = -dy;
	}
}

animate();