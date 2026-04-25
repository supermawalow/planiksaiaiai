# ПЛАНИКС - Умный помощник для задач

Полностью функциональное приложение для управления задачами с интеграцией AI.

## Возможности

- Создание и управление задачами
- Чат с AI помощником (Groq LLama)
- Сохранение данных в браузере
- Темная тема
- Адаптивный дизайн

## Как использовать

1. Скачайте все файлы
2. Откройте `index.html` в браузере

## Установка на Vercel

### 1. Загрузьте на GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/planiks.git
git push -u origin main
```

### 2. Разверните на Vercel

- Перейдите на vercel.com
- Нажмите "New Project"
- Выберите ваш репозиторий
- Добавьте переменные окружения:
  - Имя: GROQ_API_KEY
  - Значение: ваш ключ Groq API
- Нажмите Deploy

## API

Используется Groq API с моделью Mixtral 8x7B.

### Переменные окружения

Создайте `.env` файл:

```
GROQ_API_KEY=ваш_ключ_здесь
```

## Файлы проекта

- `index.html` - основная страница
- `style.css` - стили
- `script.js` - логика и API
- `package.json` - информация о проекте
- `.env.example` - пример переменных

## Технологии

- HTML5
- CSS3
- JavaScript (Vanilla)
- Groq API

## Разработка

Проект готов к использованию. Просто откройте HTML файл.

## Лицензия

MIT
