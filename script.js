window.onload = () => { document.querySelector(".Load").close() }
// Form and elements
const form = document.querySelector("form");
const textArea = document.querySelector("textarea");
const microphone = document.querySelector(".Microphone");
const sendButton = document.querySelector(".Send");
const chatBox = document.querySelector(".Messages");
const helloSpans = document.querySelectorAll(".Hello");
const sugg = document.querySelector(".suggestions")
const suggs = document.querySelectorAll(".suggestion")
const nor = document.querySelector(".nor")

// Sounds
const sendSound = new Audio("sound/send.mp3");
const receiveSound = new Audio("sound/receive.mp3");
const error = new Audio("sound/error.mp3");

// Settings
let userEnters = {};
let userEntersList = JSON.parse(localStorage.getItem("Responses")) || [];
let NoOfRequests = JSON.parse(localStorage.getItem("Responses"))?.length || 0;

// EventListener Handling
form.addEventListener("submit", e => { e.preventDefault() });
sendButton.addEventListener("click", send);
microphone.addEventListener("click", userMicrophone);
suggs.forEach((sugs) => {
    sugs.addEventListener("click", () => {
        textArea.value = sugs.innerHTML
    })
})
receiveChats()

// functions
function receiveChats() {
    let storage = localStorage.getItem("Responses");
    if (storage) {
        let data = JSON.parse(storage);

        // Set the number of responses to the count of entries
        nor.innerHTML = data.length;

        // Optional: Log the last entry
        let lastEntry = data[data.length - 1];
        if (lastEntry) {
            nor.innerHTML = "Number Of Requests: " + lastEntry.numberOfResponses;
        }
        else {
            nor.innerHTML = "No Message had Been Sent"
        }
    } else {
        nor.innerHTML = "No Message had Been Sent"; // Default if no data exists
    }
}

function send() {
    if (textArea.value) {
        sendSound.play();
        sendButton.disabled = true;
        setTimeout(() => { sendButton.disabled = false; }, 2000);
        clearSpans();
        ShowChat();
        receiveChats();
        textArea.value = "";
    } else {
        error.play();
        textArea.placeholder = "Please Enter Something!";
    }
}

function ShowChat() {
    let time = new Date().toLocaleDateString();
    let date = new Date().toLocaleTimeString();

    NoOfRequests += 1;

    const text = textArea.value.trim();
    const response = "Sorry, but I'm under development.";

    chatBox.style.display = "flex";
    chatBox.innerHTML += `<div id="user">
            <span id="Logo"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM20.59 22c0-3.87-3.85-7-8.59-7s-8.59 3.13-8.59 7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
            <p id="UserText">${text}</p>
        </div>`;

    setTimeout(() => {
        receiveSound.play();
        chatBox.innerHTML += `<div id="ai">
            <span id="Logo">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM20.59 22c0-3.87-3.85-7-8.59-7s-8.59 3.13-8.59 7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </span>
            <p id="aiText">${response}</p>
        </div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 2000);

    userEnters = {
        numberOfResponses: NoOfRequests,
        userText: text,
        aiText: response,
        date: date,
        time: time,
    };

    userEntersList.push(userEnters);
    localStorage.setItem("Responses", JSON.stringify(userEntersList));
    chatBox.scrollTop = chatBox.scrollHeight;
}

function clearSpans() {
    helloSpans.forEach(one => {
        one.remove(helloSpans)
    })
    sugg.remove()
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

// Context
document.addEventListener('contextmenu', (e) => { e.preventDefault() });
document.addEventListener("dblclick", e => { e.preventDefault(); return false })
document.onkeydown = function (e) {
    if (event.keyCode == 123) return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) return false;
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false;
    if (e.ctrlKey && e.keyCode == 'S'.charCodeAt(0)) return false;
    if (e.ctrlKey && e.keyCode == 'A'.charCodeAt(0)) return false;
    if (e.key == "Escape") return false;
}

// animations
const dialogs = document.querySelectorAll("dialog");

dialogs.forEach(dialog => {
    dialog.addEventListener('close', () => { dialog.classList.remove('open') });

    document.querySelectorAll("#open-button").forEach(openBtn => {
        openBtn.addEventListener("click", () => {
            dialog.showModal();
            setTimeout(() => dialog.classList.add('open'));
        });
    })

    document.querySelectorAll("#close-button").forEach(closeBtn => {
        closeBtn.addEventListener("click", () => {
            const close = dialog.close() || dialog.removeEventListener('transitionend', close);
            dialog.addEventListener('transitionend', close);
            dialog.classList.remove('open');
        });
    })
})