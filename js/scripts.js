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
    // addBotMessage("Hello! Please input your binary code.");
    addBotMessage("请输入您的二进制代码");
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

        // const loadingMsg = addBotMessage('generating&nbsp&nbsp<span class="dots"><span>.&nbsp</span><span>.&nbsp</span><span>.&nbsp</span></span>')
        const loadingMsg = addBotMessage('二进制代码语义总结生成中&nbsp&nbsp<span class="dots"><span>.&nbsp</span><span>.&nbsp</span><span>.&nbsp</span></span>')

        if (inputElement.value.includes('push rbp\nmov rbp, rsp\npush rbx\nmov eax, [rdi+<POSITIVE>]\nmov rbx, rdi\ntest eax, eax\njz <NEAR>\nsub eax, <POSITIVE>\ntest eax, eax\nmov [rdi+<POSITIVE>], eax\njnz <NEAR>\nlea rdi, [rbx+<POSITIVE>]\ncall <ICALL>\nlea rax, [rbx+<POSITIVE>]\ncmp [rbx+<POSITIVE>], rax\njnz <NEAR>\nlea rax, [rbx+<POSITIVE>]\ncmp [rbx+<POSITIVE>], rax\njnz <NEAR>\nmov rdi, rbx\ncall <ICALL>\ncmp [rbx+<POSITIVE>], <ZERO>\njz <NEAR>\ncall <ICALL>\nmov rdi, [rbx+<POSITIVE>]\ncall <ICALL>\nmov rdi, rbx\ncall <ICALL>\npop rbx\npop rbp\nretn\ncall <ICALL>\npop rbx\npop rbp\nretn\nud2\nud2\nmov rsi, rdi\nxor eax, eax\nmov rdi, <OFFSET> aSvcDestroyNoTh\ncall <ICALL>\njmp <NEAR>')) {
            setTimeout(function() {
                updateBotMessage(loadingMsg, "release the allocated RPC buffer");
            }, 1000);
        } else if (inputElement.value.includes('push rbp\nmov rbp, rsp\npush r14\npush r13\npush r12\npush rbx\nmov eax, [rdi+<POSITIVE>]\nlea rbx, [rax+rax*2]\nshl rbx, <POSITIVE>\nlea r12, [rbx+<NEGATIVE>]\ncmp qword ptr [r12], <ZERO>\njz <NEAR>\npop rbx\npop r12\npop r13\npop r14\npop rbp\nretn\nlea rsi, [rdi+<POSITIVE>]\nmov r13, rdi\nmov rdi, <OFFSET> aHugepages\ncall <ICALL>\ntest rax, rax\nmov rsi, rax\nmov [r12], rax\njz <NEAR>\nmovsxd rax, <MEM> cs:dword_FFFFFFFF81F00C10\nimul rax, , <POSITIVE>\nadd rax, <NEGATIVE>\ncmp rax, <OFFSET> qword_FFFFFFFF820CD160\njbe <NEAR>\nadd rbx, <NEGATIVE>\nmov r14, <OFFSET> qword_FFFFFFFF820CD160\njmp <NEAR>\nmovsxd rax, <MEM> cs:dword_FFFFFFFF81F00C10\nadd r14, <POSITIVE>\nimul rax, , <POSITIVE>\nadd rax, <NEGATIVE>\ncmp r14, rax\njnb <NEAR>\nmov rsi, [r12]\nmov rcx, <OFFSET> qword_FFFFFFFF81E4CBA0\nmov rdx, rbx\nmov rdi, r14\ncall <ICALL>\ntest eax, eax\njz <NEAR>\nmov edx, [r13+<POSITIVE>]\nlea rsi, [r14+<POSITIVE>]\nmov rdi, <OFFSET> unk_FFFFFFFF81BAE968\nxor eax, eax\ncall <ICALL>\nmov rdi, r13\ncall <ICALL>\njmp <NEAR>')) {
            setTimeout(function() {
                updateBotMessage(loadingMsg, "Register all buffered attributes for a single device");
            }, 1000);
        } else if (inputElement.value.includes("sub rsp, <POSITIVE>\nmov edx, <POSITIVE>\nmov esi, <OFFSET> qword_624940\nmov edi, <OFFSET> qword_628940\ncall <ICALL>\ncmp eax, <POSITIVE>\njnz <NEAR>\nmov edx, <POSITIVE>\nmov esi, <OFFSET> qword_628980\nmov edi, <OFFSET> qword_62A9A0\ncall <ICALL>\ncmp eax, <POSITIVE>\njnz <NEAR>\ncall <ICALL>\nmov <MEM> cs:dword_61DEA8, eax\nadd rsp, <POSITIVE>\nretn\nmov edi, <POSITIVE>\ncall <ECALL> _exit")){
            setTimeout(function() {
                updateBotMessage(loadingMsg, "init a terminal data structure");
            }, 1000);
        } else if (inputElement.value.includes("mov rax, [rdi]\ntest rax, rax\njz short loc_FFFFFFFF81752D04\npush rbp\nmov rbp, rsp\npush rbx\nmov rbx, rdi\nmov rdi, [rax+8]\ntest rdi, rdi\njz short loc_FFFFFFFF81752CE2\nmov rax, [rax]\nmov rax, [rax+48h]\ncall qword ptr [rax+28h]\nmov rax, [rbx]\nmov rdi, [rax]\ncall sub_FFFFFFFF8175287F\nmov rdi, [rbx]\ncall sub_FFFFFFFF8114766E\nmov qword ptr [rbx], 0\nmov eax, 0\npop rbx\npop rbp\nretn")){
            setTimeout(function() {
                updateBotMessage(loadingMsg, "free all resources associated with context_handle.");
            }, 1000);
        }
        else {

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

        }
        // Sample responses
        // if (inputElement.value.toLowerCase().includes("Destroy an RPC service")) {
        //     updateBotMessage("Hi there!");
        // } else if (inputElement.value.toLowerCase().includes("Register hstate attributes for a single node device")) {
        //     updateBotMessage("I'm a chatbot, so I don't have feelings, but I'm here to help you!");
        // } else if (inputElement.value.toLowerCase().includes("initialize the terminal data structures")){
        //     updateBotMessage("I'm a chatbot, so I don't have feelings, but I'm here to help you!");
        // }
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

