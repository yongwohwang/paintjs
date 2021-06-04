const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const brushSize = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "black"
const CANVAS_SIZE = 500;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0,0,canvas.width, canvas.height)

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

ctx.lineWidth = 2.5;
let painting = false;
let filling = false;

function startPainting(){
    if (filling===false){
        painting = true;
    }
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
    ctx.fillStyle = color;

}
function handleBrushSize(event){
    console.log(event.target.value);
    ctx.lineWidth = parseInt(event.target.value);
}
function handleCanvasClick(event){
    if(filling){
        ctx.fillRect(0,0,canvas.width, canvas.height)
    } else{

    }
}
function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS😀";
    link.click();
}

if (canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

if (saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
brushSize.addEventListener("input", handleBrushSize);
mode.addEventListener("click", handleModeClick);