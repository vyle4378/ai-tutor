console.log("feedback.js loaded");

const checkAnswerBtn = document.querySelector('.check-answer-btn');
const feedbackArea = document.querySelector('.feedback-area');
checkAnswerBtn.addEventListener('click', handleAnswerCheck);
const screenshotContainer = document.querySelector('.screenshot-container');
const rubricTextarea = document.querySelector('.rubric-textarea');

if (rubricTextarea.value === '') {
    rubricTextarea.value = `
- 1pt: Use the correct formula (PV=nRT). 
- 1pt: Rearrange to solve for n (n=PV/RT).
- 1pt: Plug in the right value for each variable (P=2.8 atm, V=98 L, T=292 K, R=0.0821 L atm/mol K).
- 1pt: Correct answer with correct units (11.45 moles).`;
}

import { OpenAI } from 'https://cdn.skypack.dev/openai@4.x';  // Use CDN version

const API_KEY = ''
const openai = new OpenAI({
    apiKey: API_KEY, dangerouslyAllowBrowser: true
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
                {'type': 'text', 'text': 'You are a helpful assistant that grades student work.'},
                {'type': 'text', 'text': `The question is: ${problemText}`},
                // {'type': 'text', 'text': `how to do this problem: ${problemText}. Give the first step`},
                {'type': 'text', 'text': `Look closely at the image. List each rubric point, and state whether the student got it right or wrong and why. Be brief. Give the total score at the end. Rubric: ${rubricTextarea.value}`},
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
    const formattedFeedback = feedbackText
        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
        .replace(/-\s*\\\(/g, '-&nbsp;\\(').replace(/\) /g, ')&nbsp;')
        .replace(/\n/g, '<br>') 

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
