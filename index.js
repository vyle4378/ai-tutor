function sendMessage(inputElem) {
    console.log(inputElem.value)
    inputElem.value = ''
}


//problem-box
const problemButtonElem = document.querySelector('.problem-box > .enter-button')
const problemInputElem = document.querySelector('.problem-box > .input-space')

problemButtonElem.addEventListener("click", () => sendMessage(problemInputElem))
problemInputElem.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        sendMessage(problemInputElem)
    } 
})


//chat-box
const chatButtonElem = document.querySelector('.chat-box > .enter-button')
const chatInputElem = document.querySelector('.chat-box > .input-space')

chatButtonElem.addEventListener("click", () => sendMessage(chatInputElem))
chatInputElem.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        sendMessage(chatInputElem)
    } 
})


//send question
//tutor me, get answer, give me more problems like this

//get response
//renderResponseHTML