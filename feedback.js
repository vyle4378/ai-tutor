console.log("feedback.js loaded");

const checkAnswerBtn = document.querySelector('.check-answer-btn');
const feedbackArea = document.querySelector('.feedback-area');
checkAnswerBtn.addEventListener('click', handleAnswerCheck);


function takeScreenshot() {
    // Get canvas image as base64 string
    const base64String = canvas.toDataURL('image/png');

    // Convert Base64 to Blob
    const byteCharacters = atob(base64String.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length).fill().map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/png" }); // Change to "image/jpeg" for JPEG

    // Save Blob as a file
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "screenshot.png"; 
    link.click();

    // // extra
    // const screenshotContainer = document.querySelector('.screenshot-container');
    // screenshotContainer.innerHTML = ''; 
    // screenshotContainer.innerHTML = `<img src="/Users/vyle/Downloads/screenshot.png" alt="Screenshot">`;

    // console.log("base64String", base64String);
    // return base64String;
}


async function handleAnswerCheck() {
    try {
        console.log("checking answer");
        // Get feedback from GPT
        const feedback = await getFeedback(prompt);
        // Display the feedback
        renderFeedback(feedback);
    } catch (error) {
        console.error('Error checking answer:', error);
        renderFeedback('Sorry, there was an error analyzing your work. Please try again.');
    }
}

async function getFeedback() {
    try {
        const prompt = `Identify whether the student solved the problem right or wrong. Don't worry about significant figures.`;
        takeScreenshot();
        console.log("imageData", imageData);

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'text',
                                text: prompt
                            },
                            {
                                type: 'image_url',
                                image_url: {
                                    url: '/Users/vyle/Downloads/screenshot.png'
                                }
                            }
                        ]
                    }
                ],
                max_tokens: 300
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.choices[0].message.content);
        return data.choices[0].message.content;

    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

function renderFeedback(feedbackText) {
    // Clear previous feedback
    feedbackArea.innerHTML = '';
    
    // Create new feedback element
    const feedbackElement = document.createElement('div');
    feedbackElement.className = 'feedback-item';
    
    // Convert the feedback text to HTML with line breaks
    const formattedFeedback = feedbackText.replace(/\n/g, '<br>');
    feedbackElement.innerHTML = formattedFeedback;
    
    // Add to feedback area
    feedbackArea.appendChild(feedbackElement);
} 