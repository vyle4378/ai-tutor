const chatAreaElem = document.querySelector('.chat-area')
let chatMessagesHTML = chatAreaElem.innerHTML
const chatBoxElem = document.querySelector('.gpttext-container')
const API_URL = 'https://api.openai.com/v1/chat/completions'
const API_KEY = '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'



// problem-box
// const problemButtonElem = document.querySelector('.problem-box > .enter-button')
// const problemInputElem = document.querySelector('.problem-box > .input-space')

// problemButtonElem.addEventListener("click", handleProb)
// problemInputElem.addEventListener("keydown", (event) => {
//     if (event.key === 'Enter') {
//         if (event.shiftKey) {return}
//         event.preventDefault() // prevents \n at the end when enter is clicked
//         handleProb()
//     } 
// })


//chat-box
const chatButtonElem = document.querySelector('.chat-box > .enter-button')
const chatInputElem = document.querySelector('.chat-box > .input-space')


chatButtonElem.addEventListener("click", handleChat)
chatInputElem.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        if (event.shiftKey) {return}
        event.preventDefault() 
        handleChat()
    } 
})


// async function handleProb() {
//     const response = await getResponse(problemInputElem.value)
//     const responseHTML = response.replace(/\n/g, "<br>")

//     problemInputElem.value = ''
//     renderChatMessage('user', "Problem sent!")

//     setTimeout( () => {
//         renderChatMessage('bot', responseHTML)
//         chatAreaElem.scrollTo({
//             left: 0, 
//             top: chatAreaElem.scrollHeight,
//             behavior: "smooth"
//         })
//     }, 700)
// }

async function handleChat() {
    const response = await getResponse(chatInputElem.value);
    const responseHTML = response.replace(/\n/g, "<br>")

    const chatHTML = chatInputElem.value.replace(/\n/g, "<br>")
    renderChatMessage('user', chatHTML)
    chatInputElem.value = ''

    setTimeout( () => {
        renderChatMessage('bot', responseHTML)
        chatAreaElem.scrollTo({
            left: 0, 
            top: chatAreaElem.scrollHeight,
            behavior: "smooth"
        })
    }, 700)
}

async function renderChatMessage(type, chatHTML) {
    if (type === 'user') {
        //console.log('user')
        chatMessagesHTML += `<div class="chat-messages user-message"><p>${chatHTML}</p></div>`
    } else if (type === 'bot') {
        //console.log('bot')
        chatMessagesHTML += `<div class="chat-messages bot-message"><p>${chatHTML}</p></div>`
    }
    
    chatAreaElem.innerHTML = chatMessagesHTML
}


async function getResponse(userInput) {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{role: 'user', content: userInput}]
            })
        }

        const data = await fetch(API_URL, requestOptions)
        const response = await data.json()
        return response.choices[0].message.content
    } catch (error) {
        console.error('Error:', error)
    }
}
//send question
//tutor me, get answer, give me more problems like this

//get response
//renderResponseHTML

