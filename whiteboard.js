const canvas = document.getElementById("whiteboard");
const ctx = canvas.getContext("2d");
const problemText = "How many moles of gas occupy 98 L at a pressure of 2.8 atmospheres and a temperature of 292 K?";

const colorBtns = document.querySelectorAll('.color-btn');
const eraserBtn = document.querySelector('.eraser-btn');
const clearBtn = document.querySelector('.clear-btn');


let drawing = false;
let erasing = false;

// Initialize canvas settings
ctx.strokeStyle = "black"; // Set stroke color
ctx.lineWidth = 1;        // Set line width

// Function to wrap text and draw it on canvas
function drawProblemText(text) {
    const maxWidth = canvas.width - 40; // 20px padding on each side
    const lineHeight = 22;
    const x = 20;
    let y = 30;

    ctx.font = '16px Arial';
    ctx.fillStyle = '#000000';
    
    // Split text into words
    const words = text.split(' ');
    let line = '';

    // Go through each word
    for (let word of words) {
        // Try adding the word to the line
        const testLine = line + word + ' ';
        const metrics = ctx.measureText(testLine);
        
        // If the line would be too long, draw the current line and start a new one
        if (metrics.width > maxWidth && line !== '') {
            ctx.fillText(line, x, y);
            line = word + ' ';
            y += lineHeight;
        } else {
            // Add the word to the current line
            line = testLine;
        }
    }
    
    // Draw the last line
    ctx.fillText(line, x, y);
}

// Call this function with your problem text
drawProblemText(problemText);



const getCoordinates = (e) => {
    if (e.touches) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        return {x : touch.clientX - rect.left, y : touch.clientY - rect.top};
    }
    return {x : e.offsetX, y: e.offsetY};
};

const startDrawing = (e) => {
    drawing = true;
    const {x, y} = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
}

const draw = (e) => {
    if (!drawing) return;
    const {x, y} = getCoordinates(e);
    ctx.lineTo(x, y);
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


// Color button functionality
colorBtns.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        colorBtns.forEach(btn => btn.classList.remove('active'));
        eraserBtn.classList.remove('active');
        // Add active class to clicked button
        button.classList.add('active');
        // Update stroke color
        ctx.lineWidth = 1;
        ctx.strokeStyle = button.dataset.color;
    });
});


// Eraser button functionality
eraserBtn.addEventListener('click', () => {
    erasing = true;
    eraserBtn.classList.add('active');
    colorBtns.forEach(btn => btn.classList.remove('active'))
    ctx.strokeStyle = "white";
    ctx.lineWidth = 10;
});

// Clear button functionality
clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawProblemText(problemText);
});
