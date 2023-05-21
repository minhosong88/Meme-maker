const colorOptions = Array.from(
    document.getElementsByClassName("color-option")
);

const saveBtn = document.getElementById("save");
const fileInput = document.getElementById("file");
const modeBtn =document.getElementById("mode-btn");
const resetBtn = document.getElementById("reset-btn");
const eraseBtn = document.getElementById("erase-btn")
const canvas = document.querySelector("canvas");
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
const brushRange = document.getElementById("line-width");
const changedValueBrush = document.querySelector(".brush-value");
const FontRange = document.querySelector(".font_size-control");
const chagedValueFont = document.querySelector(".font-value");

changedValueBrush.innerText = "5";
chagedValueFont.innerText = "30";
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
    if(inputColor){
        ctx.strokeStyle = ctx.fillStyle = inputColor;
    } else{
        color.value = ctx.strokeStyle = ctx.fillStyle = clickColor;
    }
}

function onModeClick(event){
    const bucket = event.target;
    if(isFilling){
        isFilling = false;
        bucket.classList.toggle("yellow");
        
    } else{
        isFilling = true;
        bucket.classList.toggle("yellow");
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
    isFilling = false;
    modeBtn.classList.remove("yellow");
}
function onEraseClick(){
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.classList.remove("yellow");
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

function onSaveClick(event){
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "mydrawings.png";
    a.click();
}

function onRangeChangeBrush(event){
    const brushRange = event.target.value;
    changedValueBrush.innerText = brushRange;
    
}
function onRangeChangeFont(event){
    const fontRange = event.target.value;
    chagedValueFont.innerText = fontRange;

}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", beginPainting);
canvas.addEventListener("mouseup", cancelPaining);
canvas.addEventListener("mouseleave",cancelPaining);
canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach(color=>color.addEventListener("click", onColorChange));
modeBtn.addEventListener("click", onModeClick);
resetBtn.addEventListener("click", onDestroyClick);
eraseBtn.addEventListener("click", onEraseClick);
fileInput.addEventListener("change",onFileChange);
saveBtn.addEventListener("click", onSaveClick);
brushRange.addEventListener("change", onRangeChangeBrush);
FontRange.addEventListener("change",onRangeChangeFont);