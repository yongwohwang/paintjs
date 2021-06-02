const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const brushSize = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

canvas.width = 500;
canvas.height = 500;
ctx.strokeStyle = "black";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting(){
    painting = true;
}
function stopPainting(event){
    painting=false;
}
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function handleModeClick(){
    if(filling ===true){
        filling = false;
        mode.innerText = "FILL"
    } else{
        filling = true;
        mode.innerText = "PAINT"
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}
function handleBrushSize(event){
    console.log(event.target.value);
    ctx.lineWidth = parseInt(event.target.value);
}

if (canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
brushSize.addEventListener("input", handleBrushSize);
mode.addEventListener("click", handleModeClick);