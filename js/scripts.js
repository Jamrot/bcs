document.getElementById('chat-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        if (e.shiftKey){
        }
        else {
            sendMessage();
            e.preventDefault();
        }
    }
});


let chatHistory = []; // Array to store chat history
let currentChat = []; // Array to store current chat

document.getElementById("new-chat-button").addEventListener("click", function() {
    const chatBoxElement = document.getElementById("chat-box");
    const historyListElement = document.getElementById("history-list");

    // Ask the user for the title of the old chat
    const title = prompt("Enter a title for the conversation:", "Chat 1");

    // If the user presses Cancel, title will be null. In such case, don't proceed.
    if (title === null) {
        return;
    }

    // Save current chat to chat history
    chatHistory.push({
        title: title,
        chat: currentChat.slice() // Creating a copy of the currentChat array
    });

    // Create a new element for the chat history
    const historyItem = document.createElement("div");
    historyItem.textContent = title;
    historyItem.style.marginBottom = "10px";
    historyItem.style.cursor = "pointer";

    // Add click event listener to the history item
    historyItem.addEventListener("click", function() {
        // Find chat in history based on title
        const chat = chatHistory.find(item => item.title === title).chat;

        // Clear the chatbox
        chatBoxElement.innerHTML = '';
        
        // Restore chat from history
        chat.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', message.type + '-message');
            messageElement.textContent = message.content;

            if (message.type=='user'){
                // Add user icon
                const userIcon = document.createElement('i');
                userIcon.classList.add('fas', 'fa-user', 'icon');
                messageElement.insertBefore(userIcon, messageElement.firstChild);
                userIcon.style.marginRight = '15px'; 
            }
            if (message.type=='bot'){
                // Add user icon
                const botIcon = document.createElement('i');
                botIcon.classList.add('fas', 'fa-code', 'icon');
                messageElement.insertBefore(botIcon, messageElement.firstChild);
                botIcon.style.marginRight = '10px'; 
            }

            chatBoxElement.appendChild(messageElement);
            
        });

        // Update currentChat to be the restored chat
        currentChat = chat.slice(); // Creating a copy of the chat array
    });

    // Append the history item to the history list
    historyListElement.appendChild(historyItem);

    // Clear the chatbox and currentChat array
    chatBoxElement.innerHTML = '';
    currentChat = [];
});

let architecture = "x86_32";  // Set default optimization level

document.querySelectorAll("#system-buttons button").forEach(button => {
    button.addEventListener("click", function() {
        // Remove selected class from previously selected button
        document.querySelectorAll("#system-buttons button.selected")
            .forEach(btn => btn.classList.remove("selected"));
        
        // Add selected class to the clicked button
        button.classList.add("selected");
        
        // selectSystem(button.textContent);
        architecture = button.textContent
    });
});

let optimization_level = "O1";  // Set default optimization level

document.querySelectorAll("#opt-buttons button").forEach(button => {
    button.addEventListener("click", function() {
        // Remove selected class from previously selected button
        document.querySelectorAll("#opt-buttons button.selected")
            .forEach(btn => btn.classList.remove("selected"));
        
        // Add selected class to the clicked button
        button.classList.add("selected");
        
        // selectSystem(button.textContent);
        optimization_level = button.textContent;
    });
});

window.addEventListener('load', () => {
    addBotMessage("Hello! Please input your binary code.");
});

function sendMessage() {
    const inputElement = document.getElementById('chat-input');
    const chatBoxElement = document.getElementById('chat-box');
    const added = 0;

    if (inputElement.value.trim() !== '') {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'user-message');
        // messageElement.textContent = inputElement.value;
        messageElement.innerHTML = inputElement.value.replace(/\n/g, '<br>');

        // Add user icon
        const userIcon = document.createElement('i');
        userIcon.classList.add('fas', 'fa-user', 'icon');
        messageElement.insertBefore(userIcon, messageElement.firstChild);
        userIcon.style.marginRight = '15px';

        // Add message to current chat array
        currentChat.push({type: 'user', content: inputElement.value});

        chatBoxElement.appendChild(messageElement);

        // Prepare data to send to the server
        const assembly_code_input = inputElement.value;
        const data = {
            assembly_code_input: assembly_code_input,
            optimization_level: optimization_level,
            architecture: architecture
        };

        const loadingMsg =addBotMessage('generating&nbsp&nbsp<span class="dots"><span>.&nbsp</span><span>.&nbsp</span><span>.&nbsp</span></span>')

        // Send data to the server and handle the response
        const fetchData = fetch('http://47.96.18.113:5000/app', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        });

        const timeout = new Promise((resolve, reject) => {
            setTimeout(reject, 20000, 'Request timed out');
        });

        Promise.race([fetchData, timeout])
        .then(response => response.json())
        .then(data => {
            const bcs_summary = data.bcs_summary;
            updateBotMessage(loadingMsg, bcs_summary);
        })
        .catch((error) => {
            if (error === 'Request timed out') {
                updateBotMessage(loadingMsg, '<span style="color: red;">FAILED (TIMEOUT)</span>');
            } else {
                console.error('Error:', error);
            }
        });

        // Sample responses
        // if (inputElement.value.toLowerCase().includes("hello")) {
        //     addBotMessage("Hi there!");
        // } else if (inputElement.value.toLowerCase().includes("how are you")) {
        //     addBotMessage("I'm a chatbot, so I don't have feelings, but I'm here to help you!");
        // } else if (added==0) {
        //     addBotMessage("I'm not sure how to respond to that. Can you please provide more information?");
        // }

        inputElement.value = '';
        chatBoxElement.scrollTop = chatBoxElement.scrollHeight;
    }
}

function addBotMessage(message) {
    const chatBoxElement = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'bot-message');
    messageElement.innerHTML = message;

    const botIcon = document.createElement('i');
    botIcon.classList.add('fas', 'fa-code', 'icon');
    messageElement.insertBefore(botIcon, messageElement.firstChild);
    botIcon.style.marginRight = '10px';

    chatBoxElement.appendChild(messageElement);

    // Add message to current chat array
    currentChat.push({type: 'bot', content: message});
    return messageElement;
}

function updateBotMessage(messageElement, newMessage) {
    messageElement.innerHTML = newMessage;

    // If your messages include the bot icon, you need to add it back after changing the text content
    const botIcon = document.createElement('i');
    botIcon.classList.add('fas', 'fa-code', 'icon');
    messageElement.insertBefore(botIcon, messageElement.firstChild);
    botIcon.style.marginRight = '10px';
}

function sendExample(message) {
    const inputElement = document.getElementById('chat-input');
    inputElement.value = message;
    sendMessage();
}

function clearChat() {
    var result = confirm("CLEAR?");
    if (result) {
        document.getElementById("chat-box").innerHTML = '';
    }
}

