# Гайд по развертыванию на GitHub и Vercel

## Шаг 1: Подготовка к GitHub

### 1.1 Установите Git

Если еще не установили:
- Windows: https://git-scm.com/download/win
- Mac: https://git-scm.com/download/mac
- Linux: `sudo apt-get install git`

### 1.2 Настройте Git

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 1.3 Скопируйте все файлы проекта в одну папку

```
planiks/
├── index.html
├── style.css
├── script.js
├── package.json
├── .gitignore
├── .env.example
├── vercel.json
├── api/
│   └── chat.js
└── README.md
```

## Шаг 2: Загрузка на GitHub

### 2.1 Создайте новый репозиторий на GitHub

1. Перейдите на https://github.com/new
2. Назовите репозиторий `planiks`
3. Добавьте описание: "Умный помощник для управления задачами"
4. Выберите "Public"
5. Не добавляйте файлы, нажмите "Create repository"

### 2.2 Загрузите код

В папке проекта выполните:

```bash
git init
git add .
git commit -m "Initial commit - Planiks task manager with AI"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/planiks.git
git push -u origin main
```

Замените `YOUR_USERNAME` на ваш ник GitHub.

## Шаг 3: Развертывание на Vercel

### 3.1 Создайте аккаунт на Vercel

1. Перейдите на https://vercel.com
2. Зарегистрируйтесь через GitHub
3. Дайте разрешение на доступ к репозиториям

### 3.2 Разверните проект

1. Нажмите "New Project"
2. Выберите ваш репозиторий `planiks`
3. Нажмите "Import"
4. В разделе "Environment Variables" добавьте:
   - **Имя**: `GROQ_API_KEY`
   - **Значение**: ваш ключ Groq API (начинается с `gsk_`)
5. Нажмите "Deploy"

### 3.3 Дождитесь развертывания

Vercel начнет сборку. Это займет 1-2 минуты.

Когда готово, вы получите URL вроде:
```
https://planiks.vercel.app
```

## Обновление кода

После изменений в коде:

```bash
git add .
git commit -m "Description of changes"
git push
```

Vercel автоматически обновит приложение.

## Решение проблем

### Ошибка: "API key not configured"

- Проверьте, добавили ли вы GROQ_API_KEY в переменные окружения Vercel
- Перейдите в Settings проекта → Environment Variables
- Убедитесь, что ключ скопирован правильно

### Чат не работает

- Проверьте консоль браузера (F12 → Console)
- Убедитесь, что `/api/chat` доступен
- Проверьте интернет-соединение

### GitHub: "Authentication failed"

Используйте Personal Access Token вместо пароля:
1. https://github.com/settings/tokens
2. Нажмите "Generate new token"
3. Выберите `repo` и `gist`
4. При запросе пароля введите токен

## Полезные команды

```bash
# Проверить статус
git status

# Посмотреть коммиты
git log

# Отменить последний коммит
git reset HEAD~1

# Клонировать репозиторий
git clone https://github.com/YOUR_USERNAME/planiks.git
```

## Готово!

Ваше приложение теперь доступно онлайн!

Поделитесь ссылкой:
```
https://planiks.vercel.app
```
