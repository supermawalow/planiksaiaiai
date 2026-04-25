let taskArray = [];
let messages = [];

let taskInput = document.getElementById('taskInput');
let addBtn = document.getElementById('addBtn');
let taskList = document.getElementById('taskList');
let chatInput = document.getElementById('chatInput');
let sendBtn = document.getElementById('sendBtn');
let chatBox = document.getElementById('chatBox');

function addTask() {
    let text = taskInput.value;
    if (text == '') return;
    
    taskArray.push(text);
    taskInput.value = '';
    showTasks();
}

function deleteTask(num) {
    taskArray.splice(num, 1);
    showTasks();
}

function showTasks() {
    taskList.innerHTML = '';
    
    for (let i = 0; i < taskArray.length; i++) {
        let div = document.createElement('div');
        div.className = 'task';
        
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        
        let span = document.createElement('span');
        span.textContent = taskArray[i];
        
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Удалить';
        deleteBtn.className = 'delete';
        deleteBtn.onclick = function() {
            deleteTask(i);
        };
        
        div.appendChild(checkbox);
        div.appendChild(span);
        div.appendChild(deleteBtn);
        taskList.appendChild(div);
    }
}

async function sendMessage() {
    let text = chatInput.value;
    if (text == '') return;
    
    chatInput.value = '';
    
    let userMsg = document.createElement('div');
    userMsg.className = 'msg-user';
    userMsg.textContent = text;
    chatBox.appendChild(userMsg);
    chatBox.scrollTop = chatBox.scrollHeight;
    
    sendBtn.disabled = true;
    sendBtn.textContent = 'Ждём...';
    
    messages.push({
        role: 'user',
        content: text
    });
    
    try {
        let response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: messages
            })
        });
        
        let data = await response.json();
        let botText = data.choices[0].message.content;
        
        messages.push({
            role: 'assistant',
            content: botText
        });
        
        let botMsg = document.createElement('div');
        botMsg.className = 'msg-bot';
        botMsg.textContent = botText;
        chatBox.appendChild(botMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        let errorMsg = document.createElement('div');
        errorMsg.className = 'msg-bot';
        errorMsg.textContent = 'Ошибка подключения';
        chatBox.appendChild(errorMsg);
    }
    
    sendBtn.disabled = false;
    sendBtn.textContent = 'Отправить';
}

addBtn.onclick = addTask;
taskInput.onkeypress = function(e) {
    if (e.key == 'Enter') addTask();
};

sendBtn.onclick = sendMessage;
chatInput.onkeypress = function(e) {
    if (e.key == 'Enter') sendMessage();
};

let botStart = document.createElement('div');
botStart.className = 'msg-bot';
botStart.textContent = 'Привет! Я ПЛАНИКС. Помогу организовать твои задачи!';
chatBox.appendChild(botStart);
