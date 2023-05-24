const colorOptions = Array.from(
    document.getElementsByClassName("color-option")
    );
    const saveBtn = document.getElementById("save");
    const fileInput = document.getElementById("file");
    const modeBtn =document.getElementById("mode-btn");
    const resetBtn = document.getElementById("reset-btn");
    const eraseBtn = document.getElementById("erase-btn")
    const color = document.getElementById("color");
    const lineWidth = document.getElementById("line-width");
    const squareBtn = document.getElementById("square-btn");
    const squareFillBtn = document.getElementById("square_fill-btn");
    const circleFillBtn = document.getElementById("circle_fill-btn");
    const circleBtn = document.getElementById("circle-btn");
    const brushRange = document.getElementById("line-width");
    const canvas = document.querySelector("canvas");
    const changedValueBrush = document.querySelector(".brush-value");
    const FontRange = document.querySelector(".font_size-control");
    const chagedValueFont = document.querySelector(".font-value");
    const CANVAS_HEIGHT = 800;
    const CANVAS_WIDTH = 800;
    const ctx = canvas.getContext("2d");
    
changedValueBrush.innerText = "5";
chagedValueFont.innerText = "30";
canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

let isPainting = false;
let isFilling = false;
let isSquare = false;
let isCircle = false;
let isSquareFill = false;
let isCircleFill = false;

let start = {x:0, y:0};
let end = {x:0, y:0};



function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}
function beginPainting(){
    if(isSquare || isCircle){
        isPainting = false;
    }else{
        isPainting = true;
    }
}
function cancelPaining(){
    isPainting = false;
    ctx.beginPath();
    if(isSquare){
        if(isSquareFill){
            ctx.fillRect(start.x, start.y,(end.x-start.x),(end.y-start.y));
            ctx.beginPath();
        }
        ctx.strokeRect(start.x, start.y,(end.x-start.x),(end.y-start.y));   
        ctx.beginPath();
    } else if(isCircle){
        const radius = Math.floor(Math.sqrt((end.x-start.x)**2  + (end.y-start.y)**2));
        if(isCircleFill){
            ctx.arc(start.x, start.y, radius, Math.PI*2, false);
            ctx.fill();
            ctx.beginPath();
        }
        ctx.arc(start.x, start.y, radius, Math.PI*2, false);
        ctx.stroke();
        ctx.beginPath();

    }
}
function cancelShape(){
    isSquare = false;
    isCircle = false;
    ctx.beginPath();
}


function onSquareClick(){
    isPainting = false;
    isFilling = false;
    isCircle = false;
    if(!isSquare){
        isSquare = true;
    }else if(isSquareFill&&isSquare){
        isSquareFill = false;
    }else{
        isSquare = false;
    }
}

function onSquareFillClick(){
    isPainting = false;
    isFilling = false;
    isCircle = false;
    if(!isSquareFill){
        isSquare = true;
        isSquareFill = true;
    } else {
        isSquare = false;
        isSquareFill = false;
    }
}

function onCircleClick(){
    isPainting = false;
    isFilling = false;
    isSquare = false;
    if(!isCircle){
        isCircle = true;
    }else if(isCircle&&isCircleFill){
        isCircleFill = false;
    } else{
        isCircle = false;
    }
}

function onCircleFillClick(){
    isPainting = false;
    isFilling = false;
    isSquare = false;
    if(!isCircleFill){
        isCircle = true;
        isCircleFill = true;
    } else {
        isCircle = false;
        isCircleFill = false;
    }
}

function onBeginShape(event){
    if(isSquare||isCircle){start = {x: event.offsetX, y:event.offsetY};
    }
}

function onDrag(event){
    if(isSquare||isCircle){
        end = {x:event.offsetX, y:event.offsetY};
    }
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
canvas.addEventListener("mouseleave",() => {
    cancelPaining;
    cancelShape;
});
canvas.addEventListener("mousedown",onBeginShape);
canvas.addEventListener("mousemove", onDrag);



lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
brushRange.addEventListener("change", onRangeChangeBrush);
FontRange.addEventListener("change",onRangeChangeFont);
fileInput.addEventListener("change",onFileChange);

colorOptions.forEach(color=>color.addEventListener("click", onColorChange));
modeBtn.addEventListener("click", onModeClick);
resetBtn.addEventListener("click", onDestroyClick);
eraseBtn.addEventListener("click", onEraseClick);
saveBtn.addEventListener("click", onSaveClick);
squareBtn.addEventListener("click", onSquareClick);
squareFillBtn.addEventListener("click", onSquareFillClick);
circleFillBtn.addEventListener("click", onCircleFillClick);
circleBtn.addEventListener("click", onCircleClick);
canvas.addEventListener("click", onCanvasClick);




//ctx.clearRect(start.x, start.y,(end.x-start.x),(end.y-start.y));
// ctx.strokeRect(start.x, start.y,(end.x-start.x),(end.y-start.y)); square
//ctx.fillText(text, start.x, end.y); text in square
// function onMouseDown(event){
//     start = {x: event.offsetX, y:event.offsetY};
//     isDrawing = true;

// }
// function onDrag(event){
//     if(isDrawing){
//         end = {x:event.offsetX, y:event.offsetY};   
//         ctx.beginPath();

//     }
// }
// canvas.addEventListener("mousedown", onMouseDown);
// canvas.addEventListener("mousemove", onDrag);

