let messages = [];

async function sendMessage() {
    let chatInput = document.getElementById('chatInput');
    let chatBox = document.getElementById('chatBox');
    let sendBtn = document.getElementById('sendBtn');
    let text = chatInput.value.trim();
    
    if (text === '') return;
    chatInput.value = '';
    
    // Показываем сообщение пользователя
    appendMessage('msg-user', text);
    
    messages.push({ role: 'user', content: text });
    
    sendBtn.disabled = true;
    sendBtn.textContent = 'Ждём...';

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: messages })
        });

        const data = await response.json();

        if (response.ok) {
            const botText = data.choices[0].message.content;
            appendMessage('msg-bot', botText);
            messages.push({ role: 'assistant', content: botText });
        } else {
            const errorText = data.error?.message || data.error || 'Ошибка API';
            appendMessage('msg-bot', 'Ошибка: ' + errorText);
        }
    } catch (error) {
        appendMessage('msg-bot', 'Ошибка соединения с сервером');
        console.error(error);
    } finally {
        sendBtn.disabled = false;
        sendBtn.textContent = 'Отправить';
    }
}

function appendMessage(className, text) {
    let chatBox = document.getElementById('chatBox');
    let div = document.createElement('div');
    div.className = className;
    div.textContent = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Привязка событий
document.getElementById('sendBtn').onclick = sendMessage;
document.getElementById('chatInput').onkeypress = (e) => {
    if (e.key === 'Enter') sendMessage();
};