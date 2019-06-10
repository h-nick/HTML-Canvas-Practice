let dpi = window.devicePixelRatio;
let canvas = document.querySelector('canvas');

// We resize the canvas. We multiply it by the dpi to avoid blurry objects.
canvas.height = window.innerHeight * dpi;
canvas.width = window.innerWidth * dpi;

// Within ctx we're creating a super object. We're passing a bunch of methods to draw 2D objects.
// ctx stands for context.
let ctx = canvas.getContext('2d');


// fillStyle to change the color.
ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
// fillRect creates a rectangle. x and y are the coordinates. Relative from the top-left of the canvas.
// measured in pixels.
ctx.fillRect(10, 10, 100, 100);
ctx.fillRect(300, 500, 100, 100);
ctx.fillRect(600, 300, 100, 100);

ctx.fillStyle = 'red'; // You can change the color of a specific rectangle by preceding it with fillStyle().
ctx.fillRect(250, 250, 100, 100);

ctx.fillStyle = 'blue';
ctx.fillRect(450, 450, 100, 100);

// Line
ctx.beginPath(); // Beginning a path.
ctx.moveTo(50, 300); // Create a point at (50, 300).
ctx.lineTo(300, 100); // Draw a line from (50, 300) to (300, 100).
ctx.lineTo(400, 300); // Draw a line from (300, 100) to (400, 300).

// Setting the color. rgba, rgb, hex and colors are valid.
// Must go before ctx.stroke();
ctx.strokeStyle = 'rgba(90, 25, 100, 1)';

ctx.stroke(); // Stroke the lines.
//ctx.fill(); This would complete a triangle automatically (by closing the path) and fill it with a color).


// Arcs

// This creates an outline for an arc. The first two parameters are the X and Y position.
// 30 is the radius.
// 0 and Math.PI * 2 are the start angle and end angle of our arc. It's measured in radians, therefore going from
// 0 to Math.PI * 2 will create a perfect circle.
// false tells the arc to not be drawn counter clock-wise (which, in this case, would not make a difference).
ctx.beginPath(); // This avoids the circle being joined with the triangle path from before.
ctx.arc(300, 500, 30, 0, Math.PI * 2, false);
ctx.strokeStyle = 'green';
ctx.stroke(); // Strokes the outline.

// Of course we can create several shapes using cycles. Remember this is all javaScript in the end.
for (let i = 0; i <= 100; i++) {
	let x = Math.random() * window.innerWidth;
	let y = Math.random() * window.innerHeight;

	ctx.beginPath();
	ctx.arc(x, y, 30, 0, Math.PI * 2, false);
	ctx.strokeStyle = `rgba(
		${Math.floor(Math.random() * 256)},
		${Math.floor(Math.random() * 256)},
		${Math.floor(Math.random() * 256)},
		${0.1 + Math.random()}
	)`;

	console.log(ctx.strokeStyle);
	ctx.stroke();
}