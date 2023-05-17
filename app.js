const colorOptions = Array.from(
    document.getElementsByClassName("color-option")
);
const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const modeBtn =document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraseBtn = document.getElementById("erase-btn")
const canvas = document.querySelector("canvas");
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

let isPainting = false;
let isFilling = false;

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

function onModeClick(){
    if(isFilling){
        isFilling = false;
        modeBtn.innerText = "Fill";
    } else{
        isFilling = true;
        modeBtn.innerText = "Draw";
    }
}

function onCanvasClick(){
    if(isFilling){
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function onDestroyClick(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
function onEraseClick(){
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Fill";
}
function onFileChange(event){
    const file = event.target.files[0]; 
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;    
    image.onload = function(){
        ctx.drawImage(image, 0 , 0 , CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value = null; 
    }
}

function onDoubleClick(event){
    const text = textInput.value;
    if(text !==""){
        ctx.save();
        ctx.font = "60px serif"
        ctx.lineWidth = 1;
        ctx.fillText(text, event.offsetX, event.offsetY);
        ctx.restore();
    }
}

function onSaveClick(event){
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "mydrawings.png";
    a.click();
}

canvas.addEventListener("dblclick",onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", beginPainting);
canvas.addEventListener("mouseup", cancelPaining);
canvas.addEventListener("mouseleave",cancelPaining);
canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach(color=>color.addEventListener("click", onColorChange));
modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraseBtn.addEventListener("click", onEraseClick);
fileInput.addEventListener("change",onFileChange);
saveBtn.addEventListener("click", onSaveClick);