const chatAreaElem = document.querySelector('.chat-area')
let chatMessagesHTML = chatAreaElem.innerHTML
const chatBoxElem = document.querySelector('.gpttext-container')


//problem-box
const problemButtonElem = document.querySelector('.problem-box > .enter-button')
const problemInputElem = document.querySelector('.problem-box > .input-space')

problemButtonElem.addEventListener("click", () => {handleProb})
problemInputElem.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        if (event.shiftKey) {return}
        event.preventDefault()
        handleProb()
    } 
})


//chat-box
const chatButtonElem = document.querySelector('.chat-box > .enter-button')
const chatInputElem = document.querySelector('.chat-box > .input-space')

chatButtonElem.addEventListener("click", () => {handleChat})
chatInputElem.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        if (event.shiftKey) {return}
        event.preventDefault() // prevents \n at the end when enter is clicked
        handleChat()
    } 
})

function handleProb() {
    sendMessage(problemInputElem)
    //problemInputElem.value = problemInputElem.value.replace(/\n/g, "<br>")
    problemInputElem.value = ''
    setTimeout( () => {
        chatAreaElem.scrollTo({
            left: 0, 
            top: chatAreaElem.scrollHeight,
            behavior: "smooth"
        })
        renderChatMessage('bot', 'Thinking...')
    }, 700)  
         
}

function handleChat() {
    sendMessage(chatInputElem);
    const chatHTML = chatInputElem.value.replace(/\n/g, "<br>")
    renderChatMessage('user', chatHTML)
    setTimeout( () => {
        chatAreaElem.scrollTo({
            left: 0, 
            top: chatAreaElem.scrollHeight,
            behavior: "smooth"
        })
        renderChatMessage('bot', 'Thinking...')
    }, 700)
    
}


function sendMessage(inputElem) {
    console.log(inputElem.value)
}

function renderChatMessage(type, chatHTML) {
    if (type === 'user') {
        //console.log('user')
        chatMessagesHTML += `<div class="chat-messages user-message"><p>${chatHTML}</p></div>`
        chatInputElem.value = ''
    } else if (type === 'bot') {
        //console.log('bot')
        chatMessagesHTML += `<div class="chat-messages bot-message"><p>${chatHTML}</p></div>`
    }
    
    chatAreaElem.innerHTML = chatMessagesHTML
}



//send question
//tutor me, get answer, give me more problems like this

//get response
//renderResponseHTML