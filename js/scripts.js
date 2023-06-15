document.getElementById('chat-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
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


document.querySelectorAll("#system-buttons button").forEach(button => {
    button.addEventListener("click", function() {
        // Remove selected class from previously selected button
        document.querySelectorAll("#system-buttons button.selected")
            .forEach(btn => btn.classList.remove("selected"));
        
        // Add selected class to the clicked button
        button.classList.add("selected");
        
        selectSystem(button.textContent);
    });
});

window.addEventListener('load', () => {
    addBotMessage("Hello! How can I help you today?");
});

function sendMessage() {
    const inputElement = document.getElementById('chat-input');
    const chatBoxElement = document.getElementById('chat-box');

    if (inputElement.value.trim() !== '') {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'user-message');
        messageElement.textContent = inputElement.value;

        // Add user icon
        const userIcon = document.createElement('i');
        userIcon.classList.add('fas', 'fa-user', 'icon');
        messageElement.insertBefore(userIcon, messageElement.firstChild);
        userIcon.style.marginRight = '15px'; // 添加右侧间距

        // Add message to current chat array
        currentChat.push({type: 'user', content: inputElement.value});

        chatBoxElement.appendChild(messageElement);

        // Sample responses
        if (inputElement.value.toLowerCase().includes("hello")) {
            addBotMessage("Hi there!");
        } else if (inputElement.value.toLowerCase().includes("how are you")) {
            addBotMessage("I'm a chatbot, so I don't have feelings, but I'm here to help you!");
        } else {
            addBotMessage("I'm not sure how to respond to that. Can you please provide more information?");
        }

        inputElement.value = '';
    }
}

function addBotMessage(message) {
    const chatBoxElement = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'bot-message');
    messageElement.textContent = message;

    const botIcon = document.createElement('i');
    botIcon.classList.add('fas', 'fa-code', 'icon');
    messageElement.insertBefore(botIcon, messageElement.firstChild);
    botIcon.style.marginRight = '10px'; // 添加右侧间距

    chatBoxElement.appendChild(messageElement);

    // Add message to current chat array
    currentChat.push({type: 'bot', content: message});
}

function sendExample(message) {
    const inputElement = document.getElementById('chat-input');
    inputElement.value = message;
    sendMessage();
}

function clearChat() {
    document.getElementById("chat-box").innerHTML = '';
}

