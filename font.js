const fontSerif = document.querySelector(".font_family-serif");
const fontNunito = document.querySelector(".font_family-nunito");
const fontTNR = document.querySelector(".font_family-timesNewRoman");
const fontGeorgia = document.querySelector(".font_family-georgia");

const fontFillStyle = document.querySelector(".font_style-fill");
const fontStrokeStyle = document.querySelector(".font_style-stroke");
const fontBold = document.querySelector(".font_style-bold");
const fontItalic = document.querySelector(".font_style-italic");

const fontSize12 = document.querySelector(".font_size-12");
const fontSize30 = document.querySelector(".font_size-30");
const fontSize60 = document.querySelector(".font_size-60");
const fontSize100 = document.querySelector(".font_size-100");


let isFillMode = true;
let isSelected = false;

let fontStyle = "";
let fontWeight = "";
let fontFamily = "sans-serif";
let fontSize = "60px";    

const textInput = document.getElementById("text");
const textClass = textInput.classList;

const fontFunctions = {
    fontSerif: (event)=>{
        const button = event.target;
        if(isSelected){
            isSelected = false;
            button.classList.toggle("yellow");
        } else{
             isSelected = true;
            button.classList.toggle("yellow");
        }
        if(textClass.contains){
            textClass.remove("nunito");
            textClass.remove("georgia");
            textClass.remove("timesNewRoman");
        }
        textClass.add("serif");
    },
    fontNunito:() =>{
        if(textClass.contains){
            textClass.remove("serif");
            textClass.remove("timesNewRoman");
            textClass.remove("georgia");
        }
        textClass.add("nunito"); 
    },
    fontTimes:() =>{
        if(textClass.contains){
            textClass.remove("serif");
            textClass.remove("nunito");
            textClass.remove("georgia");
        }
        textClass.add("timesNewRoman");
    },
    fontGeorgia:() =>{
        if(textClass.contains){
            textClass.remove("serif");
            textClass.remove("nunito");
            textClass.remove("timesNewRoman");
        }
        textClass.add("georgia");
    },
    fontFill:() =>{
        isFillMode = true;
    },
    fontStroke:() =>{
        isFillMode = false;
        console.log(isFillMode);
    },
    fontBold:() =>{
        
        if(textInput.classList.toggle("bold")){
            fontWeight = "bold";
        } else{
            fontWeight = "";
        }
        console.log(fontWeight);

    },
    fontItalic:()=>{
        if(textInput.classList.toggle("italic")){
            fontStyle = "italic";
        } else {
            fontStyle = "";
        
        }
        console.log(fontStyle);
    },
    fontSize12:() =>{
        fontSize = "12px";
    },
    fontSize30:() =>{
        fontSize = "30px";
    },
    fontSize60:() =>{
        fontSize = "60px";
    },
    fontSize100:() =>{
        fontSize = "100px";
    },

}
// function setTextStyle(){
//     ctx.font = `${fontStyle} ${fontWeight} ${fontSize} ${fontFamily}`;
//     console.log()
//     ctx.beginPath();
// }

function onDoubleClick(event){
    const text = textInput.value;

    if(text !==""){
        ctx.save();
        //font-family
        if(textInput.className ==="serif"){
            fontFamily = "sans-serif";
        } else if(textInput.className ==="nunito"){
            fontFamily = "Nunito";
        } else if(textInput.className ==="timeNewRoman"){
            fontFamily = "Times New Roman";
        }else if(textInput.className ==="georgia"){
            fontFamily = "Georgia";
        }else{
            fontFamily = "sans-serif"
        }
        //font-size
        console.log(fontSize);
        //font-weight
        console.log(ctx.font);
        ctx.font = `${fontStyle} ${fontWeight} ${fontSize} ${fontFamily}`;
        console.log(ctx.font);
        ctx.lineWidth = 1;
        ctx.fillStyle = ctx.strokeStyle;
         // stroke&fill
        if(isFillMode){
            ctx.fillText(text, event.offsetX, event.offsetY);
        } else if(!isFillMode){
             ctx.strokeText(text, event.offsetX, event.offsetY); 
        }
        ctx.restore();
    }
}

canvas.addEventListener("dblclick", onDoubleClick);


fontSerif.onclick = fontFunctions.fontSerif;
fontNunito.onclick = fontFunctions.fontNunito;
fontTNR.onclick = fontFunctions.fontTimes;
fontGeorgia.onclick = fontFunctions.fontGeorgia;

fontFillStyle.onclick = fontFunctions.fontFill;
fontStrokeStyle.onclick = fontFunctions.fontStroke;
fontBold.onclick = fontFunctions.fontBold;
fontItalic.onclick = fontFunctions.fontItalic;

fontSize12.onclick = fontFunctions.fontSize12;
fontSize30.onclick = fontFunctions.fontSize30;
fontSize60.onclick = fontFunctions.fontSize60;
fontSize100.onclick = fontFunctions.fontSize100;
// let start = {x:0, y:0};
// let end = {x:0, y:0};
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












