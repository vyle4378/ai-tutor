function sendMessage(inputElem) {
    console.log(inputElem.value)
}

function renderChatMessage(inputElem, chatHTML) {
    const chatAreaElem = document.querySelector('.chat-area')
    let chatMessagesHTML = chatAreaElem.innerHTML

    if (inputElem === chatInputElem) {
        //console.log('out')
        chatMessagesHTML += `<div class="chat-messages chat-out"><p>${chatHTML}</p></div>`
    } else {
        //console.log('in')
        chatMessagesHTML += `<div class="chat-messages chat-in"><p>${chatHTML}</p></div>`
    }
    
    chatAreaElem.innerHTML = chatMessagesHTML
    inputElem.value = ''
}

//problem-box
const problemButtonElem = document.querySelector('.problem-box > .enter-button')
const problemInputElem = document.querySelector('.problem-box > .input-space')

problemButtonElem.addEventListener("click", () => sendMessage(problemInputElem))
problemInputElem.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        if (event.shiftKey) {return}
        event.preventDefault()
        sendMessage(problemInputElem)

        //problemInputElem.value = problemInputElem.value.replace(/\n/g, "<br>")
        problemInputElem.value = ''
    } 
})


//chat-box
const chatButtonElem = document.querySelector('.chat-box > .enter-button')
const chatInputElem = document.querySelector('.chat-box > .input-space')

chatButtonElem.addEventListener("click", () => {
    sendMessage(chatInputElem);
    const chatHTML = chatInputElem.value.replace(/\n/g, "<br>")
    renderChatMessage(chatInputElem, chatHTML)
})
chatInputElem.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        if (event.shiftKey) {return}
        event.preventDefault() // prevents \n at the end when enter is clicked
        sendMessage(chatInputElem)

        const chatHTML = chatInputElem.value.replace(/\n/g, "<br>")
        renderChatMessage(chatInputElem, chatHTML)
    } 
})


//send question
//tutor me, get answer, give me more problems like this

//get response
//renderResponseHTML