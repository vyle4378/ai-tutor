const canvas = document.getElementById("whiteboard");
const ctx = canvas.getContext("2d");

let drawing = false;

const startDrawing = (e) => {
    drawing = true;
    // ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

const draw = (e) => {
    if (!drawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
}

const stopDrawing = () => {
    drawing = false;
    // ctx.closePath();
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);