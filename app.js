const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

ctx.fillRect(200, 200, 15, 100);
ctx.fillRect(325, 200, 15, 100);
ctx.fillRect(240, 200, 60, 200);

ctx.arc(270, 160, 40, 0, 2 *Math.PI);
ctx.fill();

ctx.beginPath();
ctx.fillStyle = "white";
ctx.fillRect(245, 135, 20, 5);
ctx.fillRect(275, 135, 20, 5);
ctx.arc(255, 150, 5, 0, 2 * Math.PI);
ctx.arc(285, 150, 5, 0, 2 * Math.PI);
ctx.fill();

ctx.beginPath();
ctx.fillStyle = "white";
ctx.arc(270, 165, 20, 0, 1* Math.PI);
ctx.fill();