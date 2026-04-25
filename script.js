let taskArray = [];
let messages = [];

// Получаем элементы интерфейса
let taskInput = document.getElementById('taskInput');
let addBtn = document.getElementById('addBtn');
let taskList = document.getElementById('taskList');
let chatInput = document.getElementById('chatInput');
let sendBtn = document.getElementById('sendBtn');
let chatBox = document.getElementById('chatBox');

// --- ЛОГИКА ЗАДАЧ ---

function addTask() {
    let text = taskInput.value.trim();
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

// --- ЛОГИКА ЧАТА ---

async function sendMessage() {
    let text = chatInput.value.trim();
    if (text == '') return;
    
    chatInput.value = '';
    
    // Отображаем сообщение пользователя
    let userMsg = document.createElement('div');
    userMsg.className = 'msg-user';
    userMsg.textContent = text;
    chatBox.appendChild(userMsg);
    chatBox.scrollTop = chatBox.scrollHeight;
    
    // Блокируем кнопку на время запроса
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

        if (response.ok) {
            let botText = data.choices[0].message.content;
            
            messages.push({
                role: 'assistant',
                content: botText
            });
            
            let botMsg = document.createElement('div');
            botMsg.className = 'msg-bot';
            botMsg.textContent = botText;
            chatBox.appendChild(botMsg);
        } else {
            // Если API вернуло ошибку (например, про модель)
            let errorText = data.error?.message || 'Ошибка API';
            appendErrorMsg('Ошибка: ' + errorText);
        }
        
    } catch (error) {
        appendErrorMsg('Ошибка подключения к серверу');
    } finally {
        chatBox.scrollTop = chatBox.scrollHeight;
        sendBtn.disabled = false;
        sendBtn.textContent = 'Отправить';
    }
}

function appendErrorMsg(text) {
    let errorMsg = document.createElement('div');
    errorMsg.className = 'msg-bot';
    errorMsg.style.color = '#ff4444'; // Подсветим ошибку красным
    errorMsg.textContent = text;
    chatBox.appendChild(errorMsg);
}

// --- ПРИВЯЗКА СОБЫТИЙ ---

addBtn.onclick = addTask;
taskInput.onkeypress = function(e) {
    if (e.key == 'Enter') addTask();
};

sendBtn.onclick = sendMessage;
chatInput.onkeypress = function(e) {
    if (e.key == 'Enter') sendMessage();
};

// --- ПРИВЕТСТВИЕ ПРИ ЗАГРУЗКЕ ---
// Этот код сработает один раз, когда скрипт загрузится

let botStart = document.createElement('div');
botStart.className = 'msg-bot';
botStart.textContent = 'Привет! Я ПЛАНИКС. Помогу организовать твои задачи!';
chatBox.appendChild(botStart);