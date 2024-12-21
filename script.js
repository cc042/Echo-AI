// Form and elements
const form = document.querySelector("form");
const textArea = document.querySelector("textarea");
const microphone = document.querySelector(".Microphone");
const sendButton = document.querySelector(".Send");
const chatBox = document.querySelector(".Messages");
const helloSpans = document.querySelectorAll(".Hello");

// Sounds
const sendSound = new Audio("sound/send.mp3");
const receiveSound = new Audio("sound/receive.mp3");
const error = new Audio("sound/error.mp3");

// EventListener Handling
form.addEventListener("submit", e => { e.preventDefault() })
sendButton.addEventListener("click", send)
microphone.addEventListener("click", userMicrophone)

// functions
function send() {
    if (textArea.value) {
        sendSound.play()
        sendButton.disabled = true
        setTimeout(() => { sendButton.disabled = false }, 2000)
        clearSpans()
        ShowChat()
        textArea.value = ""
    }
    else {
        error.play()
        textArea.placeholder = "Please Enter SomeThing!"
    }
}

function ShowChat() {
    // Disable the Button to Prevent the User From Sending Mutiple Message at the Same Time
    // sendButton.disabled = true

    // Get The Text From the TextArea 
    const text = textArea.value.trim()

    // Display the chatBox to flex to make it visible
    chatBox.style.display = "flex"

    // Editing the Internal Contents Of the ChatBox
    chatBox.innerHTML += `<div id="user">
            <span id="Logo">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM20.59 22c0-3.87-3.85-7-8.59-7s-8.59 3.13-8.59 7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </span>
            <p id="UserText">${text}</p>
        </div>`

    // Wait 1000 milliseconds then send the messages
    setTimeout(() => {
        // Play The Audio When It Done
        receiveSound.play()

        // Editing The Content Inside The ChatBox
        chatBox.innerHTML += `<div id="ai">
            <span id="Logo">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM20.59 22c0-3.87-3.85-7-8.59-7s-8.59 3.13-8.59 7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </span>
            <p id="aiText">${text}</p>
        </div>`

        // Auto Scroll
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 2000)

    chatBox.scrollTop = chatBox.scrollHeight;
}

function clearSpans() {
    helloSpans.forEach(one => {
        one.remove(helloSpans)
    })
}

function userMicrophone() {
    var recogntion = new webkitSpeechRecognition()
    recogntion.lang = "en-US"
    recogntion.interimResults = true
    recogntion.start()
    recogntion.onresult = (event) => {
        var last = event.results.length - 1
        var text = event.results[last][0].transcript
        textArea.value = text;
    }
    recogntion.onend = () => {
        recogntion.stop()
        send()
    }
}