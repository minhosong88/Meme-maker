const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

const colors = [
    "#ff3838",
    "#ffb8b8",
    "#c56cf0",
    "#ff9f1a",
    "#fff200",
    "#32ff7e",
    "#7efff5",
    "#7d5fff",
    "#18dcff",
]

function onClick(event){
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
    const color = colors[Math.floor(Math.random()*colors.length)];
    ctx.strokeStyle=color;
    ctx.stroke();
    canvas.addEventListener("mousemove", onMove);
}

function onMove(event){
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
}

canvas.addEventListener("click", onClick);
