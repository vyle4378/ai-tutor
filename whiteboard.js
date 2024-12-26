const canvas = document.getElementById("whiteboard");
const ctx = canvas.getContext("2d");

let drawing = false;

const getCoordinates = (e) => {
    if (e.touches) {
        const touch = e.touchs[0];
        const rect = canvas.getBoundingClientRect();
        return {x : touch.clientX - rect.left, y : touch.clientY - rect.top};
    }
    return {x : offsetX, y: e.offsetY}
};

const startDrawing = (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

const draw = (e) => {
    if (!drawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    // ctx.strokeStyle = "black"; // Set stroke color
    // ctx.lineWidth = 2;        // Set line width
    ctx.stroke();
}

const stopDrawing = () => {
    drawing = false;
    ctx.closePath();
}

//Mouse Events
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

//Touch Events
canvas.addEventListener("touchstart", (e) => {
    e.preventDefault(); // prevent scrolling
    startDrawing(e);
});
canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    draw(e);
});
canvas.addEventListener("touchend", stopDrawing);
canvas.addEventListener("touchcancel", stopDrawing);