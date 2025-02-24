console.log("feedback.js loaded");

const checkAnswerBtn = document.querySelector('.check-answer-btn');
const feedbackArea = document.querySelector('.feedback-area');
checkAnswerBtn.addEventListener('click', handleAnswerCheck);
const screenshotContainer = document.querySelector('.screenshot-container');

import { OpenAI } from 'https://cdn.skypack.dev/openai@4.x';  // Use CDN version

const openai = new OpenAI({
    //apikey
});


async function handleAnswerCheck() {
    try {
        console.log("checking answer");
        // Get feedback from GPT
        const feedback = await getFeedback();
        // Display the feedback
        renderFeedback(feedback);
    } catch (error) {
        renderFeedback('Sorry, there was an error analyzing your work. Please try again.');
    }
}

async function getFeedback() {;
    const base64_image = takeScreenshot();

    const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            {'role': 'user', 'content': [
                {'type': 'text', 'text': 'Prompt: How many moles of gas occupy 98 L at a pressure of 2.8 atm and a temperature of 292 K?'},
                {'type': 'text', 'text': 'Look at the image and tell me if the student has solved the problem correctly. Be concise'},
                {'type': 'image_url', 'image_url': {"url": `${base64_image}`, 'detail': 'low'}}
            ]
            }
        ]
    });

    console.log(response.choices[0].message.content);
    return response.choices[0].message.content;
}

function renderFeedback(feedbackText) {
    // Clear previous feedback
    feedbackArea.innerHTML = '';
    
    // Convert the feedback text to HTML with line breaks
    const formattedFeedback = feedbackText.replace(/\n/g, '<br>');
    feedbackArea.innerHTML = formattedFeedback;
    MathJax.typeset()
} 


function takeScreenshot() {
    const mergedCanvas = document.createElement('canvas');
    mergedCanvas.width = bgCanvas.width;
    mergedCanvas.height = bgCanvas.height;
    const mergedCtx = mergedCanvas.getContext('2d');
    mergedCtx.drawImage(bgCanvas, 0, 0);
    mergedCtx.drawImage(canvas, 0, 0);


    const base64_image = mergedCanvas.toDataURL('image/png');
    screenshotContainer.innerHTML = `<img src="${base64_image}" alt="Screenshot">`;
    return base64_image;
}