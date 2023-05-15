const colorOptions = Array.from(
    document.getElementsByClassName("color-option")
);
const canvas = document.querySelector("canvas");
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth= lineWidth.value;
let isPainting = false;

function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}
function beginPainting(){
    isPainting = true;
}
function cancelPaining(){
    isPainting = false;
    ctx.beginPath();
}

function onLineWidthChange(event){
    ctx.lineWidth = event.target.value;
}

function onColorChange(event){
    const inputColor = event.target.value;
    const clickColor = event.target.dataset.color;
    console.dir(event);
    if(inputColor){
        ctx.strokeStyle = ctx.fillStyle = inputColor;
    } else{
        color.value = ctx.strokeStyle = ctx.fillStyle = clickColor;
    }
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", beginPainting);
canvas.addEventListener("mouseup", cancelPaining);
canvas.addEventListener("mouseleave",cancelPaining);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach(color=>color.addEventListener("click", onColorChange));