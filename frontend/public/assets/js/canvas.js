let dpi = window.devicePixelRatio;
let canvas = document.querySelector('canvas');

// We resize the canvas. We multiply it by the dpi to avoid blurry objects.
canvas.height = window.innerHeight * dpi;
canvas.width = window.innerWidth * dpi;

// Within ctx we're creating a super object. We're passing a bunch of methods to draw 2D objects.
// ctx stands for context.
let ctx = canvas.getContext('2d');

// fillRect creates a rectangle. x and y are the coordinates. Relative from the top-left of the canvas.
// measured in pixels.
ctx.fillRect(10, 10, 100, 100);
ctx.fillRect(300, 500, 100, 100);
ctx.fillRect(600, 300, 100, 100);